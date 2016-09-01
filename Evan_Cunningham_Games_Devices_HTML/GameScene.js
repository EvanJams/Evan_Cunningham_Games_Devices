function GameScene(){
	this.title = "Game";
	this.bullets = [];
	this.enemies = [];
	this.spawnTimer = 50;
	this.timeSinceSpawn = 0;
	this.spawnLimit = 30;
	this.score = 0;
	this.bulletsFired = 0;
	this.chanceOfScream = 0;
	this.changedLevel = false;
	//objects
	this.buttons.push(new Button(game.sceneManager.goToScene, "Pause", window.innerWidth/20,0,window.innerWidth/12,window.innerHeight/20));
	this.player = new Player(window.innerWidth/2,window.innerHeight/2);
	//loading files
	this.img = new Image();
	this.img.src = 'spritesheet.png';
	this.loadAnimationMetadata("level.json");
	this.snd = new Audio("scream.wav");
	this.gunSound = new Audio("gun.wav");
	this.level2Sfx = new Audio("level2.mp3");
	this.killedSfx = new Audio("deaded.mp3");
	this.soundtrack = new Audio("music.mp3");
}
GameScene.prototype = new Scene();

//loading from JSON
GameScene.prototype.loadAnimationMetadata = function(filename) {
    var jsonfile = new XMLHttpRequest();
     
    jsonfile.open("GET", filename, true);
 
	//when the message comes back from the server this function is called
	jsonfile.onreadystatechange = function() {
    	if (jsonfile.readyState == 4) {
        	if (jsonfile.status == 200) {             
            	//data now contains the data from the json file
            	data = JSON.parse(jsonfile.responseText);                        
        	}
    	}
	};        
    //This sends the request
    jsonfile.send(null);
}

GameScene.prototype.update = function()
{	
	this.soundtrack.play();
	if(this.soundtrack.ended){
		this.soundtrack.currentTime = 0;
		this.soundtrack.play();
	}
	//updating bullets, then enemies
	for(var i = 0; i < this.bullets.length; i++)
	{
		this.bullets[i].update();
		if(this.bullets[i].x > window.innerWidth || this.bullets[i].x < 0 ||
			this.bullets[i].y < 0 || this.bullets[i].y > window.innerHeight)
		{
			this.bullets.splice(i,1);
		}
	}
	console.log(this.bullets.length);
	for(var i = 0; i < this.enemies.length; i++)
	{
		this.enemies[i].update();
	}
	//spawning enemies
	if(this.timeSinceSpawn >= this.spawnTimer)
	{
		//Random Spawns for enemies
		var enemyPass = Math.random();
		enemyPass *= Math.PI * 2;
		//Converting to Cartesian 
		var radius = 500;
		var xEnemyPass = Math.sin(enemyPass) * radius;
		var yEnemyPass = Math.cos(enemyPass) * radius;
		//centering around the player
		xEnemyPass += this.player.x;
		yEnemyPass += this.player.y;
		this.enemies.push(new Enemy(xEnemyPass, yEnemyPass, this.player.x, this.player.y, this.img));
		this.timeSinceSpawn = 0;
		if(this.spawnTimer > this.spawnLimit)
		{
			this.spawnTimer--;
		}
	}
	else{this.timeSinceSpawn++}
	//functions
	this.chanceOfScream = Math.random() * 30;
	this.detectCollisions(this.bullets, this.enemies);
	this.detectDeath(this.enemies, this.player);
}

GameScene.prototype.render = function()
{	
	ctx.drawImage(game.backImage, 0, 0, window.innerWidth, window.innerHeight);
	if(game.currentLevel == 2)
	{
		ctx.fillStyle = game.rgb(50,10,10);
		ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
	}
	for(var i = 0; i < this.bullets.length; i++)
	{
	 	this.bullets[i].render();
	}
	for(var i = 0; i < this.enemies.length; i++)
	{
		this.enemies[i].render();
	}
	for(var i = 0; i < this.buttons.length; i++)
	{
	 	this.buttons[i].draw();
	}

	this.player.render();
	ctx.fillStyle = game.rgb(0,0,0);
 	ctx.font = "bold 18px serif";
	ctx.fillText("Pause", window.innerWidth/13, window.innerHeight/30);
 	ctx.fillText("Current Score: " + this.score, window.innerWidth - window.innerWidth/5, window.innerHeight/40);
 	ctx.fillText("High Score: " + game.score, window.innerWidth - window.innerWidth/5, window.innerHeight/20);
}

GameScene.prototype.input = function(x,y){
	this.bullets.push(new Bullet(this.player.x + this.player.width/2, this.player.y + this.player.height/2, x, y));
	this.gunSound.play();
	this.gunSound.currentTime = 0;
	this.bulletsFired++;
	for(var i = 0; i < this.buttons.length; i++)
	{
		this.buttons[i].isClicked(x,y);
	}
}

GameScene.prototype.detectCollisions = function(bullets, entities){	
	for(var i = 0; i < entities.length; i++)
	{
		for(var j = 0; j < bullets.length; j++)
		{
			if(bullets[j].x < entities[i].x + entities[i].width &&
				bullets[j].x + bullets[j].width > entities[i].x &&
				bullets[j].y < entities[i].y + entities[i].height &&
				bullets[j].y + bullets[j].height > entities[i].y)
			{
				bullets.splice(j,1);
				entities.splice(i,1);
				this.score+= 11 - this.bulletsFired;
				this.bulletsFired = 0;
				if(this.score > 300 && this.changedLevel == false){
					game.currentLevel = 2;
					this.changedLevel = true;
					this.level2Sfx.play();
				}
				if(game.currentLevel == 2 && this.chanceOfScream <= 1)
				{
					this.snd.play();
					this.snd.currentTime = 0;
				}
			}
		}
	}
}

GameScene.prototype.detectDeath = function(killers, life){
	for(var i =0; i < killers.length; i++)
	{
		if(killers[i].x < life.x + life.width &&
				killers[i].x + killers[i].width > life.x &&
				killers[i].y < life.y + life.height &&
				killers[i].y + killers[i].height > life.y)
		{
			this.killedSfx.play();
			this.gameOver();
		}
	}
}

GameScene.prototype.gameOver = function(){
	if(this.score > game.score)
	{
		game.score = this.score;
	}
	game.previousScore = this.score;
	this.paused = false;
	this.bullets = [];
	this.enemies = [];
	this.spawnTimer = 50;
	this.timeSinceSpawn = 0;
	this.spawnLimit = 30;
	this.bulletsFired = 0;
	this.score = 0;
	game.currentLevel = 1;
	this.changedLevel = false;
	this.soundtrack.pause();
	this.soundtrack.currentTime = 0;
	game.sceneManager.goToScene("Game Over");
	console.log("Games over pal");
}

GameScene.prototype.onTouchStart = function(x,y){	
	this.bullets.push(new Bullet(this.player.x + this.player.width/2, this.player.y + this.player.height/2, x, y));
	this.bulletsFired++;

	for(var i = 0; i < this.buttons.length; i++)
	{
		this.buttons[i].isClicked(x,y);
	}
}

GameScene.prototype.onTouchMove = function(x,y){
}

GameScene.prototype.onTouchEnd = function(x,y){
}
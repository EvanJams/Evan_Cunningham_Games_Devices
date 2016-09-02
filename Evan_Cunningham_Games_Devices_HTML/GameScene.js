function GameScene(){
	this.title = "Game";
	this.bullets = [];
	this.enemies = [];
	this.spawnTimer = 50;
	this.timeSinceSpawn = 0;
	this.spawnLimit = 30;
	this.score = 0;
	this.bulletsFired = 0;
	this.changedLevel = false;
	this.buttonWidth = window.innerWidth/12;
	this.enemySpeed = 10;
	this.tutorialComplete = false;
	//loading files
	this.playerImg = new Image();
	this.pauseImg = new Image();
	this.enemyImg = new Image();
	this.spaceImg = new Image();
	this.bulletImg = new Image();
	this.earthImg = new Image();
	this.playerImg.src = 'resources/HighRes/player.png';
	this.pauseImg.src = 'resources/HighRes/pauseButton.png';
	this.enemyImg.src = 'resources/HighRes/enemyship.png';
	this.spaceImg.src = 'resources/HighRes/background.png';
	this.bulletImg.src = 'resources/HighRes/laser.png';
	this.earthImg.src = 'resources/HighRes/earth.png';
	//this.gunSound = new Audio("gun.wav");
	//objects
	this.buttons.push(new Button(game.sceneManager.goToScene, "Pause", window.innerWidth/20,0,window.innerWidth/12,window.innerHeight/20, this.pauseImg));
	this.player = new Player(window.innerWidth/19,window.innerHeight/2, this.playerImg);
}
GameScene.prototype = new Scene();

GameScene.prototype.update = function()
{	
	if(this.tutorialComplete == false)
	{

		this.player.update();
		for(var i = 0; i < this.bullets.length; i++)
		{
			this.bullets[i].update();
			if(this.bullets[i].x > window.innerWidth || this.bullets[i].x < 0 ||
				this.bullets[i].y < 0 || this.bullets[i].y > window.innerHeight)
			{
				this.bullets.splice(i,1);
			}
		}
		if(this.bulletsFired > 5)
		{
			this.tutorialComplete = true;
			this.bulletsFired = 0;
		}

	}
	else
	{
		this.player.update();
		//this.soundtrack.play();
		//if(this.soundtrack.ended){
		//	this.soundtrack.currentTime = 0;
		//	this.soundtrack.play();
		//}
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
	
		//for(var i = 0; i < this.enemies.length; i++)
		//{
		//	this.enemies[i].update();
		//}
		//spawning enemies
		//if(this.timeSinceSpawn >= this.spawnTimer)
		//{
			//Random Spawns for enemies
		//	var enemyPos = Math.random();
		//	var xEnemyPass = window.innerWidth + window.innerWidth/5;
		//	var yEnemyPass = enemyPass % (window.innerHeight - window.innerHeight/10);
		//	this.enemies.push(new Enemy(xEnemyPass, yEnemyPass, this.enemyImg, this.enemySpeed));
		//	this.timeSinceSpawn = 0;
		//	if(this.spawnTimer > this.spawnLimit)
		//	{
		//		this.spawnTimer--;
		//		this.enemySpeed++;
		//	}
		//}
		//else{this.timeSinceSpawn++}
		//functions
		//this.detectCollisions(this.bullets, this.enemies);
		//this.detectDeath(this.enemies, this.player);
	}
}

GameScene.prototype.render = function()
{	
	ctx.drawImage(this.spaceImg, 0, 0, window.innerWidth, window.innerHeight);
	ctx.drawImage(this.earthImg, 0, 0, window.innerWidth/20, window.innerHeight);
	if(this.tutorialComplete == false)
	{
		for(var i = 0; i < this.bullets.length; i++)
		{
		 	this.bullets[i].render();
		}
		for(var i = 0; i < this.buttons.length; i++)
		{
		 	this.buttons[i].draw();
		}
		this.player.render();
		ctx.fillStyle = game.rgb(200,200,200);
	 	ctx.font = "bold 18px serif";
	 	ctx.fillText("Welcome to Planet Defence. Tap the left side of the screen to move up and down, and the right side to shoot!", window.innerWidth/18, window.innerHeight/15);
	 	ctx.fillText("The amount of human colonies left on earth is displayed at the bottom of the screen, and your ships health is to the right of that.", window.innerWidth/18, window.innerHeight/10);
	 	ctx.fillText("You're the last line of defence, soldier. Prepare yourself, they'll arrive once you've shot 5 lasers", window.innerWidth/18, window.innerHeight/8);
	}

	else
	{
		//if(game.currentLevel == 2)
		//{
		//	this.enemySpeed += 10;
		//}
		for(var i = 0; i < this.bullets.length; i++)
		{
		 	this.bullets[i].render();
		}
		//for(var i = 0; i < this.enemies.length; i++)
		//{
		//	this.enemies[i].render();
		//}
		for(var i = 0; i < this.buttons.length; i++)
		{
		 	this.buttons[i].draw();
		}

		this.player.render();
		ctx.fillStyle = game.rgb(200,200,200);
	 	ctx.font = "bold 18px serif";
	 	ctx.fillText("Current Score: " + this.score, window.innerWidth - window.innerWidth/5, window.innerHeight/40);
	 	ctx.fillText("High Score: " + game.score, window.innerWidth - window.innerWidth/5, window.innerHeight/20);
	}
}

GameScene.prototype.input = function(x,y){
	//this.bullets.push(new Bullet(this.player.x + this.player.width, this.player.y + this.player.height/2, x, y));
	//this.gunSound.play();
	//this.gunSound.currentTime = 0;
	//this.bulletsFired++;
	for(var i = 0; i < this.buttons.length; i++)
	{
		this.buttons[i].isClicked(x,y);
	}
	if(x > window.innerWidth/2)
	{
		this.bullets.push(new Bullet(this.player.x + this.player.width, this.player.y + this.player.height/2, this.bulletImg));
		this.bulletsFired++;
	}
	else
		this.player.moveCommand(x,y);
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
	//this.soundtrack.pause();
	//this.soundtrack.currentTime = 0;
	game.sceneManager.goToScene("Game Over");
	console.log("Games over pal");
}

GameScene.prototype.onTouchStart = function(x,y){	
	if(x > window.innerWidth/10)
	{
		this.bullets.push(new Bullet(this.player.x + this.player.width, this.player.y + this.player.height/2, x, y));
		this.bulletsFired++;
	}
	else
		this.player.moveCommand(x,y);

	for(var i = 0; i < this.buttons.length; i++)
	{
		this.buttons[i].isClicked(x,y);
	}
}

GameScene.prototype.onTouchMove = function(x,y){
}

GameScene.prototype.onTouchEnd = function(x,y){
	this.player.stopMoving();
}
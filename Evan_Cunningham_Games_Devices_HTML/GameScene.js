function GameScene(){
	this.title = "Game";
	this.enemies = [];
	this.particles = [];
	//enemy spawn vars
	this.spawnTimer = 60;
	this.timeSinceSpawn = 0;
	this.spawnTimerLevel2 = 40;
	this.timeSinceSpawnLevel2 = 0;
	//rate of increase in spawn rate (higher number = slower)
	this.spawnLimit = 40;
	this.score = 0;
	this.changedLevel = false;
	this.enemySpeed = window.innerWidth/80;
	this.enemySpeed2 = window.innerWidth / 50;
	this.enemyWidth = window.innerWidth/25;
	this.enemyHeight = window.innerHeight/25;
	this.enemyWidth2 = window.innerWidth/18;
	this.enemyHeight2 = window.innerHeight/28;
	this.tutorialComplete = false;
	this.enemyCount = 0;
	this.groundHeight = 9 * window.innerHeight/10;
	this.killBoxX = window.innerWidth/25;
	//loading files
	this.playerImg = new Image();
	this.playerAnimationImg = new Image();
	this.pauseImg = new Image();
	this.enemyImg = new Image();
	this.enemyImg2 = new Image();
	this.backImg = new Image();
	this.backImg2 = new Image();
	this.doomImg = new Image();
	this.playerImg.src = 'resources/HighRes/player.png';
	this.playerAnimationImg.src = 'resources/HighRes/player1.png';
	this.pauseImg.src = 'resources/HighRes/pauseButton.png';
	this.enemyImg.src = 'resources/HighRes/enemy.png';
	this.enemyImg2.src = 'resources/HighRes/flyEnemy.png';
	this.backImg.src = 'resources/HighRes/background.png';
	this.backImg2.src = 'resources/HighRes/background2.png';
	this.doomImg.src = 'resources/HighRes/doom.png';
	//Game Update
	this.worldMoveSpeed = window.innerWidth/100;
	this.xPosBackground1 = 0;
	this.xPosBackground2 = window.innerWidth;
	this.animationCount = 0;
	this.animationFrame = 0;
	GameScene.gameRunning = true;
	//objects
	this.player = new Player(window.innerWidth/15, this.groundHeight, this.playerImg, this.playerAnimationImg);
	this.buttons.push(new Button(this.pauseGame, "Game", (window.innerWidth/10 - window.innerWidth/10), window.innerHeight/40, window.innerWidth/10, window.innerHeight/20, this.pauseImg));
}
GameScene.prototype = new Scene();

GameScene.prototype.update = function()
{	
	//ensure game isn't paused before updating
	if(!GameScene.gameRunning){

	}
	else
	{
		this.worldMovement();
		this.player.update();
		this.updateLists();
		//particle system
		if(this.player.y < this.groundHeight - window.innerHeight/1000)
		{
			this.particles.push(new Particles(this.player.x + this.player.width / 3, this.player.y + this.player.height - 3, -1));
		}
		//tutorial logic (enemies spawn at regular intervals to practice and there's no downside to failure)
		if(game.tutorialComplete == false)
		{
			this.tutorialGameLogic();
		}
		//game logic (scaling difficulty, collision detection)
		else
		{				
			this.inGameLogic();
			//Game functions
			this.detectCollisions(this.player, this.enemies);
			this.detectDeath(this.player);
		}
	}
}

GameScene.prototype.render = function()
{	
	if(this.changedLevel)
	{		
		ctx.drawImage(this.backImg2, this.xPosBackground1, 0, window.innerWidth + window.innerWidth/10, window.innerHeight);
		ctx.drawImage(this.backImg2, this.xPosBackground2, 0, window.innerWidth + window.innerWidth/10, window.innerHeight);
	}
	else{
		ctx.drawImage(this.backImg, this.xPosBackground1, 0, window.innerWidth + window.innerWidth/10, window.innerHeight);
		ctx.drawImage(this.backImg, this.xPosBackground2, 0, window.innerWidth + window.innerWidth/10, window.innerHeight);
	}
	//drawing enemies, particles and buttons
	for(var i = 0; i < this.enemies.length; i++)
	{
		this.enemies[i].render();
	}
	for(var i = 0; i < this.buttons.length; i++)
	{
	 	this.buttons[i].draw();
	}
	for(var i = 0; i < this.particles.length; i++)
	{
	 	this.particles[i].render();
	}
	//during tutorial you see useful information, afterwards you see your score and the IMPENDING DOOM
	if(game.tutorialComplete == false)
	{
		ctx.fillStyle = game.rgb(0,0,0);
	 	ctx.font = "bold 18px serif";
	 	ctx.fillText("Welcome to Box Hopper. Tap the screen to jump, try to avoid the obstacles, and the impending doom!", window.innerWidth/18, window.innerHeight/5);
	 	ctx.fillText("Jump 2 boxes to really begin!", window.innerWidth/5, window.innerHeight/4);
	}
	else
	{
		ctx.fillStyle = game.rgb(0,0,0);
	 	ctx.font = "bold 18px serif";
	 	ctx.fillText("Current Score: " + this.score, window.innerWidth - window.innerWidth/5, window.innerHeight/40);
	 	ctx.fillText("High Score: " + game.score, window.innerWidth - window.innerWidth/5, window.innerHeight/20);
	 	//IMPENDING DOOM!
		ctx.drawImage(this.doomImg, this.animationFrame * 475, 0, 475, 469, 0, this.groundHeight - window.innerHeight / 4, this.killBoxX, window.innerHeight/4);
	}
	//Stop player / doom animating while game paused
	if(!GameScene.gameRunning){
		this.player.render();
	}
	else{
		this.player.animate();
	 	if(this.animationFrame <= 2)
		{
			this.animationCount++;
		}
		else
		{ 
			this.animationFrame = 0;
		}
	}
}

GameScene.prototype.updateLists = function(){
	for(var i = 0; i < this.particles.length; i++)
	{
		this.particles[i].update();		
		if(this.particles[i].isAlive == false)
		{
			this.particles.splice(i, 1);
		}
	}
	//enemy updates
	for(var i = 0; i < this.enemies.length; i++)
	{
		this.enemies[i].update();
		if(this.enemies[i].x < 0)
		{
			this.enemyCount++;
			this.enemies.splice(i, 1);
			if(game.tutorialComplete)
			{
				game.gameWon = false;
				this.score += 5;
				if(this.score >= 50)
				{
					this.changedLevel = true;
				}
				if(this.score >= 100)
				{
					game.gameWon = true;
				}
			}
		}					
	}
}

GameScene.prototype.input = function(x,y){
	for(var i = 0; i < this.buttons.length; i++)
	{
		this.buttons[i].isClicked(x,y);
	}
	this.player.moveCommand(x,y);	
}

GameScene.prototype.tutorialGameLogic = function(){
	if(this.enemyCount >= 2){
		game.tutorialComplete = true;
	}
	//spawning tutorial enemies
	if(this.timeSinceSpawn >= this.spawnTimer)
	{
		//Random Spawns for enemies
		var xEnemyPass = window.innerWidth + window.innerWidth/5;
		this.enemies.push(new Enemy(xEnemyPass, this.groundHeight, this.enemyImg, this.enemySpeed, this.enemyWidth, this.enemyHeight));
		//resetting timer for enemy spawn
		this.timeSinceSpawn = 0;
	}
	else{this.timeSinceSpawn++}
}

GameScene.prototype.inGameLogic = function(){
	//spawning game enemies (scaling difficulty)
	if(this.timeSinceSpawn >= this.spawnTimer)
	{
		//Random Spawns for enemies
		var xEnemyPass = window.innerWidth + window.innerWidth/25;
		this.enemies.push(new Enemy(xEnemyPass, this.groundHeight, this.enemyImg, this.enemySpeed, this.enemyWidth, this.enemyHeight));
		//resetting timer for enemy spawn
		this.timeSinceSpawn = 0;
		//scaling difficulty
		if(this.spawnTimer > this.spawnLimit)
		{
			this.spawnTimer--;
			this.enemySpeed++;
		}
	}
	else{this.timeSinceSpawn++}
	//More boxes spawn in level 2
	if(this.changedLevel && this.timeSinceSpawnLevel2 >= this.spawnTimerLevel2)
	{
		//Random Spawns for enemies
		var xEnemyPass = window.innerWidth + window.innerWidth/5;
		this.enemies.push(new Enemy(xEnemyPass, this.groundHeight - window.innerHeight/10, this.enemyImg2, this.enemySpeed2, this.enemyWidth2, this.enemyHeight2));
		//resetting timer for enemy spawn
		this.timeSinceSpawnLevel2 = 0;
	}
	else{this.timeSinceSpawnLevel2++}
	//Doom animation
	if(this.animationCount > 5)
	{
		this.animationFrame++;
		this.animationCount = 0;
	}
}

GameScene.prototype.detectCollisions = function(player, entities){	
	for(var i = 0; i < entities.length; i++)
	{
		if(player.x < entities[i].x + entities[i].width &&
			player.x + player.width > entities[i].x &&
			player.y < entities[i].y + entities[i].height &&
			player.y + player.height > entities[i].y)
		{
			entities.splice(i,1);
			player.x -= window.innerWidth/100;
		}
		if(entities[i].x < 0)
		{
			entities.splice(i, 1);
		}
	}
}


GameScene.prototype.detectDeath = function(character){
	if(character.x <= this.killBoxX)
	{
		this.gameOver();
	}
}

GameScene.prototype.gameOver = function(){
	if(this.score > game.score)
	{
		game.score = this.score;
	}
	game.previousScore = this.score;
	//Resetting arrays and error prevention
	this.paused = false;
	this.enemies = [];
	this.spawnTimer = 60;
	this.timeSinceSpawn = 0;
	this.enemySpeed = window.innerWidth/80;
	this.enemyCount = 0;
	//resetting the game
	this.player.x = window.innerWidth/15;
	this.player.y = this.groundHeight;
	this.score = 0;
	this.changedLevel = false;
	game.sceneManager.goToScene("Game Over");
}

GameScene.prototype.worldMovement = function(){
	//2 background images constantly moving left, then resetting when out of view
	if(this.xPosBackground1 > -window.innerWidth)
	{
		this.xPosBackground1 -= this.worldMoveSpeed;
	}
	else{
		this.xPosBackground1 = window.innerWidth;
	}
	if(this.xPosBackground2 > -window.innerWidth)
	{
		this.xPosBackground2 -= this.worldMoveSpeed;
	}
	else{
		this.xPosBackground2 = window.innerWidth;
	}
}

GameScene.prototype.pauseGame = function(){

	GameScene.gameRunning = !GameScene.gameRunning;
}

GameScene.prototype.onTouchStart = function(x,y){	
	this.player.moveCommand();

	for(var i = 0; i < this.buttons.length; i++)
	{
		this.buttons[i].isClicked(x,y);
	}
}

GameScene.prototype.onTouchMove = function(x,y){
}

GameScene.prototype.onTouchEnd = function(x,y){
//	this.player.stopMoving();
}
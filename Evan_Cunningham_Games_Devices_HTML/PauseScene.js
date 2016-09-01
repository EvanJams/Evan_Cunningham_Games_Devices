function PauseScene(){
	this.title = "Pause";
	this.buttons.push(new Button(game.sceneManager.goToScene, "Planet Defender", window.innerWidth/2,window.innerHeight/2,window.innerWidth/10,window.innerHeight/20));
	this.buttons.push(new Button(game.sceneManager.goToScene, "Game", window.innerWidth/3,window.innerHeight/2,window.innerWidth/10,window.innerHeight/20));
}

PauseScene.prototype = new Scene();

PauseScene.prototype.render = function(){
	ctx.drawImage(game.backImage, 0, 0, window.innerWidth, window.innerHeight);
 	ctx.font = "bold 48px serif";
 	ctx.fillText("Game Paused", 4 * window.innerWidth/10, window.innerHeight/3);
 	for(var i = 0; i < this.buttons.length; i++)
	{
	 	this.buttons[i].draw();
	}
}

PauseScene.prototype.input = function(x, y){	
	if(x > window.innerWidth/2 && x < window.innerWidth/2 + window.innerWidth/10
	&& y > window.innerHeight/2 && y < window.innerHeight/2 + window.innerHeight/20)
	{
		game.sceneManager.gameOver();
	}
	for(var i = 0; i < this.buttons.length; i++)
	{
		this.buttons[i].isClicked(x,y);
	}
}

PauseScene.prototype.onTouchStart = function(x,y){
	if(x > window.innerWidth/2 && x < window.innerWidth/2 + window.innerWidth/10
	&& y > window.innerHeight/2 && y < window.innerHeight/2 + window.innerHeight/20)
	{
		game.sceneManager.gameOver();
	}
	for(var i = 0; i < this.buttons.length; i++)
	{
		this.buttons[i].isClicked(x,y);
	}
}

PauseScene.prototype.onTouchMove = function(x,y){
}

PauseScene.prototype.onTouchEnd = function(x,y){
}
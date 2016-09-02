function GameOverScene(){
	this.title = "Game Over";
	this.gameButton = new Image();
	this.titleButton = new Image();
	this.gameButton.src = 'resources/HighRes/returnButton.png';
	this.titleButton.src = 'resources/HighRes/titleButton.png';
	this.buttons.push(new Button(game.sceneManager.goToScene, "Game", 4*window.innerWidth/10 - 15,window.innerHeight/2,window.innerWidth/10,window.innerHeight/20, this.gameButton));
	this.buttons.push(new Button(game.sceneManager.goToScene, "Planet Defender", 4*window.innerWidth/10 - 20, window.innerHeight/6, window.innerWidth/10, window.innerHeight/20, this.titleButton));
}

GameOverScene.prototype = new Scene();

GameOverScene.prototype.render = function()
{	
	ctx.drawImage(game.backImage, 0, 0, window.innerWidth, window.innerHeight);
 	ctx.font = "bold 48px serif";
 	ctx.fillText(this.title, window.innerWidth/2 - window.innerWidth/8, window.innerHeight/3 + 48);
 	ctx.fillText("Your Score: " + game.previousScore, window.innerWidth/2 - window.innerWidth/8, window.innerHeight/10);
	for(var i = 0; i < this.buttons.length; i++)
	{
	 	this.buttons[i].draw();
	}
}

GameOverScene.prototype.input = function(x,y){
	for(var i = 0; i < this.buttons.length; i++)
	{
		this.buttons[i].isClicked(x,y);
	}
}

GameOverScene.prototype.onTouchStart = function(x,y){
	for(var i = 0; i < this.buttons.length; i++)
	{
		this.buttons[i].isClicked(x,y);
	}
}

GameOverScene.prototype.onTouchMove = function(x,y){
}

GameOverScene.prototype.onTouchEnd = function(x,y){
}
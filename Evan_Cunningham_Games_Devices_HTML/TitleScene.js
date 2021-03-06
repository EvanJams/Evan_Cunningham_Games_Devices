function TitleScene(){
	this.title = "Title";
	this.playImg = new Image();
	this.titleImg = new Image();
	this.optionImg = new Image();
	this.playImg.src = 'resources/HighRes/playButton.png';
	this.titleImg.src = 'resources/HighRes/title.png';
	this.optionImg.src = 'resources/HighRes/optionButton.png';
	this.buttons.push(new Button(game.sceneManager.goToScene, "Game", (window.innerWidth/2 - window.innerWidth/8), window.innerHeight/2, window.innerWidth/8, window.innerHeight/20, this.playImg));
	this.buttons.push(new Button(game.sceneManager.goToScene, "Menu", (window.innerWidth/2 - window.innerWidth/8), 2 * window.innerHeight/3, window.innerWidth/8, window.innerHeight/20, this.optionImg));

}

TitleScene.prototype = new Scene();

TitleScene.prototype.render = function(){
	ctx.drawImage(game.backImage, 0, 0, window.innerWidth, window.innerHeight);
	//Game Title 3D text

	ctx.drawImage(this.titleImg, window.innerWidth / 8, window.innerHeight / 8, window.innerWidth / 1.5, window.innerHeight / 4);
 	
	for(var i = 0; i < this.buttons.length; i++)
	{
	 	this.buttons[i].draw();
	}
}

TitleScene.prototype.input = function(x, y){
	for(var i = 0; i < this.buttons.length; i++)
	{
		this.buttons[i].isClicked(x,y);
	}
}

TitleScene.prototype.onTouchStart = function(x,y){
	for(var i = 0; i < this.buttons.length; i++)
	{
		this.buttons[i].isClicked(x,y);
	}
}

TitleScene.prototype.onTouchMove = function(x,y){
}

TitleScene.prototype.onTouchEnd = function(x,y){
}
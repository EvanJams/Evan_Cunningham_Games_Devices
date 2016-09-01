function TitleScene(){
	this.title = "Planet Defender";
	this.playImg = new Image();
	this.settingsImg = new Image();
	this.playImg.src = 'resources/HighRes/playButton.png';
	this.settingsImg.src = 'resources/HighRes/settingsButton.png';
	this.buttons.push(new Button(game.sceneManager.goToScene, "Game", (window.innerWidth/2 - window.innerWidth/10), window.innerHeight/2, window.innerWidth/10, window.innerHeight/20, this.playImg));
	this.buttons.push(new Button(game.sceneManager.goToScene, "Menu", (window.innerWidth/2 - window.innerWidth/10), 2*window.innerHeight/3, window.innerWidth/10, window.innerHeight/20, this.settingsImg));

}

TitleScene.prototype = new Scene();

TitleScene.prototype.render = function(){
	ctx.drawImage(game.backImage, 0, 0, window.innerWidth, window.innerHeight);
	//Game Title 3D text
	ctx.font = "bold 50px serif";
	ctx.fillStyle = game.rgb(250,250,250);	
 	ctx.fillText(this.title, window.innerWidth/2 - window.innerWidth/7 - 3, window.innerHeight/3);
 	ctx.font = "bold 49px serif";
	ctx.fillStyle = game.rgb(0,0,0);	
 	ctx.fillText(this.title, window.innerWidth/2 - window.innerWidth/7, window.innerHeight/3);
 	
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
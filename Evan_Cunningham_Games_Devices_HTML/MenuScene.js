function MenuScene(){
	this.title = "Menu";
	this.returnButton = new Image();
	this.currentButton = new Image();
	this.returnButton.src = 'resources/HighRes/returnButton.png';
	this.currentButton.src = 'resources/HighRes/optionButtonOn.png';
	this.buttons.push(new Button(this.changeOption, "Menu", 4*window.innerWidth/10,window.innerHeight/2,window.innerWidth/10,window.innerHeight/20, this.currentButton));
	this.buttons.push(new Button(game.sceneManager.goToScene, "Title", 4*window.innerWidth/10, window.innerHeight/3, window.innerWidth/10, window.innerHeight/20, this.returnButton));
}

MenuScene.prototype = new Scene();

MenuScene.prototype.render = function()
{	
	ctx.drawImage(game.backImage, 0, 0, window.innerWidth, window.innerHeight);
 	ctx.font = "bold 48px serif";
 	ctx.fillText(this.title, window.innerWidth/2 - window.innerWidth/10, window.innerHeight/6);
	for(var i = 0; i < this.buttons.length; i++)
	{
	 	this.buttons[i].draw();
	}
	if(game.tutorialComplete == false)
	{
		ctx.fillText("On", 4*window.innerWidth/10 + window.innerWidth/9, window.innerHeight/2);
	}
	else{ ctx.fillText("Off", 4*window.innerWidth/10 + window.innerWidth/9, window.innerHeight/2); }
}

MenuScene.prototype.changeOption = function(){
	console.log("tutbut" + game.tutorialComplete);
	game.tutorialComplete = !game.tutorialComplete;

}

MenuScene.prototype.input = function(x,y){
	for(var i = 0; i < this.buttons.length; i++)
	{
		this.buttons[i].isClicked(x,y);
	}
}

MenuScene.prototype.onTouchStart = function(x,y){
	for(var i = 0; i < this.buttons.length; i++)
	{
		this.buttons[i].isClicked(x,y);
	}
}

MenuScene.prototype.onTouchMove = function(x,y){
}

MenuScene.prototype.onTouchEnd = function(x,y){
}
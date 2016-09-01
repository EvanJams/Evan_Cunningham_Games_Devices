function MenuScene(){
	this.title = "Menu";
	this.buttons.push(new Button(game.sceneManager.goToScene, "Game", window.innerWidth/3,window.innerHeight/2,window.innerWidth/10,window.innerHeight/20));
	this.buttons.push(new Button(game.sceneManager.goToScene, "Planet Defender", 4*window.innerWidth/10, window.innerHeight/6, window.innerWidth/10, window.innerHeight/20));
}

MenuScene.prototype = new Scene();

MenuScene.prototype.render = function()
{	
	ctx.drawImage(game.backImage, 0, 0, window.innerWidth, window.innerHeight);
 	ctx.font = "bold 48px serif";
 	ctx.fillText(this.title, window.innerWidth/2 - window.innerWidth/10, window.innerHeight/3 + 48);
	for(var i = 0; i < this.buttons.length; i++)
	{
	 	this.buttons[i].draw();
	}
	ctx.fillRect(5*window.innerWidth/9, window.innerHeight/2, window.innerWidth/5, window.innerHeight/20);
 	ctx.font = "bold 28px serif";
	ctx.fillStyle = game.rgb(0,0,0);
 	ctx.fillText("Play", window.innerWidth/3+ 20, window.innerHeight/2 + 35);
 	ctx.fillText("Return", 4*window.innerWidth/10 + 5, window.innerHeight/6 + 35);
 	ctx.fillText("Colourblind Mode", 5*window.innerWidth/9 + 20, window.innerHeight/2 + 35);
}

MenuScene.prototype.input = function(x,y){
	for(var i = 0; i < this.buttons.length; i++)
	{
		this.buttons[i].isClicked(x,y);
	}

	if(x > 5*window.innerWidth/9 && x < 5*window.innerWidth/9 + window.innerWidth/5
	&& y > window.innerHeight/2 && y < window.innerHeight/2 + window.innerHeight/20)
	{
		if(game.colourBlind == true){
			game.colourBlind = false;
		}
		else{
			game.colourBlind = true;
		}
		console.log(game.colourBlind);
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
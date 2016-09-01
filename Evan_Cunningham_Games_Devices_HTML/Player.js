function Player(xPos, yPos){
	this.x = xPos;
	this.y = yPos;
	this.width = 20;
	this.height = 20;
}

Player.prototype.render = function()
{	
	console.log(game.colourBlind);
	if(game.colourBlind == true){
		ctx.fillStyle = game.rgb(10,200,200);
	}
	else if(game.colourBlind == false){
		ctx.fillStyle = game.rgb(10,200,10);
	}
	ctx.fillRect(this.x, this.y, this.width, this.height);
}

Player.prototype.start = function(){

}

Player.prototype.stop = function(){

}

Player.prototype.update = function(){

}

Player.prototype.input = function(x,y){

}
function Player(xPos, yPos, img){
	this.x = xPos;
	this.y = yPos;
	this.yVelocity = 0;
	this.image = img;
	this.width = window.innerWidth/20;
	this.height = window.innerHeight/20;
	this.goingUp = false;
}

Player.prototype.render = function()
{
	ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
}

Player.prototype.moveCommand = function(x,y){
	if(y > this.y)
	{
		this.yVelocity = 10;
		this.goingUp = true;
	}
	else
	{
		this.yVelocity = -10;
		this.goingUp = false;
	}
}

Player.prototype.stopMoving = function(){
	console.log("stop");
	this.yVelocity = 0;
}

Player.prototype.start = function(){

}

Player.prototype.stop = function(){

}

Player.prototype.update = function(){
	if(this.goingUp == false && this.y > this.height ||
		this.goingUp == true && this.y < window.innerHeight - this.height*2)
	{
		this.y += this.yVelocity;
	}
}

Player.prototype.input = function(x,y){

}
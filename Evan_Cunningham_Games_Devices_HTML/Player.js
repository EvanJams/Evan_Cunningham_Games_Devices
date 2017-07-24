function Player(xPos, yPos, img){
	this.yVelocity = 0;
	this.image = img;
	this.width = window.innerWidth/20;
	this.height = window.innerHeight/20;
	this.x = xPos;
	this.y = yPos - this.height/2;
	this.groundHeight = yPos - this.height/2;
	this.gravity = 0.5;
	this.goingUp = false;
}

Player.prototype.render = function()
{
	ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
}

Player.prototype.moveCommand = function(){
	/*
	if(this.y == window.innerHeight/2)
	{
		this.yVelocity = 10;
		this.goingUp = true;
	}
	else
	{
		this.yVelocity = -10;
		this.goingUp = false;
	}
	*/
	if(this.y == this.groundHeight - this.height/2){
		this.yVelocity = -10;
	}
}

Player.prototype.stopMoving = function(){
	console.log("stop");
	//this.yVelocity = 0;
}

Player.prototype.start = function(){

}

Player.prototype.stop = function(){

}

Player.prototype.update = function(){	
	if(this.y < this.groundHeight - this.height / 2){
		this.yVelocity += this.gravity;
	}
	else if(this.y > this.groundHeight - this.height/2){
		this.yVelocity = 0;
		this.y = this.groundHeight - this.height/2;
	}
	this.y += this.yVelocity;
	console.log(this.y, this.yVelocity);
}

Player.prototype.input = function(x,y){

}
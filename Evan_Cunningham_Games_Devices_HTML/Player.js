function Player(xPos, yPos, img){
	this.yVelocity = 0;
	this.image = img;
	this.width = window.innerWidth/25;
	this.height = this.width;
	this.x = xPos;
	this.y = yPos - this.height/2;
	this.groundHeight = yPos - this.height/2;
	this.gravity = 0.5;
	this.goingUp = false;
	this.speed = -10;
	this.animationCount = 13;
}

Player.prototype.render = function()
{
	//ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
	if(this.animationCount >= 0)
	{
		ctx.drawImage(this.image, this.animationCount * 43.7, 0, 43.3, 43, this.x, this.y, this.width, this.height);
		this.animationCount--;
	}
	else{ this.animationCount = 13; }
}

Player.prototype.moveCommand = function(){
	if(this.y == this.groundHeight - this.height/2){
		this.yVelocity = this.speed;
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
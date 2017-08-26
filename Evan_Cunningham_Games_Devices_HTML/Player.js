function Player(xPos, yPos, img, animationImg){
	this.yVelocity = 0;
	this.image = img;
	this.animationImage = animationImg;
	this.width = window.innerWidth/25;
	this.height = this.width;
	this.x = xPos;
	this.y = yPos - this.height/2;
	this.groundHeight = yPos - this.height/2;
	this.gravity = window.innerHeight /3000;
	this.speed = -window.innerHeight /150;
	this.animationCount = 12;
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
}

Player.prototype.render = function()
{
	ctx.drawImage(this.image, this.x, this.y, this.width, this.height);	
}

Player.prototype.animate = function(){
	ctx.drawImage(this.animationImage, this.animationCount * 43.7, 0, 43.3, 43, this.x, this.y, this.width, this.height);
	if(this.animationCount > 0)
	{
		this.animationCount--;
	}
	else{ this.animationCount = 12; }
}

Player.prototype.moveCommand = function(){
	if(this.y == this.groundHeight - this.height/2){
		this.yVelocity = this.speed;
	}
}

Player.prototype.stopMoving = function(){

}

Player.prototype.start = function(){

}

Player.prototype.stop = function(){

}

Player.prototype.input = function(x,y){

}
function Bullet(xPos, yPos, xDest, yDest){
	this.x = xPos;
	this.y = yPos;
	this.width = 5;
	this.height = 5;
	this.xVel = xDest - xPos;
	this.yVel = yDest - yPos;
	var length = Math.sqrt(this.xVel * this.xVel + this.yVel * this.yVel);
	this.xVel = this.xVel / length;
	this.yVel = this.yVel / length;
}

Bullet.prototype.render = function()
{	
	ctx.fillStyle = game.rgb(10,250,10);
	ctx.fillRect(this.x, this.y, this.width, this.height);
}

Bullet.prototype.start = function(){

}

Bullet.prototype.stop = function(){

}

Bullet.prototype.update = function(){
	this.x += this.xVel * 4;
	this.y += this.yVel * 4;
}

Bullet.prototype.input = function(x,y){

}
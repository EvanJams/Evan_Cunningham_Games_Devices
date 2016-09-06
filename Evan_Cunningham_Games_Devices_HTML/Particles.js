function Particles(xPos, yPos, xDir){
	this.x = xPos;
	this.y = yPos;
	this.xDir = xDir;
	this.width = 3;
	this.height = 3;
	this.signRandom = Math.random() * 10;
	this.randomNum = Math.random() * 10;	
	this.randomNum2 = Math.random() * 10;
	this.randomNum3 = Math.random() * 4;
	this.xVel = this.randomNum * this.xDir;
	this.yVel = this.randomNum2;
	this.lifeSpan = this.randomNum3;
	this.isAlive = true;

	if(this.signRandom > 4)
	{
		this.yVel *= -1;
	}
}

Particles.prototype.render = function()
{
	ctx.fillStyle = game.rgb(200,10,10);
	ctx.fillRect(this.x, this.y, this.width, this.height);
}

Particles.prototype.start = function(){

}

Particles.prototype.stop = function(){

}

Particles.prototype.update = function(){

	console.log("" + this.x);
	this.x += this.xVel;
	this.y += this.yVel;
	this.lifeSpan--;
	if(this.lifeSpan <= 0)
	{
		this.isAlive = false;
		console.log("" + this.isAlive + this.lifeSpan)
	}
}

Particles.prototype.input = function(x,y){

}
function Particles(xPos, yPos, xDir){
	this.x = xPos;
	this.y = yPos;
	this.xDir = xDir;
	this.width = 4;
	this.height = 4;
	//particles will spew out in random directions
	this.randomVelX = Math.random() * 20;	
	this.randomVelY = Math.random() * 5;
	this.randomLifespan = Math.random() * 6;
	this.xVel = this.randomVelX * this.xDir;
	this.yVel = - this.randomVelY;
	this.lifeSpan = this.randomLifespan;
	this.isAlive = true;
}

Particles.prototype.render = function()
{
	ctx.fillStyle = game.rgb(100,100,100);
	ctx.fillRect(this.x, this.y, this.width, this.height);
}

Particles.prototype.start = function(){

}

Particles.prototype.stop = function(){

}

Particles.prototype.update = function(){
	this.x += this.xVel;
	this.y += this.yVel;
	this.lifeSpan--;
	if(this.lifeSpan <= 0)
	{
		this.isAlive = false;
	}
}

Particles.prototype.input = function(x,y){

}
function Bullet(xPos, yPos, img){
	this.x = xPos;
	this.y = yPos;
	this.width = window.innerWidth/200;
	this.height = window.innerHeight/50;
	this.image = img;
	this.xVel = 10;
	//animating bullets
	this.spriteWidth = 58;
	this.spriteHeight = 74;
	this.timeSinceLastFrame = 0;
	this.currentFrame = 0;
	this.frameTime = 30;
	this.now;
	this.then = Date.now();
}

Bullet.prototype.render = function()
{	
	ctx.fillStyle = game.rgb(10,250,10);
	ctx.drawImage(this.image, (this.currentFrame % 5) * this.spriteWidth, 0,
		this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
}

Bullet.prototype.start = function(){

}

Bullet.prototype.stop = function(){

}

Bullet.prototype.update = function(){
	this.now = Date.now();
	this.incFrame(this.now - this.then);

	this.x += this.xVel;

	this.then = this.now;
}

Bullet.prototype.input = function(x,y){

}

Bullet.prototype.incFrame = function(dt){
	this.timeSinceLastFrame += dt;
	if (this.timeSinceLastFrame > this.frameTime)
	{
		this.timeSinceLastFrame = 0;
		if (this.currentFrame < 14) 
			this.currentFrame++;
		else
			this.currentFrame = 0;
	}
}
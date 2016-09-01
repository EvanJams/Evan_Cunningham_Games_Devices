function Enemy(xPos, yPos, xDest, yDest, pic){
	this.x = xPos;
	this.y = yPos;
	this.width = window.innerWidth/75;
	this.height = window.innerHeight/30;
	this.xVel = xDest - xPos;
	this.yVel = yDest - yPos;
	var length = Math.sqrt(this.xVel * this.xVel + this.yVel * this.yVel);
	this.xVel = this.xVel / length;
	this.yVel = this.yVel / length;
	//Animation
	this.sprite = pic;
	this.spriteWidth = 98;
	this.spriteHeight = 164;
	this.timeSinceLastFrame = 0;
	this.currentFrame = 0;
	this.frameTime = 30;
	this.now;
	this.then = Date.now();
}

Enemy.prototype.render = function()
{	
	ctx.fillStyle = game.rgb(200,10,10);
	if(this.x > window.innerWidth/2){
		ctx.drawImage(this.sprite, (this.currentFrame % 12) * this.spriteWidth, 0,
		this.spriteWidth, this.spriteHeight, this.x, this.y, 
	}
	else{		
		ctx.drawImage(this.sprite, (this.currentFrame % 12) * this.spriteWidth, 164,
		this.spriteWidth, this.spriteHeight, this.x, this.y, 
	}
}

Enemy.prototype.update = function(){
	this.now = Date.now();
	this.incFrame(this.now - this.then);
	this.then = this.now;
}

Enemy.prototype.input = function(x,y){

}

Enemy.prototype.incFrame = function(dt){
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
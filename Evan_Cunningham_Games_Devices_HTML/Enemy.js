function Enemy(xPos, yPos, pic, speed){
	this.x = xPos;
	this.y = yPos;
	this.width = window.innerWidth/30;
	this.height = window.innerHeight/30;
	this.xVel = speed;
	this.sprite = pic;
	this.spriteWidth = 98;
	this.spriteHeight = 164;
}

Enemy.prototype.render = function()
{	
	ctx.fillStyle = game.rgb(200,10,10);
	ctx.drawImage(this.sprite, this.x, this.y, this.width, this.height);
}

Enemy.prototype.update = function(dest){
	this.x -= this.speed;
	if(dest > this.y)
		this.y += 1
	else
		this.y -=1;
}

Enemy.prototype.input = function(x,y){

}
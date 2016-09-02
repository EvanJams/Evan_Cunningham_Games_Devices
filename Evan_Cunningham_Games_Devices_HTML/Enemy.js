function Enemy(xPos, yPos, pic, speed){
	this.x = xPos;
	this.y = yPos;
	this.width = window.innerWidth/30;
	this.height = window.innerHeight/30;
	this.vel = speed;
	this.sprite = pic;
}

Enemy.prototype.render = function()
{	
	ctx.drawImage(this.sprite, this.x, this.y, this.width, this.height);
}

Enemy.prototype.update = function(dest){
	this.x -= this.vel;
	if(dest > this.y)
		this.y += this.vel/10;
	else
		this.y -= this.vel/10;
}

Enemy.prototype.input = function(x,y){

}
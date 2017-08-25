function Enemy(xPos, yPos, pic, speed){
	this.width = window.innerWidth/25;
	this.height = this.width;
	this.x = xPos;
	this.y = yPos - this.height;
	this.vel = speed;
	this.sprite = pic;
}

Enemy.prototype.render = function()
{	
	if(this.x < window.innerWidth + this.width)
	{
		ctx.drawImage(this.sprite, this.x, this.y, this.width, this.height);
	}
}

Enemy.prototype.update = function(){
	this.x -= this.vel;
}

Enemy.prototype.input = function(x,y){

}
function Scene(){
	this.title;
	this.buttons = [];
}

Scene.prototype.render = function()
{
 	ctx.font = "bold 48px serif";
 	ctx.fillText(this.title, 250, 400);
 	for(var i = 0; i < this.buttons.length; i++)
 	{
	 	this.buttons[i].draw();
	}
}

Scene.prototype.start = function(){

}

Scene.prototype.stop = function(){

}

Scene.prototype.update = function(){

}

Scene.prototype.input = function(x,y){
	for(var i; i < this.buttons.length; i++)
	{
		this.buttons[i].isClicked(x,y);
	}
}
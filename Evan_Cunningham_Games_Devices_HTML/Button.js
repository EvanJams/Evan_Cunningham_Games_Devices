function Button(func, sceneTitle, xPos, yPos, buttonWidth, buttonHeight, buttonImg){
	this.x = xPos;
	this.y = yPos;
	this.width = buttonWidth;
	this.height = buttonHeight;
	this.whenPressed = func;
	this.title = sceneTitle;
	this.sprite = buttonImg;
}

Button.prototype.draw = function(){
	ctx.drawImage(this.sprite, this.x, this.y, this.width, this.height);
}

Button.prototype.isClicked = function(xCoOrd, yCoOrd){
	console.log("" + xCoOrd + " y " + yCoOrd);
	if(xCoOrd > this.x && xCoOrd < (this.x + this.width)
	&& yCoOrd > this.y && yCoOrd < (this.y + this.height))
	{
		this.whenPressed(this.title);
	}	
}
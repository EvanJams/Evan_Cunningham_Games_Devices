function Game(){
	this.initCanvas();
	this.sceneManager = new SceneManager();
	this.score = 0;
	this.previousScore = 0;
	this.backImage = new Image();
	this.backImage.src = 'resources/HighRes/menu.jpg';
}

Game.prototype.init = function(){
	//1. is this running in a touch capable environment?
	touchable = 'createTouch' in document;
	//2. If it is touchable, add a listener
	if(touchable) {
	    canvas.addEventListener( 'touchstart', game.onTouchStart, false );
	    canvas.addEventListener( 'touchmove', game.onTouchMove, false );
	    canvas.addEventListener( 'touchend', game.onTouchEnd, false );
	}
}

Game.prototype.gameLoop = function()
{	
	game.draw();
	window.requestAnimationFrame(game.gameLoop);
	game.sceneManager.update();
}

/*function for rgb for convenience*/
Game.prototype.rgb = function(r, g, b) 
{ 
	return 'rgb('+this.clamp(Math.round(r),0,255)+', '+this.clamp(Math.round(g),0,255)+', '+this.clamp(Math.round(b),0,255)+')';
}

/*helper function*/
Game.prototype.clamp =  function(value, min, max)
{ 
	if(max<min) { 
		var temp = min; 
		min = max; 
		max = temp; 
	}
	return Math.max(min, Math.min(value, max)); 
}

Game.prototype.initCanvas = function()
{
	canvas = document.createElement("canvas");
	//ctx is the content we will draw on
	ctx = canvas.getContext("2d");
	document.body.appendChild(canvas);
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
}

Game.prototype.draw = function()
{
	ctx.clearRect(0,0,window.innerWidth, window.innerHeight);

	this.sceneManager.draw();
}

Game.prototype.input = function(e){
	game.sceneManager.input(e.pageX, e.pageY)
}

Game.prototype.inputKeys = function(e){
	game.sceneManager.inputKeys(e);
}

Game.prototype.onTouchStart = function(e){
	e.preventDefault();
	game.sceneManager.onTouchStart(e.touches[0].pageX, e.touches[0].pageY);
}

Game.prototype.onTouchMove = function(e){
    e.preventDefault();
    touches = e.touches;
    game.sceneManager.onTouchMove(e.touches[0].x, e.touches[0].y);
} 

Game.prototype.onTouchEnd = function(e){
	e.preventDefault();
	game.sceneManager.onTouchEnd(0, 0);
}
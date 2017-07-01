function SceneManager(){
	this.list = [];
	this.currentScene = 0;
}

SceneManager.prototype.addScene = function(scene){
	this.list.push(scene);
}

SceneManager.prototype.goToScene = function(title){
	console.log(title);
	game.sceneManager.list[game.sceneManager.currentScene].stop();
	for (var i = game.sceneManager.list.length - 1; i >= 0; i--) {
		if(game.sceneManager.list[i].title == title)
		{
			game.sceneManager.currentScene = i;
		}
	}
	game.sceneManager.list[game.sceneManager.currentScene].start();
}

SceneManager.prototype.nextScene = function(title){
	if (this.currentScene < this.list.length -1){		
		this.currentScene++;
	}
	else
		this.currentScene = 0;
}

SceneManager.prototype.draw = function(){
	this.list[this.currentScene].render();
}

SceneManager.prototype.input = function(x,y){
	this.list[this.currentScene].input(x,y);

}

SceneManager.prototype.update = function(){
	this.list[this.currentScene].update();
}

SceneManager.prototype.gameOver = function(){
//	this.list[2].gameOver();
}

SceneManager.prototype.onTouchStart = function(x,y){
	this.list[this.currentScene].onTouchStart(x,y);
}

SceneManager.prototype.onTouchMove = function(x,y){
	this.list[this.currentScene].onTouchMove(x,y);
}

SceneManager.prototype.onTouchEnd = function(x,y){
	this.list[this.currentScene].onTouchEnd(x,y);
}
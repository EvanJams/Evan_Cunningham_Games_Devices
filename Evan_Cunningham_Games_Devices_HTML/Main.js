var game;

function main()
{
	game = new Game();
	game.init();
	game.sceneManager.addScene(new TitleScene());
	//game.sceneManager.addScene(new GameScene());
	//game.sceneManager.addScene(new GameOverScene());
	game.gameLoop();
	window.addEventListener("mousedown", game.input);
}
#include "MainMenuScene.h"

USING_NS_CC;

Scene* MainMenu::createScene()
{
	// 'scene' is an autorelease object
	auto scene = Scene::create();
	auto layer = MainMenu::create();

	scene->addChild(layer);

	return scene;
}

bool MainMenu::init()
{
	if (!Layer::init())
	{
		return false;
	}

	auto menuTitle =
		MenuItemImage::create("MainMenu/menu.jpg",
		"MainMenu/menu.jpg");
	//clickable event item. first param = unclicked, second = clicked, third optional = function
	auto playItem =
		MenuItemImage::create("MainMenu/playButton.png",
		"MainMenu/playButton.png",
		CC_CALLBACK_1(MainMenu::activateGameScene, this));

	//can specify any number of menu items here, must end with null
	auto menu = Menu::create(menuTitle, playItem, NULL);

	// Returns visible size of OpenGL window in points.
	Size visibleSize = Director::getInstance()->getVisibleSize();
	menu->alignItemsVerticallyWithPadding(visibleSize.height / 4);
	this->addChild(menu);

	return true;
}

void MainMenu::activateGameScene(Ref *pSender)
{
	auto scene = GameScreen::createScene();
	Director::getInstance()->replaceScene(TransitionFade::create(1.0, scene));
}
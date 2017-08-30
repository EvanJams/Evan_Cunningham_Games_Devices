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

	// Returns visible size of OpenGL window in points.
	Size visibleSize = Director::getInstance()->getVisibleSize();

	//creating the background image, making it the size of the screen
	auto menuTitle =
		Sprite::create("MainMenu/menu.jpg");
	menuTitle->setPosition(Point(visibleSize.width / 2,visibleSize.height / 2));
	menuTitle->setScaleX(visibleSize.width / 949);
	menuTitle->setScaleY(visibleSize.height / 534);

	this->addChild(menuTitle);
	//
	auto titleItem =
		MenuItemImage::create("MainMenu/title.png",
		"MainMenu/title.png");
	titleItem->setScaleX((visibleSize.width / 1.5) / 1000);
	titleItem->setScaleY((visibleSize.height / 10) / 200);

	//clickable event item. first param = unclicked, second = clicked, third optional = function
	auto playItem =
		MenuItemImage::create("MainMenu/playButton.png",
		"MainMenu/playButton.png",
		CC_CALLBACK_1(MainMenu::activateGameScene, this));
	playItem->setScaleX((visibleSize.width / 5) / 495);
	playItem->setScaleY((visibleSize.height / 8) / 168);

	//can specify any number of menu items here, must end with null
	auto menu = Menu::create(titleItem, playItem, NULL);
	menu->alignItemsVerticallyWithPadding(visibleSize.height / 4);
	this->addChild(menu);

	return true;
}

void MainMenu::activateGameScene(Ref *pSender)
{
	auto scene = GameScreen::createScene();
	Director::getInstance()->replaceScene(TransitionFade::create(1.0, scene));
	CocosDenshion::SimpleAudioEngine::sharedEngine()->playBackgroundMusic("Audio/background.mp3", true);
}
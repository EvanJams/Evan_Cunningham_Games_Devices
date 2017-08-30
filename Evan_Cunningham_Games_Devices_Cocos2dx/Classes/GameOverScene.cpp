#include "GameOverScene.h"

USING_NS_CC;

Scene* GameOver::createScene()
{
	// 'scene' is an autorelease object
	auto scene = Scene::create();
	auto layer = GameOver::create();

	scene->addChild(layer);

	return scene;
}

bool GameOver::init()
{
	if (!Layer::init())
	{
		return false;
	}

	Size visibleSize = Director::getInstance()->getVisibleSize();

	auto menuTitle =
		MenuItemImage::create("GameOverScreen/menu.jpg",
		"GameOverScreen/menu.jpg");
	menuTitle->setPosition(Point(visibleSize.width / 2, visibleSize.height / 2));
	menuTitle->setScaleX(visibleSize.width / 949);
	menuTitle->setScaleY(visibleSize.height / 534);
	this->addChild(menuTitle);

	auto retryItem =
		MenuItemImage::create("GameOverScreen/returnButton.png",
		"GameOverScreen/returnButton.png",
		CC_CALLBACK_1(GameOver::activateGameScene, this));
	auto mainMenuItem =
		MenuItemImage::create("GameOverScreen/titleButton.png",
		"GameOverScreen/titleButton.png",
		CC_CALLBACK_1(GameOver::activateMainMenuScene, this));
	auto menu = Menu::create(retryItem, mainMenuItem,
		NULL);

	menu->alignItemsVerticallyWithPadding(visibleSize.height / 4);
	this->addChild(menu);
	return true;
}

void GameOver::activateGameScene(cocos2d::Ref *pSender)
{
	auto scene = GameScreen::createScene();
	Director::getInstance()->replaceScene(scene);
}

void GameOver::activateMainMenuScene(cocos2d::Ref *pSender)
{
	auto scene = MainMenu::createScene();
	Director::getInstance()->replaceScene(scene);
}
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

	auto menuTitle =
		MenuItemImage::create("GameOverScreen/menu.jpg",
		"GameOverScreen/menu.jpg");
	auto retryItem =
		MenuItemImage::create("GameOverScreen/returnButton.png",
		"GameOverScreen/returnButton.png",
		CC_CALLBACK_1(GameOver::activateGameScene, this));
	auto mainMenuItem =
		MenuItemImage::create("GameOverScreen/titleButton.png",
		"GameOverScreen/titleButton.png",
		CC_CALLBACK_1(GameOver::activateMainMenuScene, this));
	auto menu = Menu::create(menuTitle, retryItem, mainMenuItem,
		NULL);

	Size visibleSize = Director::getInstance()->getVisibleSize();
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
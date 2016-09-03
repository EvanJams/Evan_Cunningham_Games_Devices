#include "PauseScene.h"

USING_NS_CC;

Scene* PauseScreen::createScene()
{
	// 'scene' is an autorelease object
	auto scene = Scene::create();
	auto layer = PauseScreen::create();

	scene->addChild(layer);

	return scene;
}

bool PauseScreen::init()
{
	if (!Layer::init())
	{
		return false;
	}

	auto resumeItem =
		MenuItemImage::create("PauseScreen/returnButton.png",
		"PauseScreen/returnButton.png",
		CC_CALLBACK_1(PauseScreen::resume, this));
	auto mainMenuItem =
		MenuItemImage::create("PauseScreen/titleButton.png",
		"PauseScreen/titleButton.png",
		CC_CALLBACK_1(PauseScreen::activateMainMenuScene, this));
	auto menu = Menu::create(resumeItem, mainMenuItem,
		NULL);

	Size visibleSize = Director::getInstance()->getVisibleSize();
	menu->alignItemsVerticallyWithPadding(visibleSize.height / 4);
	this->addChild(menu);
	return true;
}

void PauseScreen::resume(Ref *pSender)
{
	Director::getInstance()->popScene();
}

void PauseScreen::activateMainMenuScene(Ref *pSender)
{
	auto scene = MainMenu::createScene();
	Director::getInstance()->popScene();
	Director::getInstance()->replaceScene(scene);
}

void PauseScreen::retry(Ref *pSender)
{
	auto scene = GameScreen::createScene();
	Director::getInstance()->popScene();
	Director::getInstance()->replaceScene(scene);
}
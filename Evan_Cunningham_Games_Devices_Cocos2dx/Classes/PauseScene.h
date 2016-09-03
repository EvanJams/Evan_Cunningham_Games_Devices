#pragma once

#include "cocos2d.h"
#include "GameScene.h"
#include "MainMenuScene.h"

class PauseScreen : public cocos2d::Layer
{
public:
	static cocos2d::Scene* createScene();
	virtual bool init();
	void resume(Ref *pSender);
	void activateMainMenuScene(Ref *pSender);
	void retry(Ref *pSender);

	CREATE_FUNC(PauseScreen);
};
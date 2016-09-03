#pragma once

#include "cocos2d.h"
#include "PauseScene.h"
#include "GameOverScene.h"

class GameScreen : public cocos2d::Layer
{
public:
	static cocos2d::Scene* createScene();
	virtual bool init();
	void activatePauseScene(Ref *pSender);
	void activateGameOverScene(Ref *pSender);
	CREATE_FUNC(GameScreen);
};
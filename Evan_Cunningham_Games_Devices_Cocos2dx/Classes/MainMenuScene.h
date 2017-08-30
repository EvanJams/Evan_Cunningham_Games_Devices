#pragma once

#include "cocos2d.h"
#include "GameScene.h"
#include "SimpleAudioEngine.h"

class MainMenu : public cocos2d::Layer
{
public:
	static cocos2d::Scene* createScene();
	virtual bool init();
	void activateGameScene(Ref * pSender);
	void colourblindMode(Ref* pSender);

	CREATE_FUNC(MainMenu);
};
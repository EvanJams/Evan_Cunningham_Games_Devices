#pragma once

#include "cocos2d.h"
#include "GameScene.h"
#include "MainMenuScene.h"
#include "Score.h"

class GameOver : public cocos2d::Layer
{
public:
	static cocos2d::Scene* createScene();
	virtual bool init();
	void activateGameScene(Ref *pSender); 
	void activateMainMenuScene(Ref *pSender);
private:
	cocos2d::Size visibleSize;
	cocos2d::Label * m_scoreLabel;
	CREATE_FUNC(GameOver);
};
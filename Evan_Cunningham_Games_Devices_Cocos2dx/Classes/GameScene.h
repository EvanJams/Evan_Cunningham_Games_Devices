#pragma once

#include "cocos2d.h"
#include "GameOverScene.h"
#include "Score.h"
#include "Player.h"
#include "Enemy.h"
#include "GameState.h"
#include "Particle.h"

class GameScreen : public cocos2d::Layer
{
public:
	static cocos2d::Scene* createScene();
	virtual bool init();
	void activateGameOverScene(Ref *pSender);
	void update(float dt);
private:
	cocos2d::Size visibleSize;
	cocos2d::DrawNode* m_drawNodeBack1;
	cocos2d::DrawNode* m_drawNodeBack2;
	cocos2d::Sprite* m_sprite;
	cocos2d::Sprite* m_backSprite1;
	cocos2d::Sprite* m_backSprite2;
	cocos2d::Label * m_Label;
	cocos2d::Label * m_scoreLabel;
	cocos2d::Label * m_tutorialLabel;
	GameState gameState;
	//timer
	float timeSinceSpawn;
	float spawnTimerMin;
	float spawnTimerMax;
	//variables
	int m_score = 0;
	float m_worldMovement = 0;
	float m_backPosX1 = 0;
	float m_backPosY1 = 0;
	float m_backPosX2 = 0;
	float m_backPosY2 = 0;
	//create lists of enemies & bullets
	std::list<Enemy> enemies;
	std::list<Particle> particles;
	Player *m_Player;
	//methods
	void addEvents();
	void DetectCollisions();
	void DetectDeath();

	CREATE_FUNC(GameScreen);
};
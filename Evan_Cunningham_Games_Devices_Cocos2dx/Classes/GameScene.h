#pragma once

#include "cocos2d.h"
#include "GameOverScene.h"
#include "Score.h"
#include "Player.h"
#include "Bullet.h"
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
	cocos2d::Sprite* m_sprite;
	cocos2d::Label * m_Label;
	cocos2d::Label * m_scoreLabel;
	GameState gameState;
	//timer
	float timeSinceSpawn;
	float spawnTimer;
	//variables
	int m_score = 0;
	int m_earthHealth = 10;
	int m_health = 100;
	int timeSinceFired = 0;
	//create lists of enemies & bullets
	std::list<Enemy> enemies;
	std::list<Bullet> bullets;
	std::list<Particle> particles;
	Player *m_Player;
	//methods
	void addEvents();
	void DetectCollisions();
	void DetectDeath();

	CREATE_FUNC(GameScreen);
};
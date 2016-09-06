#include "GameScene.h"

USING_NS_CC;

Scene* GameScreen::createScene()
{
	// 'scene' is an autorelease object
	auto scene = Scene::create();
	auto layer = GameScreen::create();

	scene->addChild(layer);

	return scene;
}

bool GameScreen::init()
{
	if (!Layer::init())
	{
		return false;
	}
	bulletsFired = 0;
	timeSinceFired = 0;
	bullets.clear();
	Size visibleSize = Director::getInstance()->getVisibleSize();
	Point origin = Director::getInstance()->getVisibleOrigin();
	gameState = GameState::GameInit;
	//background
	auto backImage =
		Sprite::create("GameScreen/background.png");
	backImage->setPosition(Point(visibleSize.width / 2, visibleSize.height / 2));
	backImage->setScaleX(visibleSize.width / 600);
	backImage->setScaleY(visibleSize.height / 451);
	this->addChild(backImage);
	//background2
	auto backImage2 =
		Sprite::create("GameScreen/earth.png");
	backImage2->setPosition(Point(visibleSize.width / 2, visibleSize.height / 2));
	backImage2->setScaleX(visibleSize.width / 1980);
	backImage2->setScaleY(visibleSize.height / 511);	
	backImage2->setPositionX(visibleSize.width/40);
	this->addChild(backImage2);
	//Player
	cocos2d::DrawNode* playerDrawNode = cocos2d::DrawNode::create();
	m_Player = new Player(visibleSize.width / 12, visibleSize.height / 2, visibleSize.width / 3200, visibleSize.height / 3000, playerDrawNode);
	this->addChild(playerDrawNode);
	m_health = 100;
	m_earthHealth = 10;
	//drawing health
	cocos2d::DrawNode* scoreDrawNode = cocos2d::DrawNode::create();
	m_scoreLabel = Label::create("Ship Health: " + std::to_string(m_health) + "        Colonies Left: " + std::to_string(m_earthHealth), "Helvetica", 24, CCSizeMake(500, 128), kCCTextAlignmentCenter);
	m_scoreLabel->setPosition(4 * visibleSize.width / 10, 10 * visibleSize.height / 12);
	scoreDrawNode->addChild(m_scoreLabel);
	this->addChild(scoreDrawNode);
	//Score
	m_score = 0;
	//drawing score
	cocos2d::DrawNode* titleDrawNode = cocos2d::DrawNode::create();
	m_Label = Label::create("Score: " + std::to_string(m_score) + "\n Highscore: " + std::to_string(highScore), "Helvetica", 24, CCSizeMake(500, 128), kCCTextAlignmentCenter);
	m_Label->setPosition(9 * visibleSize.width / 10, 1 * visibleSize.height / 12);
	titleDrawNode->addChild(m_Label);
	this->addChild(titleDrawNode);
	//drawing tutorial
	cocos2d::DrawNode* tutorialDrawNode = cocos2d::DrawNode::create();
	m_tutorialLabel = Label::create("Tap the left side of the screen to move, and the right side to shoot. Shoot 5 bullets to begin!", "Helvetica", 24, CCSizeMake(500, 128), kCCTextAlignmentCenter);
	m_tutorialLabel->setPosition(visibleSize.width / 2, visibleSize.height / 2);
	tutorialDrawNode->addChild(m_tutorialLabel);
	this->addChild(tutorialDrawNode);

	//Enemy
	spawnTimer = 20;
	timeSinceSpawn = 0;

	this->scheduleUpdate();

	return true;
}


void GameScreen::update(float dt){
	switch (gameState)
	{
	case GameState::GameInit:
		addEvents();
		gameState = GameState::GameRunning;
		break;
	case GameState::GameRunning:

		m_Label->setString("Score: " + std::to_string(m_score) + "\n Highscore: " + std::to_string(highScore));
		m_scoreLabel->setString("Ship Health: " + std::to_string(m_health) + "        Colonies Left: " + std::to_string(m_earthHealth));
		m_Player->Update();
		//bullets
		for (std::list<Bullet>::iterator curr = bullets.begin(); curr != bullets.end(); curr++)
		{
			curr->update();
			if (curr->getXPos() > visibleSize.width || curr->getXPos() < 0
				|| curr->getYPos() > visibleSize.height || curr->getYPos() < 0)
			{
				bullets.remove(*curr);
				break;
			}
		}
		//Particles
		cocos2d::DrawNode* particleDrawNode = cocos2d::DrawNode::create();
		particles.push_back(Particle(m_Player->getXPos() - m_Player->getWidth() / 2, m_Player->getYPos(), 5, 5, particleDrawNode));
		this->addChild(particleDrawNode);
		for (std::list<Particle>::iterator curr = particles.begin(); curr != particles.end(); curr++)
		{
			curr->Update();
			if (curr->getAlive() == false)
			{
				particles.remove(*curr);
				break;
			}
		}

		timeSinceSpawn += dt * 10;
		if (bulletsFired > 4 || tutorialPassed == true)
		{
			m_tutorialLabel->setString("");
			tutorialPassed = true;
			timeSinceFired++;
			if (spawnTimer <= timeSinceSpawn)
			{
				//random spawns
				float enemyPass = rand() % 100;
				float xEnemyPass = visibleSize.width;
				float yEnemyPass = (enemyPass / 100) * visibleSize.height;
				cocos2d::DrawNode* enemyDrawNode = cocos2d::DrawNode::create();
				enemies.push_back(Enemy(xEnemyPass, yEnemyPass, 0, m_Player->getYPos(), visibleSize.width / 5000, visibleSize.height / 5000, enemyDrawNode));
				this->addChild(enemyDrawNode);
				timeSinceSpawn = 0;
				if (spawnTimer > 5)
					spawnTimer--;
			}

			for (std::list<Enemy>::iterator curr = enemies.begin(); curr != enemies.end(); curr++)
			{
				curr->update(m_Player->getYPos());
				if (curr->getXPos() < 0)
				{
					m_earthHealth -= 1;
					enemies.remove(*curr);
					break;
				}
			}

			if (m_earthHealth < 0){
				GameScreen::activateGameOverScene(this);
			}

			DetectCollisions();
			DetectDeath();
		}
		else
		{
		}
	}
}

void GameScreen::addEvents(){
	auto listener = EventListenerTouchOneByOne::create();
	listener->setSwallowTouches(true);
	visibleSize = Director::getInstance()->getVisibleSize();
	listener->onTouchBegan = [this](Touch* touch, Event* event){
		Vec2 touchPos = touch->getLocation();
		if (touchPos.x > visibleSize.width / 2)
		{
			cocos2d::DrawNode* bulletDrawNode = cocos2d::DrawNode::create();
			bullets.push_back(Bullet(visibleSize.width / 18, m_Player->getYPos(), 1, visibleSize.width, visibleSize.width/ 9000, visibleSize.height / 3000, bulletDrawNode));
			this->addChild(bulletDrawNode);
			timeSinceFired = 0;
			bulletsFired++;
		}
		else
		{
			m_Player->MoveEvent(touchPos.y);
		}
		return true;
	};


	listener->onTouchMoved = [this](Touch* touch, Event* event){
		Vec2 pos = touch->getLocation();
		if (pos.x > visibleSize.width / 2)
		{
			if (timeSinceFired > 10)
			{
				cocos2d::DrawNode* bulletDrawNode = cocos2d::DrawNode::create();
				bullets.push_back(Bullet(visibleSize.width / 18, m_Player->getYPos(), 1, visibleSize.width, visibleSize.width / 9000, visibleSize.height / 3000, bulletDrawNode));
				this->addChild(bulletDrawNode);
				timeSinceFired = 0;
			}			
		}
		else
		{
			m_Player->MoveEvent(pos.y);
		}
	};

	listener->onTouchEnded = [this](Touch* touch, Event* event){
		
	};

	cocos2d::Director::getInstance()->getEventDispatcher()->addEventListenerWithFixedPriority(listener, 30);
}

void GameScreen::DetectCollisions(){
	for (std::list<Bullet>::iterator curr = bullets.begin(); curr != bullets.end(); curr++)
	{
		for (std::list<Enemy>::iterator curr2 = enemies.begin(); curr2 != enemies.end(); curr2++)
		{
			if (curr->getXPos() < curr2->getXPos() + curr2->getWidth() &&
				curr->getXPos() + curr->getWidth() > curr2->getXPos() &&
				curr->getYPos() < curr2->getYPos() + curr2->getHeight() &&
				curr->getYPos() + curr->getHeight() > curr2->getYPos())
			{
				m_score += 10;
				bullets.remove(*curr);
				enemies.remove(*curr2);
				goto label;
			}
		}
	}
label:
	;
}

void GameScreen::DetectDeath(){
	for (std::list<Enemy>::iterator curr = enemies.begin(); curr != enemies.end(); curr++)
	{
		if (curr->getXPos() < m_Player->getXPos() + m_Player->getWidth() &&
			curr->getXPos() + curr->getWidth() > m_Player->getXPos() &&
			curr->getYPos() < m_Player->getYPos()  + m_Player->getHeight() &&
			curr->getYPos() + curr->getHeight() > m_Player->getYPos())
		{
			m_health -= 20;
			enemies.remove(*curr);
			if (m_health <= 0)
			{
				if (highScore < m_score)
				{
					highScore = m_score;
				}
				enemies.clear();
				bullets.clear();
				m_Player->~Player();
				GameScreen::activateGameOverScene(this);
			}
			break;
		}
	}
}

void GameScreen::activateGameOverScene(Ref *pSender)
{
	auto scene = GameOver::createScene();
	Director::getInstance()->replaceScene(scene);
}


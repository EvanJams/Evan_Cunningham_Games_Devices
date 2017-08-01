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
	Size visibleSize = Director::getInstance()->getVisibleSize();
	Point origin = Director::getInstance()->getVisibleOrigin();
	gameState = GameState::GameInit;
	//background
	m_drawNodeBack1 = cocos2d::DrawNode::create();
	m_backPosX1 = visibleSize.width / 2;
	m_backPosY1 = visibleSize.height / 2;
	m_backSprite1 = cocos2d::Sprite::create("GameScreen/background.png");
	m_backSprite1->setPosition(Point(m_backPosX1, m_backPosY1));
	m_backSprite1->setScaleX(visibleSize.width / 600);
	m_backSprite1->setScaleY(visibleSize.height / 451);
	m_drawNodeBack1->addChild(m_backSprite1);
	this->addChild(m_drawNodeBack1);
	//background2
	m_drawNodeBack2 = cocos2d::DrawNode::create();
	m_backPosX2 = visibleSize.width * 1.5; 
	m_backPosY2 = visibleSize.height / 2;
	m_backSprite2 = cocos2d::Sprite::create("GameScreen/background.png");
	m_backSprite2->setPosition(Point(m_backPosX2, m_backPosY2));
	m_backSprite2->setScaleX(visibleSize.width / 600);
	m_backSprite2->setScaleY(visibleSize.height / 451);
	m_drawNodeBack2->addChild(m_backSprite2);
	this->addChild(m_drawNodeBack2);
	//auto backImage2 =
	//	Sprite::create("GameScreen/background.png");
	//backImage2->setPosition(Point(m_backPosX2, m_backPosY2));
	//backImage2->setScaleX(visibleSize.width / 600);
	//backImage2->setScaleY(visibleSize.height / 451);
	////->setPositionX(visibleSize.width / 40);
	//this->addChild(backImage2);
	//Player
	cocos2d::DrawNode* playerDrawNode = cocos2d::DrawNode::create();
	m_Player = new Player(visibleSize.width / 12, visibleSize.height / 3, visibleSize.width / 3200, visibleSize.height / 3000, playerDrawNode);
	this->addChild(playerDrawNode);
	//drawing health
	/*cocos2d::DrawNode* scoreDrawNode = cocos2d::DrawNode::create();
	m_scoreLabel = Label::create("Ship Health: " + std::to_string(m_health) + "        Colonies Left: " + std::to_string(m_earthHealth), "Helvetica", 24, CCSizeMake(500, 128), kCCTextAlignmentCenter);
	m_scoreLabel->setPosition(4 * visibleSize.width / 10, 10 * visibleSize.height / 12);
	scoreDrawNode->addChild(m_scoreLabel);
	this->addChild(scoreDrawNode);*/
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
	m_tutorialLabel = Label::create("Tap the screen to jump.", "Helvetica", 24, CCSizeMake(500, 128), kCCTextAlignmentCenter);
	m_tutorialLabel->setPosition(visibleSize.width / 2, visibleSize.height / 2);
	tutorialDrawNode->addChild(m_tutorialLabel);
	this->addChild(tutorialDrawNode);

	//Enemy
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
		if (m_worldMovement <= -visibleSize.width)
		{
			m_worldMovement = 0;
		}
		else 
		{
			m_worldMovement -= 5;
		}
		m_backSprite1->setPositionX(m_backPosX1 + m_worldMovement);
		m_backSprite2->setPositionX(m_backPosX2 + m_worldMovement);
		m_Label->setString("Score: " + std::to_string(m_score) + "\n Highscore: " + std::to_string(highScore));
		//m_scoreLabel->setString("Ship Health: " + std::to_string(m_health) + "        Colonies Left: " + std::to_string(m_earthHealth));
		m_Player->Update();
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
		if (tutorialPassed == true)
		{
			m_tutorialLabel->setString("");
			tutorialPassed = true;
			if (spawnTimerMin <= timeSinceSpawn)
			{
				//random spawns
				float enemyPass = rand() % 100;
				float xEnemyPass = visibleSize.width;
				float yEnemyPass = (enemyPass / 100) * visibleSize.height;
				cocos2d::DrawNode* enemyDrawNode = cocos2d::DrawNode::create();
				enemies.push_back(Enemy(xEnemyPass, yEnemyPass, 0, m_Player->getYPos(), visibleSize.width / 5000, visibleSize.height / 5000, enemyDrawNode));
				this->addChild(enemyDrawNode);
				timeSinceSpawn = 0;
				if (spawnTimerMin > 2)
					spawnTimerMin--;
			}

			for (std::list<Enemy>::iterator curr = enemies.begin(); curr != enemies.end(); curr++)
			{
				curr->update(m_Player->getYPos());
				if (curr->getXPos() < 0)
				{
					enemies.remove(*curr);
					break;
				}
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
		m_Player->MoveEvent(touchPos.y);
		return true;
	};


	listener->onTouchMoved = [this](Touch* touch, Event* event){
		Vec2 pos = touch->getLocation();
		m_Player->MoveEvent(pos.y);
	};

	listener->onTouchEnded = [this](Touch* touch, Event* event){
		
	};

	cocos2d::Director::getInstance()->getEventDispatcher()->addEventListenerWithFixedPriority(listener, 30);
}

void GameScreen::DetectCollisions(){
	for (std::list<Enemy>::iterator curr = enemies.begin(); curr != enemies.end(); curr++)
	{
		if (curr->getXPos() < m_Player->getXPos() + m_Player->getWidth() &&
			curr->getXPos() + curr->getWidth() > m_Player->getXPos() &&
			curr->getYPos() < m_Player->getYPos() + m_Player->getHeight() &&
			curr->getYPos() + curr->getHeight() > m_Player->getYPos())
		{
			//m_health -= 20;
			enemies.remove(*curr);

			break;
		}
	}
}

void GameScreen::DetectDeath(){
	if (m_Player->getXPos() <= 10)
	{
		if (highScore < m_score)
		{
			highScore = m_score;
		}
		enemies.clear();
		m_Player->~Player();
		GameScreen::activateGameOverScene(this);
	}
}

void GameScreen::activateGameOverScene(Ref *pSender)
{
	auto scene = GameOver::createScene();
	Director::getInstance()->replaceScene(scene);
}


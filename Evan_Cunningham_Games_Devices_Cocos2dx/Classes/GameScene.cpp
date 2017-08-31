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
	m_groundHeight = visibleSize.height / 4;
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
	//background2 for scrolling
	m_drawNodeBack2 = cocos2d::DrawNode::create();
	m_backPosX2 = visibleSize.width * 1.5; 
	m_backPosY2 = visibleSize.height / 2;
	m_backSprite2 = cocos2d::Sprite::create("GameScreen/background.png");
	m_backSprite2->setPosition(Point(m_backPosX2, m_backPosY2));
	m_backSprite2->setScaleX(visibleSize.width / 600);
	m_backSprite2->setScaleY(visibleSize.height / 451);
	m_drawNodeBack2->addChild(m_backSprite2);
	this->addChild(m_drawNodeBack2);
	//Doom
	doom = Doom::create();
	doom->setPosition(Vec2(46, m_groundHeight + visibleSize.height/100));
	this->addChild(doom, 5);
	//Player
	cocos2d::DrawNode* playerDrawNode = cocos2d::DrawNode::create();
	m_Player = new Player(visibleSize.width / 6, m_groundHeight, visibleSize.width / 900, visibleSize.height / 860, playerDrawNode);
	this->addChild(playerDrawNode);
	//Score Drawing
	m_score = 0;
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
	//Enemy spawn variables
	timeSinceSpawn = 0;
	spawnTimerMin = 8;
	spawnTimerMax = 20;
	spawnTimer = spawnTimerMax;
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
		//Background Scrolling
		if (m_worldMovement <= -visibleSize.width)
		{
			m_worldMovement = 0;
		}
		else 
		{
			m_worldMovement -= 10;
		}
		m_backSprite1->setPositionX(m_backPosX1 + m_worldMovement);
		m_backSprite2->setPositionX(m_backPosX2 + m_worldMovement);
		//UI
		m_Label->setString("Score: " + std::to_string(m_score) + "\n Highscore: " + std::to_string(highScore));
		//Player Update
		m_Player->Update();
		//Particles
		cocos2d::DrawNode* particleDrawNode = cocos2d::DrawNode::create();
		particles.push_back(Particle(m_Player->getXPos() - m_Player->getWidth() / 4, m_Player->getYPos() - m_Player->getHeight() / 2, 5, 5, particleDrawNode));
		this->addChild(particleDrawNode);
		for (std::list<Particle>::iterator curr = particles.begin(); curr != particles.end(); curr++)
		{
			curr->Update();
			if (curr->getAlive() == false || curr->getPosY() < m_groundHeight)
			{
				particles.remove(*curr);
				break;
			}
		}
		//Enemies spawning
		timeSinceSpawn += dt * 10;
		if (spawnTimer <= timeSinceSpawn)
		{
			cocos2d::DrawNode* enemyDrawNode = cocos2d::DrawNode::create();
			enemies.push_back(Enemy(visibleSize.width, m_groundHeight, -10, visibleSize.width / 12, visibleSize.height / 12, enemyDrawNode));
			this->addChild(enemyDrawNode);
			timeSinceSpawn = 0;
			//scaling difficulty once tutorial is passed
			if (spawnTimer > spawnTimerMin && tutorialPassed)
				spawnTimer--;
		}
		//enemies updating, bounds checking and score
		for (std::list<Enemy>::iterator curr = enemies.begin(); curr != enemies.end(); curr++)
		{
			curr->update();
			if (curr->getXPos() < 0)
			{
				if (!tutorialPassed) {

				}
				else { 
					m_score += 5; 
					//victory conditions
					if (m_score > 100) { 
						GameScreen::activateGameOverScene(this);
					}
				}
				enemies.remove(*curr);
				break;
			}
		}
		if (tutorialPassed)
		{
			m_tutorialLabel->setString("");
			DetectCollisions();
			DetectDeath();
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
		tutorialPassed = true;
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
			m_Player->PushBack(visibleSize.width/45);
			enemies.remove(*curr);
			CocosDenshion::SimpleAudioEngine::sharedEngine()->playEffect("Audio/hit.wav", false, 1.0f, 1.0f, 1.0f);
			break;
		}
	}
}

void GameScreen::DetectDeath(){
	if (m_Player->getXPos() <= visibleSize.width / 10)
	{
		if (highScore < m_score)
		{
			highScore = m_score;
		}
		CocosDenshion::SimpleAudioEngine::sharedEngine()->playEffect("Audio/bite.wav", false, 1.0f, 1.0f, 1.0f);
		enemies.clear();
		m_Player->setAlive(false);
		m_Player->~Player();
		GameScreen::activateGameOverScene(this);
	}
}

void GameScreen::activateGameOverScene(Ref *pSender)
{
	auto scene = GameOver::createScene();
	Director::getInstance()->replaceScene(TransitionFade::create(1.0, scene));
	CocosDenshion::SimpleAudioEngine::sharedEngine()->stopBackgroundMusic("Audio/background.wav");
}


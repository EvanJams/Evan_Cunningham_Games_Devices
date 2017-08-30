
#include "Player.h"

USING_NS_CC;

Player::Player(float xPos, float yPos, float width, float height, cocos2d::DrawNode *drawnode){

	m_height = height;
	m_width = width;
	m_xPos = xPos;
	m_yPos = yPos + (height/2);
	m_drawNode = drawnode;
	m_groundHeight = yPos;
	m_yVel = 0;
	m_sprite = cocos2d::Sprite::create("GameScreen/player.png");
	m_sprite->setScaleX(m_width);
	m_sprite->setScaleY(m_height);
	m_sprite->setPosition(m_xPos, m_yPos);
	m_drawNode->addChild(m_sprite);
	visibleSize = Director::getInstance()->getVisibleSize();

	Vector<SpriteFrame*> animFrames(14);
	char str[100] = { 0 };
	for (int i = 13; i >= 0; i--)
	{
		sprintf(str, "GameScreen/players.png");
		auto frame = SpriteFrame::create(str, Rect(43.7 * i, 0, 43.7, 43));
		animFrames.pushBack(frame);
	}
	auto animation = CCAnimation::createWithSpriteFrames(animFrames, 0.03f, 9999999);
	auto animate = CCAnimate::create(animation);
	m_sprite->runAction(animate);
	m_sprite->setTag(10);
}

void Player::Update(){
	m_yPos += m_yVel;
	if (m_yPos > m_groundHeight){
		m_yVel -= visibleSize.height/600;		
	}
	if (m_yPos < m_groundHeight){
		m_yVel = 0;
		m_yPos = m_groundHeight;
	}
	m_sprite->setPosition(m_xPos, m_yPos);
}

void Player::MoveEvent(float yMouseLocation){
	if (m_yPos == m_groundHeight) {
		m_yVel = visibleSize.height/40;
	}
}

void Player::PushBack(float pushForce) {
	while (pushForce > 0)
	{
		m_xPos -= .0001f;
		pushForce -= .0001f;
	}
	//m_xPos -= pushForce;
}

float Player::getYPos(){
	return m_yPos;
}

float Player::getXPos(){
	return m_xPos;
}

float Player::getWidth(){
	return m_width * 45;
}

float Player::getHeight(){
	return m_height * 43;
}

Player::~Player(){
	m_drawNode->removeFromParent();
}
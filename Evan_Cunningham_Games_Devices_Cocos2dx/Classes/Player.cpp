
#include "Player.h"

USING_NS_CC;

Player::Player(int xPos, int yPos, float width, float height, cocos2d::DrawNode *drawnode){
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
}

void Player::Update(){
	m_yPos += m_yVel;
	if (m_yPos > m_groundHeight){
		m_yVel -= 0.5;		
	}
	if (m_yPos < m_groundHeight){
		m_yVel = 0;
		m_yPos = m_groundHeight;
	}
	m_sprite->setPosition(m_xPos, m_yPos);
}

void Player::MoveEvent(float yMouseLocation){
	if (m_yPos == m_groundHeight) {
		m_yVel = 10;
	}
}

float Player::getYPos(){
	return m_yPos;
}

float Player::getXPos(){
	return m_xPos;
}

float Player::getWidth(){
	return m_width * 347;
}

float Player::getHeight(){
	return m_height * 394;
}

Player::~Player(){
	m_drawNode->removeFromParent();
}
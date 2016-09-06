
#include "Enemy.h"

USING_NS_CC;

Enemy::Enemy(float xPos, float yPos, float xDest, float yDest, float width, float height, cocos2d::DrawNode* drawNode){
	m_xPos = xPos;
	m_yPos = yPos;
	m_xDest = xDest;
	m_yDest = yDest;
	m_width = width;
	m_height = height;
	//sprite stuff
	m_drawNode = drawNode;
	m_sprite = cocos2d::Sprite::create("GameScreen/enemyship.png");
	m_sprite->setScaleX(m_width);
	m_sprite->setScaleY(m_height);
	m_sprite->setPosition(m_xPos, m_yPos);
	m_drawNode->addChild(m_sprite);
	//working out where they're heading
	m_xVel = -1;
	m_yVel = .5;
}

void Enemy::update(float playerY){
	if (playerY > m_yPos){
		m_yPos += m_yVel * 5;
	}
	else
	m_yPos -= m_yVel * 5;
	m_xPos += m_xVel * 5;
	m_sprite->setPosition(m_xPos, m_yPos);
}

float Enemy::getXPos(){
	return m_xPos;
}

float Enemy::getYPos(){
	return m_yPos;
}

float Enemy::getWidth(){
	return m_width * 345;
}
float Enemy::getHeight(){
	return m_height * 328;
}

bool Enemy::operator==(Enemy const & other) const {
	return m_xPos == other.m_xPos && m_yPos == other.m_yPos;
}

Enemy::~Enemy(){
	m_drawNode->removeFromParent();
}
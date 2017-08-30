
#include "Enemy.h"

USING_NS_CC;

Enemy::Enemy(float xPos, float yPos, float speed, float width, float height, cocos2d::DrawNode* drawNode){
	m_xPos = xPos;
	m_yPos = yPos;
	m_width = width;
	m_velocity = speed;
	m_height = height;
	//sprite stuff
	m_drawNode = drawNode;
	//Colourblind test and image selection
	if (colourblindOn){	m_sprite = cocos2d::Sprite::create("GameScreen/enemyship.png"); }
	else{ m_sprite = cocos2d::Sprite::create("GameScreen/enemy.png"); }
	m_sprite->setScaleX(m_width);
	m_sprite->setScaleY(m_height);
	m_sprite->setPosition(m_xPos, m_yPos);
	m_drawNode->addChild(m_sprite);
}

void Enemy::update(){
	m_xPos += m_velocity;
	m_sprite->setPosition(m_xPos, m_yPos);
}

float Enemy::getXPos(){
	return m_xPos;
}

float Enemy::getYPos(){
	return m_yPos;
}

float Enemy::getWidth(){
	return m_width;
}
float Enemy::getHeight(){
	return m_height;
}

bool Enemy::operator==(Enemy const & other) const {
	return m_xPos == other.m_xPos && m_yPos == other.m_yPos;
}

Enemy::~Enemy(){
	m_drawNode->removeFromParent();
}
#include "Bullet.h"

USING_NS_CC;

Bullet::Bullet(float xPos, float yPos, float xDir, float yDest, float width, float height, cocos2d::DrawNode* drawNode){
	m_xPos = xPos;
	m_yPos = yPos;
	m_xDir = xDir;
	m_yDest = yDest;
	m_width = width;
	m_height = height;
	//sprite stuff
	m_drawNode = drawNode;
	m_sprite = cocos2d::Sprite::create("GameScreen/laser.png");
	m_sprite->setScaleX(m_width);
	m_sprite->setScaleY(m_height);
	m_sprite->setPosition(m_xPos, m_yPos);
	m_drawNode->addChild(m_sprite);
	//Getting direction
}

void Bullet::update(){
	m_xPos += 10;
	m_sprite->setPosition(m_xPos, m_yPos);
}

float Bullet::getXPos(){
	return m_xPos;
}

float Bullet::getYPos(){
	return m_yPos;
}

float Bullet::getWidth(){
	return m_width * 290;
}

float Bullet::getHeight(){
	return m_height * 74;
}

bool Bullet::operator==(Bullet const & other) const {
	return m_xPos == other.m_xPos && m_yPos == other.m_yPos;
}

Bullet::~Bullet(){
	m_drawNode->removeFromParent();
}
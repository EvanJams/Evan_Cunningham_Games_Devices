
#include "Particle.h"

USING_NS_CC;

Particle::Particle(int xPos, int yPos, float width, float height, cocos2d::DrawNode *drawnode){
	m_xPos = xPos;
	m_yPos = yPos;
	m_height = height;
	m_width = width;
	m_drawNode = drawnode;	
	m_yDir = rand() % 9;
	m_xVel = rand() % 10;
	m_yVel = rand() % 10;
	m_lifeSpan = rand() % 5;
	m_counter = 0;
	m_sprite = cocos2d::Sprite::create("GameScreen/particle.png");
	m_sprite->setScaleX(m_width);
	m_sprite->setScaleY(m_height);
	m_sprite->setPosition(m_xPos, m_yPos);
	m_drawNode->addChild(m_sprite);
	m_alive = true;
}

void Particle::Update(){
	m_xPos -= m_xVel + 1;
	if (m_yDir > 4){
		m_yPos -= m_yVel;
	}
	m_yPos += m_yVel;
	m_sprite->setPosition(m_xPos, m_yPos);
	m_counter++;
	if (m_counter > m_lifeSpan)
	{
		m_alive = false;
	}
}

bool Particle::getAlive(){
	return m_alive;
}

bool Particle::operator==(Particle const & other) const {
	return m_xPos == other.m_xPos && m_yPos == other.m_yPos;
}

Particle::~Particle(){
	m_drawNode->removeFromParent();
}
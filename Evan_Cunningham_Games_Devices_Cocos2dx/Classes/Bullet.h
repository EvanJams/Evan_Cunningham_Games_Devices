
#ifndef BULLET_H
#define BULLET_H

#include "cocos2d.h"

class Bullet
{
public:
	Bullet(float xPos = 100, float yPos = 390, float xDest = 0, float yDest = 0, float width = 0.1, float height = 0.1, cocos2d::DrawNode* drawNode = nullptr);
	void update();
	float getXPos();
	float getYPos();
	float getWidth();
	float getHeight();
	bool operator==(Bullet const & other) const;
	~Bullet();
private:
	float m_xPos;
	float m_yPos;
	float m_xDir;
	float m_yDest;
	float m_width;
	float m_height;
	float m_xVel;
	float m_yVel;
	float m_xLim;
	float m_yLim;
	cocos2d::Sprite* m_sprite;
	cocos2d::DrawNode* m_drawNode;
};

#endif
#ifndef ENEMY_H
#define ENEMY_H

#include "cocos2d.h"

class Enemy
{
public:
	Enemy(float xPos = 0, float yPos = 0, float xDest = 0, float yDest = 320, float width = 0.1, float height = 0.1, cocos2d::DrawNode* drawNode = nullptr);
	void update(float playerY);
	float getXPos();
	float getYPos();
	float getWidth();
	float getHeight();
	bool operator==(Enemy const & other) const;
	~Enemy();
private:
	float m_xPos;
	float m_yPos;
	float m_xDest;
	float m_yDest;
	float m_width;
	float m_height;
	float m_xVel;
	float m_yVel;
	cocos2d::Sprite* m_sprite;
	cocos2d::DrawNode* m_drawNode;
};

#endif
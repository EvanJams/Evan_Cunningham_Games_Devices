#ifndef PLAYER_H
#define PLAYER_H

#include "cocos2d.h"

class Player
{
public:
	Player(float xPos = 100, float yPos = 300, float width = 1, float height = 1, cocos2d::DrawNode *drawnode = nullptr);
	void Update();
	void MoveEvent(float touchY);
	void PushBack(float force);
	float getXPos();
	float getYPos();
	float getWidth();
	float getHeight();
	~Player();
private:
	float m_xPos;
	float m_yPos;
	float m_yVel;
	float m_width;
	float m_height;
	float m_groundHeight;
	cocos2d::Sprite* m_sprite;
	cocos2d::DrawNode *m_drawNode;
	cocos2d::Size visibleSize;
};

#endif
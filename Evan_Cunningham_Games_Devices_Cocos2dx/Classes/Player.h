#ifndef PLAYER_H
#define PLAYER_H

#include "cocos2d.h"

class Player
{
public:
	Player(int xPos = 100, int yPos = 300, float width = 1, float height = 1, cocos2d::DrawNode *drawnode = nullptr);
	void Update();
	void MoveEvent(float touchY);
	float getXPos();
	float getYPos();
	float getWidth();
	float getHeight();
	~Player();
private:
	int m_xPos;
	int m_yPos;
	float m_yVel;
	float m_width;
	float m_height;
	float m_groundHeight;
	cocos2d::Sprite* m_sprite;
	cocos2d::DrawNode *m_drawNode;
	cocos2d::Size visibleSize;
};

#endif
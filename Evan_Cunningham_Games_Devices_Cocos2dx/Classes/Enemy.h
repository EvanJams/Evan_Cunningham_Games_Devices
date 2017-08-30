#ifndef ENEMY_H
#define ENEMY_H

#include "cocos2d.h"
#include "Score.h"

class Enemy
{
public:
	Enemy(float xPos = 0, float yPos = 0, float speed = -5, float width = 0.1, float height = 0.1, cocos2d::DrawNode* drawNode = nullptr);
	void update();
	float getXPos();
	float getYPos();
	float getWidth();
	float getHeight();
	bool operator==(Enemy const & other) const;
	~Enemy();
private:
	float m_xPos;
	float m_yPos;
	float m_velocity;
	float m_width;
	float m_height;
	cocos2d::Sprite* m_sprite;
	cocos2d::DrawNode* m_drawNode;
};

#endif
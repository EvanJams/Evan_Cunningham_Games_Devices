#ifndef PARTICLE_H
#define PARTICLE_H

#include "cocos2d.h"

class Particle
{
public:
	Particle(int xPos = 100, int yPos = 300, float width = 1, float height = 1, cocos2d::DrawNode *drawnode = nullptr);
	void Update();
	bool getAlive();
	bool operator==(Particle const & other) const;
	~Particle();
private:
	int m_xPos;
	int m_yPos;
	int m_xVel;
	int m_yVel;
	int m_yDir;
	float m_lifeSpan = 3;
	float m_counter = 0;
	float m_width;
	float m_height;
	bool m_alive;
	cocos2d::Sprite* m_sprite;
	cocos2d::DrawNode *m_drawNode;
};

#endif
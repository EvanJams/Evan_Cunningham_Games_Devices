#include "Doom.h"

USING_NS_CC;

Doom* doom = new Doom();
Doom* Doom::create()
{
	if (doom && doom->initWithFile("GameScreen/Doom.png", Rect(0, 0, 93, 92)))
	{
		//Animated sprite
		Vector<SpriteFrame*> animFrames(3);
		char str[100] = { 0 };
		for (int i = 0; i < 2; i++)
		{
			sprintf(str, "GameScreen/Doom.png");
			auto frame = SpriteFrame::create(str, Rect((93) * i, 0, 93, 92));
			animFrames.pushBack(frame);
		}
		auto animation = CCAnimation::createWithSpriteFrames(animFrames, 0.1f, 99999);
		auto animate = CCAnimate::create(animation);
		doom->runAction(animate);
		doom->setTag(10);
		return doom;
	}
	CC_SAFE_DELETE(doom);
	return NULL;
}
#include "AppDelegate.h"
#include "MainMenuScene.h"

USING_NS_CC;

AppDelegate::AppDelegate() {
}

AppDelegate::~AppDelegate() {
}

bool AppDelegate::applicationDidFinishLaunching() {
	auto director = Director::getInstance();
	auto glview = director->getOpenGLView();
	//comment out when building to android
	if (!glview) {
		glview = GLViewImpl::create("Box Hoppers");
		glview->setFrameSize(1000, 600);
		director->setOpenGLView(glview);
	}

	auto scene = MainMenu::createScene();
	director->runWithScene(scene);

	return true;
}

void AppDelegate::applicationDidEnterBackground() {
}

void AppDelegate::applicationWillEnterForeground() {
}
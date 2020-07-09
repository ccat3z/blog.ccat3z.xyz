---
layout: post
title: "Android手机上Webview页面以及微信/QQ浏览器真机调试"
date: "2017-09-21 22:09:15 +0800"
tag: ["Android"]
short_description: ":D"
---

> 转自[Cango](http://www.jianshu.com/u/84bd2b65f0c5)的[Android手机上Webview页面以及微信/QQ浏览器真机调试](http://www.jianshu.com/p/a06b5b8dc6b2)

最近正在开发一个手机端微信的Vue SPA项目，遇到一个奇怪的问题，本地dev server上运行正常，打包部署后某些手机的微信浏览器或者手机浏览器运行页面白屏，由于是线上问题，而PC端也无法重现，先是想是不是某个外部js加载出错造成的，看了半天代码尝试优化也没解决问题，最后想到是否能通过调试手机端浏览器来定位。在网上查了一下，PC端Chrome已经实现远程调试移动设备WebView页面。

首先打开Android手机浏览器，我用的是小米手机自带的浏览器（不能用QQ手机浏览器官方版，Chrome检测不到，但是调试版可以，这个稍后再说）。在手机浏览器中打开需要调试的页面，然后使用USB连接PC与手机，在Chrome地址栏中输入`chrome://inspect`打开以下页面。

![](/images/2017-09-21-android-webview-debug/chrome-inspect.png)

在上图中就可以看到我调试的页面**行李旅宿**，点击下边的inspect就会弹出与PC端Chrome一样的控制台界面，如下所示

![](/images/2017-09-21-android-webview-debug/webview-dev.png)

这样就能在chrome控制台看到真机的布局样式和log了。接下来看看我的白屏问题当我打开首页的时候，在上边这个窗口的控制台打印出这个错误

![](/images/2017-09-21-android-webview-debug/console-error.png)

不进行真机调试还真的看不到这个log，然后又是一系列的搜索调查终于找到问题所在。我这个Vue项目用的是ES6的语法，而Babel只是转换了新的JavaScript语法，而没有转换Object.assign, Promise等这种新的API，而我的入口JS中使用的Vue-Map就是使用了Object.assign从而造成主JS报错页面无法加载。解决方法就是`npm install babel-polyfill --save-dev`，然后在主JS的最上边加上`import 'babel-polyfill'`，重新打包部署运行，一切正常。（但有一个问题还没搞清楚，为什么本地运行正常，期待大神给些建议），以上就是Chromium内核浏览器的调试方法。

---

跑步前进，接下来咱们看看如何真机调试Android的微信浏览器和QQ浏览器，这两种浏览器都是X5内核，使用Chrome的方式的话找不到手机页面。好在腾讯推出了一个神器，TBS Studio - [TBS Studio](http://bbs.mb.qq.com/thread-1416936-1-1.html)介绍，X5浏览器的开发调试利器。

下载后运行后界面如下

![](/images/2017-09-21-android-webview-debug/tbs-studio.png)

使用USB连接PC与手机，使用微信打开调试页面，点击启动检测

![](/images/2017-09-21-android-webview-debug/wechat-debug.png)

检测到手机微信后，点击确定继续检测，走到step4会显示以下页面

![](/images/2017-09-21-android-webview-debug/install-core.png)

此时，在手机上如果微信是新版本内核，则会弹出调试确认开关，如果是旧内核，则需要根据提示更新内核（大胆更新，不用担心），最后点击启动调试，则会弹出和Chrome Inspect相似的检测页面

![](/images/2017-09-21-android-webview-debug/inspect-tool.png)

看到了我的调试页面**行李旅宿**，点击Inspect则会进入微信浏览器真机调试控制台，也是和Chrome很相似

![](/images/2017-09-21-android-webview-debug/console.png)

这样就可以随心所欲的调试真机了，所有和微信浏览器环境的问题几乎都能在这里找到答案。QQ浏览器的调试方式和微信的一样，只是TBS会强行让你安装QQ浏览器调试版，换成调试版后，我发现Chrome也就能检测到QQ浏览器的页面了，很神奇。

最后，微信还有一个调试利器也很好用，就是微信web开发者工具，最早是和小程序开发工具分开发布的，开发者怨声载道最后集成到一起了，这个也能模拟微信的运行环境，在这里就不赘述了，详情请查看[微信小程序工具](https://mp.weixin.qq.com/debug/wxadoc/dev/devtools/download.html)。

以上就是Android端常用浏览器的真机调试方法，有了这些，再也不担心那些产品环境bug过夜了。
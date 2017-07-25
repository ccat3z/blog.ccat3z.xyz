---
layout: post
title: "Xposed在Android N下尝试使用SharedPreference的解决方案"
date: "2017-07-24 23:07:39 +0800"
tag: ["Xposed"]
short_description: "Xposed亦可赛艇"
---

最近有开发者终于耐不住等待, 拿起art的源码就开始自己改. 虽然只是WIP, 但各路大神立刻就放出了卡刷包, 我也迫不及待得尝了把鲜. 不过很快就发现原来的SharedPreference已经不再适用, 这里简单介绍下我所使用的解决方法.

我们知道, Xposed是通过向目标apk\"注入\"片段来实现修改原程序功能的, 实际运行时是在目标apk下. 通常我们想通过app来控制一些Xposed插件的功能, 第一个想到的方便的工具就是SharedPreference, 但Android中, 每个apk都处于不同的用户下运行, 不能直接XSharedPreference获取对应设置. 在之前的Android版本中我们常常通过将SharedPreference设置为`MODE_WORLD_READABLE`来实现全用户可读:

``` java
getPreferenceManager().setSharedPreferencesMode(MODE_WORLD_READABLE);
```

在xposed hook段中使用:

``` java
XSharedPreferences xSharedPreferences = new XSharedPreferences(PACKAGE_NAME);
xSharedPreferences.makeWorldReadable();
```

但在N中这个参数已经被禁用了(no longer supported), (M中是不推荐(deprecated)). 不过我们的想法大体上是不变的, 直接找SharedPreference的xml文件并全用户(组)Readable, 以PreferenceFragment为例, 在onPause中插入:

``` java
// 放在super.onPause();之后
// 因为PreferenceFragment默认采用的是MODE_PRIVATE
// 或者getActivity().getApplicationInfo().dataDir + "/shared_prefs/"
//         + getPreferenceManager().getSharedPreferencesName() + ".xml"
// 当然会被IDE警告, 当然别忘了测试file exist
new File("/data/data/" + PACKAGE_NAME + "/shared_prefs/" + PACKAGE_NAME + "_preferences.xml").setReadable(true, false);
```

虽然解决了`MODE_WORLD_READABLE`, 不过这样在N中还是可能会无法工作. 在UNIX其他用户组下读取子文件需要该文件具备r的权限的同时还需要所有父文件夹具有x权限, 但在试用SDK 24以上作为targetSdkVersion的APP的data目录在N下都会被设置成700权限, 即其他用户组没法获取该data文件夹下的任何文件. 一个临时方便的解决方法是将targetSdkVerison设置成23或者更小, 另一个可能可行的方法(暂未测试)是在前面设置SharedPreference的xml的权限后将data目录设置Excecutable(`setExecutable`).

完整的解决方案可以参考这个项目: [Hook-Method-Helper](https://github.com/c0ldcat/Hook-Method-Helper).
---
layout: post
title: "Windows截屏/录屏"
date: "2017-04-15 19:47:14 +0800"
tag: ["Windows"]
image_preview: "/images/2017-04-15-sceenshot-on-windows/screenshot.png"
description: "真的找了好久(在找之前加个没字)"
---


从Gnome切到Windows发现, Windows压根就没有Gnome配合[Vokoscreen](http://linuxecke.volkoh.de/vokoscreen/vokoscreen.html)那么一整套组合键花式截图/录屏的方便功能(日常怀念linux...), 安装了创意者更新后有了不少的改善(之前insider这么一直没发现...), 顺便安利一个很小方便的录屏软件, 在此篇做个整理.

# 截屏

## 最原始的方法: Print Screen

Print Screen应该是大部分标准键盘上都有的按键, 部分笔记本可能藏在Fn功能键里. 使用方法有两个: [Win + PrSrcn]和[Alt + PrSrcn], 前者截取整个屏幕, 保存在剪贴板和文件夹图片/屏幕截图文件夹中, 后者截取活动窗口, 并保存于剪贴版中.

## 类似手机的方法(Win10 平板): Win + VolDown

和手机上是一样的, 截取整个屏幕并保存于图片/屏幕截图中.

## 截图工具

Win7开始便自带的一个小工具, 隶属于Windows附件, 支持全屏, 窗口, 区域, 不规则区域四种方式截图, 还自带一个图片编辑工具, 可以保存在剪贴板或文件中. 很强大.

![](/images/2017-04-15-sceenshot-on-windows/screenshot-tool.png)

## Windows INK

Win10周年更新中引入的一大功能, Windows INK中的屏幕草图, 能够方便地截屏并选择区域缩放, 手绘, 可以保存在剪贴板或文件中.

![](/images/2017-04-15-sceenshot-on-windows/windows-ink.png)

## 新组合键

Win10创意者更新中引入的功能, [Win + Shift + S], 通过鼠标选择截图区域, 或者用空格或者Enter和方向键选择. 保存于剪贴板中.

# 录屏: OverSpeed

[OverSpeed](http://pan.baidu.com/s/1c0z4nM4)轻量级和功能上媲美Vokescreen, 并且支持录制高质量视频.

![](/images/2017-04-15-sceenshot-on-windows/overspeed.png)

用法非常简单, 配合ffmpeg可以实现各种格式, 也可以把ffmpeg放在同一目录下使用软件提供的图像接口(右键标题栏).
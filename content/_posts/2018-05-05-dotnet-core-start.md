---
layout: post
title: ".NET Core踩坑记录"
date: "2019-07-02 20:22:57 +0800"
tag: ["DotNet Core"]
description: "微软一统天下"
image: "/images/2018-05-05-dotnet-core-start/dotnet-logo.png"
---

> 时隔一年, 我又又又开始学.NET Core了, 删了以前的废话笔记

# 参考书目

* [.NET Core 全面扫盲贴](https://www.zybuluo.com/wddpct/note/442464#3.2.2)
* [[.net 面向对象程序设计深入]（8）认识.NET Core](http://www.cnblogs.com/yubinfeng/p/6626694.html)
* [简析.NET Core 以及与 .NET Framework的关系总结](http://m.php.cn/article/360483.html)
* [.NET Core文档](https://docs.microsoft.com/zh-cn/dotnet)

# IDE

## VS Code

没办法啊, Linux没有vs.

### Omnisharp fails to load project

> Microsoft.Build.Exceptions.InvalidProjectFileException: The imported project "/usr/lib/mono/xbuild/15.0/Microsoft.Common.props"
> 
> Omnisharp只有在不安装mono或同时安装mono和msbuild的情况下才能成功加载

相关issues: [OmniSharp/omnisharp-vscode#1998](https://github.com/OmniSharp/omnisharp-vscode/issues/1998), [OmniSharp/omnisharp-vscode#2151](https://github.com/OmniSharp/omnisharp-vscode/issues/2151)

C# for Visual Studio Code 基于[OmniSharp/omnisharp-roslyn](https://github.com/OmniSharp/omnisharp-roslyn), 依赖`msbuild`. 参考此项目的[README.md](https://github.com/OmniSharp/omnisharp-roslyn)
---
layout: post
title: "初识.NET Core"
date: "2018-05-05 20:31:01 +0800"
tag: ["DotNet Core"]
short_description: "微软大大好"
---

最近开始学.NET Core, .NET在Windows上可谓是全能的存在. 不过在.NET十多年的发展后弊端也逐渐显现.
特别是跨平台，尽管期间有Xamarin, Mono等等, 但依然是一大痛点.
最后, .NET Core在2016年出现了, .NET真正意义上走上了跨平台和开源, 势必会在各个平台上成为另一个主流.

.NET Core放在GitHub上, 由微软官方和社区共同支持.

.NET Core项目: [.NET Foundation](https://github.com/dotnet)

官方文档: [.NET Core指南](https://docs.microsoft.com/zh-cn/dotnet/core/)

![.NET Core Logo](/images/2018-05-05-dotnet-core-start/dotnet-logo.png)

# .NET Core 简介
## .NET Core 是什么

> .NET Core 是一个通用开发平台，由 Microsoft 和 [GitHub](https://github.com/dotnet/core) 上的 .NET 社区共同维护。 它是跨平台的，支持 Windows、macOS 和 Linux，并且可用于设备、云和嵌入式/IoT 方案。

简单来说.NET Core是.NET Framework的跨平台版本, 有着更好的兼容性和模块化设计. 现在.NET Core已经到了2.1.6, 逐渐趋于稳定和完善.

.NET的最终愿景:

![.NET Innvocation](/images/2018-05-05-dotnet-core-start/dotnet-innvocation.png)

## .NET Core 构成体系

![.NET Core Structure](/images/2018-05-05-dotnet-core-start/dotnet-structure.png)

从上到下分别为

1. 提供开发Windows系统的各种触屏设备和ASP.NET程序的一组基础库.
2. Unified BCL (Base Class Library) 基础类库.
3. Runtime .NET Core运行环境. .NET Core有两种运行环境, Native Runtime和CoreCLR, 可以理解为静态和非静态的运行时.

## .NET Core 各个功能模块

![.NET Core Module](/images/2018-05-05-dotnet-core-start/dotnet-module.png)

1. 应用层
2. 基础类库 CoreFX, 实现了.NET Standard Library
3. Runtime
    1. CoreCLR, CoreCLR与.NET Framework的CLR基本一样.
    2. CoreRT, 即Native Runtime. 部署运行时不需要安装Runtime, 类似于静态编译.
4. .Net编译器

# 参考

* [.NET Core 全面扫盲贴](https://www.zybuluo.com/wddpct/note/442464#3.2.2)
* [[.net 面向对象程序设计深入]（8）认识.NET Core](http://www.cnblogs.com/yubinfeng/p/6626694.html)
* [简析.NET Core 以及与 .NET Framework的关系总结](http://m.php.cn/article/360483.html)
* [.NET Core文档](https://docs.microsoft.com/zh-cn/dotnet)

(未完待续)

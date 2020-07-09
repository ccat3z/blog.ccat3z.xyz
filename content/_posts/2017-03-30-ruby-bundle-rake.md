---
layout: post
title: "Ruby各种基础概念整理"
date: "2017-03-30 23:09:18 +0800"
tag: ["Ruby"]
image_preview: "/images/2017-03-30-ruby-bundle-rake/bundle.png"
short_description: "不知怎么得就玩起了Ruby"
---

刚开始学Ruby, 一切都是如此新鲜. 相信不少人刚开始快速学Ruby也会想我一样遇到不少问题... Gem是什么, Rakefile是什么, 怎么打包Gem包, 有没有Makefile之类的问题, 在此篇作简单整理.

# Ruby

首先当然是Ruby, 这一种面向对象, 命令式, 函数式, 动态的脚本类编程语言.

# RVM

> RVM is a command-line tool which allows you to easily install, manage, and work with multiple ruby environments from interpreters to sets of gems.

Ruby环境安装配置, 在服务器部署和测试中有很大用处, 不过通常Linux发行版里都有最新Ruby包, 安装起来很方便.

# irb

Interactive Ruby Shell, 其实和python与Python, sh与Shell的关系类似, 常用的调试交互式环境.

# Rails

Ruby on Rails, 牛逼哄哄的MVC框架.

# Rake

> A make-like build utility for Ruby

就像make, maven一样的开发工具, 有像Makefile一样的Rakefile, Ruby语法, 大多数Ruby项目都会用到.

# Bundle

> The best way to manage a Ruby application's gems
> Bundler provides a consistent environment for Ruby projects by tracking and installing the exact gems and versions that are needed.

Gem依赖关系管理/安装/配置/运行...

# Gem

封装起来的Ruby应用程序或代码库
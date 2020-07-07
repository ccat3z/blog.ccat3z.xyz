---
layout: post
title: "Groovy学习笔记"
date: "2019-10-19 17:35:49 +0800"
tag: ["Groovy", "Learning"]
short_description: "干翻爪哇!"
image: "/images/2019-10-19-learning-groovy/groovy-logo.svg"
---

# Groovy学习笔记

开始<del>再一次</del>学习Java.
不过在学Java之前, 得先看看流行的Java构建工具, 免得被IDE偷偷干活.
现在比较流行(大概)Gradle,
相比Maven来说, gradle使用Groovy脚本语言来配置, 显得更加灵活,
非常适合我这种喜欢魔改的人.
学习Gradle的前置条件是Groovy, 但Groovy的前置条件是Java,
<del>于是我陷入死锁, 此文终结</del>.
本文**并非深入Groovy**, 只是简单罗列Groovy的语言特点,
方便快速入门, 看懂并简单使用Groovy的魔法.

## 学习资料

* [groovy-lang.org](https://groovy-lang.org/)
* [docs.groovy-lang.org](https://docs.groovy-lang.org/)

官方站点有完善的文档, 并推荐了不少书籍. 入门足够了.

## 概述

> Apache的Groovy是Java平台上设计的面向对象编程语言。
> 这门动态语言拥有类似Python、Ruby和Smalltalk中的一些特性，
> 可以作为Java平台的脚本语言使用，
> Groovy代码动态地编译成运行于Java虚拟机上的Java字节码，
> 并与其他Java代码和库进行互操作。-- Wikipedia

Groovy基于JVM, 扩展了Java语法, 并且使其具动态语言的性质.
Groovy并非Java的语法糖, 但与Java无缝衔接.

![](/images/2019-10-19-learning-groovy/groovy-and-java.png)

Groovy和其他脚本语言类似,
可以通过`groovy *.groovy`直接运行, 也提供了REPL(`groovysh`).
比较特别的是, Groovy可以通过`groovyc`直接编译成jvm的`bytecode`.

## 关键词

as, assert, break, case, catch, class, const, continue,
**def**, default, do, else, enum, extends, false, finally, for, goto, if,
implements, import, in, instanceof, interface, new, null, package, return,
super, switch, this, throw, throws, **trait**, true, try, while

Groovy的关键词和Java其实差不多. `def`声明变量等.

## 程序结构

Groovy的程序结构和Java是类似的.

``` groovy
// defining a package named com.yoursite
package com.yoursite
// importing the class MarkupBuilder
import groovy.xml.MarkupBuilder

// using the imported class to create an object
def xml = new MarkupBuilder()

assert xml != null
```

Groovy默认import了一些包:

``` groovy
import java.lang.*
import java.util.*
import java.io.*
import java.net.*
import groovy.lang.*
import groovy.util.*
import java.math.BigInteger
import java.math.BigDecimal
```

### import alias

和javascript和python等语言一样, groovy支持import别名

``` groovy
import java.sql.Date as SQLDate
```

### public static void main

Groovy支持和Java一样的`public static void main`类作为程序入口, 也支持脚本的样式.
一下两端效果是一样的:

``` groovy
class Main {                                    
    static void main(String... args) {          
        println 'Groovy world!'                 
    }
}
```

``` groovy
println 'Groovy world!'
```

不过脚本的样式在编译时会使用`groovy.lang.Script`包裹
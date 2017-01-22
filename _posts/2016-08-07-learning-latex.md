---
layout: post
title: "LaTeX 学习笔记"
date: "2016-08-07 16:30:00 +0800"
tag: ['LaTeX']
image_preview: /images/2016-08-07-learning-latex/love-latex.png
---

<!-- TOC depthFrom:1 depthTo:6 withLinks:1 updateOnSave:1 orderedList:0 -->

- [什么是LaTeX](#什么是latex)
- [TaTeX的优缺点](#tatex的优缺点)
- [LaTeX学习笔记](#latex学习笔记)
	- [安装(for Windows)](#安装for-windows)
	- [安装(for Linux)](#安装for-linux)
	- [安装Vim插件:Vim Latex-Suite(for Linux)](#安装vim插件vim-latex-suitefor-linux)
	- [Vim Latex-Suite](#vim-latex-suite)
	- [LaTeX命令格式](#latex命令格式)
	- [基本结构](#基本结构)
	- [文档类](#文档类)
	- [宏包](#宏包)
	- [插入文件](#插入文件)
	- [仅检查语法](#仅检查语法)
	- [中文化(xeCJK&CTeX)](#中文化xecjkctex)
	- [特殊字符](#特殊字符)
	- [文本排版](#文本排版)
	- [标题,章和节](#标题章和节)
	- [章节目录](#章节目录)
	- [CTeX更换全文中文字体](#ctex更换全文中文字体)
- [参阅书籍](#参阅书籍)
- [一些问题](#一些问题)

<!-- /TOC -->

其实只是想找一款方便的笔记软件用来记录化学笔记~~为什么不用notebook...~~,后来就找到了这个LaTeX.

LaTeX作为一款优秀的电子排版软件,相比Office Word有更好的兼容性~~甚至有Beamer做演示稿~~,也拥有Gitbook这样方便控制的一些的特性,是撰写理工科论文,笔记的优秀工具.

![](/images/2016-08-07-learning-latex/latex.png)

#  什么是LaTeX
> LaTEX（/ˈlɑːtɛx/，常被读作/ˈlɑːtɛk/或/ˈleɪtɛk/），文字形式写作LaTeX，是一种基于TEX的排版系统，由美国电脑学家莱斯利·兰伯特在20世纪80年代初期开发，利用这种格式，即使用户没有排版和程序设计的知识也可以充分发挥由TEX所提供的强大功能，能在几天，甚至几小时内生成很多具有书籍质量的印刷品。对于生成复杂表格和数学公式，这一点表现得尤为突出。因此它非常适用于生成高印刷质量的科技和数学类文档。这个系统同样适用于生成从简单的信件到完整书籍的所有其他种类的文档。
> <p align="right">--维基百科</p>

#  TaTeX的优缺点

LaTeX总会拿来和一些"所见即所得"(What You See Is What You Get)的文字处理和排版工具比较优缺点.

以下总结一些LaTeX的优点:

* **专业的排版输出**,产生的文档看上去就像“印刷品”一样.
* **方便而强大的数学公式排版能力**,无出其右.
* **简单易懂的命令**,绝大多数时候,用户只需掌握一些简单易懂的命令来组织文档结构,无需(或很少)操心文档的版面设计.
* **很容易生成复杂的专业排版元素**,如脚注,交叉引用,参考文献,目录等.
* **强大的扩展性**,世界各地的人开发了数以千计的LaTeX宏包用于补充和扩展LaTeX的功能.
* **促使用户写出结构良好的文档**而这也是LaTeX存在的初衷.
* **免费**,LaTeX依赖的TEX排版引擎和其它软件是跨平台,免费,开源的.无论用户使用的是 Windows,OS X,GNU/Linux还是FreeBSD等系统,都能轻松获得并使用这一强大的排版工具.

LaTeX的缺点也是显而易见的:

* **入门门槛高**
* **排查错误困难**,LaTeX作为一个依靠编写代码工作的排版工具,其使用的宏语言比 C++
或 Python 等程序设计语言在错误排查方面困难得多。它虽然能够提示错误,但不提供调
试的机制,有时错误提示还很难理解..
* **样式定制困难**,LaTeX提供了一个基本上良好的样式,为了让用户不去关注样式而专注于
文档结构。但如果想要改进 L A TEX 生成的文档样式则是十分困难.
* **相比"所见即所得"的模式有一些不便**,为了查看生成的文档,用户总要不停地编译.

# LaTeX学习笔记

## 安装(for Windows)
CTEX.ORG为我们准备好了LaTeX及中文化的[套装](http://www.ctex.org/CTeXDownload#hn_59ca4f8bbb_2),直接安装即可

## 安装(for Linux)
大多数Linux发行版都在其源中加入了TeX Live,对于Arch Linux:

``` bash
pacman -S texlive-core #核心
pacman -S texlive-most #包括了一些常用宏包
pacman -S texlive-lang #对其他语言(如中文,韩文等)的支持
```

## 安装Vim插件:Vim Latex-Suite(for Linux)

``` bash
pacman -S vim-latexsuite
```

## Vim Latex-Suite

``` vim
LaTeX Suite Vim 配置:
"LaTeX Suite Vim 配置
filetype plugin on "启动时调用插件(REQUIRED)
filetype indent on "启动时按文件类型调用插件(OPTIONAL)
set shellslash "Windows用户需要开启shellslash来调用latex命令(IMPORTANT)
set grepprg=grep\ -nH\ $* "grep时显示文件名(IMPORTANT)
"Vim7开始,空.tex默认定义为'plaintex'而不是'tex',这会导致vim-latex不被调用
"增加此环境变量还原这一设置(OPTIONAL)
let g:tex_flavor = "latex"
" this is mostly a matter of taste. but LaTeX looks good with just a bit
" of indentation.
set sw=2
" type in \ref{fig: and press <C-n> you will automatically cycle through
" all the figure labels. Very useful!
set iskeyword+=:
```

查看帮助

``` vim
:help latex-suite.txt
```

## LaTeX命令格式
* 反斜线和后面的一串字母,以任意非字母符号(空格,数字,标点等)作为分隔符.
* 反斜线和后面的一个非字母符号,无需分隔符.
* 对大小写敏感

## 基本结构

``` tex
\documentclass{article}
%导言区
\begin{document}
%文档
\end{document}
```

## 文档类

``` tex
\documentclass[⟨options⟩]{⟨class_name⟩}
```

## 宏包

``` tex
\usepackage[⟨options⟩]{⟨class-name⟩} %导言区
```

## 插入文件

``` tex
\include{⟨filename⟩}
\input{⟨filename⟩} %不新建页
```

## 仅检查语法

``` tex
\syntaxonly %导言区
```

## 中文化(xeCJK&CTeX)

仅使用xeCJK:

``` tex
\documentclass{article}
\usepackage{xeCJK}
\setCJKmainfont{SimSun}
\begin{document}
中文LaTeX排版。
\end{document}
```

CTeX是xeCJK的进一步封装:

``` tex
\documentclass{article}
\usepackage{ctex} %使用ctex宏包
\begin{document}
你好
\end{document}
```

再进一步:

``` tex
\documentclass{ctexart}
\begin{document}
你好
\end{document}
```

## 特殊字符

``` tex
\# \$ \% \& \{ \} \_
\^{} \~{}
\textbackslash
```

## 文本排版

对LaTeX来说多少个空格或Tab或一个换行都算一个空格.

``` tex
\\ %另起一行(本段)
%两个换行,另起一段
\newpage %另起一页
```

## 标题,章和节

``` tex
\chapter{...} %只有report和book有
\section{...}
\subsection{...}
\subsubsection{...}
\paragraph{...}
\subparagraph{...}
```

## 章节目录

``` tex
\tableofcontents
```

在其出现的位置插入目录.为了得到正确的目录(table of contents) 内容,一个新文档必须编译两次.有时还要编译第三次.如有必要LaTeX会告诉你.

## CTeX更换全文中文字体

以Source Han Sans CN Regular为例子<br/>
在工作目录下建立ctex-fontset-shpc.def

``` tex
\ProvidesExplFile{ctex-fontset-shpc.def}
  {\ExplFileDate}{2.2}{\ExplFileDescription}
  {
    \setCJKmainfont
      [
          BoldFont = Source~Han~Sans~CN~Regular ,
        ItalicFont = Source~Han~Sans~CN~Regular
      ] { Source~Han~Sans~CN~Regular }
    \setCJKsansfont { Source~Han~Sans~CN~Regular }
    \setCJKmonofont { Source~Han~Sans~CN~Regular }
    \setCJKfamilyfont { zhsong } { Source~Han~Sans~CN~Regular }
    \setCJKfamilyfont { zhhei }  { Source~Han~Sans~CN~Regular }
    \setCJKfamilyfont { zhfs }   { Source~Han~Sans~CN~Regular }
    \setCJKfamilyfont { zhkai }  { Source~Han~Sans~CN~Regular }
  }
\NewDocumentCommand \songti   { } { \CJKfamily { zhsong } }
\NewDocumentCommand \heiti    { } { \CJKfamily { zhhei } }
\NewDocumentCommand \fangsong { } { \CJKfamily { zhfs } }
\NewDocumentCommand \kaishu   { } { \CJKfamily { zhkai } }
\setmainfont{Source~Han~Sans~CN~Regular}  %英文字体
```

在DocumentClass option中加入fontset=shpc

``` tex
\documentclass[fontset=shpc]{ctexrep}
```

# 参阅书籍
这里汇集了一些我在学习LaTeX中看过的一些书籍和网站,希望对您有所帮助

* [《lshort(一份不太简短的LaTeX2ε介绍)(未完全翻译)》](https://github.com/louisstuart96/lshort-new-zh-cn),Tobias Oetiker,2015
* [Chinese TeX](http://www.ctex.org/),CTEX.ORG,2016
* [LaTeX开源小屋](http://www.latexstudio.net/),LaTeX工作室,2016
* [CTAN](http://www.ctan.org/),CEST,2016

# 一些问题
Q1:Linux中TeX生成PDF在evince中乱码<br/>
A1:安装poppler-data

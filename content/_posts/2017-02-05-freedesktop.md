---
layout: post
title: "Freedesktop那些破事"
date: "2017-02-05 16:32:44 +0800"
tag: ["Linux", "Freedesktop"]
short_description: "对于一个强迫症, 这些Deskotp的技能必须熟练"
image_preview: "/images/2017-02-05-freedesktop/freedesktop.svg"
---

## Desktop entries

桌面配置项是描述如何启动程序, 如何处理数据的配置文件, 它们还会和菜单规范同步作用, 定义一个程序在菜单中的显示图标. 大部分桌面配置项是 .desktop 和 .directory 文件.

[Desktop Entry标准](https://specifications.freedesktop.org/desktop-entry-spec/desktop-entry-spec-latest.html)

一个典型例子:

``` conf
[Desktop Entry]

# The type as listed above
Type=Application

# The version of the desktop entry specification to which this file complies
Version=1.0

# The name of the application
Name=jMemorize

# A comment which can/will be used as a tooltip
Comment=Flash card based learning tool

# The path to the folder in which the executable is run
Path=/opt/jmemorise

# The executable of the application, possibly with arguments.
Exec=jmemorize

# The name of the icon that will be used to display this entry
Icon=jmemorize

# Describes whether this application needs to be run in a terminal or not
Terminal=false

# Describes the categories in which this entry should be shown
Categories=Education;Languages;Java;
```

### StartupWMClass属性

有些Application会用到很多窗口, 需要desktop来定义它们的图标和对应的目录, 这里就要用到WM_CLASS.

更具startup-notification的定义, WMClass is a string to match against the "resource name" or "resource class" hints.

时尚的Desktop environments比如Gnome 3,Unity, KDE等会用WMClass来判断一个Window属于哪个Application并赋予相应的行为和属性.

我们能够通过`xprop`来确定一个窗口的WMClass.

`xprop WM_CLASS`

然后点击窗口

`WM_CLASS(STRING) = "atom", "Atom"`

这里的atom或者Atom就是WM_CLASS, 任选其一作为StartupWMClass就行了.

``` confG
[Desktop Entry]
Name=Atom
Comment=A hackable text editor for the 21st Century.
GenericName=Text Editor
Exec=env PYTHON=python2 /usr/share/atom/atom %U
Icon=atom-editor
Type=Application
StartupNotify=true
StartupWMClass=Atom
Categories=GNOME;GTK;Utility;TextEditor;Development;
MimeType=text/plain;
```

## Default Application

设置默认应用前先要了解[MINE Type](#{{ "MINE Type" | slugify }})

大体上分为意下几种方法:

### Environment variables

对于大多数命令行环境来说, 通常是设置环境变量, 最常见的有`BROWSER`代表默认浏览器和`EDITOR`代表默认编辑器等等.

### 直接用DE提供的图形接口

就是经常在Ubuntu等等新手入门里看见的, 在设置里, 对于Gnome来说在Settings->Details->Default Applications

![](/images/2017-02-05-freedesktop/gnome-settings.png)

### XDG standard

[详细标准](https://specifications.freedesktop.org/mime-apps-spec/mime-apps-spec-1.0.html)

文件位置:

| Path | Usage |
| --- | --- |
| ~/.config/mimeapps.list | user overrides|
| /etc/xdg/mimeapps.list | system-wide overrides|
| ~/.local/share/applications/mimeapps.list | (deprecated) user overrides|
| /usr/local/share/applications/mimeapps.list <br /> /usr/share/applications/mimeapps.list | distribution-provided defaults|

文件格式:

``` conf
# mineapps.list
# 这些应用可以打开这类文件
[Added Associations]
image/jpeg=bar.desktop;baz.desktop
video/H264=bar.desktop
# 这些应用不应该被用来打开这类文件
[Removed Associations]
video/H264=baz.desktop
# 最好用这些应用打开这类文件
[Default Applications]
image/jpeg=foo.desktop
```

## MINE Type

互联网媒体类型(Internet media type, 也称为MIME类型(MIME type)或内容类型(content type))是给互联网上传输的内容赋予的分类类型.

一个MIME类型包括一个类型(type), 一个子类型(subtype). 此外可以加上一个或多个可选参数(optional parameter). 其格式为

```
类型名 / 子类型名 [ ; 可选参数 ]
```

### 如何在Linux下获取file的MINE Type

``` sh
file -i favicon.svg
#output: favicon.svg: image/svg+xml; charset=us-ascii
```

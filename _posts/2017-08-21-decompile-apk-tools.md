---
layout: post
title: "Android反编译工具总结"
date: "2017-08-21 01:05:20 +0800"
tag: ["Android"]
short_description: "我... 我就想学习一下 QwQ 绝对不会抢红包什么的"
---

> 转自[Android反编译工具总结](http://sunzq1993.com/2017/03/19/Android反编译工具总结/)


> 最近想写自己写个apk，但是苦于没有本人不会ui、不会ps（那我会啥 ╮(╯▽╰)╭），就会敲代码，so 就反编译了下我感觉ui好看的apk，反编译了这么多个apk希望不要被抓到（::>_<::）……

首先来简单的说明下Apk文件本质上其实是一个zip包。我们直接进行解压就能看到其中的目录。

![](/images/2017-08-21-decompile-apk-tools/dir.png)

## 目录说明

* AndroidManifest.xml：应用的全局配置文件
* classes.dex：源代码编译成class后，转成jar，再压缩成dex文件，dex是可以直接在Android虚拟机上运行的文件。
* lib文件夹：引用的第三方sdk的so文件。
* META-INF文件夹：Apk签名文件。
* res文件夹：资源文件，包括了布局、图片等等。
* resources.arsc：记录资源文件和资源id的映射关系。
* 其中还有一个没有显示就是→assets文件夹：原始资源文件夹，对应着Android工程的assets文件夹，一般用于存放原始的网页、音频等等。
* 上述的这些说明 简单的说明了一个apk基本包含的东西，直接把apk解压是没有办法进行阅读的，在打包这个过程中经过了build-tools处理了。

其实反编译Apk的目的就是Apk拆成我们可以阅读的文件。通过反编译，我们一般想要得到里面的AndroidManifest.xml文件、res文件和java代码。

我将介绍3个工具来对apk进行反编译

## 1.利用ApkTool，获取AndroidManifest和res等资源文件

怎么得到Apk下的资源文件，这是个问题，我上网查找是发现了ApkTool工具，当时给我的感觉就好像是发现新大陆一样

[工具地址](https://ibotpeaches.github.io/Apktool/)

功能：拆解Apk文件，反编译其中的资源文件，将它们反编译为可阅读的AndroidManifest.xml文件和res文件。因为直接把Apk文件当做zip解压，得到的xml资源文件，都是无法直接用文本编辑器打开阅读的，因为它们在打包时经过了build-tools的处理。

[安装](https://ibotpeaches.github.io/Apktool/install/) 最新版本是2.2 需要的环境是jdk 1.7以上

> * 下载apktool-2（[最新](https://bitbucket.org/iBotPeaches/apktool/downloads/)）
> * 将下载的jar重命名为 apktool.jar
> * 将这两个文件（apktool.jar＆apktool.bat）移动到您的Windows目录（通常C://Windows）
> * 如果没有访问权限C://Windows，可以将这两个文件放在任何位置，然后将该目录添加到您的环境变量系统PATH变量。
> * 尝试apktool通过命令提示符运行

下面我在win10 上演示如何利用ApkTool 进行反编译的

上述说到如果你把文件移动到其他的位置，就需要配置环境变量，上述有提到

首先进入到你想要 反编译的apk 目录下，我为了方便就放置到一起了。

![](/images/2017-08-21-decompile-apk-tools/apktool.png)

我们可以从下图看到反编译出来的具体内容

![](/images/2017-08-21-decompile-apk-tools/apktool_content.png)

我们已经得到一个可以用文本编辑器打开的阅读的AndroidManifest.xml文件、assets文件夹、res文件夹、smali文件夹等等。original文件夹是原始的AndroidManifest.xml文件，res文件夹是反编译出来的所有资源，smali文件夹是反编译出来的代码。这里smali 不做说明。

这时，我们已经可以文本编辑器打开AndroidManifest.xml文件和res下面的layout文件了。这样，我们就可以查看到这个Apk文件的package包名、Activity组件、程序所需要的权限、xml布局、图标等等信息。

[其他用法](https://ibotpeaches.github.io/Apktool/documentation/)

``` bash
java -jar apktool.jar d test.apk
-f 如果目标文件夹已存在，强制删除现有文件夹
-o 指定反编译的目标文件夹的名称（默认会将文件输出到以Apk文件名命名的文件夹中）
-s 保留classes.dex文件（默认会将dex文件解码成smali文件）
-r 保留resources.arsc文件（默认会将resources.arsc解码成具体的资源文件）
  
// 注意`apktool.jar`是刚才下载后的jar的名称，`d`参数表示decode
// 在这个命令后面还可以添加像`-o -s`之类的参数，例如
// java -jar apktool.jar d yourApkFile.apk -o destiantionDir -s
// 几个主要的参数设置方法及其含义：
```

## 2.利用dex2jar反编译dex文件，得到java源代码

在上面说到我们通过apkTool反编译获得apk 等资源文件，如果你想获取源代码呢，怎么办，这时候就需要dex2jar登场了。

[工具地址](https://github.com/pxb1988/dex2jar)

功能：将dex格式的文件，转换成jar文件。dex文件时Android虚拟机上面可以执行的文件，jar文件大家都是知道，其实就是java的class文件。在官网有详细介绍。

安装： 打开下载的文件进行解压后进入/dex2jar目录下，里面有脚本本件，进入终端后，输入命令就可以使用啦。

使用： 利用终端进入到你的dex2jar目录下，输入命令进行获取

![](/images/2017-08-21-decompile-apk-tools/dex2jar.png)

这个时候就有人问我，你那个classes.dex是怎么获得的，其实在我最开始讲述的时候说过，把apk解压下来就能获得classes.dex文件，之后赋值到dex2jar目录下 ，执行命令。

这个时候又有人问我了（怎么这么多人问我），我怎么看生成的这个jar包呀。这个时候就需要 jd-gui了

### 2.1 jd-gui查看java源代码

工具下载地址：[官网](http://jd.benow.ca/)上选择自己所需要的版本，[github](https://github.com/java-decompiler/jd-gui)

用法： 下载完成后直接打开，把生成的classes-dex2jar.jar 文件直接拖到里面就可以观看了

![](/images/2017-08-21-decompile-apk-tools/jd-gui.png)

## 3.jadx反编译Akp，得到.java源代码

> 介绍： 又双人问我有没有直接生成.java文件的，我说有啊，那就是是是是jadx

其中我在上网查找之前apktool+dex2jar+jd-gui一直是一个比较流行的Android反编译组合。

功能 ： 但是jadx具有以下两个优点

可以直接反编译出.java文件
查看源码时直接显示资源名称，而不是像jd-gui里显示的资源ID
工具地址 ：

> * [github](https://github.com/skylot/jadx/releases)
> * [sourceforge](http://sourceforge.net/projects/jadx/files/)

安装： 下载完成后进行解压

使用： 进入bin目录下执行jadx-gui.bat，jadx也有GUI，进入后选中然将要反编译的apk即可，运行效果如下。

![](/images/2017-08-21-decompile-apk-tools/jadx.png)

Android反编译工具总结

如果要保存源码，选择File->Save ALL即可保存文件，然后就可以导入Android Studio等IDE中。我们也可以直接使用命令行反编译apk文件：

``` bash
jadx -d out classes.dex  #直接输出.java文件到out目录
jadx-gui classes.dex #使用gui打开
```

现在你就可以用到jadx啦，不过获取资源等文件我还是建议使用ApkTool

## 4.ClassyShark谷歌亲儿子 你知道

[工具地址](https://github.com/google/android-classyshark/releases)

功能：可直接浏览 Apk中的xml文件等，支持对.dex, .aar, .so，.apk, .jar, .class等文件的操作。

安装： 下载ClassyShark.jar后直接点击使用就可以了。

用法： 直接点击左上角打开你想要解析的apk就可以啦。

> 它可以直观的看到Apk 下每个包中的方法数，并且以直观的扇形图展示在右边。（这里面直接使用的是内涵段子的apk）
>
> 这个时候就可以看到apk 下用到的第三方框架啦

![](/images/2017-08-21-decompile-apk-tools/classyshark.png)

同时你可以直接看到所使用的 xml 文件等布局文件，同时你也可以看到apk下所包含的方法数是多少以及它使用的开源库等信息。

![](/images/2017-08-21-decompile-apk-tools/classyshark_1.png)

![](/images/2017-08-21-decompile-apk-tools/classyshark_2.png)

## 总结

其实还有有两个没有介绍到enjarify 、 Procyon 这个两个讲下之后进行更新

其实我们反编译apk，就是进行更多的学习，想看看其他apk的具体逻辑是怎么实现的，如果你想要只是简单的获得资源等文件只用apkTool就可以啦。

以上的几个工具给我的感觉还是不错的，基本可以实现我现在的需求（毕竟我只需要获得资源文件就好了）

### 参考

[那些值得你试试的Android竞品分析工具](http://blog.coderclock.com/2016/07/04/android/%E9%82%A3%E4%BA%9B%E5%80%BC%E5%BE%97%E4%BD%A0%E8%AF%95%E8%AF%95%E7%9A%84Android%E7%AB%9E%E5%93%81%E5%88%86%E6%9E%90%E5%B7%A5%E5%85%B7/)

[Android反编译技术总结](https://unclechen.github.io/2016/09/07/Android%E5%8F%8D%E7%BC%96%E8%AF%91%E6%8A%80%E6%9C%AF%E6%80%BB%E7%BB%93/)
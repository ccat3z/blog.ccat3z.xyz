---
layout: post
title: "发一个小工具-Scale JPG"
date: "2017-04-07 22:06:28 +0800"
tag: ["JavaFX", "Project"]
image_preview: "/images/2017-04-02-scale-jpg-init/scale-jpg.svg"
description: "JavaFX突然登场"
---

前面全是废话, 直接跳到[怎么用](#怎么用)

前几天在报自招, 照片材料文件限制真的非常麻烦啊...

于是我随手写了一串脚本:

``` sh
#!/bin/sh

if [ -d out_small_data ];then
    echo "out_small_data dir existed."
    read -n 1 -p "remove it?[y/N]" answer
    echo
    if [ "$answer" == "y" ];then
        rm -rf out_small_data
    else
        exit
    fi
fi

cp data out_small_data -r

cd out_small_data

FILE_SIZE=300k
QUALITY=50
SIZE=100

while [ "$(find ./ -regex '.*\(jpg\|JPG\|png\|jpeg\)' -size +$FILE_SIZE | sed "s/^\.\///")x" != "x" ]
do
    for f in $(find ./ -regex '.*\(jpg\|JPG\|png\|jpeg\)' -size +$FILE_SIZE | sed "s/^\.\///")
    do
        #echo "converting $f with $QUALITY% quality..."
        echo "converting $f with $SIZE% size..."
        mv $f "tmp$f"
        convert -quality ${QUALITY} "tmp$f" "tmp2$f"
        convert -resize $SIZE%x$SIZE% "tmp2$f" $f
        rm "tmp$f" "tmp2$f"
    done
    QUALITY=$(($QUALITY - 1))
    SIZE=$(($SIZE - 1))
done

for f in $(find ./ -regex '.*\(.png\|.PNG\)$' | sed "s/^\.\///")
do
echo "convert png file "$f" to jpg file"
mv $f "tmp$f"
convert "tmp$f" $(echo $f | sed 's/\..*$/.jpg/')
rm "tmp$f"
done

echo "done"
```

原理非常粗暴o_o ....

就是一步步减小质量和分辨率直到文件符合大小为止

感觉还不错(。・∀・)ノ

然后陆陆续续有一些同学来找我压缩图片

其实下个50M+的格式工程手动一步步缩小就能解决, 但都太懒了

然后我也懒得不行..连敲一行命令都不想

然后想把脚本给他...( ＿ ＿)ノ｜

但不行啊总不能让别人每个人都升级Windows 10 Insider再按个WSL吧

然后我就想要不写个UI吧（￣︶￣）↗　

然后不想写个Web APP啊..毕竟找不到免费的国内的性能比较好的VPS, 然后我又不会PHP╯︿╰

要不写native的吧?

然后我又不会WPF...要不用PyQT? SWING? GTK C?

然后我就想起好像还有个JavaFX（\*゜ー゜\*）

![](/images/2017-04-02-scale-jpg-init/javafxisland.png)

然后随手搜了一下(●'◡'●)

看起来挺容易上手的(ง •_•)ง

确实也挺容易上手的(￣▽￣)"

然后三两下就入了门,

配合过硬的Google技能\\(￣︶￣*\\))

然后Scale JPG就写好了

真的只要吧照片文件拖进去就好了

真的非常方便!( ´･･)ﾉ(._.`)

真的非常方便写!

MVC框架非常清晰干净,(哪来的M...VC框架(+_+)?

然后用Java1.8, 再也不用一堆匿名listener, lamda函数来回嵌套♪(^∇^*)

zenjava的javafx-maven-plugin一行命令就打包好了exe

然后, 然后这边又好多然后... 最后我来谈谈怎么用

# 怎么用

首先下载...

虽然是小工具...但因为捆绑了Jre8巨大无比...40MB

[百度网盘](http://pan.baidu.com/s/1eSmohhC)

[Github](https://github.com/c0ldcat/scale-jpg/releases/download/v1.0/scale-jpg-1.0.exe)

首先看看演示视频

{% assign video = "/images/2017-04-02-scale-jpg-init/scale-jpg.mp4" %}

{% include video.html %}

然后解压

![](/images/2017-04-02-scale-jpg-init/extract.png)

然后打开

![](/images/2017-04-02-scale-jpg-init/app.png)

这里有几个选项, 在MenuBar - Edit - Setting

![](/images/2017-04-02-scale-jpg-init/setting.png)

* 第一个Initial Scale: 初始压缩大小, 就是我第一个尝试的照片尺寸(百分比)

* 第二个Scale Step: 每步减少的百分百

  * 这两个一般不用管

* 最后一个是File Size, 文件限制大小, 单位是KB

点OK保存

然后把文件拖进去

![](/images/2017-04-02-scale-jpg-init/drag.png)

然后在原文件目录下就生成好了缩放好的文件(orginal name-scaled.jpg)

好, 搞定!
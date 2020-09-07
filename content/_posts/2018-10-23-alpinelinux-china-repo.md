---
layout: post
title: "Alpine Linux 国内源"
date: "2018-10-23 14:36:36 +0800"
tag: ["AlpineLinux"]
description: "更快一点"
---

* 中科大: http://mirrors.ustc.edu.cn/alpine/
* 阿里云: https://mirrors.aliyun.com/alpine/

``` sh
sed -i "s/dl-cdn\.alpinelinux\.org/mirrors.ustc.edu.cn/" /etc/apk/repositories
```
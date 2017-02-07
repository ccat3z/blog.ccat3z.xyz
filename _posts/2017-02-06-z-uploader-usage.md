---
layout: post
title: "Z Uploader正式测试!"
date: "2017-02-06 20:06:22 +0800"
tags: ["Z Uploader"]
image_preview: "/images/z-uploader.svg"
short_description: "为了收作业写的Web App...一想到这可能是我最后几天收作业了"
---

3天开发, 7天个人测试, 3天小组测试, 接下来就是班级测试了.

当然还有一些Bug, 如果发现或者有改经建议请即使向我提交. 我会尽快修正.

这应该是我现阶段码代码最快的速度了, 850行/天, 惭愧惭愧, 理解学习Dropwizard占用了大部分时间...

让我们先看看这套玩意怎么用.

本着我个人一贯简洁到底, 能借用就借用的原则, 直接抄来了[michigangraham](https://twitter.com/michigangraham)的Jekyll主题, 硬是把Blog的css改成了Application风格, 大概长这样:

![](/images/2017-02-06-z-uploader-usage/screenshot.png)

[Z Uploader Beijing(coding.net) image link](http://z-uploader.cn.c0ldcat.ml)

# 我是用户, 怎么上传?

页面分为三个部分, 分别为标题, 导航栏, 内容. 内容中又分为Notify区域和Task区域.

## 注册

班级测试中我已经预留了用户名和密码, 无需注册.

![](/images/2017-02-06-z-uploader-usage/register.gif)

在初始页面中点击New Here进入注册页面, 在输入框中输入`用户真实姓名:ID:密码`回车或者点击右侧按钮, 出现Notify中出现`The user ID created.`表示以及注册成功.

## 登录

形同注册, 在初始页面输入框中输入`ID:密码`回车或点击右侧>按钮即可登录.

### 预留的用户名ID

为了预防重名, 设计之初便采用了用户名和ID分离的数据模式. 以下是初始的用户名和密码.

顺序和重复ID排布随机不按先后

``` json
{
  "persons" : [ {
    "name" : "夏媛",
    "passwd" : "xy",
    "uuid" : "xy"
  }, {
    "name" : "张凌峰",
    "passwd" : "zlf",
    "uuid" : "zlf"
  }, {
    "name" : "姜逸清",
    "passwd" : "jyq",
    "uuid" : "jyq"
  }, {
    "name" : "曹文悦",
    "passwd" : "cwy",
    "uuid" : "cwy"
  }, {
    "name" : "唐妍",
    "passwd" : "ty",
    "uuid" : "ty"
  }, {
    "name" : " 范艳雯",
    "passwd" : "fyw",
    "uuid" : "fyw"
  }, {
    "name" : "李倩",
    "passwd" : "jq",
    "uuid" : "jq"
  }, {
    "name" : "张佳怡",
    "passwd" : "zjy",
    "uuid" : "zjy"
  }, {
    "name" : "朱怡",
    "passwd" : "zyi",
    "uuid" : "zyi"
  }, {
    "name" : "陆玟汐",
    "passwd" : "lwx",
    "uuid" : "lwx"
  }, {
    "name" : "王其佳",
    "passwd" : "wqj",
    "uuid" : "wqj"
  }, {
    "name" : "胡秦妤",
    "passwd" : "hqy",
    "uuid" : "hqy"
  }, {
    "name" : "马素钰",
    "passwd" : "msy",
    "uuid" : "msy"
  }, {
    "name" : "施唯一",
    "passwd" : "swy",
    "uuid" : "swy"
  }, {
    "name" : "朱铭珺",
    "passwd" : "zmj",
    "uuid" : "zmj"
  }, {
    "name" : "姚袁颖",
    "passwd" : "yyy",
    "uuid" : "yyy"
  }, {
    "name" : "孙锦昊",
    "passwd" : "sjh",
    "uuid" : "sjhao"
  }, {
    "name" : "王圣为",
    "passwd" : "wsw",
    "uuid" : "wsw"
  }, {
    "name" : "田上扬",
    "passwd" : "tsy",
    "uuid" : "tsy"
  }, {
    "name" : "张媛",
    "passwd" : "zhangy",
    "uuid" : "zhangy"
  }, {
    "name" : "孟梦",
    "passwd" : "mm",
    "uuid" : "mm"
  }, {
    "name" : "陈薪羽",
    "passwd" : "cxy",
    "uuid" : "cxy"
  }, {
    "name" : "王天赐",
    "passwd" : "wtc",
    "uuid" : "wtc"
  }, {
    "name" : "阎可心",
    "passwd" : "ykx",
    "uuid" : "ykx"
  }, {
    "name" : "陆林海",
    "passwd" : "llh",
    "uuid" : "llh"
  }, {
    "name" : "蓝欣悦",
    "passwd" : "lxy",
    "uuid" : "lxy"
  }, {
    "name" : "盛佳浩",
    "passwd" : "sjh",
    "uuid" : "sjh"
  }, {
    "name" : "甘伟",
    "passwd" : "gw",
    "uuid" : "gw"
  }, {
    "name" : "陈佳奕",
    "passwd" : "cjy",
    "uuid" : "cjy"
  }, {
    "name" : "黄雨凡",
    "passwd" : "hyf",
    "uuid" : "hyf"
  }, {
    "name" : "徐征宇",
    "passwd" : "xzy",
    "uuid" : "xzy"
  }, {
    "name" : "黄逸红",
    "passwd" : "hyh",
    "uuid" : "hyh"
  }, {
    "name" : "路博",
    "passwd" : "lb",
    "uuid" : "lb"
  }, {
    "name" : "刘亚飞",
    "passwd" : "lyf",
    "uuid" : "lyf"
  }, {
    "name" : "郭远可",
    "passwd" : "gyk",
    "uuid" : "gyk"
  }, {
    "name" : "高玉洁",
    "passwd" : "gyj",
    "uuid" : "gyj"
  }, {
    "name" : "卢佳怡",
    "passwd" : "ljy",
    "uuid" : "ljy"
  }, {
    "name" : "乐轶昊",
    "passwd" : "lyh",
    "uuid" : "lyh"
  }, {
    "name" : "倪琳",
    "passwd" : "nl",
    "uuid" : "nl"
  }, {
    "name" : "张悦",
    "passwd" : "zy",
    "uuid" : "zy"
  } ]
}
```

## 修改ID和密码

还在测试中暂不开放.

## 上传文件

首先, 得有个组长给你项目.

在Select框中选中你需要提交文件所在的Task.

在Task最下面有Click to upload, 点击并选中文件, 确定上传.

等待Notify区域提示`All file uploaded done.`并自动刷新后便上传成功.

<video src="/images/2017-02-06-z-uploader-usage/upload.mp4" controls="controls">
Your browser does not support the audio tag.
</video>

# 我是组长! I\'m leader!

好, Leader模式的界面和User的一样, 登录后按右上角LOGO, 当变成Yoda的时候, 你就成功进入了Leader模式.

默认进来的页面是这样子的:

![](/images/2017-02-06-z-uploader-usage/master.png)

在Select框中选中NEW, 输入Task的名称和描述, 点击OK, Notify中提示Task created并且页面自动刷新后并表明创建成功.

选中新建的任务, 点击Add new guy, 选中组员, Notify框中出现`Added person into task.`即添加成功.

在Task页面中还有DOWNLOAD和DELET分别是下载整个Task和删除Delete.

<video src="/images/2017-02-06-z-uploader-usage/master.mp4" controls="controls">
Your browser does not support the audio tag.
</video>

好了, 基本用法就是这些, 如果有什么问题和建议请及时联系我, 谢谢:)

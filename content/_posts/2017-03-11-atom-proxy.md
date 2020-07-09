---
layout: post
title: "Atom Editor国内源"
date: "2017-03-11 15:09:31 +0800"
tags: ["Atom Editor"]
image_preview: "/images/2017-03-11-atom-proxy/atom.svg"
---

虽然已经不用Atom了, 但以前一直用的Atom源还是记录一下, 话说淘宝真的什么源都有啊.

``` bash
.apmrc
registry = https://registry.npm.taobao.org/
strict-ssl = false
```

还有HTTP代理设置, 光是设置HTTP_PROXY环境变量apm是不识的:

``` bash
.apmrc
strict-ssl = false
http_proxy = socks5://127.0.0.1:1997
https_proxy = socks5://127.0.0.1:1997
#支持socks
```

不清楚.apmrc在哪的可以直接敲命令:`apm config set strict-ssl false`, `apm config get strict-ssl`可以获取当前设置.


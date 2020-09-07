---
layout: post
title: "Python学习笔记"
date: "2017-09-25 23:23:02 +0800"
tag: ["Python"]
description: "开始认真学习Python啦"
---

暑假开始啦...刚考完没啥特别的事情干, 于是终于开始认真重新来干Python了, 这里记录一些我看的网站/书籍.

# 书籍

[A Byte of Python](https://python.swaroopch.com/)

# 文档

[Python官方文档](https://docs.python.org)

# 网站

[PyZh](http://pyzh.readthedocs.io/en/latest/)
[Python最佳实践指南](http://pythonguidecn.readthedocs.io/zh/latest/)

# 厉害的非官方库

[Beautiful Soup](https://www.crummy.com/software/BeautifulSoup/bs4/doc/): 厉害的HTML解析器, 甚至支持CSS选择器

# 奇技淫巧

## 交互式调试

``` bash
python -i script.py
```

## lambda递归
``` python
lambda x, f=lambda x, f: f(handle(x)): f(x, f)
```
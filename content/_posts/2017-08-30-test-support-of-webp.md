---
layout: post
title: "一段判断浏览器是否支持WebP的js代码"
date: "2017-08-30 12:25:36 +0800"
tag: ["Web"]
description: "讲真为什么大家都不支持WebP..."
---

> 转自[一段判断浏览器是否支持WebP的js代码](http://www.jianshu.com/p/cf60ad18c1c6)
> 原作者: 关爱单身狗成长协会

``` javascript
window.isSupportWebp = false;//是否支持
(function() {
    var img = new Image(); 
    function getResult(event) {
        //如果进入加载且图片宽度为1(通过图片宽度值判断图片是否可以显示)
        window.isSupportWebp = event && event.type === 'load' ? img.width == 1 : false;
    }
    img.onerror = getResult;
    img.onload = getResult;
    img.src = 'data:image/webp;base64,UklGRiQAAABXRUJQVlA4IBgAAAAwAQCdASoBAAEAAwA0JaQAA3AA/vuUAAA='; //一像素图片
})();
```
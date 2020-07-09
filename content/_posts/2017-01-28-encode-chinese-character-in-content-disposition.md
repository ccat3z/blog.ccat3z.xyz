---
layout: post
title: "解决Content-Disposition中的中文字符乱码问题"
date: "2017-01-28 14:26:46 +0800"
tag: ["HTTP"]
image_preview: /images/2017-01-28-encode-chinese-character-in-content-disposition/http.png
---

> 大部分转载[正确处理下载文件时HTTP头的编码问题(Content-Disposition)](https://blog.robotshell.org/2012/deal-with-http-header-encoding-for-file-download/#comments)

最近写Z Uploader的时候有这样一个Case, 下载Task的打包文件, 打算用Apache的common compress折腾完后端的TarOutputStream, 加个Content-Dispositon头交给Jersey完事. 结果上线以后发现下下来的中文名乱码. 开始以为是StringBuilder惹的锅(顺带吐槽一句Openshift的openjdk 8, 至今不知道compress完中文为什么都是??????), 尝试多种修改无果, 本来想用统一的文件名output.tar完事, 想起来可能是我两天学的HTTP不认真... 翻遍Google, 尝试各种解决GBK乱码的方法后那篇参考, 感叹以后要多读读标准...

总所周知, HTTP Header中的Content-Type可以指定内容(body)的编码, 可Header本身的编码又该如何制定? 甚至, Header究竟是否允许non-ASCII编码呢?

RFC中对于Content-Disposition是这样定义的:

```
Content-Disposition: attachment;
                     filename="$encoded_fname";
                     filename*=utf-8''$encoded_fname
```

所谓```$encoded_fname```就是指安装百分号编码方式讲```UTF-8```字符串进行编码.

(另外, 为了兼容IE6, 请保证原始文件名必须包含英文扩展名!)

知道这点, 解决方案就变得非常简单了, 在Java里只要加上```URLEncoder.encode(String)```就行.

__接下来我们来看看为什么要这么做以及为什么能这么做__

首先, 根据```RFC 2616```所定义的HTTP 1.1协议(```RFC 2068```是最早的版本; ```2616```替代了```2068```并被最广泛使用, 而后又被其他```RFC```替代, 后文将会提及), HTTP消息格式其实是基于古老的```ARPA Internet Text Messages```,而```ARPA```消息只能是```ASCII```编码的(```RFC 822 Section 3```). ```RFC 2616 Section 2.2```更是再一次强调, ```TEXT```(```Section 4.2:Header```中的字段值即为```TEXT```)中若要使用其他字符集, 必须使用```RFC 2047```的规则将字符串编码/逃逸-必须要注意的是, 这个规则原本是针对```MIME```(电子邮件)的扩展, 格式与百分号编码有很大不同.

在1999年```RFC 2616```推出之时, ```Content-Dispostion```这个Header尚不是正式HTTP协议的一部分, 只不过是因为被广泛使用而从```MIME```标准中直接借用过来了而已(RFC 2616 Section 19.5.1). 因而几乎没有浏览器去支持```Content-Disposition```的多语言编码特性这样一个"扩展特性的扩展特性". 事实上, ```RFC 2616```中建议的使用```RFC 2047```来进行多语言编码的特性从未被主流浏览器支持过, 所以我们也不用操心上面这个```MIME```方案了...

可是这个问题却的确是现实需要的, 所以浏览器就各自想出了一些办法:

IE支持在```filename```中直接使用百分号编码: ```filename="$encoded_text"(并非MIME编码!)```. 本来按照```RFC 2616```, 引号内的部分如果不是MIME编码, 则应当直接被当作内容, 就算它"看起来像是百分号编码后的字符串"; 可是IE却会"自动"对这样的文件名进行解码-前提是该文件名必须有一个不会被编码的(即ASCII)后缀名!

其他一些浏览器则支持一种更为粗暴的方式: 允许在```filename="TEXT"```中直接使用UTF-8编码的字符串! 这也是直接违反了```RFC 2616```: HTTP头必须是ASCII编码的规定.

这两类浏览器的行为是彼此互不兼容的. 所以你可以判断UA然后对IE使用前一种办法, 其他浏览器使用后一种, 这样便可以达到一般情况下能够just work的效果(Discuz就是这么做的). 不过对于Opera和Safari, 这样做可能不一定有效.

时代在进步, 2010年```RFC 5987```发布,正式规定了HTTP Header中多语言编码的处理方式采用```parameter*=charset'lang'value```的格式, 其中: ```charset```和```lang```不区分大小写.

```lang```是用来标注字段的语言, 以供读屏软件朗诵或根据语言特性进行特殊渲染, 可以留空.

```value```根据RFC 3986 Section 2.1使用百分号编码, 并且规定浏览器至少应该支持ASCII和UTF-8.

当```parameter```和```parameter*```同时出现在HTTP头中时, 浏览器应当使用后者.

其好处是保持了向前兼容性: 一来HTTP头仍然是```ASCII-only```, 二来不支持该标准的旧版浏览器会按照当年```RFC 2616```的规定, 把```parameter*```整体当作一个```field name```, 从而当作一个未知的字段来忽略. 随后, 2011年```RFC 6266```发布, 正式将```Content-Disposition```纳入HTTP标准, 并再次强调了```RFC 5987```中多语言编码的方法, 还给出了一个范例用于解决向后兼容的问题:

```
Content-Disposition: attachment;
                     filename="EURO rates";
                     filename*=utf-8''%e2%82%ac%20rates
```

这个例子里, ```filename```的值是一个同义英语词组-这样符合```RFC 2616```, 普通的字段不应当被编码; 至于使用```UTF-8```只是因为它是标准中强制要求必须支持的. 然而, 如果我们再仔细想想-目前市场上常见的旧版本浏览器多为IE. 如此一来, 我们可以适当变通一下, 将```filename```字段也直接使用百分号编码后的字符串:

```
Content-Disposition: attachment;
                     filename="%e2%82%ac%20rates.txt";
                     filename*=utf-8''%e2%82%ac%20rates.txt
```

对于较新的Firefox, Chrome, Opera, Safari等浏览器, 都支持并会使用新标准规定的```filename*```, 即使它们不会自动解码```filename```也无所谓了; 而对于旧版本的IE浏览器, 它们无法识别```filename*```, 会将其自动忽略并使用旧的```filename```(唯一的小瑕疵是必须要有一个英文后缀名). 这样一来就完美解决了多浏览器的多语言兼容问题, 既不需要UA判断, 也较为符合标准.

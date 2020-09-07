---
layout: post
title: "在Linux上开发微信小程序"
date: "2018-11-18 20:27:24 +0800"
tag: ["Mini Program", "WeChat", "Tencent"]
description: "是一件痛苦的事情"
image: "/images/2018-11-18-develop-wepy-on-linux/wechat.png"
---

向来腾讯的用户产品在Linux上就很难使用, 甚至不放过开发工具. 自从微信推行小程序小游戏等"微信 OS"的产品后, 各种网络应用都急着要推出个小程序. 我作为一个吃瓜群众终于摆脱了巨大无比的国产APP, 嘴里喝着CoCo, 手上用着小程序给女朋友点单, 内心还是挺香的. 但写小程序的时候是真的<span style="font-size: 150%;">一点也开心不起来</span>. 花了一点时间研究了下怎么在Linux安心得写小程序. 这篇文章里主要用的是wepy, 如果用其他框架比如mpvue的也可以做一点参考. 以下是两个方法, 后者需要一台Windows机器.

## 方法1: 部分Wine

细心的同学一定早就发现了, 微信小程序开发者工具用的是基于`NW.js`的框架以及`wcc`和`wcsc`两个小程序自己的编译工具. (然而都全局用了`NW.js`也不考虑下支持下Linux).
这样思路就很明显了: 得益于`wine-binfmt`我们可以不用显示得在命令行里指明`wine`直接运行Windows程序, 因此直接用Linux的`NW.js`再打包一遍就可以了.

这里有一个小问题就是开发工具中的`node-sync-ipc-nwjs`是针对Windows特供的, 要换成`node-sync-ipc`. 

这个方法最早在由cytle在[cytle/wechat_web_devtools](https://github.com/cytle/wechat_web_devtools)打包, 我针对ArchLinux的打包方式简化了一下上传在[AUR wechat-devtools](https://aur.archlinux.org/packages/wechat-devtools/)上.

## 方法2: 远程编辑

<s>
在用方法1更新1.02.1811150的时候发现了一个奇怪的问题, 就是模拟器渲染的时候莫名其妙得找不到文件 (*.wxml not found) 一时找不到原因.
(截至现在(2018/11/18)我注意到cytle解决了这个问题, 有空我去研究一下)
</s>
(是微信开发者工具自己的bug)

于是我又拿出了吃灰的Surface用作build机器. 通常都是在Windows上想办法远程编辑Linux服务器上的文件, 现在我们把方向反过来.

这里主要解决两个问题:

1. Linux向Windows同步文件
2. wepy因为文件写入太慢导致的找不到文件bug [#1755][#1755]

### Linux向Windows同步文件

Windows 10已经内置了OpenSSH. 因此我认为SSH一套的方法是最方便的.
Windows 10上开启OpenSSH Server的方法我就不多废话了. 得注意的一点是`sshd_config`文件在OpenSSH正式版中在`C:\ProgramData\ssh\sshd_config`, 很多网上的文章已过时.

最先想到的是sshfs, 可以直接把Windows的目录挂载在本地, 这样就和平常一样, 也可以配合一些编译器插件或者IDE.

但这有个问题就是加载太慢, ls都要卡一下, 急性子都会很不爽. 想到VS 2019推出了远程协助, 我想VS Code也一定有人想办法做个插件出来. 找了一下果真有不少, 推荐几个好用的:

1. Remote Workspace: 用了VS Code的filesystem接口, 问题是版本控制不认
2. ftp-sync: ftp/sftp自动同步, 只要Windows端开SSH服务器就能用了, 很方便
3. Sync-Rsync

第一个和sshfs是相同的想法, 后两个是自动同步的插件. ftp-sync不需要什么特别配置, 写好就能用. 我就简单说下Syn-Rsync的配置方法. 给出我的配置文件

``` js
{
    "sync-rsync.delete": true,
    "sync-rsync.exclude": [
        ".git",
        ".vscode",
        "node_modules",
        "dist"
    ],
    "sync-rsync.remote": "ccat3z@surfaceZ:/mnt/c/Users/ccat3z/Documents/mp/",
    "sync-rsync.args": ["-e ssh -p 6522"],
    "sync-rsync.onSave": true,
    "sync-rsync.flags": "crzv"
}
```

1. `remote`地址我写的是wsl里的sshd, 所以是`/mnt/c`开头的
2. 我没有用`sync-rsync.shell`而是在`args`里指定了remote shell, 临时解决下插件的问题
3. flags用`crzv`替代默认的, `-c`让rsync根据checksum来比较文件而不是修改时间和文件大小. (否则会导致Windows端的`wepy`整个项目重新编译, 因为`wepy`是根据修改时间来判断或者文件大小判断的)

### [WARNING] 发现空文件 [Error] 打开文件失败

这个问题在`wepy`的[issue #1755][#1755]中也有人提到, 是文件写入不够快导致的, 在主机上是小概率事件, 在远程编辑上就成了完全事件.

看`wepy`的源文件可以发现`wepy`的watch功能是通过`chokidar`实现的, 并且会读取`wepy.config.js`中的`watchOption`传给`chokidar`.
默认`chokidar`会在文件出现的那一刻触发`add` event, 参考[paulmillr/chokidar](https://github.com/paulmillr/chokidar#performance), 我们只要设置`awaitWriteFinish`即可解决问题.

在`wepy.config.js`里加入这个

``` js
watchOption: {
    awaitWriteFinish: true
}
```

[#1755]: https://github.com/Tencent/wepy/issues/1755

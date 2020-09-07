---
layout: post
title: "Rsync自定义ssh端口"
date: "2017-08-30 12:00:17 +0800"
tag: ["Linux"]
description: "没事看看man也是很有帮助的"
---

为了方便在不同设备连接其他设备上的各个虚拟机, 我给不同sshd配置了不同的端口. 但rsync的时候遇到了问题, rsync没给任何选项自定义port啊! 逛了圈后发现解决方法很简单:

```
-e, --rsh=COMMAND           specify the remote shell to use
```

所以只要用`-e "ssh -p $PORT"`就行了, 同理其他remote shell也行... emmmmm
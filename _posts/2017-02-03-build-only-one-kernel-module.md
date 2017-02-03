---
layout: post
title: "Linux Kernel 只编译一个module"
date: "2017-02-03 10:20:06 +0800"
image_preview: "/images/2017-02-03-build-only-one-kernel-module/linux-tux.svg"
---

调试编译Linux Kernel有时会遇到这种情况, 辛辛苦苦编译了大半天却发现忘了个module. 然而Linux可插拔的module设计能够让我们单独编译单个module, 为我们节省了不少时间.

以linux-surfacepro3的cpufreq_stats为例: (linux 4.8之后cpufreq_stats不再以module形式加载)

以内核root目录为work dir

确保work dir下存在`Module.symvers`, 没有的话到`/lib/modules/${KERNEL}/build/Module.symvers`

将kernel config复制到`.config`

准备工作:

``` sh
make prepare
make scripts
```

先找到模块的位置: `drivers/cpufreq`

以及模块的配置参数: `CONFIG_CPU_FREQ_STAT=m`

在kernel根目录下编译: `make CONFIG_CPU_FREQ_STAT=m M=drivers/cpufreq modules`

看make的输出找到生成module的位置并复制到module目录里: `sudo cp drivers/cpufreq/cpufreq_stats.ko /lib/modules/${KERNEL}/kernel/drivers/cpufreq/`

最后再用`insmod`或者`depmod`生效即可

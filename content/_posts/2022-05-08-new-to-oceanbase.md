---
layout: post
title: OceanBase社区版入门指南
data: 2022-05-08 15:47:51 +0800
tag: ["OceanBase"]
...

前一阵子参加了第一届OceanBase数据库大赛,
期间接触了[MiniOB](https://github.com/oceanbase/miniob/)和[OceanBase社区版][OceanBase Github Repo].
本文对我开始学习OceanBase社区版时的经历做一个简单的介绍,
皆在帮助准备学习OceanBase源码的新人快速上手.

# 编译、安装和部署

万事开头难.
所幸OceanBase社区版的构建工具非常"简洁", 一个`build.sh`搞定了大部分操作.
首先是准备环境, OceanBase本身的构建脚本支持[大部分主流Linux发行版](https://github.com/oceanbase/oceanbase/wiki/how_to_build#os-compatibility-list).
但如果你希望在同一个系统上build和run, 还是建议你使用rpm体系的发行版,
因为部署工具obd只支持rpm体系.

## 安装依赖

编译OceanBase前只需要一些常见的工具链即可.
构建脚本会自己下载固定版本gcc和二进制依赖库等,
所以通常不用担心发行版之间的差异.

### Redhat Based

``` bash
yum install git wget rpm* cpio make glibc-devel glibc-headers binutils m4
```

### Debian Based

``` bash
apt-get install git wget rpm rpm2cpio cpio make build-essential binutils m4
```

## 编译OceanBase

``` bash 
./build.sh debug --init --make
```

只有第一次编译需要`--init`, `--init`会在`deps/3rd/`下载编译器和依赖库.

## 部署OceanBase

OceanBase启动参数会根据硬件配置变化,
还是交给[OBD](https://github.com/oceanbase/obdeploy)部署比较方便.
OBD目前只支持CentOS环境, 其他环境可能需要hack一下.
首先准备一个可用的OceanBase集群,
可以参考[快速开始](https://open.oceanbase.com/quickStart).

1. 添加OceanBase源

   ``` bash
   sudo yum install -y yum-utils
   sudo yum-config-manager --add-repo https://mirrors.aliyun.com/oceanbase/OceanBase.repo
   ```

1. 安装`ob-deploy`和`ob-client`

   ``` bash
   sudo yum install -y ob-deploy
   ```

1. 部署一套OceanBase运行环境, 这里使用最简单的单节点配置为例 (需要替换`$OB_DEPLOY_NAME`):

   ``` bash
   cat > deploy.yml <<EOF
   oceanbase-ce:
     version: 3.1.0
     tag: ob-test
     servers:
     - 127.0.0.1
     global:
       home_path: /var/lib/oceanbase
       devname: eth0
       mysql_port: 2881
       rpc_port: 2882
       zone: zone1
       cluster_id: 1
       datafile_size: 10G
   EOF

   obd cluster autodeploy "$OB_DEPLOY_NAME" -c deploy.yml
   ```

1. 查看OceanBase运行状态

   ``` bash
   obd cluster display "$OB_DEPLOY_NAME"
   ```

1. 创建测试租户

   ``` bash
   obd cluster tenant create "$OB_DEPLOY_NAME" --tenant-name test
   obclient -uroot@test -h127.0.0.1 -p2881
   ```

然后使用编译得到的`observer`替换集群使用的`observer`:

1. 找到集群使用的`observer`位置, 可以使用ps找.

   ```
   ps -ef | grep observer
   ```

2. 停止OceanBase集群, 替换`observer`. 如果涉及多个节点, 需要一一替换:

   ``` bash
   obd cluster stop "$OB_DEPLOY_NAME"
   cp ./build_debug/src/observer/observer "$OB_CLUSTER_SERVER_BINARY_PATH"
   ```

3. 最后重启OceanBase集群即可

   ```
   obd cluster restart "$OB_DEPLOY_NAME"
   ```

在比赛中我也写了一些用于远程开发、编译、测试的工具 ([ccat3z/oceanbase-competition-toolset](https://github.com/ccat3z/oceanbase-competition-toolset)),
或许可以提供一些帮助.

# 代码风格

在开始阅读OceanBase源码前, 我建议先看一下[OceanBase 代码风格指南][OceanBase Code Style].
尤其是被现代C++, GoLang, Java, C#等"惯坏"的同学们, 第一次看到大量的`if (OB_FAIL(...)) {} else {}`可能会比较困惑.

OceanBase为避免常见陷阱牺牲了编程复杂度,
强制单入口单出口, 禁止中途使用`return`, `goto`, `throw`等跳转指令.
这样能够让开发人员不容易忘记释放资源.
我们以最简单的顺序语句举例, 如果不限制单出口，可能会这么写 (GoLang玩家有被暗示到):

``` c
int ret = OB_SUCCESS;
ret = do_something1();
if (OB_SUCCESS != ret) {
  free(...);
  log_error(...);
  return ret;
}

ret = do_something2();
if (OB_SUCCESS != ret) {
  free(...);
  log_error(...);
  return ret;
}

// ... 更多代码
```

限制单出口后, 能够防止在中途跳转时忘记释放资源:

``` c
int ret = OB_SUCCESS;
ret = do_something1();
if (OB_SUCCESS != ret) {
  log_error(...);
}

if (OB_SUCCESS == ret) {
ret = do_something2();
if (OB_SUCCESS != ret) {
  log_error(...);
}
}

// ... 更多代码
free(...);
return ret;
```

上述代码仍然非常冗长，当有效代码只有两行。
因此OceanBase增加了一些[常用宏](https://open.oceanbase.com/docs/oceanbase-code-style-guide/oceanbase-code-style-guide/V3.1.0/common-macros)用来精简代码:

``` c
int ret = OB_SUCCESS;

if (OB_FAIL(ret = do_something1())) {
  log_error(...);
} else if (OB_FAIL(ret = do_somthing2())) {
  log_error(...);
} else if (OB_FAIL(...)) {
  // ...
  // ...
  // ...
} else { }
  ret = do_something1();
  if (OB_SUCCESS != ret) {
}

free(...);
return ret;
```

我们可以在OceanBase中看到大量类似的`if else`的结构.
除了顺序语句,
[OceanBase 代码风格指南][OceanBase Code Style]中提到了很多语句的规范,
基本能覆盖大部分场景.
可以从中发现, OceanBase的代码风格确实复杂了一些,
刚开始理解代码会有少许阻力,
因此先快速浏览一遍风格指南能为读代码提供不小帮助.
一定有同学会和RAII, defer, GC等等做比较,
这点还是在你读OceanBase代码的过程中再评价吧.

# 项目结构

首先来到项目的顶层目录, OceanBase社区版项目结构非常容易理解,
下面简单介绍.

* `cmake/`和`build.sh`: 构建相关工具, 我们在第一节中已经用到了.
* `deps/`: 依赖库
* `rpm/`: RPM包打包脚本
* `tools/`: 一些开发和运维工具
* `test/`和`unittest/`: 集成测试和单元测试, 使用方法见[如何运行测试][Test OceanBase]
* `src/`: OceanBase源码
  * `share/`: 公共类
  * `election/`: 集群的选举模块
  * `rootserver/`: 集群的总控服务
  * `archive/`: 日志归档组件, 用于备份恢复
  * `clog/`: OceanBase版redo log
  * `sql/`: SQL模块. SQL解析, 查询优化, 执行器等等
  * `storage/`: 存储引擎
  * `observer/`: OceanBase主进程, 系统入口

# 下一步?

至此已经做好了学习OceanBase源码的全部准备.
下一步可以参考[OceanBase官方教程](https://www.bookstack.cn/read/OceanBase-3.1.1-zh/bc66c60a4672fd61.md), 挑选感兴趣的模块作为切入点.
或者跟随[OceanBase 源码解读][OceanBase 源码解读]系列文章学习.
如果有什么想改进的, 可以查阅[OceanBase 开发者手册][OceanBase Dev Manual], 成为一个Contributor!

# 参考

1. [OceanBase 代码风格指南][OceanBase Code Style]
1. [OceanBase 源码解读][OceanBase 源码解读]
1. [OceanBase 开发者手册][OceanBase Dev Manual]

[OceanBase Code Style]: https://open.oceanbase.com/docs/oceanbase-code-style-guide/oceanbase-code-style-guide/V3.1.0/introduction
[OceanBase 源码解读]: https://www.zhihu.com/column/c_1505545451784400896
[OceanBase Github Repo]: https://github.com/oceanbase/oceanbase
[Test OceanBase]: https://github.com/oceanbase/oceanbase/wiki/how_to_test
[OceanBase Dev Manual]: https://github.com/oceanbase/oceanbase/wiki/how_to_contribute
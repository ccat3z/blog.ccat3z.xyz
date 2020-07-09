---
layout: post
title: "解决Git Cannot update paths and switch to branch"
date: "2017-03-11 15:25:59 +0800"
tag: ["Git"]
image_preview: "/images/2017-03-11-git-fetch-remote-branch-error/git.svg"
---

今天在改写博客自动同步镜像脚本, 从Remote Branch创建本地Branch时CI抛出这样个问题:

`fatal: Cannot update paths and switch to branch 'nome-do-branch' at the same time.`

查了下是因为本地仓库找不到关于remote的信息, 想起来之前我是直接clone的branch可能没有update remote的信息.

可以用`git remote show origin`更新所有远程库信息, 顺便看看有没有获取正确.

CI脚本可以用这条命令:`git remote update`, 效果相同.

接下来就一样了, `git checkout -b BRANCH_NAME remote/BRANCH_NAME`.

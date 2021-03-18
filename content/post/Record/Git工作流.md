---
title: Git工作流
date: 2021-02-29
tags: ["Git"]
categories: ["Record"]
author: "Danic"
---

## Git工作流

参考链接：https://www.jianshu.com/p/41910dc6ef29

为了更好的管理Git分支，按照Git Flow常用分支进行管理

Production分支，也就是我们常用的master分支，只用来版本发布后，打tag，记录每个版本。

Develop分支，主开发分支，主要合并其他分支的代码，比如Feature分支。

Feature分支，这个分支主要用来开发新功能，一旦开发完成，就合并到Develop分支。

Release分支，如果需要发版本，就开一个Release分支进行打包测试。完成后，合并到Production和Develop分支。

Hotfix分支，如果Production分支发现了bug，就开这个分支进行测试修复，完成后合并到Production和Develop分支。



如果项目有依赖框架分支，除了遵循Git Flow之外，每次项目打包，都需要在Production上打个与项目对应的版本tag。
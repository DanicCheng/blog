---
title: UnityShaderGraph
date: 2021-04-11T19:41:04+04:00
lastmod: 2021-04-11T19:41:04+04:00
tags: 
- ShaderGraph
categories: 
- Unity
---

## 源码地址

https://gitee.com/foryun/UnityShaderGraph.git



## 博客

http://www.foryun.com.cn/post/unityshadergraph/unityshadergraph/



## 环境配置

- 安装Package
  - 在菜单栏Window-->Package Manager打开Packages窗口。
  - 需要安装ShaderGraph和Universal RP包(2019.3之前叫Lightweight RP)

- 创建设置SRP（可编程渲染管线）
  - 菜单栏Assets --> Create --> Rendering-->Universal Pipeline Asset-->Pipeline Asset，会创建出来一个文件，这是渲染管线的配置文件。
  - 在菜单栏 Edit--> Project Settings-->Graphics中顶部Scriptable Render Pipeline Settings设置刚才的SRP文件
- 创建ShaderGraph文件
  - 通过菜单栏Assets-->Create-->Shader--> *** Graph 可以创建ShaderGraph文件，会在Project创建一个graph文件。


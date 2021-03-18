---
title: "GameFramework"
date: 2021-03-14T11:50:46+04:00
lastmod: 2021-03-14T11:56:46+04:00
draft: false
tags: ["UnityGameFramework"]
categories: ["UnityGameFramework"]
author: "Danic"
---

## Base

> GameFramework/Base

- GameFrameworkEntry
  - 这是个静态类，是游戏框架的入口。
  - Update、Shutdown方法，让游戏框架的模块拥有轮询和关闭方法。
  - 获取模块，在GameFramework里面框架的组成单元叫模块，在UnityGameFramework里面的组成单元叫组件。模块跟Unity没有关系，组件跟Unity有直接关系。
  - 如果获取组件失败，则创建，`Activator.CreateInstance(moduleType)`
- GameFrameworkAction
  - 这个脚本定义了框架用到的不带返回值委托，最多支持16个参数。
- GameFrameworkEventArgs
  - 框架事件参数类
- GameFrameworkException
  - 框架异常处理类
- GameFrameworkFunc
  - 这个脚本定义了框架用到的带返回值的委托，最多支持16个参数。
- GameFrameworkLinkedList
  - 针对LinkedList的封装，增加了缓存队列，减少GC次数，重复利用节点。
- GameFrameworkLinkedListRange
  - 针对LinkedList的封装，设置了链表的起点和终点，只能在起点和终点这个范围内取值。
- GameFrameworkModule
  - 模块的抽象基类，定义了轮询的优先级，轮询方法，关闭清理方法。


---
title: "GameFramework"
date: 2021-03-14T11:50:46+04:00
lastmod: 2021-03-20T10:10:56+04:00
tags: UnityGameFramework
categories: UnityGameFramework
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
- GameFrameworkMultiDictionary
  - 把字典的值，改成了链表
- GameFrameworkSerializer
  - 序列化，反序列化，取值

> GameFramework/Base/DataProvider

- DataProvider
  - 数据提供者，提供了数据读取成功、失败、依赖读取、更新回调，提供读取资源、读取二进制数据回调，数据的持有者，资源管理器（主要用来加载资源），辅助器（主要用来解析资源）
- DataProviderCreator
  - 数据提供者创建器，创建数据提供者，并且提供数据缓存区的操作。
- IDataProvider
  - 数据提供者接口
- IDataProviderHelper
  - 辅助器接口
- ReadDataDependencyAssetEventArgs、ReadDataFailureEventArgs、ReadDataSuccessEventArgs、ReadDataUpdateEventArgs
  - 对应事件回调的参数。

> GameFramework/Base/DataStruct

- TypeNamePair
  - 类型和名称的组合值，用来做各种字典的key

> GameFramework/Base/EventPool

- BaseEventArgs
  - 事件参数基类
- EventPool
  - 事件池，提供了事件的订阅，反订阅，触发（抛出事件，这个操作是线程安全的，即使不在主线程中抛出，也可保证在主线程中回调事件处理函数，但事件会在抛出后的下一帧分发。），立即触发（抛出事件立即模式，这个操作不是线程安全的，事件会立刻分发。）
- EventPoolMode
  - 事件池模式。
    - 默认事件池模式，即必须存在有且只有一个事件处理函数。
    - 允许不存在事件处理函数。
    - 允许存在多个事件处理函数。
    - 允许存在重复的事件处理函数。

> GameFramework/Base/Log

- GameFrameworkLog
  - 常规的日志类，具体的日志实现，由辅助器负责。
- GameFrameworkLogLevel
  - 游戏框架日志等级。
    - 调试
    - 信息
    - 警告
    - 错误
    - 严重错误

> GameFramework/Base/ReferencePool

- ReferencePool
  - 引用池。这里有几个概念：
    - UnusedReferenceCount，没有使用的引用数，这里是指引用队列里面还有多少个引用。
    - UsingReferenceCount，使用引用数，是指这个引用正在使用的次数，Acquire的时候加1，Release的时候减1.
    - AcquireReferenceCount，获取引用数，是指调用Acquire多少次，也就是这个引用被获取的多少次。
    - ReleaseReferenceCount，释放引用数，是指调用Release多少次，也就是这个引用被释放了多少次。
    - AddReferenceCount，添加引用数，是指调用Add多少次，也就是这个引用被增加了几次，增加是只加不用。
    - RemoveReferenceCount，移除引用数，是只调用Remove多少次，也就是这个引用被移除了几次，移除是只移除不释放。
- ReferencePoolInfo
  - 引用池信息。在调用GetAllReferencePoolInfos，返回引用信息的时候使用。

## Event

> GameFramework/Event

- EventManager
  - 事件管理器，核心就是调用了事件池，作为游戏框架模块，多了一个优先级。
- GameEventArgs
  - 游戏事件基类
- IEventManager
  - 事件管理器接口

## Helper

框架中有很多辅助器Helper，一般都定义了一系列接口，用于处理容易变化的逻辑。比如资源加载完成后的逻辑处理。框架把资源的二进制数据加载出来后，就交给辅助器进行解析，这样，客户端就可以根据自己的需求，实现资源的解析方式。


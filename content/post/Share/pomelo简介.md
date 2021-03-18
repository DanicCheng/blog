---
title: pomelo
date: 2021-3-12
tags: ["pomelo"]
categories: ["Share"]
author: "Danic"
---

## pomelo构成

pomelo是由一个核心框架及一系列松耦合的模块构成，包括：

- 框架（Framework）
  - 网络框架是pomelo最核心的部分
- 库（Libraries）
  - pomelo提供了很多的库。其中有些是和游戏逻辑相关的，如：AI、AOI、路径查找等；也有一些通用功能库，如：定时任务、数据同步等。
- 工具（Tools）
  - pomelo提供了很多工具，包括服务器管理&控制工具、命令行工具（如：pomelo list、pomelo kill、pomelo stop）、压力测试工具等。
- 客户端SDK（Client SDKs）
  - pomelo为大多数平台提供了客户端SDK，包括：JavaScript、C、C#、Android、IOS、以及Unity3D。pomelo的通讯协议是开放且可自定义的，开发者可以轻易的定义他们自己的通讯协议，这样pomelo就可以扩展支持所有客户端。
- Demo
  - pomelo官方提供了几个Demo，开发者可以通过这些事例了解pomelo的运行机制，并可以快速上手使用：
    - [Chat of Pomelo](https://github.com/NetEase/chatofpomelo)：一个聊天室示例，可以运行于大多数平台。示例中包含了`channel`、多`connector`服务端等 Pomelo 特性的演示
    - [Treasures](https://github.com/NetEase/treasures)：一个简单的游戏示例及HTML5客户端
    - [Lord of Pomelo](http://pomelo.netease.com/lordofpomelo/)：基于HTML5的一个完整的 MMO 游戏示例

## 术语

pomelo制定了灵活的服务器扩展机制，在pomelo中包含Master、Connector、Gate、Application四类服务器。

- Master（主服务器）

  - 主服务器负责加载配置文件，通过配置文件服务器启动集群，并对所有服务器进行管理。

- Gate

  - 大多数情况下，Gate服务器不参与RPC调用。在pomelo服务器配置项中，Gate服务器仅需要一个客户端口配置（即clientPort），其作用中是提供前端负载均衡。
  - 理想情况下，Gate服务器会是客户端的第一个连接点，连接后Gate服务器给客户端Connector服务器。Gate服务器实现负载均衡时，会通过客户端的标识值（Key、ID等）做Hash运算，然后得到客户端所需要连接的Connector服务器。

- Connector（连接服务器）

  - Connector负责接收连接请求，创建客户端连接，维护客户端的Session信息，接收客户端请求、并根据路由配置策略将请求定向到具体的后端业务服务器。
  - 后端服务器处理完成后或需要向客户端推送消息时，Connector服务器还需要作为一个中间角色向客户端发送消息。
  - Connector服务器会同时拥有前端端口（clientPort）和后端端口（port）。其中，客户端端口用于监听客户端连接，而后端端口用于和向其他后端服务器的通讯。

- Application（应用逻辑服务器）

  - Gate服务器和Connector服务器称为“前端服务器”，而应用服务器被称为后端服务器，其用于实现应用逻辑并向客户端提供应用逻辑服务。Application服务器的客户端请求来源于前端服务器，两者之间交互通过RPC调用实现。理论上讲，后端服务器不会与前端服务器直接通讯，因此只需要定义一个用于提供服务器的后端端口即可。

- RPC调用

  - pomelo通过RPC调用实现进程间的通讯。这些内部RPC调用有以下三种方式：
    - 前端服务器的客户端请求转发到后端服务器
    - 后端服务器讲session信息推送到请求信息的前端服务器
    - 后端服务器通过channel向前端服务器推送信息
  - 以上三类RPC调用属于系统RPC，除RPC调用外，用户还可以自定义RPC调用。自定义时，需要用户编写RPC服务器的remote及handler代码。

- Route、Router

  - route是服务端点的唯一标识符，标识客户端向服务器推送信息，或客户端接收来自服务器数据的路径。
  - 对于服务端来说，通常遵守以.分割的命名方式，如：chat.chatHandler.send，其中：chat表示接收信息的服务器，chatHandler是服务器中定义的一个处理器（Handler），而send表示处理器中的一个处理方法。
  - 对于客户端来说，通常使用on[ExpectedEventName]命名方式，如：onChat。客户端可以为路由指定一个处理函数，当服务器推送消息时，客户端会收到回调。
  - 一般来说，运行应用的服务器会同时有多个，当用户端请求达到前端服务器后，会分发到一个具体的后端服务器，这种分发需要一个路由函数router。router会根据用户session及其请求的内容做一些运算，并将其映到一台具体的服务器ID。
  - 可以通过应用的route来电泳配置给某累服务器配置的router，如果不配置时，pomelo会使用默认的router。默认router是使用session中的uid做crc32校验，然后使用检验码作为key，再跟同类型应用服务器数取余，即可得到路由要使用的服务器编号。这样也会有问题，当session没有绑定uid时，这是uid字段会是undefined，这回造成所有的请求都路由到同一服务器。所以在实际开发中，还是需要自己来配置router的。

- Session

  - pomelo中有三种session，还有两种session服务。三种session分别是：Session、FrontendSession、BackendSession。两种Session服务器是：SessionService、BackendSessionService。这点是令人疑惑的，简单介绍如下。

  - **`Session`**

    `Session`是对一个客户端连接的抽象，其字段类似如下：

    ```javascript
    {
      id : <session id> // readonly
      frontendId : <frontend server id> // readonly
      uid : <bound uid> // readonly
      settings : <key-value map> // read and write  
      __socket__ : <raw_socket>
      __state__ : <session state>
    
      // ...
    }
    ```

    - `id`：这个 session 的`id`，全局唯一，一般使用自增的方式生成
    - `frontendId`：这个 session 所对应的前端服务器的`id`
    - `uid`：这个 session 所绑定的用户的 `id`
    - `settings`：一个`key-value` map，用于保存一些 session 的自定义属性。如，聊天室中的房间号就可以做为一个 session 的自定义属笥
    - `__socket__`：对原生 `socket`的引用
    - `__state__`：用于指明 session 的当前状态

    从以上可以看出，session 一旦建立，其`id`、`frontendId`、`uid`、`__socket__`、`__state__`字段就都是确定的，且是只读的。而`settings`也不应该被随意的修改。

    也因此，在前端服务器中引入了`FrontendSession`，它可以被看做是真实 session 在前端服务器中的一个副本。

    **`FrontendSession`与`SessionService`**

    `FrontendSession`字段结构大致如下：

    ```javascript
    {
      id : <session id> // readonly
      frontendId : <frontend server id> // readonly
      uid : <bound uid> // readonly
      settings : <key-value map> // read and write  
    }
    ```

    `FrontendSession`功能如下：

    - `settings`字段可以通过`FrontendSession`来设置，而且其值可以通过调用`push`方法同步到原实 `Session` 中。
    - 通过调用`FrontendSession`的`bind`方法，可以将`uid`绑定到`Session`。
    - `Session`中的只读字段也可以通过`FrontendSession`，但是对`FrontendSession`中与`Session`相同字段进行修改时，并不会反应到原始`Session`。

    `SessionService`用于维护所有原始`Session`，包括：只读字段、绑定`uid`及用户自定义字段。

    **`BackendSession`与`BackendSessionService`**

    `BackendSession`与`FrontendSession`类似，其字段也与`FrontendSession`基本一致，不同的是其用于后端服务器。

    `BackendSession`是由`BackendSessionService`创建和维护的。在后端服务器收到请求后，`BackendSessionService`会根据前端服务器的`rpc`参数创建`BackendSession`。

    同样的，对`BackendSession`的中字段的修改也不会反应到原始`Session`中。与`FrontendSession`一样，`BackendSession`中也有`bind`、`unbind`、`push`方法，用于绑定/解绑`uid`或修改`settings`中的字段值等。不同的是`BackendSession`实际上是以`sys`命名空间发起的远程调用。

- Channel

  - Channel可以看做是玩家的容器，主要用于需要频繁广播推送消息的场景。当向一个Channel推送消息时，加入到这个Channel中的所有玩家都会收到广播的消息。玩家可以加入到多个Channel中，然后就可以收到所有加入的Channel的广播消息。
  - 需要注意的是，Channel是服务器-本地模式，这意味着应用服务器A与B不会共享Channel信息，也就不能收到其他服务器所发送的消息。

- 消息类型：Request、Response、Notify、Push

  - pomelo与客户通过消息进行交互，pomelo中有4种消息类型，分别是：Request、Response、Notify、Push。
    - request-response交互：客户端发起Request到服务端，服务端处理完成后，会给其返回Response。
    - notify交互：Notify同样是客户端向服务器发送消息，但不需要服务器的回复。
    - Push交互：Push是服务端主动发送给客户端的消息，客户端可以通过监听制定的路由实现服务端主动推送消息的接收。

- Filter

  - pomelo中的Filter（筛选器）分为两类：before filter和after filter。Before filter会对请求做一些前置处理，如：检查玩家是否已登录、统计记录等。而after filter会对请求做一些后置处理，如：释放请求上下文的资源、记录请求耗时信息等。在after filter中不应该在对响应内容做修改，因为在进入after filter之前响应就发送给客户端。
  - 每类filter都可以注册多个，从而形成一个filter链，所有请求都会经过每个filter的统一处理。

- Handler

  - Handler（处理器）是实现业务逻辑的地方，在请求处理链中Handler位于before filter和after filter之间。其定义形式类似如下：

  ```javascript
    handler.methodName = function(msg, session, next) {
      // ...
    }
  ```

    `Handler`参数与`before filter`类似。`Handler`处理完成后，如果需要向客户返回响应信息，可以将响应内容包装成JavaScript对象，并通过`next`传递给后面的流程。

- Component

  Pomelo 框架是由若干松散耦合的组件（`Component`）构成的，而每个组件会分别完成一些功能，事实上 Pomelo 的核心功能都是由组件完成的。Pomelo 框架可以看做是组件的容器，会完成组件的加载及组件生命周期的管理。每个组件都定义了`start`、`afterStart`、`stop`等回调函数，用于完成组件生命周期的管理。
  
- Plugin

  - `Plugin`（插件）是另一种扩展机制，它自 Pomelo 0.6 版本中引入。`Plugin`由多个`Component`及一些事件处理器（用于处理框架发送的事件）组成。`Plugin`为 Pomelo 提供了一种更加灵活的扩展机制，它不仅提供了组件相关功能，还可以对框架的全局事件做出响应。

- Admin client、Monitor、Master

  - 在pomelo的管理框架中，服务器会有三种角色：Admin client、Monitor、Master。各功能如下：
    - Master-Master负责收集服务器集群信息，对服务器集群进行管理等。Master还会接收Admin client的请求，并按请求命令执行相应的操作，如：查询服务器状态、向集群中增加服务器等。
    - Monitor-Monitor运行于各个服务器当中，它会向Master进行注册，并将服务器状态上报给Master。炳辉根据Master发来的消息，对服务器进行更新。
    - Admin client-是一个第三方管理客户端。它会连接并注册到Master，它可以查询服务器集群信息、或向Master发送命令实现对集群的管理。

- Admin module

  - 在 Pomelo 中`module`特指服务器的监控管理模块，它类似于`Component`，但它实现的是监控相关逻辑，如进程状态收集等。

    用户使用`Admin module`用于服务器进行管理时，可以通过`application`的`registerAdmin`注册管理模块。每个管理模式都会定义以下四种回调函数，每种回调都是可选的：

    - `masterHandler(agent, msg, cb)` - 当收到`Monitor`的`request/notify`数据时，Master会进行回调，并完成应用服务器的消息处理。
    - `monitorHandler(agent, msg, cb)` - 当收到`Master`的`request/notify`数据时，`Monitor`会进行回调，并完成相应数据处理
    - `clientHandler(agent, msg, cb),` - 当收到第三方客户端的`request/notify`数据时，`Monitor`会进行回调
    - `start(cb)` - 当`Admin module`注册完成后，会由框架进行回调，以完成一些初始化工作

## Pomelo 特点及定位

- 为什么选择 Pomelo

  - 高并发、实时游戏服务器的开发是一项非常复杂的工作。一套好的开发框架可以大大减少游戏开发的复杂性、提高开发效率。而 Pomelo 就一款非常好的开源、高性能、高并发游戏服务器解决方案，它具有以下特点：
  
    - 可伸缩性架构
    
      Pomelo 采用单线程多进程架构，每个服务器本身都是一个Node进程。通过修改配置文件，可以很轻松的向现有服务器集群中添加或删除服务器，而不需要对源码做任何修改。
    
    - 易用
    
      Pomelo 基于Node.js开发，其开发模式类似于 Web 开发（如，[Express](https://itbilu.com/nodejs/npm/EJUJrGVsg.html)）。Pomelo 遵从`'convention over configuration'`的原则，几乎零配置就可以得到一个基本的可运行应用。
    
    - 弱耦合及可扩展
    
      基于Node.js的微模块原则，Pomelo 本身只有很少的代码，所有的`Componet`、`库`、`工具`都可以通过`npm`模块的形式扩展进来。所有第三方都可以开发自己的模块，并整合到 Pomelo 中。
    
    - 完成的文档及Demo
    
      在[Pomelo Wiki](https://github.com/NetEase/pomelo/wiki)中提供了完整的中英文档。除简单Demo外，还提供了一个完整的MMO游戏[Lordofpomelo](http://pomelo.netease.com/lordofpomelo/)（[源码](https://github.com/NetEase/lordofpomelo)），以供开发者借鉴和参考。
  
- Pomelo 定位

  - Pomelo 是一个轻量级的服务器端游戏应用框架，其非常适用于如：实时游戏、社交游戏、移动游戏等。但不推荐将 Pomelo 用于开发大型MMORPG游戏服务器，尤其是大型3D游戏。


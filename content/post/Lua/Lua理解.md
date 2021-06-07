---
title: "Lua理解"
date: 2021-04-07T10:52:06+04:00
lastmod: 2021-04-07T10:52:06+04:00
tags: Lua
categories: Lua
---

## Lua查找键

从lua表中查找一个键时的流程：

假设有个lua对象a，查找a中有没有talk方法

a中有没有talk这个键？有--->返回talk

--->没有，是否设置过metatable？没有--->返回nil

--->有，metatable是否有__index这个键？没有--->返回nil

--->有，a中的metatable中的__index这个键对应的表中有没有talk这个键？没有--->返回nil

--->有，返回getmetatable(a)__index.talk

这里有几个点，需要注意：

- Lua查找的是metatable里面的__index不是table里面的。
  - 所以直接设置a.__index=super不能实现继承



## module,require,package

- require的第一步是去package.loaded这个table里面检查是否已经加载
  - 如果已经加载
    - 则返回对应的值。
  - 如果module没有加载
    - require会在package.path中根据Lua文件里面的module名字查找。
      - 如果找到
        - 则调用loadfile进行加载
      - 如果没找到，则在package.cpath中根据名字查找C语言的库文件。
        - 如果找到
          - 则调用底层函数package.loadlib，返回一个名为luaopen_modname的C语言函数作为Lua的函数
- 无论模块是否找到，require都会得到一个与之对应的加载器。
- require的返回值将会保存在package.loaded这个table中，未来再调用同一个模块，就直接返回。
- 如果希望require同一个模块两次，可以将模块从package.loaded中擦除。package.loaded.modname = nil


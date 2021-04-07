---
title: "Lua理解"
date: 2021-04-07T10:52:06+04:00
lastmod: 2021-04-07T10:52:06+04:00
draft: false
tags: ["Lua"]
categories: ["Share"]
author: "Danic"
---

## Lua理解

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
---
title: "C#?、?? 问号和2个问号的用法"
date: 2021-03-20T10:36:30+04:00
lastmod: 2021-03-20T10:36:30+04:00
draft: false
tags: ["c#","?"]
categories: ["CSharp"]
author: "Danic"
---

## ?:单问号 

1.定义数据类型可为空。可用于对int,double,bool等无法直接赋值为null的数据类型进行null的赋值

如这样定义2个变量：

```c#
  int i; //默认值0
  int? ii; //默认值null
```


2.用于判断对象是否为空，如果对象为空，则无论该对象调用什么皆不会抛出异常，直接返回null（C#6.0）

## ??:双问号 

可用于判断一个变量在为null时返回一个指定的值


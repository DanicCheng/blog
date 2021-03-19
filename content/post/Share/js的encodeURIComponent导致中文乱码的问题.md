---
title: "js的encodeURIComponent导致中文乱码的问题"
date: 2021-03-18T10:22:59+04:00
lastmod: 2021-03-18T10:22:59+04:00
draft: false
tags: ["encodeURIComponent","js","中文乱码"]
categories: ["Share"]
author: "Danic"
---

## 问题描述

- 服务端用的pomelo，对json进行了encodeURIComponent处理，客户端用的C#，进行decode操作后，中文乱码，找了很多方法，都没有解决。目前认为是encodeURIComponent对其他语言不友好，估计是其他语言的解析方式不一样，encodeURIComponent后，所有字符都会增加%25，中文解析的时候，%25被当做中文字符处理了。所以中文全是乱码。

## 解决方案

- 目前没有更好的解决方案，服务端直接去掉encodeURIComponent这层逻辑。
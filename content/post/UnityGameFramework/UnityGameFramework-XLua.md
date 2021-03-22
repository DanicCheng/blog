---
title: "UnityGameFramework-XLua"
date: 2021-03-22T14:33:13+04:00
lastmod: 2021-03-22T14:33:13+04:00
draft: false
tags: ["UnityGameFramework","XLua","Rider"]
categories: ["UnityGameFramework"]
author: "Danic"
---

## Rider环境搭建

- Rider在插件里安装EmmyLua

<img src="UnityGameFramework-XLua_1.png" alt="UnityGameFramework-XLua_1"  />

- 这时，Rider已经支持Lua语法高亮、调试等功能了。由于Unity默认默认不支持Lua后缀，为了省事，我们把.lua文件增加.txt后缀，但是这样，Rider就不能识别lua脚本了。所以这里需要让Rider把.txt也当做lua处理。在Rider-->Preferences-->Editor-->File Types-->Lua language file-->File name patterns增加*.txt

![UnityGameFramework-XLua_2](UnityGameFramework-XLua_2.png)


---
title: 使用NavicatPremium操作Mongodb
date: 2020-10-11
tags: ["NavicatPremium","Mongodb"]
categories: ["Share"]
Author: "Danic"
---

## 下载安装NavicatPremium

> 链接:https://pan.baidu.com/s/1xyRaP_vp1ahP1PU79zf43w 提取码:cgco

从上面的链接下载好NavicatPremium，并根据说明自行安装。

> 如果遇到提示已损坏，需要打开mac安装任何源的权限，在终端输入如下：
>
> ```shell
> sudo spctl --master-disable
> ```
>
> 输入密码后，就打开了任何源权限。
>
> 然后重新安装NavicatPremium即可打开

## 连接Mongodb

打开NavicatPremium，点击左上角的连接，选中MongoDB，如下图：

<img src="http://www.foryun.com.cn/1Image/blog/pic-%e4%bd%bf%e7%94%a8NavicatPremium%e6%93%8d%e4%bd%9cMongodb/1.png" alt="1" style="zoom:50%;" />

在新建连接中，填写连接名，主机(MongoDB所在服务器地址)，端口号，验证(选中Password)，验证数据库(填写数据库名)，用户名，密码，然后点保存，如下图：

<img src="http://www.foryun.com.cn/1Image/blog/pic-%e4%bd%bf%e7%94%a8NavicatPremium%e6%93%8d%e4%bd%9cMongodb/2.png" alt="2" style="zoom:50%;" />

保存后，在左边即可看到创建的连接，双击即可打开连接，连接成功即可操作数据库。
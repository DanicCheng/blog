---
title: "Jenkins"
date: 2021-03-22T15:39:04+04:00
tags: 
 - jenkins
categories: 记录
---

## 后台启动

- `nohup java -jar jenkins.war --httpPort=8080 &`
- 注意点
  - 启动的路径必须是jenkins.war所在的文件目录。
  - nohup命令的输出的文件是nohup.out，详细说明见nohup --help。
  - 查看进程
  - `ps -ef | grep jenkins`


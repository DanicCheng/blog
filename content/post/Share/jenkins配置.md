---
title: jenkins Mac配置
date: 2020-12-15
tags: jenkins
categories: Share
author: "Danic"
---

编写docker-compose.yml

```dockerfile
version: '3.1'
services:
  jenkins:
    image: jenkins/jenkins:lts
    volumes:
      # mac配置
      - /Users/danic/docker-home/jenkins/:/var/jenkins_home
      # centos8配置
      # - /home/test/docker-home/jenkins/:/var/jenkins_home
    ports:
      - "8080:8080"
      - "50000:50000"
    expose:
      - "8080"
      - "50000"
    privileged: true
    user: root
    restart: always
    container_name: jenkins
```

执行docker命令

```shell
docker-compose up -d
```

安装完毕后，在浏览器中输入127.0.0.1:8080，会提示输入密码，查看密码的命令

```shell
docker exec jenkins cat /var/jenkins_home/secrets/initialAdminPassword
```

输入命令后，开始配置流程

下载插件如果经常失败，可以修改站点

```shell
http://mirror.xmission.com/jenkins/updates/update-center.json   # 推荐http://mirrors.shu.edu.cn/jenkins/updates/current/update-center.json
https://mirrors.tuna.tsinghua.edu.cn/jenkins/updates/update-center.json
```


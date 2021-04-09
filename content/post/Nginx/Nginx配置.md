---
title: Nginx配置
date: 2021-04-09T20:02:00+04:00
lastmod: 2021-04-09T20:02:00+04:00
draft: false
tags: ["Nginx"]
categories: ["Share"]
author: "Danic"
---

- 创建docker-compose.yml

- ```yaml
  version: '3'
  
  services:
    apache:
      image: nginx:latest
      container_name: nginx
      ports:
       - "80:80"
      volumes:
       - /root/docker-home/nginx/html:/usr/share/nginx/html
  
  ```

- 创建好目录/root/docker-home/nginx/html

- 在上面的目录下执行命令：

- ```shell
  docker-compose up -d
  ```

  


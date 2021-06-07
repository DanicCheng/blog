---
title: "Halo博客"
date: 2021-05-15T10:52:06+08:00
lastmod: 2021-05-15T10:52:06+08:00
tags: Halo
categories: Halo
---

## 环境准备

- 阿里云

- Centos7.6 64位
- 配置安全组-->入方向-->打开80和443端口

## 安装Nginx

- 配置 EPEL源

  ```shell
  sudo yum install -y epel-release
  sudo yum -y update
  ```

- 安装Nginx

  ```shell
  sudo yum install -y nginx
  ```

  - 安装成功后，默认的网站目录为： /usr/share/nginx/html

  - 默认的配置文件为：/etc/nginx/nginx.conf

  - 自定义配置文件目录为: /etc/nginx/conf.d/

- 开启端口80和443

  - 如果你的服务器打开了防火墙，你需要运行下面的命令，打开80和443端口。

    ```shell
    sudo firewall-cmd --permanent --zone=public --add-service=http
    sudo firewall-cmd --permanent --zone=public --add-service=https
    sudo firewall-cmd --reload
    ```

- 操作Nginx

  - 启动 Nginx

    ```shell
    systemctl start nginx
    ```

  - 停止Nginx

    ```shell
    systemctl stop nginx
    ```

  - 重启Nginx

    ```shell
    systemctl restart nginx
    ```

  - 查看Nginx状态

    ```shell
    systemctl status nginx
    ```

  - 启用开机启动Nginx

    ```shell
    systemctl enable nginx
    ```

  - 禁用开机启动Nginx

    ```shell
    systemctl disable nginx
    ```

- 配置反向代理

  ```shell
  vim /etc/nginx/nginx.conf
  ```

  找到http，在里面找到server，在同级新建一个server，如下编辑，并保存

  ```shell
  server {
    listen 80;
    listen [::]:80;
    server_name www.foryun.com.cn;
    client_max_body_size 1024m;
    location / {
      proxy_pass http://127.0.0.1:8090;
      proxy_set_header HOST $host;
      proxy_set_header X-Forwarded-Proto $scheme;
      proxy_set_header X-Real-IP $remote_addr;
      proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
  }
  ```

  上面的配置是将域名www.foryun.com.cn跳转到127.0.0.1:8090

  重启nginx

  ```shell
  systemctl restart nginx
  ```

## 安装Docker

```shell
sudo yum install -y yum-utils
```

```shell
sudo yum-config-manager \
    --add-repo \
    https://download.docker.com/linux/centos/docker-ce.repo
```

```shell
sudo yum-config-manager --enable docker-ce-nightly
```

```shell
sudo yum-config-manager --enable docker-ce-test
```

```shell
sudo yum-config-manager --disable docker-ce-nightly
```

```shell
sudo yum install docker-ce docker-ce-cli containerd.io
```

```shell
sudo systemctl start docker
```

## 用Docker安装Halo

- 创建工作目录

  ```shell
  mkdir ~/.halo && cd ~/.halo
  ```

- 下载示例配置文件到工作目录

  ```shell
  wget https://dl.halo.run/config/application-template.yaml -O ./application.yaml
  ```

- 编辑配置文件，配置数据库或者端口等，如需配置请参考参考配置

  ```shell
  vim application.yaml
  ```

- 拉取最新的 Halo 镜像

  ```shell
  docker pull halohub/halo
  ```

- 创建容器

  ```shell
  docker run -it -d --name halo -p 8090:8090 -v ~/.halo:/root/.halo --restart=always halohub/halo
  ```

  - **-it：** 开启输入功能并连接伪终端
  - **-d：** 后台运行容器
  - **–name：** 为容器指定一个名称
  - **-p：** 端口映射，格式为 `主机(宿主)端口:容器端口` ，可在 `application.yaml` 配置。
  - **-v：** 工作目录映射。形式为：-v 宿主机路径:/root/.halo，后者不能修改。
  - **–restart：** 建议设置为 `always`，在 Docker 启动的时候自动启动 Halo 容器。

- 使用之前Nginx反向代理的域名访问，www.foryun.com.cn，即可看到安装引导界面。


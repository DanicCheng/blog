---
title: docker使用分享
date: 2020-09-25
tags:docker
categories:docker
---

### 0.背景

#### 一、环境配置的难题

软件开发最大的麻烦事之一，就是环境配置。用户计算机的环境都不相同，你怎么知道自家的软件，能在那些机器跑起来？

用户必须保证两件事：操作系统的设置，各种库和组件的安装。只有它们都正确，软件才能运行。举例来说，安装一个 Python 应用，计算机必须有 Python 引擎，还必须有各种依赖，可能还要配置环境变量。

如果某些老旧的模块与当前环境不兼容，那就麻烦了。开发者常常会说："它在我的机器可以跑了"（It works on my machine），言下之意就是，其他机器很可能跑不了。

环境配置如此麻烦，换一台机器，就要重来一次，旷日费时。很多人想到，能不能从根本上解决问题，软件可以带环境安装？也就是说，安装的时候，把原始环境一模一样地复制过来。

#### 二、虚拟机

虚拟机（virtual machine）就是带环境安装的一种解决方案。它可以在一种操作系统里面运行另一种操作系统，比如在 Windows 系统里面运行 Linux 系统。应用程序对此毫无感知，因为虚拟机看上去跟真实系统一模一样，而对于底层系统来说，虚拟机就是一个普通文件，不需要了就删掉，对其他部分毫无影响。

虽然用户可以通过虚拟机还原软件的原始环境。但是，这个方案有几个缺点。

**（1）资源占用多**

虚拟机会独占一部分内存和硬盘空间。它运行的时候，其他程序就不能使用这些资源了。哪怕虚拟机里面的应用程序，真正使用的内存只有 1MB，虚拟机依然需要几百 MB 的内存才能运行。

**（2）冗余步骤多**

虚拟机是完整的操作系统，一些系统级别的操作步骤，往往无法跳过，比如用户登录。

**（3）启动慢**

启动操作系统需要多久，启动虚拟机就需要多久。可能要等几分钟，应用程序才能真正运行。

#### 三、Linux 容器

由于虚拟机存在这些缺点，Linux 发展出了另一种虚拟化技术：Linux 容器（Linux Containers，缩写为 LXC）。

**Linux 容器不是模拟一个完整的操作系统，而是对进程进行隔离。**或者说，在正常进程的外面套了一个[保护层](https://opensource.com/article/18/1/history-low-level-container-runtimes)。对于容器里面的进程来说，它接触到的各种资源都是虚拟的，从而实现与底层系统的隔离。

由于容器是进程级别的，相比虚拟机有很多优势。

**（1）启动快**

容器里面的应用，直接就是底层系统的一个进程，而不是虚拟机内部的进程。所以，启动容器相当于启动本机的一个进程，而不是启动一个操作系统，速度就快很多。

**（2）资源占用少**

容器只占用需要的资源，不占用那些没有用到的资源；虚拟机由于是完整的操作系统，不可避免要占用所有资源。另外，多个容器可以共享资源，虚拟机都是独享资源。

**（3）体积小**

容器只要包含用到的组件即可，而虚拟机是整个操作系统的打包，所以容器文件比虚拟机文件要小很多。

总之，容器有点像轻量级的虚拟机，能够提供虚拟化的环境，但是成本开销小得多。

#### 四、Docker 是什么？

**Docker 属于 Linux 容器的一种封装，提供简单易用的容器使用接口。**它是目前最流行的 Linux 容器解决方案。

Docker 将应用程序与该程序的依赖，打包在一个文件里面。运行这个文件，就会生成一个虚拟容器。程序在这个虚拟容器里运行，就好像在真实的物理机上运行一样。有了 Docker，就不用担心环境问题。

总体来说，Docker 的接口相当简单，用户可以方便地创建和使用容器，把自己的应用放入容器。容器还可以进行版本管理、复制、分享、修改，就像管理普通的代码一样。

#### 五、Docker 的用途

Docker 的主要用途，目前有三大类。

**（1）提供一次性的环境。**比如，本地测试他人的软件、持续集成的时候提供单元测试和构建的环境。

**（2）提供弹性的云服务。**因为 Docker 容器可以随开随关，很适合动态扩容和缩容。

**（3）组建微服务架构。**通过多个容器，一台机器可以跑多个服务，因此在本机就可以模拟出微服务架构。



### 1.环境安装（Mac版）

- 链接: https://pan.baidu.com/s/1Jdj2ZmeX1TTsuNnxwzP0iQ  密码: 65l0

### 2.构建目录结构

```
cd ~
mkdir -p docker-home/go-web/golang/src
```

- cd ~ 是进入当前用户目录下

- mkdir -p 是创建多级目录

### 3.创建go文件

```
cd docker-home/go-web/golang/src
touch main.go
open main.go
```

- touch 创建文件

- open 打开文件

### 4.编写go代码

```go
package main

import (
    "net/http"
    "fmt"
    "log"
)

func main() {
    http.HandleFunc("/", func(writer http.ResponseWriter, request *http.Request) {
        fmt.Fprint(writer, "Hello World")
    })
    log.Fatal(http.ListenAndServe(":3000",nil))
}
```

### 5.创建dockerfile

```
cd ~
cd docker-home/go-web/golang
touch Dockerfile
```

### 6.编写dockerfile

```dockerfile
# 使用docker hub上的golang，版本为1.15.1
FROM golang:1.15.2
# 拷贝当前目下src文件下的所有文件到go环境的src文件下
COPY ./src ./src
# 暴露3000端口
EXPOSE 3000
```

### 7.执行docker命令

```
docker build -t go-web .
docker images
docker run -it -p 3000:3000 --rm --name go-web-running go-web
```

- docker build -t go-web . 在当前目录寻找Dockerfile构建一个tag是go-web的镜像
  - -t 是给镜像添加tag，如果不写，则会随机一个tag
  - . 是Dockerfile的目录

- docker images 显示本地的所有镜像

- docker run -it -P --rm --name go-web-running go-web 用go-web构建名为go-web-running的容器
  - -it 以交互模式运行容器，并启动伪输入终端
  - -p 指定端口映射，格式为：主机(宿主)端口:容器端口
  - --rm 容器运行结束后就移除
  - --name 设置容器的名字

### 8.执行go命令

```go
ls
cd src
go build
ls
./src
```

- 执行了上面的docker的run命令后，进入到go的环境，因为脚本拷贝到了src目录下，所以要进入该目录，然后执行build操作，生成可执行文件。

### 9.查看运行结果

```
docker ps -a
```

- docker ps -a 显示所有容器
- 在浏览器里面输入http://localhost:3000/
- 浏览器里面显示Hello World证明运行成功

### 10.移除容器和镜像

```
ctrl+c
exit
docker ps -a
docker images
docker image rm go-web
```

- ctrl+c 退出运行的web

- exit 退出go容器

- docker image rm go-web 移除go-web镜像

### 11.编写docker-compose

```
cd ~
cd docker-home/go-web
touch docker-compose.yml
open docker-compose.yml
```

- 在打开的docker-compose.yml中写入

```dockerfile
version: '3'

services:
  go-web:
    # 镜像名
    image: go-web
    # 容器名
    container_name: go-web-running
    # 工作目录 启动后进入指定目录
    working_dir: /go/src
    # 用指定目录下的Dockerfile构建镜像
    build:
      context: ./golang
      dockerfile: Dockerfile
    # 挂载目录
    volumes:
      - ~/docker-home/go-web/golang/src:/src
    # 端口映射
    ports:
      - "3000:3000"
    # 容器启动后执行的命令
    command: bash -c "
      go build &&
      ./src
      "
```

### 12.运行docker-compose

```
docker-compose up -d
```

- docker-compose up -d 在后台运行docker-compose
- docker ps -a 显示所有容器
- 在浏览器里面输入http://localhost:3000/
- 浏览器里面显示Hello World证明运行成功

### 13.保存、加载镜像

```
docker stop go-web-running
docker rm go-web-running
docker save go-web>go-web.tar
ls
docker images
docker image rm go-web
docker load<go-web.tar
docker images
```

- docker stop go-web-running 停止go-web-running容器
- docker save go-web>go-web.tar 将go-web镜像写入go-web.tar中
- docker load<go-web.tar 加载go-web.tar

### 14.上传镜像到docker hub

- 打开https://hub.docker.com/

- 注册账号

- 登录账号，在Repositories中点击Create Repository
- name填写go-web，description填写go-web
- 点击Create
- 打开终端

```
docker login
输入用户名
输入密码
docker images
docker tag 96c5b7db67be chengjin0619/go-web
docker push chengjin0619/go-web
docker pull chengjin0619/go-web
```

- docker login 登录到docker hub

- docker tag 96c5b7db67be chengjin0619/go-web 给镜像id为96c5b7db67be的镜像打上chengjin0619/go-web的tag

- docker push chengjin0619/go-web 将tag为chengjin0619/go-web的镜像推送到docker hub上

- docker pull chengjin0619/go-web 从docker hub上拉取chengjin0619/go-web镜像
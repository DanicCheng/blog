---
title: shell常用指令
date: 2020-12-15
tags: ["shell"]
categories: ["Share"]
author: "Danic"
---

## $开头

```shell
$0 这个程式的执行名字
$n 这个程式的第n个参数值，n=1..9
$* 这个程式的所有参数,此选项参数可超过9个。
$# 这个程式的参数个数
$$ 这个程式的PID(脚本运行的当前进程ID号)
$! 执行上一个背景指令的PID(后台运行的最后一个进程的进程ID号)
$? 执行上一个指令的返回值 (显示最后命令的退出状态。0表示没有错误，其他任何值表明有错误)
$- 显示shell使用的当前选项，与set命令功能相同
$@ 跟$*类似，但是可以当作数组用
```

## 判断表达式

文件比较运算符

```shell
-e filename 	如果 filename存在，则为真 	[ -e /var/log/syslog ]
-d filename 	如果 filename为目录，则为真 	[ -d /tmp/mydir ]
-f filename 	如果 filename为常规文件，则为真 	[ -f /usr/bin/grep ]
-L filename 	如果 filename为符号链接，则为真 	[ -L /usr/bin/grep ]
-r filename 	如果 filename可读，则为真 	[ -r /var/log/syslog ]
-w filename 	如果 filename可写，则为真 	[ -w /var/mytmp.txt ]
-x filename 	如果 filename可执行，则为真 	[ -L /usr/bin/grep ]
filename1-nt filename2 	如果 filename1比 filename2新，则为真 	[ /tmp/install/etc/services -nt /etc/services ]
filename1-ot filename2 	如果 filename1比 filename2旧，则为真 	[ /boot/bzImage -ot arch/i386/boot/bzImage ]
```

字符串比较运算符

```shell
-z string 	如果 string长度为零，则为真 	[ -z "$myvar" ]
-n string 	如果 string长度非零，则为真 	[ -n "$myvar" ]
string1= string2 	如果 string1与 string2相同，则为真 	[ "$myvar" = "one two three" ]
string1!= string2 	如果 string1与 string2不同，则为真 	[ "$myvar" != "one two three" ]
```

算数比较运算符

```shell
num1-eq num2 	等于	[ 3 -eq $mynum ]
num1-ne num2 	不等于	[ 3 -ne $mynum ]
num1-lt num2 	小于	[ 3 -lt $mynum ]
num1-le num2 	小于或等于	[ 3 -le $mynum ]
num1-gt num2 	大于	[ 3 -gt $mynum ]
num1-ge num2 	大于或等于	[ 3 -ge $mynum ]
```


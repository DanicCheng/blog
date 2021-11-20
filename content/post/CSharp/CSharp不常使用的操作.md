---
title: "CSharp不常使用的操作"
date: 2021-03-20T14:16:38+04:00
lastmod: 2021-03-20T14:16:38+04:00
tags: CSharp
categories: CSharp
---

## Activator.CreateInstance

- 创建指定类型的实例化对象。他的重载方法很多，具体查看[官方文档](https://docs.microsoft.com/en-us/dotnet/api/system.activator.createinstance?view=net-5.0#System_Activator_CreateInstance__1)



## 获取一个对象的内存

- 对于托管对象是没有办法直接获取到一个对象所占的内存大小。

- 非托管对象，可以使用Marshal.SizeOf

  - 例如：

  - ```c#
     // 加上一个StructLayoutAttribute，来控制Student类的数据字段的物理布局
     [StructLayout(LayoutKind.Sequential)]
     public class Student
     {
     }
     
     int size = Marshal.SizeOf(new Student()); //1个字节
    ```

    

- 对内置类型，如int,long,byte等使用sizeof


---
title: "C#通过属性修饰符来指定配置路径"
date: 2021-03-24T16:53:02+04:00
lastmod: 2021-03-24T16:53:02+04:00
draft: false
tags: ["CSharp","修饰符","配置路径"]
categories: ["CSharp"]
author: "Danic"
---

## 前言

- 项目开发过程中，会遇到不同项目，框架的配置文件路径会不一样的问题，如果兼顾让子项目可以自己配置路径，又不影响主工程单独的使用配置路径。这时就可以通过属性修饰符，来指定配置路径，框架层只关心属性修饰符对应的值，而不关心属性修饰符具体在哪里。这样，子项目就可以自己定义路径了。



## 参考代码

- 获取方法

  ```c#
  /// <summary>
  /// 获取配置路径。
  /// </summary>
  /// <typeparam name="T">配置类型。</typeparam>
  /// <returns>配置路径。</returns>
  internal static string GetConfigurationPath<T>() where T : ConfigPathAttribute
  {
    foreach (System.Type type in Utility.Assembly.GetTypes())
    {
      if (!type.IsAbstract || !type.IsSealed)
      {
        continue;
      }
  
      foreach (FieldInfo fieldInfo in type.GetFields(BindingFlags.Static | BindingFlags.Public | BindingFlags.NonPublic | BindingFlags.DeclaredOnly))
      {
        if (fieldInfo.FieldType == typeof(string) && fieldInfo.IsDefined(typeof(T), false))
        {
          return (string)fieldInfo.GetValue(null);
        }
      }
  
      foreach (PropertyInfo propertyInfo in type.GetProperties(BindingFlags.Static | BindingFlags.Public | BindingFlags.NonPublic | BindingFlags.DeclaredOnly))
      {
        if (propertyInfo.PropertyType == typeof(string) && propertyInfo.IsDefined(typeof(T), false))
        {
          return (string)propertyInfo.GetValue(null, null);
        }
      }
    }
  
    return null;
  }
  ```

- 属性修饰符类

  ```c#
  /// <summary>
  /// BuildSettings 配置路径属性。
  /// </summary>
  public sealed class BuildSettingsConfigPathAttribute : ConfigPathAttribute
  {
  }
  ```

- 属性修饰符使用

  ```c#
  [BuildSettingsConfigPath]
  public static string BuildSettingsConfig = Utility.Path.GetRegularPath(Path.Combine(Application.dataPath, "GameMain/Configs/BuildSettings.xml"));
  ```

- 获取方法使用

  ```c#
  s_ConfigurationPath = Type.GetConfigurationPath<BuildSettingsConfigPathAttribute>() ?? Utility.Path.GetRegularPath(Path.Combine(Application.dataPath, "GameFramework/Configs/BuildSettings.xml"));
  ```

上面的s_ConfigurationPath就是配置的路径。
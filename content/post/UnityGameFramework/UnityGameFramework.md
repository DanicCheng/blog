---
title: "UnityGameFramework"
date: 2021-03-14T09:55:41+04:00
lastmod: 2021-03-14T11:56:46+04:00
tags: UnityGameFramework
categories: UnityGameFramework
---

## Base

> UnityGameFramework/Scripts/Runtime/Base

- ShutdownType

  - 关闭游戏框架类型：仅关闭游戏框架、关闭游戏框架并重启游戏、关闭游戏框架并退出游戏。

- GameFrameworkComponent

  - 针对MonoBehaviour进行二次封装，这是个抽象类，将Awake弄成虚方法。里面调用了`GameEntry.RegisterComponent(this);`相当于继承该类的游戏框架组件，挂在到显示状态的对象上，都会被自动注册到框架中。

- BaseComponent

  - 基础组件，GameFrameworkComponent的派生类，不能被继承，用于设置框架的基础参数，和设置基础模块。
  - 定义窗口dpi，默认值是96，`private const int DefaultDpi = 96;` 这里默认是Screen.dpi，如果窗口dpi异常，则使用默认dpi。

  ```c#
  Utility.Converter.ScreenDpi = Screen.dpi;
  if (Utility.Converter.ScreenDpi <= 0)
  {
  	Utility.Converter.ScreenDpi = DefaultDpi;
  }
  ```

  - 定义是否使用编辑器资源模式，如果是，则不加载Assetbundle，直接使用项目中的资源。`EditorResourceMode`，仅在编辑器内有效。
  - 设置编辑器语言，`EditorLanguage`，仅在编辑器内有效，`m_EditorResourceMode &= Application.isEditor;`
  - 设置版本辅助器的类型名，`private Language m_EditorLanguage = Language.Unspecified;`用于反射获取版本辅助器的类，并构建对象。
  - 设置日志辅助器的类型名，`private string m_LogHelperTypeName = "UnityGameFramework.Runtime.DefaultLogHelper";` 用于反射获取日志辅助器的类，并构建对象。
  - 设置压缩辅助器的类型名，`private string m_CompressionHelperTypeName = "UnityGameFramework.Runtime.DefaultCompressionHelper";` 用于反射获取压缩辅助器的类，并构建对象。
  - 设置Json辅助器的类型名，`private string m_JsonHelperTypeName = "UnityGameFramework.Runtime.DefaultJsonHelper";`用于反射获取Json辅助器的类，并构建对象。
  - 设置游戏帧率，`private int m_FrameRate = 30;` ,其实就是改 `Application.targetFrameRate = m_FrameRate;`,
  - 设置游戏速度，`private float m_GameSpeed = 1f;` ,其实就是改 `Time.timeScale = m_GameSpeed;`
  - 设置是否在后台运行，`RunInBackground`，其实就是改`Application.runInBackground`
  - 是否不息屏，`NeverSleep`，其实就是改`Screen.sleepTimeout = value ? SleepTimeout.NeverSleep : SleepTimeout.SystemSetting;`
  - 判断游戏是否暂停，`IsGamePaused`，其实就是判断一下游戏速度是否小于等于0。
  - 判断游戏是否是正常速度，`IsNormalGameSpeed`，其实就是判断一下游戏速度是否等于1。
  - Awake中初始化，版本辅助器、日志辅助器、压缩辅助器、Json辅助器，通过反射，获得类，并实例化对象，保存起来。
  - 增加了低内存回调，当内存不足时，清空对象池，卸载没有使用的资源。
  - 提供了暂停游戏，恢复游戏，重置默认游戏速度，关闭方法。
  - 这里会调用GameFrameworkEntry的一些方法，Update传`Time.deltaTime, Time.unscaledDeltaTime`给GameFrameworkEntry，让框架层拥有Unity的刷新逻辑。OnDestroy的时候调用GameFrameworkEntry的Shutdown，告诉框架层释放。

- GameEntry

  - 这是个静态类，是游戏的入口函数。
  - 获取组件方法，组件用循环链表保存。
  - 关闭方法，调用baseComponent的关闭方法，根据ShutdownType来决定是重启初始场景，还是退出程序。
  - 注册组件方法

## Event

- EventComponent
  - 事件组件，核心就是调用了一下EventManager。

## Resource

- ResourceComponent
  - 资源组件，负责资源加载，释放，下载。
  - ResourceMode，获取资源模式：
    - Package，单机模式，不会去下载，直接去StreamingAssets加载。
    - Updatable，预下载的可更新模式，加载资源前，需要提前将所有资源下载好，调用UpdateResources。
    - UpdatableWhilePlaying，使用时下载的可更新模式，如果没有提前下载好资源，会在使用时再去下载资源。

## ResourceBuilder.xml

这个是AssetBundle工具对应的配置文件：

```xml
<?xml version="1.0" encoding="UTF-8"?>
<UnityGameFramework>
  <ResourceEditor>
    <Settings>
      <!--配置资源搜索的根目录，可以从Assets根部全部查找，可以配置成子目录-->
      <SourceAssetRootPath>Assets</SourceAssetRootPath>
      <!--配置资源搜索的子目录，相对于根目录的路径，支持配置多个子目录，如果为空，则搜索所有子目录-->
      <SourceAssetSearchPaths>
        <SourceAssetSearchPath RelativePath="" />
      </SourceAssetSearchPaths>
      <!--筛选并包含的资源类型-->
      <SourceAssetUnionTypeFilter>t:Scene t:Prefab t:Shader t:Model t:Material t:Texture t:AudioClip t:AnimationClip t:AnimatorController t:Font t:TextAsset t:ScriptableObject</SourceAssetUnionTypeFilter>
      <!--筛选并包含的标签类型-->
      <SourceAssetUnionLabelFilter>l:ResourceInclusive l:luascript</SourceAssetUnionLabelFilter>
      <!--筛选并排除的资源类型-->
      <SourceAssetExceptTypeFilter>t:Script</SourceAssetExceptTypeFilter>
      <!--筛选并排除的标签类型-->
      <SourceAssetExceptLabelFilter>l:ResourceExclusive</SourceAssetExceptLabelFilter>
      <!--编辑器中资源列表的排序，可以是Name(资源文件名），Path（资源全路径），Guid（资源Guid）-->
      <AssetSorter>Path</AssetSorter>
    </Settings>
  </ResourceEditor>
</UnityGameFramework>
```


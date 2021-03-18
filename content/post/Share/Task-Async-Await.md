---
title: Task-Async-Await
date: 2020-10-09
tags: ["task","async","await"]
categories: ["Share"]
author: "Danic"
---

常规的async/await如下：

```csharp
static void Main(string[] args)
{
    Console.WriteLine("-------主线程启动-------");
    Task<int> task = GetStrLengthAsync();
    Console.WriteLine("主线程继续执行");
    Console.WriteLine("Task返回的值" + task.Result);
    Console.WriteLine("-------主线程结束-------");
}
 
static async Task<int> GetStrLengthAsync()
{
    Console.WriteLine("GetStrLengthAsync方法开始执行");
    //此处返回的<string>中的字符串类型，而不是Task<string>
    string str = await GetString();
    Console.WriteLine("GetStrLengthAsync方法执行结束");
    return str.Length;
}
 
static Task<string> GetString()
{
　　 //Console.WriteLine("GetString方法开始执行")
    return Task<string>.Run(() =>
    {
        Thread.Sleep(2000);
        return "GetString的返回值";
    });
}
```

上面的方法不能满足回调逻辑，于是就有了下面这段代码：

```csharp
private Action<Pb.RespEntry> cb = null;

/// <summary>
/// 发送消息
/// </summary>
public Task<RespEntry> Send()
{
    var tsc = new TaskCompletionSource<Pb.RespEntry>();
    cb = (Pb.RespEntry pbE) =>
    {
        if (pbE == null)
        {
            tsc.SetException(new Exception($"Entry error"));
        }
        else
        {
            tsc.SetResult(pbE);
        }
    };

    Pb.ReqEntry entry = new Pb.ReqEntry();
    Entry.WebRequest.AddWebRequest(Constant.Http.Entry, entry.ToByteArray(), this);

    return tsc.Task;
}

/// <summary>
/// Web请求的监听
/// 在监听里面执行回调逻辑
/// </summary>
private void OnWebRequest()
{
    if (cb != null)
    {
        cb();
    }
}
```

通过上面的方法，可以将观察者模式，改成async/await
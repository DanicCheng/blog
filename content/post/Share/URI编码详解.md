---
title: "JavaScript及C# URI编码详解"
date: 2021-03-15T15:12:17+04:00
lastmod: 2021-03-15T15:12:17+04:00
tags: URI
categories: Share
---

# 混乱的URI编码

　　JavaScript中编码有三种方法:escape、encodeURI、encodeURIComponent

　　C#中编码主要方法：HttpUtility.UrlEncode、Server.UrlEncode、Uri.EscapeUriString、Uri.EscapeDataString

　　JavaScript中的还好，只提供了三个，C#中主要用的就有这么多，还没有列出其他编码(HTML)，一多就弄不明白，弄不明白就心生恐惧，心生恐惧就变得苦逼，本文就向大家详细解释在JavaScript及C#中如何对URI进行编码的方法(注：本文不涉及到其他编码)。

# escape：不推荐使用

　　原因：eacape是BOM中的方法，只能对ASCII符号正确编码，而encodeURI、encodeURIComponent可以对所有的Unicode符号编码。ECMAScript v3 反对使用该方法，应用使用 decodeURI() 和 decodeURIComponent() 替代它。

　　escape不编码字符有69个：***，+，-，.，/，@，_，0-9，a-z，A-Z**

# encodeURI：用于对网址编码(不包含参数)

　　encodeURI不编码字符有82个：**!，#，$，&，'，(，)，\*，+，,，-，.，/，:，;，=，?，@，_，~，0-9，a-z，A-Z**

　　encodeURI就是为这个而设计的。encodeURI不对URI中的特殊字符进行编码，如冒号(:)、斜杠(/)。下面看个示例：

```
encodeURI("http://www.cnblogs.com/a file with spaces.html")
// outputs http://www.cnblogs.com/a%20file%20with%20spaces.html
```

　　可以看到仅仅把空格替换成了20%，所以此方法可用于对网址进行编码。

　　由于encodeURI不对冒号(:)、斜杠(/)进行编码，所以如果参数(如把网址作为参数)中包含冒号(:)、斜杠(/)，就会解析出错，所以此方法不能对参数进行编码。

# encodeURIComponent:用于对网址参数进行编码

　　encodeURIComponent不编码字符有71个：**!， '，(，)，\*，-，.，_，~，0-9，a-z，A-Z**

　　可以看到此方法对:/都进行了编码，所以不能用它来对网址进行编码。由于此方法对中文，空格，井号(#)，斜线(/)，冒号(:)都进行了编码，所以适合对URI中的参数进行编码。看下面的示例：

```
var param="博客园";
var url="http://www.cnblogs.com/?key="+encodeURIComponent(param)+"&page=1";
console.log(url);//outputs http://www.cnblogs.com/?key=%E5%8D%9A%E5%AE%A2%E5%9B%AD&page=1
```

　　可以看到，这正是我们想要的结果(这里只对需要编码的参数(page=1不需要编码)进行了编码)。

# Server.UrlEncode && HttpUtility.UrlEncode:不推荐

　　把这两个放到一起说是因为这两个方法在绝大多数情况下是一样的。它们的区别是HttpUtility.UrlEncode默认使用UTF8格式编码，而Server.UrlEncode是使用系统预设格式编码，Server.UrlEncode使用系統预设编码做为参数调用HttpUtility.UrlEncode编码，所以如果系统全局都用UTF8格式编码，这两个方法就是一样的。

　　这两个方法是怎么编码的呢，我们来看个示例：

```
string url1 = "http://www.cnblogs.com/a file with spaces.html?a=1&b=博客园#abc";
Response.Write(HttpUtility.UrlEncode(url1) );

//output
http%3a%2f%2fwww.cnblogs.com%2fa+file+with+spaces.html%3fa%3d1%26b%3d%e5%8d%9a%e5%ae%a2%e5%9b%ad%23abc
```

　　由上面的例子我们可以看出，HttpUtility.UrlEncode对冒号(:)和斜杠(/)进行了编码，所以不能用来对网址进行编码。

　　那么能不能对参数进行编码呢，答案也是否定的。因为在参数中空格应该被编码为%20而不是被HttpUtility.UrlEncode编码为加号(+)，所以不推荐用这两个方法对URI进行编码。

# Uri.EscapeUriString:用于对网址编码(不包含参数)

　　我们还是用例子说话：

```
string url1 = "http://www.cnblogs.com/a file with spaces.html?a=1&b=博客园#abc";
Response.Write( Uri.EscapeUriString(url1));
//outputs:
http://www.cnblogs.com/a%20file%20with%20spaces.html?a=1&b=%E5%8D%9A%E5%AE%A2%E5%9B%AD#abc
```

　　可以看出，Uri.EscapeUriString对空格进行了编码，也对中文进行了编码，但对冒号(:)、斜杠(/)和井号(#)未编码，所以此方法可以用于网址进行编码，但不能对参数进行编码，作用类似JavaScript中的encodeURI方法。

# Uri.EscapeDataString:用于对网址参数进行编码

　　仍然用例子说话：

```
string url1 = "http://www.cnblogs.com/a file with spaces.html?a=1&b=博客园#abc";
Response.Write(Uri.EscapeDataString(url1));
//outputs:
http%3A%2F%2Fwww.cnblogs.com%2Fa%20file%20with%20spaces.html%3Fa%3D1%26b%3D%E5%8D%9A%E5%AE%A2%E5%9B%AD%23abc
```

　　可以看出，Uri.EscapeDataString对冒号(:)、斜杠(/)、空格、中文、井号(#)都进行了编码，所以此方法不可以用于网址进行编码，但可以用于对参数进行编码，作用类似JavaScript中的encodeURIComponent方法。

# 小结

　　**在JavaScript中推荐的做法是用encodeURI对URI的网址部分编码，用encodeURIComponent对URI中传递的参数进行编码。**

　　**在C#中推荐的做法是用Uri.EscapeUriString对URI的网址部分编码，用Uri.EscapeDataString对URI中传递的参数进行编码。**

　　解码部分就不说了，与编码方法相对应。
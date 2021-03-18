---
title: "pako.js简单使用"
date: 2021-03-15T15:22:43+04:00
lastmod: 2021-03-15T15:22:43+04:00
draft: false
tags: ["pako"]
categories: ["Share"]
author: "Danic"
---

pako.js是一款可以对内容进行压缩/解压的js，它的主要代码借鉴zlib。(zlib在1995年发表，它的内部使用DEFLATE算法，而DEFLATE算法用到了Huffman算法和LZ77算法；每个语言都有zlib的实现，我们可以认为pako是zlib在js上的实现，pako中方法的参数都是参考zlib)

pako.js的github地址: [pako](https://github.com/nodeca/pako)，文档地址： [pako文档](http://nodeca.github.io/pako/)。下面是一个简单可以对文本内容压缩/解压的demo页面:

[=> pako进行压缩/解压](http://www.qiutianaimeili.com/html/_page/2019/12/source/pako/example.html)(二维码)

#### 基本用法

pako最基本的两个方法就是deflate（压缩）和inflate（解压）方法：

```
/*****压缩*****/var input = pako.deflate([49,50]);/*input为数组*/var input = pako.deflate([49,50],{/*input为字符串*/    to:'string',    level:6,/*0表示不压缩，1表示压缩时间最快，压缩率最小；9表示压缩率最大，时间最长；默认6*/});var input = pako.deflate('12');/*input为数组*//*****解压*****/output= pako.inflate(input);/*结果:[49,50]*/output= pako.inflate(input,{/*结果:12*/    to:'string});
```

需要注意的level，它可以设置压缩程度，0表示不压缩，1-9，数字越大表示压缩率越高，需要的时间越久。

#### new Deflate,new Inflate

上面那种是一次性拿到所有数据进行压缩/解压，如果数据不是一次行得到，而是每次得到一部分，那么可以用new Deflate/new Inflate去处理：

```
/*压缩*/var chunk1 = Uint8Array([1,2,3,4,5,6,7,8,9]), chunk2 = Uint8Array([10,11,12,13,14,15,16,17,18,19]);var deflate = new pako.Deflate({ level: 3});deflate.push(chunk1, false);deflate.push(chunk2, true); // true ->最后一个块if (deflate.err) { throw new Error(deflate.err); }console.log(deflate.result);/*解压*/var chunk1 = Uint8Array([1,2,3,4,5,6,7,8,9]), chunk2 = Uint8Array([10,11,12,13,14,15,16,17,18,19]);var inflate = new pako.Inflate();inflate.push(chunk1, false);inflate.push(chunk2, true); // true -> 最后一个块if (inflate.err) { throw new Error(inflate.err); }console.log(inflate.result);
```

配置参数和之前差不多，只不过这种多了一个push方法，可以分批将数据组装起来。

我们一般在Deflate（压缩）的时候设置压缩级别(level)，在InFlate(解压)的时候不用去设置压缩级别，因为压缩的时候已经将压缩的信息写在格式头部了，下面会有介绍。

#### deflateRaw,inflateRaw

defalteRaw表示压缩的时候只有压缩内容，没有格式头，我们先来看看用deflate压缩和defalteRaw压缩有什么不一样：

```
let input1=pako.deflate([49,50],{    level:1});/*结果：Uint8Array(10) [120, 1, 51, 52, 2, 0, 0, 150, 0, 100]*/let input2=pako.deflateRaw([49,50],{    level:1});/*结果：Uint8Array(4) [51, 52, 2, 0]*/
```

我们可以发现，deflateRaw得到的数据是defalte的一部分，defalte比deflateRaw多了一些东西，前面多了120，1，后面多了0，150，0，100 。那么多出来的是什么东西呢？

![img](http://active.qiutianaimeili.com/pako_e1.png)![img](http://active.qiutianaimeili.com/pako_e1.png)

上面是zlib保存数据的格式，我们可以看到，真正的压缩内容为Compressed Data，它的前面和后面都有内容，这些内容就是格式头了，里面记录一些压缩的基本信息，之前说到解压的时候不用传level，因为格式头里面都包含了。

注意:deflateRaw压缩的内容只能用inflateRaw解压，因为inflateRaw不检查格式头，而infalte要检查格式头，如果直接用inflateRaw解压就报错了。

#### level 0和1-9

还记得之前提到的level:0，不压缩码？我们利用defalteRaw方法看看，到底何为不压缩，何为压缩：

```
/*deflateRaw获取level:0的格式头和真正内容*/let input3 = pako.deflate([49, 50, 51,52,53,54,55,56,57,58,59,60], {    level: 0});/*结果：Uint8Array(23) [120, 1, 1, 12, 0, 243, 255, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 16, 24, 2, 143]*/let input31 = pako.deflateRaw([49, 50, 51,52,53,54,55,56,57,58,59,60], {    level: 0});/*结果:Uint8Array(17) [1, 12, 0, 243, 255, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60]*//*-------------------------------------------------------------------------------------------*//*deflateRaw获取level:1的格式头和真正内容*/let input4 = pako.deflate([49, 50, 51,52,53,54,55,56,57,58,59,60], {    level: 1});/*结果:Uint8Array(20) [120, 1, 51, 52, 50, 54, 49, 53, 51, 183, 176, 180, 178, 182, 1, 0, 16, 24, 2, 143]*/let input41 = pako.deflateRaw([49, 50, 51,52,53,54,55,56,57,58,59,60], {    level: 1});/*结果:Uint8Array(14) [51, 52, 50, 54, 49, 53, 51, 183, 176, 180, 178, 182, 1, 0]*/
```

我们可以发现level:0压缩后的结果为：[1, 12, 0, 243, 255, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60]，原始内容为：[49, 50, 51,52,53,54,55,56,57,58,59,60]，也就是说压缩的内容里面有前面完整的内容，甚至前面还多了一些内容。因此可以知道level:0真的是没有发生压缩。

level:1压缩后的内容和压缩前的内容没有对应关系，内部应该是用LZ77算法实现（可以自行百度，了解下LZ77算法），LZ77里面有滑动窗口，预存区之类概念，因此level（1-9），级别越高，应该就是这些区域更大，压缩率更高，时间更长。

#### gzip,ungzip

上面我们了解到了什么是格式头，其实除了deflate有格式头，还有一种格式头：gzip，它和defalte类似，也包含了压缩的数据，只不过压缩头不一样：

```
let input6 = pako.gzip([49, 50],);/*结果:Uint8Array(22) [31, 139, 8, 0, 0, 0, 0, 0, 0, 3, 51, 52, 2, 0, 205, 68, 83, 79, 2, 0, 0, 0]*/let input61 = pako.deflateRaw([49, 50]);/*结果:Uint8Array(4) [51, 52, 2, 0]*/
```

我们可以看到压缩内容的前面和后面都有很多内容，比defalte的要多得多。确实，因为gzip的格式头里面存储的内容比defalte要多：

![img](http://active.qiutianaimeili.com/pako_e2.png)

在pako.js中可以也可以配置gzip的这种格式头：

![img](http://active.qiutianaimeili.com/pako_e3.png)

用gzip压缩的内容,infalte和ungzip都是可以解压的，因为解压的内容只包含数据，不含格式头。
---
title: "CSharp函数是否占用内存"
date: 2021-08-09T13:56:17+08:00
lastmod: 2021-08-09T13:56:17+08:00
tags: CSharp
categories: CSharp
---

## 前言

前两天在写代码时，发现自己用Lua写的消息模块出现了bug，这次写框架，我为了图方便，用Lua的function作为table的key，用来保存不同的消息对应的回调函数，类似这样的结构:

```lua
eventMap[msgKey][function] = function
```

当我对一个Lua的class，new了不同对象后，在每个对象里分别监听了各自的function Hello，发现只有最后一个function Hello成功监听，其他的都被覆盖了。这与我在C#中测试的结果截然不同。后来一想，lua的里面的class是通过原表构建的，function本身都是同一份。

我又根据这个问题，跟同事讨论了一番，所以就引出了一个问题，C#函数是否占用内存，是否有内存地址，C#的类对象的函数地址是否相同，为什么C#用类对象的函数作为key，不会出现重复问题。

## C#函数是否占用内存

经过自己的测试，和各种找资料，发现，如果通过代码打印一个类对象的所占的内存，无论你在这个类里面写多少函数，内存都不会有变化，那是否说明函数不占用内存呢？通过网上找资料和跟一个C#大神讨论得知，其实函数是占用内存的，只不过不在堆栈内。引用晚上的一张图：

![memoryLayoutC](http://www.foryun.com.cn/upload/2021/08/memoryLayoutC-f42cb3ce10c34e64bd764c5bf43da723.jpg)

引入网上博客（博客地址:https://www.geeksforgeeks.org/memory-layout-of-c-program/）的原文：

> A typical memory layout of a running process
> 1. Text Segment: 
> A text segment, also known as a code segment or simply as text, is one of the sections of a program in an object file or in memory, which contains executable instructions.
> As a memory region, a text segment may be placed below the heap or stack in order to prevent heaps and stack overflows from overwriting it. 
>
> Usually, the text segment is sharable so that only a single copy needs to be in memory for frequently executed programs, such as text editors, the C compiler, the shells, and so on. Also, the text segment is often read-only, to prevent a program from accidentally modifying its instructions.
>
> 2. Initialized Data Segment: 
> Initialized data segment, usually called simply the Data Segment. A data segment is a portion of the virtual address space of a program, which contains the global variables and static variables that are initialized by the programmer.
> Note that, the data segment is not read-only, since the values of the variables can be altered at run time.
> This segment can be further classified into the initialized read-only area and the initialized read-write area.
> For instance, the global string defined by char s[] = “hello world” in C and a C statement like int debug=1 outside the main (i.e. global) would be stored in the initialized read-write area. And a global C statement like const char* string = “hello world” makes the string literal “hello world” to be stored in the initialized read-only area and the character pointer variable string in the initialized read-write area.
> Ex: static int i = 10 will be stored in the data segment and global int i = 10 will also be stored in data segment
>
> 
>
>
> 3. Uninitialized Data Segment: 
> Uninitialized data segment often called the “bss” segment, named after an ancient assembler operator that stood for “block started by symbol.” Data in this segment is initialized by the kernel to arithmetic 0 before the program starts executing
> uninitialized data starts at the end of the data segment and contains all global variables and static variables that are initialized to zero or do not have explicit initialization in source code.
> For instance, a variable declared static int i; would be contained in the BSS segment. 
> For instance, a global variable declared int j; would be contained in the BSS segment.
>
> 4. Stack: 
> The stack area traditionally adjoined the heap area and grew in the opposite direction; when the stack pointer met the heap pointer, free memory was exhausted. (With modern large address spaces and virtual memory techniques they may be placed almost anywhere, but they still typically grow in opposite directions.)
> The stack area contains the program stack, a LIFO structure, typically located in the higher parts of memory. On the standard PC x86 computer architecture, it grows toward address zero; on some other architectures, it grows in the opposite direction. A “stack pointer” register tracks the top of the stack; it is adjusted each time a value is “pushed” onto the stack. The set of values pushed for one function call is termed a “stack frame”; A stack frame consists at minimum of a return address.
> Stack, where automatic variables are stored, along with information that is saved each time a function is called. Each time a function is called, the address of where to return to and certain information about the caller’s environment, such as some of the machine registers, are saved on the stack. The newly called function then allocates room on the stack for its automatic and temporary variables. This is how recursive functions in C can work. Each time a recursive function calls itself, a new stack frame is used, so one set of variables doesn’t interfere with the variables from another instance of the function.
>
> 5. Heap: 
> Heap is the segment where dynamic memory allocation usually takes place.
> The heap area begins at the end of the BSS segment and grows to larger addresses from there. The Heap area is managed by malloc, realloc, and free, which may use the brk and sbrk system calls to adjust its size (note that the use of brk/sbrk and a single “heap area” is not required to fulfill the contract of malloc/realloc/free; they may also be implemented using mmap to reserve potentially non-contiguous regions of virtual memory into the process’ virtual address space). The Heap area is shared by all shared libraries and dynamically loaded modules in a process.

这里，我们用有道翻译一下：

> 运行进程的典型内存布局
>
> 1. 文字部分:
> 文本段，也称为代码段或简单地称为文本，是目标文件或内存中程序的一个部分，它包含可执行指令。
> 作为内存区域，文本段可以放置在堆或堆栈之下，以防止堆和堆栈溢出覆盖它。
>
> 通常，文本段是可共享的，因此对于经常执行的程序(如文本编辑器、C编译器、shell等)，只需要在内存中保存一个副本。此外，文本段通常是只读的，以防止程序意外地修改其指令。
>
> 2. 初始化数据段:
> 初始化的数据段，通常简称为数据段。数据段是程序虚拟地址空间的一部分，其中包含由程序员初始化的全局变量和静态变量。
> 注意，数据段不是只读的，因为变量的值可以在运行时更改。
> 此段可进一步分为初始化的只读区和初始化的读写区。
> 例如，C语言中char s[] = " hello world "定义的全局字符串和一个C语句，比如main(即global)外部的int debug=1，会被存储在初始化的读写区中。而像const char* string = " hello world "这样的全局C语句使得字符串字面量" hello world "存储在初始化的只读区域中，而字符指针变量string存储在初始化的读写区域中。
> 例如:静态int i = 10将被存储在数据段中，全局int i = 10也将被存储在数据段中
>
> 3. 未初始化数据段:
>
>    未初始化的数据段通常称为“bss”段，以一个古老的汇编操作符命名，代表“由符号开始的块”。在程序开始执行之前，内核将此段中的数据初始化为算术0
>    未初始化的数据从数据段的末尾开始，包含所有在源代码中初始化为零或没有显式初始化的全局变量和静态变量。
>    例如，声明为static int i的变量;将包含在BSS段中。
>    例如，一个全局变量声明为int j;将包含在BSS段中。
>
> 4. 栈:
> 堆栈区域通常与堆区域相邻，并向相反方向增长;当堆栈指针遇到堆指针时，可用内存就被耗尽。(在现代的大地址空间和虚拟内存技术中，它们可以被放置在几乎任何地方，但它们通常仍然朝着相反的方向发展。)
> 栈区包含程序栈，一种后进先出结构，通常位于内存的较高部分。在标准PC x86计算机体系结构上，它向零地址增长;在其他一些体系结构上，它朝着相反的方向发展。“堆栈指针”寄存器跟踪堆栈的顶部;每当一个值被“推”到堆栈时，它就会进行调整。为一个函数调用推入的值集被称为“堆栈帧”;堆栈帧至少包含一个返回地址。
> 堆栈，其中存储自动变量，以及每次调用函数时保存的信息。每次调用函数时，返回的地址和有关调用方环境的某些信息(如一些机器寄存器)都保存在堆栈上。然后，新调用的函数在堆栈上为它的自动变量和临时变量分配空间。这就是C中递归函数的工作方式。每次递归函数调用自身时，都会使用一个新的堆栈帧，这样一组变量就不会与函数的另一个实例中的变量发生冲突。
>
> 5. 堆:
> 堆是动态内存分配通常发生的段。
> 堆区域从BSS段的末尾开始，并从那里增长到更大的地址。堆区域由malloc、realloc和free管理，它们可以使用brk和sbrk系统调用来调整其大小(注意，使用brk/sbrk和单个“堆区域”并不需要满足malloc/realloc/free的约定;它们也可以使用mmap来实现，将可能不相邻的虚拟内存区域保留到进程的虚拟地址空间中。Heap区域由进程中的所有共享库和动态加载的模块共享。

通过这篇博客，我们可以得知，函数是占内存区域的，只不过不在堆栈中，而在Text Segment中。

通过另外一篇博客，从汇编的角度，解释了函数占内存的说法（https://www.codenong.com/21735407/）：

借用该博客的汇编脚本：

```assembly
Dump of assembler code for function demo:
0x000000000040052d <+0>:     push   %rbp
0x000000000040052e <+1>:     mov    %rsp,%rbp
0x0000000000400531 <+4>:     mov    $0x400614,%edi
0x0000000000400536 <+9>:     mov    $0x0,%eax
0x000000000040053b <+14>:    callq  0x400410 <printf@plt>
0x0000000000400540 <+19>:    pop    %rbp
0x0000000000400541 <+20>:    retq
```

该博客，对函数是否占用内存，是如下解释的：

> - 函数将编译为存储在内存中的代码，内存量完全取决于功能。您可以编写一个很长的函数或一个很短的函数。长的将需要更多的内存。但是，除非您在具有严格内存限制的环境中(例如在非常小的嵌入式系统上)工作，否则通常不必担心用于代码的空间。在具有现代操作系统的台式计算机(甚至移动设备)上，虚拟内存系统将负责根据需要将代码页移入或移出物理内存，因此您的代码也很少会被占用很多内存。
>
> - 一旦执行，整个程序就会加载到内存中。通常，程序指令存储在存储空间的最低字节中，称为text section
>
> - 这些功能被编译为仅在特定ISA(x86，如果要在手机上运行，??可能是ARM等)上运行的机器代码，因为不同的处理器可能需要更多或更少的指令才能运行相同的功能，并且长度指令也可能有所不同，在编译之前，无法预先确切知道该功能的大小。
>
> - 即使您知道将为其编译的处理器和操作系统，不同的编译器也会根据函数使用的指令以及代码的优化方式来创建函数的不同等效表示形式。
>
> - 另外，请记住，函数以不同的方式占用内存。我认为您是在谈论代码本身，这是它自己的部分。在执行期间，该函数还可以占用堆栈上的空间-每次调用该函数时，都会以堆栈帧的形式占用更多内存。数量取决于函数声明的局部变量和参数的数量和类型。



**上述言论，我也在C#大神那边得到的求证。综上所述，函数是占内存的，只不过不在堆栈中。既然占内存，肯定就有内存地址。**



## C#的类对象的函数地址是否相同

既然函数占用内存，类对象的函数地址是否相同的，经过测试，我发现，如果要将函数作为key或者参数，那么这个key或者参数一定是个函数指针类型，例如delegate，Action。而就是因为有函数指针这个操作，导致看似类对象的函数地址发生了变化，其实函数地址并没有变，只不过，我们作为key或者参数的是新创建指向函数的指针罢了。



## 总结

函数占内存，函数不在堆栈中，函数地址唯一，类对象的函数地址不唯一，是因为新创建了函数指针。

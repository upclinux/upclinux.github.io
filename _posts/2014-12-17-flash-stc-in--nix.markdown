---
layout: post
title:  "Linux/Mac 下烧录 STC 单片机"
date:   2014-12-17 17:21:46
author: vjudge1
categories: Linux
tags: 单片机
---
* content
{:toc}

据说单片机高手都是鄙视 STC 单片机的，因为 STC 的老姚 (姚永平) 喜欢到处 Tree New Bee。不过拿 STC 单片机入门还是很好的，毕竟它又简单又便宜，最重要的是，它可以拿 USB 直接下载。

但是老姚的烧录软件只有 Windows 版 (并且烧录软件里面也是到处吹牛皮)，所以在 Linux 或 Mac 系统下要麻烦一下了……

下面讲的是在纯 Linux/Mac 环境下烧单片机。如果嫌麻烦，你可以装虚拟机然后在里面跑 Windows。




单片机：STC89C52RC

使用了开发板，支持在线下载，串口芯片为 PL2303HX。

# 和 Windows 环境的区别

* Windows 下用的是 Keil 和 STC-ISP，前者是编程软件（带编译器），后者是官方的下载软件。所以只要找到这两个的替代品，剩下的就都 ok 了。
    * Keil 的替代品是 sdcc。不过二者语法有些不同，程序不能直接拿来编译。
    * Keil 在 wine 中不能正常工作，但是编译器可以。
    * STC-ISP 的替代品有 gSTCISP、stcflash，前者是图形界面程序。由于 STC 的烧录方法是不公开的，所以这两个软件并不支持所有种类的 STC。不过 89C5x 都是没问题的。
* 代码可以用 Vim 写，然后写 Makefile 编译。当然，怎么搞都行。

# Ubuntu 的配置

其他 Linux 发行版思路类似。

一般下载器都是 PL2303 芯片，此芯片免驱，所以不用安装了。默认情况下串口可能是`/dev/ttyUSB0`。

用以下命令安装编译器：

    sudo apt-get install sdcc

## stcflash (推荐)

stcflash 可以从 [GitHub](https://github.com/laborer/stcflash) 下载。我对这个程序稍微做了修改，所以现在可以直接烧录 .hex 格式的程序了。

stcflash 需要 pySerial，所以：

    sudo apt-get install python-serial

也可以源码安装，只要你愿意折腾。

为了方便，可以把它复制到 /usr/local/bin 中：

    sudo cp stcflash.py /usr/local/bin/stcflash
    sudo chmod +x /usr/local/bin/stcflash

我个人感觉 stcflash 用起来会舒服一些，因为是命令行工具，便于写 Makefile。

## gSTCISP

1. 先执行下面这条命令，编译时要用

        sudo apt-get install libvte-dev

2. 百度 gSTC-ISP_v1.0.tar.gz 的[源代码](http://forum.ubuntu.org.cn/download/file.php?id=104628&sid=767b624faf73a36c71fcd4f8111773e)，解压

        tar xvf gSTC-ISP_v1.0.tar.gz

3. 接下来把 `/usr/include/vte-0.0/vte` 中与 vte 有关的所有文件拷到解压后的 `gSTC-ISP_v1.0/src` 中。
4. 把 gSTC-ISP_v1.0/src/main.c 中的 `#include <vte/vte.h>` 改为 `#include "vte.h"`。
5. 接下来就可以 `./configure && make && make install` 了。
6. 为了方便，可以把它复制到 /usr/local/bin 中：sudo cp gSTCISP /usr/local/bin

很麻烦是吧？毕竟是支持图形界面的……还是命令行更简单！



# OS X 的配置

为了省事儿，还是用 [stcflash](https://github.com/laborer/stcflash) 吧。

1. PL2303 当然有 [Mac 的驱动](http://www.prolific.com.tw/US/ShowProduct.aspx?p_id=229&pcid=41)，下载安装然后重启就能用了。默认情况下串口可能是`/dev/tty.usbserial`。
2. 安装 sdcc 编译器：需要安装一个软件——MacPorts (其实 brew 也行)
   我直接用 MacPorts 了——

        sudo port install binutils sdcc

3. 需要安装 pySerial。首先要[下载代码](https://pypi.python.org/packages/source/p/pyserial/pyserial-2.7.tar.gz#md5=794506184df83ef2290de0d18803dd11)，解压。
   安装其实很简单，只要

        sudo python setup.py install

   就 OK 了。
4. 下载 stcflash。为了方便，可以复制到 /usr/local/bin 中：

        sudo cp stcflash.py /usr/local/bin/stcflash
        sudo chmod +x /usr/local/bin/stcflash

我没试过 gSTCISP 和 kSTCISP，毕竟那是针对 Linux 的。我觉得在装了 X11 之后应该是能用的。

# 烧录 blink

## 源码

建个文件夹，然后建立个文件，叫 led.c：

{% highlight c %}
#include <8052.h>
__sbit __at 0x80 LED;
// or
// #define LED  P0_0

void main()
{
    unsigned int i=0;

    while (1)
    {
        for (i=0; i<10000; i++);
        LED = 0;
        for (i=0; i<10000; i++);
        LED = 1;
    }
}
{% endhighlight %}

## 获得 bin 格式

如果要求 .bin 格式，那么就输入以下命令：

    sdcc led.c
    packihx led.ihx > led.hex
    objcopy -I ihex -O binary led.hex led.bin

当然你可以写成脚本或 Makefile，用起来方便。

那么如何下载呢？gSTCISP 是图形界面程序，需要先打开，然后在里面操作。如果是 stcflash，那么在命令后面接上编译出来的玩意儿的路径就行了 (--help 查看帮助)。

对于 OS X，需要利用 port 或什么装一个 binutil，然后把上面命令中的 objcopy 换成 gobjcopy。

## stcflash

幸运的是，stcflash 已经支持 .hex 格式，所以用 stcflash 烧录更简单——

    sdcc led.c
    stcflash led.ihx

烧录的时候还是老规矩，先断电再重新上电。

如果串口路径不是默认的路径 (如 /dev/tty.usbserial-abcdef)，那么你需要在 stcflash 后面加个 -p 参数来指定串口位置。

这只是个简单例子。还是需要仔细查找 sdcc 的用法。

By the way，虽然 Keil 不能在 wine 下正常运行，但是编译器可以 wine。

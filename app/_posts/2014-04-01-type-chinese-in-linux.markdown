---
layout: post
title: "解决 Linux 和 Qt 的中文输入问题"
date: 2014-04-01 22:15:06
author: vjudge1
categories: Linux
tags: 中文
---

* content
{:toc}

Linux 是中文输入问题最多的系统了，幸运的是，问题是可以解决的。




[% callout %]
本文已更新 (2015 年 11 月)

本文最开始是 2014 年 4 月写的，当时搜狗官方并没正式发布 Linux 版输入法。后来有了 Ubuntu 版，所以文章有些地方已经改了。
[% endcallout %]

# 输入法平台

在 Linux 系统中主要有三种输入法平台——SCIM、iBus、fcitx。当然，也有其他的输入法，例如 fbterm 下的小小输入法。

SCIM 显得比较古老了，我们就不提了。

很多人会选择 fcitx，因为它用着比 iBus 舒服多了，此外，fcitx 里面有一个“搜狗输入法”！过去，Linux Deepin 和搜狗（貌似是非正式的）合作了一把，做了一个测试版的搜狗拼音输入法；后来搜狗和 UbuntuKylin 合作，于是推出了正式版。

一开始我只听说过搜狗，直到后来，发现了中州韵输入法——

# 安装中州韵输入法

中州韵（Rime）是一个开源的输入法框架，被誉为“神级输入法”。这个输入法在 Windows、Linux、Mac 系统中分别被称作“小狼毫”、“中州韵”和“鼠松管”。

这个输入法很好很强大，只不过没有图形界面的设置框，所以……既然敢用 Linux，那么小小的配置文件当然不算事儿了！

官网：[http://rime.im](http://rime.im)。

Rime 既支持 iBus 又支持 fcitx，所以非常省事儿。不过输入法默认出来的是繁体中文，需要调成<s>残</s>简体中文。

# 安装搜狗拼音输入法

## Ubuntu

使用原生 Ubuntu 的一定会主动换输入法，除非就想打双拼（iBus 拼音有 bug，不管选没选双拼，出来的都是双拼）。

过去搜狗官方并没有支持 Linux 系统，所以装起来比较麻烦。现在官方支持 Ubuntu，一切就很轻松了。

按照过去的方法，需要卸载 iBus，手动装 fcitx 而且要把该装的手动装好。现在——

[% callout style=danger %]
别手贱

由于某些系统组件用到了 iBus，所以不要鲁莽地 apt-get remove ibus。如果你在敲命令的时候看到满屏幕要删除的包，那么赶快停止，否则……
[% endcallout %]

1. 去[搜狗官方](http://pinyin.sogou.com/linux/)下载安装包。点击“下载”之后官方会给出一个详细的安装步骤。由于软件包的依赖性，该装的东西会自动装好，无需人工干预。
2. 如果原来默认输入法是 iBus，那么还需要切换一下。输入命令`im-switch`（其他系统可能叫`im-config`或`imsettings-switch`什么的），手动设置，把默认输入法改成 fcitx。
3. 注销之后再登录，默认输入法会变成 fcitx。
4. 如果想要其他输入法
	* 五笔输入法

			sudo apt-get install fcitx-table-wb fcitx-table-wubi-large

	* 五笔拼音输入法

			sudo apt-get install fcitx-table-wbpy

	* 还有一些输入法，比如 LaTeX 输入法 (输入数学符号)。可以自己到软件包管理器里找。

## Fedora 及其他

以 Fedora 为例。

因为搜狗拼音输入法官方只支持 deb 系列系统，所以接下来只能手动安装。好在它是个输入法，装完之后就没有人打算把它卸载了。

1. 安装 fcitx 和必要的库：

    sudo yum install fcitx fcitx-gtk2 fcitx-gtk3 fcitx-qt4 fcitx-qt5 fcitx-config-tool libidn opencc

2. 使用 `imsettings-switch FCITX` 命令将输入法切换为 fcitx。
3. 去[搜狗官方](http://pinyin.sogou.com/linux/)下载安装包。不用理会网站的提示，反正我们自己也装不了。
4. 将安装包中的 data.tar.xz 提取出来。
5. 切换到 root 用户（以免后面出现权限问题），将 data.tar.xz 解压，并手动安装文件：

    tar -xvf data.tar.xz
		chmod +x ./usr/bin/*
		cp -R etc usr /

6. 其中库文件并没有被放到正确的位置上面，所以

		cp -R /usr/lib/x86_64-linux-gnu/* /usr/lib64

7. 清理刚才产生的临时文件

		rm -R etc usr /usr/lib/x86_64-linux-gnu

8. 如果没有什么异常，那么搜狗拼音输入法就已经装好了。可以用 `sogou-qimpanel` 等命令测试一下是否能正确运行。

不过我在输入“sogou-qimpanel”时遇到提示，说缺少“libopencc.so.1”。我用 `ls /usr/lib64/libopencc*` 发现有一个 `libopencc.so.1.0.0`，所以只需要建立一个软链接：

	sudo ln -s /usr/lib64/libopencc.so.1.0.0 /usr/lib64/libopencc.so.1

# 解决 Qt 的中文输入问题

只讲 Ubuntu 的方法。其他系统思路一样。

## Qt 程序

对于旧版 Ubuntu (例如 Ubuntu 12.04)，打以下四行命令：

	sudo add-apt-repository ppa:fcitx-team/nightly
	sudo apt-get update
	sudo apt-get dist-upgrade
	sudo apt-get install libfcitx-qt5-0 fcitx-libs-qt fcitx-libs-qt5

新版 Ubuntu (14.04) 则是

	sudo apt-get install libfcitx-qt5 fcitx-libs-qt fcitx-libs-qt5

现在中文输入法基本上就畅通无阻了。

## Qt Creator

按照上面的配置，Qt4 的 Qt Creator 已经就可以正常敲汉字了，但是 Qt5 的 Qt Creator 还不行。

根本原因是你得把输入法插件送给 Qt Creator，它才能知道有输入法这个东西。iBus 已经送过去了，所以 iBus 不配置也能打字。而 fcitx 就不一样了。

装完`libfcitx-qt5`之后，电脑里会多一个文件

	/usr/lib/x86_64-linux-gnu/qt5/plugin/platforminputcontexts/libfcitxplatforminputcontextplugin.so

这个文件名很长，但是你得记住，因为这个文件要被复制两次。

假设 Qt5 装到了 /opt/Qt5.2.1 里，你需要把这个文件复制到以下两个地方：

	/opt/Qt5.2.1/Tools/QtCreator/bin/plugins/platforminputcontexts
	/opt/Qt5.2.1/5.2.1/gcc_64/plugins/platforminputcontexts

第一个目录管的是 Qt Creator 的中文输入，第二个目录管的是 Qt 编译出来的程序的中文输入。

顺便提一句，正是因为 Telegram 官方的这俩目录干干净净的，所以 Telegram 中文输入无解，除非找个有插件的重新编译。

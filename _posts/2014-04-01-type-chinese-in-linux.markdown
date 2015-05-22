---
layout: post
title: "解决 Ubuntu 和 Qt 的中文输入问题"
date: 2014-04-01 22:15:06
author: vjudge1
categories: Linux 中文文章
tags: Ubuntu 中文
---

* content
{:toc}

Linux 是中文输入问题最多的系统了，幸运的是，问题是可以解决的。

本文最开始是 2014 年 4 月写的，当时搜狗官方并没正式发布 Linux 版输入法。后来有了 Linux 版，所以文章有些地方就需要改了。




## 输入法平台

在 Linux 系统中主要有三种输入法平台——SCIM、iBus、fcitx。当然也有别的输入法，比方说 fbterm 下的小小输入法。

SCIM 显得比较古老了，我们就不提了。相信很多人会选择 fcitx，因为它用着比 iBus 舒服多了（那当然了，fcitx 里的“c”指的就是 Chinese），此外，fcitx 里面有一个“搜狗输入法”！你可能是用过 QQ 输入法或百度输入法或者什么的，不过现在也别太讲究了，有个搜狗就不错了（*此搜狗不受官方支持，-_-\|\|*）。

Ubuntu 自带的是 iBus (*备注：而且还有无法全拼的 bug*)，UbuntuKylin 和 Linux Deepin 自带的是 fcitx，而且都把搜狗输入法装好了。

所以，UbuntuKylin 和 Linux Deepin 用户的 Qt 要是没啥毛病，就可以不看这篇文章了。至于用原生 Ubuntu 的，那就得知道怎么装搜狗，怎么让 Qt 打出汉字……

先提一句，为什么我们装个输入法要这么麻烦？

看看系统的开发者，绝大多数都是打字母的，键盘上那几个按键就足够用了，所以根本也用不着输入法。换成我们了，我们是中国人，中国人要输入汉字啊，光是常用字就两千多了，换成老外，早就崩溃了！

有了中国人日本人和韩国人，就有了 iBus。但是对于中国人来说毕竟不好用，所以就有人自己造车轮了。

## 安装搜狗拼音输入法

过去搜狗官方并没有支持 Linux 系统，所以装起来比较麻烦。现在就很轻松了。

按照过去的方法，需要卸载 iBus，手动装 fcitx 而且要把该装的手动装好。现在——

1. 去[搜狗官方](http://pinyin.sogou.com/linux/)下载安装包。点击“下载”之后官方会给出一个详细的安装步骤。由于软件包的依赖性，该装的东西会自动装好，无需人工干预。
2. 如果原来默认输入法是 iBus，那么还需要切换一下。输入命令`im-switch`（其他系统可能叫`im-config`或`imsettings-switch`什么的），手动设置，把默认输入法改成 fcitx。
3. 注销之后再登录，默认输入法会变成 fcitx。
4. 如果想要其他输入法
	* 五笔输入法

			sudo apt-get install fcitx-table-wb fcitx-table-wubi-large
			
	* 五笔拼音输入法
	
			sudo apt-get install fcitx-table-wbpy
			
	* 还有一些输入法，比如 LaTeX 输入法 (输入数学符号)。可以自己到软件包管理器里找。

注意：由于某些系统组件用到了 iBus，所以不要鲁莽地 apt-get remove ibus。

## 解决 Qt 的中文输入问题

### Qt 程序

对于旧版 Ubuntu (例如 Ubuntu 12.04)，打以下四行命令：

	sudo add-apt-repository ppa:fcitx-team/nightly
	sudo apt-get update
	sudo apt-get dist-upgrade
	sudo apt-get install libfcitx-qt5-0 fcitx-libs-qt fcitx-libs-qt5
	
新版 Ubuntu (14.04) 则是

	sudo apt-get install libfcitx-qt5 fcitx-libs-qt fcitx-libs-qt5

现在中文输入法基本上就畅通无阻了。

### Qt Creator

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

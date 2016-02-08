---
layout: post
title:  "YouCompleteMe安装过程 & Vim插件推荐"
author: vjudge1
categories: Programming
tags: ["插件"]
---
* contents
{:toc}

Vim是“神的编辑器”。没有插件，那肯定要少一点神气……




# 插件管理器

Vim有多种插件管理器，例如Pathogen、NeoBundle、Vundle……我用的是[Vundle](https://github.com/gmarik/vundle)。

Vundle的安装和配置都很简单，只要按照项目说明来git clone和修改vimrc就能装好。

改完vimrc，需要重新启动Vim并输入`:PluginInstall`，或者直接在命令行中：

    vim +PluginInstall +qall

然后Vundle会把缺少的插件装好。

# YouCompleteMe安装

[YouCompleteMe](https://github.com/Valloric/YouCompleteMe)是一个强大的代码补全插件，支持C/C++/C#/JavaScript/Go/Python等语言，不过它的安装比较麻烦。不对，是很麻烦。

## 准备

（Cygwin勿试！）

* Vim需要最新版。最起码得是7.4的。
* Python2.7和cmake是必备的。
    * Mac系统自带的Vim和Python都比较老，需要用一点手段把它们废掉。
* 需要哪种语言的补全，就需要准备哪种编译器：
    * C/C++：需要安装clang，至少3.7版的。Mac系统中装Xcode就行，其他系统需要自己装。如果自己从头编译，电脑至少需要4个G的内存，否则链接时会因内存不足而失败。
    * C#：需要Mono。
    * JavaScript：需要安装node.js，并通过npm安装ternjs。
    * Go：需要Go编译器。

## 安装

在`.vimrc`中加入

    Plugin 'Valloric/YouCompleteMe'

然后`:PluginInstall`。基本文件就下载好了。

接下来需要

    cd ~/.vim/bundle/YouCompleteMe
    python install.py --clang-completer

在运行之前看一下说明，需要哪种语言就从命令行参数中加入哪种语言。

如果在编译安装C/C++补全时遇到点麻烦，可以试着加入`--system-libclang`，使用系统自带的libclang。

## 配置

为了使C/C++的补全工作，家目录里还需要一个`.ycm_extra_conf.py`。可以从`~/.vim/bundle/YouCompleteMe/third_party/ycmd/cpp/ycm/.ycm_extra_conf.py`复制一份然后改改。

# 插件推荐

既然看得懂中文，当然要到[知乎](https://www.zhihu.com/question/19634223)上面看看了。以下是根据他们回答整理的部分内容：

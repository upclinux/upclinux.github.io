---
layout: post
title:  "终端装13利器——zsh、powerline和tmux"
author: vjudge1
categories: Linux
tags: ["插件"]
---
* contents
{:toc}

天天用终端，怎么能不搞搞插件呢？




# zsh

Linux和Mac默认的shell是bash。作为拿来主义者，不如换用zsh，因为——oh-my-zsh，一堆现成的主题和插件。

首先需要安装zsh（Mac自带），然后通过`chsh`命令切换默认shell：

    chsh -s /bin/zsh

接下来要安装oh-my-zsh。项目地址为：[https://github.com/robbyrussell/oh-my-zsh](https://github.com/robbyrussell/oh-my-zsh)，命令不多，按照里面的说明操作即可。

zsh的补全比较智能，而oh-my-zsh以插件形式提供了更多补全，例如gem，可以在`~/.oh-my-zsh/plugins`中看看到底有哪些插件。

在项目[wiki页面](https://github.com/robbyrussell/oh-my-zsh/wiki/themes)里面有主题的预览效果。部分高端大气上档次的主题需要安装Powerline字体。

## wd

wd是oh-my-zsh提供的一个插件，用于给路径加标签，快速切换路径。例如

    wd add a    （给当前路径加标签）
    wd a        （快速切换路径）

如果成天cd那么几个固定路径，那么用wd会更方便。

# Powerline

Powerline可以在shell、vim等软件中显示状态栏，例如下图的状态栏就是Powerline+tmux配合的效果：

![powerline](https://cloud.githubusercontent.com/assets/2618447/6316861/70f3c4ce-ba03-11e4-88a5-0b423dd5a2ce.png)

Powerline的安装其实不难，不过因为我使用MacPorts，文档里有些地方写得不明白，结果试了半天才工作。

首先需要安装[Powerline专用字体](https://github.com/powerline/fonts)，否则装完之后终端里面会出现一堆麻将牌。这些字体不用全部下载，挑个好看的就行。设置完之后设置成默认字体。

然后

    pip install powerline-status

因为官方说明没讲清楚，所以接下来我没按官方说明操作——

    git clone https://github.com/powerline/powerline
    cd powerline/powerline
    python build.py
    # 请把以下路径换成你自己的Python库
    sudo mkdir /usr/lib/python2.7/site-packages/scripts
    sudo cp ./build/* /usr/lib/python2.7/site-packages/scripts

打开`~/.zshrc`，加入

    export TERM=xterm-256color
    source /usr/lib/python2.7/site-packages/powerline/bindings/zsh/powerline.zsh

并且把刚建立的scripts目录放入PATH中。

如果这样还报"Bad file descriptor"的错，可以在加载Powerline支持之前，手动启动一下powerline-daemon：

{% highlight bash %}
if [ $(wc -l <<< `ps ax | grep powerline-daemon`) -lt 2 ]; then
    powerline-daemon-2.7
fi
{% endhighlight %}

最后，遇到问题的话，可以到[Powerline文档](https://powerline.readthedocs.org/en/latest/)里面找找答案。对了，不要在Cygwin里试，除非你喜欢卡顿的感觉……

# tmux

tmux是一个强大的终端分屏软件，本文就是利用它给终端加个状态栏。

光安装tmux，终端底下是不会出现那个炫酷的状态栏的，所以我们要把Powerline也请来：

    mkdir ~/.config
    cd ~/.config
    git clone https://github.com/erikw/tmux-powerline
    cp /usr/lib/python2.7/site-packages/powerline/bindings/tmux/powerline.conf ~/.tmux.conf

在`~/.tmux.conf`中，把powerline.sh的位置改成刚下载的路径（~/.config/tmux-powerline）中，输入tmux即可看到效果。记得把终端窗口拉长一点。

如果对状态栏内容和样式不满意，可以自己改脚本配置一下。配置好之后，就可以把终端模拟器的默认启动程序从shell改成tmux了。不过tmux在需要滚屏的时候不太方便，所以，如果终端支持（例如我换用了iTerm），可以开启类似于“Save lines to scrollback ...”功能，这样就可以继续通过滚屏看历史记录。

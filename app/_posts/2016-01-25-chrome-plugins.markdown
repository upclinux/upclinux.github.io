---
layout: post
title:  "Chrome插件推荐"
author: vjudge1
categories: 系统维护
tags: ["插件"]
---
* contents
{:toc}

记录一些我在Chrome浏览器使用的插件。

Chrome和火狐是最好的浏览器。因为Chromium是开源产品，所以那些国铲浏览器基本上都是IE+Chromium的双核浏览器，而且很多Native WebApp也基于Chromium，例如Atom编辑器（还有Node.js）。





# RSS

以前每天都会刷[某神](http://www.lihuanyu.com)的博客，看看有没有什么新文章，直到注意到了RSS。通过RSS订阅博客或什么东西，就没有必要自己手动去刷动态了——有新内容程序会自动提示。

一个比较好的RSS插件是`RSS Feed Reader`：添加之后地址栏右面会有RSS的标志，如果页面可以通过RSS订阅，图标上会出现一个加号。有新动态的时候也会有提示，可以直接阅读。

不过，因为手头有两个电脑和一堆操作系统，而这个插件需要花钱才能在云端同步，所以再推荐一个插件，`Inoreader`，它就是云端服务，而且抓取频率也不错。Feedly是类似的服务，但是不花钱的话它每隔两三个小时才抓一次。

使用云端服务有一个小小问题：墙。如果像我一样已经意识不到自己在翻墙，可以无视这个问题。

{% callout %}
#### 社交网站

国外很多网站都支持RSS，包括维基百科（监视列表）和社交网站Facebook。不过国内网站就不行了，例如微博不提供RSS功能，而且不小心被女神<span class="blackout">曾经是男神</span>拉黑了（目测是被当作广告账号了），所以怎样才能科学地关注女神呢？答案——[微博档案](http://sinacn.weibodangan.com/)，从这个网站上面订阅微博。
{% endcallout %}

# gooreplacer

既然自己都意识不到自己在翻墙，还要这个插件做什么呢？

可以用来在Chrome上登录那个只支持旧版IE的教务系统！就像[这样](/2015/05/29/let-jiao-wu-xi-tong-support-linux.html)！

如果想给某个网站（例如只支持IE，或者有什么限制）打补丁，或者某网站经常用但是CDN因为墙而无法正常访问，你还不是站长，可以试试这个插件。

稍微提一下，可以把hack之后的文件放到GitHub Pages上面。

# 印象笔记

在网上看到篇不错的文章，当然要保存下来！

我用的是Evernote。在浏览器上装个插件，看到不错的东西时，直接点“剪藏”就可以决定保存什么东西了。

由于审查的原因，Evernote有两套账号，分为国内版和国际版。如果不需要像异见人士那样公开地贴出自己的笔记，用国内版（印象笔记）就行了。国内版就是比国内版少个公开分享，而且国际版经常掉线。

其实OneNote也可以，只不过嫌它占地方而已。（提示：OneNote有OCR，可以扫图片上的文字）

# Tampermonkey

这个插件本意是提供无障碍访问。它可以在网页加载之后运行用户自定义脚本。

既然我们没有障碍，那么能做什么事儿呢？

反正我拿它下载Youtube视频，[虽然代码不是自己写的](https://sf-addon.com/helper/chrome/helper.user.js?ts=1453720999)……（因为Google禁止一切能够下载Youtube视频的插件，所以他们只能“曲线救国”。当然，这段代码也无法通过Chrome下载）

# DevDocs

其实[DevDocs](http://devdocs.io)是一个网站，不过Chrome可以好心地帮你把这个网站放到LaunchPad上面。

通过HTML5的LocalStorage，DevDocs支持离线浏览。

这个网站有两个小问题：一个是墙，一个是没有Java和ASP.NET的文档！

# Adblock Plus

我不屏蔽广告，所以差点把这个插件忘了……

# Proxy SwitchySharp

用于给浏览器设置代理。支持多种代理，包括PAC。

因为我给整个系统都设了PAC所以没装。

# 开发人员工具

这不是插件但很重要……

# 其他

既然能看得懂残体字，为什么不到知乎上面看看[网友的回答](https://www.zhihu.com/question/19594682)呢？

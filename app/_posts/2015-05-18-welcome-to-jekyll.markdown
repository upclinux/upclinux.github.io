---
layout: post
title:  "欢迎使用 Jekyll! ——新博客建立"
author: vjudge1
date:   2015-05-18 14:23:38
categories: 社团工作
tags: GitHub
---
终于找到了一个免费、靠谱又方便【码农】使用的博客。

感谢 [GitHub Pages](https://pages.github.com)。这个东西就是用来建静态博客的。还要感谢 [Jekyll](https://github.com/jekyll/jekyll)，前者是免费空间，后者是免费建站。

为什么不用 WordPress 呢？需要服务器啊，而且，要知道，服务器费用是不可能给报销的。还有一个重要原因，文章本身是支持 Markdown 语法的纯文本文件，感觉写代码写脚本比用那些图形化编辑器舒服多了，毕竟是在 Linux 环境下折腾过的码农。

博客的[代码](https://github.com/upclinux/upclinux.github.io)是完全公开的。博客的主题是基于 Bootstrap 框架而自行设计的，当然任何人都可以按照自己意愿来进行修改。主题还需要不断完善，`欢迎到 GitHub 项目页面提交 Issue`。






*Jekyll 官方不支持 Windows。由于文件名和文件内容的汉字编码的问题（Windows 默认使用 GB2312 编码，而 Linux/Mac 均使用 UTF-8 编码），请尽量避免在 Windows 下编辑和管理博客。*

    -_-||

*以下是经过改动的翻译。*

你可以在项目的`_posts`目录里发现这篇文章。直接编辑然后重新“编译”来查看更改。你可以用很多种方法来“编译”，但是人们用得最多的还是输入 `jekyll serve`，因为这样正好可以启动一个小型 Web 服务器，然后你就可以直接从浏览器来查看了。

如果想添加文章，只需要在 `_posts` 目录里添加一个形如 `YYYY-MM-DD-标题.markdown` 的文件，然后在文件前面加一些必要的头部代码。如果不知道该加什么，可以仿照这篇文章来写。

Markdown 是一种轻型的排版语言。GitHub 有很多地方支持这种语言，并且，支持 Markdown 的编辑器也有很多。相比于其他语言，Markdown 并不难学。

Jekyll 支持代码高亮：

{% highlight c %}
#include <stdio.h>

int main(int argc, char *argv[])
{
    printf("Hello, world!\n");
    return 0;
}
{% endhighlight %}

阅读 [Jekyll 文档][jekyll] 来了解如何使用 Jekyll。如果发现 bug 或者想添加什么功能，请到 [Jekyll’s GitHub repo][jekyll-gh]. 如果有什么疑问，请到 [Jekyll’s dedicated Help repository][jekyll-help].

[jekyll]:      http://jekyllrb.com
[jekyll-gh]:   https://github.com/jekyll/jekyll
[jekyll-help]: https://github.com/jekyll/jekyll-help

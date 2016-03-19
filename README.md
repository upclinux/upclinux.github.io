关于
===

[点击此处](https://upclinux.github.io)访问博客。

这个博客的主题由[李思洋](https://github.com/vjudge1)基于[Bootstrap](http://getbootstrap.com)和[jQuery](https://jquery.com)设计的。使用[Jekyll](http://jekyllrb.com)作为静态博客，托管在[GitHub Pages](https://pages.github.com)上面。

博客通过[Grunt](http://gruntjs.com/)生成和部署。切换到`dev`分支即可查看源代码。

## 许可协议

[![by-nc-sa](https://i.creativecommons.org/l/by-nc-sa/4.0/88x31.png)](http://creativecommons.org/licenses/by-nc-sa/4.0/)

本博客采用[知识共享署名-非商业性使用-相同方式共享 4.0 国际许可协议](http://creativecommons.org/licenses/by-nc-sa/4.0/)进行许可。

## 如何编辑博客

### 配置环境

首先需要安装Node.js和Ruby，然后执行

    bundle install
    npm install
    bower install

接下来修改`_config.yml`即可。

模版可以基于协议使用，但是请不要随便偷窃别人写的文章！

### 撰写

模板都是设计好的，基本上只改_config.yml和博客内容就OK了。

博客文本都放在了`app/_posts`目录中。博客文件的文件名要遵循`YYYY-MM-DD-标题.markdown`的格式，否则系统不识别。

文件名可以使用中文，但是不要这样做。

文件必须使用无 BOM 的 UTF-8 编码。推荐使用Sublime Text一类编辑器编辑。

博客文件要有一个 YAML 格式的头部。如果不知道是啥，可以仿照其他博客改写：

    ---
    layout: post
    title: "Linux Show & 第一次纳新"
    author: vjudge1
    categories: 活动
    tags: 图书馆 展示
    ---

如果需要目录，在头部后面紧跟以下两行：

    * contents
    {:toc}

在宽屏情况下，目录会显示在页面右侧并且自动跟踪。窄屏时按顶端按钮即可显示目录。

正文要使用 Markdown 语言来编写。如果不知道 Markdown 是啥，[这里](https://guides.github.com/features/mastering-markdown/)有一份简短的说明。如果对 e 文不感冒，可以仿照其他博客来改写，毕竟这门语言是门轻型描述性语言，并不是很难学。

### 改主题

Jekyll 采用 Liquid 模板语言，这门语言虽然不像那些动态语言一样强大（毕竟是静态博客），但是仍然可以非常自由灵活地定制博客。

* [Jekyll 的文档](http://jekyllrb.com/docs/home/)
* [Liquid 的基本语法](https://github.com/Shopify/liquid/wiki/Liquid-for-Designers)

在这里，你必须要会 e 文了，而且计算机鹰语就那么点单词，很好学的。

## 本地预览和部署

本地预览：

    grunt serve

部署：打开`Gruntfile.js`，将里面的用户名改为你自己的名称，然后

    grunt deploy

生成的内容会被放到master分支里。

不要忘了把dev分支的修改也提交上去。

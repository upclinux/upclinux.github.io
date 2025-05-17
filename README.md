# 博客信息

你正在阅读：新版 README.md | [旧版 README.md](README-old.md)

## 关于

[点击这里](https://upclinux.github.io)访问博客。

这个博客的主题由[李思洋](https://github.com/vjudge1)基于 [Bootstrap](http://getbootstrap.com) 和 [jQuery](https://jquery.com) 设计的。使用 [Jekyll](http://jekyllrb.com) 作为静态博客，通过[Grunt](http://gruntjs.com/)生成和部署，托管在 [GitHub Pages](https://pages.github.com) 上面。

如需查看博客源代码，请切换到 `dev` 分支。

## 许可协议

[![by-nc-sa](https://i.creativecommons.org/l/by-nc-sa/4.0/88x31.png)](http://creativecommons.org/licenses/by-nc-sa/4.0/)

本博客采用[知识共享署名-非商业性使用-相同方式共享 4.0 国际许可协议](http://creativecommons.org/licenses/by-nc-sa/4.0/)进行许可。

# 如何参与编写博客

请先 Fork 本仓库。

如果你需要在自己的设备上编写，**或是**想要预览写完后的效果，则你需要阅读以下所有小节。

如果你不需要预览效果，**并且**只想在 GitHub 上在线编辑文章，则你可以从[撰写博客文章](#撰写博客文章)小节开始阅读。

一般情况下，编写完博客文章后**最好**预览效果，检查网站是否正常展示文章。

## 基本环境配置

首先，你需要安装 Node.JS 和 Ruby。安装后，将项目下载下来，并且在项目目录下打开终端。接着安装 Bundler 和 Bower

```bash
# 安装 Bundler
gem install bundler
# 全局安装 Bower
npm install -g bower
```

安装期间，如果一直没有任何反馈，请检查网络环境或使用镜像源。

安装完毕后，执行

```bash
bundle install
npm install
bower install
```

将会安装运行和构建本博客所需要的包。同样，如果遭遇网络问题，请检查网络环境或使用镜像源。

## 撰写博客文章

在撰写文章之前，请先切换到 `dev` 分支，`master` 分支由 GitHub Action 自动生成，无需人工干涉。

如果你需要新建一篇博客文章，请在 `app/_post` 下建立文件，文件名遵循 `yyyy-MM-dd-标题.markdown` 格式。

文件建立后，在开头增加以下内容

```yaml
---
layout: post
title: "Linux Show & 第一次纳新"
author: vjudge1
categories: 活动
tags: 图书馆 展示
excerpt:
---
```

上述内容为 [Front Matter](https://jekyllrb.com/docs/front-matter/)，各行含义如下

- `layout` 部分不建议做任何修改，除非你明确知道你在做什么。

- `title` 部分为你的文章标题。

- `author` 部分为作者署名，写上你的名字即可（不必实名）。

- `categories` 部分为文章分类。

- `tags` 部分为[文章标签](https://upclinux.github.io/tags/)。

- `excerpt` 部分为文章摘要，显示在博客首页。你可省略这一行，也可以在上面写上文章摘要。请注意，如果你留空或是省略这一行，那么请在第一段之后留空**至少三行**，否则文章摘要将默认显示整篇文章，影响博客观感。

如果你想为本文章启用目录功能，请在 Front Matter 后加入如下内容

```bash
* contents
{:toc}
```

你可以选择不启用此功能。

尽管步骤略显繁琐，但你仍然坚持到了这里，现在终于可以开始写文章了。

### 注意事项

虽然 `.md` 格式亦可正常识别，但为了保持格式统一，仍然建议使用 `.markdown` 格式。

文件名可以使用中文，但并不建议这么做。

## 预览

写完文章后，你可以执行如下命令进行测试

```bash
grunt serve
```

这将在本地运行博客，你可以访问[localhost:9000](http://localhost:9000)来打开本地博客，预览效果。

预览期间，如果你修改了文章或者是别的文件，Grunt 都会自动读取并重新生成，因此你无需频繁重启 Grunt 服务。

如果想要停止，按 **Ctrl**+**C** 来停止运行。

## 投稿

确认一切无误后，你可以通过 GitHub 发起 Pull Request。请注意，你只需要为 `dev` 分支发起 PR，一旦通过，GitHub Action 会自动构建 `dev` 分支并推送到 `master` 分支。

到这里，你就完成了撰写博客文章所需要做的一切工作。

# 更进一步

如果你不满于单纯编写博客，而是希望修改主题，请参考

- [Jekyll 的文档](http://jekyllrb.com/docs/home/)
- [Liquid 的基本语法](https://github.com/Shopify/liquid/wiki/Liquid-for-Designers)

---
layout: post
title:  "Atom编辑器插件推荐"
author: vjudge1
categories: Programming
tags: ["插件"]
---
* contents
{:toc}

Atom是由GitHub推出的文本编辑器，虽然比新一代的编辑器之神Sublime Text逊色一些，但毕竟不要钱也不弹窗（Sublime Text可以在不花钱的情况下无限期试用，只是偶尔会跳弹窗让你掏钱），就一直用了。

即使用其他编辑器，有些内容也值得看一下，尤其是有:kissing_heart:的——在别的编辑器中很可能有类似或同名（甚至同作者）的插件。

暂时写这些。如果以后发现了哪个插件也不错，或者在生产时用上了，我会接着补充。（2016.1.25）




# 语言无关

## 必备插件

* `atom-fix-path`：Atom编辑器在Mac系统中有个bug（不能正确获取PATH变量的值），可以通过这个插件修复。
* `highlight-selected`和`minimap-highlight-selected`：选中变量之后，文件中其他相同变量名均被高亮。
* :kissing_heart:`minimap`：代码地图，必备插件。
* :kissing_heart:`script`：必备插件——随手写了一段代码，然后轻轻一按<kbd>⌘I</kbd>（<kbd>Ctrl+I</kbd>），代码就执行了！支持多种脚本语言，还支持C语言等（仅限于Mac）。它还支持自定义运行参数，以及“运行到光标处”（仅限部分语言）。
    * 目前该插件还不支持从stdin读入，所以不要用此插件运行需要输入的程序。
* `terminal-plus`：在编辑器底下会出现一个“＋”，点击之后，一个shell，很方便。
* :kissing_heart:`vim-mode`和`ex-mode`：谁才是“编辑器之神”？Vim！（因为Vim对于中文输入而言不太方便所以我没使用）
* `atom-beauity`：代码美化只在<kbd>⌃⌥B</kbd>（<kbd>Ctrl+Alt+B</kbd>）一瞬间。

## 其他

* `aligner`：按下<kbd>⌃⌘/</kbd>（<kbd>Ctrl+Alt+/</kbd>），多行代码立马按等号对齐。对于SCSS、Python等语言还有对应插件，装完支持更多的对齐。
* `build-tools`：允许运行自定义工具（方便编译等）。编译和运行出现错误之后可以帮助定位。
* :kissing_heart:`dash`：如果电脑上装了Dash、Zeal或Velocity（查询函数用法的软件），只要按下<kbd>⌃H</kbd>（<kbd>Ctrl+H</kbd>），这个插件就会帮你直接在那些软件中查函数用法。如果用双屏显示器，可以按<kbd>Shift</kbd>避免编辑器失去焦点。
* `git-plus`：不用手动敲Git命令了。
* `todo-manager`：帮你管理代码里的TODO、NOTE、FIXME。支持自定义规则，所以也可以用fuck调试，然后用这个插件定位和清除调试代码。需要安装`bottom-dock`插件才能使用。
* `Sublime-Style-Column-Selection`：有时候块选很有用，装上这个插件，就可以按住<kbd>⌥</kbd>（<kbd>Alt</kbd>）键拖动鼠标来块选。
* `pigments`：自动将代码中各种表示颜色的符号染色。在“命令面板”中还可以找到其他与颜色有关的功能（以Pigments开头），例如显示调色板、列举代码中出现的所有颜色、转换颜色值为其他形式。

{%comment%}
## 博客（GitHub Pages）

写博客用。

* `autocomplete-emojis`：用于输入绘文字，例如:ghost:。不过，对于母语为中文的人来说，需要先知道那些表情的英文名才行。
* `jekyll`：？？？？？？？？（对中文支持似乎有问题）
{%endcomment%}

# 按编程语言分

不要一下子全都装上——本来Atom启动就慢，再装一大堆插件，简直没法用了……

如果都装上了，可以选择性地禁用和启用某些插件。安装`package-list`插件之后操作会更快一些。

很多流行语言和框架都有Snippets（片段）。如果经常用某个框架，不妨到Atom官网上搜一下，把代码片段装上，也好在编码时节省时间。

## HTML/CSS/JavaScript

装完下面的插件，大概能避免购买或使用盗版的WebStorm。

### HTML

大家都知道HTML标签很啰嗦，所以应该没有人愿意这样写代码：

{% highlight html %}
<div class="panel">
    <div class="title">
        <p>Title</p>
    </div>
    <div class="content">
        <p>Line1</p>
        <p>Line2</p>
        <ul>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
        </ul>
    </div>
</div>
{% endhighlight %}

如果能像CSS选择器一样写，一按Tab自动产生HTML代码，该多好：

    div.panel>(div.title>p{Title})+(div.content>p{Line1}+p{Line2}+ul>li*5)

所以，快装:kissing_heart:`emmet`插件！

这是一个专为写前端的人设计的编辑器插件，可以到[官网](http://emmet.io/)上面稍微学一下这个插件的用法。

还有，Atom居然对HTML标签无动于衷！所以快装`autoclose-html`插件，敲完标签之后自动闭合（还有一个`tag`向Sublime Text致敬，是一键<kbd>⌥⌘.</kbd>手动闭合）。

### JavaScript

* :kissing_heart:`atom-ternjs`：以TernJS为后端的JavaScript自动提示。在使用之前需要按照说明稍微配置一下，然后才能用于jQuery、Angular.js、RequireJS、Node.js、Express.js等乱七八糟的js。
    * 此外`you-complete-me`也支持js，不过它的配置比较麻烦，而且需要手工装ternjs。
* :kissing_heart:`linter-jshint`：检查代码不规范之处，具体配置方法可以看插件文档。需要同时安装`linter`插件。

#### Node.js

`atom-ternjs`支持Node.js，也支持Express.js等框架，不过需要按照插件文档手动安装一下支持文件。此外也可以到[npmjs.org](https://npmjs.org)上面查以“Tern”开头的插件以获得更多支持。

* 安装`atom-jade`可以给jade加语法高亮，不过没有自动完成功能。

#### TypeScript

:kissing_heart:`atom-typescript`，官方出品，不解释。

#### CoffeeScript

TernJS不支持CoffeeScript。有人曾经想通过Hack的形式让tern支持CoffeeScript，不过tern官方不打算支持，而且那个项目烂尾了……

* `coffee-complete`：可以一键把CoffeeScript代码编译成JavaScript代码。

{%comment%}
### 预览

不必非要去浏览器中预览。

`preview-plus`就是一个能够实时预览的插件。需要`browser-plus`插件配合使用。
{%endcomment%}

## Python

（未完待续）

大概能避免花钱买PyCharm了。

* `autocomplete-python`：Python的自动完成功能。支持Django等。也可以使用YouCompleteMe，具体装法见后文。
* `linter-flake8`：Python语言的Linter。需要通过pip安装flake8（通过手工指定路径来切换2和3），然后通过apm安装linter。
* `python-nosetests`：按下<kbd>F5</kbd>，自动开始测试。测试框架是nose，所以需要事先通过pip装好。至于如何区分2和3，这就需要看文档了。
* `atom-python-debugger`：一键插入和删除`ipdb.set_trace()`语句。需要通过pip安装ipdb。

## PHP

## Ruby

## C/C++

### YouCompleteMe

Vim有一必备插件，叫做:kissing_heart:“YouCompleteMe”，后来作者把插件核心功能做成API，就可以给其他编辑器用了，比如在Atom中这个插件叫做`you-complete-me`。

这个插件的配置比较麻烦，可以参照[YouCompleteMe说明](https://github.com/Valloric/YouCompleteMe)和[ycmd说明](https://github.com/Valloric/ycmd)来配置一下。下面是一些注意事项：

1. 网上很多教程都是基于Vim的，不过换成别的编辑器也没啥太大区别，照做就行了。
2. 需要clang编译器。
3. Mac系统自带的Python是2.6的，插件会直接崩掉，所以需要装2.7（不要用3），然后让程序走2.7。如果嫌麻烦，也可以直接把系统自带的Python换掉，不过对于10.11系统来说，得先把SIP功能屏蔽，要不然即使有root也改不了。
4. 在家目录中放一个`.ycm_extra_conf.py`。可以参照`~/.vim/bundle/YouCompleteMe/cpp/ycm/.ycm_extra_conf.py`修改。

## Go

## ASP.NET

`you-complete-me`是一个代码完成插件，支持C#，不过配置比较麻烦（具体装法看前文，需要事先把Mono装好）。所以不如用其他原生支持ASP.NET的跨平台的开发环境，例如：

* Xamarin Studio（在Linux中叫做MonoDevelop）
* Visual Studio Code（官方出品，不过目前还是Beta版）

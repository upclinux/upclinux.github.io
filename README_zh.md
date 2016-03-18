关于
===

[点击此处](https://vjudge1.github.io)访问博客。

这个博客的主题是我自己基于[Bootstrap](http://getbootstrap.com)和[jQuery](https://jquery.com)设计的。使用[Jekyll](http://jekyllrb.com)作为静态博客，托管在[GitHub Pages](https://pages.github.com)上面。

博客通过[Grunt](http://gruntjs.com/)生成和部署。切换到`dev`分支即可查看源代码。

## 许可协议

[![by-nc-sa](https://i.creativecommons.org/l/by-nc-sa/4.0/88x31.png)](http://creativecommons.org/licenses/by-nc-sa/4.0/)

本博客采用[知识共享署名-非商业性使用-相同方式共享 4.0 国际许可协议](http://creativecommons.org/licenses/by-nc-sa/4.0/)进行许可。

## 本地运行

首先需要安装Node.js和Ruby，然后执行

    bundle install
    npm install
    bower install

接下来修改`_config.yml`即可。

模版可以基于协议使用，但是请不要随便偷窃别人写的文章！

## 调试和部署

调试：

    grunt serve

部署：打开`Gruntfile.js`，将里面的用户名改为你自己的名称，然后

    grunt deploy

生成的内容会被放到master分支里。

## I18n

Replace `app/_data/i18n.yml` with `en.yml` and the blog will have English interface.

## 感谢

我“剽窃”了这些人的代码——

* [Gao Haoyang](https://github.com/Gaohaoyang/gaohaoyang.github.io)
* [Liberize](https://github.com/liberize/liberize.github.com)
* [Oleh](http://o.zasadnyy.com/blog/optimized-jekyll-site-with-grunt/)

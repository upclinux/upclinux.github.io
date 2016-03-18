About
===

[点此查看中文版](https://github.com/vjudge1/vjudge1.github.io/blob/dev/README_zh.md)

[Click here](https://vjudge1.github.io) to visit the blog.

This is my personal blog. It's created by [Jekyll](http://jekyllrb.com) and hosted on [GitHub Pages](https://pages.github.com).

I designed this theme with [Bootstrap](http://getbootstrap.com) and [jQuery](https://jquery.com).

The site is deployed via [Grunt](http://gruntjs.com/) now, switch to `dev` branch to checkout the source code.

## Installation

Install Node.js and Ruby, then execute

    bundle install
    npm install
    bower install

Then modify `_config.yml` and do NOT steal my posts...

## Debug and deploy

Debug:

    grunt serve

Deploy: Open Gruntfile.js, change to your GitHub account, and

    grunt deploy

## I18n

用`app/_data/zh_CN.yml`或`app/_data/zh_TW.yml`替换i18n.yml，即可变为中文。

Replace `app/_data/i18n.yml` with `en.yml` and the blog will have English interface.

## Thanks

Thanks for these authors for some codes:

* [Gao Haoyang](https://github.com/Gaohaoyang/gaohaoyang.github.io)
* [Liberize](https://github.com/liberize/liberize.github.com)
* [Oleh](http://o.zasadnyy.com/blog/optimized-jekyll-site-with-grunt/)

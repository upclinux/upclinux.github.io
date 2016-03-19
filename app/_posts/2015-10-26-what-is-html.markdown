---
layout: post
title: "HTML5+CSS3那点事"
author: cheney
categories: 做网站
tags: UPC
---
* content
{:toc}

十年前做网站是一个非常奢侈的活，那时候没有什么工具，也没有什么一键搭建环境，而且服务器很贵，上网的人不多，所以需求也不大。

但是现在不一样了，各种编网页的工具还有自动化的东西也都有了。而且鼓励创新创业，所以基本上人人都可以免费拥有一个网站。





这些真的很简单，主要就是

1. HTML5标准的一个网页应该是什么样的
2. 怎么用CSS
3. 怎么查[工具书网站](w3school.com)
4. 丢掉IE 6 7 8吧

# 一、HTML5是什么鬼

HTML是一种解析性的语言。我们用它不是因为它好看，而是因为它能让我们控制浏览器。如果你不使用HTML语言，那浏览器是不知道该拿你写的这些东西怎么办的。我在讲的时候就示范了一下，你在记事本写好几段文字，但是传上去就是一大坨文字。浏览器不知道哪儿该换行，所以他就把所有的东西都直接输出到正文部分了。

当然啦，和C语言相比他有着本质的不同——它简单得很。你也别指望用HTML去算哪怕是1+1这种东西。

你唯一能控制的，其实就是一堆零散的标签。HTML也就全是这些标签。

## 来写一个自我介绍吧

下面是一个简单地自我介绍的示范：

{% highlight html %}
<!doctype html>
<html>
    <head>
        <meta charset="UTF-8"></meta>
        <title>Cheney的自我介绍</title>
    </head>
    <body>
    	<h1>这是Cheney的自我介绍</h1>
    	<p>大家好，我是Cheney。这是一个自我介绍。</p>
    	<p>
    		下面是我的联系方式</br>
    		<address>QQ:1152668787</address>
    		<address>电话：加Q以后自己来问</address>
    	</p>
    	<footer>
    		<ul>
    			<li><a href="http://wangchenyu.net.cn">微晨风景</a><li>
    			<li><a href="http://www.itmanbu.com">IT漫步</a><li>
    			<li><a href="http://zuidi.me">最低么</a><li>
            </ul>
        </footer>
    </body>
</html>
{% endhighlight %}

下面解释一下这个网页：

1. 首先是`<!doctype html>`声明和`<html>`标签，表明这是一个html文件(网页)。
2. 然后是`<head>`标签，`<head>`标签的内容是不在浏览器主窗口显示的。
3. `<head>`里面的`<meta>`标签的`charset属性`指定了这个网页的字符集是`UTF-8`，防止在一些愚蠢的的浏览器中显示乱码。
4. `<title>`标签指定了浏览器的标题栏里面写些什么。比如“百度一下，你就知道”。
5. `<h1>~<h6>`标签指定了多级标题。
6. `<p>`标签里面放的是一个一个段落。
7. `<address>`标签是为了指定这是一个联系方式。
8. `<footer>`标签指定了页脚。
9. `<ul>、<li>、<a>`标签是为了插入一组超链接。

当然了，这些标签你都可以丢掉，只留下你想要的内容在网页上。不过要是在生产环境中你这么干，很可能你就被炒鱿鱼了。我们之所以要用这些标签，是为了让我们的网页显得专业，不要让人家一眼就看出来“这是一个外行写的”。

# 二、CSS的作用

因为只用html写出来的网页很丑，所以我们需要给那些标签加一些`样式`才行。这就是CSS要干的事。

在`<head>标签`里面加上`<style>标签`然后写一些样式，我们还是先用例子说事：

{% highlight html %}
<!doctype html>
<html>
    <head>
        <meta charset="UTF-8"></meta>
        <title>Cheney的自我介绍</title>
        <style>
        .class1 {
                 background-color:black; 
               } 
        </style>
    </head>
    <body>
    	<h1 class="class1">这是Cheney的自我介绍</h1>
    	<p>大家好，我是Cheney。这是一个自我介绍。</p>
    	<p>
    		下面是我的联系方式</br>
    		<address>QQ:1152668787</address>
    		<address>电话：加Q以后自己来问</address>
    	</p>
    	<footer>
    		<ul>
    			<li><a href="http://wangchenyu.net.cn">微晨风景</a><li>
    			<li><a href="http://www.itmanbu.com">IT漫步</a><li>
    			<li><a href="http://zuidi.me">最低么</a><li>
            </ul>
        </footer>
    </body>
</html>
{% endhighlight %}

还是上面的自我介绍，只是我加了一个背景为黑的样式。我们可以在任意标签内指定class然后在style里面用.class { background-color:black; } 这种方式来引用。

#三、W3school.com.cn

打开[w3school](http://www.w3school.com.cn)，然后点上面的`HTML/CSS`，再点左侧的`工具书`，然后你就可以看到所有的HTML标签，还有所有的CSS选择器、样式和属性。
需要什么的时候，尽管拿就行了。

#四、关于浏览器

如果在这种科技飞速进步的时代你还在固守着IE，这是一件非常悲哀的事——毕竟微软自己都放弃了。

从IE9开始才支持HTML5，而现在win10中微软不仅把新一代浏览器命名为Edge而且把IE藏到了一个难以找到的角落里。微软的大部分东西都挺好用的，比如Windows，Visual Studio，Office什么的，但是IE浏览器和执行PHP的IIS确实是一个败笔。当然了，我们也要感谢IE。毕竟，没有他我们用什么下载别的浏览器呢？也要感谢IIS，没有它nginx和apache的优势怎么显露呢？

如果你要从事web开发那么你就得在自己电脑上装很多浏览器才行，但是不要乱装。国产浏览器基本上都没有自己的内核，基本上都只是用一个谷歌的内核加一个IE内核套一个自己做的皮罢了。

目前这些浏览器是自己独特的内核：

1. IE浏览器
2. Chrome浏览器(谷歌浏览器)
3. Safari浏览器(苹果浏览器)
4. Firefox浏览器(火狐浏览器)
5. Opera浏览器(欧朋浏览器)

目前这些浏览器`没有`自己的内核：

1. 360安全/极速浏览器
2. 猎豹浏览器
3. 百度浏览器
4. QQ浏览器
5. 遨游浏览器
6. uc浏览器
7. 2345安全/极速浏览器
8. 搜狗浏览器
9. 桔子浏览器
10. 其他国产浏览器

他们的“极速模式”就是用的Chrome内核，“兼容模式”就是用的IE内核。所以不用浪费时间用国产浏览器测试网页兼容性了。
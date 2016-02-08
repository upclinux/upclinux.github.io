---
layout: post
title: "让“强智”教务系统支持 Linux/OS X"
date: 2015-05-29 14:00:08
author: vjudge1
categories: Web
tags: Linux 教务系统
---
* content
{:toc}

*(坚持用 Windows 和 IE 浏览器的可以无视本文。)*

"强智"科技——中国教学教务管理软件领航者！

旧版系统是各种注入，甚至网上[改成绩的教程](http://www.wooyun.org/bugs/wooyun-2012-011355)都直接拿这个系统开刀。虽然教程把学校名称挡上了，不过很明显，就是中国石油大学（华东）。

后来学校升级了教务系统，至少表面上没有注入，不过，只支持旧版本的 IE6 浏览器。微软宣布放弃 XP 之后，学校把系统稍稍修复了一下，支持了其他版本的 IE，但还是不支持其他浏览器（包括 IE11 以及最新的 Edge）。这就意味着……



# 合适的解决方案

1. 最简单的方法：装个虚拟机，或者用别人电脑。
2. 如果纯粹为了看课表查成绩，可以关注`石大助手`或者学校`官方微信`。
3. 自己写爬虫。

那本文要做什么事儿呢？本文旨在找到一种从根本上解决问题的方法。只要行政部门接受这个方法，问题就“算是彻底”解决了。

# 问题出在哪儿

中国绝大多数用户都在用 Windows，而且那些学编程的很多都是在 Windows 下学习，所以那些人脑袋里只有 IE 啊！好在现在都 HTML5 了，都有移动设备了，所以这种现象稍微有所改善。但是你得知道，不是谁都那么与时俱进，所以……

兼容性问题不外乎两方面：一是 ActiveX，二是前端用了不标准的代码 (或者没考虑浏览器兼容性)。

教务系统的 JavsScript 非常不干净。还好教务系统没用 ActiveX，否则无解 (在这里替各大银行感到悲哀)。

# 工具

思路很明显了：找到不标准的代码，主要是 JavaScript，把它改成兼容各种浏览器的。

## Charles

人家不可能让你改服务器上的东西吧？所以为了方便调试，我们需要一个工具——[Charles](http://www.charlesproxy.com)。

Charles 是一个 HTTP 调试工具，可以抓包也可以代理。

代理当然不是用来跨越万里长城的，而是——`偷梁换柱`！一会儿我们就要把服务器的 js 脚本换成我们自己的。

这个软件是要钱的，作为中国人，知道应该怎么解决这个问题吧？不解释了。

## 设置代理

调试的时候需要把 HTTP 代理设置为 http://127.0.0.1:8888。

具体操作不用教了吧？不会？先搞清楚自己用的什么桌面然后去找百度吧……

还是不会？换 Firefox 浏览器！那个可以单独设置代理。

## 劫持

1. 下载一个文件 [http://jwxt.upc.edu.cn/jwxt/js/core.js](http://jwxt.upc.edu.cn/jwxt/js/core.js)。把它存到一个合适的地方。
2. 打开 Charles。
3. 登一下教务系统，然后会看到一个提示——“不能创建对象！”一会儿我们就让它能创建对象。
4. 切换到 Charles，可以看到 jwxt.upc.edu.cn。

   ![jwxt](/img/2015-05-29-jwxt/jwxt.png)

5. 右击 `core.js`，选择 `Map Local...`，把弹出对话框的 `Local Path` 设置成你刚才下载的那个脚本。

   ![map](/img/2015-05-29-jwxt/map.png)

   建议清除一下浏览器缓存，并且在调试期间禁用缓存。现在再访问教务系统，core.js 就是你自己的版本了。

# 修改

现在只有一些小的改动，所以改完之后并不是 100% 兼容，很多功能仍然用不了，但是至少能进去查成绩了。

## /jwxt/js/core.js

* 在代码最开始加入：

{% highlight javascript %}
if (!window.ActiveXObject) {
    XMLDocument.prototype.selectNodes = Element.prototype.selectNodes = function (xpath) {
        if (typeof XPathEvaluator !== 'undefined') {
            var xpe = new XPathEvaluator();
            var nsResolver = xpe.createNSResolver( this.ownerDocument == null?this.documentElement : this.ownerDocument.documentElement);
            var result = xpe.evaluate(xpath, this , nsResolver, 0 , null );
            var found = [];
            var res;
            while (res = result.iterateNext())
                found.push(res);
            return found;
        } else {
            // IE11 既不支持 selectNodes，又不支持 evaluate
            var x = xpath.split('/');
            if ( !x || x.length < 2) return null;
            var found = this.querySelectorAll(x[1]);
            for (var i=2; i<x.length; i++) {
                found = found[0].querySelectorAll(x[i]);
            }
            return found;
        }
    }
    XMLDocument.prototype.selectSingleNode = Element.prototype.selectSingleNode = function (xpath) {
        var x = this.selectNodes(xpath)
        if ( ! x || x.length < 1 ) return null ;
        return x[ 0 ];
    }
}
{% endhighlight %}

* 往下找 send_request 函数。这里有一个笑点——`if (什么什么 && 1 == 2)`。那么，里面的代码就算等到中国足球夺冠之后也执行不了吧……

  找到 `if(window.XMLHttpRequest && 1==2 )`，把 `&& 1==2` 直接去掉。

* 还是这个函数，从 `var topXml = ...` 开始，一直到函数结束，把所有 `.text` 全部换成 `.nodeValue`。一共三组（这三组有注释，分别写作“加载顶层菜单开始”、“加载一层菜单开始”和“加载二层菜单开始”）。

## 全校课表查看（未解决）

由于这部分代码是动态生成的，所以无法采用替换文件的方式来调试。经过粗略分析，大致是以下位置出现错误：/jwxt/jiaowu/tkgl/queryKbByXzbj1.jsp 以及同一目录中的其他类似文件（如 queryKbByTeacher 等）。

这些文件中（由于 jsp 是动态语言，因此实际内容不一定正好在这个文件中。但是生成的结果就在这里体现）有一系列 document.getElementById，然而其中的 id 并不存在。在操作这些并不存在的 DOM 元素时发生了错误，后面代码不再执行，因此无法获取全校课表。

一个有效的修改办法是加入防错处理，或者直接忽略错误。不过目前我还没有在语言层面上找到解决办法。

## 选课（未解决）

虽然选择界面中 js 脚本也是动态生成的（分别为 /jwxt/jiaowu/xkgl/xsxkjmxs_tree.jsp 和 xsxkjmxs_frame.jsp），无法直接更改。不过，因为错误是采用了一个已经过时的 window.showModalDialog()，所以可以从语言层面上打补丁。

此外 /jwxt/js/jspublic.js 也多处用到了这个函数。

事实上，这个函数并不一定导致错误（在 Firefox 中可正常使用）。但是，因为 Chrome（Chrome 内核）、Opera 等浏览器不支持，而且没有替代品，所以此问题依然很严重——必须采用其他技术来进行窗口之间的交互，因此需要很大的改动才能彻底解决问题。

## 其他已知但未分析的问题

* “任务栏”不能正常恢复窗口。
* 凡是出现“对话框”的，例如选课、查看成绩中的平时分，在 Chrome 和 Opera 中均无效（前文已解释原因）。

# 重要提示

由于教务系统是一群不顾质量的码农开发的，并且网站本身未使用 HTTPS、密码明文传输，所以建议大家在使用教务系统的时候，不要设置与其他重要账户相同的密码，以免重要账号被端。

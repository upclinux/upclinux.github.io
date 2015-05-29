---
layout: post
title: "让“强智”教务系统支持 Linux/OS X"
date: 2015-05-29 14:00:08
author: vjudge1
categories: 中文文章 web
tags: Linux 教务系统
---

* content
{:toc}

*(坚持用 Windows 和 IE 浏览器的可以无视本文。)*

我已经懒得吐槽"强智"教务系统了。

旧版系统是各种注入，甚至网上改成绩的教程都直接拿这个系统开刀（一看校徽就知道是华东的某个石油大学）。

后来学校把教务系统“升级”了，至少表面上没注入了。不过，只支持旧版本的 IE6/7/8 浏览器。好在学校修复了一下，支持了 IE9/10/11，不过还是不支持其他浏览器，这就意味着，Linux 和 OS X 的用户不能愉快地玩耍了。



## 合适的解决方案

1. 最简单的方法：装个虚拟机，或者用别人电脑。
2. 如果纯粹为了看课表查成绩，可以关注`石大助手`或者学校`官方微信`。
3. 自己写爬虫。

那本文要做什么事儿呢？仅仅是探索一下，并不打算解决问题。毕竟，得罪行政部门无异于自取灭亡。

## 问题出在哪儿

中国绝大多数用户都在用 Windows，而且那些学编程的很多都是在 Windows 下学习，所以那些人脑袋里只有 IE 啊！

好在现在都 HTML5 了，都有移动设备了，所以这种现象稍微有所改善。但是你得知道，不是谁都那么与时俱进，所以……

兼容性问题不外乎两方面：一是 ActiveX，二是前端用了不标准的代码 (或者没考虑浏览器兼容性)。还好教务系统没用 ActiveX 要不然就无解了 (在这里替各大银行感到悲哀)。教务系统的问题是后者。

## 工具

思路很明显了：找到不标准的代码，主要是 JavaScript，把它改成兼容各种浏览器的。

### Charles

人家不可能让你改服务器上的东西吧？所以为了方便调试，我们需要一个工具——[Charles](http://www.charlesproxy.com)。

Charles 是一个 HTTP 调试工具，可以抓包也可以代理。

代理当然不是用来跨越万里长城的，而是——`偷梁换柱`！一会儿我们就要把服务器的 js 脚本换成我们自己的。

这个软件是要钱的，作为中国人，知道应该怎么解决这个问题吧？不解释了。

### 设置代理

调试的时候需要把 HTTP 和 HTTPS 代理设置为 http://127.0.0.1:8888。

具体操作不用教了吧？不会？先搞清楚自己用的什么桌面然后去找百度吧……

还是不会？换 Firefox 浏览器！那个可以单独设置代理。

### 劫持

1. 下载一个文件 [http://jwxt.upc.edu.cn/jwxt/js/core.js](http://jwxt.upc.edu.cn/jwxt/js/core.js)。把它存到一个合适的地方。
2. 打开 Charles。
3. 登一下教务系统，然后会看到一个提示——“不能创建对象！”一会儿我们就让它能创建对象。
4. 切换到 Charles，可以看到 jwxt.upc.edu.cn。

   ![jwxt](/images/2015-05-29-jwxt/jwxt.png)

5. 右击 `core.js`，选择 `Map Local...`，把弹出对话框的 `Local Path` 设置成你刚才下载的那个脚本。

   ![map](/images/2015-05-29-jwxt/map.png)

   现在再访问教务系统，core.js 就是你自己的版本了。

## 修改

现在只有一些小的改动，所以改完之后并不是 100% 兼容，很多功能仍然用不了，但是至少能进去查成绩了。

### core.js

* 在代码最开始加入：

		if (!window.ActiveXObject) { 
		    XMLDocument.prototype.selectNodes = Element.prototype.selectNodes = function (xpath) { 
		        var xpe = new XPathEvaluator(); 
		        var nsResolver = xpe.createNSResolver( this.ownerDocument == null?this.documentElement : this.ownerDocument.documentElement); 
		        var result = xpe.evaluate(xpath, this , nsResolver, 0 , null ); 
		        var found = []; 
		        var res; 
		        while (res = result.iterateNext()) 
		            found.push(res); 
		        return found; 
		    } 
		    XMLDocument.prototype.selectSingleNode = Element.prototype.selectSingleNode = function (xpath) { 
		        var x = this.selectNodes(xpath) 
		        if ( ! x || x.length < 1 ) return null ; 
		        return x[ 0 ]; 
		    } 
		} 

* 往下找 send_request 函数。这里有一个笑点——`if (什么什么 && 1 == 2)`。那么，里面的代码就算等到中国足球夺冠之后也执行不了吧……

  找到 `if(window.XMLHttpRequest && 1==2 )`，把 `&& 1==2` 直接去掉。
  
* 还是这个函数，从 `var topXml = ...` 开始，一直到函数结束，把所有 `.text` 全部换成 `.value`。
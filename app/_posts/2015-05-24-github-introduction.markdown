---
layout: post
title: "GitHub 入门"
author: vjudge1
date:  2015-05-24 19:02:00
categories: 活动
tags: GitHub 讲座
---
* content
{:toc}

作为互联网时代的 Coder，如果还不知道 GitHub 是个什么东西，那就 OUT 了！

![octocat](/img/2015-05-24-github-introduction/octocat.png)




以下是讲座本身的内容 (意思一样，但是换了说法)，所以东西有些多。不过真正的干货还是会用`框框`来强调的。

## 问题的由来

GitHub 是全球最大的社交编程网站。

* 说到社交，那么肯定要想到——分享、转发、刷动态、加好友、赞、评论、@、拉黑……GitHub 样样俱全！
* 说到编程，这可是网站的重头戏。我先不说 GitHub 能干什么。我们先通过实例来说明为什么需要 GitHub——

		先说说自己单干的情况。我拿 VS 开发了一个 XXX 管理系统 (不是那种 C 语言“大”作业)。第一天我写了一堆代码，第二天我做了一些修改，第三天我又做了一些修改……过了十天，我发现有一处修改不合适！但是我还哪里记得我这十天都做了哪些具体的改动？过了一个月，有些事我都已忘记……

  再举一个例子，

		我和张三、李四一起参加了 XX 杯软件比赛 (不是 ACM 比赛)，准备开发一个 Android 应用。第一个星期，我写了 A.java，张三写了 B.java，李四写了 C.java。我们特地建了一个 QQ 群 (或者是百度网盘)，把各自的代码复制了一份儿。第二个星期，我们要调试了，我改了 A.java，张三改了 B.java，而李四改了 A.java 和 C.java……我们继续往 QQ 群里传。还好，有些问题可以从 QQ 群里讨论讨论。
		过了一阵子，我们的程序代码有些多了，谁也不记得自己都动了哪些文件，于是每次都是直接把工程打包成 rar 传到群里。知道接下来会发生什么事儿了吧……这尼玛没法好好玩了！

  要是有个什么管理软件，何必这样麻烦？

  如果你正在遭遇或者即将遭遇以上痛苦，那么，今天你知道了 GitHub，你就要解脱了！

### GitHub 的社交属性

因为程序猿码农什么的一般都是男的嘛，所以知乎上面又有人黑程序猿了——既然是社交编程，那就是程序猿的社交。程序猿一般都是男的，所以

![同性交友](/img/2015-05-24-github-introduction/intro1.jpg)

现在说正经的。我们从社交的角度来看看这个网站——

![Linus](/img/2015-05-24-github-introduction/intro2.png)

可以分享代码——其实是可以共同参与的，后面讲怎么操作。认识我的应该都知道我是个点赞狂魔，但是在 GitHub 里我不随便赞，因为有“我赞过的”这个东西而且它还不分页！

![分享代码](/img/2015-05-24-github-introduction/intro3.png)

可以评论——当然可以发帖和跟帖，而且不怕查水表 (但是，不要发和程序无关的东西)。这张图看不出来，实际上你甚至可以对某一行代码进行评论！

![评论](/img/2015-05-24-github-introduction/intro4.png)

下图是我改了别人的代码，然后向作者发了合并请求，结果作者同意合并 (Merged) 了。

![Pull Request](/img/2015-05-24-github-introduction/intro5.png)

### GitHub 的一些特色

1. 发展迅速：过去流行 SourceForge (此网站偶尔会被墙) 和 Google Code (一直被墙)。不过 GitHub 分支代码什么的太方便了，而且，现在是 GitHub 火了。

   最近 SourceForge 开始耍流氓，所以肯定有一大帮用户要走了。

2. 社交化编程：这也是个社交网站，不解释。
3. 版本控制 & 易于协作
4. 易于分支和贡献

### GitHub 的地位

Git 是 Linus 大哥本人发明的版本管理工具。GitHub 则是一个提供 Git 服务的网站。

很多码农靠 GitHub 吃饭。2013 年 1 月 20 日，某个网络设施的管理员千不该万不该把 GitHub 加到了名单里，结果李开复大哥抗议了，微博转发量十万。过了 3 天，GitHub 又能正常访问了。

后来他们的名单越变越长，特别是 2015 年，但是他们再也不敢把 GitHub 添进去了。

## GitHub 的用法

这是讲座的重点内容。一方面要学会如何编辑自己 (同伴) 的代码，另一方面要学会如何发扬雷锋精神，为开源事业做贡献。

### 社交

关注动态 (Watch)、转发 (Fork)、刷动态 (Contributions)、加好友 (Follow)、赞 (Star)、评论 (Issues)……这些不用教了吧？

分享需要装客户端，稍稍麻烦一些。但是一旦学会，就一点都不麻烦了。

### 安装客户端

GitHub 官方有 [Windows](https://windows.github.com) 和 [Mac](https://mac.github.com) 客户端。现在应该没人用 Windows XP 或者 Mac OS X 10.8 了吧？那就不存在兼容性问题了。

GitHub 装完会在桌面上出现个快捷方式。然后就能用了。

第一次打开时要登录自己的 GitHub 账号，然后在`Configure Git`中把自己的名字和邮箱填好。

### 编辑自己的代码

1. 建立项目

   首先你得在网页上建立个项目 (Repository, 仓库)。登录，点击右上角的加号，选择“New repository”。

   接下来会问你项目名和描述，还会问你是否要个 README。不管要不要，反正你都得自己改。

   下面有个“.gitignore”不是问你用什么语言，而是——因为某些语言在调试的过程中会产生一些临时文件和垃圾文件，例如编译出来的程序，如果把这些文件加到版本控制里会引发问题，所以它是用来忽略这些文件的。

2. `Clone in Desktop` (复制到本地)

   进入到项目主页，页面右侧会出现一个`Clone in Desktop`。客户端会自动打开并问你要把代码下载到什么地方。

   注意两个问题：

	1. 既然原来就是个空项目，可不可以直接在本地把程序写好然后提交？答案是否定的，因为你在本地直接建，里面没有版本信息。不过你还是可以先 Clone 你的项目，然后把你的那堆文件拽到那个目录里。

	2. 同样道理，“Download ZIP”也没有版本信息。如果你是为了改完代码重新提交，那么不要用“Download ZIP”，否则无法提交。


3. 编程。这个目录里有个名为“.git”的隐藏文件夹，不要把它删除。

4. `Commit` (确认更改)

   当完成一个任务的时候，比如添加了一个功能，或者修复了一个 bug，我们应该阶段性地保存一下，并且`Commit` (确认更改)。这样也方便追踪更改和撤销，也方便和他人协作。

   在你修改代码之后，客户端会自动检测变化，然后出现`Uncommitted Changes` (等待确认的更改)。右侧是个文件列表，反映了你在这一阶段的改动 (绿色表示添加，红色表示删除)。在`Summary`和`Description`里填些易于理解的、反映你的修改的内容，然后单击`Commit to master` (确认更改)。这一阶段的改动就被保存了。

   ![client](/img/2015-05-24-github-introduction/client.png)

   如果感觉改动不合适，可以`Undo`撤销更改，重新编辑代码，然后重新`Commit`。

   在这一阶段，你可以到网站上面按 F5。很明显，你的这些改动还没有被传到网上。

5. `Sync` (同步)

   在你确认改动都 OK 之后，可以点击右上角的`Sync`按钮，把改动提交到服务器上。

   “Sync”是同步的意思，也就是说，你的改动会被传上去，然后程序也会去获取最新版本。这个提交是双向的。

   再到网站上面按 F5，你可以看到你自己的改动已经被上传了。

### 为他人做贡献

主要有两种方式：一种是 `Issues` (评论)，另一种是改代码并提交给作者 (Send `Pull Request`)。

Issues 不用解释了吧。你可以提交程序的 bug，也可以提意见和建议。当然，不要灌水或者发些与程序无关的东西。GitHub 也是可以拉黑和删评论的。

要是想改别人代码，那么不能直接 Clone 人家的，要不然你没法上传。(毕竟是人家的程序，你不能随便改。) 应该这样玩：

1. 进到别人的项目的主页，点击右上角的`Fork` (分支)。
2. 这个时候那个项目会被复制一份儿，并且变成你自己的。这个时候再点击`Clone in Desktop`。
3. 该怎么编程就怎么编程。
4. 该怎么 Commit & Sync 就怎么弄。但是 Sync 之后发生变化的是你自己手里的副本，不是人家作者的代码。
5. 希望提交给原作者了？进到你这个副本的主页，点击`Pull Request`、`Create Pull Request`，并在评论中写清你做了什么事儿。

   ![PullRequest](/img/2015-05-24-github-introduction/pullrequest.png)

   GitHub 会判断能否直接合并。如果不能直接合并，那就需要交给作者本人来处理了。

6. 等作者的回信儿。

### 协同工作

如果几个人共同维护一个项目，总不能老在那里发 Pull Request 吧？所以——

到项目右侧找`Settings`，接下来点`Collaborators`，输入密码。接下来，你想和谁合作，就把谁的用户名填进去。

### Markdown

Markdown 是一种轻型标记语言，和 HTML 语言有点像但是比 HTML 还要轻型。在 GitHub 中几乎到处都可以用得到。

那 Markdown 语言怎么学呢？你可以多看一些项目的 README (很多项目都有 README.md，就是用 Markdown 语言写的)。见得多了自然就会了。

GitHub 官方也有[教程](https://help.github.com/articles/markdown-basics/)，只要你懂 e 文。

Windows 下可以用 MarkdownPad (需要花钱) 或 Miu 来编辑，也可以用 Visual Studio Code。

	备注：Visual Studio 和 Visual Studio Code 不是同一个东西。后者才支持 Markdown 语言和实时预览。

GitHub 支持一些特殊的符号：

1. emoji：输入 `:`，会弹出一个 emoji 列表。如果你知道某个表情的英文名，那你就可以用了——<code>:ghost<span></span>:</code>:ghost:。
2. <code>:octocat<span></span>:</code> 是 GitHub 喵喵:octocat:。
3. 在 GitHub 里你可以直接 `@` 某人。当然，别滥用 @，免得被别人拉黑。
4. 在 Issues 里可以用 `#` 引用已经发过的帖子，如 `#12`。

## 在 Ubuntu 中玩

GitHub 没有专门为 Linux 出客户端。不过 GitHub 也是 Git，对吧？所以完全可以按照 Git 的玩法来玩 GitHub。

怎么在命令行里用 Git？这里有个非常简单的[入门教程](http://www.bootcss.com/p/git-guide/)。

### 配置 Git

下面是 Git 的配置过程：

1. 安装 Git

		sudo apt-get install git

2. 把名字和邮箱写好：

		git config --global --add user.name "你的昵称"
		git config --global --add user.email "邮箱"

3. 照敲即可：

		git config --global push.default simple

4. 添加个 SSH Key：

		ssh-keygen -t rsa -C "GitHub"
		cat ~/.ssh/id_rsa

   登录到 GitHub，点“Settings” -> “SSH keys” -> “Add key”，然后把屏幕上输出的公(luan)钥(ma)拷进去。

5. 测试

		ssh -T git@github.com

   如果配置成功，应该提示“Hi xxxxx! You've successfully authenticated, but GitHub does not provide shell access.”

   不过，如果提示的是“Agent admitted failure to sign using the key”，那么再补一句：

		ssh-add ~/.ssh/id_rsa

6. 可以用 git clone、git add、git commit、git push、git pull……什么的了。不过别用 git init。

   项目右侧“Download ZIP”那个地方有个“clone URL”，建议用“SSH clone URL”。

### Visual Studio Code

给大家推荐个编辑器，[Visual Studio Code](https://code.visualstudio.com)。虽然和 Windows 10 一样还是技术预览版，不过也比较好用——至少不用为了 Git 而敲命令了。

默认情况下，Visual Studio Code 不能正常显示汉字 (Windows 和 Mac 里都正常)——中国字是方块字，结果中国字真变成“方块字”了。

可以这样解决问题：点击“File”、“Preferences”、“User Settings”，然后在右侧窗口加入一个属性：

	editor.fontFamily: "Droid Sans Mono, Droid Sans Fallback"

## 一些问题

1. 刷不出动态 (我提交了 10 次代码，但是为什么我的动态还是没有?)

   检查 GitHub 客户端的`电子邮箱`是否正确配置。还有，“branch: master”才算数。

2. 避免滥用 GitHub

	* 不要提一些与技术无关的话题，特别是政治话题。

			2015 年 3 月末 GitHub 遭 DDoS，遭受攻击的目标是一个爱咧咧政治的家伙

	* 不要灌水！

			如果大家像贴吧一样刷了 1,000 楼，那么作者的邮箱会刷出 1,000 封电子邮件……而且 GitHub 的评论是不分页的。

	* 不要把 GitHub 当作网盘……

			才 1GB 空间，还是给代码用的。传电影请用百度云。

	* 不要把 GitHub 当作 CDN……

			2013 年 1 月 15 日，GitHub 遭到疑似 DDoS 攻击。为什么呢？因为中国人要买火车票了。中国人买火车票关 GitHub 啥事儿？因为抢票助手到这里来刷文件，把 GitHub 刷坏了……
			事情到此还没结束——过几天 GitHub 就被墙了。

3. 访问速度慢 or 不稳定：这个问题要找北邮的`方校长`来解决了。如果上外国网站出现了什么问题，找他一定好使。

4. 既想用 GitHub 的优点，又不希望公开代码？你可以花钱买 Private Repositories，或者换网站，或者自己架设 Git 服务器。

5. 如果你信不过老美或围墙管理员，同样可以换网站 (国内类似服务，[GitCafe](https://gitcafe.com)) 或者自己架 Git 服务器。

6. [GitHub Gist](https://gist.github.com) 是个专门贴 (代码) 段子的网站。最重要的是，这个也支持用 Git 进行版本控制！不过……

		192.30.252.143	gist.github.com
		23.235.43.133	gist-assets.github.com

   知道该怎么用了吧？

## 一些链接

* 喵喵大全：[octodex.github.com](https://octodex.github.com)
* GitHub Shop：[shop.github.com](https://shop.github.com) 很想要那些纪念品可惜买不起。
* 如何利用 GitHub Pages 架设静态网站：[pages.github.com](https://pages.github.com) (通过 Jekyll 或 Hexo，可以用 GitHub Pages `架设博客`。不过 Jekyll 官方不支持 Windows。)
* 本博客源代码：[github.com/upclinux/upclinux.github.io](https://github.com/upclinux/upclinux.github.io)
* Search：可以试试那个 Search。先看看有没有开源解决方案，然后再自己造车轮。

最后发个小图，

![社交](/img/2015-05-24-github-introduction/intro6.jpg)

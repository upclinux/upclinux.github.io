---
layout: post
title: "配置 LaTeX 环境"
date: 2015-05-22 18:37:06
author: vjudge1
categories: Linux Mac
tags: LaTeX
---
* contents
{:toc}

用 Word 写论文的只有两种人：一种是井底之蛙，另一种是被迫用 Word 的人。

用 LaTeX 写论文才是王道。不过，毕竟是老外开发的软件，所以需要配置配置才能正常使用中文。




# 安装

## Windows

Windows 下的配置是最轻松的：

1. 下载并安装 [CTEX](http://www.ctex.org/CTeXDownload)。建议下载完整版，免得麻烦。
2. CTEX 附带的两个编辑器很不好用，其中一个还要钱 (不仅要钱而且对 UTF-8 支持还很差劲)。你可以自己下载 `TexStudio`。

## Linux

以 Ubuntu 为例。

1. 安装 `texlive-full` 软件包。
2. 安装 `texstudio` 软件包。
3. 这时候可以编译英文文档了，但是中文文档还不可以，因为缺中文字体。
	* 到 Windows 系统盘的 Windows\Fonts 目录中找到宋体 (SIMSUN.ttc)、楷体 (SIMKAI.ttf)、黑体 (SIMHEI.ttf)、仿宋 (SIMFANG.ttf) 四种字体。
	* 把这四种字体复制到 `/usr/share/texlive/texmf-dist/fonts/truetype/public` 中，不要改名。
	* 运行 `sudo texconfig`，选择其中的 `REHASH`，使系统检测到刚复制的四个字体。

## OS X

1. 下载并安装 `MacTex`。
2. 下载并安装 `TexStudio`。
3. 同样要把四种中文字体的问题解决。因为我觉得把 Windows 的基本汉字字体拿过来安装有些危险，所以选择了改 ctex 宏包。

   因为我只用 XeLaTeX 编译器，因此我只改了 `/usr/local/texlive/2014/texmf-dist/tex/latex/ctex/fontset/ctex-xecjk-winfonts.def`，并做了以下改动：

{% highlight latex %}
\setCJKmainfont[BoldFont={STHeiti},ItalicFont={Kaiti SC}]
  {Songti SC}
\setCJKsansfont{Songti SC}
\setCJKmonofont{STFangsong}

\setCJKfamilyfont{zhsong}{Songti SC}
\setCJKfamilyfont{zhhei}{STHeiti}
\setCJKfamilyfont{zhkai}{Kaiti SC}
\setCJKfamilyfont{zhfs}{STFangsong}

\newcommand*{\songti}{\CJKfamily{zhsong}} % 宋体
\newcommand*{\heiti}{\CJKfamily{zhhei}}   % 黑体
\newcommand*{\kaishu}{\CJKfamily{zhkai}}  % 楷书
\newcommand*{\fangsong}{\CJKfamily{zhfs}} % 仿宋
\endinput
{% endhighlight %}

# 中文问题

只需要在文档的导言区加一句：

	\usepackage[UTF8,hyperref]{ctexcap}

然后就能输出中文了。

编译的时候，建议大家用 XeLaTeX，因为这个对中文的支持更好。

# 作弊

如果公式、图形或表格非常复杂，那么与其苦苦研究和调试 LaTeX 语句，不如找个简单方法直接解决问题。毕竟天朝人有钱，不怕商业软件价格贵。

## 数学公式

对于复杂数学公式，不妨直接用 `MathType`。MathType 可以直接以 LaTeX 格式来输入公式，也可以把公式直接复制成 LaTeX 格式。对于不容易写出代码的复杂数学公式来说，非常方便。

## 复杂图形

最简单的办法——用 Illustrator 或什么矢量图绘制软件（Inkscape）把图画好，保存成 pdf 或 svg 格式，然后插入到文档中。

## 复杂表格

对于非常复杂的表格，我们可以拿 Word 做好，保存成 PDF 格式，用 Illustrator 或其他矢量图软件进行适当处理，然后插入到文档中。

但是这样字体看着就不匹配了，怎么办？

去 LaTeX 安装目录里找 `texgyrepagella` 字体，把它装上，然后到 Word 里把字体设成 `TeX Gyre Pagella`。

## Lyx

Lyx 是一个类似 Word 的可视化编辑软件。

Lyx 基于 LaTeX，用 Lyx 编辑的文本也使用 LaTeX 编译，因此 Lyx 适合“代码恐惧症”患者。

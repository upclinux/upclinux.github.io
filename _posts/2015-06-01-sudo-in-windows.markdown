---
layout: post
title: "sudo in Windows"
date: 2015-06-01 22:30:33
author: vjudge1
categories: Others
tags: Scripting
---
Windows enables UAC (User Account Control) by default. It's like `sudo` in Linux/Mac, but it's NOT sudo when in Command Prompt.

If you're get used to `sudo`, let's make it run on Windows.





Open notepad as Administrator, then type the following codes:

{% highlight batch %}
@ECHO OFF
IF "%~1" == "" (
    ECHO Usage: sudo ^<command^>
    EXIT /B
)
SET arg=%*
IF "%~1" == "su" (
    SET arg=cmd
) ELSE (
    SET arg=%arg:"=""%
)
ECHO Set UAC = CreateObject^("Shell.Application"^) > %TMP%\shell.vbs
ECHO UAC.ShellExecute "CMD", "/c %arg%", "", "runas", 1 >> %TMP%\shell.vbs
CSCRIPT "%TMP%\shell.vbs" > NUL
DEL "%TMP%\shell.vbs"
{% endhighlight %}

Save it to `C:\Windows\sudo.cmd`. Then you can use `sudo` conveniently without opening another cmd by selecting "Run as Administrator".
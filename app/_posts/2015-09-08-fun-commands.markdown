---
layout: post
title: "Funny Linux commands"
date: 2015-09-08 10:11:00
author: vjudge1
categories: Linux 无聊
---
* content
{:toc}

Just for fun.

If you get "command not found" after typing these commands, please install them manually.





# Kuso

## sl

ls is an everyday command. If you type in reverse, ...

![sl]({{ site.baseurl }}/img/2015-09-08-fun-commands/sl.png)

A steam locomotive.

`sl -l` will display a smaller train, and `sl -F` will let the train fly.

So, you can type `alias ls=sl` on other's computer secretly.

## tac

cat is used to print files, so tac is used for printing files, too. Of course, in reverse.

## dd

Not all `dd`s are dangerous. For example, enter text mode (Ctrl-Alt-F1) and type:

    sudo dd if=/dev/urandom of=/dev/fb0

Because /dev/urandom is a random generator, so results are different.

## Fork Bomb

Just enter an Apple Store, open Terminal (Press Control-Space and type "Terminal"), then type:

    :() { :|: & };:

Remember, you should exit the store quickly or ...

## yes

Type `yes` and you will get yyyyyyyyyyyyy...s. (In fact, it can be used for pipes to affirm repetitively.)

It's easy to simulate it:

{% highlight c %}
#include <stdio.h>

int main(int argc, char *argv[])
{
    char *s = (argc>1) ? argv[1] : "y";
    while (1) printf("%s\n", s);
    return 0;
}
{% endhighlight %}

## xeyes

![xeyes]({{ site.baseurl }}/img/2015-09-08-fun-commands/xeyes.png)

Eyes are just watching your pointer -- Why does X11 contain such a boring thing?

And a more boring one -- xlogo. Just a ugly "X", and ... nothing else.

## xkill

Do you want to be a demon?

Type `xkill` and click on any window -- That program (process) will be terminated immediately.

xkill, quick and accurate.

## fuck

-"F**k!"

-"Please watch your tongue!"

Now, it's not rude to curse your computer, and, you computer will fix your error after being cursed --

[https://github.com/nvbn/thefuck](https://github.com/nvbn/thefuck).

When you type a wrong command and get an error message, just say "fuck", and the program will help you correct it.

# Easter Eggs

## moo

Type: `apt-get moo`

And: `apt-build moo`

## No easter eggs

You need `aptitude`. So only deb-based system users can see it:

    aptitude moo

aptitude says there are no easter eggs. Don't be cheats. Just go on:

    aptitude -v moo
    aptitude -vv moo
    aptitude -vvv moo
    aptitude -vvvv moo
    aptitude -vvvvv moo
    aptitude -vvvvvv moo
    aptitude -vvvvvvv moo

aptitude surrenders at last.

## cal

`cal 9 1752`: Where is Sep. 3, 1752?

# ASCII arts

## BIG CHARACTERS

### figlet

![figlet]({{ site.baseurl }}/img/2015-09-08-fun-commands/figlet.png)

### toilet

"toilet" is not a toilet. It's ...

![toilet]({{ site.baseurl }}/img/2015-09-08-fun-commands/toilet.png)

### banner

![banner]({{ site.baseurl }}/img/2015-09-08-fun-commands/banner.png)

These are real [Big-character posters](https://en.wikipedia.org/wiki/Big-character_poster).

## cowsay

![cowsay]({{ site.baseurl }}/img/2015-09-08-fun-commands/cowsay.png)

* `cowsay "Hello world"`: A saying cow
* Replace cowsay to cowthink: A thinking cow
* `cowsay -l` Seeing supported kind of animals -- `cowsay -f tux "Hello world"`: No cows, just Tux。
* Install fortune, and type `fortune | cowsay`: A philosophical cow.
* Install fortune-zh and execute `fortune | cowsay`: A cow that knows Chinese poem.

## bb

A simple ASCII image is not amazing.

So let's watch bb! It's a 3D ASCII animation with music!

## The Matrix

cmatrix:

![cmatrix]({{ site.baseurl }}/img/2015-09-08-fun-commands/cmatrix.png)

## telnet

Just type:

    telnet towel.blinkenlights.nl

An ASCII movie.

![blinkenlights]({{ site.baseurl }}/img/2015-09-08-fun-commands/blinkenlights.png)

If use IPv6, more scenes will show, and the movie will become colorful.

## asciiquarium

ASCII quarium...

## lolcat

![lolcat]({{ site.baseurl }}/img/2015-09-08-fun-commands/lolcat.png)

lolcat is a Ruby program so you should use `gem` command to install.

# Others

## factor

`factor 60`：60 = 2*2*3*5

## oneko

A cat is always chasing you mouse pointer.

## Python

You don't need to learn programming. You just need to type:

    python -m SimpleHTTPSerever

The easiest way to share files with each other.

---
layout: post
title: "Install Rails (Mac/Cygwin/Windows)"
author: vjudge1
categories: Ruby Mac
tags: Rails
---
* content
{:toc}

Macbook is better than computers with Windows or Linux inside because of few developing issues. Except Rails...




{% callout %}
#### 中国的朋友们

如果在安装过程中遇到了“Connection reset”或“Timeout”的错误，那一定是防火的长城干的<span class="blackout">敢在这里污蔑当，一定是勾结了境外反华组织</span>。因此，解决方法有三种：

1. 用你的科学上网工具（设置 HTTP_PROXY 和 HTTPS_PROXY）
2. [淘宝](https://ruby.taobao.org)——淘宝除了可以购物，还可以……
3. 改 /etc/hosts：

      23.235.40.249 rubygems.global.ssl.fastly.net
      54.186.104.15 production.cf.rubygems.org
      54.186.104.15 production.s3.rubygems.org

这三种方法都可以——怎么方便怎么来就行。
{% endcallout %}

# Install Rails on my Mac

{% callout danger %}
#### A better solution for Ubuntu/Mac

Because it's hard to install Rails, there are some special websites that introduce how to setup it. For example, [GoRails](https://gorails.com) and [guides](https://gorails.com/setup/osx/10.10-yosemite) in it.
{% endcallout %}

What is installed on my Mac:

* MacPorts
* Xcode
* Ruby 2.2.3: installed by MacPorts, and is the default Ruby interpreter.

First, gcc is required. If you don't have gcc, just type

    xcode-select --install

Then it's ready to type

    sudo gem install rails

BUT...

## nokogiri

nokogiri is the only troublemaker during the whole installation.

### 1 (FAILED)

First I installed nokogiri directly so I failed.

{% comment %}
    Building native extensions.  This could take a while...
    ERROR:  Error installing nokogiri:
    ERROR: Failed to build gem native extension.

    ......

    ************************************************************************
    IMPORTANT NOTICE:

    Building Nokogiri with a packaged version of libxml2-2.9.2
    with the following patches applied:
        - 0001-Revert-Missing-initialization-for-the-catalog-module.patch
        - 0002-Fix-missing-entities-after-CVE-2014-3660-fix.patch

    Team Nokogiri will keep on doing their best to provide security
    updates in a timely manner, but if this is a concern for you and want
    to use the system library instead; abort this installation process and
    reinstall nokogiri as follows:

        gem install nokogiri -- --use-system-libraries
            [--with-xml2-config=/path/to/xml2-config]
            [--with-xslt-config=/path/to/xslt-config]

    If you are using Bundler, tell it to use the option:

        bundle config build.nokogiri --use-system-libraries
        bundle install

    Note, however, that nokogiri is not fully compatible with arbitrary
    versions of libxml2 provided by OS/package vendors.
    ************************************************************************
    Extracting libxml2-2.9.2.tar.gz into tmp/x86_64-apple-darwin14/ports/libxml2/2.9.2... OK
    Running patch with /Library/Ruby/Gems/2.0.0/gems/nokogiri-1.6.6.2/ports/patches/libxml2/0001-Revert-Missing-initialization-for-the-catalog-module.patch...
    Running 'patch' for libxml2 2.9.2... OK
    Running patch with /Library/Ruby/Gems/2.0.0/gems/nokogiri-1.6.6.2/ports/patches/libxml2/0002-Fix-missing-entities-after-CVE-2014-3660-fix.patch...
    Running 'patch' for libxml2 2.9.2... OK
    Running 'configure' for libxml2 2.9.2... OK
    Running 'compile' for libxml2 2.9.2... ERROR, review '/Library/Ruby/Gems/2.0.0/gems/nokogiri-1.6.6.2/ext/nokogiri/tmp/x86_64-apple-darwin14/ports/libxml2/2.9.2/compile.log' to see what happened.
    *** extconf.rb failed ***
    Could not create Makefile due to some reason, probably lack of necessary
    libraries and/or headers.  Check the mkmf.log file for more details.  You may
    need configuration options.

    ......

    Gem files will remain installed in /Library/Ruby/Gems/2.0.0/gems/nokogiri-1.6.6.2 for inspection.
    Results logged to /Library/Ruby/Gems/2.0.0/extensions/universal-darwin-14/2.0.0/nokogiri-1.6.6.2/gem_make.out
{% endcomment %}

So I tried to do as what the message said. However, failed again.

{% comment %}
    Building native extensions with: '--use-system-libraries'
    This could take a while...
    Building nokogiri using system libraries.
    ERROR:  Error installing nokogiri:
        ERROR: Failed to build gem native extension.

        /System/Library/Frameworks/Ruby.framework/Versions/2.0/usr/bin/ruby extconf.rb --use-system-libraries --with-xml2-include=/Users/dwt/Library/Homebrew/opt/libxml2/include/libxml2 --with-xml2-lib=/Users/dwt/Library/Homebrew/opt/libxml2/lib --with-xslt-dir=/Users/dwt/Library/Homebrew/opt/libxslt --with-iconv-include=/Users/dwt/Library/Homebrew/opt/libiconv/include/
    Building nokogiri using system libraries.
    libxml2 version 2.9.0 and later is not yet supported, but proceeding anyway.
    checking for xmlParseDoc() in libxml/parser.h... no
    checking for xmlParseDoc() in -lxml2... no
    checking for xmlParseDoc() in -llibxml2... no
    -----
    libxml2 is missing.  please visit http://nokogiri.org/tutorials/installing_nokogiri.html for help with installing dependencies.
    -----
    *** extconf.rb failed ***
    Could not create Makefile due to some reason, probably lack of necessary
    libraries and/or headers.  Check the mkmf.log file for more details.  You may
    need configuration options.
{% endcomment %}

### 2 (FAILED)

I have read installation documents:

* http://www.nokogiri.org/tutorials/installing_nokogiri.html#mac_os_x
* https://github.com/sparklemotion/nokogiri/wiki/What-to-do-if-libxml2-is-being-a-jerk

According to the document, I tried

    sudo port install libxml2 libxslt
    sudo gem install nokogiri -- --with-xml2-include=/opt/local/include/libxml2 --with-xml2-lib=/opt/local/lib --with-xslt-dir=/opt/local

I have also tried

    sudo gem install nokogiri -- --with-xml2-include=/Applications/Xcode.app/Contents/Developer/Platforms/MacOSX.platform/Developer/SDKs/MacOSX10.10.sdk/usr/include/libxml2 --use-system-libraries

Of course, it failed again and again.

### 3 (╯°Д°)╯︵ ┻━┻

Finally, I gave up on trying and decided to use the system version instead.

    sudo gem install nokogiri -v '1.6.6.2' -- --use-system-libraries --with-xml2-include=/usr/include/libxml2 --with-xml2-lib=/usr/lib

(UPDATE: The newest version is 1.6.7.)

It's really Pyrrhic victory.

# Install nokogiri in Windows

{% callout warning %}
#### WARNING

Do not use Rails in Windows unless you like the feel of SLOOOOOOOW.
{% endcallout %}

Because it's hard to compile in Windows. Nokogiri team has already worked for it. Just use

    gem install nokogiri

and everything will be ok.

If you intend to do everything from scratch:

1. Install Ruby and DevKit
2. Download libxml2, libxslt (这俩需要翻墙), iconv and zlib. Unzip them, set PATH variable to gcc, and lots of `./configure && make`.
    * libxslt needs libxml2, so you need to give correct parameters before running `configure`. For example, `./configure --with-libxml-src=/c/opt/include/libxml2-2.9.2
`.
3. The final gem command should look like --

        gem install nokogiri --platform=ruby -- --use-system-libraries --with-xml2-include=C:\opt\include\libxml2-2.9.2\include --with-xml2-lib=C:\opt\include\libxml2-2.9.2\.libs --with-xslt-include=C:\opt\include\libxslt-1.1.28 --with-xslt-lib=c:\opt\include\libxslt-1.1.28\libxslt\.libs --with-exslt-include=c:\opt\include\libxslt-1.1.28 --with-exslt-lib=c:\opt\include\libxslt-1.1.28\libexslt\.libs --with-zlib-lib=C:\opt\include\zlib-1.2.8 --with-zlib-include=C:\opt\include\zlib-1.2.8
4. Enter irb, then type `require 'nokogiri'`. If it returned true, CONGRATULATIONS! <span class="blackout">If error messages show up...(╯°Д°)╯︵ ┻━┻</span>

# Install nokogiri under Cygwin

{% callout warning %}
#### WARNING

Do not use Rails in Cygwin unless you like the feel of SLOOOOOOOOOOOOOOOOOOOW.
{% endcallout %}

Install `ruby`, `gcc`, `binutils` and `make`.

Then install `libxml2`, `libxml2-devel`, `libxslt`, `libxslt-devel`, and type:

    gem install nokogiri -- --use-system-libraries --with-xml2-include=/usr/include/libxml2 --with-xml2-lib=/usr/lib --with-xslt-dir=/usr/include/libxslt

# Vagrant

For Windows users, you can try [Vagrant](https://www.vagrantup.com/). It can be used to create an independent developing environment via virtual machines. And RubyMine supports it.

With Vagrant, SLOOOOOOOW can reduce to SLOW...It's much better than SLOOOOOOOW and SLOOOOOOOOOOOOOOOOOOOW.

<span class="blackout">Linux大法好，退Windows保平安</span>

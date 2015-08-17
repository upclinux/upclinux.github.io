---
layout: post
title: "Install Rails on my Mac"
date: 2015-07-25 21:00:00
author: vjudge1
categories: Ruby
---
* content
{:toc}

Macbook is better than computers with Windows or Linux inside because of few developing issues. Except rails...



# Install Rails on my Mac

Type

    sudo gem install rails

to install. BUT...

## Change sources (天朝专用)

If you're in China, while using gem in the first time, you will see an error message like:

    Errno::ECONNRESET: Connection reset by peer - SSL_connect

The error is because the GFW in China. So, if you meet the error, you can browse [ruby.taobao.org](https://ruby.taobao.org) (not for shopping) and change the source.

## gcc

Just need to install Xcode or

    xcode-select --install

## nokogiri

nokogiri is the only troublemaker during the whole installation.

### 1

First I installed nokogiri directly so I failed:

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

So I tried to do as what the message said. However,

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

It still refused to work.

### 2

I use MacPorts. And I have read installation documents:

* http://www.nokogiri.org/tutorials/installing_nokogiri.html#mac_os_x
* https://github.com/sparklemotion/nokogiri/wiki/What-to-do-if-libxml2-is-being-a-jerk

According to the document, I tried

    sudo port install libxml2 libxslt
    sudo gem install nokogiri -- --with-xml2-include=/opt/local/include/libxml2 --with-xml2-lib=/opt/local/lib --with-xslt-dir=/opt/local

I have also tried

    sudo gem install nokogiri -- --with-xml2-include=/Applications/Xcode.app/Contents/Developer/Platforms/MacOSX.platform/Developer/SDKs/MacOSX10.10.sdk/usr/include/libxml2 --use-system-libraries

Then I have tried

    sudo gem update --system

and typed all commmands about installating again.

Of course, it installed nothing.

### 3

Finally, I gave up on trying and decided to use the system version instead.

    sudo gem install nokogiri -v '1.6.6.2' -- --use-system-libraries --with-xml2-include=/usr/include/libxml2 --with-xml2-lib=/usr/lib

It's really Pyrrhic victory.

# Hello world

Type `rails new hello` to create a project.

## For offline use

If it's difficult to connect to the Internet like me, you can install components before creating a project:

    sudo gem install sqlite3 mysql sass-rails uglifier coffee-rails jquery-rails turbolinks jbuilder sdoc byebug web-console spring webrick
    sudo gem pristine --all

## Say Hello

Type `rails server` in Terminal and type `http://localhost:3000` for the default page.

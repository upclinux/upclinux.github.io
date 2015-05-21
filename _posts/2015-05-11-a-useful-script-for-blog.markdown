---
layout: post
title: "A useful script for blog"
date: 2015-05-11 01:06:01
author: vjudge1
categories: GitHub
tags: Scripting
---

*Just a test for using jekyll.*

How to post a new article in Jekyll? A simple way is just creating a new file and writing a header.

It seems not to sound good. So it's time to write a simple script.





	#!/bin/bash
	if [ -z "$1" ]; then
	    echo 'usage: post <title> [categories]'
	    exit 0
	fi
	
	title=$1
	name=`echo $title | sed 's/[^0-9a-zA-Z]/-/g' | tr A-Z a-z`
	filename=`date +%Y-%m-%d`-${name}.markdown
	
	shift 1
	cat > "_posts/$filename"  << EOF
	---
	layout: post
	title: "$title"
	date: `date +%Y-%m-%d\ %H:%M:%S`
	author: vjudge1
	categories: $2
	tags: $3
	---
	
	* content
	{:toc}
	EOF
	
	echo 'New blog posted.'

This is just the beginning. And there is still something wrong in my blog.

I'm used to Linux & Mac because its powerful scripting environment, and I can't imagine living in the real Windows instead of virtual machines.

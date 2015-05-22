---
layout: post
title: "Writing blogs in Ubuntu"
date: 2015-05-22 18:37:06
author: vjudge1
categories: GitHub
tags: GitHub Jekyll Ubuntu
---

* content
{:toc}

I found that using GitHub Pages and Jekyll to write blogs is really comfortable. 

I used to blog in OS X. The steps of configuration are quite easy:

1. Git is a bulit-in command in OS X so we don't need to install it.
2. Download and install [GitHub for Mac](https://mac.github.com).
3. Install Jekyll: `sudo gem install jekyll`
4. Use a favorite editor to write blogs. Use GitHub for Mac to push them to the remote server.

However, it's a bit tricky to do so in Linux, for example, Ubuntu. My Ubuntu is 14.04.





## Configure Git

1. Install Git: 

		sudo apt-get install git
	
2. Configure your name and email:

		git config --global --add user.name "Your Name"
		git config --global --add user.email "Your Email"
	
3. Avoid an error prompt:

		git config --global push.default simple

4. Add a SSH key:

		ssh-keygen -t rsa -C "GitHub"
		cat ~/.ssh/id_rsa
		
	Login to GitHub, and copy the output to "Settings" -> "SSH keys" -> "Add key".
	
	Now you can test it by:
	
		ssh -T git@github.com
	
	If OK, it will output `Hi xxxxx! You've successfully authenticated, but GitHub does not provide shell access.`.
	
	If you see `Agent admitted failure to sign using the key`, please run:
	
		ssh-add ~/.ssh/id_rsa
	
5. Now you can use `git clone`, `git pull`, `git push` or so on to code.

## Jekyll

1. Install necessary libraries or Jekyll will fail to work:

		sudo apt-get install ruby-dev nodejs
		
2. Install Jekyll & kramdown (Markdown support):

		sudo gem install jekyll kramdown

3. Jekyll will work. Use the following commands to test:

		jekyll new test
		cd test
		jekyll serve
	
	Browse `http://localhost:4000` to see the new blog.

## Visual Studio Code

I recognize that I'm a little lazy and will feel bored after typing too many commands. 

So, let's get an easy-to-use editor -- [Visual Studio Code](https://code.visualstudio.com)! In fact, I use Code instead of Vim in OS X while writing and customizing blogs.

After downloading, type

	sudo unzip VSCode-linux-x64.zip -d /opt/Code
	
Code will be extracted into `/opt/Code`. It's not convenient. So,

	sudo ln -s /opt/Code/Code /usr/local/bin/code
	
To make it easier in graphical environment, type (I use `vim` rather than gedit): 

	gedit ~/.local/share/applications/code.desktop
	
Add the following codes and save:
	
	[Desktop Entry]
	Comment=
	Terminal=false
	Name=Visual Studio Code
	Exec=/opt/Code/Code %F
	Type=Application
	Categories=Development;IDE;
	Icon=/opt/Code/resources/app/vso.png
	
OK. Enjoy coding! And all things can be done via Visual Studio Code.

## Notes

### Clone URL

GitHub provides 3 kinds of URLs for cloning. It's recommended to use `SSH clone URL` because we configured SSH just now. 

I tried to clone with HTTPS URL and find a trouble when pushing. So I clone again with SSH URL and succeed.

### Access to Gists

GitHub was blocked by Chinese *\[sensitive words\]* in Jan 2013. Thanks to [Kai-Fu Lee](http://weibo.com/kaifulee?stat_date=201301&page=4), we can access GitHub again.

However, GitHub Gists is still blocked. So a little work should be done in `/etc/hosts`:

	192.30.252.143	gist.github.com
	23.235.43.133	gist-assets.github.com
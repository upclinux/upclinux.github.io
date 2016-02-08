---
layout: post
title: "Use Android phone as the secord screen"
date: 2015-07-19 16:35:04
author: vjudge1
categories: Linux
tags: Synergy
---

* content
{:toc}

I just have a Banana Pro with a small (TFT) screen. However the screen is too tiny to show. So I take my Android phone as the second screen and make my keyboard and mouse available.




# My example

![devices](/img/2015-07-19-dual-screens/device.jpg)

The left screen is connected to the Banana Pro directly. The right screen is my Android phone which is running a remote desktop client. They two are showing different desktops.

My keyboard and mouse are connected to the pi, but they can also control the desktop in the phone directly.

[% callout style=info %]
The TFT screen

The TFT screen will NOT show things automatically. You need to load a kernel model called <code>fbtft</code> first.

If you're using Raspberry Pi and you're rich, it's better to purchase a HDMI screen.
[% endcallout %]

[% callout style=info %]
Pi

In fact, Raspberry Pi (Banana Pro is imitating the pi) is also a kind of computer. So you can also use your computers or laptops as the host.
[% endcallout %]

[% callout style=warning %]
Wireless required

I'm using VNC for remote desktop so wireless is required for connecting. And the phone and the host should be connected in the same LAN.
[% endcallout %]

# Steps

There are two tasks:

1. Remote Desktop: Let the phone show a desktop from the Pi.
2. Share keyboard & mouse: Let the keyboard and mouse control the desktop in the phone directly.

The OS in my banana is Fedora so I will take Fedora as example.

## Remote Desktop

### Install VNC Server

The answer to the first question is `VNC`. It can start a new session:

	sudo yum install tigervnc-server

Then open `~/.vnc/xstartup`, modify the last line `twm &` to your own desktop environment (for example, `startxfce4 &` or `mate-session &`).

At last, use `vncpasswd` to set a password.

### Start VNC Server

Type `vncserver` for remote desktop.

The resolution of my phone is 848x480 so I typed:

	vncserver -geomerty 848x480

You can use any resolution you like.

If you want to kill the session, just type `vncserver -kill :1`.

### VNC Client

First you must know IP of the host and start the VNC server.

There are many VNC clients in Google Play. Just pick one randomly.

Assume the IP is 192.168.1.100, you should connect to `192.168.1.100:5901`. After typing the password you set, you should see the new desktop.

If there is nothing on the screen, please check and modify `~/.vnc/xstartup`.

## Synergy

By now you can't use keyboard and mouse directly, so `Synergy` is needed.

[% callout %]
Synergy

Synergy is a tool for sharing keyboard and mouse to multiple computers. It supports Windows, Linux and Mac at the same time. It's free software under GNU GPL license.
[% endcallout %]

### Install & configure synergy

Type:

	sudo yum install synergy

Then edit `~/.synergy.conf` and type:

	section: screens
		host:
		client:
	end
	section: links
		client:
			right = host
		host:
			left = client
	end

### Start synergy server/client

Make sure the desktop of the host and VNC server are started. Then type:

	synergys --name host --display :0 --address 127.0.0.1
	synergyc --name client --display :1 127.0.0.1

Then the Android phone will work like a "real" screen. (However, the mouse pointer may be invisible.)

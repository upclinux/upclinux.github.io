---
layout: post
title: "Wi-Fi Hotspot on Banana Pro (1) - AP"
date: 2015-05-15 16:35:04
author: vjudge1
categories: Linux
tags: Wireless hostapd
---

* content
{:toc}

I am busy preparing exams these days, so I seldom touched my boards during these two weeks.

Picking up my Banana Pro, I think out an idea -- A wireless router with authentication.





## Banana Pro

Banana Pro is a development board designed by [lemaker](http://www.lemaker.org) and it's similiar to Raspberry Pi. The performance of Banana Pro is better than Raspberry Pi. **However, DO NOT get it unless you can solve problems by yourself because of lacking in documents.**

OpenWrt supports Banana Pro without its onboard wireless adapter. I tried making the wireless work many times but eventally I failed.

This time I will try Debian direcly.

### Install Bananian
Download and flash [Bananian](http://www.bananian.org) to the micro SD card.

Use `dd` in Linux or OS X and use `Win32ImageDisker` in Windows.

After booting, type `bananian-config` to configure the new system. Change the profile to Banana Pro.

Before rebooting, edit `/etc/modules` file, and add the content below into it:

    ap6210 op_mode=2

### Install development tools
There are no real development tools in Bananian. You have to install them manually:

    apt-get install gcc make git libc-dev automake libtool
    apt-get install vim

## Enable AP mode

### hostapd

I used the newest hostapd (version 2.4) rather than the one in Debian (version 1.0). Use these commands to compile and install it:

    apt-get install libnl-dev libssl-dev
    cd
    wget http://w1.fi/releases/hostapd-2.4.tar.gz
    tar -xvf hostapd-2.4.tar.gz
    cd hostapd-2.4/hostapd
    cp defconfig .config
    make
    make install

You need a create a configuation file `/etc/hostapd/hostapd.conf`, and add:

    interface=wlan0
    driver=nl80211
    ssid=MySSID
    channel=6
    hw_mode=g
    macaddr_acl=0
    auth_algs=1
    ignore_broadcast_ssid=0
    wpa=2
    wpa_passphrase=12345678
    wpa_key_mgmt=WPA-PSK
    wpa_pairwise=TKIP
    rsn_pairwise=CCMP

I tried `wpa=3` according to the document but both my phone and my Mac can't connect to the board. so I replaced it with `wpa=2`.

Now you can run the following command to test and you will see a hotspot named `MySSID` with your phone.

    hostapd -d /etc/hostapd/hostapd.conf

### Static IP for wlan0
Edit `/etc/network/interfaces` and add the following lines:

    allow-hotplug wlan0
        iface wlan0 inet static
        address 192.168.100.1
        netmask 255.255.255.0

    up hostapd -B /etc/hostapd/hostapd.conf

### Enable DHCP server
There are many kinds of DHCP servers. I chose `udhcpd`.

<div class="callout callout-primary">
<h4>IPv6</h4>
udhcpd doesn't support IPv6. Use isc-dhcp-server instead if you need IPv6.  <a href="{{ site.baseurl }}/2015/06/23/wi-fi-hotspot-on-banana-pro-3/">Click here</a> for more information.
</div>

Install the DHCP server:

    apt-get install udhcpd

Edit `/etc/udhcpd.conf` and do the following changes:

    start    192.168.100.101    #default: 192.168.0.20
    end      192.168.100.254   #default: 192.168.0.254

    interface   wlan0     #default: eth0

    option  subnet  255.255.255.0
    opt     router  192.168.100.1
    opt     wins    192.168.100.1
    option  dns     8.8.8.8
    option  domain  local

Edit `/etc/default/udhcpd` and modify `DHCPD_ENABLED="no"` to `DHCPD_ENABLED="yes"`. Then `udhcpd` will start automatically after booting.

### Go to the Internet
You can connect to the hotspot by now but you can't connect to the Internet.

There are two ways to route flow - NAT and bridge.

I used NAT. Type these 3 commands:

    iptables -A FORWARD -o eth0 -i wlan0 -s 192.168.1.0/24 -m conntrack --ctstate NEW -j ACCEPT
    iptables -A FORWARD -m conntrack --ctstate ESTABLISHED,RELATED -j ACCEPT
    iptables -t nat -A POSTROUTING -o eth0 -j MASQUERADE

Then Internet will be available.

The configuation will be erased after rebooting. So edit `/etc/network/interfaces` and add these lines to the end (Refered to [frank-mankel.de/?p=401](http://frank-mankel.de/?p=401)):

    up /sbin/iptables -F
    up /sbin/iptables -X
    up /sbin/iptables -t nat -F
    up iptables -A FORWARD -o eth0 -i wlan0 -s 192.168.1.0/24 -m conntrack --ctstate NEW -j ACCEPT
    up iptables -A FORWARD -m conntrack --ctstate ESTABLISHED,RELATED -j ACCEPT
    up iptables -t nat -A POSTROUTING -o eth0 -j MASQUERADE
    up sysctl -w net.ipv4.ip_forward=1


Now, a basic router is made. I'll add some features then.

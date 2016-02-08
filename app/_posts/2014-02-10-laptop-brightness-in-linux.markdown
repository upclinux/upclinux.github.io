---
layout: post
title: "Adjusting brightness in Linux for my laptop"
author: vjudge1
categories: Linux
tags: Linux
---
* content
{:toc}

After installing Ubuntu, brightness hotkey doesn't work in my laptop. So I took lots of time to find a solution from the search engine.




There is a detailed article in [Archlinux Wiki](https://wiki.archlinux.org/index.php/Backlight). So I just write my own experience (Lenovo V470, Intel HD3000 + Nvidia GT540M).

# Adjust brightness

First I found the slider of brightness in "System Settings" doesn't work at all.

So I tried

    echo 500 > /sys/class/backlight/intel_backlight/brightness

nothing happens.

Then I changed kernel options, and added:

    acpi_osi=Linux acpi_backlight=vendor

After reboot, the slider bar worked.

# Keys

Now brightness can be adjusted. However, when I press Fn+Up and Fn+Down, brightness doesn't change, just leaving a "±" on screen.

I think that hotkeys may be mapped into wrong keys. And they are really wrong.

Type `xev` in terminal, a window titled "Event Tester" will show. Press Fn+Up and Fn+Down again, the termial outputs:

    KeyPress event, serial 36, synthetic NO, window 0x4400001,
        root 0xc0, subw 0x0, time 1819651, (328,228), root:(1136,430),
        state 0x0, keycode 126 (keysym 0xb1, plusminus), same_screen YES,
        XLookupString gives 2 bytes: (c2 b1) "±"
        XmbLookupString gives 2 bytes: (c2 b1) "±"
        XFilterEvent returns: False

    KeyRelease event, serial 36, synthetic NO, window 0x4400001,
        root 0xc0, subw 0x0, time 1819657, (328,228), root:(1136,430),
        state 0x0, keycode 126 (keysym 0xb1, plusminus), same_screen YES,
        XLookupString gives 2 bytes: (c2 b1) "±"
        XFilterEvent returns: False

    KeyPress event, serial 36, synthetic NO, window 0x4400001,
        root 0xc0, subw 0x0, time 1826429, (328,228), root:(1136,430),
        state 0x0, keycode 120 (keysym 0x0, NoSymbol), same_screen YES,
        XLookupString gives 0 bytes:
        XmbLookupString gives 0 bytes:
        XFilterEvent returns: False

    KeyRelease event, serial 36, synthetic NO, window 0x4400001,
        root 0xc0, subw 0x0, time 1826435, (328,228), root:(1136,430),
        state 0x0, keycode 120 (keysym 0x0, NoSymbol), same_screen YES,
        XLookupString gives 0 bytes:
        XFilterEvent returns: False

Their functions are obviously wrong. Type

    sudo xmodmap -e "keycode 126 = XF86MonBrightnessUp"
    sudo xmodmap -e "keycode 120 = XF86MonBrightnessDown"

And the hotkey works.

I save these two commands as a startup script. (But it doesn't work if written in /etc/rc.local.)

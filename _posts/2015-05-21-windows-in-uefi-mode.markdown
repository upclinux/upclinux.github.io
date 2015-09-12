---
layout: post
title: "Windows in UEFI Mode"
date: 2015-05-21 20:43:40
author: vjudge1
categories: Maintainance
tags: Windows UEFI
---

* content
{:toc}

This article is the summary of my own experience on UEFI and Legacy Mode. So some information may be wrong.

Experiences about installing an operating system (e.g., Windows or Linux) are required or you may feel hard to understand it.




# The origin

It was easy to install a Windows system in the past until the popularity of Windows 8. Laptops with Windows 8 pre-installed adopt the newest firmware named UEFI.

Differences between UEFI and traditional mode are great. While, both of them also exist at the same time. Therefore it's important to understand these two modes in order to manage to install operating systems in different computers.  

# UEFI vs. Legacy

[BIOS](https://en.wikipedia.org/wiki/BIOS), which names "Basic Input/Output System", are used in old computers.

It will be loaded firstly after the computer powers on. Then, the computer will do self-check, load bootloader and boot the OS.

BIOS is too old to meet the development of computer hardware. For example, addressability of BIOS is just 16-bit, and it's hard to create an extension for BIOS.

So there is a substitution and a new standard called EFI. EFI was initially developed by Intel. It was transfered to UEFI Forum and renamed to UEFI.

[UEFI](https://en.wikipedia.org/wiki/UEFI) (Unified Extensible Firmware Interface) works like a tiny operating system. Some computers have a built-in EFI Shell, so maintainance work can be done without any other tools.

## Booting via Legacy Mode

The following description is based my experience. You can refer to Wikipedia to read [the more accurate process](https://en.wikipedia.org/wiki/Master_boot_record).

* BIOS will read information in `Sector 0` in the hard drive. Sector 0 is just 512 bytes, including a program, make BIOS locate to the active partition.
* Finding `the active partition` and read information from it.
* Boot the bootloader according to codes inside the partition.
* Boot the OS by the bootloader.

Bootloaders of Windows:

* DOS and Windows based on DOS (until Windows Me) are not booting through specialized startup managers. Unless you fix the bootloader manually, NT-based systems can't be booted if you install Windows 9x after NT.
* Windows NT series (3.5 to 2003) use `NTLDR`. NTLDR is compatible with older systems via chain loading. The configuration file is called Boot.ini.
* New NT systems (Vista or newer) use `Windows Boot Manager`. The configuration file is named BCD. BCD is a binary file like a Windows registry file and can be edited by `bcdedit.exe`. It can even boot an image in WIM format.

## Booting via UEFI Mode

Nowadays, laptops use 64-bit UEFI. At the same time 32-bit UEFI are used in some tablets.

UEFI will search and execute `EFI\Boot\bootx64.efi` in startup disks (e.g., hard drives, CDs or USB flash disks) after power on. Then this program continues to search and execute bootloaders. Finally, the OS is booted.

Making a bootable USB drive for UEFI mode is quite easy -- just extract the installation image to root directory of USB drive by extraction software, and, it's OK.

It should be noted that a 32-bit OS can't be installed via UEFI mode in laptops. However, some tablets may be OK.

## Secure Boot

Secure Boot is a feature of UEFI. If Secure Boot is on, the firmware will verify signature of the bootloader and it will refuse to boot if the signature is not existed or not valid.

This feature is widely used on Windows 8. It's considered a restriction because users may not be able to install Linux or other systems (even including Windows 7 and older Windows systems).

Fortunately, Secure Boot can be closed in PCs and Windows will still work. If a warning message is appeared in the bottom right corner in the desktop, please install patches via Windows Update.

Microsoft forbids users disable Secure Boot in other devices like Windows RT or phones with Windows installed. So you can't change OS for these devices.

Microsoft will force OEMS to enable Secure Boot after Windows 10 published, and whether Secure Boot can be disabled or not will be determined by OEM. Therefore I don't know whether I can change systems easily in the future.

Secure Boot can't be disabled directly in some computers. Please try to set a BIOS password in this case.

## Switch UEFI & Legacy

All of laptops which is not too old adpot EFI mode at present. However there are no switches in some laptops (Although EFI is really used).

The number of manufacturers of BIOS is small while the number of OEMs is large. OEMs may customize BIOS so details of the following steps will not be the same.

First Enter `BIOS Setup` (Maybe F2, F8, Delete or other keys) and get `Boot` page.

* If you see something like `Boot Mode` or `UEFI Boot Option`, you can switch these two modes.
* Some computers have `UEFI Priority Order` with `UEFI First` or `Legacy First`. It's also a way of changing boot modes (Adjusting the priority).
* Some computers have `CSM Support`. It is the support of Legacy Mode. However, it's still UEFI prefered.
* Some computers have no similar options. Just two kinds of circumstances:
	* The computer doesn't support EFI at all.
	* The computer supports EFI and EFI prefered. It will boot via EFI mode as long as bootx64 exists no matter whether boot information for traditional mode exists.
	* You can prove this by extracting a 64-bit Windows 8 ISO to a clean USB drive which has no boot code.

## Enter BIOS Setup with Windows 8 pre-installed

Some computers don't show messages like "Press F2 to setup", don't enter BIOS Setup by pressing F2 and always startup Windows 8 directly.

You can do the following steps in this case:

1. Go into Windows 8.
2. Reboot with `Shift` key pushed
3. A diagnosis interface will show. Select `Troubleshooting`, `Advanced Settings`, `UEFI Firmware Settings`.
4. Press `Restart` button and BIOS Setup will be entered automatically.

# GPT vs. MBR

I will only introduce what they "look like". I won't consider SCSI, RAID or dynamic paritions...

## Advantages of GPT

* GPT supports partitions greater than 2TB.
* GPT supports over 4 main partitions. There are at most 4 main partitions in MBR drives (and logical partitions are used to support more partitions).

## What MBR looks like

In general, people are used to divide an MBR disk into a primary partition (C:, /dev/sda1) and an extended partition (/dev/sda2). Other partitions are contained in the extended partition (from /dev/sda5).

![mbr](/images/mbr.png)

## What GPT looks like

All of partitions in GPT disks are primary partition. The first partition using FAT32 filesystem is ESP (EFI System Partition).

![gpt1](/images/gpt1.png)

## Brand-name Computers

Some brand-name computers have a easy-to-use recovery tool like "OneKey". So there are some dedicated partitions saving recovery programs or original system images. You can't alloc drive letters to these partitions directly.

![gpt2](/images/gpt2.png)

# Windows Support

## Old Windows (2003 or older)

Windows XP or older only supports Legacy + MBR and can't detect GPT drives.

Windows 2003 can detect GPT drives although can't boot in them.

## New Windows (Vista or newer)

* 32-bit Windows doesn't support UEFI except some tablets.
* 64-bit Windows only supports UEFI + GPT and Legacy + MBR.

In fact, UEFI & Legacy, GPT & MBR can be combined casually. However, Windows and Windows Installer will only work in supported mode.

If you got wrong mode when installing Windows, you will find no partition can be installed to and receive an error message like this:

* Windows cannot be installed on this drive. The selected disk has an MBR partition table. On EFI systems, Windows can only be installed to GPT disk.
* Windows cannot be installed on this drive. The selected disk has an GPT partition table.

In this case, you need reboot and use the correct mode to boot.

In addition, you can use partitioning tool like `diskpart` to rebuild partition table if you are not afraid of data loss.

## Loseless CHANGE

Switching GPT/MBR will wipe all datas in the drive. However, this process can be done loselessly with the help of some professional softwares.

WARNING: It may still cause data loss. So avoid trying this in an important device!  

Before this, you need a startup disk with DiskGenius (It's Chinese interface). There are plenty of tools in China such as [Dabaicai](http://www.dabaicai.com) and [LaoMaoTao](http://www.laomaotao.net)...

(1) UEFI + GPT => Legacy + MBR

DiskGenius can convert GPT from/to MBR loselessly.

WARNING: Because MBR only supports at most 4 main partitions, data may lose while converting.

* Use DiskGenius to convert.
* Set the partition containing Windows as the active partition.
* Fix boot by typing the following command in Command Prompt:
{% highlight bat %}
bcdboot C:\Windows /l zh-CN
{% endhighlight %}
* Change Boot Mode to Legacy.

(2) Legacy + MBR => UEFI + GPT

* Use DiskGenius to convert.
* Create two new partitions sized about 200MB and 128MB from header. The 200MB partition will be used as ESP so its filesystem must be FAT32. Alloc a drive letter (for example, X:) to the ESP.
* Type these commands in Command Prompt:
{% highlight bat %}
diskpart
list disk
sel disk 0
list part
sel part 0
set id={C12A7328-F81F-11D2-BA4B-00A0C93EC93B}
sel part 1
set id={E3C9E316-0B5C-4DB8-817D-F92DF00215AE}
quit
{% endhighlight %}
* Fix boot:
{% highlight bat %}
bcdboot C:\Windows /s X: /f uefi /l zh-cn
{% endhighlight %}
* Change Boot Mode to UEFI.

## Notes on installing Windows

* Windows 7 can be installed via EFI mode. If the installer can't boot via EFI mode, you can find `bootmgfw.efi` in the existing Windows, copy it to `EFI/Boot/` directory and rename it to bootx64.efi.
* Most Chinese won't want to install Windows 7 via EFI mode except genuine users.
* If you want to make a dual-boot, and have a Windows 8 (or newer), it's better to disable "Quick Startup" in Power Settings in Control Panel, or partitions can't be accessed correctly by other systems especially Linux.
* If a error about GPT/MBR occurs while installing Windows, and Legacy Mode is required but the computer can't switch boot modes, you can try to delete or rename `EFI` directory in your installation disk.

# Linux Support

Linux supports both GPT and MBR, and supports UEFI and Legacy.

Old systems use LILO or GRUB as the bootloader. They two don't support UEFI.

Now most distributions use GRUB2 and syslinux (in Installation CD). They support UEFI. Few distributions support Secure Boot except Ubuntu and Fedora.

Of course, 32-bit Linux don't support UEFI as 32-bit Windows do.

If you want to switch boot mode, you just need to reinstall the bootloader rather than the whole system.

# OS X Support

## Mac

All of Macs use Apple EFI. Apple computers don't support Legacy Mode.

Apple computers use GPT and there are only three partitions: ESP, Macintosh HD (HFS+ filesystem), Recovery HD (HFS+ filesystem)/

Systems in USB drives must support EFI in order to boot in Apple computers. Press `Option` key after powering on, a boot menu will shown and you can choose the USB drive.

It's recommended to use `BootCamp Assistant` in OS X if you want to install Windows.

If you use Windows just in few times, you can use virtual machines such as Parallels Desktop, VMware Fusion or VirtualBox.

## Hackintosh

"Hackintosh" is OS X which installed into a normal computer rather than Apple computers.

Steps on installing Hackintosh is really complicated. I won't introduce them.

Hackintosh can't boot directly without a special bootloader. Currently there are two popular bootloaders - Clover and Chameleon. Chameleon only supports Legacy Mode. Clover supports both UEFI and Legacy.

OS X only supports GPT. So you must crack the kernel if you want to install it to a MBR drive. It's not recommended to upgrade the system after cracking the kernel unless you know how to crack it again.

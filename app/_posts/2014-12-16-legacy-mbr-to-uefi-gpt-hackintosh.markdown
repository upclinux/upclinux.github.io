---
layout: post
title:  "Migration from Legacy+MBR to UEFI+GPT"
date:   2014-12-17 17:21:46
author: vjudge1
categories: 电脑维护
tags: Hackintosh UEFI
---
* content
{:toc}

This article is written for my Hackintosh. But ideas in the text can be used for other systems.




# Notes before reading

1. USE AT YOUR OWN RISK!
2. TWO IMPORTANT THINGS:
	1. Hackintosh is working well.
	2. Your computer supports UEFI. There's maybe no such options in BIOS Setup but the computer really supports EFI in fact, for example, my Lenovo V470.
3. This article aims to the migration without reinstalling anything. It may be a bit tricky. So the easiest way to change is recreate the partition table and everything will begin in the new world.
4. There is no Windows in my computer so anything on Windows is just my conjecture.
5. I use a Chinese disk tool.

# Important Knowledges

## UEFI & Legacy

UEFI is a new firmware interface in order to replace BIOS. Apple computers adopt to EFI. It's obvious that UEFI is more advanced than BIOS.

## MBR & GPT

You can consider that MBR and GPT are two formats of the partition table.

There are at most 4 main partitions in MBR drives (In general, we divide the disk into a main partition and an extended partition with several logical partitions inside). MBR doesn't support partitions which is greater than 2TB.

OS X only supports GPT drives officially. You must crack the kernel if you want to install OS X to a MBR drive and it will be dangerous to upgrade the system.

Windows only supports UEFI+GPT and Legacy+MBR.

## Chameleon & Clover

These two things are bootloaders for Hackintosh. `Chameleon` works in Legacy Mode. `Clover` supports both Legacy and UEFI mode.

## What GPT looks like

1. ESP (about 200MB, FAT32 filesystem): It has a special flag so you can't see ESP in Windows. UEFI will boot from \EFI\Boot\bootx64.efi by default.
2. MSR (128MB, unknown filesystem): Required by Windows under EFI Mode.
3. Your system and data partitions.
4. Dedicated, such as WinRE, System Images...

# Past & Now

1. Past (Legacy + MBR)
	* Bootloader: GRUB2 -> Chameleon -> Hackintosh
	* OS: Linux (Ubuntu) + OS X Mavericks
2. Now（EFI + GPT）
	* Bootloader: Clover
	* Note: I use a USB flash disk with GRUB2 installed to boot Linux. I'll repair GRUB2 then.

This is the profile of my laptop:

* Laptop: Lenovo V470
* CPU: Intel Core i5 2430M
* Chipset: Intel HM65
* Memory: 4GB 1600Mhz DDR3 x 2 (Kingston＋Hynix)
* Hard drive: WD 750GB 5400r
* Video cards: Intel HD 3000 (Works well. Video memory is 512MB. Brightness can be adjusted after modifying DSDT) ＋ Nvidia GT540M (Useless)
* Audio card: ALC272 (using VoodooHDA)
* Fignerprint: No drivers but can be used in virtual machines.
* Card reader: RTS5139, no drivers. (can be used in virtual machines)
* USB3.0: No
* Wireless: BCM4322 (changed manually. BIOS flashing required because of restrictions of Lenovo). No need for extra drivers.
* Ethernet: RTL8111E (use drivers from Realtek)
* Camera: No need for extra drivers.
* Touchpad: VoodooPS2Controller in the newest version. Multifinger is not well supported.
* HDMI: Only video is OK.
* VGA Port: Useless
* Battery: Battery drivers
* AppleIntelCPUPowerManagement: Yes (Set `AsusAICPUPM=yes` in config.plist)

# Steps

## Make a bootable USB drive

WinPE + [DiskGenius](http://diskgenius.cn).

Click on "免费下载" (Free Download), find "32 位版本" (32-bit Version) and download links are rightward. It's just a "免费版" (free version) however it's enough for converting.

DiskGenius can convert MBR to GPT without data loss.

## Install Clover

Download and Install [Clover](http://sourceforge.net/projects/cloverefiboot/files/?source=navbar) in OS X.

Installer will copy files to /EFI only because no GPT drives here.

You should learn how to configure Clover. I'm afraid to make mistakes so I read lots of posts about Clover. In fact, OS X should be able to start in default settings (without power management drivers and so on).

You need a `HFSPlus-64.efi` rather than vboxhfs64.efi. HFSPlus-64.efi can be downloaded via `Clover Configurator`. Clover may fail to boot the system and get stucked with a row of '+' with VBoxHFS64.efi.

Now,

1. Copy everything in `EE` (/Extra/Extensions) to `/EFI/CLOVER/kexts/10.9/`.
2. Copy `DSDT` & `SSDT` to `/EFI/CLOVER/ACPI/patched/` and name them to `DSDT.aml` & `SSDT.aml`.
3. Create a directory `/EFI/BOOT` and copy `/EFI/CLOVER/CLOVERX64.efi` to `/EFI/BOOT/BOOTX64.efi`.

The following list is about files in `/EFI/CLOVER/drivers64UEFI` directory in my computer: DataHubDxe-64.efi, EmnVariableUefi-64.efi, FSInject-64.efi, HFSPlus-64.efi (Download by yourself), OsxAptioFixDrv-64.efi, OsxFatBinaryDrv-64.efi, PartitionDxe-64.efi. (Learn how to configure Clover and decide which to use.)

Copy the whole /EFI directory to a USB flash drive. We'll move them to the new ESP partition.

## Create Partitions

Boot to your WinPE. Use your partition tool to create a 200MB, `FAT32` partition in the beginning of the drive.

If you have a Windows, go on creating a 128-MB partition.

Copy the EFI directory created just now to the first FAT32 partition.

## Convert!

I only know DiskGenius. In fact, there are several tools which can convert loselessly.

Open DiskGenius, click on "硬盘(D)" (Drive), "转换分区表类型为 GUID 格式" (Convert the partition table to GUID format), "确定" (OK). Then, click on "保存更改" (Save changes) on the toolbar. OK.

It's recommended to reboot after converting to let the system detect GPT correctly.


## Repair Partition ID

Boot to the WinPE again. Open `Command Prompt`, enter `diskpart`, and then type:

	list disk
	sel disk 0
	list part
	sel part 9 (Change '9' and numbers below to your own option)
	set id=48465300-0000-11AA-AA11-00306543ECAC
	sel part 0
	set id=C12A7328-F81F-11D2-BA4B-00A0C93EC93B
	sel part 1
	set id=E3C9E316-0B5C-4DB8-817D-F92DF00215AE

* `48465300-0000-11AA-AA11-00306543ECAC` represents HFS+.
* `C12A7328-F81F-11D2-BA4B-00A0C93EC93B` represents ESP.
* `E3C9E316-0B5C-4DB8-817D-F92DF00215AE` represents MSP.

## Repair Windows Boot

If you have a Windows, use `bcdboot` to repair the bootloader of Windows.

Just like this:

	bcdboot C:\Windows /s Z: /f UEFI

(Z: represents ESP.)

`bcdboot` will replace EFI\\BOOT\\BOOTX64.efi. Backup it and replace it with `EFI\CLOVER\CLOVERX64.efi`.

## Check

Reboot, enter the BIOS setup, and change `Boot Mode` to `UEFI`.

Congratulations! (If OS X works well, ...)

After booting, I configured Clover (`EFI/CLOVER/config.plist`) to make OS X work perfectly. Then I upgraded my OS X to 10.10 via App Store directly and no errors occured.

Of course, I hope you have an OS (software) which can modify files in HFS+ partition before upgrading.

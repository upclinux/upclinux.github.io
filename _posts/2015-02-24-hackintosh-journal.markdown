---
layout: post
title: "［备份用］黑苹果安装记录"
date: 2015-02-24 20:11:00
author: vjudge1
categories: Mac
tags: Hackintosh
---
* content
{:toc}

写本文纯粹是为了给自己留个备份。

不同电脑不一样。思路可以借鉴，步骤不要照抄！




# 基本信息

* Lenovo V470
* Legacy+MBR，故使用懒人版，并按照懒人版教程进行安装
* 启动器 Chameleon

# 安装盘的处理

将教程中有关 SNB 的文件复制到 /Extra。

/System/Library/Extensions 删除以下两个文件：

* AppleIntelCPUPowerManagement.kext
* AppleIntelCPUPowerManagementClient.kext

[% callout %]
注意

这两个驱动也可以通过 NullCPUPowerManagement 来屏蔽。
[% endcallout %]

下面驱动在没有问题的情况下不用删：

* AMD 开头的所有文件
* AppleThunderbolt 开头的 6 个文件
* NV 开头的 8 个文件
* IOBluetooth 开头的所有文件

# 安装完成

进入安装盘，再次把有关文件复制到 /Extra 中。

以下驱动酌情删除：

* AppleIntelCPUPowerManagement.kext（必删，除非有 NullCPUPowerManagement））
* AppleIntelCPUPowerManagementClient.kext（必删，除非有 NullCPUPowerManagement）
* AppleSmartBatteryManager.kext
* AppleIntelHDGraphics 开头的 5 个文件
* AppleThunderbolt 开头的 6 个文件
* GeForce 开头的 7 个文件
* NV 开头的 7 个文件（笔记本双显卡的请删除——其实不用删）
* AppleHDA.kext（必删，除非以后你想仿冒声卡）
* AMD 开头的 15 个文件
* ATIRadeon 开头的 4 个文件
* IOBluetooth 开头的所有文件（注意这个是蓝牙驱动，要是不删可以进入系统并且想使用蓝牙的留着吧）

[% callout %]
事实

一开始对苹果的底细一点都不清楚，心里感到害怕，就照着教程删了。后来偶然将系统升级，发现以上各驱动其实完全没必要删。
[% endcallout %]

# 驱动

## 声卡

VoodooHDA

## 网卡

有线网卡：RTL8111E 有驱动。

无线网卡：刷白名单，换成免驱的 BCM4322（详细参数：DEV 432B、VEN 14E4、SUBSYS 000D1028，刷机时用）。

## 屏幕亮度 DSDT

(1) Device (GFX0) { Name (ADR, ….) 的下一行加入：

    Method (_DSM, 4, NotSerialized)
    {
        Store (Package (0x12)
        {
            "device-id",
            Buffer (0x04)
            {
                0x06, 0x01, 0x00, 0x00
            },
            "model",
            Buffer (0x17)
            {
                "Intel HD Graphics 3000"
            },
            "hda-gfx",
            Buffer (0x0A)
            {
                "onboard-2"
            },
            "AAPL,HasPanel",
            Buffer (0x04)
            {
                0x01, 0x00, 0x00, 0x00
            },
            "AAPL,Haslid",
            Buffer (0x04)
            {
                0x01, 0x00, 0x00, 0x00
            },
            "AAPL,backlight-control",
            Buffer (0x04)
            {
                0x01, 0x00, 0x00, 0x00
            },
            "@0,backlight-control",
            Buffer (0x04)
            {
                0x01, 0x00, 0x00, 0x00
            },
            "@0,AAPL,boot-display",
            Buffer (0x04)
            {
                0x01, 0x00, 0x00, 0x00
            },
            "@0,built-in",
            Buffer (One)
            {
                0x01
            }
        }, Local0)
        DTGP (Arg0, Arg1, Arg2, Arg3, RefOf (Local0))
        Return (Local0)
    }

(2) Scope (\_SB) 后面加入

    Device (PNLF)
    {
        Name (_HID, EisaId ("APP0002"))
        Name (_CID, "backlight")
        Name (_UID, 0x0A)
        Name (_STA, 0x0B)
    }

(3) DTGP: 放到“Method (GETB, 3, Serialized)”的前面。DTGP 是一个非常常用的函数，不过我电脑没有。

    Method (DTGP, 5, NotSerialized)
    {
        If (LEqual (Arg0, Buffer (0x10)
            {
            /* 0000 */    0xC6, 0xB7, 0xB5, 0xA0, 0x18, 0x13, 0x1C, 0x44,
            /* 0008 */    0xB0, 0xC9, 0xFE, 0x69, 0x5E, 0xAF, 0x94, 0x9B
            }))
        {
            If (LEqual (Arg1, One))
            {
                If (LEqual (Arg2, Zero))
                {
                    Store (Buffer (One)
                    {
                        0x03
                    }, Arg4)
                    Return (One)
                }
                If (LEqual (Arg2, One))
                {
                    Return (One)
                }
            }
        }
        Store (Buffer (One)
        {
            0x00
        }, Arg4)
        Return (Zero)
    }

(4) 改亮度快捷键：Fn+Home、Fn+PageUp

## 电池电量

直接安装 ACPIBatteryManager。

下面是按照论坛贴子的教程进行的操作，只不过结果是完败。

思路：首先找到电池的函数。我的电脑电池函数与其他电脑不同——它是调用了其他函数。

记住所有涉及的变量名称，把多字节的变量全部拆成单字节的。

首先是拆字节需要的函数 B1B2 一类的——

    Method (B1B2, 2, NotSerialized)
    {
        Or (ShiftLeft (Arg1, 0x08), Arg0, Local0)
        Return (Local0)
    }
    Method (B1B4, 4, NotSerialized)
    {
        Or (ShiftLeft (Arg1, 0x08), Arg0, Local0)
        Or (ShiftLeft (Arg2, 0x10), Local0, Local0)
        Or (ShiftLeft (Arg3, 0x18), Local0, Local0)
        Return (Local0)
    }
    Method (L1L4, 4, NotSerialized)
    {
        Or (ShiftLeft (Arg1, 0x20), Arg0, Local0)
        Or (ShiftLeft (Arg2, 0x40), Local0, Local0)
        Or (ShiftLeft (Arg3, 0x60), Local0, Local0)
        Return (Local0)
    }
    Method (L1L6, 6, NotSerialized)
    {
        Or (ShiftLeft (Arg1, 0x20), Arg0, Local0)
        Or (ShiftLeft (Arg2, 0x40), Local0, Local0)
        Or (ShiftLeft (Arg3, 0x60), Local0, Local0)
        Or (ShiftLeft (Arg4, 0x80), Local0, Local0)
        Or (ShiftLeft (Arg5, 0xA0), Local0, Local0)
        Return (Local0)
    }
    Method (D2D4, 2, NotSerialized)
    {
        Or (ShiftLeft (Arg1, 0x80), Arg0, Local0)
        Return (Local0)
    }

然后按照论坛教程的模板，对不同字节变量进行替换即可。一共需要改数十处。

## HDMI/VGA

备注：这个修改仅对 Intel HD 3000 有效。

改 AppleIntelSNBGraphicsFB。

找到其中的：

    01020400 10070000 10070000  # 4 代表 4 个接口
    05030000 02000000 30000000  # 优先使用内建LCD
    02050000 00040000 07000000  # HDMI
    03040000 00040000 09000000  # DVI－A
    04060000 00040000 09000000  # DVI－D

此外还有

    06020000 10000000 09000000  # 表示VGA

根据实际需要进行替换即可。

由于 Clover 可以间接改文件，所以不会对系统造成破坏。

# Clover 设置

自从把 Legacy+MBR 换成 UEFI+GPT，感觉完美多了。

## kexts

* ACPIBatteryManager：电池电量驱动
* ElliottForgeLegacyRTC：防重置驱动
* FakeSMC：不用解释了吧
* VoodooHDA：万能声卡驱动
* VoodooPS2Controller：键鼠驱动

## drivers64UEFI

* DataHubDxe-64.efi
* EmuVariableUefi-64.efi
* FSInject-64.efi
* HFSPlus-64.efi
* OsxAptioFixDrv-64.efi
* OsxFatBinaryDrv-64.efi
* PartitionDxe-64.efi

其中 HFSPlus-64.efi 需要到论坛里搜。虽然 Clover Configuration 里面也有，只不过一是系统还未启动，二是下载地址被墙了。

## config.plist

* ACPI
    * DSDT
        * Name: DSDT.aml
    * PatchAPIC: Yes
* KernelAndKextPatches
    * AppleRTC: Yes
    * AsusAICPUPM: Yes（因为这个 Yes，我用上了原生电源管理）

序列号可以用一个叫 Clover Configuration 的软件生成。需要改两处：

* RtVariables 的 ROM
* SMBIOS

改完验证一下，通过之后就可以给苹果客服打电话修复 iMessage 和 FaceTime 了。

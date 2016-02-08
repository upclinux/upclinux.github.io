---
layout: post
title: "修复引导"
author: vjudge1
categories: Maintainance
---
* content
{:toc}

This article introduces how to install/repair bootloaders. Windows, Linux, EFI, Legacy are all metioned!




# EFI



## Windows only

## Linux (GRUB)

1. 安装 grub2（假设 /dev/sdb 挂在 /mnt/U）
grub2-install --target=x86_64-efi --root-directory=/mnt/U --boot-directory=/mnt/U --bootloader-id=GRUB2 --removable sdb1
(自定义目录：修改 --boot-directory)
2. 安装 EFI Shell
3. 配置 grub.cfg
4. Windows 安装盘注意事项：
    ① 只支持 Win7 和以上版本，而且必须是 64 位
    ② 需要从已经装好的 Windows 中拷一个 C:\Windows\Boot\EFI\bootmgfw.efi 拷到根目录里
    ③ Win7 建议使用企业版，否则激活时候很麻烦

## Windows + Linux (Windows bootloader)

## USB Drives

# Legacy

## Windows only

## Linux (GRUB)

1. 进入 GParted，给 /dev/sdb1 增加“boot”标识
2. 安装 grub2（假设 /dev/sdb 挂在 /mnt/U）
grub2-install --target=i386-pc --root-directory=/mnt/U --boot-directory=/mnt/U /dev/sdb
3. 配置 grub.cfg

## Windows + Linux (Windows bootloader)

## USB Drives

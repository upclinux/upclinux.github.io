---
layout: post
title: "Enable NTFS writing support in OS X"
date: 2015-05-29 21:10:02
author: vjudge1
categories: Mac
tags: Mac NTFS
---
* content
{:toc}

OS X mounts NTFS partitions as read-only parts automatically in default. But how can I access removable disks with NTFS format, or the Windows partition?

You may install third-party softwares in order to make NTFS partitions writable. 

In fact, OS X has a native support for writing in NTFS parts, if you are brave to enable it. 



Take `/dev/disk0s4` as an example.

## Write Once

Open `Terminal`, and type the following commands:

	mkdir ~/ntfs
	sudo diskutil unmount /dev/disk0s4
	sudo mount -o rw,auto,nobrowse -t ntfs /dev/disk0s4 ~/ntfs
	
Then the NTFS partition will be mounted to `~/ntfs`.

It's necessary to add `nobrowse` or OS X will still mount it in read-only mode. 

## Write Forever

If you hear of Linux, you should know `/etc/fstab`. OS X will read `/etc/fstab`, too.

Type `sudo vifs` in Terminal. Then add the following line:

	/dev/disk0s4 /mypart ntfs rw,auto,nobrowse
	
*If you don't know how to use Vi, press the letter `O` key, type the code, then press `Escape` key and `ZZ` (press `Z` twice).*
	
`nobrowse` is still required. And it means that the partition will not be shown in Devices in Finder. You can add it to Favorites manually.

After rebooting, OS X will mount the NTFS partition to `/mypart` in read-write mode.

## Issues

It's NOT recommended to do so because of potential data loss.

* If a file becomes grey, it means no permissions in OS X. You can copy it to a HFS+ partition (password required) before using it. You can also reset its owner and permission in Windows, but the file may be still grey.
* Some files may lose and some directories may be messy sometimes. Use `chkdsk /f` to repair them in Windows.
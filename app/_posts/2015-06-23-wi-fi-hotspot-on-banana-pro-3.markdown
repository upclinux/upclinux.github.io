---
layout: post
title: "Wi-Fi Hotspot on Banana Pro (3) - IPv6"
date: 2015-06-23 14:25:00
author: vjudge1
categories: Linux
tags: Wireless IPv6
---

* content
{:toc}

There is IPv6 in college. Why not use it?

I expected that the thinking of IPv6 will be the same as IPv4. However, there is no NAT support in the IPv6 protocol. So...




## DHCP Server (IPv4)

I used `udhcpd` as the DHCP Server. Now, I must give it up (`
    update-rc.d udhcpd disable`) because it doesn't support IPv6 at all.

I'll use `isc-dhcp-server` now:

    apt-get install isc-dhcp-server

Edit `/etc/default/isc-dhcp-server` and modify it to:

    INTERFACES="wlan0"

Edit `/etc/dhcpd/dhcpd.conf` and add:

    option routers 192.168.100.1;
    subnet 192.168.100.0 netmask 255.255.255.0 {
        range 192.168.100.100 192.168.100.200;
        option domain-name-servers 114.114.114.114;
        option broadcast-address 192.168.100.255;
    }


### Auto start

Just type the following commands in commandline:

    service isc-dhcp-server restart
    update-rc.d isc-dhcp-server enable

## Network Configuration

### Set IP

Type the following command:

    ifconfig wlan0 inet6 add 2001:db8:0:1::1/64

It can't be saved after rebooting, so we should modify `/etc/network/interfaces` and add:

    iface eth0 inet6 auto
    iface wlan0 inet6 static
        address 2001:db8:0:1::1
        netmask 64

{% comment %}
## Enable Forwarding

Edit `/etc/sysctl.conf` and modify:

    net.ipv6.conf.all.forwarding=1

    # Enable forwarding
    #    pre-up echo 1 > /proc/sys/net/ipv6/conf/default/forwarding
    #    pre-up echo 1 > /proc/sys/net/ipv6/conf/all/forwarding
    # But disable forwarding on THIS interface so we still get RAs
    #    pre-up echo 0 > /proc/sys/net/ipv6/conf/$IFACE/forwarding
    #    pre-up echo 1 > /proc/sys/net/ipv6/conf/$IFACE/accept_ra
    #    pre-up echo 1 > /proc/sys/net/ipv6/conf/all/accept_ra
    #    pre-up echo 1 > /proc/sys/net/ipv6/conf/default/accept_ra


## IPv6 Router Advertisement Daemon

Unlike IPv4, which uses DHCP for configuration, IPv6 uses the Neighbor Discovery Protocol to configure addresses and gateways.

Without forwarding, radvd will not run? And computers running Linux/Mac can't get addresses.

### Install radvd

Type:

    apt-get install radvd

Create file `/etc/radvd.conf` and put your internal interface and prefix there:

    interface wlan0
    {
        AdvSendAdvert on;
        prefix 2001:db8:0:1::/64
        {
        };
    };

You can now start the daemon with

    service radvd start
{% endcomment %}

## DHCP Server (IPv6)

### Configure dhcpd

Add a new file `/etc/dhcp/dhcpd6.conf` and type:

ddns-update-style none;

    default-lease-time 6000;
    max-lease-time 86400;
    log-facility local7;

    option dhcp6.name-servers 2001:4860:4860::8888;
    option dhcp6.domain-search "test.example.com","example.com";

    subnet6 2001:db8:0:1::/64 {
        range6 2001:db8:0:1::100 2001:db8:0:1::ffff;
    }

### /etc/init.d/dhcpd6

Copy the following codes to `/etc/init.d/dhcpd6`:

    #!/bin/sh
    #
    # $Id: isc dhcp server.init.d,v 4.2.1-P1 2011/04/05 /usr/local/sbin/dhcpd$
    #

    ### BEGIN INIT INFO
    # Provides:          dhcpd-server
    # Required-Start:    $remote_fs $network $syslog
    # Required-Stop:     $remote_fs $network $syslog
    # Should-Start:      $local_fs slapd
    # Should-Stop:       $local_fs slapd
    # Default-Start:     2 3 4 5
    # Default-Stop:      1
    # Short-Description: DHCP server
    # Description:       Dynamic Host Configuration Protocol Server
    ### END INIT INFO

    PATH=/sbin:/bin:/usr/sbin:/usr/bin

    # config file
    NAME=dhcpd6
    DESC="DHCP IPv6 server"
    INTERFACES="wlan0"

    SERVER=/usr/sbin/dhcpd
    SERVERARGS="-6"
    CONFIGFILE=/etc/dhcp/dhcpd6.conf
    LIBFOLDER=/var/lib/dhcp
    LEASEFILE="${LIBFOLDER}/dhcpd6.leases"
    RUNFOLDER=/var/run/dhcp
    DHCPDPID="${RUNFOLDER}/dhcpd6.pid"


    # check filetypes/values
    test -f "${SERVER}" || exit 0

    # include all init functions
    . /lib/lsb/init-functions

    test_config()
    {
     # 1.) check config
     if [ ! "${SERVER}" "${SERVERARGS}" -t -q -cf "${CONFIGFILE}" > /dev/null 2>&1 ]; then
       echo "${NAME} self-test failed. Please fix the config file."
       echo "The error was: "
       "${SERVER}" "${SERVERARGS}" -t -cf "${CONFIGFILE}"
       exit 1
     fi

     # 2.) test_config will started if someone wants to start the server
     # test if the server is currently running
     if [ "${1}" = "start" ]; then
       if [ -e "${DHCPDPID}" ]; then
         stop_server "Currently running instance of ${DESC} found (PID: `cat ${DHCPDPID}`) - will now stop this instance"
       fi
     fi
    }

    stop_server(){
     if [ "${1}" != "" ]; then
      log_daemon_msg "${1}"
     fi

     if [ -e "${DHCPDPID}" ]; then
       log_daemon_msg "Stopping ${DESC} ${NAME} [`cat ${DHCPDPID}`]"
       start-stop-daemon --stop --quiet --pidfile "${DHCPDPID}"
       log_end_msg $?
       rm -f "${DHCPDPID}"
     else
       log_daemon_msg "Stopping ${DESC} ${NAME}: nothing do do, no pidfile found"
     fi
    }

    # single arg is -v for messages, -q for none
    check_status(){
     if [ ! -r "$DHCPDPID" ]; then
       test "$1" != -v || echo "$NAME is not running."
       return 3
     fi

     if read pid < "$DHCPDPID" && ps -p "$pid" > /dev/null 2>&1; then
       test "$1" != -v || echo "$NAME is running."
       return 0
     else
       test "$1" != -v || echo "$NAME is not running but $DHCPDPID exists."
       return 1
     fi
    }

    case "$1" in
     start)
       test_config ${1}
       log_daemon_msg "Starting ${DESC} ${NAME}"

       # allow dhcp server to write lease and pid file
       if [ ! -e "${RUNFOLDER}" ]; then
         # create run folder
         mkdir -p "${RUNFOLDER}"
         #chown dhcpd:dhcpd "${RUNFOLDER}"

         # create pid file
         touch "${DHCPDPID}"
         #chown dhcpd:dhcpd "${DHCPDPID}"
       else
          # create pid file
         touch "${DHCPDPID}"
         #chown dhcpd:dhcpd "${DHCPDPID}"
       fi

       if [ ! -e "${LIBFOLDER}" ]; then
         # create run folder
         mkdir -p "${LIBFOLDER}"
         #chown dhcpd:dhcpd "${LIBFOLDER}"

         # create lease file
         touch "${LEASEFILE}"
         #chown dhcpd:dhcpd "${LEASEFILE}"
       else
          # create pid file
         touch "${LEASEFILE}"
         #chown dhcpd:dhcpd "${LEASEFILE}"
       fi

       start-stop-daemon --start --quiet --pidfile "${DHCPDPID}" --exec "${SERVER}" -- "${SERVERARGS}" -q -pf "${DHCPDPID}" -cf "${CONFIGFILE}"  -lf "${LEASEFILE}" "${INTERFACES}"
       sleep 2


       if check_status -q; then
         log_end_msg 0
       else
         log_failure_msg "check syslog for diagnostics."
         log_end_msg 1
         exit 1
       fi
       ;;
     stop)
       # stop dhcp server
       stop_server
       ;;

     restart | force-reload)
       test_config
       $0 stop
       sleep 2
       $0 start
       if [ "$?" != "0" ]; then
         exit 1
       fi
       ;;
     status)
       echo -n "Status of $DESC: "
       check_status -v
       exit "$?"
       ;;
     *)
       echo "Usage: $0 {start|stop|restart|force-reload|status}"
       exit 1
    esac

    exit 0

### Start the DHCP server

Type:

    chmod +x /etc/init.d/dhcpd6
    touch /var/lib/dhcp/dhcpd6.leases
    #chown dhcpd:dhcpd /var/lib/dhcp/dhcpd6.leases

Then type:

    service dhcpd6 start
    update-rc.d dhcpd6 defaults

## NAT

IPv6 doesn't support NAT and forwarding. So we need hack.


## References

* [Configuring ISC DHCPv6 Server](https://www.sixxs.net/wiki/Configuring_ISC_DHCPv6_Server)
* [Linux, IPv6, router advertisements and forwarding](http://strugglers.net/~andy/blog/2011/09/04/linux-ipv6-router-advertisements-and-forwarding/)
* [Linux IPv6 Router: RADVD + DHCPv6](http://koo.fi/blog/2013/03/20/linux-ipv6-router-radvd-dhcpv6/)
* [Linux 用作 IPv6 网关](https://bigeagle.me/2011/11/linux_as_ipv6_gateway/)
* [IPV6 获取地址却无法使用的解决方案](http://yangwenbo.com/articles/ipv6-route-error-fix.html)

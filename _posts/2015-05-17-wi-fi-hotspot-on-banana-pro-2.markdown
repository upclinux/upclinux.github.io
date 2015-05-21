---
layout: post
title: "Wi-Fi Hotspot on Banana Pro (2) - Auth"
date: 2015-05-17 18:22:23
author: vjudge1
categories: Linux
tags: Wireless hostapd
---

* content
{:toc}

All works are based on my [previous article](/linux/2015/05/15/wi-fi-hotspot-on-banana-pro-1.html). I continued to deploy `portal authentication`.

Before reading, make sure that you succeed to create an AP (Access Point) on the board.





## WifiDog

[Wifidog](http://dev.wifidog.org) is a complete and embeddable captive portal solution for wireless. You can open a free hotspot with authentication, e.g. charge system, WeChat Wifi.

*WeChat Wifi is a open Wi-Fi designed for marking. However, you can only use WeChat for subscribing the specific WeChat public account before surfing the Internet freely.*

### How does WifiDog work
[See here](http://dev.wifidog.org/wiki/doc/developer/FlowDiagram)

## WifiDog Gateway

### Install WifiDog Gateway

Wifidog consists of two parts: auth server and client daemon. I installed the client daemon firstly.

It can be [downloaded](https://github.com/wifidog/wifidog-gateway) from GitHub. I just used `git` command:

    git clone https://github.com/wifidog/wifidog-gateway

Then, `cd` to the directory, and type:

    ./autogen.sh
    make
    make install
    cp wifidog.conf /etc/

Type `wifidog` and you may receive a error about `libhttpd.so.0`. Just run `ldconfig` to fix it.

Now you can type `wifidog -c /etc/wifidog.conf -f -d 7` and watch what happening. 

### Configuration

Edit `/etc/wifidog.conf` and do the following changes:

    GatewayInterface wlan0
    AuthServer {
        Hostname 192.168.100.1
        SSLAvailable no
        HTTPPort 80
        Path /
        LoginScriptPathFragment login.php?
        PortalScriptPathFragment portal.php?
        MsgScriptPathFragment gw_message.php?
        PingScriptPathFragment ping.php?
        AuthScriptPathFragment auth.php?
    }

I just used the board as an auth server directly. If possible, please use EXTERNAL servers to reduce load of the router and use HTTPS protocol for security.

WifiDog provides lots of features such as IP blocking (may be like GFW?), trusted users. 

## Auth Server

### wifidog-auth

You can use [wifidog-auth](https://github.com/wifidog/wifidog-auth) in production environment. Here is a [tutorial](http://dev.wifidog.org/wiki/doc/install/auth-server) about deploying.

It's sorry that I failed to deploy the existing repo on my Banana Pro and it's too HUGE for me and my board. So I use a simple one instead.

### Mini server on board

I use lighttpd, PHP and MySQL for auth on the board. You can Google how to install them.

The following codes are from [zhyaof](http://talk.withme.me/?p=267) with some changes and they're just prototypes. DO NOT use them in production environment!

Create a database firstly (MySQL) and add a user named test:

    CREATE DATABASE portal;
    CREATE TABLE `users` (
        `username` VARCHAR(255) NOT NULL,
        `password` TEXT NOT NULL,
        `token` TEXT,
        `logintime` DATETIME DEFAULT NULL,
        `gw_address` TEXT,
        `gw_port` TEXT,
        `gw_id` TEXT,
        `mac` TEXT,
        `url` TEXT,
        PRIMARY KEY (`username`)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8;
    INSERT INTO users (username, password) VALUES ('test', '123456');

* `auth.php`: It must output `Auth: 1` or `Auth: 0` (other numbers are also OK if you read the docs). The former one means access to the Internet.

{% highlight php %}
<?php
    // Get parameters from URL firstly.
    $stage = isset($_GET['stage']) ? $_GET['stage'] : null;
    $ip = isset($_GET['ip']) ? $_GET['ip'] : null;
    $mac = isset($_GET['mac']) ? $_GET['mac'] : null;
    $token = isset($_GET['token']) ? $_GET['token'] : null;
    $incoming = isset($_GET['incoming']) ? $_GET['incoming'] : null;
    $outgoing = isset($_GET['outgoing']) ? $_GET['outgoing'] : null;
    $gw_id = isset($_GET['gw_id']) ? $_GET['gw_id'] : null;
    
    // mac & token are used for auth.
    if(!empty($mac) && !empty($token)) {
        // Connect to MySQL. Please change the the following code to your own.
        $con = mysql_connect('localhost', 'mysql_user', 'mysql_password');
        if(!$con) {
            echo 'Auth: 0';
        } else {
            mysql_select_db('portal', $con);
            // After succeeding to login, IP, MAC and Token from the user will be recorded into the database (login.php). 
            // MACs are to identify users. However, it can be bypassed by ARP spoofing.
            $result = mysql_query("SELECT * FROM users WHERE mac='$mac' AND token='$token'");
            if(!empty($result) && mysql_num_rows($result) != 0) {
                echo 'Auth: 1';
            } else {
                echo 'Auth: 0';
            }
        }
    } else {
        echo 'Auth: 0';
    }
{% endhighlight %}

* `portal.php`: A page that shows "Login successful" and jumps to the url (up to you).

{% highlight html %}
<?php
    session_start();
    $url = $_SESSION['url'];
?>
Login successful.
<script>setTimeout(function() { location.href = '<?php echo $url; ?>'; }, 1000);</script>
{% endhighlight %}

* `gw_message.php`: A page shown when error occurs.

{% highlight php %}
<?php
    $message = null;
    if(isset($_GET["message"])){
        $message = $_GET["message"];
    }
    echo $message;
{% endhighlight %}

* `ping.php`: Confirm that the server is alive and collect information of the load of the router. It'll be called regularly and must respond `Pong`.

{% highlight php %}
    Pong
{% endhighlight %}

* `login.php`: The router will provide information of the user and the server needs to show a login page. If correct, specific page (`http://$gw_address:$gw_port/wifidog/auth?token=......`) needs to be jumped to.

{% highlight php %}
<?php
    // Get parameters from the URL.
    $gw_address = isset($_GET['gw_address']) ? $_GET['gw_address'] : null;
    $gw_port = isset($_GET['gw_port']) ? $_GET['gw_port'] : null;
    $gw_id = isset($_GET['gw_id']) ? $_GET['gw_id'] : null;
    $mac = isset(isset($_GET['mac']) ? isset($_GET['mac'] : null;
    $url = isset($_GET['url']) ? $_GET['url'] : null;
    // gw_address, gw_port, gw_id and mac are required for auth.
    if (!empty($gw_address) && !empty($gw_port) && !empty($gw_id) && !empty($mac)) {
        // If POSTed from the login page, ...
        if (isset($_POST['username']) && isset($_POST['password'])) {
            // WARNING: NO defense of injection!
            $post_username = $_POST['username'];
            $post_password = $_POST['password'];
            // Connect to the database. Change these strings from your own.
            $con = mysql_connect('localhost', 'mysql_user', 'mysql_password');
            if(!$con) {
                $error_message = 'Failed to connect to the databse: '.mysql_error();
                // login_view.php is a login page and able to show error messages.
                include('login_view.php');
            }
            else{
                mysql_select_db(‘portal’, $con);
                // Validity check
                $result = mysql_query("SELECT * FROM users WHERE username='$post_username' AND password='$post_password'");
                if (!empty($result) && mysql_num_rows($result) != 0) {
                    // Authentication successful. Generate a random token.
                    $token = '';
                    $pattern = '1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLOMNOPQRSTUVWXYZ';
                    for($i=0; $i<32; $i++) {
                        $token .= $pattern{mt_rand(0,35)};
                    }

                    // Write token to the database. It'll occur in auth.php.
                    mysql_query("Update users SET token='$token', logintime='".date('Y-m-d H:i:s')."', gw_address='$gw_address', gw_port='$gw_port', gw_id='$gw_id', mac='$mac', url='$url' WHERE username='$post_username'");
                    $error_message = mysql_error();

                    // Just for backup
                    session_start();
                    $_SESSION['username'] = $post_username;
                    $_SESSION['url'] = $url;

                    // Login successful. Jump to the specific page.
                    header('Location: http://'.$gw_address.':'.$gw_port.'/wifidog/auth?token='.$token);
                } else {
                    // Login failed.
                    $error_message = 'Wrong username or password!';
                    include('login_view.php');
                }
            }
        } else {
            include('login_view.php');
        }
    }
{% endhighlight %}

`login_view.php`:

{% highlight html %}
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="language" content="en" />
    <title>Portal Login</title>
</head>
<body>
    <form method="post" action="<?php echo "login.php?gw_address=$gw_address&gw_port=$gw_port&gw_id=$gw_id&mac=$mac&url=$url"; ?>">
        <label for="username">Username</label>
        <input type="text" id="username" name="username" value="<?php echo $post_username; ?>"/>
        <label for="password">Password</label>
        <input type="password" id="password" name="password" value="<?php echo $post_password; ?>"/>
        <?php
            if(!empty($error_message)){
                echo "<h4>$error_message</h4>";
            }
        ?>
        <input type="submit" value="Submit"/>
    </form>
</body>
{% endhighlight %}

## Start wifidog

To have a test, please type:

    wifidog -c /etc/wifidog.conf -d 7 -f

If no error occurs, you can let it start automatially by adding a line in `/etc/rc.local`:

    /usr/local/bin/wifidog -c /etc/wifidog.conf


## References
* [Wifidog Documentation](http://dev.wifidog.org/wiki/doc/install/debian)
* [zhyaof](http://talk.withme.me/?p=267)

---
layout: post
title: "Request & Response for CGI"
date: 2015-06-07 15:02:00
author: vjudge1
categories: 网络
tags: Request C CGI
---

* content
{:toc}

I wrote a library about HTTP Request, Response and Session due to a project with [boa server](https://github.com/vjudge1/boa) required. After making php-cgi work, I gave up this library eventually.

This article is about HTTP Request & Response.

These codes are not suitable in production environment. Use [cgic](http://www.boutell.com/cgic/) instead.





# CGI

CGI is a standard for dynamic generation of web pages by a web server.

In general, static pages don't meet demand obviously. However, a web server can't execute dynamic files such as PHP, ASP directly so such work should be delivered to a special program.

How do the web server and the program exchange datas with each other? Obey a specific rule! And this rule is called CGI.

![cgi1](/img/2015-06-07-request/cgi1.gif)

The CGI program can be written in any languages because CGI is just an interface, not a kind of language.

## Exchange

CGI programs exchange information via standard input `stdin`, standard output `stdout` and `environment variables`.

![cgi2](/img/2015-06-07-request/cgi2.png)

The web server will provide a number of variables. The CGI programs can fetch server infomation via these variables. Refer to [Wikipedia](https://en.wikipedia.org/wiki/Common_Gateway_Interface) for more information. This time I only use REQUEST_METHOD, QUERY_STRING and CONTENT_LENGTH.

The CGI programs should output the `HTTP Header` (Don't forget it!) and HTML codes to `stdout`. And, what the program outputs is exactly what the browser receives.

# HTTP Request

There are two main kinds of request methods: HTTP `GET` and `POST`. After you submit a form, the browser will encode what you input as a special string. The form of the string is the same whether using GET or POST.

The CGI program should detect the mode by the variable `REQUEST_METHOD`.

* Requests from HTTP GET just follow the URL. It looks like `http://www.blahblah.com/cgi-bin/a?param1=value1&param2=value2`.

  The data can be read from the variable `QUERY_STRING`.

* You can't see requests directly via POST (However you can see it when using a developer tool or opening developer mode of the browser). More data can be transfered in POST mode than GET.

  The data should be read from `stdin`. And the variable `CONTENT_LENGTH` means the length of data.

# Code

## Request

The `request` code contains two files: request.h and request.c.

### request.h

{% highlight c %}
// request.h : Header of HTTP GET & POST
// Only application/x-www-form-urlencoded can be dealed with.
#ifndef REQUEST_H
#define REQUEST_H

#define HTTP_GET    1
#define HTTP_POST   2

#define POST_MAXLEN 2097152

// A simple dictionary
#define KEY_MAXLEN  64
#define VAL_MAXLEN  64
typedef struct
{
    char key[KEY_MAXLEN];
    char value[VAL_MAXLEN];
} key_pair;

char *getQuery(int *);
key_pair *decodeQuery(char *, int *);
char *encodeQuery(key_pair *, int n);
char hex2dec(char);
#endif
{% endhighlight %}

#### request.c

{% highlight c %}
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include "request.h"

/**
 * Fetch the query string from the server.
 */
char *getQuery(int *requestMode)
{
    char *method = getenv("REQUEST_METHOD");
    if (!method)
    {
        // If you run the program directly ...
        *requestMode = 0;
        return NULL;
    }
    else if (strcmp(method, "POST") == 0)
    {
        *requestMode = HTTP_POST;
        int len = atoi(getenv("CONTENT_LENGTH"));
        // It may cause buffer overflow if someone designs a wrong CONTENT_LENGTH.
        if (len >= POST_MAXLEN) len = POST_MAXLEN;

        // Read POST data from stdin
        char *buffer = (char *)malloc(len+1);
        memset(buffer, 0, len+1);
        fread(buffer, len, 1, stdin);

        return buffer;
    }
    else if (strcmp(method, "GET") == 0)
    {
        *requestMode = HTTP_GET;
        // Read GET data from the variable QUERY_STRING
        return getenv("QUERY_STRING");
    }
    return NULL;
}

/**
 * Convert the query string to a dictionary.
 */
key_pair *decodeQuery(char *data, int *count)
{
    if (data == NULL) return NULL;

    int i;
    int cnt = 0;
    char *ch = data;

    // Count the number of parameters
    while (*ch != '\0')
    {
        if (*ch == '=') cnt++;
        ch++;
    }
    *count = cnt;
    if (cnt == 0) return NULL;

    key_pair *k = (key_pair *)malloc(cnt * sizeof(key_pair));
    memset(k, 0, cnt*sizeof(key_pair));

    int pos = 0;
    ch = data;
    while (*ch != '\0')
    {
        char *c_key = k[pos].key;
        while (*ch != '&' && *ch != '\0' && (c_key-k[pos].key < KEY_MAXLEN-1))
        {
            if (*ch == '+')         // Space
            {
                *(c_key++) = ' ';
                ch++;
            }
            else if (*ch == '%')    // ASCII chars
            {
                ch++;
                char ascii = hex2dec(*(ch++));
                ascii = ascii*16 + hex2dec(*(ch++));
                *(c_key++) = ascii;
            }
            else
            {
                *(c_key++) = *(ch++);
            }
        }
        *c_key = '\0';
        if (*ch == '\0') break;

        ch++;

        char *c_value = k[pos].value;
        while (*ch != '&' && *ch != '\0' && (c_value-k[pos].value < VAL_MAXLEN))
        {
            if (*ch == '+')
            {
                *(c_value++) = ' ';
                ch++;
            }
            else if (*ch == '%')
            {
                ch++;
                char ascii = hex2dec(*(ch++));
                ascii = ascii*16 + hex2dec(*(ch++));
                *(c_value++) = ascii;
            }
            else
            {
                *(c_value++) = *(ch++);
            }
        }
        *c_value = '\0';

        if (*ch == '&') ch++;
        pos++;
    }

    return k;
}

/**
 * Convert a hex digit to a decimal number
 */
char hex2dec(char c)
{
    if (c>='0' && c<='9')
        return c-'0';
    else if (c>='A' && c<='F')
        return c-'A'+10;
    else if (c>='a' && c<='f')
        return c-'a'+10;
    else
        return 0;
}

/**
 * Convert a dictionary to a query string
 */
char *encodeQuery(key_pair *data, int n)
{
    // I assume that all characters need to be encoded as hexadecimal format.
    char *tmp = (char *)malloc(3*n*(KEY_MAXLEN+VAL_MAXLEN)+2*n+1);
    memset(tmp, 0, 3*n*(KEY_MAXLEN+VAL_MAXLEN)+2*n+1);
    char *ch = tmp;

    int i,j;
    for (i=0; i<n; i++)
    {
        for (j=0; j<2; j++)     // 0 is the key and 1 is the value
        {
            char *ch2;
            if (j==0) ch2=data[i].key; else ch2=data[i].value;
            while (*ch2 != '\0')
            {
                if ((*ch2>='0'&&*ch2<='9') ||
                    (*ch2>='A'&&*ch2<='Z') ||
                    (*ch2>='a'&&*ch2<='z') ||
                    (*ch2=='_'||*ch2=='*'||*ch2=='-'||*ch2=='.'))
                {
                    // Needn't be encoded
                    *(ch++)=*(ch2++);
                }
                else
                {
                    unsigned char uc = (unsigned char) *ch2;
                    unsigned char ucb = uc/16;
                    *(ch++)='%';
                    if (ucb<10) *(ch++)='0'+ucb; else *(ch++)='A'+(ucb-10);
                    ucb=uc%16;
                    if (ucb<10) *(ch++)='0'+ucb; else *(ch++)='A'+(ucb-10);
                }
            }
            if (j==0) *(ch++) = '=';
        }
        // Separator
        if (i<n-1) *(ch++) = '&';
    }

    int len = ch-tmp+1;
    tmp = (char *)realloc(tmp, len);
    return tmp;
}
{% endhighlight %}

## Example

Compile the complete C code to the `cgi-bin` directory and name it to `request.cgi`. Execute permission is also required.

Copy `test.html` to the document directory. For example, `/var/www/test.html`.

### test.html

{% highlight html %}
<h2>HTTP GET</h2>
<form method="get" action="/cgi-bin/request.cgi">
  <input type="text" name="a"><input type="password" name="b">
  <input type="submit">
</form>
<h2>HTTP POST</h2>
<form method="post" action="/cgi-bin/request.cgi">
  <input type="text" name="a"><input type="password" name="b">
  <input type="submit">
</form>
{% endhighlight %}

### test.c

This program will detect type of the request, and output parameters in tabular form.

{% highlight c %}
#include <stdio.h>
#include <stdlib.h>
#include "request.h"

int main(int argc, char *argv[])
{
    // Don't forget HTTP Header!
    printf("Content-type: text/html\n\n");

    int m;
    char *s = getQuery(&m);

    switch (m)
    {
    case HTTP_GET:
        printf("<h1>GET</h1>");
        if (s)
            printf("%s", s);
        break;
    case HTTP_POST:
        printf("<h1>POST</h1>");
        printf("%s", s);
        break;
    default:
        printf("Don't run this program directly!");
        return 0;
        break;
    }

    key_pair *k = decodeQuery(s, &m);
    if (k)
    {
        printf("<table><tr><th>Key<th><th>Value</th></tr>");
        int i;
        for (i=0; i<m; i++)
            printf("<tr><td>%s</td><td>%s</td></tr>", k[i].key, k[i].value);
        printf("</table>");
    }

    printf("<p><a href=\"javascript: history.go(-1);\">Go Back</a></p>");

    return 0;
}
{% endhighlight %}

## Issues

* It's hard to write a flexible dictionary structure so I just write a fixed-width one. Query keys and values mustn't exceed 64 bytes or they will be truncated.

  On the other hand, fixed-width structures are a waste of memory.

* Query strings must be in correct form or the program may get errors.

# References

* [我所了解的cgi by liuzhang](http://www.cnblogs.com/liuzhang/p/3929198.html)

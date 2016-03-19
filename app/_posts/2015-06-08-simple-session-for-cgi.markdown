---
layout: post
title: "Session for CGI"
date: 2015-06-08 15:02:00
author: vjudge1
categories: 网络
tags: Session C CGI
---
* content
{:toc}

To be continued...



# Codes

My own [request codes](/2015/06/07/simple-request-for-cgi.html) are required.

## session.h

{% highlight c %}
#ifndef SESSION_H
#define SESSION_H

#define SESSION_TIME    1200
#define HASH_LEN        16
#define COOKIE_MAX_LEN  4096

void startSession();
void newSession();
void setSession(char *, char *);
char *getSession(char *);
void killSession();

char sessionId[HASH_LEN+1] = "";
key_pair *session = NULL;
int session_n = 0;
int sessionStarted = 0;

#endif
{% endhighlight %}

## session.c

{% highlight c %}
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <time.h>

#include <sys/types.h>
#include <sys/stat.h>
#include <fcntl.h>

#include "request.h"
#include "session.h"

/*
 * Start a session. Used in a page start, and the page will get data which stored in the server.
 */
void startSession()
{
    int i;
    char *sid = getenv("HTTP_COOKIE");

    // Get the session id in Cookie.
    // If gets nothing, create a new session.

    if (sid == NULL || strlen(sid) <= 10)
    {
        newSession();
        return;
    }
    else
    {
        char *ch = &sid[10];
        memset(sessionId, 0, sizeof(sessionId));
        for (i=0; i<HASH_LEN; i++)
        {
            if (*ch == '\0') break;
            if ((*ch>='0'&&*ch<='9') || (*ch>='A'&&*ch<='F')) sessionId[i]=*ch;
            ch++;
        }
    }

    // Get data that stored in the server
    char str_fp[50];
    snprintf(str_fp, 50, "/tmp/sess_%s.txt", sessionId);

    int fd = open(str_fp, O_RDONLY);
    if (fd == -1)
    {
        // No data
        newSession();
        return;
    }

    char buffer[COOKIE_MAX_LEN+1];
    char buffer2[1025];
    int readno, pos = 0;
    while ((readno=read(fd, buffer2, 1024)) > 0)
    {
        strcat(buffer+pos, buffer2);
        pos+=readno;
    }
    close(fd);

    // Check whether the session is valid or not
    session = decodeQuery(buffer, &session_n);

    int correct = 0;

    for (i=0; i<session_n; i++)
    {
        if (strcmp(session[i].key, "CLIENT_IP")==0)
        {
            char *ip = getenv("REMOTE_ADDR");
            if (ip && strcmp(session[i].value, ip)==0) correct++;
        }
        else if (strcmp(session[i].key, "LAST_TIME")==0)
        {
            time_t now;
            time(&now);

            if (now - atoi(session[i].value) < SESSION_TIME) correct++;
        }

        if (correct==2) break;
    }

    if (correct<2)
    {
        // Invalid session (IP has been changed, or the session is expired)
        killSession();
        newSession();
        return;
    }
    else
    {
        // Valid session. Confirm the latest time.
        char tm[15];
        time_t now;
        time(&now);
        sprintf(tm, "%d", now);
        setSession("LAST_TIME", tm);
    }

    sessionStarted = 1;
}

/*
 * Kill the current session and delete stored data.
 */
void killSession()
{
    if (sessionStarted)
    {
        free(session);
        session = NULL;
        session_n = 0;
        sessionStarted = 0;

        char str_fp[50];
        snprintf(str_fp, 50, "/tmp/sess_%s.txt", sessionId);
        remove(str_fp);

        memset(sessionId, 0, sizeof(sessionId));
    }
}

/*
 * Create a new session.
 */
void newSession()
{
    int i;

    time_t now;
    time(&now);

    killSession();

    // Get a random hash
    memset(sessionId, 0, sizeof(sessionId));
    srand(now);
    for (i=0; i<HASH_LEN; i++)
    {
        int tmp = rand()%16;
        if (tmp>=0 && tmp<=9)
            sessionId[i] = '0'+tmp;
        else
            sessionId[i] = 'A'+(tmp-10);
    }

    // Record the IP and the time
    char *ip = getenv("REMOTE_ADDR");
    if (ip==NULL)
        return;

    char str_fp[32];
    snprintf(str_fp, sizeof(str_fp), "/tmp/sess_%s.txt", sessionId);

    int fd = open(str_fp, O_WRONLY|O_CREAT);
    if (fd == -1)
        return;

    session = (key_pair *)malloc(2*sizeof(key_pair));
    char tmp[100];
    time(&now);
    sprintf(tmp, "%d", now);

    strcpy(session[0].key, "CLIENT_IP");
    strcpy(session[0].value, ip);
    strcpy(session[1].key, "LAST_TIME");
    strcpy(session[1].value, tmp);

    char *sz = encodeQuery(session, 2);
    write(fd, sz, strlen(sz));

    close(fd);
    free(sz);
    sz=NULL;

    sessionStarted = 1;
    session_n=2;

    // The SESSIONID is a key which is used to
    // exchange data from the client and the server.
    printf("Set-Cookie:SESSIONID=%s\n", sessionId);
}

/*
 * Get a stored value.
 */
char *getSession(char *key)
{
    if (!sessionStarted) return NULL;

    int i;
    for (i=0; i<session_n; i++)
    {
        if (strcmp(session[i].key, key) == 0)
            return session[i].value;
    }
    return NULL;
}

/*
 * Store a value.
 */
void setSession(char *key, char *value)
{
    if (!sessionStarted) return;

    int i;
    int found = 0;
    for (i=0; i<session_n; i++)
    {
        if (strcmp(session[i].key, key) == 0)
        {
            strncpy(session[i].value, value, VAL_MAXLEN);
            found = 1;
            break;
        }
    }

    // Allocate space
    if (!found)
    {
        session = (key_pair *) realloc(session, (session_n+1)*sizeof(key_pair));
        strncpy(session[session_n].key, key, KEY_MAXLEN);
        strncpy(session[session_n].value, value, VAL_MAXLEN);
        session_n++;
    }

    // Save values to the disk.
    char str_fp[32];
    snprintf(str_fp, sizeof(str_fp), "/tmp/sess_%s.txt", sessionId);

    int fd = open(str_fp, O_WRONLY|O_CREAT);
    if (fd == -1)
        return;

    char *sz = encodeQuery(session, session_n);
    write(fd, sz, strlen(sz));

    close(fd);
    free(sz);
    sz=NULL;
}
{% endhighlight %}

# Example

Compile the complete C code to the `cgi-bin` directory and name it to `session.cgi`. Execute permission is also required.

Then you can use url like 'http://xxx.xxx.xxx.xxx/cgi-bin/session.cgi' to see numbers.

{% highlight c %}
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <time.h>

#include <sys/types.h>
#include <sys/stat.h>
#include <fcntl.h>

#include "request.h"
#include "session.h"

int main()
{
    printf("Content-type: text/html\n");
    startSession();
    printf("\n");

    if (getSession("num") == NULL)
    {
        setSession("num", "0");
        setSession("num2", "0");
    }
    if (getSession("num") == NULL)
    {
        printf("...\n");
    }
    else
    {
        int n = atoi(getSession("num"));
        n++;
        printf("%d\n", n);

        char buffer[20];
        sprintf(buffer, "%d", n);
        setSession("num", buffer);

        n = atoi(getSession("num2"));
        n+=2;
        printf("<br>%d\n", n);

        sprintf(buffer, "%d", n);
        setSession("num2", buffer);
    }
    return 0;
}
{% endhighlight %}

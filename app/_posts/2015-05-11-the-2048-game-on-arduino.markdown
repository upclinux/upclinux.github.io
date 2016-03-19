---
layout: post
title: "The 2048 Game on Arduino"
date: 2015-05-11 13:01:20
author: vjudge1
categories: 无聊
tags: Arduino
---

* content
{:toc}

One day, I felt boring. Finding some electronic components nearby, I wrote a little game -- The 2048 Game on Arduino Uno.

The function is really simple. You just need 4 buttons for moving. If GAME OVER, just press reset button and play again.





# Requirement

* an Arduino board like Uno
* 4 buttons
* a LCD12864 screen (The chip of my screen is ST7920.)
* a bread board with some wires

# Sketches
<img src="/img/arduino2048sketches.png" width="700" />

4 buttons are placed horizontally. They are same as direction keys in `Vim` (h, j, k, l).

* The 1st button means LEFT.
* The 2nd button means DOWN.
* The 3rd button means UP.
* The 4th button means RIGHT.

It's much better if you have a joystick-like button. Unfortunately, I have no one.

# Preparation
You need Arduino IDE and `u8glib` Library for Arduino.

u8glib is a library for LCD screens. You can get it from [Google Code](https://code.google.com/p/u8glib/) or [BaiduYun](http://pan.baidu.com/s/1dDfApod).

After downloading it, you need extract it to `~/Documents/Arduino/libraries` directory.

# Code

{% highlight c++ %}
/*
 *   ARDUINO 2048
 *
 *   2015.2.14
 *
 */

#include <U8glib.h>

typedef unsigned char uchar;

// SCK=3, MOSI=9, CS=8
U8GLIB_ST7920_128X64_1X lcd(3, 9, 8);

#define UP      6
#define DOWN    5
#define LEFT    4
#define RIGHT   7

uchar board[4][4] = {0};
boolean gameOver = false;

char number[][5] = {"", "2", "4", "8", "16", "32", "64", "128",
    "256", "512", "1024", "2048", "4096", "8192", "####"
};

void paintBoard()
{
    uchar left = 1;
    uchar top = 5;
    uchar spanV = 1, spanH = 1;
    uchar textHeight = 10, textWidth = 7;

    lcd.firstPage();
    lcd.setFont(u8g_font_7x14);
    lcd.setFontPosTop();
    do {
        // Border
        for (uchar i=0; i<=4; i++)
            lcd.drawHLine(left + spanH,
                top + spanV*(2*i+1) + textHeight*i + 1*i,
                10*spanH + 16*textWidth + 1*5 - spanH*2);
        for (uchar i=0; i<=4; i++)
            lcd.drawVLine(left + spanH*(2*i+1) + textWidth*4*i + 1*i,
                top + spanV,
                spanV*10 + textHeight*4 + 1*5 - spanV*2);

        // Text
        for (uchar i=0; i<4; i++)
        {
            for (uchar j=0; j<4; j++)
            {
                uchar x=left + spanH*2*(j+1) + textWidth*j*4 + 1*(j+1);
                uchar y=top + spanV*2*(i+1) + textHeight*i + 1*(i+1) - 2;
                //Serial.print(board[i][j]);
                lcd.drawStr(x, y, number[board[i][j]]);
            }
        }
    } while (lcd.nextPage());
}

boolean move(uchar direction, boolean fake = false)
{
    uchar temp[4][4];
    boolean changed = false;
    memcpy(temp, board, sizeof(board));

    /*
     * There are ? situations about moving. Take LEFT as an example:
     *   1 1 2 1   =>   2 1 1 1 (Move)
     *   2 4 8 4   =>   2 4 8 4 (Take no action)
     *   2 2 4 1   =>   4 4 1 1 (Combine)
     *   1 2 2 4   =>   4 4 1 1 (Move & Combine)
     *   1 1 1 1   =>   1 1 1 1 (No action)
     *   2 2 4 4   =>   4 8 1 1
     *
     * So we move them firstly. Then we combine them. And we move them again.
     */
    switch (direction)
    {
        case UP:
            for (char j=0; j<4; j++)
            {
                char p = 0, q = 0;
                for (q=0; q<4; q++)
                    if (temp[q][j])
                    {
                        if (p!=q) changed=true;
                        temp[p++][j]=temp[q][j];
                    }
                for (; p<4; p++) temp[p][j] = 0;
            }

            for (char j=0; j<4; j++)
                for (char i=0; i<3; i++)
                    if (temp[i][j] && temp[i][j]==temp[i+1][j])
                    {
                        temp[i][j]++;
                        temp[i+1][j]=0;
                        changed=true;
                    }

            for (char j=0; j<4; j++)
            {
                char p = 0, q = 0;
                for (q=0; q<4; q++) if (temp[q][j]) temp[p++][j]=temp[q][j];
                for (; p<4; p++) temp[p][j] = 0;
            }
            break;

        case DOWN:
            for (char j=0; j<4; j++)
            {
                char p = 3, q = 0;
                for (q=3; q>=0; q--)
                    if (temp[q][j])
                    {
                        if (p!=q) changed=true;
                        temp[p--][j]=temp[q][j];
                    }
                for (; p>=0; p--) temp[p][j] = 0;
            }

            for (char j=0; j<4; j++)
                for (char i=3; i>0; i--)
                    if (temp[i][j] && temp[i][j]==temp[i-1][j])
                    {
                        temp[i][j]++;
                        temp[i-1][j]=0;
                        changed=true;
                    }

            for (char j=0; j<4; j++)
            {
                char p = 3, q = 0;
                for (q=3; q>=0; q--) if (temp[q][j]) temp[p--][j]=temp[q][j];
                for (; p>=0; p--) temp[p][j] = 0;
            }
            break;

        case LEFT:
            for (char i=0; i<4; i++)
            {
                signed p = 0, q = 0;
                for (q=0; q<4; q++)
                    if (temp[i][q])
                    {
                        if (p!=q) changed=true;
                        temp[i][p++]=temp[i][q];
                    }
                for (; p<4; p++) temp[i][p] = 0;
            }

            for (char i=0; i<4; i++)
                for (char j=0; j<3; j++)
                    if (temp[i][j] && temp[i][j]==temp[i][j+1])
                    {
                        temp[i][j]++;
                        temp[i][j+1]=0;
                        changed=true;
                    }

            for (char i=0; i<4; i++)
            {
                signed p = 0, q = 0;
                for (q=0; q<4; q++) if (temp[i][q]) temp[i][p++]=temp[i][q];
                for (; p<4; p++) temp[i][p] = 0;
            }
            break;

        case RIGHT:
            for (char i=0; i<4; i++)
            {
                signed p = 3, q = 0;
                for (q=3; q>=0; q--)
                    if (temp[i][q])
                    {
                        if (p!=q) changed=true;
                        temp[i][p--]=temp[i][q];
                    }
                for (; p>=0; p--) temp[i][p] = 0;
            }

            for (char i=0; i<4; i++)
                for (char j=3; j>0; j--)
                    if (temp[i][j] && temp[i][j]==temp[i][j-1])
                    {
                        temp[i][j]++;
                        temp[i][j-1]=0;
                        changed=true;
                    }

            for (char i=0; i<4; i++)
            {
                signed p = 3, q = 0;
                for (q=3; q>=0; q--) if (temp[i][q]) temp[i][p--]=temp[i][q];
                for (; p>=0; p--) temp[i][p] = 0;
            }
            break;
    }

    if (!fake) memcpy(board, temp, sizeof(temp));
    return changed;
}

void generateNumber()
{
    uchar emptyBlock[16], n;
    n=0;
    for (uchar i=0; i<4; i++)
        for (uchar j=0; j<4; j++)
            if (board[i][j] == 0)
                emptyBlock[n++] = i*4+j;

    if (n)
    {
        uchar p = random(0, n);
        uchar x, y;
        x = emptyBlock[p]/4;
        y = emptyBlock[p]%4;
        board[x][y] = 1;
    }
}

void detectGameOver()
{
    if (move(LEFT, true) ||
          move(RIGHT, true) ||
          move(UP, true) ||
          move(DOWN, true))
        return;

    gameOver = true;

    lcd.firstPage();
    lcd.setFont(u8g_font_ncenB14);
    lcd.setFontPosTop();
    do {
        lcd.drawStr(3,23,"GAME OVER");
    } while(lcd.nextPage());
}

void setup()
{
    pinMode(4, INPUT_PULLUP);
    pinMode(5, INPUT_PULLUP);
    pinMode(6, INPUT_PULLUP);
    pinMode(7, INPUT_PULLUP);

    memset(board, 0, sizeof(board));
    gameOver = false;

    randomSeed(analogRead(0));

    generateNumber();
    generateNumber();

    lcd.begin();
    paintBoard();

    //Serial.begin(9600);
}

void loop()
{
    if (!gameOver)
    {
        // Check buttons
        for (uchar i=4; i<=7; i++)
        {
            if (digitalRead(i) == LOW)
            {
                if (move(i, true))
                {
                    move(i);
                    generateNumber();
                    paintBoard();
                    detectGameOver();
                    delay(200);
                }
           }
        }
    }
}
{% endhighlight %}

# Preview
<img src="/img/arduino2048.jpg" width="500" />

---
layout: post
title: "A brief introduction to Java for C++ learners"
date: 2015-07-13 09:00:00
author: vjudge1
categories: Java
---
* content
{:toc}

Java is developed from C++ so it's easy to learn Java if you know C++.




# Intro

## Java SE/EE/ME
* Java SE: mainly used in desktop environment.
* Java EE: mainly used for web applications.
* Java ME: used in embedded systems.

## Setup the environment

1. Download & Install JDK.
2. Set the environment variable `JAVA_HOME`.
3. Download Eclipse. It can be executed directly.

## Hello world

Create a file named `Main.java` and type:

{% highlight java %}
public class Main {
	public static void main(String [] args) {
		System.out.println("Hello world!");
	}
}
{% endhighlight %}
	
The names of the file and the class must be the same.

Compile and run:

	javac Main.java
	java Main
	
# Basic syntax

## Data Types

* Integers: byte (-128~127), short (-32768~32767), int (-2147483648~2147483647), long (-9223372036854775808~9223372036854775807). **There are NO signed and unsigned.**
* Floats: float, double
* char
* boolean

Constants are declared by the keyword `final` instead of const.

## Operators

They are the same as those in C++. However, the operand of &&, \|\|, ! must be boolean.

## Statements

if, while, for, switch are the same, but things in brackets of if, while, for must be boolean.

## Arrays

{% highlight java %}
int arr[], arr2[][];
int [] arr;
int [][] arr2;

arr = new int[5];
arr2 = new int[5][4];
int arr = new int[] {1,2,3,4,5};
{% endhighlight %}

* A function must be a member of class. 
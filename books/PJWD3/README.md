# 《JavaScritp 高级程序设计（第3版）》（*Professional JavaScript for Web Developers 3rd Edition*）

![](IMG_6214.jpg)

## 书评

## 目录

## 第 1 章 JavaScript 简介

## 第 2 章 在 HTML 中使用 JavaScript

## 第 3 章 基本概念

### 3.1 语法

- 区分大小写
- 标识符第一个字符必须是一个字母、下划线（_）或一个美元符号（$）
- 单行注释 // 多行注释 /**/
- 严格模式 "use strict";
- 语句（语句结尾可以不用分号）


### 3.2 关键字和保留字

### 3.3 变量

var

### 3.4 数据类型

- 基本数据类型：Undefined、Null、Boolean、Number 和 String
- 复杂数据类型：Object

#### 3.4.1 typeof 操作符

- "undefined"——如果这个值未定义；
- "boolean"——如果这个值是布尔值；
- "string"——如果这个值是字符串；
- "number"——如果这个值是数值；
- "object"——如果这个值是对象或 null
- "function"——如果这个值是函数


#### 3.4.2 Undefined 类型

只有一个值：undefined

#### 3.4.3 Null 类型

只要意在保存对象的变量还没有真正保存对象，就应该明确地让该变量保存 null 值。

#### 3.4.4 Boolean 类型

true 和 false

#### 3.4.5 Number 类型

- Infinity（正无穷）
- -Infinity（负无穷）
- NaN 在 ECMAScript 中，任何数值除以非数值会返回 NaN
- 数值转换 Number()、parseInt()、parseFloat()

#### 3.4.6 String 类型

用双引号表示的字符串和用单引号表示的字符串完全相同

#### 3.4.7 Object 类型

Object 类型是所有它的实例的基础


### 3.5 操作符

#### 3.5.7 相等操作符

- 相等(==)和不相等(!=)
- 全等(===)和不全等(!==)

### 3.6 语句

#### 3.6.1 if 语句
#### 3.6.2 do-while 语句
#### 3.6.3 while 语句
#### 3.6.4 for 语句
#### ★3.6.5 for-in 语句
for-in 语句是一种精准的迭代语句

	for(var propName in window){
		document.write(propName);
	}

#### ★3.6.6 label 语句
#### 3.6.7 break 和 continue 语句
#### ★3.6.8 with 语句
with 语句的作用是将代码的作用域设置到一个特定的对象中

	with(expression) statement;

#### 3.6.9 switch 语句 

### 3.7 函数

ECMAScript 中的函数在定义时不必指定是否返回值

	function sum(num1, num2){
		return num1 + num2;
	}

#### 3.7.1 理解参数
#### 3.7.2 没有重载

## 第 4 章 变量、作用域和内存问题

## 第 5 章 引用类型

## 第 6 章 面向对象的程序设计

## 第 7 章 函数表达式

## 第 8 章 BOM

## 第 9 章 客户端检测

## 第 10 章 DOM

## 第 11 章 DOM 扩展

## 第 12 章 DOM2 和 DOM3

## 第 13 章 事件

## 第 14 章 表单脚本

## 第 15 章 使用 Canvas 绘图

## 第 16 章 HTML5 脚本编程

## 第 17 章 错误处理与调试

## 第 18 章 JavaScript 与 XML 

## 第 19 章 E4X

## 第 20 章 JSON

## 第 21 章 Ajax 与 Comet

## 第 22 章 高级技巧

## 第 23 章 离线应用与客户端存储

## 第 24 章 最佳实践

## 第 25 章 新兴的 API
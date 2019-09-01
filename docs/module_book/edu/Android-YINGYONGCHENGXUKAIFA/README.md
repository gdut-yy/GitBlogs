# 《Android 应用程序开发3》

<img src='./IMG_6254.jpg'/>

## 书评

这门课程名叫【互联网应用开发】，一直以为是 HTML+CSS 那些。谁知道教材居然是《Android 应用程序开发》

授课老师跟之前【计算机系统结构】是同一个老师，我的内心是崩溃的。

不过正是在做实验跟课程设计阶段，我个人感觉比较系统地自学了一遍 Android 相关知识。

书本前面依然是关于 eclipse 和 Android studio 的一些介绍，从第 4 章开始进入主题。

## // 第 1 章 Android 简介

## // 第 2 章 Android 开发环境

## // 第 3 章 第一个 Android 程序

## 第 4 章 Android 生命周期

### Android 进程优先级

- （高）前台进程
- （中）可见进程
- （中）服务进程
- （低）后台进程
- （低）空进程

### Android 组件

Android 系统有4个重要的组件，分别是 **Activity、Service、Broadcase receiver 和 Content provider**。

- **Activity** 是 Android 程序的显现层，显示可视化的用户界面，并接收与用户交互所产生的界面事件。
- **Service** 一般用于没有用户界面，但需要长时间在后台运行的应用。
- **Broadcase receiver** 是用来接收并响应广播消息的组件。
- **Content provider** 是 Android 系统提供的一章标准的共享数据的机制，应用程序可以通过 Content provider 访问其他应用程序的私有数据。


## 第 5 章 Android 用户界面

### 5.2 界面控件
- **TextView**：一种可用于显示字符的控件。
- **EditText**：用来输入和编辑字符的控件。
- **Button**：按钮控件，用户能够在该控件上点击，引发相应的事件处理函数。
- **ImageButton**：可显示图像的按钮。
- **CheckBox**：同时可以选择多个选项的控件，复选框。
- **RadioButton**：（RadioGroup + RadioButton），单选框。
- **Spinner**：是从多个选项中选择一个选项的控件，浮动菜单。
- // Listview：RecyclerView 替代。
- // TabHost：Fragment 替代。

### 5.3 界面布局

- **线性布局 LinearLayout**：所有的子元素都在垂直或水平方向安装顺序在界面上排列。
- **框架布局 FrameLayout**：是最简单的界面布局，用来存放一个元素的空白空间，且子元素的位置是不能够指定的，只能够放置在空白空间的左上角。
- // 表格布局 TableLayout：GridLayout 替代。
- **相对布局 RelativeLayout**：
- // 绝对布局 AbsoluteLayout：绝对布局是一种不推荐使用的界面布局。
- **网格布局 GridLayout**：网格布局比表格布局在界面设计上更加灵活，在网格不居中界面元素可以占用多个网格的，而在表格布局却无法实现，只能将元素界面指定在一个表格行中，不能跨越多个表格行。

### 5.4 菜单

Android 系统支持三种菜单模式，分别是**选项菜单（Option Menu）、子菜单（Submenu）和快捷菜单（Context Menu）**。

- 选项菜单：
- 子菜单：二级菜单
- 快捷菜单：

### 5.5 操作栏与 Fragment

### 5.6 界面事件

- 按键事件
- 触摸事件

## 第 6 章 组件通信与广播通信

Intent 是一种消息传递机制，用于组件之间数据交换和发送广播消息。

## 第 7 章 后台服务

Service 适用于无须用户干预，且规则或长期运行的后台功能。首先因为 Service 没有用户界面，更加有利于降低系统资源的消耗，而且 Service 比 Activity 具有更高的优先级，因此在系统资源紧张时，Service 不会被 Android 系统优先终止。即使 Service 被系统终止，在系统资源恢复后 Service 也将自动恢复运行状态，因此可以认为 Service 是在系统中永久运行的组件。Service 除了可以实现后台服务功能，还可以用于**进程间通信（Inter Process Communication，IPC）**。

### 7.2 本地服务
启动方式：Context.startService() Context.stopService()或Service.stopSelf()
绑定方式：Context.bindService() Context.unbindService()

Handler 更新用户界面

### 7.3 远程服务
在 Android 系统中，没有使用传统的 IPC 机制，而是采用 **Intent 和远程服务**的方式实现 IPC。

**AIDL（Android Interface Definition Language）是 Android 系统自定义的接口描述语言**，可以简化进程间数据格式转换和数据交换的代码，通过定义 Service 内部的公共方法，允许在不同进程间的调用者和 Service 之间相互传递数据。AIDL 的 IPC 机制、COM 和 Corba 都是基于接口的轻量级机制。


## 第 8 章 数据存储与访问

### SharedPreferences

### SQLite

## 第 9 章 位置服务与地图应用

位置服务（Location-Based Services，LBS），又称定位服务或基于位置的服务，融合了 GPS 定位、移动通信、导航等多种技术，提供与空间位置相关的综合应用服务。

## 第 10 章 Widget 组件开发

Widget 是一个具有特定功能的视图，一般被嵌入主屏幕（Home screen）中，用户在不启动任何程序的前提下，就可以在主屏幕上直接浏览 Widget 所显示的信息。

## 第 11 章 Android NDK 开发

Android NDK(Android Native Development Kit)是一系列的开发工具，允许程序开发人员在 Android 应用程序中嵌入 C 或 C++ 语言编写的本地代码。

## 第 12 章 综合示例设计与开发

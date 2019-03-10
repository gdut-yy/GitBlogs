# 《Dart 语言程序设计》（*Dart for Hipsters : Fast,Flexible,Structured Code for the Moden Web*）


## 书评
本书成书于 2013 年，从上帝视觉来看，是 Flutter 的兴起拯救了 Dart ！
## 目录

## 第一部分 入门
## 第 1 章 项目：第一个 Dart 应用程序
https://github.com/eee-c/dart-comics/tree/your_first_dart_app
## 第 2 章 基本类型
## 第 3 章 Dart 中的函数式编程
## 第 4 章 操作 DOM
## 第 5 章 编译为 JavaScript


## 第二部分 有效的编程技术
## 第 6 章 项目：Dart 中的 MVC
## 第 7 章 类和对象
## 第 8 章 事件


## 第三部分 代码组织
## 第 9 章 项目：提炼库
## 第 10 章 库


## 第四部分 可维护性
## 第 11 章 项目：变化的行为
## 第 12 章 测试


## 第五部分 Dart 的高级使用
## 第 13 章 项目：终结回调函数的地狱
## 第 14 章 Future 和 Isolate
### 14.1 Completer 和 Future
有一种概念是在稍后的某个时候完成一个任务，`Completer` 就是封装了这种概念的对象。Dart 语言允许我们在一个 `Completer` 对象中定义整件事情，而不是传递一个回调函数在将来被调用。

因为 `Completer` 在将来要触发一个动作，所以 `Completer` 与 `Future` 紧密相关。`Future` 对象中普遍要定义的是一个回调函数，在 `Future` 对象的 `then()` 方法中提供。

在最简单的形式中，我们可以创建一个 `Completer` 对象并从中获得它的future属性，这样当 `Completer` 结束的时候我们可以指定要做什么。最终，一段时间之后，我们用一个消息告诉 `Completer` 任务结束了。

```dart
import 'dart:async';
main(){
  var completer = new Completer();
  var future  = completer.future;
  future.then((message){
    print("Future completed with message: $message");
  });
  completer.complete("foo");
}
```

### 14.2 Isolate
顾名思义，Dart 中的 `Isolate` 主要用于从主执行线程中隔离出要长期运行的函数。`Isolate` 使用 `Future` 对象通知调用线程它已经准备好了。

## 第 15 章 HTML5 和 Dart
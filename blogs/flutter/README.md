# Flutter for Android developers

原文地址：[https://flutter.io/docs/get-started/flutter-for/android-devs](https://flutter.io/docs/get-started/flutter-for/android-devs)

----

本文档适用于希望应用现有 Android 知识的 Android 开发人员使用 Flutter 构建移动应用程序。如果您了解 Android 框架的基础知识，那么您可以将此文档用作 Flutter 开发的快速入门。

使用 Flutter 构建时，您的 Android 知识和技能组合非常有价值，因为 Flutter 依靠移动操作系统来实现众多功能和配置。Flutter 是一种为移动设备构建 UI 的新方法，但它有一个插件系统，可以与 Android（和 iOS）进行非 UI 任务的通信。如果您是 Android 的专家，则无需重新学习使用 Flutter 的所有内容。

通过跳转并查找与您的需求最相关的问题，本文档可用作 cookbook。

## Views

### View 在 Flutter 中的等价物是什么？

> react-style 或 declarative 编程与传统的命令式风格有何不同？有关比较，请参阅 [Introduction to declarative UI](https://flutter.io/docs/get-started/flutter-for/declarative)。

在 Android 中，`View` 是屏幕上显示的所有内容的基础。按钮，工具栏和输入，一切都是视图。在 Flutter 中，`View` 粗略等效于 `Widget`。Widgets 并不完全映射到 Android 视图，但是当您熟悉 Flutter 的工作原理时，您可以将它们视为 "the way you declare and construct UI"。

但是，这些与 `View` 有一些区别。首先，Widgets 具有不同的生命周期：它们是不可变的，只有在需要更改时才存在。每当 widget 或其状态发生变化时，Flutter 的框架都会创建一个新 widget 实例树。相比之下，Android 视图会被绘制一次，并且在 invalidate 调用之前不会重绘。

Flutter 的 widgets 很轻巧，部分原因在于它们的不变性。因为它们本身不是视图，并且不是直接绘制任何东西，而是对 UI 及其语义的描述，这些描述被 “夸大” 到引擎盖下的实际视图对象中。

Flutter 包括 [Material Components](https://material.io/develop/flutter/) 库。这些是实现 Material Design 准则的 widgets  。Material Design 是一个灵活的设计系统，适用于所有平台，包括 iOS。

但 Flutter 具有足够的灵活性和表现力，可以实现任何设计语言。例如，在 iOS 上，您可以使用 [Cupertino widgets](https://flutter.io/docs/development/ui/widgets/cupertino) 来生成看起来像 [Apple’s iOS design language](https://developer.apple.com/design/resources/) 的界面 。

### 我如何更新 `Widget`s ？

在 Android 中，您可以通过直接更改视图来更新视图。但是，在 Flutter 中，`Widget`s 是不可变的并且不会直接更新，而是必须使用 widget 的状态。

这就是有状态和无状态 widget 的概念来源。`StatelessWidget` 听起来就像是一个没有状态信息的 widget 。

`StatelessWidgets` 当您描述的用户界面部分不依赖于对象中的配置信息时，它们非常有用。

例如，在 Android 中，这与放置 `ImageView` 标签类似。标签在运行时不会改变，因此请在 Flutter 中使用 `StatelessWidget`。

如果您想根据在进行 HTTP 调用或用户交互后收到的数据动态更改UI，那么您必须使用 `StatefulWidget` 并告诉Flutter 框架该 widget 的 `State` 已更新，以便它可以更新该 widget 。

这里需要注意的重要一点是，无状态和有状态 widgets 的行为都是相同的。它们重建每一帧，不同之处在于它 `StatefulWidget` 有一个 `State` 对象，它跨帧存储状态数据并恢复它。

如果您有疑问，那么请始终记住此规则：如果 widget 发生更改（例如，由于用户交互），则它是有状态的。但是，如果 widget 对更改做出反应，则包含父 widget 仍然可以是无状态的，如果它本身不会对更改做出反应。

以下示例显示如何使用 `StatelessWidget`。一个常见的 `StatelessWidget` 是 Text widget。如果你看一下 Textwidget 的实现，你会发现它是子类 `StatelessWidget`。

```dart
Text(
  'I like Flutter!',
  style: TextStyle(fontWeight: FontWeight.bold),
);
```

正如您所看到的，`Text` Widget 没有与之关联的状态信息，它呈现了在其构造函数中传递的内容，仅此而已。

但是，如果你想让 “I Like Flutter” 动态变化，例如点击一个 `FloatingActionButton`？

要实现此目的，请将 `Text` Widget 包装在一个 `StatefulWidget` 并在用户单击按钮时更新它。

例如：

```dart
import 'package:flutter/material.dart';

void main() {
  runApp(SampleApp());
}

class SampleApp extends StatelessWidget {
  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Sample App',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: SampleAppPage(),
    );
  }
}

class SampleAppPage extends StatefulWidget {
  SampleAppPage({Key key}) : super(key: key);

  @override
  _SampleAppPageState createState() => _SampleAppPageState();
}

class _SampleAppPageState extends State<SampleAppPage> {
  // Default placeholder text
  String textToShow = "I Like Flutter";

  void _updateText() {
    setState(() {
      // update the text
      textToShow = "Flutter is Awesome!";
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("Sample App"),
      ),
      body: Center(child: Text(textToShow)),
      floatingActionButton: FloatingActionButton(
        onPressed: _updateText,
        tooltip: 'Update Text',
        child: Icon(Icons.update),
      ),
    );
  }
}
```

### 我如何布置我的 widgets？我的 XML 布局文件在哪里？
在 Android 中，您使用 XML 编写布局，但在 Flutter 中，您可以使用 widget tree 编写布局。

以下示例显示如何使用填充显示简单 widget：

```dart
@override
Widget build(BuildContext context) {
  return Scaffold(
    appBar: AppBar(
      title: Text("Sample App"),
    ),
    body: Center(
      child: MaterialButton(
        onPressed: () {},
        child: Text('Hello'),
        padding: EdgeInsets.only(left: 10.0, right: 10.0),
      ),
    ),
  );
}
```

您可以在 [widget catalog](https://flutter.io/docs/development/ui/widgets/layout) 中查看 Flutter 必须提供的布局。



### 我如何在布局中添加或删除组件？
在 Android 中，您可以调用父项 `addChild()` 或 `removeChild()` 在父项上动态添加或删除子视图。在 Flutter 中，因为 widget 是不可变的，所以没有直接的等价物 `addChild()`。相反，您可以将函数传递给返回窗口 widget 的父级，并使用布尔标志控制该子级的创建。

例如，以下是单击以下内容时如何在两个 widget 之间切换 `FloatingActionButton`：

```dart
import 'package:flutter/material.dart';

void main() {
  runApp(SampleApp());
}

class SampleApp extends StatelessWidget {
  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Sample App',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: SampleAppPage(),
    );
  }
}

class SampleAppPage extends StatefulWidget {
  SampleAppPage({Key key}) : super(key: key);

  @override
  _SampleAppPageState createState() => _SampleAppPageState();
}

class _SampleAppPageState extends State<SampleAppPage> {
  // Default value for toggle
  bool toggle = true;
  void _toggle() {
    setState(() {
      toggle = !toggle;
    });
  }

  _getToggleChild() {
    if (toggle) {
      return Text('Toggle One');
    } else {
      return MaterialButton(onPressed: () {}, child: Text('Toggle Two'));
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("Sample App"),
      ),
      body: Center(
        child: _getToggleChild(),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: _toggle,
        tooltip: 'Update Text',
        child: Icon(Icons.update),
      ),
    );
  }
}
```

### 我如何为 widget 设置动画？
在 Android 中，您可以使用 XML 创建动画，也可以 `animate()` 在视图上调用方法。在 Flutter 中，通过将 widget 包装在动画 widget 内，使用动画库动画 widget 。

在 Flutter，使用 `AnimationController` 其是 `Animation<double>` 可以暂停，搜索，停止和反向动画。它 `Ticker` 在 vsync 发生时需要一个信号，并在每个帧运行时产生 0 到 1 之间的线性插值。然后创建一个或多个 `Animations` 并将它们附加到控制器。

例如，您可以使用 `CurvedAnimation` 沿插值曲线实现动画。从这个意义上讲，控制器是动画进度的“主”源，并 `CurvedAnimation` 计算代替控制器默认线性运动的曲线。像 widgets 一样，Flutter 中的动画与组合一起工作。

构建 widget tree 时，将窗口分配给 widget `Animation` 的动画属性，例如一个不透明度 `FadeTransition`，并告诉控制器启动动画。

以下示例显示了如何编写一个在按下以下 `FloatingActionButton` 时将 widget 淡入 logo 的 `FadeTransition` ：

```dart
import 'package:flutter/material.dart';

void main() {
  runApp(FadeAppTest());
}

class FadeAppTest extends StatelessWidget {
  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Fade Demo',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: MyFadeTest(title: 'Fade Demo'),
    );
  }
}

class MyFadeTest extends StatefulWidget {
  MyFadeTest({Key key, this.title}) : super(key: key);
  final String title;
  @override
  _MyFadeTest createState() => _MyFadeTest();
}

class _MyFadeTest extends State<MyFadeTest> with TickerProviderStateMixin {
  AnimationController controller;
  CurvedAnimation curve;

  @override
  void initState() {
    controller = AnimationController(duration: const Duration(milliseconds: 2000), vsync: this);
    curve = CurvedAnimation(parent: controller, curve: Curves.easeIn);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(widget.title),
      ),
      body: Center(
          child: Container(
              child: FadeTransition(
                  opacity: curve,
                  child: FlutterLogo(
                    size: 100.0,
                  )))),
      floatingActionButton: FloatingActionButton(
        tooltip: 'Fade',
        child: Icon(Icons.brush),
        onPressed: () {
          controller.forward();
        },
      ),
    );
  }
}
```
有关更多信息，请参阅 [Animation & Motion widgets](https://flutter.io/docs/development/ui/widgets/animation)，[Animations tutorial](https://flutter.io/docs/development/ui/animations/tutorial) 和 [Animations overview](https://flutter.io/docs/development/ui/animations)。



### 我如何使用 `Canvas` 去 draw/paint？
在 Android 中，您可以使用 `Canvas` 和 `Drawables` 在屏幕上绘制图像和形状。Flutter 也有类似的 `Canvas` API，因为它基于相同的低级渲染引擎 Skia。因此，对于Android开发人员而言，在 Flutter 中绘制到画布是一项非常熟悉的任务。

Flutter 有两个类可以帮助你绘制画布：`CustomPaint` 而 `CustomPainter` 后者实现你的算法绘制到画布。

要了解如何在 Flutter 中实现签名画家，请参阅 Collin 在 [StackOverflow](https://stackoverflow.com/questions/46241071/create-signature-area-for-mobile-app-in-dart-flutter) 上的答案 。

```dart
import 'package:flutter/material.dart';

void main() => runApp(MaterialApp(home: DemoApp()));

class DemoApp extends StatelessWidget {
  Widget build(BuildContext context) => Scaffold(body: Signature());
}

class Signature extends StatefulWidget {
  SignatureState createState() => SignatureState();
}

class SignatureState extends State<Signature> {
  List<Offset> _points = <Offset>[];
  Widget build(BuildContext context) {
    return GestureDetector(
      onPanUpdate: (DragUpdateDetails details) {
        setState(() {
          RenderBox referenceBox = context.findRenderObject();
          Offset localPosition =
          referenceBox.globalToLocal(details.globalPosition);
          _points = List.from(_points)..add(localPosition);
        });
      },
      onPanEnd: (DragEndDetails details) => _points.add(null),
      child: CustomPaint(painter: SignaturePainter(_points), size: Size.infinite),
    );
  }
}

class SignaturePainter extends CustomPainter {
  SignaturePainter(this.points);
  final List<Offset> points;
  void paint(Canvas canvas, Size size) {
    var paint = Paint()
      ..color = Colors.black
      ..strokeCap = StrokeCap.round
      ..strokeWidth = 5.0;
    for (int i = 0; i < points.length - 1; i++) {
      if (points[i] != null && points[i + 1] != null)
        canvas.drawLine(points[i], points[i + 1], paint);
    }
  }
  bool shouldRepaint(SignaturePainter other) => other.points != points;
}
```

### 如何构建自定义 widgets？
在 Android 中，您通常使用子类 `View` 或使用预先存在的视图来覆盖和实现实现所需行为的方法。

在 Flutter 中，通过 [composing](https://flutter.io/docs/resources/technical-overview#everythings-a-widget) 较小的 widgets（而不是扩展它们）来构建自定义  widgets 。它有点类似于 `ViewGroup` 在 Android 中实现自定义 ，其中所有构建块都已存在，但您提供了不同的行为 - 例如，自定义布局逻辑。

例如，如何 `CustomButton` 在构造函数中构建一个带标签的？创建一个 `RaisedButton` 使用标签组成一个 `CustomButton`，而不是通过扩展 `RaisedButton`：

```dart
class CustomButton extends StatelessWidget {
  final String label;

  CustomButton(this.label);

  @override
  Widget build(BuildContext context) {
    return RaisedButton(onPressed: () {}, child: Text(label));
  }
}
```

然后使用 `CustomButton`，就像使用任何其他 Flutter widget 一样：

```dart
@override
Widget build(BuildContext context) {
  return Center(
    child: CustomButton("Hello"),
  );
}
```

## Intents
### 在 Flutter 中 Intent 相当于什么？
在 Android 中，`Intent`s 有两个主要用例：在 Activities 之间导航，以及与组件通信。另一方面，Flutter 没有 Intents 的概念，尽管你仍然可以通过本机集成（使用 [a plugin](https://pub.dartlang.org/packages/android_intent)）启动意图。

Flutter 没有 activities 和 fragments 的真正等价物; 相反，在 Flutter 中，您可以在屏幕之间导航，使用一个 `Navigator` 和 `Route`s，所有这些都在同一个屏幕内 `Activity`。

A `Route` 是应用程序的“屏幕”或“页面”的抽象，一个 `Navigator` 是管理路径的 widget。路线大致映射到一个 `Activity`，但它没有相同的含义。导航器可以推送和弹出路径以在屏幕之间移动。导航器的工作方式类似于您可以 `push()` 导航到新路线的堆栈，并且 `pop()` 当您想要“返回”时可以从中进行路由。

在 Android 中，您在应用程序内声明您的活动 `AndroidManifest.xml`。

在 Flutter 中，您可以选择在页面之间导航：

- 指定 `Map` 路径名称。（MaterialApp）
- 直接导航到路线。（WidgetApp）

以下示例构建一个Map。

```dart
void main() {
  runApp(MaterialApp(
    home: MyAppHome(), // becomes the route named '/'
    routes: <String, WidgetBuilder> {
      '/a': (BuildContext context) => MyPage(title: 'page A'),
      '/b': (BuildContext context) => MyPage(title: 'page B'),
      '/c': (BuildContext context) => MyPage(title: 'page C'),
    },
  ));
}
```

通过 `push`ing 其名称到 `Navigator` 来导航到 route。

```dart
Navigator.of(context).pushNamed('/b');
```

Intents 的另一个流行用例是调用外部组件，例如 Camera 或 File picker。为此，您需要创建本机平台集成（或使用 [existing plugin](https://pub.dartlang.org/flutter/)）。

要了解如何构建本机平台集成，请参阅 [Developing Packages and Plugins](https://flutter.io/docs/development/packages-and-plugins/developing-packages)。

### 如何在Flutter中处理来自外部应用程序的传入意图？

Flutter 可以通过直接与 Android 层交谈并请求共享的数据来处理来自 Android 的传入意图。

以下示例在运行我们的 Flutter 代码的本机活动上注册文本共享意图过滤器，因此其他应用程序可以与我们的 Flutter 应用程序共享文本。

基本流程意味着我们首先处理 Android 本机端（在我们的 `Activity`）中的共享文本数据，然后等待 Flutter 请求数据使用一个 `MethodChannel` 去提供它 。

首先，为以下所有意图注册 intent 过滤器 `AndroidManifest.xml`：

```xml
<activity
  android:name=".MainActivity"
  android:launchMode="singleTop"
  android:theme="@style/LaunchTheme"
  android:configChanges="orientation|keyboardHidden|keyboard|screenSize|locale|layoutDirection"
  android:hardwareAccelerated="true"
  android:windowSoftInputMode="adjustResize">
  <!-- ... -->
  <intent-filter>
    <action android:name="android.intent.action.SEND" />
    <category android:name="android.intent.category.DEFAULT" />
    <data android:mimeType="text/plain" />
  </intent-filter>
</activity>
```

然后在 `MainActivity` 中处理意图，提取从意图共享的文本，并保持它。当 Flutter 准备好处理时，它会使用平台通道请求数据，并从本机端发送：

```java
package com.example.shared;

import android.content.Intent;
import android.os.Bundle;

import java.nio.ByteBuffer;

import io.flutter.app.FlutterActivity;
import io.flutter.plugin.common.ActivityLifecycleListener;
import io.flutter.plugin.common.MethodCall;
import io.flutter.plugin.common.MethodChannel;
import io.flutter.plugins.GeneratedPluginRegistrant;

public class MainActivity extends FlutterActivity {

  private String sharedText;

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    GeneratedPluginRegistrant.registerWith(this);
    Intent intent = getIntent();
    String action = intent.getAction();
    String type = intent.getType();

    if (Intent.ACTION_SEND.equals(action) && type != null) {
      if ("text/plain".equals(type)) {
        handleSendText(intent); // Handle text being sent
      }
    }

    new MethodChannel(getFlutterView(), "app.channel.shared.data").setMethodCallHandler(
      new MethodCallHandler() {
        @Override
        public void onMethodCall(MethodCall call, MethodChannel.Result result) {
          if (call.method.contentEquals("getSharedText")) {
            result.success(sharedText);
            sharedText = null;
          }
        }
      });
  }

  void handleSendText(Intent intent) {
    sharedText = intent.getStringExtra(Intent.EXTRA_TEXT);
  }
}
```

最后，在渲染 widget 时请求 Flutter 端的数据：

```dart
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

void main() {
  runApp(SampleApp());
}

class SampleApp extends StatelessWidget {
  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Sample Shared App Handler',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: SampleAppPage(),
    );
  }
}

class SampleAppPage extends StatefulWidget {
  SampleAppPage({Key key}) : super(key: key);

  @override
  _SampleAppPageState createState() => _SampleAppPageState();
}

class _SampleAppPageState extends State<SampleAppPage> {
  static const platform = const MethodChannel('app.channel.shared.data');
  String dataShared = "No data";

  @override
  void initState() {
    super.initState();
    getSharedText();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(body: Center(child: Text(dataShared)));
  }

  getSharedText() async {
    var sharedData = await platform.invokeMethod("getSharedText");
    if (sharedData != null) {
      setState(() {
        dataShared = sharedData;
      });
    }
  }
}
```

### startActivityForResult() 相当于什么？
该 `Navigator` 类处理路由在 Flutter 和用于获取结果从已压入堆栈路由回来。这是完成 `await`ing 通过 `push()` 返回的 `Future`。

例如，要启动允许用户选择其位置的位置路线，您可以执行以下操作：

```dart
Map coordinates = await Navigator.of(context).pushNamed('/location');
```

然后，在您的位置路线内，一旦用户选择了他们的位置，您就可以 `pop` 使用结果进行堆叠：

```dart
Navigator.of(context).pop({"lat":43.821757,"long":-79.226392});
```

## 异步UI

### 在 Flutter 中 `runOnUiThread()` 相当于什么？
Dart 有一个单线程执行模型，支持 `Isolate`s（在另一个线程上运行 Dart 代码的方法），事件循环和异步编程。除非你产生一个 `Isolate`，否则你的 Dart 代码在主 UI 线程中运行并由事件循环驱动。Flutter 的事件循环等同于 Android 的主要 `Looper` —— 也就是说，`Looper` 它附加到主线程。

Dart 的单线程模型并不意味着您需要将所有内容作为阻塞操作运行，导致 UI 冻结。与要求您始终保持主线程空闲的 Android 不同，在 Flutter 中，使用 Dart 语言提供的异步工具（例如 `async`/`await`）来执行异步工作。如果你在 C＃，Javascript 中使用它，或者你已经使用过 Kotlin 的协程，你可能熟悉 `async`/`await` 范例。

例如，您可以运行网络代码，而不会导致UI挂起使用 `async`/`await` 并让 Dart 执行繁重的工作：

```dart
loadData() async {
  String dataURL = "https://jsonplaceholder.typicode.com/posts";
  http.Response response = await http.get(dataURL);
  setState(() {
    widgets = json.decode(response.body);
  });
}
```

一旦 `await`ed 网络通话完成后，通过调用 `setState()` 更新 UI，这将触发重建部件子树和更新数据。

以下示例异步加载数据并将其显示在 `ListView`：

```dart
import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

void main() {
  runApp(SampleApp());
}

class SampleApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Sample App',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: SampleAppPage(),
    );
  }
}

class SampleAppPage extends StatefulWidget {
  SampleAppPage({Key key}) : super(key: key);

  @override
  _SampleAppPageState createState() => _SampleAppPageState();
}

class _SampleAppPageState extends State<SampleAppPage> {
  List widgets = [];

  @override
  void initState() {
    super.initState();

    loadData();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("Sample App"),
      ),
      body: ListView.builder(
          itemCount: widgets.length,
          itemBuilder: (BuildContext context, int position) {
            return getRow(position);
          }));
  }

  Widget getRow(int i) {
    return Padding(
      padding: EdgeInsets.all(10.0),
      child: Text("Row ${widgets[i]["title"]}")
    );
  }

  loadData() async {
    String dataURL = "https://jsonplaceholder.typicode.com/posts";
    http.Response response = await http.get(dataURL);
    setState(() {
      widgets = json.decode(response.body);
    });
  }
}
```

有关在后台进行工作的详细信息，以及 Flutter 与 Android 的不同之处，请参阅下一节。

### 你如何将工作转移到后台线程？
在 Android 中，当您想要访问网络资源时，通常会移动到后台线程并执行工作，以便不阻塞主线程，并避免ANR。例如，您可能正在使用 `AsyncTask`，`LiveData`，`IntentService`，`JobScheduler` job 或 RxJava 管道以及适用于后台线程的调度程序。

由于 Flutter 是单线程并运行事件循环（如 Node.js），因此您不必担心线程管理或产生后台线程。如果您正在进行 I/O 绑定工作，例如磁盘访问或网络呼叫，那么您可以安全地使用 `async`/`await` 并且您已完成所有设置。另一方面，如果你需要进行计算密集型工作以保持 CPU 繁忙，你需要将其移动到一个 Isolate 以避免阻塞事件循环，就像你在 Android 中的主线程中保留任何类型的工作一样。

对于 I/O 绑定工作，将函数声明为 `async` 函数，并 `await` 在函数内部长时间运行的任务：

```dart
loadData() async {
  String dataURL = "https://jsonplaceholder.typicode.com/posts";
  http.Response response = await http.get(dataURL);
  setState(() {
    widgets = json.decode(response.body);
  });
}
```

这就是您通常进行网络或数据库调用的方式，这两种方式都是 I/O 操作。

在 Android 上，当您扩展时 `AsyncTask`，通常会覆盖3个方法 `onPreExecute()`，`doInBackground()` 和`onPostExecute()`。在 Flutter 中没有相应的东西，因为你 `await` 有一个长时间运行的功能，Dart 的事件循环负责其余部分。

但是，有时您可能正在处理大量数据并且 UI 挂起。在 Flutter 中，使用 `Isolate`s 来利用多个CPU内核来执行长时间运行或计算密集型任务。

隔离是独立的执行线程，不与主执行内存堆共享任何内存。这意味着您无法从主线程访问变量，也无法通过调用 `setState()` 来更新 UI。与 Android 线程不同，Isolates 与其名称相同，并且不能共享内存（例如，以静态字段的形式）。

以下示例在一个简单的隔离中显示了如何将数据共享回主线程以更新 UI。

```dart
loadData() async {
  ReceivePort receivePort = ReceivePort();
  await Isolate.spawn(dataLoader, receivePort.sendPort);

  // The 'echo' isolate sends its SendPort as the first message
  SendPort sendPort = await receivePort.first;

  List msg = await sendReceive(sendPort, "https://jsonplaceholder.typicode.com/posts");

  setState(() {
    widgets = msg;
  });
}

// The entry point for the isolate
static dataLoader(SendPort sendPort) async {
  // Open the ReceivePort for incoming messages.
  ReceivePort port = ReceivePort();

  // Notify any other isolates what port this isolate listens to.
  sendPort.send(port.sendPort);

  await for (var msg in port) {
    String data = msg[0];
    SendPort replyTo = msg[1];

    String dataURL = data;
    http.Response response = await http.get(dataURL);
    // Lots of JSON to parse
    replyTo.send(json.decode(response.body));
  }
}

Future sendReceive(SendPort port, msg) {
  ReceivePort response = ReceivePort();
  port.send([msg, response.sendPort]);
  return response.first;
}loadData() async {
  ReceivePort receivePort = ReceivePort();
  await Isolate.spawn(dataLoader, receivePort.sendPort);

  // The 'echo' isolate sends its SendPort as the first message
  SendPort sendPort = await receivePort.first;

  List msg = await sendReceive(sendPort, "https://jsonplaceholder.typicode.com/posts");

  setState(() {
    widgets = msg;
  });
}

// The entry point for the isolate
static dataLoader(SendPort sendPort) async {
  // Open the ReceivePort for incoming messages.
  ReceivePort port = ReceivePort();

  // Notify any other isolates what port this isolate listens to.
  sendPort.send(port.sendPort);

  await for (var msg in port) {
    String data = msg[0];
    SendPort replyTo = msg[1];

    String dataURL = data;
    http.Response response = await http.get(dataURL);
    // Lots of JSON to parse
    replyTo.send(json.decode(response.body));
  }
}

Future sendReceive(SendPort port, msg) {
  ReceivePort response = ReceivePort();
  port.send([msg, response.sendPort]);
  return response.first;
}
```
这里，`dataLoader()` 是 `Isolate`，它在自己独立的执行线程中运行。在隔离中，您可以执行更多 CPU 密集型处理（例如，解析大型 JSON），或执行计算密集型数学，例如加密或信号处理。

您可以运行以下完整示例：

```dart
import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:async';
import 'dart:isolate';

void main() {
  runApp(SampleApp());
}

class SampleApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Sample App',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: SampleAppPage(),
    );
  }
}

class SampleAppPage extends StatefulWidget {
  SampleAppPage({Key key}) : super(key: key);

  @override
  _SampleAppPageState createState() => _SampleAppPageState();
}

class _SampleAppPageState extends State<SampleAppPage> {
  List widgets = [];

  @override
  void initState() {
    super.initState();
    loadData();
  }

  showLoadingDialog() {
    if (widgets.length == 0) {
      return true;
    }

    return false;
  }

  getBody() {
    if (showLoadingDialog()) {
      return getProgressDialog();
    } else {
      return getListView();
    }
  }

  getProgressDialog() {
    return Center(child: CircularProgressIndicator());
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          title: Text("Sample App"),
        ),
        body: getBody());
  }

  ListView getListView() => ListView.builder(
      itemCount: widgets.length,
      itemBuilder: (BuildContext context, int position) {
        return getRow(position);
      });

  Widget getRow(int i) {
    return Padding(padding: EdgeInsets.all(10.0), child: Text("Row ${widgets[i]["title"]}"));
  }

  loadData() async {
    ReceivePort receivePort = ReceivePort();
    await Isolate.spawn(dataLoader, receivePort.sendPort);

    // The 'echo' isolate sends its SendPort as the first message
    SendPort sendPort = await receivePort.first;

    List msg = await sendReceive(sendPort, "https://jsonplaceholder.typicode.com/posts");

    setState(() {
      widgets = msg;
    });
  }

  // the entry point for the isolate
  static dataLoader(SendPort sendPort) async {
    // Open the ReceivePort for incoming messages.
    ReceivePort port = ReceivePort();

    // Notify any other isolates what port this isolate listens to.
    sendPort.send(port.sendPort);

    await for (var msg in port) {
      String data = msg[0];
      SendPort replyTo = msg[1];

      String dataURL = data;
      http.Response response = await http.get(dataURL);
      // Lots of JSON to parse
      replyTo.send(json.decode(response.body));
    }
  }

  Future sendReceive(SendPort port, msg) {
    ReceivePort response = ReceivePort();
    port.send([msg, response.sendPort]);
    return response.first;
  }
}
```

### OkHttp 相当于 Flutter 上的什么？
使用流行的 [http package](https://pub.dartlang.org/packages/http) 时，可以轻松地在 Flutter 中进行网络呼叫 。

虽然 http 包没有 OkHttp 中的所有功能，但它抽象了你通常自己实现的大部分网络，使其成为一种简单的网络呼叫方式。

要使用该 `http` 包，请将其添加到您的依赖项中 `pubspec.yaml`：

```yaml
dependencies:
  ...
  http: ^0.11.3+16
```

要进行网络呼叫，请调用 `await` 该 `async` 功能 `http.get()`：

```dart
import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
[...]
  loadData() async {
    String dataURL = "https://jsonplaceholder.typicode.com/posts";
    http.Response response = await http.get(dataURL);
    setState(() {
      widgets = json.decode(response.body);
    });
  }
}
```

### 如何显示长时间运行任务的进度？
在 Android 中，您通常会 `ProgressBar` 在后台线程上执行长时间运行的任务时在 UI 中显示视图。

在 Flutter 中，使用 `ProgressIndicator`  widgets 。通过控制何时通过布尔标志呈现来以编程方式显示进度。告诉 Flutter 在长时间运行的任务开始之前更新其状态，并在结束后隐藏它。

在以下示例中，构建函数分为三个不同的函数。如果 `showLoadingDialog()` 是 true（当 `widgets.length == 0`），则渲染 `ProgressIndicator`。否则，`ListView` 使用网络调用返回的数据进行渲染。


```dart
import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

void main() {
  runApp(SampleApp());
}

class SampleApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Sample App',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: SampleAppPage(),
    );
  }
}

class SampleAppPage extends StatefulWidget {
  SampleAppPage({Key key}) : super(key: key);

  @override
  _SampleAppPageState createState() => _SampleAppPageState();
}

class _SampleAppPageState extends State<SampleAppPage> {
  List widgets = [];

  @override
  void initState() {
    super.initState();
    loadData();
  }

  showLoadingDialog() {
    return widgets.length == 0;
  }

  getBody() {
    if (showLoadingDialog()) {
      return getProgressDialog();
    } else {
      return getListView();
    }
  }

  getProgressDialog() {
    return Center(child: CircularProgressIndicator());
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          title: Text("Sample App"),
        ),
        body: getBody());
  }

  ListView getListView() => ListView.builder(
      itemCount: widgets.length,
      itemBuilder: (BuildContext context, int position) {
        return getRow(position);
      });

  Widget getRow(int i) {
    return Padding(padding: EdgeInsets.all(10.0), child: Text("Row ${widgets[i]["title"]}"));
  }

  loadData() async {
    String dataURL = "https://jsonplaceholder.typicode.com/posts";
    http.Response response = await http.get(dataURL);
    setState(() {
      widgets = json.decode(response.body);
    });
  }
}
```

## 项目结构和资源
### 我在哪里存储与分辨率相关的图像文件？
虽然 Android 将资源（resources）和资产（assets）视为不同的项目，但 Flutter 应用程序只有资产。存在 `res/drawable-*` 于 Android 上的文件夹中的所有资源都放在 Flutter 的资源文件夹中。

Flutter 遵循简单的基于密度的格式，如 iOS。资产可能是 `1.0x`， `2.0x`，`3.0x`，或任何其他乘数。Flutter 没有 `dp`s 但有逻辑像素，它们与设备无关的像素基本相同。所谓的 [devicePixelRatio](https://docs.flutter.io/flutter/dart-ui/Window/devicePixelRatio.html) 表示单个逻辑像素中的物理像素的比率。

相当于 Android 的密度桶是：

Android 密度限定符	颤动像素比

  ldpi	0.75x
  mdpi	1.0x
  hdpi	1.5x
  xhdpi	2.0x
  xxhdpi	3.0x
  xxxhdpi	4.0x

资产位于任意文件夹中 —— Flutter 没有预定义的文件夹结构。您在 `pubspec.yaml` 文件中声明资产（带位置），然后 Flutter 选择它们。

请注意，在 Flutter 1.0 beta 2 之前，Flutter 中定义的资产无法从本机端访问，反之亦然，Flutter 无法使用本机资产和资源，因为它们位于不同的文件夹中。

从 Flutter beta 2 开始，资产存储在本机资产文件夹中，并使用 Android 在本机端访问 `AssetManager`：

```dart
val flutterAssetStream = assetManager.open("flutter_assets/assets/my_flutter_asset.png")
```

从 Flutter beta 2 开始，Flutter 仍然无法访问本机资源，也无法访问本机资产。

例如，要在 Flutter 项目中添加一个名为 `my_icon.png` 的新图像资源，并确定它应该存在于我们任意调用的文件夹中 `images`，您可以将基本图像（1.0x）放在 `images` 文件夹中，并将所有其他变体放入子文件夹中。使用适当的比率乘数调用的文件夹：

```dart
images/my_icon.png       // Base: 1.0x image
images/2.0x/my_icon.png  // 2.0x image
images/3.0x/my_icon.png  // 3.0x image
```

接下来，您需要在 `pubspec.yaml` 文件中声明这些图像：

```
assets:
 - images/my_icon.jpeg
```

然后，您可以使用 `AssetImage` 以下方式访问图像

```
return AssetImage("images/a_dot_burr.jpeg");
```

或直接在 `Image` widget 中：

```
@override
Widget build(BuildContext context) {
  return Image.asset("images/my_image.png");
}
```

### 我在哪里存储字符串？我该如何处理本地化？
Flutter 目前没有类似资源的字符串系统。目前，最佳做法是将复制文本作为静态字段保存在类中，并从那里访问它们。例如：

```
class Strings {
  static String welcomeMessage = "Welcome To Flutter";
}
```

然后在您的代码中，您可以访问您的字符串：

```
Text(Strings.welcomeMessage)
```

Flutter 对 Android 上的辅助功能提供了基本支持，尽管此功能正在进行中。

鼓励 Flutter 开发人员使用 [intl package](https://pub.dartlang.org/packages/intl) 进行国际化和本地化。

### Gradle 文件的等价物是什么？如何添加依赖项？
在 Android 中，您可以通过添加到 Gradle 构建脚本来添加依赖项。Flutter 使用 Dart 自己的构建系统和 Pub 包管理器。这些工具将本机 Android 和 iOS 包装器应用程序的构建委派给相应的构建系统。

虽然在你的 Flutter 项目中 `android` 的文件夹下有 Gradle 文件，但只有在添加每个平台集成所需的本机依赖项时才使用这些文件。通常，用于 `pubspec.yaml` 声明要在 Flutter 中使用的外部依赖项。找到 Flutter 套餐的好地方是 [Pub](https://pub.dartlang.org/flutter/packages/)。

## Activities 和 fragments
### Flutter 中的活动和片段相当于什么？
在 Android 中，`Activity` 表示用户可以执行的单一操作。`Fragment` 表示用户界面的行为或部分。Fragments 是一种模块化代码的方法，为更大的屏幕组成复杂的用户界面，并帮助扩展应用程序 UI。在 Flutter 中，这两个概念都属于 Widgets 的范畴。

要了解有关构建活动和 Fragements 的 UI 的更多信息，请参阅社区贡献的中型文章，[Flutter For Android Developers : How to design an Activity UI in Flutter](https://medium.com/@burhanrashid52/flutter-for-android-developers-how-to-design-activity-ui-in-flutter-4bf7b0de1e48)。

正如 Intents 部分所述，Flutter 中的屏幕由 Widgets 表示，因为 Flutter 中的所有内容都是一个 widgets 。您使用 Navigator 在 Route 表示不同屏幕或页面的不同s 之间移动，或者可能只是相同数据的不同状态或渲染。

### 我如何监听 Android 活动生命周期事件？
在 Android 中，您可以覆盖从 Activity 捕获活动本身的生命周期方法的方法，或者 ActivityLifecycleCallbacks 在 Application。在 Flutter 中，你没有概念，但可以通过挂钩 WidgetsBinding 观察者并监听 didChangeAppLifecycleState() 改变事件来监听生命周期事件。

可观察的生命周期事件是：

- `inactive` - 应用程序处于非活动状态，并且未接收用户输入。此事件仅适用于iOS，因为在Android上没有可映射的等效事件
- `paused` - 用户当前不会看到该应用程序，不响应用户输入，并在后台运行。这相当于 Android 中的 `onPause()`
- `resumed` - 应用程序可见并响应用户输入。这相当于 Android 中的 `onPostResume()`
- `suspending` - 申请暂时暂停。这相当于 Android 中的 `onStop` ; 它不会在 iOS 上触发，因为在iOS上没有可映射的等效事件
有关这些状态含义的更多详细信息，请参阅 [AppLifecycleStatus documentation](https://docs.flutter.io/flutter/dart-ui/AppLifecycleState-class.html)。

您可能已经注意到，只有少数活动生命周期事件可用; 虽然 `FlutterActivity` 在内部捕获几乎所有的活动生命周期事件并将它们发送到 Flutter 引擎，但它们大部分都被屏蔽了。Flutter 负责为您启动和停止发动机，在大多数情况下，几乎没有理由需要观察 Flutter 侧的活动生命周期。如果您需要观察生命周期以获取或释放任何本机资源，您可能无论如何都应该从本地进行。

以下是如何观察包含活动的生命周期状态的示例：

```dart
import 'package:flutter/widgets.dart';

class LifecycleWatcher extends StatefulWidget {
  @override
  _LifecycleWatcherState createState() => _LifecycleWatcherState();
}

class _LifecycleWatcherState extends State<LifecycleWatcher> with WidgetsBindingObserver {
  AppLifecycleState _lastLifecycleState;

  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addObserver(this);
  }

  @override
  void dispose() {
    WidgetsBinding.instance.removeObserver(this);
    super.dispose();
  }

  @override
  void didChangeAppLifecycleState(AppLifecycleState state) {
    setState(() {
      _lastLifecycleState = state;
    });
  }

  @override
  Widget build(BuildContext context) {
    if (_lastLifecycleState == null)
      return Text('This widget has not observed any lifecycle changes.', textDirection: TextDirection.ltr);

    return Text('The most recent lifecycle state this widget observed was: $_lastLifecycleState.',
        textDirection: TextDirection.ltr);
  }
}

void main() {
  runApp(Center(child: LifecycleWatcher()));
}
```

## 布局
### LinearLayout 相当于什么？
在 Android 中，LinearLayout 用于线性或水平地放置 widgets 。在 Flutter 中，使用 Row widget 或 Column widget 可以获得相同的结果。

如果您注意到两个代码示例相同，则 “Row” 和 “Column”  widgets 除外。子类是相同的，这个功能可以被利用来开发丰富的布局，可以改变与同一个子类超时。 

```dart
@override
Widget build(BuildContext context) {
  return Row(
    mainAxisAlignment: MainAxisAlignment.center,
    children: <Widget>[
      Text('Row One'),
      Text('Row Two'),
      Text('Row Three'),
      Text('Row Four'),
    ],
  );
}
```

要了解有关构建线性布局的更多信息，请参阅社区贡献的媒体文章 [Flutter For Android Developers : How to design LinearLayout in Flutter?](https://medium.com/@burhanrashid52/flutter-for-android-developers-how-to-design-linearlayout-in-flutter-5d819c0ddf1a)

### RelativeLayout 的等价物是什么？
RelativeLayout 将您的 widgets 相对于彼此放置。在 Flutter 中，有几种方法可以实现相同的结果。

您可以通过使用 Column，Row 和 Stack  widgets 的组合来实现 RelativeLayout 的结果。您可以为 widgets 构造函数指定有关子级相对于父级布局的规则。

有关在 Flutter 中构建 RelativeLayout 的一个很好的示例，请参阅 Collin 在 [StackOverflow]() 上的答案 。

### 什么是 ScrollView 的等价物？
在 Android 中，使用 ScrollView 布置您的 widgets  - 如果用户的设备屏幕小于您的内容，则会滚动。

在 Flutter 中，最简单的方法是使用 ListView widgets 。这可能看起来像是过度模仿 Android，但在 Flutter 中，ListView widget 既是 ScrollView 又是 Android ListView。

```
@override
Widget build(BuildContext context) {
  return ListView(
    children: <Widget>[
      Text('Row One'),
      Text('Row Two'),
      Text('Row Three'),
      Text('Row Four'),
    ],
  );
}
```

### 如何在Flutter中处理景观过渡？
如果 AndroidManifest.xml 包含以下内容，FlutterView 将处理配置更改：

```
android ：configChanges = “orientation | screenSize”
```

## 手势检测和触摸事件处理
### 如何在 Flutter 中向 widget 添加 onClick 侦听器？
在 Android 中，您可以通过调用方法 'setOnClickListener' 将 onClick 附加到按钮等视图。

在 Flutter 中，有两种添加触摸侦听器的方法：

1. 如果 Widget 支持事件检测，则将函数传递给它并在函数中处理它。例如，RaisedButton 有一个 `onPressed` 参数：

```dart
@override
Widget build(BuildContext context) {
  return RaisedButton(
      onPressed: () {
        print("click");
      },
      child: Text("Button"));
}
```

2. 如果 Widget 不支持事件检测，请将​​ widget 包装在 GestureDetector 中并将函数传递给 `onTap` 参数。

```dart
class SampleApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
        body: Center(
      child: GestureDetector(
        child: FlutterLogo(
          size: 200.0,
        ),
        onTap: () {
          print("tap");
        },
      ),
    ));
  }
}
```

## 如何处理 widgets 上的其他手势？
使用 GestureDetector，您可以聆听各种各样的手势，例如：

- Tap
  - `onTapDown` - 可能导致点击的指针已在特定位置与屏幕联系。
  - `onTapUp` - 触发敲击的指针已停止在特定位置接触屏幕。
  - `onTap` - 发生了敲击。
  - `onTapCancel`- 之前触发的指针 `onTapDown` 不会导致点击。
- Double tap
  - `onDoubleTap` - 用户快速连续两次在同一位置点击屏幕。
- Long press
  - `onLongPress` - 指针长时间保持与同一位置的屏幕接触。
- Vertical drag
  - `onVerticalDragStart` - 指针已接触屏幕，可能会开始垂直移动。
  - `onVerticalDragUpdate` - 与屏幕接触的指针在垂直方向上进一步移动。
  - `onVerticalDragEnd` - 之前与屏幕接触并垂直移动的指针不再与屏幕接触，并且在停止接触屏幕时以特定速度移动。
- Horizontal drag
  - `onHorizontalDragStart` - 指针已接触屏幕，可能开始水平移动。
  - `onHorizontalDragUpdate` - 与屏幕接触的指针在水平方向上进一步移动。
  - `onHorizontalDragEnd` - 之前与屏幕接触并且水平移动的指针不再与屏幕接触，并且当它停止接触屏幕时以特定速度移动。

以下示例显示了 `GestureDetector` 在双击时旋转 Flutter logo 的示例：

```dart
AnimationController controller;
CurvedAnimation curve;

@override
void initState() {
  controller = AnimationController(duration: const Duration(milliseconds: 2000), vsync: this);
  curve = CurvedAnimation(parent: controller, curve: Curves.easeIn);
}

class SampleApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
        body: Center(
          child: GestureDetector(
            child: RotationTransition(
                turns: curve,
                child: FlutterLogo(
                  size: 200.0,
                )),
            onDoubleTap: () {
              if (controller.isCompleted) {
                controller.reverse();
              } else {
                controller.forward();
              }
            },
        ),
    ));
  }
}
```

## 列表视图和适配器
### Flutter 中 ListView 的替代品是什么？
Flutter 中的 ListView 的等价物是一个 ListView ！

在 Android ListView 中，您创建一个适配器并将其传递给 ListView，后者使用适配器返回的内容呈现每一行。但是，您必须确保回收行，否则会出现各种疯狂的视觉故障和内存问题。

由于 Flutter 的不可变 widget 模式，您将窗口 widgets 列表传递给 ListView，而 Flutter 负责确保滚动快速平滑。

```dart
import 'package:flutter/material.dart';

void main() {
  runApp(SampleApp());
}

class SampleApp extends StatelessWidget {
  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Sample App',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: SampleAppPage(),
    );
  }
}

class SampleAppPage extends StatefulWidget {
  SampleAppPage({Key key}) : super(key: key);

  @override
  _SampleAppPageState createState() => _SampleAppPageState();
}

class _SampleAppPageState extends State<SampleAppPage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("Sample App"),
      ),
      body: ListView(children: _getListData()),
    );
  }

  _getListData() {
    List<Widget> widgets = [];
    for (int i = 0; i < 100; i++) {
      widgets.add(Padding(padding: EdgeInsets.all(10.0), child: Text("Row $i")));
    }
    return widgets;
  }
}
```

### 我如何知道点击了哪个 list item？
在 Android 中，ListView 有一个方法可以找出单击 'onItemClickListener' 的项目。在 Flutter 中，使用传入的 widgets 提供的触摸处理。

```dart
import 'package:flutter/material.dart';

void main() {
  runApp(SampleApp());
}

class SampleApp extends StatelessWidget {
  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Sample App',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: SampleAppPage(),
    );
  }
}

class SampleAppPage extends StatefulWidget {
  SampleAppPage({Key key}) : super(key: key);

  @override
  _SampleAppPageState createState() => _SampleAppPageState();
}

class _SampleAppPageState extends State<SampleAppPage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("Sample App"),
      ),
      body: ListView(children: _getListData()),
    );
  }

  _getListData() {
    List<Widget> widgets = [];
    for (int i = 0; i < 100; i++) {
      widgets.add(GestureDetector(
        child: Padding(
            padding: EdgeInsets.all(10.0),
            child: Text("Row $i")),
        onTap: () {
          print('row tapped');
        },
      ));
    }
    return widgets;
  }
}
```

### 我如何动态地更新 ListView？
在 Android 上，您更新适配器并调用 `notifyDataSetChanged`。

在 Flutter 中，如果您用 `setState()` 更新列表中的 widgets，您很快就会发现您的数据没有直观地改变。这是因为在 `setState()` 调用时，Flutter 渲染引擎会查看 widget tree 以查看是否有任何更改。当它到达时 `ListView`，它会执行 `==` 检查，并确定两者 `ListView`s 是相同的。没有任何改变，因此不需要更新。

有关更新您的简单方法，请 `ListView` 创建新 `List` 内部 `setState()`，并将旧列表中的数据复制到新列表中。虽然这种方法很简单，但不建议用于大型数据集，如下一个示例所示。

```dart
import 'package:flutter/material.dart';

void main() {
  runApp(SampleApp());
}

class SampleApp extends StatelessWidget {
  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Sample App',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: SampleAppPage(),
    );
  }
}

class SampleAppPage extends StatefulWidget {
  SampleAppPage({Key key}) : super(key: key);

  @override
  _SampleAppPageState createState() => _SampleAppPageState();
}

class _SampleAppPageState extends State<SampleAppPage> {
  List widgets = [];

  @override
  void initState() {
    super.initState();
    for (int i = 0; i < 100; i++) {
      widgets.add(getRow(i));
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("Sample App"),
      ),
      body: ListView(children: widgets),
    );
  }

  Widget getRow(int i) {
    return GestureDetector(
      child: Padding(
          padding: EdgeInsets.all(10.0),
          child: Text("Row $i")),
      onTap: () {
        setState(() {
          widgets = List.from(widgets);
          widgets.add(getRow(widgets.length + 1));
          print('row $i');
        });
      },
    );
  }
}
```

构建列表的推荐，有效且有效的方法是使用 ListView.Builder。当您拥有动态列表或包含大量数据的列表时，此方法非常有用。这基本上相当于 Android 上的 RecyclerView，它会自动为您回收列表元素：


```dart
import 'package:flutter/material.dart';

void main() {
  runApp(SampleApp());
}

class SampleApp extends StatelessWidget {
  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Sample App',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: SampleAppPage(),
    );
  }
}

class SampleAppPage extends StatefulWidget {
  SampleAppPage({Key key}) : super(key: key);

  @override
  _SampleAppPageState createState() => _SampleAppPageState();
}

class _SampleAppPageState extends State<SampleAppPage> {
  List widgets = [];

  @override
  void initState() {
    super.initState();
    for (int i = 0; i < 100; i++) {
      widgets.add(getRow(i));
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          title: Text("Sample App"),
        ),
        body: ListView.builder(
            itemCount: widgets.length,
            itemBuilder: (BuildContext context, int position) {
              return getRow(position);
            }));
  }

  Widget getRow(int i) {
    return GestureDetector(
      child: Padding(
          padding: EdgeInsets.all(10.0),
          child: Text("Row $i")),
      onTap: () {
        setState(() {
          widgets.add(getRow(widgets.length + 1));
          print('row $i');
        });
      },
    );
  }
}
```

而不是创建 “ListView”，创建一个 ListView.builder，它接受两个关键参数：列表的初始长度和 ItemBuilder 函数。

ItemBuilder 函数类似于 Android adapter 中的 `getView` 函数; 它占据一个位置，并返回您想要在该位置呈现的行。

最后，但最重要的是，请注意该 `onTap()` 函数不再重新创建列表，而是重新创建列表 `.add`。

## 使用文本
### 如何在 Text widget 上设置自定义字体？
在 Android SDK（从 Android O 开始）中，您创建一个 Font 资源文件并将其传递给 TextView 的 FontFamily 参数。

在 Flutter 中，将字体文件放在文件夹中并在文件中引用它 `pubspec.yaml`，类似于导入图像的方式。

```dart
fonts:
   - family: MyCustomFont
     fonts:
       - asset: fonts/MyCustomFont.ttf
       - style: italic
```
然后将字体分配给 `Text` widget：

```dart
@override
Widget build(BuildContext context) {
  return Scaffold(
    appBar: AppBar(
      title: Text("Sample App"),
    ),
    body: Center(
      child: Text(
        'This is a custom font text',
        style: TextStyle(fontFamily: 'MyCustomFont'),
      ),
    ),
  );
}
```

### 我如何设置 Text widgets 的样式？
与字体一起，您可以在 `Text` widget 上自定义其他样式元素。`Text` widget 的样式参数采用 `TextStyle` 对象，您可以在其中自定义许多参数，例如：

- color
- decoration
- decorationColor
- decorationStyle
- fontFamily
- fontSize
- fontStyle
- fontWeight
- hashCode
- height
- inherit
- letterSpacing
- textBaseline
- wordSpacing

## 表格输入
有关使用表单的更多信息，请参阅 [Flutter Cookbook](https://flutter.io/docs/cookbook) 中的 [Retrieve the value of a text field](https://flutter.io/docs/cookbook/forms/retrieve-input)。

###  Input 里的 “hint” 相当于什么？
在 Flutter 中，您可以通过将 InputDecoration 对象添加到 Text Widget 装饰构造函数参数中，轻松地为输入显示“提示”或占位符文本。

```dart
body: Center(
  child: TextField(
    decoration: InputDecoration(hintText: "This is a hint"),
  )
)
```

### 我如何显示验证错误？
就像使用 "hint" 一样，将 InputDecoration 对象传递给 Text widget 的装饰构造函数。

但是，您不希望通过显示错误开始。相反，当用户输入了无效数据时，更新状态并传递新 `InputDecoration` 对象。

```dart
import 'package:flutter/material.dart';

void main() {
  runApp(SampleApp());
}

class SampleApp extends StatelessWidget {
  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Sample App',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: SampleAppPage(),
    );
  }
}

class SampleAppPage extends StatefulWidget {
  SampleAppPage({Key key}) : super(key: key);

  @override
  _SampleAppPageState createState() => _SampleAppPageState();
}

class _SampleAppPageState extends State<SampleAppPage> {
  String _errorText;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("Sample App"),
      ),
      body: Center(
        child: TextField(
          onSubmitted: (String text) {
            setState(() {
              if (!isEmail(text)) {
                _errorText = 'Error: This is not an email';
              } else {
                _errorText = null;
              }
            });
          },
          decoration: InputDecoration(hintText: "This is a hint", errorText: _getErrorText()),
        ),
      ),
    );
  }

  _getErrorText() {
    return _errorText;
  }

  bool isEmail(String em) {
    String emailRegexp =
        r'^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$';

    RegExp regExp = RegExp(emailRegexp);

    return regExp.hasMatch(em);
  }
}
```

## Flutter 的 plugins
### 我如何访问 GPS 传感器？
使用 [geolocator](https://pub.dartlang.org/packages/geolocator) 社区插件。

### 我如何访问相机？
该 [image_picker](https://pub.dartlang.org/packages/image_picker) 插件很受欢迎，可以访问相机。

### 我如何使用 Facebook 登录？
要使用 Facebook 登录，请使用 [flutter_facebook_login](https://pub.dartlang.org/packages/flutter_facebook_login) 社区插件。

### 我如何使用 Firebase 功能？
大多数 Firebase 功能都包含在 [first party plugins](https://pub.dartlang.org/flutter/packages?q=firebase)。这些插件是第一方集成，由 Flutter 团队维护：

- `firebase_admob` 适用于Firebase AdMob
- `firebase_analytics` 适用于Firebase Analytics
- `firebase_auth` 用于Firebase Auth
- `firebase_database` 适用于Firebase RTDB
- `firebase_storage` 用于Firebase云存储
- `firebase_messaging` 用于Firebase消息传递（FCM）
- `flutter_firebase_ui` 快速Firebase Auth集成（Facebook，Google，Twitter和电子邮件）
- `cloud_firestore` 适用于Firebase Cloud Firestore

您还可以在 Pub 上找到一些第三方 Firebase 插件，其中包含第一方插件未直接覆盖的区域。

### 我如何构建自己的自定义本机集成？
如果缺少 Flutter 或其社区插件的特定于平台的功能，您可以按照 [developing packages and plugins](https://flutter.io/docs/development/packages-and-plugins/developing-packages) 页面构建自己的功能 。

简而言之，Flutter 的插件架构就像在 Android 中使用事件总线一样：您触发消息并让接收器处理并将结果发回给您。在这种情况下，接收器是在 Android 或 iOS 上本机端运行的代码。

### 我如何在 Flutter 应用程序中使用 NDK？
如果您在当前的 Android 应用程序中使用 NDK 并希望 Flutter 应用程序利用您的本机库，那么可以通过构建自定义插件来实现。

您的自定义插件首先与您的 Android 应用程序对话，您可以通过 JNI 调用您的 native 功能。响应准备就绪后，将消息发送回 Flutter 并呈现结果。

目前不支持直接从 Flutter 调用本机代码。

## Themes
### 我如何定义我 APP 的 主题？
开箱即用，Flutter 带有一个漂亮的 Material Design 实现，它可以满足您通常所需的大量样式和主题需求。与在 Android 中声明主题然后使用 AndroidManifest.xml 将其分配给应用程序的 Android 不同，在 Flutter 中，您可以在顶级 widget 中声明主题。

要在应用程序中充分利用 Material Components，您可以将顶级窗口 widgets 声明 `MaterialApp` 为应用程序的入口点。MaterialApp 是一个便利 widgets ，它包含了许多 widgets ，这些 widgets 通常是实现 Material Design 的应用程序所必需的。它通过添加特定于材料的功能构建在 WidgetsApp 上。

您还可以使用 `WidgetApp` 作为应用程序 widgets ，它提供了一些相同的功能，但不像它那样丰富 `MaterialApp`。

要自定义任何子组件的颜色和样式，`ThemeData` 请将对象传递 给 `MaterialApp` widget。例如，在下面的代码中，主样本设置为蓝色，文本选择颜色为红色。

```dart
class SampleApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Sample App',
      theme: ThemeData(
        primarySwatch: Colors.blue,
        textSelectionColor: Colors.red
      ),
      home: SampleAppPage(),
    );
  }
}
```

## 数据库和本地存储
### 我如何访问共享首选项？
在 Android 中，您可以使用 SharedPreferences API 存储一小组键值对。

在 Flutter 中，使用 [Shared_Preferences plugin](https://pub.dartlang.org/packages/shared_preferences) 访问此功能 。此插件包含共享首选项和 NSUserDefaults（iOS 等效项）的功能。

```dart
import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';

void main() {
  runApp(
    MaterialApp(
      home: Scaffold(
        body: Center(
          child: RaisedButton(
            onPressed: _incrementCounter,
            child: Text('Increment Counter'),
          ),
        ),
      ),
    ),
  );
}

_incrementCounter() async {
  SharedPreferences prefs = await SharedPreferences.getInstance();
  int counter = (prefs.getInt('counter') ?? 0) + 1;
  print('Pressed $counter times.');
  prefs.setInt('counter', counter);
}
```

### 如何在 Flutter 中访问 SQLite？
在 Android 中，您使用 SQLite 存储可以使用 SQL 查询的结构化数据。

在 Flutter 中，使用 [SQFlite](https://pub.dartlang.org/packages/sqflite) 插件访问此功能 。

## 通知
### 如何设置推送通知？
在 Android 中，您可以使用 Firebase Cloud Messaging 为您的应用设置推送通知。

在 Flutter 中，使用 [Firebase_Messaging](https://github.com/flutter/plugins/tree/master/packages/firebase_messaging) 插件访问此功能 。有关使用 Firebase Cloud Messaging API 的更多信息，请参阅 [firebase_messaging](https://pub.dartlang.org/packages/firebase_messaging) 插件文档。

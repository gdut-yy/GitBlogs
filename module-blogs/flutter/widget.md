## Scaffold
```dart
const Scaffold({
    Key key,
    - appBar,
    - body,
    - floatingActionButton,
    - floatingActionButtonLocation,
    - floatingActionButtonAnimator,
    - persistentFooterButtons,
    - drawer,
    - endDrawer,
    - bottomNavigationBar,
    - bottomSheet,
    - backgroundColor,
    - resizeToAvoidBottomPadding = true,
    - primary = true,
  }) : assert(primary != null), super(key: key);
```
- appBar：显示在界面顶部的一个 AppBar。
- body：当前界面所显示的主要内容 Widget。
- floatingActionButton：
- floatingActionButtonLocation：
- floatingActionButtonAnimator：
- persistentFooterButtons：固定在下方显示的按钮，比如对话框下方的确定、取消按钮。
- drawer：侧边栏控件。
- endDrawer：
- bottomNavigationBar：显示在页面底部的导航栏。
- bottomSheet：
- backgroundColor：
- resizeToAvoidBottomPadding = true：控制界面内容 body 是否重新布局来避免底部被覆盖了，比如当键盘显示的时候，重新布局避免被键盘盖住内容。
- primary = true：

## ScaffoldState

## BottomNavigationBar
```dart
BottomNavigationBar({
    Key key,
    @required - items,
    - onTap,
    - currentIndex = 0,
    BottomNavigationBarType type,
    - fixedColor,
    - iconSize = 24.0,
  }) : assert(items != null),
       assert(items.length >= 2),
       assert(
        items.every((BottomNavigationBarItem item) => item.title != null) == true,
        'Every item must have a non-null title',
       ),
       assert(0 <= currentIndex && currentIndex < items.length),
       assert(iconSize != null),
       type = type ?? (items.length <= 3 ? BottomNavigationBarType.fixed : BottomNavigationBarType.shifting),
       super(key: key);
```
## BottomNavigationBarItem
```dart
const BottomNavigationBarItem({
    @required - icon,
    - title,
    Widget activeIcon,
    - backgroundColor,
  }) : activeIcon = activeIcon ?? icon,
       assert(icon != null);
```

## AppBar 应用栏
```dart
AppBar({
    Key key,
    - leading,
    - automaticallyImplyLeading = true,
    - title,
    - actions,
    - flexibleSpace,
    - bottom,
    - elevation = 4.0,
    - backgroundColor,
    - brightness,
    - iconTheme,
    - textTheme,
    - primary = true,
    - centerTitle,
    - titleSpacing = NavigationToolbar.kMiddleSpacing,
    - toolbarOpacity = 1.0,
    - bottomOpacity = 1.0,
  }) : assert(automaticallyImplyLeading != null),
       assert(elevation != null),
       assert(primary != null),
       assert(titleSpacing != null),
       assert(toolbarOpacity != null),
       assert(bottomOpacity != null),
       preferredSize = Size.fromHeight(kToolbarHeight + (bottom?.preferredSize?.height ?? 0.0)),
       super(key: key);
```

- leading：前导。
- automaticallyImplyLeading = true,
- title：标题。
- actions：操作。
- flexibleSpace,
- bottom,
- elevation = 4.0,
- backgroundColor,
- brightness,
- iconTheme,
- textTheme,
- primary = true,
- centerTitle,
- titleSpacing = NavigationToolbar.kMiddleSpacing,
- toolbarOpacity = 1.0,
- bottomOpacity = 1.0,

## PopupMenuButton
```dart
const PopupMenuButton({
    Key key,
    @required this.itemBuilder,
    this.initialValue,
    this.onSelected,
    this.onCanceled,
    this.tooltip,
    this.elevation = 8.0,
    this.padding = const EdgeInsets.all(8.0),
    this.child,
    this.icon,
    this.offset = Offset.zero,
  }) : assert(itemBuilder != null),
       assert(offset != null),
       assert(!(child != null && icon != null)), // fails if passed both parameters
       super(key: key);
```
---
sidebar: false
---

# VSCode 配置

**原文链接: [https://gdut_yy.gitee.io/doc-gitblogs/module_config/config_vscode/](https://gdut_yy.gitee.io/doc-gitblogs/module_config/config_vscode/)**

## 1 VSCode 配置右键打开

1. Windows 任意路径新建 `vscode.reg` 文件

```sh
# 新建文件 vscode.reg

Windows Registry Editor Version 5.00

[HKEY_CLASSES_ROOT\*\shell\VSCode]
@="Open with Code"
"Icon"="C:\\Program Files\\Microsoft VS Code\\Code.exe"

[HKEY_CLASSES_ROOT\*\shell\VSCode\command]
@="\"C:\\Program Files\\Microsoft VS Code\\Code.exe\" \"%1\""

Windows Registry Editor Version 5.00

[HKEY_CLASSES_ROOT\Directory\shell\VSCode]
@="Open with Code"
"Icon"="C:\\Program Files\\Microsoft VS Code\\Code.exe"

[HKEY_CLASSES_ROOT\Directory\shell\VSCode\command]
@="\"C:\\Program Files\\Microsoft VS Code\\Code.exe\" \"%V\""

Windows Registry Editor Version 5.00

[HKEY_CLASSES_ROOT\Directory\Background\shell\VSCode]
@="Open with Code"
"Icon"="C:\\Program Files\\Microsoft VS Code\\Code.exe"

[HKEY_CLASSES_ROOT\Directory\Background\shell\VSCode\command]
@="\"C:\\Program Files\\Microsoft VS Code\\Code.exe\" \"%V\""
```

2. 双击运行 `vscode.reg`；

达到效果：

- Windows 任意路径文件夹鼠标右键可 `Open with Code`；
- Windows 任意文件鼠标右键可 `Open with Code`；

## 2 VSCode 配置大小写快捷键

1. VSCode `Ctrl+K` + `Ctrl+S` 快捷键调出 `Keyboard Shortcuts`（或 `File` -> `Preferences` -> `Keyboard Shortcuts`）；
2. 搜索 `Transform to Uppercase`，设置为 `Ctrl+Alt+U`，回车确认；
3. 搜索 `Transform to Lowercase`，设置为 `Ctrl+Alt+L`，回车确认；

达到效果：

- 选中文本 `Ctrl+Alt+L` 即可转换成小写；
- 选中文本 `Ctrl+Alt+U` 即可转换成大写；

（全文完）

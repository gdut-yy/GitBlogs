# JDK 配置

**原文链接: [https://gdut_yy.gitee.io/doc-gitblogs/module_config/config_jdk/](https://gdut_yy.gitee.io/doc-gitblogs/module_config/config_jdk/)**

## 1 版本选择

当前最新 jdk 版本是 jdk16，2021.09 将发布 jdk17，这是一个 LTS 版本。

由于工作学习需要（譬如学习 jdk1.7/1.8 Hashmap 实现差异，工作环境多基于 jdk1.8，学习新特性 jdk11 等），一个协同可能会安装多个版本 JDK，推荐版本：

| JDK | Link                                                                                       | 备注                                                   |
| --- | ------------------------------------------------------------------------------------------ | ------------------------------------------------------ |
| 1.7 | [华为云镜像下载](https://mirrors.huaweicloud.com/java/jdk/7u80-b15/jdk-7u80-windows-x64.exe)   | 7u80                                                   |
| 1.8 | [华为云镜像下载](https://mirrors.huaweicloud.com/java/jdk/8u202-b08/jdk-8u202-windows-x64.exe) | 8u202（最后一个商用免费版本，2019.04.16 修改 License） |
| 11  | [华为云镜像下载](https://mirrors.huaweicloud.com/java/jdk/11+28/jdk-11_windows-x64_bin.zip)    | 11+28                                                  |

华为云镜像站: [https://mirrors.huaweicloud.com/java/jdk/](https://mirrors.huaweicloud.com/java/jdk/)

## 2 环境变量

一般而言，需要配置系统的 `JAVA_HOME` 和 `PATH` 参数，例如：

```sh
export JAVA_HOME=/uar/local/jdk1.8.0_202
export PATH=$PATH:$JAVA_HOME/bin
export PATH=$PATH:$JAVA_HOME/jre/bin
```

（全文完）

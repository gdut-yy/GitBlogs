---
sidebar: false
---

# JDK 配置

**原文链接: [https://gdut_yy.gitee.io/doc-gitblogs/module_config/config_jdk/](https://gdut_yy.gitee.io/doc-gitblogs/module_config/config_jdk/)**

## 1 版本选择

当前最新 jdk 版本是 jdk16，2021.09 将发布 jdk17，这是一个 LTS 版本。

由于工作学习需要（譬如学习 jdk1.7/1.8 Hashmap 实现差异，工作环境多基于 jdk1.8，学习新特性 jdk11 等），一个协同可能会安装多个版本 JDK，推荐版本：

https://adoptopenjdk.net/releases.html?variant=openjdk8&jvmVariant=hotspot

| JDK | Oracle JDK         | Adoptopenjdk           | 备注                                                                     |
| --- | ------------------ | ---------------------- | ------------------------------------------------------------------------ |
| 1.7 | [7u80][7u80]       |                        |                                                                          |
| 1.8 | [8u202][8u202]     | [8u292-b10][8u292-b10] | The Oracle JDK License has changed for releases starting April 16, 2019. |
| 11  | [11.0.11][11.0.11] | [11.0.11+9][11.0.11+9] |                                                                          |

[7u80]: https://www.oracle.com/java/technologies/javase/javase7-archive-downloads.html
[8u202]: https://www.oracle.com/java/technologies/javase/javase8-archive-downloads.html
[11.0.11]: https://www.oracle.com/cn/java/technologies/javase-jdk11-downloads.html
[8u292-b10]: https://adoptopenjdk.net/releases.html?variant=openjdk8&jvmVariant=hotspot
[11.0.11+9]: https://adoptopenjdk.net/releases.html?variant=openjdk11&jvmVariant=hotspot

## 2 环境变量

一般而言，需要配置系统的 `JAVA_HOME` 和 `PATH` 参数，例如：

```sh
export JAVA_HOME=/uar/local/jdk1.8.0_202
export PATH=$PATH:$JAVA_HOME/bin
export PATH=$PATH:$JAVA_HOME/jre/bin
```

（全文完）

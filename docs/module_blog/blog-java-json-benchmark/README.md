# JSON 组件基准测试（java-json-benchmark）

**原文链接: [https://gdut-yy.github.io/doc-gitblogs/module_config/blog-java-json-benchmark/](https://gdut-yy.github.io/doc-gitblogs/module_config/blog-java-json-benchmark/)**

## 前言

阅读本文大约需要 3 分钟。

fastjson 究竟有多快？json 开源组件如何选项？为什么 SpringBoot2 json 组件选择了 jackson？

[java-json-benchmark 项目](https://github.com/fabienrenaud/java-json-benchmark) 使用 [JMH](http://openjdk.java.net/projects/code-tools/jmh/) 对各种 Java Json 库的吞吐性能进行了基准测试。它涵盖了以下库：

| 序号 |                                 json 组件 (Mvnrepository 链接)                                 | 版本 (2020.03) | 版本 (2021.05) | 对比 (+/=) |
| :--: | :--------------------------------------------------------------------------------------------: | :------------: | :------------: | :--------: |
|  1   |   [jackson](https://mvnrepository.com/artifact/com.fasterxml.jackson.core/jackson-databind)    |     2.10.2     |     2.12.3     |     +      |
|  2   |                 [genson](https://mvnrepository.com/artifact/com.owlike/genson)                 |      1.6       |      1.6       |     =      |
|  3   |              [fastjson](https://mvnrepository.com/artifact/com.alibaba/fastjson)               |     1.2.62     |     1.2.76     |     +      |
|  4   |              [gson](https://mvnrepository.com/artifact/com.google.code.gson/gson)              |     2.8.6      |     2.8.6      |     =      |
|  5   |                  [org.json](https://mvnrepository.com/artifact/org.json/json)                  |    20090211    |    20210307    |     +      |
|  6   |           [javax.json](https://mvnrepository.com/artifact/javax.json/javax.json-api)           |     1.1.4      |     1.1.4      |     =      |
|  7   |            [json-io](https://mvnrepository.com/artifact/com.cedarsoftware/json-io)             |     4.12.0     |     4.12.0     |     =      |
|  8   |            [flexjson](https://mvnrepository.com/artifact/net.sf.flexjson/flexjson)             |      3.3       |      3.3       |     =      |
|  9   |                  [boon](https://mvnrepository.com/artifact/io.fastjson/boon)                   |      0.34      |      0.34      |     =      |
|  10  |            [json-smart](https://mvnrepository.com/artifact/net.minidev/json-smart)             |      2.3       |     2.4.7      |     +      |
|  11  |         [johnzon](https://mvnrepository.com/artifact/org.apache.johnzon/johnzon-core)          |     1.2.3      |     1.2.11     |     +      |
|  12  |         [logansquare](https://mvnrepository.com/artifact/com.bluelinelabs/logansquare)         |     1.3.7      |     1.3.7      |     =      |
|  13  |            [dsl-json](https://mvnrepository.com/artifact/com.dslplatform/dsl-json)             |     1.9.5      |     1.9.8      |     +      |
|  14  |    [json-simple](https://mvnrepository.com/artifact/com.googlecode.json-simple/json-simple)    |     1.1.1      |     1.1.1      |     =      |
|  15  |               [nanojson](https://mvnrepository.com/artifact/com.grack/nanojson)                |      1.4       |      1.7       |     +      |
|  16  |               [jodd-json](https://mvnrepository.com/artifact/org.jodd/jodd-json)               |     5.1.3      |     6.0.3      |     +      |
|  17  |              [moshi](https://mvnrepository.com/artifact/com.squareup.moshi/moshi)              |     1.9.2      |     1.12.0     |     +      |
|  18  |        [tapestry](https://mvnrepository.com/artifact/org.apache.tapestry/tapestry-core)        |     5.4.5      |     5.7.2      |     +      |
|  19  |              [jsoniter](https://mvnrepository.com/artifact/com.jsoniter/jsoniter)              |     0.9.23     |     0.9.23     |     =      |
|  20  | [minimal-json](https://mvnrepository.com/artifact/com.eclipsesource.minimal-json/minimal-json) |     0.9.5      |     0.9.5      |     =      |
|  21  |                 [mjson](https://mvnrepository.com/artifact/org.sharegov/mjson)                 |     1.4.1      |     1.4.1      |     =      |
|  22  |         [underscore](https://mvnrepository.com/artifact/com.github.javadev/underscore)         |      1.52      |      1.66      |     +      |
|  23  |                [yasson](https://mvnrepository.com/artifact/org.eclipse/yasson)                 |     1.0.6      |     1.0.9      |     +      |
|  24  |            [javassist](https://mvnrepository.com/artifact/org.javassist/javassist)             |   3.26.0-GA    |   3.28.0-GA    |     +      |
|  25  |        [purejson](https://mvnrepository.com/artifact/io.github.senthilganeshs/purejson)        |     1.0.1      |     1.0.1      |     =      |

### TODO

**New Jakarta JSON Binding 2.0.0 API with new `jakarta.*` namespace:**

```xml
<!-- https://mvnrepository.com/artifact/org.glassfish/jakarta.json -->
<dependency>
    <groupId>org.glassfish</groupId>
    <artifactId>jakarta.json</artifactId>
    <version>2.0.1</version>
</dependency>
<!-- https://mvnrepository.com/artifact/jakarta.json/jakarta.json-api -->
<dependency>
    <groupId>jakarta.json</groupId>
    <artifactId>jakarta.json-api</artifactId>
    <version>2.0.0</version>
</dependency>
<!-- https://mvnrepository.com/artifact/jakarta.json.bind/jakarta.json.bind-api -->
<dependency>
    <groupId>jakarta.json.bind</groupId>
    <artifactId>jakarta.json.bind-api</artifactId>
    <version>2.0.0</version>
</dependency>

<!-- https://mvnrepository.com/artifact/org.eclipse/yasson -->
<dependency>
    <groupId>org.eclipse</groupId>
    <artifactId>yasson</artifactId>
    <version>2.0.2</version>
    <scope>test</scope>
</dependency>
```

### `Users` 对象

用例：基本类型，字符串，列表和简单 POJO。

### `Clients` 对象

用例: 基本类型，字符串，列表和简单 POJO，数组，枚举，UUID，LocalDate。

注意: 由于缺少对某些评估类型的支持，因此使用此模型测试的库较少。

## Benchmark 结果 (2021.05.13)

### users-deser-1

<Echarts options="20210513/users-deser-1.json" />

### users-ser-1

<Echarts options="20210513/users-ser-1.json" />

### clients-deser-1

<Echarts options="20210513/clients-deser-1.json" />

### clients-ser-1

<Echarts options="20210513/clients-ser-1.json" />

### Benchmark 配置

- CPU: Inter(R) Core(TM) i5-8250U CPU @1.60GHz 1.80GHz
- RAM: 8.00GB
- OS: Windows 10 2004

```
# JMH version: 1.29
# VM version: JDK 1.8.0_202, Java HotSpot(TM) 64-Bit Server VM, 25.202-b08
# VM invoker: C:\Program Files\Java\jre1.8.0_202\bin\java.exe
# VM options: -XX:+AggressiveOpts -Xms2g -Xmx2g
# Blackhole mode: full + dont-inline hint
# Warmup: 5 iterations, 10 s each
# Measurement: 10 iterations, 3 s each
# Timeout: 10 min per iteration
# Threads: 16 threads, will synchronize iterations
# Benchmark mode: Throughput, ops/time
```

## Benchmark 结果 (2020.03.01)

用例：基本类型，字符串，列表和简单 POJO。

### users-deser-1

<Echarts options="20200301/users-deser-1.json" />

### users-ser-1

<Echarts options="20200301/users-ser-1.json" />

### clients-deser-1

<Echarts options="20200301/clients-deser-1.json" />

### clients-ser-1

<Echarts options="20200301/clients-ser-1.json" />

### Benchmark 配置

测试是在 [Amazon EC2 c5.xlarge](https://aws.amazon.com/ec2/instance-types/c5/) (4 vCPU, 8 GiB RAM) 上运行的，JMH 配置:

```
# JMH version: 1.23
# VM version: JDK 1.8.0_242, OpenJDK 64-Bit Server VM, 25.242-b08
# VM invoker: /usr/lib/jvm/java-1.8.0-openjdk-1.8.0.242.b08-0.amzn2.0.1.x86_64/jre/bin/java
# VM options: -XX:+AggressiveOpts -Xms2g -Xmx2g
# Warmup: 5 iterations, 10 s each
# Measurement: 10 iterations, 3 s each
# Timeout: 10 min per iteration
# Threads: 16 threads, will synchronize iterations
# Benchmark mode: Throughput, ops/time
```

## Links (技术栈)

1. [JSON-B](https://javaee.github.io/jsonb-spec/): JSON-B is a standard binding layer for converting Java objects to/from JSON messages. It defines a default mapping algorithm for converting existing Java classes to JSON, while enabling developers to customize the mapping process through the use of Java annotations.
2. [JSON-P](https://javaee.github.io/jsonp/): JSON Processing (JSON-P) is a Java API to process (for e.g. parse, generate, transform and query) JSON messages. It produces and consumes JSON text in a streaming fashion (similar to StAX API for XML) and allows to build a Java object model for JSON text using API classes (similar to DOM API for XML).
3. [Gradle Plugin shadow](https://github.com/johnrengelman/shadow): Gradle plugin to create fat/uber JARs, apply file transforms, and relocate packages for applications and libraries. Gradle version of Maven's Shade.
4. [Maven Plugin shade](https://github.com/apache/maven-shade-plugin): Apache Maven Shade Plugin.
5. [LoganSquare](https://github.com/bluelinelabs/LoganSquare): Note that Gradle is the only supported build configuration for LoganSquare. To add the library to your app's build.gradle file.
6. [Javapoet](https://github.com/square/javapoet): A Java API for generating `.java` source files.
7. [Apache ECharts](https://echarts.apache.org/zh/index.html): An Open Source JavaScript Visualization Library.
8. [JMH](http://openjdk.java.net/projects/code-tools/jmh/): JMH is a Java harness for building, running, and analysing nano/micro/milli/macro benchmarks written in Java and other languages targetting the JVM.

（全文完）

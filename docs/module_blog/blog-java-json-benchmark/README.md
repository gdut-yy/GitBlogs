# JSON 组件基准测试（java-json-benchmark）

**原文链接: [https://gdut_yy.gitee.io/doc-gitblogs/module_config/blog-java-json-benchmark/](https://gdut_yy.gitee.io/doc-gitblogs/module_config/blog-java-json-benchmark/)**

## 前言

fastjson 究竟有多快？json 开源组件如何选项？为什么 SpringBoot2 json 组件选择了 jackson？如果你想知道各 json 开源组件性能的话，现在就带你研究。

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
|  23  |                [yasson](https://mvnrepository.com/artifact/org.eclipse/yasson)                 |     1.0.6      |     2.0.2      |     +      |
|  24  |            [javassist](https://mvnrepository.com/artifact/org.javassist/javassist)             |   3.26.0-GA    |   3.28.0-GA    |     +      |
|  25  |        [purejson](https://mvnrepository.com/artifact/io.github.senthilganeshs/purejson)        |     1.0.1      |     1.0.1      |     =      |

## Benchmark 结果 (2021.05)

// TODO

### users

#### users-deser-1

<Echarts options="20210511/users-deser-1.json" />

#### users-ser-1

<Echarts options="20210511/users-ser-1.json" />

### clients

#### clients-deser-1

<Echarts options="20210511/clients-deser-1.json" />

#### clients-ser-1

<Echarts options="20210511/clients-ser-1.json" />

### Benchmark 配置

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

## Benchmark 结果 (2020.03)

以下结果是在 2020 年 3 月 1 日使用上述库和版本进行计算的：

### `Users` 对象

用例：基本类型，字符串，列表和简单 POJO。

#### 反序列化性能

<Echarts options="20200301/users-deser-1.json" />

#### 序列化性能

<Echarts options="20200301/users-ser-1.json" />

### `Clients` 对象

用例: 基本类型，字符串，列表和简单 POJO，数组，枚举，UUID，LocalDate。

注意: 由于缺少对某些评估类型的支持，因此使用此模型测试的库较少。

#### 反序列化性能

<Echarts options="20200301/clients-deser-1.json" />

#### 序列化性能

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

（全文完）

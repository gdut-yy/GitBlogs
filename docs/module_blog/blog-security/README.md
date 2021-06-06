---
sidebar: false
---

# DFX 安全

**原文链接: [https://gdut-yy.github.io/doc-gitblogs/module_blog/blog-security/](https://gdut-yy.github.io/doc-gitblogs/module_blog/blog-security/)**

## 前言

某年某月的某一天，你发现项目中的有个开源组件存在一个 CVE 漏洞，它是一个高风险的漏洞，CVSS 评分为 9.8（CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H），但你不知道这代表着什么。

以 CVE-2021-23899 为例，可以在 NVD 上看到这个 CVE 的信息 https://nvd.nist.gov/vuln/detail/CVE-2021-23899

很巧这是 OWASP json-sanitizer 的漏洞，OWASP 本身就是搞安全的，怎么也会有漏洞？

## 术语

- CVE: Common Vulnerabilities and Exposures 通用漏洞披露
- CVSS: Common Vulnerability Scoring System 通用漏洞评分系统
- NVD: National Vulnerability Database 国家漏洞数据库（美国）
- CNVD: China National Vulnerability Database 中国国家漏洞数据库
- OWASP: Open Web Application Security Project 开放式 Web 应用程序安全项目

## OWASP Top10

2017 年，OWASP 公布了 Top 10 Web 应用程序安全风险 https://owasp.org/www-project-top-ten/

1. Injection（注入）：当将不可信数据作为命令或查询的一部分发送到解释器时，会出现 SQL，NoSQL，OS 和 LDAP 注入之类的注入漏洞。攻击者的敌对数据可能会诱使解释器执行未经预期的命令或未经适当授权而访问数据。
2. Broken Authentication（损坏的身份验证）：与身份验证和会话管理相关的应用程序功能通常会错误地实现，从而使攻击者可以利用密码，密钥或会话令牌或利用其他实现缺陷来临时或永久地假定其他用户的身份。
3. Sensitive Data Exposure（敏感数据公开）：许多 Web 应用程序和 API 不能正确保护敏感数据，例如金融，医疗保健和 PII。攻击者可能会窃取或修改受保护程度不高的数据，以进行信用卡欺诈，身份盗窃或其他犯罪。敏感数据可能在没有额外保护的情况下受到损害，例如静态加密或传输中加密，并且与浏览器进行交换时需要采取特殊的预防措施。
4. XML External Entities (XXE)（XML 外部实体）：许多较旧的或配置不正确的 XML 处理器都会评估 XML 文档中的外部实体引用。外部实体可用于使用文件 URI 处理程序，内部文件共享，内部端口扫描，远程代码执行和拒绝服务攻击来公开内部文件。
5. Broken Access Control（损坏的访问控制）：通常不会正确地执行对允许通过身份验证的用户执行操作的限制。攻击者可以利用这些缺陷来访问未经授权的功能和/或数据，例如访问其他用户的帐户，查看敏感文件，修改其他用户的数据，更改访问权限等。
6. Security Misconfiguration（安全性错误配置）：安全性错误配置是最常见的问题。这通常是由于不安全的默认配置，不完整或临时的配置，开放的云存储，错误配置的 HTTP 标头以及包含敏感信息的冗长错误消息的结果。不仅必须安全地配置所有操作系统，框架，库和应用程序，而且还必须及时对其进行补丁/升级。
7. Cross-Site Scripting XSS（跨站点脚本 XSS）：每当应用程序在未经适当验证或转义的情况下在新网页中包含不受信任的数据，或者使用可以创建 HTML 或 HTML 的浏览器 API 用用户提供的数据更新现有网页时，都会发生 XSS 漏洞 JavaScript。XSS 允许攻击者在受害者的浏览器中执行脚本，这些脚本可以劫持用户会话，破坏网站或将用户重定向到恶意网站。
8. Insecure Deserialization（不安全的反序列化）：不安全的反序列化通常会导致远程执行代码。即使反序列化缺陷不会导致远程执行代码，也可以将它们用于执行攻击，包括重播攻击，注入攻击和特权升级攻击。
9. Using Components with Known Vulnerabilities（使用具有已知漏洞的组件）：组件（例如库，框架和其他软件模块）以与应用程序相同的特权运行。如果利用了易受攻击的组件，则此类攻击可能会导致严重的数据丢失或服务器接管。使用具有已知漏洞的组件的应用程序和 API 可能破坏应用程序防御，并造成各种攻击和影响。
10. Insufficient Logging & Monitoring（日志和监控不足）：日志和监控不足，加上事件响应的缺失或无效集成，使攻击者可以进一步攻击系统，保持持久性，转向更多系统以及篡改，提取或破坏数据。大多数违规研究表明，检测到违规的时间超过 200 天，通常是由外部各方而不是内部流程或监视来检测。

## Threat Models

威胁建模 STRIDE. 这里的 STRIDE 可不是炫迈口香糖。

- S: Spoofing 假冒。假装成并非自己真实的人或物
- T: Tampering 篡改。修改你不应该修改的东西。包括有线网络（或者无线网络）的数据包、磁盘上的信息或者内存中的信息
- R: repudiation 否认。宣称自己没做什么事（不管你是否做了还是没做）
- I: InformationDisclosure 信息暴露。旨在阻止系统提供正常服务的攻击，包括使系统崩溃、让它变得运行缓慢而且无法使用，或者占满内存
- D: Denial of Service 拒绝服务。将信息暴露给没有授权查看这些内容的人
- E: Elevation of Privilege 权限提升。指一个程序或者用户在技术上可以做其本来不能做的事情

解决方案（期待属性 AINCAA）

- Authentication 认证
- Integrity 完整性
- Non-Reputation 不可否认性
- Confidentially 机密性
- Availability 可用性
- Authorization 授权

STRIDE 又有 High Level 和 Low Level 之分，有时会看到 ASTRIDE，A 是 advanced 的缩写，先进的意思。

## 业界身份认证标准/协议

- OAuth 2.0: 一种授权标准，允许用户在一个站点向其他站点授予对其资源的有限访问权限，而无需获得其凭证（通常是账号密码）。举个例子，你在手机上点击「使用微信登录」时都会使用此标准，并且系统会询问你是否同意与该应用共享你的头像、昵称等数据。
- Open ID Connect: 这是 OAuth 2.0 的一个超集，他在 OAuth 2.0 之上提供了更多用户信息和获取权限和标准，比如他定义了用户的头像为 picture。
- JSON Web Tokens: 一种开放标准，主要用来安全的传输信息，他的格式非常紧凑和独立，解析之后是一种 JSON 格式。
- Security Assertion Markup Language (SAML): 一种基于 XML 的开放数据格式，SAML 允许企业应用程序和内部、外部程序无缝连接。
- LDAP: LDAP 是轻量目录访问协议，英文全称是 Lightweight Directory Access Protocol，一般都简称为 LDAP。你可以把它理解为一个树型的用来存储用户和组织信息的数据库，常被用来做单点登录（SSO）和企业员工信息管理。
- CAS: 集中式认证服务（Central Authentication Service，简称 CAS）是一种单点登录协议。它的目的是允许一个用户访问多个应用程序，而只需向认证服务器提供一次凭证（如用户名和密码）。这样用户不仅不需在登录 Web 应用程序时重复认证，而且这些应用程序也无法获得密码等敏感信息。

单点登录（Single Sign On），简称为 SSO，是比较流行的企业业务整合的解决方案之一。SSO 的定义是在多个应用系统中，用户只需要登录一次就可以访问所有相互信任的应用系统。

联邦认证是一种分布式的身份认证，当用户在身份提供商登录时，用户可以选择到当前身份提供商信任的联邦身份提供商登录。用户可以通过联邦认证登录一个新的系统，而不必每次在新的系统中注册账号。例如现在许多网站有自己的账密注册登录方式，也有微信扫码直接登录的方式，其中的微信就是这个网站的身份联邦，用户不必填写信息注册账号，直接使用微信就可以登录。

## Spring 日志注入

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>2.5.0</version>
        <relativePath/> <!-- lookup parent from repository -->
    </parent>
    <groupId>com.devyy</groupId>
    <artifactId>spring-boot-web-poc</artifactId>
    <version>0.0.1-SNAPSHOT</version>
    <name>spring-boot-web-poc</name>
    <description>Demo project for Spring Boot</description>
    <properties>
        <java.version>1.8</java.version>
    </properties>
    <dependencies>
        <!-- logback -->
<!--        <dependency>-->
<!--            <groupId>org.springframework.boot</groupId>-->
<!--            <artifactId>spring-boot-starter-web</artifactId>-->
<!--        </dependency>-->

        <!-- log4j2 -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
            <exclusions>
                <exclusion>
                    <groupId>org.springframework.boot</groupId>
                    <artifactId>spring-boot-starter-logging</artifactId>
                </exclusion>
            </exclusions>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-log4j2</artifactId>
        </dependency>

        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>
    </dependencies>

    <build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
            </plugin>
        </plugins>
    </build>

</project>
```

```java
package com.devyy.springbootwebpoc.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/logInject")
public class LogInjectController {
    private static final Logger LOG = LoggerFactory.getLogger(LogInjectController.class);

    @PostMapping("/doInject")
    public String doInject(@RequestBody String param) {
        LOG.info("==>doInject param={}", param);
        // '\r', '\n'
        LOG.info("aaa\nbbb");
        LOG.info("aaa\rbbb");
        LOG.info("aaa\bbbb");
        // &, <, >, ", ', /
        LOG.info("aaa&bbb");
        LOG.info("aaa<bbb");
        LOG.info("aaa>bbb");
        LOG.info("aaa\"bbb");
        LOG.info("aaa'bbb");
        LOG.info("aaa/bbb");
        // U+0000 - U+001F
        LOG.info("\u0000");
        return "success";
    }
}
/*
logback
input1
2021-06-06 11:32:17.313  INFO 14660 --- [io-18003-exec-2] c.d.s.controller.LogInjectController     : ==>doInject param=input2

log4j2:
input1
2021-06-06 11:17:47.095  INFO 11552 --- [io-18003-exec-8] c.d.s.c.LogInjectController              : ==>doInject param=input2
 */
```

日志注入成功

```log
logback
2021-06-06 11:47:59.899  INFO 15904 --- [io-18003-exec-5] c.d.s.controller.LogInjectController     : ==>doInject param=input1
2021-06-06 11:32:17.313  INFO 14660 --- [io-18003-exec-2] c.d.s.controller.LogInjectController     : ==>doInject param=input2
2021-06-06 11:47:59.899  INFO 15904 --- [io-18003-exec-5] c.d.s.controller.LogInjectController     : aaa
bbb
bbb
2021-06-06 11:47:59.899  INFO 15904 --- [io-18003-exec-5] c.d.s.controller.LogInjectController     : aabbb
2021-06-06 11:47:59.899  INFO 15904 --- [io-18003-exec-5] c.d.s.controller.LogInjectController     : aaa&bbb
2021-06-06 11:47:59.899  INFO 15904 --- [io-18003-exec-5] c.d.s.controller.LogInjectController     : aaa<bbb
2021-06-06 11:47:59.899  INFO 15904 --- [io-18003-exec-5] c.d.s.controller.LogInjectController     : aaa>bbb
2021-06-06 11:47:59.899  INFO 15904 --- [io-18003-exec-5] c.d.s.controller.LogInjectController     : aaa"bbb
2021-06-06 11:47:59.899  INFO 15904 --- [io-18003-exec-5] c.d.s.controller.LogInjectController     : aaa'bbb
2021-06-06 11:47:59.899  INFO 15904 --- [io-18003-exec-5] c.d.s.controller.LogInjectController     : aaa/bbb
2021-06-06 11:47:59.899  INFO 15904 --- [io-18003-exec-5] c.d.s.controller.LogInjectController     :

log4j2
2021-06-06 11:46:13.619  INFO 16492 --- [io-18003-exec-3] c.d.s.c.LogInjectController              : ==>doInject param=input1
2021-06-06 11:17:47.095  INFO 11552 --- [io-18003-exec-8] c.d.s.c.LogInjectController              : ==>doInject param=input2
2021-06-06 11:46:13.619  INFO 16492 --- [io-18003-exec-3] c.d.s.c.LogInjectController              : aaa
bbb
bbb
2021-06-06 11:46:13.619  INFO 16492 --- [io-18003-exec-3] c.d.s.c.LogInjectController              : aabbb
2021-06-06 11:46:13.619  INFO 16492 --- [io-18003-exec-3] c.d.s.c.LogInjectController              : aaa&bbb
2021-06-06 11:46:13.619  INFO 16492 --- [io-18003-exec-3] c.d.s.c.LogInjectController              : aaa<bbb
2021-06-06 11:46:13.620  INFO 16492 --- [io-18003-exec-3] c.d.s.c.LogInjectController              : aaa>bbb
2021-06-06 11:46:13.620  INFO 16492 --- [io-18003-exec-3] c.d.s.c.LogInjectController              : aaa"bbb
2021-06-06 11:46:13.620  INFO 16492 --- [io-18003-exec-3] c.d.s.c.LogInjectController              : aaa'bbb
2021-06-06 11:46:13.620  INFO 16492 --- [io-18003-exec-3] c.d.s.c.LogInjectController              : aaa/bbb
2021-06-06 11:46:13.620  INFO 16492 --- [io-18003-exec-3] c.d.s.c.LogInjectController              :
```

spring log4j2 相关配置源码

package org.springframework.boot.logging.log4j2;

package org.springframework.boot.logging.logback;

https://logging.apache.org/log4j/2.x/manual/layouts.html

将 `log4j2.xml` 中的 `%m `用 `%enc{%m}{JSON}` 进行替换

```log
2021-06-06 12:03  INFO 17296 --- [io-18003-exec-2] c.d.s.c.LogInjectController              : ==>doInject param=input1\r\n2021-06-06 11:32:17.313  INFO 14660 --- [io-18003-exec-2] c.d.s.controller.LogInjectController     : ==>doInject param=input2
ss
```

X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block

（全文完）

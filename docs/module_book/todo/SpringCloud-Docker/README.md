# Spring Cloud 与 Docker

## 书评

第一遍看下来，主要介绍了 Spring Cloud 官方的五大组件：服务注册发现的 Eureka、负载均衡的 Ribbon、Feign、Hystrix、Zuul 等大名鼎鼎的 Netflix 开源项目。像是一个 Netflix 吹，成书当时的大环境的确如此。近年来，随着 Spring Cloud Alibaba 的孵化完成，局势有所改观，在关注 SCN 的同时，也要关注 SCA！

## 第 1 章 微服务架构概述

- Martin Fowler《微服务》原文：[https://martinfowler.com/articles/microservices.html](https://martinfowler.com/articles/microservices.html)
- 译文：[http://blog.cuicc.com/blog/2015/07/22/microservices/](http://blog.cuicc.com/blog/2015/07/22/microservices/)

## 第 2 章 微服务开发框架——Spring Cloud

## 第 3 章 开始使用 Spring Cloud 实战微服务

## 第 4 章 微服务注册与发现

## 第 5 章 使用 Ribbon 实现客户端侧负载均衡

## 第 6 章 使用 Feign 实现生命式 REST 调用

## 第 7 章 使用 Hystrix 实现微服务的容错处理

## 第 8 章 使用 Zuul 构建微服务网关

## 第 9 章 使用 Spring Cloud Config 统一管理微服务配置

## 第 10 章 使用 Spring Cloud Sleuth 实现微服务跟踪

## 第 11 章 Ddocker 入门

## 第 12 章 将微服务运行在 Docker 上

## 第 13 章 使用 Docker Compose 编排微服务

---

## FAQs

### 1. 啥是 Spring Cloud

答：Spring Cloud 是在 Spring Boot 基础上构建的，用于快速构建分布式系统的通用模式的工具集。

附对应版本: [https://spring.io/projects/spring-cloud/](https://spring.io/projects/spring-cloud/)

| Release Train         | Boot Version |
| --------------------- | ------------ |
| Hoxton（霍克顿）      | 2.2.x        |
| Greenwich（格林尼治） | 2.1.x        |
| Finchley（芬奇利）    | 2.0.x        |
| Edgware（艾奇韦尔）   | 1.5.x        |
| Dalston（达尔斯顿）   | 1.5.x        |
| Camden（姆登）        | 1.4.x        |
| Brixton（布里克斯顿） | 1.3.x        |
| Angel（安杰尔）       | 1.2.x        |

### 2. Spring Cloud 解决的问题

答：微服务

### 3. 服务注册与发现是干什么的（Eureka、Consul、Zookeeper）

答：解决硬编码服务提供者的问题

### 4. 负载均衡是干什么的（Ribbon）

答：字面意思

### 5. 网关是干什么的（Spring Cloud Gateway、Zuul）

答：网关是介于客户端和服务器端的中间层，所有的外部请求都先经过微服务网关。避免客户端多次请求不同的微服务，增加复杂性、认证难度等

### 6. 配置中心是干什么的

答：集中配置管理、动态调整、配置修改自动刷新等

### 7. 分布式缓存、分布式锁、分布式 Session

答：通过分布式缓存实现分布式锁和分布式 Session

### 8. 消息中间件（MQ）、分布式事务

答：微服务数据一致性

### 9. Docker 容器编排

答：自动扩容

### 补充: Spring Cloud Alibaba

[https://github.com/alibaba/spring-cloud-alibaba/blob/master/README-zh.md](https://github.com/alibaba/spring-cloud-alibaba/blob/master/README-zh.md)

- Sentinel: 把流量作为切入点，从流量控制、熔断降级、系统负载保护等多个维度保护服务的稳定性。
- Nacos: 一个更易于构建云原生应用的动态服务发现、配置管理和服务管理平台。
- RocketMQ: 一款开源的分布式消息系统，基于高可用分布式集群技术，提供低延时的、高可靠的消息发布与订阅服务。
- Dubbo: Apache Dubbo™ 是一款高性能 Java RPC 框架。
- Seata: 阿里巴巴开源产品，一个易于使用的高性能微服务分布式事务解决方案。

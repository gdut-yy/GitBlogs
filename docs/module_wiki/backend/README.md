# 后端

|         技术栈          |                                                             官方文档                                                             |
| :---------------------: | :------------------------------------------------------------------------------------------------------------------------------: |
|      IntelliJ IDEA      |       [https://www.jetbrains.com/idea/download/#section=windows](https://www.jetbrains.com/idea/download/#section=windows)       |
|        JDK-8 Doc        |                     [https://docs.oracle.com/javase/8/docs/api/](https://docs.oracle.com/javase/8/docs/api/)                     |
|       JDK-11 Doc        |  [https://docs.oracle.com/en/java/javase/11/docs/api/index.html](https://docs.oracle.com/en/java/javase/11/docs/api/index.html)  |
|         lombok          |                                                               []()                                                               |
|         RxJava          |                            [https://github.com/ReactiveX/RxJava](https://github.com/ReactiveX/RxJava)                            |
|          Guava          |                                [https://github.com/google/guava](https://github.com/google/guava)                                |
|          Maven          |                           [http://maven.apache.org/download.cgi](http://maven.apache.org/download.cgi)                           |
|         Gradle          | [https://docs.gradle.org/current/userguide/getting_started.html](https://docs.gradle.org/current/userguide/getting_started.html) |
|          Mysql          |                       [https://dev.mysql.com/doc/refman/8.0/en/](https://dev.mysql.com/doc/refman/8.0/en/)                       |
|          Redis          |                         [http://www.redis.cn/documentation.html](http://www.redis.cn/documentation.html)                         |
|         Mybatis         |          [https://mybatis.org/mybatis-3/zh/getting-started.html](https://mybatis.org/mybatis-3/zh/getting-started.html)          |
|         Tomcat          |                           [https://tomcat.apache.org/index.html](https://tomcat.apache.org/index.html)                           |
|          NGINX          |                                      [http://nginx.org/en/docs/](http://nginx.org/en/docs/)                                      |
|          Dubbo          |       [http://dubbo.apache.org/zh-cn/docs/user/quick-start.html](http://dubbo.apache.org/zh-cn/docs/user/quick-start.html)       |
|        RocketMQ         |                   [http://rocketmq.apache.org/docs/quick-start/](http://rocketmq.apache.org/docs/quick-start/)                   |
|       ActiveMQ 5        |    [http://activemq.apache.org/components/classic/documentation](http://activemq.apache.org/components/classic/documentation)    |
|          Kafka          |          [http://kafka.apache.org/documentation/#gettingStarted](http://kafka.apache.org/documentation/#gettingStarted)          |
|        RabbitMQ         |                    [https://www.rabbitmq.com/documentation.html](https://www.rabbitmq.com/documentation.html)                    |
|        芋道源码         |                                     [http://www.iocoder.cn/?vip](http://www.iocoder.cn/?vip)                                     |
|         Docker          |                                       [https://docs.docker.com/](https://docs.docker.com/)                                       |
|         Swaager         |                  [https://swagger.io/specification/#definitions](https://swagger.io/specification/#definitions)                  |
| Google Java Style Guide |             [https://google.github.io/styleguide/javaguide.html](https://google.github.io/styleguide/javaguide.html)             |

## Maven

### Step1: 下载 maven（如 3.6.2）

### Step2: 配置系统变量 `MAVEN_HOME`、`PAHT`

```sh
export MAVEN_HOME=/uar/local/apache-maven-3.6.2
export PATH=$PATH:$MAVEN_HOME/bin
```

### Step3: 配置 `settings.xml` 阿里源

```xml
<?xml version="1.0" encoding="UTF-8"?>
<settings xmlns="http://maven.apache.org/SETTINGS/1.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
 xsi:schemaLocation="http://maven.apache.org/SETTINGS/1.0.0 http://maven.apache.org/xsd/settings-1.0.0.xsd">
	<localRepository>D:\repository</localRepository>

	<offline>false</offline>

	<mirrors>
		<mirror>
			<id>alimaven</id>
			<name>aliyun maven</name>
			<url>http://maven.aliyun.com/nexus/content/groups/public/</url>
			<mirrorOf>central</mirrorOf>
		</mirror>
	</mirrors>

</settings>
```

### Step4: Maven 本地打包命令

```sh
mvn clean package -Pdev -Dmaven.test.skip=true
```

### Step5: `pom.xml` 文件

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>2.1.8.RELEASE</version>
        <relativePath/> <!-- lookup parent from repository -->
    </parent>
    <groupId>com.devyy</groupId>
    <artifactId>openyspider</artifactId>
    <version>0.0.1-SNAPSHOT</version>
    <name>openyspider</name>
    <description>百万级图片爬虫</description>

    <properties>
        <java.version>1.8</java.version>
    </properties>

    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
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

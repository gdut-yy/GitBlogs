---
sidebar: false
---

# Maven

### Step1: 下载 maven（如 3.6.2）

[https://maven.apache.org/download.cgi](https://maven.apache.org/download.cgi)

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

华为云

```xml
<?xml version="1.0" encoding="UTF-8"?>
<settings xmlns="http://maven.apache.org/SETTINGS/1.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
 xsi:schemaLocation="http://maven.apache.org/SETTINGS/1.0.0 http://maven.apache.org/xsd/settings-1.0.0.xsd">
	<localRepository>C:\Users\DEVYY\Documents\maven</localRepository>

	<offline>false</offline>

	<mirrors>
		<mirror>
			<id>huaweicloud</id>
			<mirrorOf>*</mirrorOf>
			<url>https://mirrors.huaweicloud.com/repository/maven/</url>
		</mirror>
	</mirrors>

	<profiles>
		<profile>
			<id>jdk-1.8</id>
			<activation>
				<activeByDefault>true</activeByDefault>
				<jdk>1.8</jdk>
			</activation>
			<properties>
				<maven.complier.source>1.8</maven.complier.source>
				<maven.complier.tatget>1.8</maven.complier.tatget>
				<maven.complier.compilerVersion>1.8</maven.complier.compilerVersion>
			</properties>
		</profile>
	</profiles>

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

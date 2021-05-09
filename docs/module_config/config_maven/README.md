---
sidebar: false
---

# Maven 配置

**原文链接: [https://gdut_yy.gitee.io/doc-gitblogs/module_config/config_maven/](https://gdut_yy.mavenee.io/doc-gitblogs/module_config/config_git/)**

## 1 下载 maven（如 3.8.1）

[https://maven.apache.org/download.cgi](https://maven.apache.org/download.cgi)

## 2 配置系统变量 `MAVEN_HOME`、`PAHT`

```sh
export MAVEN_HOME=/uar/local/apache-maven-3.8.1
export PATH=$PATH:$MAVEN_HOME/bin
```

## 3 配置 `settings.xml` 国内源

### 3.1 阿里源

```xml
<?xml version="1.0" encoding="UTF-8"?>
<settings xmlns="http://maven.apache.org/SETTINGS/1.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
 xsi:schemaLocation="http://maven.apache.org/SETTINGS/1.0.0 http://maven.apache.org/xsd/settings-1.0.0.xsd">
	<localRepository>D:\repository</localRepository>
	<offline>false</offline>

	<mirrors>
		<mirror>
			<id>alimaven</id>
			<mirrorOf>*</mirrorOf>
			<url>http://maven.aliyun.com/nexus/content/groups/public/</url>
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

### 3.2 华为云源

```xml
<?xml version="1.0" encoding="UTF-8"?>
<settings xmlns="http://maven.apache.org/SETTINGS/1.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
 xsi:schemaLocation="http://maven.apache.org/SETTINGS/1.0.0 http://maven.apache.org/xsd/settings-1.0.0.xsd">
	<localRepository>D:\repository</localRepository>
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

## 4 Maven 本地打包命令

```sh
# 跳过单元测试
mvn clean package -Dmaven.test.skip=true
```

（全文完）

---
title: maven
date: 2020-12-23 18:20:27
---

用途：用于项目构建 jar包下载管理

##### maven配置

- setting文件  地址 maven\apache-maven-3.6.3\conf\settings.xml

常用配置解释：

<font color=red>本地仓库地址</font>

```xml
<localRepository>D:\maven</localRepository>
```

<font color=red>访问仓库的用户密码</font>

```XML
<server>
    <id>ID</id>
    <username>admin</username> 
    <password>1234</password>
</server>
```

<font color=red>镜像仓库地址</font>  作用类似于代理，若中央远程仓库在国外，可以使用此处配置国内的镜像仓库

```xml
<mirror>
    <id>nexus-aliyun</id>
    <mirrorOf>central</mirrorOf>
    <name>Nexus aliyun</name>
    <url>http://maven.aliyun.com/nexus/content/groups/public</url> 
</mirror>
```

<font color=red>远程仓库</font> 本地依赖的下载来源仓库

```xml
<repository> 
    <id>aliyun-repos</id>  
    <url>https://maven.aliyun.com/repository/public</url>  
    <releases> 
        <enabled>true</enabled> 
    </releases>  
    <snapshots> 
        <enabled>false</enabled> 
    </snapshots> 
</repository>  
```

- 本地仓库

若不在settings.xml配置，则默认在 C:\Users\Administrator\\.m2  里面(Administrator为目前windows的用户名)

- idea配置

File--->settings--->Buile,Execution,Deployment--->maven 配置

Maven home directory 配置 本地maven安装目录

User settings file 配置 settings.xml文件地址

Local repository 配置 本地maben仓库地址



##### pom配置

spring项目在创建时会创建一个pom.xml文件

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!-- pom的约束 -->
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <!-- pom的版本，兼容2和3 -->
    <modelVersion>4.0.0</modelVersion>

    <!-- 父项目 -->
    <parent>
        <artifactId>nacos</artifactId>
        <groupId>com.simplemw</groupId>
        <!-- 父项目版本 -->
        <version>1.0-SNAPSHOT</version>
    </parent>

    <!-- 项目名称，表示该pom对应哪个项目 -->
    <artifactId>nacos-config</artifactId>

    <!-- 配置信息，可记录统一配置信息 -->
    <properties>
        <!-- 设置编码格式为utf-8 -->
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
    </properties>

    <!-- 配置工作环境，可配置多个然后自由切换(用于不同的环境有不同的配置时使用，如此处可以放置docker的ip信息等) -->
    <profiles>
        <profile>
            <!-- profile的名字 -->
            <id>dev</id>
            <!-- 若未选定profile时默认为这个 -->
            <activation>
                <activeByDefault>true</activeByDefault>
            </activation>
            <!-- 配置信息，可配置当前profile的配置 -->
            <properties>
            </properties>
        </profile>
        <profile>
            <!-- profile的名字 -->
            <id>pre</id>
            <!-- 配置信息，可配置当前profile的配置 -->
            <properties>
            </properties>
        </profile>
    </profiles>
    <!-- 依赖 -->
    <dependencies>
        <!-- web启动依赖 -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
            <version>2.1.6.RELEASE</version>
            <scope>compile</scope>
        </dependency>
    </dependencies>
    
    <build>
        <!-- 插件，使用的一些插件可以在这里进行配置，如docker插件等 -->
        <plugins>
            <!-- Spring Boot -->
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
            </plugin>
            <!-- 用于指定jdk的编译版本(编译后会将引用了properties的文件将properties中的信息填入进去) -->
            <plugin>
                <artifactId>maven-compiler-plugin</artifactId>
                <version>3.8.0</version>
                <configuration>
                    <source>${java.version}</source>
                    <target>${java.version}</target>
                    <encoding>UTF-8</encoding>
                    <compilerArgs>
                        <arg>-parameters</arg>
                    </compilerArgs> 
                </configuration>
            </plugin>
        </plugins>
    </build>

</project>
```

注：依赖的scope五种设置   **compile**、**provided**、**runtime**、**test**、**system**

compile：scope的默认配置，编译以及测试运行时都提供，打包会包含进去

provided：只在使用的时候(并且JDK或者容器中已经存在该资源)，编译以及测试运行时才提供，打包不会包含进去

runtime：不进行编译，测试和运行时提供，打包不会包含进去

test：不进行编译，只在测试时使用

system：用于指定本地jar时使用


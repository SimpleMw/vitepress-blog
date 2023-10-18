---
title: Spring Native
date: 2023-05-27 16:34:36
---

##### 使用场景

​	将springboot项目直接打包成exe，本地执行



##### 安装graalvm

- [下载](https://www.graalvm.org/downloads/)
- 配置环境变量
  - Path配置到bin目录
  - JAVA_HOME配置到根目录
  - java -version 校验
- 使用gu安装native-image

```shell
gu install native-image
```

```shell
native-image --version
```

##### 安装c++环境

- 下载Visual Studio Installer
- 安装
  - c++桌面版
  - 语言选择英语
  - 插件安装MSVC 2017相关的
  - win11 SDK 安装

##### 新建spring3.x项目

##### 打包exe

- 项目根目录打开 x64 Native Tools Command Prompt for VS 2022 控制台(c++环境安装后就有了)

  注：使用其的原因是其可以支持输入很长的命令

```shell
mvn -Pnative native:compile
```



##### 补充

###### 存在引入本地文件的情况

- pom

```xml
<plugin>
    <groupId>org.apache.maven.plugins</groupId>
    <artifactId>maven-resources-plugin</artifactId>
    <version>3.2.0</version>
    <executions>
        <execution>
            <id>copy-resources</id>
            <!-- 打包之前执行该命令 -->
            <phase>prepare-package</phase>
            <goals>
                <goal>copy-resources</goal>
            </goals>
            <configuration>
            <!-- 指定需要打包的文件路径 -->
            <outputDirectory>${project.build.directory}/classes/static</outputDirectory>
            <!-- 这里的file指代你要打包的文件，例如：${basedir}/src/main/resources/config.properties -->
            <resources>
                <resource>
                <directory>src/main/resources/static</directory>
                <includes>
                    <include>ts24.lib</include>
                </includes>
                </resource>
            </resources>
            </configuration>
        </execution>
    </executions>
</plugin>
```

- yml

```yaml
spring:   
  web:
    resources:
      static-locations: classpath:/static/
```

###### GraalVM与反射

其支持反射，但其使用更严格的AOT编译技术，在编译阶段就需要知道所有需要反射的类和方法，可以通过yml中配置来进行使用，其可能会导致性能下降


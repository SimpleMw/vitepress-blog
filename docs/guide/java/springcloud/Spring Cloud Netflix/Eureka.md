---
title: Eureka配置
date: 2020-11-09 11:11:11
---



场景：将开发的springboot项目配置到注册中心中

Eureka 注册中心组件分为两部分   Eureka Server 和 Eureka Client

Eureka Client负责将每个微服务注册到 Eureka Server中去

- 结构分为两部分    配置中心服务端(Eureka server)，配置中心客户端(Eureka Client)
  - 配置中心服务端即为要配置到的配置中心
  - 配置中心客户端即为开发的springboot项目


#### 配置中心服务端(Eureka server)

- 核心依赖

```xml
<!-- eureka-server注解 -->
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-netflix-eureka-server</artifactId>
</dependency>
<!-- 配置中心自动刷新，注册中心是监听客户端心跳来判断客户端是否处于活动的，可用来配置监听频率 -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-actuator</artifactId>
</dependency>
```

- application.yml

```yaml
server:
  port: 1111
eureka:
  server:
    #eureka服务自保功能关闭，确保注册中心不可用的实例及时清除
    enable-self-preservation: false
    # 每隔多久（ms）触发一次服务剔除
    eviction-interval-timer-in-ms: 1000
  client:
    #是否将自己注册到 eureka server中，默认为true，要改为false
    register-with-eureka: false
    #是否从 eureka server 中获取注册信息，默认为true，要改为false
    fetch-registry: false
    #设置注册中心地址
    serviceUrl.defaultZone: http://localhost:${server.port}/eureka/
```

- 启动类添加注解

```java
@EnableEurekaServer
```

#### 配置中心客户端(Eureka Client)

- 核心依赖

```xml
<!-- 服务注册发现 -->
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-netflix-eureka-client</artifactId>
</dependency>
<!-- 配置中心自动刷新，注册中心是监听客户端心跳来判断客户端是否处于活动的，可用来配置监听频率 -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-actuator</artifactId>
</dependency>
```

- application.xml

```yaml
server:
  port: 1112
spring: 
  application:
  	#设置在注册中心的服务名称
    name: eureka-client
#eureka
eureka:
  client:
    serviceUrl:
      #将自己注册进注册中心
      defaultZone: http://localhost:1111/eureka/
    #健康检查控制开关
    healthcheck:
      enabled: true
  instance:
    #续约更新时间间隔
    lease-renewal-interval-in-seconds: 10
    #续约到期时间
    lease-expiration-duration-in-seconds: 10
```

- 启动类添加注解

```java
@EnableEurekaClient
```



#### 配置中心

场景，可以将yml中配置的一些信息放在git或者本地仓库中，便于维护

举例存在gitee仓库中

- 核心依赖

```xml
<!-- 配置中心依赖 -->
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-config-server</artifactId>
</dependency>
```

- application.yml

此处推荐写在 bootstrap.yml 文件中，官方规定此处 bootstrap.yml的优先级大于 application.yml

```yaml
spring:
  application:
  	#设置在注册中心的服务名称
    name: config-server
  #连接GitHub
  cloud:
    config:
      server:
        git:
          uri: https://gitee.com/****/****.git  #gitee仓库地址
      label: master
```

注：若为私人仓库需要配置用户和密码

- 启动类添加注解

```java
@EnableConfigServer
```



自我理解：

去git仓库或者本地仓库把配置信息取到本地，然后通过restful接口访问文件中的数据
































---
title: nacos配置
date: 2020-12-22 18:11:11
---

Nacos是继Eureka后的新的配置注册服务中心

分为两部分 discovery(注册中心) 和 config(配置中心)

##### nacos

网上下载nacos，windows版或者linux版，不同版本有不同的启动方式

- 默认端口为8848，初始用户名和密码为 nacos/nacos
- 启动后使用 localhost:8848/nacos登录页面，能显示则启动成功

##### discovery(注册中心)

与Eureka一样，配置了discovery的注册发现的会在nacos中显示，并且可由nacos控制

- 配置依赖

```xml
<!-- web启动依赖 -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
    <version>2.1.6.RELEASE</version>
</dependency>
<!-- nacos注册发现依赖 -->
<dependency>
    <groupId>com.alibaba.cloud</groupId>
    <artifactId>spring-cloud-starter-alibaba-nacos-discovery</artifactId>
    <version>2.2.1.RELEASE</version>
</dependency>
```

- 启动类添加注册发现注解

```java
@EnableDiscoveryClient
```

新版本已经不需要写这个注解了

- bootstrap.yml或者application.yml

```yaml
server:
  #本服务的端口
  port: 1112
spring:
  application:
    #本服务的名称
    name: nacos-discovery
  cloud:
    nacos:
      discovery:
        #nacos注册中心的ip以及端口
        server-addr: 192.168.1.200:8848
        #添加服务名(会显示在nacos页面上)，经测试不添加服务名只在启动的时候能够被注册发现
        service: nacos-discovery
```

##### config(配置中心)

与Eureka一样，可以将配置存在其它地方，nacos是将配置信息存在nacos服务本地的文件夹中的

- 配置依赖

```xml
<!-- web启动依赖 -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
    <version>2.1.6.RELEASE</version>
</dependency>
<!--nacos配置中心-->
<dependency>
    <groupId>com.alibaba.cloud</groupId>
    <artifactId>spring-cloud-starter-alibaba-nacos-config</artifactId>
    <version>2.2.1.RELEASE</version>
</dependency>
```

- bootstrap.yml或者application.yml

```yaml
server:
  port: 1111
spring:
  application:
    name: nacos-config
  cloud:
    nacos:
      config:
        #设置组，不写默认为DEFAULT_GROUP
        group: DEFAULT_GROUP
        #配置真实ip，不能配置127.0.0.1
        server-addr: 192.168.1.200:8848
        #要与nacos上的配置的类型一致，例不能yml和yaml
        file-extension: yaml
        prefix: nacos-config
        namespace: 02bd5c1e-ad56-47c2-a934-7a9e89c4a73c
      discovery:
        #设置注册发现服务名
        service: nacos-config
        #配置真实ip，不能配置127.0.0.1
        server-addr: 192.168.1.200:8848
        #nacos显示页面左边添加命名空间，这里填入命名空间的id
        namespace: 02bd5c1e-ad56-47c2-a934-7a9e89c4a73c
```

注：nacos添加的配置信息需要与这里的配置信息对应才能拿到，特别注意 namespace

举例获取配置信息

- nacos配置    data Id = nacos-config.yaml      Group = DEFAULT_GROUP

注：data Id的命名规则为 ${prefix}-${spring.profiles.active}.${file-extension}，spring.profiles.active不配置则不用写

```yaml
data:
    name: 234
```

另：可以配置多个yaml或者配置共享yaml

```yaml
#设置共享配置文件
shared-configs: datasource.yaml
```

- 代码获取

```java
@RestController
public class TestContoller {
	//官方推荐使用@Value，@NacosValue获取不到值，若启动报错则给默认值如 ${data.name:123}
    @Value(value = "${data.name}")
    private String str;

    @GetMapping("ces")
    public String test(){
        return str;
    }
}
```



##### 遇到的坑

- nacos的依赖是springcloud的，若项目为springboot则 boot和cloud的版本要一致
- discovery的配置中要写上 service:服务名  不然只在启动时才显示出来
- config配置发现也要写上discovery注册发现
- namespace工作空间一定要写上，切为创建的工作空间的id




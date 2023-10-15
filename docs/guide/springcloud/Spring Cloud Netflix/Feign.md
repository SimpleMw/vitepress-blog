---
title: Feign配置
date: 2021-05-11 11:12:13
---

feign 远程服务调用组件，主要是用于微服务之间接口的互相调用

feign需要依赖于注册中心，如eurake、nacos，即用feign的提供者和消费者需要都被注册发现在注册中心中

#### 生产者

生产者不需要做其它配置，只需要将自己注册进注册中心中就行了，如controller

```java
@RestController
@RequestMapping("/provide")
public class DemoController {

    @GetMapping("/ces")
    public String provide(){
        return "我打印出来了";
    }
}
```

#### 消费者

消费者需要引入openfeign依赖，且也需将自己注册进注册中心，并配置生产者信息

- 依赖

```xml
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-openfeign</artifactId>
</dependency>
```

- feign接口

```java
//这里的注解写服务提供者的服务名
@FeignClient(value = "feign-provider")
public interface MyFeign {

    //这里是写服务的请求接口
    @GetMapping("/provide/ces")
    String provide();
}
```

- service调用

```java
@Service
public class DemoService {
    
    @Autowired 
    public MyFeign myFeign;

    public String provide(){
        return myFeign.provide();
    }
}
```



整合到springboot很简单，难的是eurake版本的适配     [查询spring版本](https://start.spring.io/actuator/info)

本次测试版本

```xml
<parent>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-parent</artifactId>
    <version>2.2.2.RELEASE</version>
    <relativePath/> <!-- lookup parent from repository -->
</parent>
```

```xml
<dependencyManagement>
    <dependencies>
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-dependencies</artifactId>
            <version>Hoxton.SR1</version>
            <type>pom</type>
            <scope>import</scope>
        </dependency>
    </dependencies>
</dependencyManagement>
```


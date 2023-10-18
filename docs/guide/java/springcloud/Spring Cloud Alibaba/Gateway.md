---
title: gateway配置
date: 2020-11-12 11:12:13
---

### 介绍

gateway位于客户端与服务端之间，作为两者的中间层，可以实现监控、认证等功能

#### 实现方式

主要是通过过滤器对请求进行过滤然后实现 添加的 功能，最后转发路由到其它微服务

注：gateway存在很多的内置过滤器，下面只举例对path的过滤器

##### 添加依赖

```xml
<dependency>    
    <groupId>org.springframework.cloud</groupId>    
    <artifactId>spring-cloud-starter-gateway</artifactId>
</dependency>
```

##### xml配置方式

```yaml
spring:
  cloud:
    gateway:
      routes:
      	  #可任意定义，不能重复，route的id
        - id: routeid
          #要跳转的路径
          uri: https://simplemw.gitee.io/blog/
          #断言 返回的是true和false
          predicates:
          	#配置gateway的过滤器以及过滤条件将结果返回给predicates
            - Path=/blog
```

遇到的坑：

使用路径过滤器的，必须满足转发前的路径和转发后的路径 最后一层url都一样

如 localhost:8080/blog   就会跳转 https://simplemw.gitee.io/blog/

##### 配置类配置方式

可以写在启动类中

```java
@SpringBootApplication
public class gatewayApplication {

    /**
     * 启动器
     * @param args
     */
    public static void main(String[] args) {
        SpringApplication.run(gatewayApplication.class,args);
    }

    /**
     * gateway过滤器配置
     * @param builder
     * @return
     */
    @Bean
    public RouteLocator customRouteLocator(RouteLocatorBuilder builder) {
        return builder.routes()
            	//此处可以写多个过滤器
                .route("route", r -> r.path("/blog")
                        .uri("https://simplemw.gitee.io/blog/"))
                .route("route1", r -> r.path("/spring-cloud")
                        .uri("https://spring.io/projects/spring-cloud"))
                .build();
    }
}
```



转发其它服务方式

```YML
spring:
  cloud:
    gateway:
      routes:
        #可任意定义，不能重复，route的id
        - id: demo
          #要跳转的微服务为demo
          uri: lb://demo
          #断言 返回的是true和false
          predicates:
            #配置gateway的过滤器以及过滤条件将结果返回给predicates
            - Path=/demo/*
          filters:
            - StripPrefix=1
        - id: demo1
          #要跳转的微服务为demo1
          uri: lb://demo1
          #断言 返回的是true和false
          predicates:
            #配置gateway的过滤器以及过滤条件将结果返回给predicates
            - Path=/demo1/*
          filters:
            - StripPrefix=1
```

可配合Eureka或者nacos服务注册发现
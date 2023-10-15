---
title: hystrix配置
date: 2021-05-11 11:12:13
---

 hystrix 熔断机制，用于服务间互相调用的熔断，结合feign使用

配置方式

- 依赖

```xml
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-netflix-hystrix</artifactId>
</dependency>
```

- yml配置

```YML
#开启熔断机制，默认false
feign:
  hystrix:
    enabled: true
```

- 熔断类

```java
@Component
public class HystrixReturn implements MyFeign {

    @Override
    public String provide() {
        System.out.println("我熔断了");
        return "我熔断了";
    }
}
```

继承与feign的接口，即会对每一个feign做一个降级熔断返回信息配置

- feign类

```java
//这里的注解写服务提供者的服务名
@FeignClient(value = "feign-provider",fallback = HystrixReturn.class)
@Component
public interface MyFeign {

    //这里是写服务的请求接口
    @GetMapping("/provide/ces")
    String provide();
}
```

注解中添加降级的熔断返回信息配置类
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

生产者方和消费者请求方式的对应关系

- POST请求(openFeign默认的请求方式是json,即默认是@RequestBody)

```java
@RestController
@RequestMapping("test")
public class OpenFeignProviderController {
    @PostMapping("/demo1")
    public Demo creatDemo(@RequestBody Demo demo){
        return Demo;
    }
}
```

```java
@FeignClient(value = "feign-provider")
public interface OpenFeignService {
    @PostMapping("/test/demo1")
    Demo creatDemo(@RequestBody Demo demo);
}
```

- 表单传参

```java
@RestController
@RequestMapping("test")
public class OpenFeignProviderController {
    @PostMapping("/demo2")
    public Demo creatDemo(Demo demo){
        return Demo;
    }
}
```

```java
@FeignClient(value = "feign-provider")
public interface OpenFeignService {
    @PostMapping("/test/demo2")
    Demo creatDemo(@SpringQueryMap Demo demo);
}
```

- url参数

```java
@RestController
@RequestMapping("test")
public class OpenFeignProviderController {
    @GetMapping("/demo3/{id}")
    public String demo3(@PathVariable("id")Integer id){
        return id;
    }
}
```

```java
@FeignClient(value = "feign-provider")
public interface OpenFeignService {
 	@GetMapping("/test/demo3/{id}")
    String demo3(@PathVariable("id")Integer id);
}
```

- 其它方式

```java
@RestController
@RequestMapping("test")
public class OpenFeignProviderController {
	@PostMapping("/demo4")
    public String demo4(String id,String name){
        return id+name;
    }
}
```

```java
@FeignClient(value = "feign-provider")
public interface OpenFeignService {
    /**
     * 必须要@RequestParam注解标注，且value属性必须填上参数名
     * 方法参数名可以任意，但是@RequestParam注解中的value属性必须和provider中的参数名相同
     */
    @PostMapping("/test/demo4")
    String test(@RequestParam("id") String arg1,@RequestParam("name") String arg2);
}
```




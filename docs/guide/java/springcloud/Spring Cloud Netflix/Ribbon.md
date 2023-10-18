---
title: Ribbon
date: 2021-05-19 11:11:11
---

ribbon 功能：实现远程调用的负载均衡

##### 负载均衡

- 网关方式的负载均衡，即将负载均衡控制与网关结合，消费者请求网关的时候做负载均衡路由到不同的提供者
- 注册中心方式的负载均衡，即负载均衡与消费者结合，消费者在请求的的时候先去注册中心获取提供方信息，再根据负载均衡去请求健康的服务



##### 使用ribbon直接实现

省略了提供者，只展示消费者代码

- 依赖

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
</dependency>
<dependency>
    <groupId>com.netflix.ribbon</groupId>
    <artifactId>ribbon</artifactId>
    <version>2.2.2</version>
</dependency>
<dependency>
    <groupId>com.netflix.ribbon</groupId>
    <artifactId>ribbon-core</artifactId>
    <version>2.2.2</version>
</dependency>
<dependency>
    <groupId>com.netflix.ribbon</groupId>
    <artifactId>ribbon-loadbalancer</artifactId>
    <version>2.2.2</version>
</dependency>
<dependency>
    <groupId>io.reactivex</groupId>
    <artifactId>rxjava</artifactId>
    <version>1.0.10</version>
</dependency>
```

- 配置类

```java
@Configuration
public class MyILoadBalancer{

    @Bean
    public ILoadBalancer createILoadBalancer(){
        // 服务列表
        List<Server> serverList = new ArrayList<>();
        serverList.add(new Server("localhost", 2202));
        serverList.add(new Server("localhost", 2203));
        // 构建负载实例
        ILoadBalancer loadBalancer = LoadBalancerBuilder.newBuilder().buildFixedServerListLoadBalancer(serverList);
        return loadBalancer;
    }

}
```

- Controller

```java
@Autowired
private ILoadBalancer iLoadBalancer;

@GetMapping("/ces")
public void ces(){
    //请求地址
    String url = "http://"+iLoadBalancer.chooseServer(null)+"/provider/ces";
    System.out.println(url);
    //入参
    RestTemplate restTemplate = new RestTemplate();
    Object result = restTemplate.getForObject(url,Object.class,Object.class);
    System.out.println(result.toString());
}
```

注：直接使用的 ILoadBalancer的chooseServer()方法来做负载均衡



##### 使用结合NACOS

省略了提供者，只展示消费者代码

- 依赖

```XML
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
</dependency>
<!--nacos注册中心-->
<dependency>
    <groupId>com.alibaba.cloud</groupId>
    <artifactId>spring-cloud-starter-alibaba-nacos-discovery</artifactId>
    <version>2.1.2.RELEASE</version>
</dependency>
```

- 配置类

```java
@Configuration
public class MyRestTemplate {
    @Bean
    @LoadBalanced
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }
}
```

- Controller

```java
@Autowired
private RestTemplate restTemplate;

@GetMapping("/ces")
public void ces(){
    Object result = restTemplate.getForObject("http://provider/provider/ces",Object.class,Object.class);
    System.out.println(result.toString());
}
```

注：主要注释为@LoadBalanced





注：目前feign和dubbo都已经集成了ribbon，不需要单独去进行配置

负载均衡算法：

ribbon默认采用：消费者请求次数与提供者个数取模的方式，获取模后作为下标去获取提供者

平滑加权负载均衡算法：[平滑负载均衡](https://www.fanhaobai.com/2018/12/load-balance-smooth-weighted-round-robin.html)

##### 自定义算法

重写 IRule

```java
@Bean
public IRule myRule(){
    IRule rule = new IRule() {
        @Override
        public Server choose(Object o) {
            //这里是算法，返回server，若是nacos的则可以去看看NacosRule类
            return null;
        }
        @Override
        public void setLoadBalancer(ILoadBalancer iLoadBalancer) {

        }
        @Override
        public ILoadBalancer getLoadBalancer() {
            return null;
        }
    };
    return rule;
}
```

可参考 [Ribbon的负载均衡策略及原理](https://blog.csdn.net/wudiyong22/article/details/80829808)


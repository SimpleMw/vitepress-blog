---
title: Promethus
date: 2023-08-23 08:46:11
---



场景 springboot整合promethus

#### [官网下载](https://prometheus.io/download/)

#### Springboot项目暴露参数

- 依赖

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-actuator</artifactId>
</dependency>
<dependency>
    <groupId>io.micrometer</groupId>
    <artifactId>micrometer-registry-prometheus</artifactId>
</dependency>
```

- yml配置

```yml
spring:
  application:
    name: prometheus-demo


server:
  port: 8080

management:
  server:
    port: 8082 #通过什么端口暴露出去

  endpoint:
    prometheus: #启用Prometheus
      enabled: true
    health:
      enabled: true #启用健康检查
      show-details: always
  metrics:
    enabled: true #启用访问
    export:
      prometheus: #启用promehus的访问
        enabled: true

  endpoints:
    enabled-by-default: true  #启用所有暴露端点,默认情况下所有端点都启动
    web:
      exposure:
        include: '*' #通配符
```

- 启动类

```java
@Bean
MeterRegistryCustomizer<MeterRegistry> configurer(@Value("${spring.application.name}") String applicationName) {
    return registry -> registry.config().commonTags("application", applicationName);
}
```

#### 配置Promethus

```yaml
  - job_name: "springboot"
    static_configs:
      - targets: ["localhost:8082"]    
    metrics_path: "/actuator/prometheus" 
```



启动服务后访问地址 http://localhost:9090/

初始访问密码admin/admin
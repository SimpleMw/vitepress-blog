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



查看接口请求时间

```
http_server_requests_seconds_max{uri='/packing/createJobActPackForStation'}[5m]
```

```
sort_desc(http_server_requests_seconds_max{instance='10.222.48.218:8699'})
```

常见的指标

```
常用的jvm的Prometheus 指标示例：
1. JVM内存指标：
   - `jvm_memory_used_bytes`: JVM内存使用量。
   - `jvm_memory_max_bytes`: JVM内存最大可用量。
   - `jvm_memory_committed_bytes`: JVM内存已分配量。
2. JVM线程指标：
   - `jvm_threads_current`: 当前活动线程数。
   - `jvm_threads_daemon`: 守护线程数。
   - `jvm_threads_peak`: 峰值线程数。
3. JVM垃圾回收指标：
   - `jvm_gc_collection_seconds`: 垃圾回收的持续时间。
   - `jvm_gc_collection_count`: 垃圾回收的次数。
4. JVM类加载指标：
   - `jvm_classes_loaded`: 已加载的类数量。
   - `jvm_classes_unloaded`: 已卸载的类数量。
5. JVM启动时间指标：
   - `jvm_uptime_seconds`: JVM运行时间。
6. JVM文件描述符指标：
   - `jvm_fd_usage`: 文件描述符使用情况。

以jvm_memory_used_bytes为例
在Prometheus中，`jvm_memory_used_bytes` 指标通常有多个实例，每个实例代表不同的内存区域。以下是一些常见的内存区域及其对应的实例：
- `jvm_memory_used_bytes{area="heap"}`：表示JVM堆内存使用量。
- `jvm_memory_used_bytes{area="nonheap"}`：表示JVM非堆内存使用量。
- `jvm_memory_used_bytes{area="codecache"}`：表示JVM代码缓存使用量。
- `jvm_memory_used_bytes{area="metaspace"}`：表示JVM元空间使用量。
- `jvm_memory_used_bytes{area="compressed_class_space"}`：表示JVM压缩类空间使用量。
- `jvm_memory_used_bytes{area="thread_stack"}`：表示JVM线程堆栈使用量。
```


---
title: zookeeper分布式锁使用
date: 2021-04-22 10:17:27
---

##### 整合zookeeper

- 安装zookeeper

  - 开启zookeeper服务

  ```shell
  #在zookeeper安装目录bin目录下
  zkServer.sh start
  ```

  - 开启zookeeper客户端

  ```shell
  #在zookeeper安装目录bin目录下
  ./zkCli.sh
  ```

- 依赖

```XML
<dependency>
    <groupId>org.apache.curator</groupId>
    <artifactId>curator-recipes</artifactId>
    <version>4.0.1</version>
</dependency>
```

通过封装好的curator来实现

- 代码顺序

```java
@Autowired
private CuratorFramework curatorFramework;

//设置zookeeper节点
InterProcessMutex interProcessMutex = new InterProcessMutex(curatorFramework,"/product");
try {
    //开启锁
    interProcessMutex.acquire();
    zookeeperService.doThings();
} catch (Exception e) {
    e.printStackTrace();
}finally {
    try {
        //释放锁
        interProcessMutex.release();
    } catch (Exception e) {
        e.printStackTrace();
    }
}
```



##### 实现原理

- 多个线程都会在zookeeper的同一个路径下创建节点，并且zookeeper会自动按创建的先后顺序给节点编号
- 线程的执行先后顺序按节点的大小来，最先创建节点的线程先执行，即节点值最小的先执行
- 为了解决惊群效应，则使用后一个监听前一个的方式，当前一个节点故障或者被删除才执行后一个线程




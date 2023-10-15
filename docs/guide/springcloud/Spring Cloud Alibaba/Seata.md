---
title: Seata
date: 2023-02-09 18:20:27
---





[优秀博客文章](www.pdai.tech/md/arch/arch-z-transection.html)



##### 名词解释(个人理解)

- TM(发起者和决策者) Transaction Manager

  负责开启全局事务，以及决定全局事务提交和回滚

- TC(组织者) Transaction Coordinator

  协调全局事务的提交和回滚

- RM(执行者) Resource Manager

  负责分支事务的注册和状态汇报，以及控制分支事务的提交和回滚

流程

- TM向TC发起全局事务，TC返回全局事务的id给TM

- RM向TC注册分支事务，TC返回分支事务的id给RM

- RM预执行，并将结果汇报给TC

- TM根据所有的分支决策全局回滚和全局提交

- RM执行全局执行和全局回滚

  

![结构图](https://www.pdai.tech/images/arch/arch-z-transection-1.png)

注：理解

- 基于XA协议的，mysql和oracal都存在XA协议，纯数据库的回滚和提交就可以满足业务的
- 基于补偿的，需要编码做冲正处理
- 强一致性，执行完一个才执行下一个







##### springboot整合seata

- 官网[下载]([GitHub - seata/seata: Seata is an easy-to-use, high-performance, open source distributed transaction solution.](https://github.com/seata/seata))

- 修改配置文件 \seata\conf\application.yml

  - 参照 application.example.yml 添加
  - config为配置中心
  - registry为注册中心
  - store为数据存储位置

- 启动nacos，启动seata

- 项目整合

  - 依赖

  ```xml
  <!--nacos注册中心-->
  <dependency>
      <groupId>com.alibaba.cloud</groupId>
      <artifactId>spring-cloud-starter-alibaba-nacos-discovery</artifactId>
      <version>2.1.2.RELEASE</version>
  </dependency>
  <!--nacos配置中心-->
  <dependency>
      <groupId>com.alibaba.cloud</groupId>
      <artifactId>spring-cloud-starter-alibaba-nacos-config</artifactId>
      <version>2.1.2.RELEASE</version>
  </dependency>
  <dependency>
      <groupId>com.alibaba.cloud</groupId>
      <artifactId>spring-cloud-starter-alibaba-seata</artifactId>
      <version>2.2.8.RELEASE</version>
      <exclusions>
          <exclusion>
              <groupId>io.seata</groupId>
              <artifactId>seata-spring-boot-starter</artifactId>
          </exclusion>
      </exclusions>
  </dependency>
  ```

  - yaml配置

  ```yaml
  seata:
    enabled: true
    tx-service-group: my_test_tx_group
    service:
      vgroup-mapping:
        my_test_tx_group: default
    config:
      type: nacos
      nacos:
        server-addr: 192.168.137.1:8848
        namespace: fakexist
        group: DEFAULT_GROUP
        username: nacos
        password: nacos
        data-id: seataServer.properties
    registry:
      type: nacos
      nacos:
        application: seata-server
        server-addr: 192.168.137.1:8848
        namespace: fakexist
        group: DEFAULT_GROUP
        cluster: default
        username: nacos
        password: nacos
  ```

  - nacos配置(增加配置)

    my_test_tx_group为springboot项目中的tx-service-group选择值

  ```
  service.vgroupMapping.my_test_tx_group
  ```

  ```
  default(为\seata\conf\application.yml文件中register的cluster)
  ```

  - 注解配置

  ```java
  @GlobalTransactional
  ```

  

总结：目前注册的历程，改动seata的配置将其注册到nacos上，再将springboot微服务项目连接到seata上


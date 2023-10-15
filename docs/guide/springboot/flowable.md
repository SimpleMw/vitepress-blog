---
title: 整合flowable-model
date: 2021-07-06 18:12:13
---

##### 下载Flowabel

- 下载 [地址](https://github.com/flowable/flowable-engine)

- 此次使用的6.4.1版本(切换分支即可找到对应版本)

##### 创建springboot项目

##### 准备数据库相关环境

- 引入依赖

```XML
<!--Mysql连接-->
<dependency>
    <groupId>mysql</groupId>
    <artifactId>mysql-connector-java</artifactId>
    <version>8.0.16</version>
</dependency>
<!--Mybatis-->
<dependency>
    <groupId>org.mybatis.spring.boot</groupId>
    <artifactId>mybatis-spring-boot-starter</artifactId>
    <version>1.3.2</version>
</dependency>
<!--lombok-->
<dependency>
    <groupId>org.projectlombok</groupId>
    <artifactId>lombok</artifactId>
    <version>1.18.12</version>
</dependency>
```

- yml配置

```yaml
server:
  port: 1234

spring:
  datasource:
    url: jdbc:mysql://localhost:3306/flowable?useUnicode=true&characterEncoding=utf8&serverTimezone=GMT%2b8&nullCatalogMeansCurrent=true
    username: root
    password: 123456
    driverClassName: com.mysql.cj.jdbc.Driver
    
  application:
    name: flowable

# Mybatis
mybatis:
  configuration:
    log-impl: org.apache.ibatis.logging.stdout.StdOutImpl
    map-underscore-to-camel-case: true
  mapper-locations: classpath*:mybatis/*.xml

```

##### 初始化flowale的表

###### 第一种方式

- 引入依赖使用

```XML
<!-- 用于初始化表 -->
<dependency>
    <groupId>org.flowable</groupId>
    <artifactId>flowable-spring-boot-starter-process</artifactId>
    <version>6.4.1</version>
</dependency>
```

- 创建初始化类

```java
package com.simplemw.config;

import org.flowable.spring.SpringProcessEngineConfiguration;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.datasource.DataSourceTransactionManager;

import javax.sql.DataSource;

@Configuration
public class FlowableProcessInit {

    @Autowired
    private DataSource dataSource;

    //事务管理器
    @Bean
    public DataSourceTransactionManager dataSourceTransactionManager(DataSource dataSource){
        DataSourceTransactionManager dataSourceTransactionManager = new DataSourceTransactionManager(dataSource);
        return dataSourceTransactionManager;
    }

    /**
     * 使用flowable中的类初始化数据库
     * @return
     */
    @Bean
    public SpringProcessEngineConfiguration springProcessEngineConfiguration(){
        SpringProcessEngineConfiguration springProcessEngineConfiguration =
                new SpringProcessEngineConfiguration();
        springProcessEngineConfiguration.setDataSource(dataSource);
        //此处是配置表的更新
        //fale:默认值。在启动时，会对比数据库表中保存的版本，如果没有表或者版本不匹配，将抛出异常。（生产环境常用）
        //true:在启动时，会对数据库中所有表进行更新操作。如果表不存在，则自动创建。（开发时常用）
        springProcessEngineConfiguration.setDatabaseSchemaUpdate("true");
        //传入事务管理器
        springProcessEngineConfiguration.setTransactionManager(dataSourceTransactionManager(dataSource));
        return springProcessEngineConfiguration;
    }
}
```

###### 第二种方式

- 引入依赖使用

```xml
<dependency>
    <groupId>org.flowable</groupId>
    <artifactId>flowable-engine</artifactId>
    <version>6.4.1</version>
</dependency>
```

- 创建初始化类

```java
package com.simplemw.config;

import org.flowable.engine.ProcessEngineConfiguration;
import org.flowable.engine.impl.cfg.StandaloneProcessEngineConfiguration;

public class DataSourceInit {

    /**
     * 初始化表
     * @param args
     */
    public static void main(String[] args) {
        //创建ProcessEngineConfiguration实例,该实例可以配置与调整流程引擎的设置
        ProcessEngineConfiguration cfg = new StandaloneProcessEngineConfiguration()
                //配置数据库相关参数
                .setJdbcUrl("jdbc:mysql://localhost:3306/flowable_test?useUnicode=true&characterEncoding=utf8&serverTimezone=GMT%2b8&nullCatalogMeansCurrent=true")
                .setJdbcUsername("root")
                .setJdbcPassword("123456")
                .setJdbcDriver("com.mysql.jdbc.Driver")
                //此处是配置表的更新
                //flase:默认值。在启动时，会对比数据库表中保存的版本，如果没有表或者版本不匹配，将抛出异常。（生产环境常用）
                //true:在启动时，会对数据库中所有表进行更新操作。如果表不存在，则自动创建。（开发时常用）
                .setDatabaseSchemaUpdate(ProcessEngineConfiguration.DB_SCHEMA_UPDATE_TRUE);
        //初始化ProcessEngine流程引擎实例
        cfg.buildProcessEngine();
    }
}
```

##### 引入静态资源

- 引入 flowable-ui-modeler-app 目录下的 \src\main\resources\static，放入项目中

- 启动项目测试是否出现画面
- account接口和models接口 404

##### 引入rest接口并测试

经过不断的报错调试，结果如下

- 添加model相关依赖

```xml
<dependency>
    <groupId>org.flowable</groupId>
    <artifactId>flowable-ui-modeler-rest</artifactId>
    <version>6.4.1</version>
</dependency>
<dependency>
    <groupId>org.flowable</groupId>
    <artifactId>flowable-ui-modeler-logic</artifactId>
    <version>6.4.1</version>
</dependency>
<dependency>
    <groupId>org.flowable</groupId>
    <artifactId>flowable-ui-modeler-conf</artifactId>
    <version>6.4.1</version>
</dependency>
```

- 启动类添加扫描rest的各个类

```java
//由于不需要flowable的权限管理，所以启动时排除
@SpringBootApplication(exclude={SecurityAutoConfiguration.class,  SecurityFilterAutoConfiguration.class})
//扫描添加的依赖中的项目的包，以及自定义的配置类
@ComponentScan(basePackages = {"org.flowable.ui.modeler.rest","org.flowable.ui.common","com.simplemw.*"})
public class FlowableTestApplication {

    public static void main(String[] args) {
        SpringApplication.run(FlowableTestApplication.class, args);
    }

}
```

- 复制 flowable-ui-modeler-conf 中的配置类 ApplicationConfiguration，修改ComponentScan

```java
@Configuration
@EnableConfigurationProperties(FlowableModelerAppProperties.class)
@ComponentScan(basePackages = {
        //引入DatabaseConfiguration，所以排除扫描
//        "org.flowable.ui.modeler.conf",
        "org.flowable.ui.modeler.repository",
        "org.flowable.ui.modeler.service",
        //flowable自己的安全验证，排除
//        "org.flowable.ui.modeler.security",
        "org.flowable.ui.common.conf",
        "org.flowable.ui.common.filter",
        "org.flowable.ui.common.service",
        "org.flowable.ui.common.repository",
        //flowable自己的安全验证，排除
//        "org.flowable.ui.common.security",
        "org.flowable.ui.common.tenant" }
)
public class ApplicationConfiguration {

    @Bean
    public ServletRegistrationBean modelerApiServlet(ApplicationContext applicationContext) {
        AnnotationConfigWebApplicationContext dispatcherServletConfiguration = new AnnotationConfigWebApplicationContext();
        dispatcherServletConfiguration.setParent(applicationContext);
        dispatcherServletConfiguration.register(ApiDispatcherServletConfiguration.class);
        DispatcherServlet servlet = new DispatcherServlet(dispatcherServletConfiguration);
        ServletRegistrationBean registrationBean = new ServletRegistrationBean(servlet, "/api/*");
        registrationBean.setName("Flowable Modeler App API Servlet");
        registrationBean.setLoadOnStartup(1);
        registrationBean.setAsyncSupported(true);
        return registrationBean;
    }

}
```

- 复制 flowable-ui-modeler-conf 中的配置类 DatabaseConfiguration

- yaml中添加  解决报错  `flowable.common.app.idm-url` must be set

```yaml
flowable:
  common:
    app:
      idm-url: http://localhost:${server.port}/${spring.application.name}/idm
```

- 由于取消了权限配置相关，且无需登录，则需要自己配置登录的信息

  修改文件 static\scripts\configuration\url-config.js，即修改页面请求过来的路径

```js
getAccountUrl: function () {
    return FLOWABLE.CONFIG.contextRoot + '/login/rest/account';
},
```

​		新建controller接口

```java
@RestController
@RequestMapping("/login")
public class FlowableController {

    /**
     * 获取默认的管理员信息
     * @return
     */
    @RequestMapping(value = "/rest/account", method = RequestMethod.GET, produces = "application/json")
    public UserRepresentation getAccount() {
        UserRepresentation userRepresentation = new UserRepresentation();
        userRepresentation.setId("admin");
        userRepresentation.setEmail("admin@flowable.org");
        userRepresentation.setFullName("Administrator");
        userRepresentation.setLastName("Administrator");
        userRepresentation.setFirstName("Administrator");
        List<String> privileges = new ArrayList<String>();
        privileges.add(DefaultPrivileges.ACCESS_MODELER);
        privileges.add(DefaultPrivileges.ACCESS_IDM);
        privileges.add(DefaultPrivileges.ACCESS_ADMIN);
        privileges.add(DefaultPrivileges.ACCESS_TASK);
        privileges.add(DefaultPrivileges.ACCESS_REST_API);
        userRepresentation.setPrivileges(privileges);
        return userRepresentation;
    }

}
```

- 创建模型报错（问题出在未传入UserId）,登录时添加进去即在 /rest/account 接口中添加

```java
User user = new UserEntityImpl();
user.setId("myflowable");
SecurityUtils.assumeUser(user);
```



##### 表结构

###### 基础表

- act_id_user 用户表
- act_id_group 用户组表
- act_id_priv 权限表
- act_id_priv_mapping 用户权限关联表

###### 数据表

- act_re_deployment 实例表
- act_re_procdef 流程表
- 
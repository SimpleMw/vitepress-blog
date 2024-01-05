---
title: log
date: 2024-1-5 8:20:27
---

- 文件加载顺序

```
logback.xml—>application.properties—>logback-spring.xml
```

- 依赖

```XML
<!-- mybatis-plus -->
<dependency>
      <groupId>com.baomidou</groupId>
      <artifactId>mybatis-plus-boot-starter</artifactId>
      <version>3.4.1</version>
</dependency>
<!-- mysql -->
<dependency>
    <groupId>mysql</groupId>
    <artifactId>mysql-connector-java</artifactId>
    <scope>runtime</scope>
</dependency>
```

- 配置xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!-- 日志级别从低到高分为TRACE < DEBUG < INFO < WARN < ERROR，如果设置为WARN，则低于WARN的信息都不会输出 -->
<!-- scan:当此属性设置为true时，配置文件如果发生改变，将会被重新加载，默认值为true -->
<!-- scanPeriod:设置监测配置文件是否有修改的时间间隔，如果没有给出时间单位，默认单位是毫秒。当scan为true时，此属性生效。默认的时间间隔为1分钟。 -->
<!-- debug:当此属性设置为true时，将打印出logback内部日志信息，实时查看logback运行状态。默认值为false。 -->
<configuration scan="true" scanPeriod="60 seconds" debug="false">

    <contextName>logback</contextName>

    <!-- name的值是变量的名称，value的值时变量定义的值。通过定义的值会被插入到logger上下文中。定义变量后，可以使“${}”来使用变量。 -->
    <!-- 这里定义日志的根目录 -->
    <property name="log.path" value="./logfile/" />
    <property name="debug.fileName" value="debug" />
    <property name="info.fileName" value="info" />
    <property name="warn.fileName" value="warn" />
    <property name="error.fileName" value="error" />

    <!--输出到控制台-->
    <appender name="CONSOLE" class="ch.qos.logback.core.ConsoleAppender">
        <!--此日志appender是为开发使用，只配置最底级别，控制台输出的日志级别是大于或等于此级别的日志信息-->
        <filter class="ch.qos.logback.classic.filter.ThresholdFilter">
            <level>debug</level>
        </filter>
        <encoder>
            <pattern>%d{yyyy-MM-dd HH:mm:ss.SSS} [%thread] %-5level %logger{50} - %msg%n</pattern>
            <!-- 设置字符集 -->
            <charset>UTF-8</charset>
        </encoder>
    </appender>


    <!--输出到文件-->
    <!-- 时间滚动输出 level为 ALL -->
    <!--
        %d表示时间
        %thread表示线程名
        %-5level 表示日志级别，允许以五个字符长度输出
        %logger{50}表示具体的日志输出者，比如类名，括号内表示长度
        %msg表示具体的日志消息，就是logger.info("xxx")中的xxx
        %n表示换行
    -->
    <appender name="FILE_ALL" class="ch.qos.logback.core.rolling.RollingFileAppender">
        <!-- 正在记录的日志文件的路径及文件名 -->
        <file>${log.path}/${info.fileName}.log</file>
        <!--日志文件输出格式-->
        <encoder>
            <pattern>%d{yyyy-MM-dd HH:mm:ss.SSS} [%thread] %-5level %logger{50} - %msg%n</pattern>
            <charset>UTF-8</charset>
        </encoder>
        <!-- 日志记录器的滚动策略，按日期，按大小记录 -->
        <rollingPolicy class="ch.qos.logback.core.rolling.TimeBasedRollingPolicy">
            <!--
                滚动时产生日志的归档路径及文件名
                %d{yyyy-MM-dd}：按天进行日志滚动
                %i：当文件大小超过maxFileSize时，按照i进行文件滚动
            -->
            <fileNamePattern>${log.path}/${info.fileName}-%d{yyyy-MM-dd}.%i.log</fileNamePattern>
            <timeBasedFileNamingAndTriggeringPolicy class="ch.qos.logback.core.rolling.SizeAndTimeBasedFNATP">
                <maxFileSize>100MB</maxFileSize>
            </timeBasedFileNamingAndTriggeringPolicy>
            <!--日志文件保留天数-->
            <maxHistory>90</maxHistory>
            <!--所有的日志文件最大2G，超过就会删除旧的日志-->
            <totalSizeCap>2GB</totalSizeCap>
        </rollingPolicy>
    </appender>

    <!-- 时间滚动输出 level为 DEBUG 日志 -->
    <appender name="DEBUG_FILE" class="ch.qos.logback.core.rolling.RollingFileAppender">
        <file>${log.path}/${debug.fileName}.log</file>
        <encoder>
            <pattern>%d{yyyy-MM-dd HH:mm:ss.SSS} [%thread] %-5level %logger{50} - %msg%n</pattern>
            <charset>UTF-8</charset>
        </encoder>
        <rollingPolicy class="ch.qos.logback.core.rolling.TimeBasedRollingPolicy">
            <fileNamePattern>${log.path}/debug/${debug.fileName}-%d{yyyy-MM-dd}.%i.log</fileNamePattern>
            <timeBasedFileNamingAndTriggeringPolicy class="ch.qos.logback.core.rolling.SizeAndTimeBasedFNATP">
                <maxFileSize>100MB</maxFileSize>
            </timeBasedFileNamingAndTriggeringPolicy>
            <maxHistory>15</maxHistory>
        </rollingPolicy>
        <!-- 此日志文件只记录debug级别的 -->
        <filter class="ch.qos.logback.classic.filter.LevelFilter">
            <!--
            onMatch和onMismatch都有三个属性值，分别为Accept、DENY和NEUTRAL
            onMatch="ACCEPT" 表示匹配该级别及以上
            onMatch="DENY" 表示不匹配该级别及以上
            onMatch="NEUTRAL" 表示该级别及以上的，由下一个filter处理，如果当前是最后一个，则表示匹配该级别及以上
            onMismatch="ACCEPT" 表示匹配该级别以下
            onMismatch="NEUTRAL" 表示该级别及以下的，由下一个filter处理，如果当前是最后一个，则不匹配该级别以下的
            onMismatch="DENY" 表示不匹配该级别以下的
            -->
            <level>debug</level>
            <onMatch>ACCEPT</onMatch>
            <onMismatch>DENY</onMismatch>
        </filter>
    </appender>

    <!-- 时间滚动输出 level为 WARN 日志 -->
    <appender name="WARN_FILE" class="ch.qos.logback.core.rolling.RollingFileAppender">
        <file>${log.path}/${warn.fileName}.log</file>
        <encoder>
            <pattern>%d{yyyy-MM-dd HH:mm:ss.SSS} [%thread] %-5level %logger{50} - %msg%n</pattern>
            <charset>UTF-8</charset>
        </encoder>
        <rollingPolicy class="ch.qos.logback.core.rolling.TimeBasedRollingPolicy">
            <fileNamePattern>${log.path}/warn/${warn.fileName}-%d{yyyy-MM-dd}.%i.log</fileNamePattern>
            <timeBasedFileNamingAndTriggeringPolicy class="ch.qos.logback.core.rolling.SizeAndTimeBasedFNATP">
                <maxFileSize>100MB</maxFileSize>
            </timeBasedFileNamingAndTriggeringPolicy>
            <maxHistory>15</maxHistory>
        </rollingPolicy>
        <!-- 此日志文件只记录warn级别的 -->
        <filter class="ch.qos.logback.classic.filter.LevelFilter">
            <level>warn</level>
            <onMatch>ACCEPT</onMatch>
            <onMismatch>DENY</onMismatch>
        </filter>
    </appender>

    <!-- 时间滚动输出 level为 ERROR 日志 -->
    <appender name="ERROR_FILE" class="ch.qos.logback.core.rolling.RollingFileAppender">
        <file>${log.path}/${error.fileName}.log</file>
        <encoder>
            <pattern>%d{yyyy-MM-dd HH:mm:ss.SSS} [%thread] %-5level %logger{50} - %msg%n</pattern>
            <charset>UTF-8</charset>
        </encoder>
        <rollingPolicy class="ch.qos.logback.core.rolling.TimeBasedRollingPolicy">
            <fileNamePattern>${log.path}/error/${error.fileName}-%d{yyyy-MM-dd}.%i.log</fileNamePattern>
            <timeBasedFileNamingAndTriggeringPolicy class="ch.qos.logback.core.rolling.SizeAndTimeBasedFNATP">
                <maxFileSize>100MB</maxFileSize>
            </timeBasedFileNamingAndTriggeringPolicy>
            <maxHistory>15</maxHistory>
        </rollingPolicy>
        <!-- 此日志文件只记录ERROR级别的 -->
        <filter class="ch.qos.logback.classic.filter.LevelFilter">
            <level>ERROR</level>
            <onMatch>ACCEPT</onMatch>
            <onMismatch>DENY</onMismatch>
        </filter>
    </appender>

    <appender name="REQUEST" class="ch.qos.logback.core.rolling.RollingFileAppender">
        <file>${log.path}/request.log</file>
        <encoder>
            <pattern>%d{yyyy-MM-dd HH:mm:ss.SSS} [%thread] %-5level %logger{50} - %msg%n</pattern>
            <charset>UTF-8</charset>
        </encoder>
        <rollingPolicy class="ch.qos.logback.core.rolling.TimeBasedRollingPolicy">
            <fileNamePattern>${log.path}/request-%d{yyyy-MM-dd}.%i.log</fileNamePattern>
            <timeBasedFileNamingAndTriggeringPolicy class="ch.qos.logback.core.rolling.SizeAndTimeBasedFNATP">
                <maxFileSize>100MB</maxFileSize>
            </timeBasedFileNamingAndTriggeringPolicy>
            <maxHistory>90</maxHistory>
        </rollingPolicy>
    </appender>

    <appender name="MYBATIS" class="ch.qos.logback.core.rolling.RollingFileAppender">
        <file>${log.path}/mybatis.log</file>
        <encoder>
            <pattern>%d{yyyy-MM-dd HH:mm:ss.SSS} [%thread] %-5level %logger{50} - %msg%n</pattern>
            <charset>UTF-8</charset>
        </encoder>
        <rollingPolicy class="ch.qos.logback.core.rolling.TimeBasedRollingPolicy">
            <fileNamePattern>${log.path}/mybatis-%d{yyyy-MM-dd}.%i.log</fileNamePattern>
            <timeBasedFileNamingAndTriggeringPolicy class="ch.qos.logback.core.rolling.SizeAndTimeBasedFNATP">
                <maxFileSize>100MB</maxFileSize>
            </timeBasedFileNamingAndTriggeringPolicy>
            <maxHistory>90</maxHistory>
        </rollingPolicy>
    </appender>


    <!-- root总的日志级别的控制,指定上面写的appender哪些生效 -->
    <root level="info">
        <appender-ref ref="CONSOLE"/>
        <appender-ref ref="FILE_ALL"/>
        <appender-ref ref="DEBUG_FILE"/>
        <appender-ref ref="WARN_FILE"/>
        <appender-ref ref="ERROR_FILE"/>
    </root>

    <!-- 设置单个或者客制化的配置 -->
    <!-- 例 配置controller的日志记录 -->
    <logger name="com.simplemw.controller" level="info">
        <appender-ref ref="REQUEST"/>
    </logger>
    <!-- 例 配置mybatis-plus的日志记录，此处需要在application.yml中注释掉mybatis-plus.configuration.log-impl -->
    <logger name="com.simplemw.dao" level="debug">
        <appender-ref ref="MYBATIS"/>
    </logger>


    <!-- 根据不同的生产环境使用不同的日志配置  -->
    <!--开发环境:打印控制台-->
    <springProfile name="dev">
        <root level="info">
            <appender-ref ref="CONSOLE"/>
        </root>
    </springProfile>
    <!--生产环境:输出到文件-->
    <springProfile name="prd">
        <root level="info">
            <appender-ref ref="CONSOLE"/>
            <appender-ref ref="FILE_ALL"/>
            <appender-ref ref="DEBUG_FILE"/>
            <appender-ref ref="WARN_FILE"/>
            <appender-ref ref="ERROR_FILE"/>
        </root>
    </springProfile>

</configuration>
```

- application.yml配置

```yaml
server:
  port: 8081

spring:
  application:
    name: logTest
  datasource:
    url: jdbc:mysql://localhost:3306/fakexist?useUnicode=true&characterEncoding=utf8&serverTimezone=UTC
    username: root
    password: 123456
    driverClassName: com.mysql.cj.jdbc.Driver

logging:
  # 指定配置文件(与文件中的contextName有关) 加载顺序 logback.xml—>application.properties—>logback-spring.xml
  config: classpath:logback-spring.xml


mybatis-plus:
  mapper-locations: classpath:mapper/*Mapper.xml
  configuration:
#    log-impl: org.apache.ibatis.logging.stdout.StdOutImpl
    map-underscore-to-camel-case: true
```

- controller测试

```java
import com.simplemw.service.LogTestService;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "logTest")
@Slf4j
public class LogTestController {

    @Autowired
    private LogTestService logTestService;

    @ApiOperation("测试Log")
    @GetMapping("testLog")
    public void testLog(){
        log.info("info");
        log.error("error");
        log.warn("warn");
        logTestService.testLog();
    }

}

```

- service测试

```java
import com.simplemw.dao.LogTestMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class LogTestService {


    @Autowired
    private LogTestMapper logTestMapper;

    public void testLog() {
        log.info("service");
        int all = logTestMapper.getAll(2);
        System.out.println(all);
    }
}
```


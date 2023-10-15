---
title: 整合sentinel
date: 2021-08-03 18:12:13
---

sentinel用于对请求的流量控制，熔断降级的管控

实现原理：通过拦截器对配置了限流规则的接口或者代码块进行限流和熔断降级处理

#### 代码整合

流程原理：目的微服务暴露8719端口，控制台可根据8719的接口获取埋点的信息(若该端口被已经被占用，则会开启8719自增未被占用的端口)，控制台设置规则并将规则发送到目的微服务，目的微服务在进行每次访问的时候被其拦截器拦截，根据规则来流量控制

##### 开启控制台

控制台用于获取要控制的微服务的埋点，以及给每个埋点设置规则

- 官网下载sentinel代码或者直接[下载](https://github.com/alibaba/Sentinel)dashbord的jar包

  启动dashbord

- 默认端口为8080

##### 整合sentinel

###### 依赖

```XML
<dependency>
    <groupId>com.alibaba.cloud</groupId>
    <artifactId>spring-cloud-starter-alibaba-sentinel</artifactId>
    <version>2.1.2.RELEASE</version>
</dependency>
```

###### xml配置

```XML
spring:
  application:
    name: sentinel
  cloud:
    sentinel:
      transport:
        #配置sentinel控制台的ip和端口
        dashboard: localhost:8080
        heartbeat-interval-ms: 500
      #懒加载标志 默认是false
      eager: true
      filter:
        #配置是否对controller进行默认控制，默认是true
        enabled: true
feign:
  sentinel:
    #feign开启sentinel限流，默认为false，且只需在FeignClient注解中配置属性 fallback就行
    enabled: true
```

###### 自定义配置类

- 配置超出规则后的默认返回

```JAVA
import com.alibaba.csp.sentinel.adapter.spring.webmvc.callback.BlockExceptionHandler;
import com.alibaba.csp.sentinel.slots.block.BlockException;
import com.alibaba.fastjson.JSON;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.PrintWriter;
import java.util.HashMap;
import java.util.Map;

/**
 * 自定义sentinel拦截返回
 */
@Component
public class SentinelExceptionHandler implements BlockExceptionHandler {
    public void handle(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, BlockException e) throws Exception {
        Map<String,Object> map = new HashMap<String, Object>();
        map.put("code", 500);
        map.put("mesg", "流量控制，请求失败");
        map.put("data","");
        String jsonString = JSON.toJSONString(map);

        httpServletResponse.setStatus(500);
        httpServletResponse.setCharacterEncoding("utf-8");
        httpServletResponse.setContentType("text/html;charset=utf-8");
        PrintWriter out = httpServletResponse.getWriter();
        out.print(jsonString);
        out.flush();
        out.close();
    }
}
```

- 配置权限控制的校验

```java
import com.alibaba.csp.sentinel.adapter.spring.webmvc.callback.RequestOriginParser;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;

/**
 * 自定义Sentinel授权规则，可根据请求信息，做一个判断，返回审核结果
 */
@Component
public class SentinelRequestOriginParser implements RequestOriginParser {

    //配置授权规则可根据返回的信息进行控制
    public String parseOrigin(HttpServletRequest httpServletRequest) {
        //如：可以获取头部信息中的token去限制访问
        String token = httpServletRequest.getHeader("token");
        //如：判断token
        //如：返回的String为调用方，在dashbord中授权规则配置中是根据返回的调用方去设置黑白名单
        return "stopUser";
    }
}
```

###### controller

```java
import com.alibaba.csp.sentinel.Entry;
import com.alibaba.csp.sentinel.SphU;
import com.alibaba.csp.sentinel.Tracer;
import com.alibaba.csp.sentinel.annotation.SentinelResource;
import com.alibaba.csp.sentinel.context.ContextUtil;
import com.alibaba.csp.sentinel.slots.block.BlockException;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;

@RestController
@RequestMapping("/ces")
public class DemoController {

    /**
     * SentinelResource 注解是用于热点流控的埋点
     * fallback和fallbackClass指定自定义的返回的类的方法，注：该方法要为static
     * blockHandler和blockHandlerClass指定自定义的返回的类的方法
     * 两组SentinelResource的属性配置的区别是fallback是方法异常时返回，blockHandler是超出限流规则时返回
     * @return
     */
    @GetMapping("ces")
    @SentinelResource(value = "ces")
    public String ces(){
        return "1111";
    }

    /**
     * 手动创建对方法或者代码块的限流控制
     * @return
     */
    @GetMapping("manual")
    public String ManualSentinelDo(){
        //为了方便记录直接写在controller

        ContextUtil.enter("manual","stopUser");
        Entry entry = null;
        try {
            //设置规则
            entry = SphU.entry("manual");

            //要做限流的代码块---------------------------start
            String date = new Date().toString();
            return date;
            //要做限流的代码块----------------------------end

        } catch (BlockException e) {
            e.printStackTrace();
            return "熔断降级处理...";
        } catch (Exception e) {
            //正常返回异常
            e.printStackTrace();
            //用于sentinel统计代码块中异常次数
            Tracer.trace(e);
        }finally {
            //如果不为空则关闭
            if(entry != null){
                entry.exit();
            }
            ContextUtil.exit();
        }
        return "result";
    }
}
```

###### 其它

注：

- 若同一个ip起两个整合了sentinel的微服务，则第一个开发8719端口，第二个开启的端口会累加

- 规则是在埋点的基础上进行设置的
- 埋点可以是controller的接口，也可以是方法，甚至可以是一段代码块
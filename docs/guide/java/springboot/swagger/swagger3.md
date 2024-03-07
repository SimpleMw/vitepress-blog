---
title: swagger3配置
date: 2022-10-18 11:11:11
---

#### gateway和swagger3整合

##### 依赖

```xml
<!-- swagger相关 -->
<dependency>
    <groupId>io.springfox</groupId>
    <artifactId>springfox-boot-starter</artifactId>
    <version>3.0.0</version>
</dependency>
<!-- swagger增强 -->
<dependency>
    <groupId>com.github.xiaoymin</groupId>
    <artifactId>knife4j-spring-boot-starter</artifactId>
    <version>3.0.3</version>
</dependency>
<!-- gateway依赖 -->
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-gateway</artifactId>
    <version>2.2.5.RELEASE</version>
    <exclusions>
        <exclusion>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </exclusion>
    </exclusions>
</dependency>
```

##### 配置类

- swagger Resources提供类

```java
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Component;
import springfox.documentation.swagger.web.SwaggerResource;
import springfox.documentation.swagger.web.SwaggerResourcesProvider;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Component
@Primary
public class SwaggerProvider implements SwaggerResourcesProvider {

    /**
     * 获取网关的路由信息,也可以从配置文件获取
     */
    @Autowired
    private RouteLocator routeLocator;

    private static final String SWAGGER3URL = "/v3/api-docs";

    @Value("${spring.application.name}")
    private String self;


    @Override
    public List<SwaggerResource> get() {
        List<SwaggerResource> resources = new ArrayList<>();
        //此处是讲gateway网关自己的swagger也显示出来，若不需要可以不设置
        SwaggerResource swaggerResourceSelf = new SwaggerResource();
        swaggerResourceSelf.setUrl(SWAGGER3URL +"?group=" + self);
        swaggerResourceSelf.setName(self);
        swaggerResourceSelf.setSwaggerVersion("3.0");
        resources.add(swaggerResourceSelf);

        List<String> routes = new ArrayList<>();
        routeLocator.getRoutes()
                .filter(route -> route.getUri().getHost() != null)
                .subscribe(route -> routes.add(route.getUri().getHost()));

        Set<String> dealed = new HashSet<>();
        routes.forEach(instance -> {
            //拼接url(通过单机版可以看到url的实际样子，故按其拼接)
            String url = "/api/" + instance.toLowerCase() + SWAGGER3URL +"?group=" + instance.toLowerCase();
            if (!dealed.contains(url)) {
                dealed.add(url);
                SwaggerResource swaggerResource = new SwaggerResource();
                swaggerResource.setUrl(url);
                swaggerResource.setName(instance);
                swaggerResource.setSwaggerVersion("3.0");
                resources.add(swaggerResource);
            }
        });

        return resources;
    }

}
```

- gateway网关swagger(单机版也可以按此配置)

```java
import com.github.xiaoymin.knife4j.spring.annotations.EnableKnife4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.web.context.request.async.DeferredResult;
import springfox.documentation.builders.*;
import springfox.documentation.oas.annotations.EnableOpenApi;
import springfox.documentation.service.*;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;

import java.util.ArrayList;
import java.util.List;


@Configuration
@EnableOpenApi
@EnableKnife4j
public class SwaggerConfig {


    //获取当前服务名，也可以直接写死
    @Value("${spring.application.name}")
    private String name;

    @Bean
    public Docket systemApi() {

        return new Docket(DocumentationType.OAS_30)
                .groupName(name) //传入分组名
                .genericModelSubstitutes(DeferredResult.class).useDefaultResponseMessages(false).forCodeGeneration(true)
                .select()
                .apis(RequestHandlerSelectors.basePackage("com.simplemw")) //扫描包的路径
                .paths(PathSelectors.any()).build()
                .pathMapping("/") //设置swagger请求的前缀等
                .globalRequestParameters(getGlobalRequestParameters())  //通用请求参数配置
                .globalResponses(HttpMethod.GET, getGlobalResponseMessage())  //通用响应参数配置
                .globalResponses(HttpMethod.POST, getGlobalResponseMessage())
                .apiInfo(systemApiInfo());
    }

    private ApiInfo systemApiInfo() {
        return new ApiInfoBuilder()
                .title("swagger3 title")
                .description("测试swagger整合knife4j生成离线接口文档")
                .termsOfServiceUrl("https://www.123.com/")
                .contact(new Contact("name", "", "123456@qq.com"))
                .version("1.0")
                .build();
    }
    
    /**
     * 通用全局请求参数
     */
    private List<RequestParameter> getGlobalRequestParameters() {
        List<RequestParameter> parameters = new ArrayList<>();
        parameters.add(new RequestParameterBuilder()
                .name("Authorization")
                .description("token")
                .required(false)
                .in(ParameterType.HEADER)
                .build());
        parameters.add(new RequestParameterBuilder()
                .name("lang")
                .description("多语言切换")
                .required(false)
                .in(ParameterType.HEADER)
                .build());
        return parameters;
    }

    /**
     * 通用响应码配置
     */
    private List<Response> getGlobalResponseMessage() {
        List<Response> responseList = new ArrayList<>();
        responseList.add(new ResponseBuilder().code("404").description("找不到资源").build());
        return responseList;
    }
}
```

##### 网关放行

```yaml
    - /swagger-ui/**
    - /webjars/**
    - /swagger-resources/**
    - /v3/api-docs/**
```
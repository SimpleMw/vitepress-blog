---
title: swagger配置
date: 2020-11-08 11:11:11
---

# swagger整合

作用：swagger用来生成接口文档

整合步骤

- 添加依赖

```xml
<dependency>
    <groupId>io.springfox</groupId>
    <artifactId>springfox-swagger2</artifactId>
    <version>2.9.2</version>
</dependency>
<dependency>
    <groupId>io.springfox</groupId>
    <artifactId>springfox-swagger-ui</artifactId>
    <version>2.9.2</version>
</dependency>
<!-- swagger增强 -->
<dependency>
    <groupId>com.github.xiaoymin</groupId>
    <artifactId>knife4j-spring-boot-starter</artifactId>
    <version>2.0.3</version>
</dependency>
```

`knife4j-micro-spring-boot-starter`是适用于微服务架构的Knife4j Starter

`knife4j-spring-boot-starter`是传统单体应用的Knife4j Starter

- 设置swagger的配置

```java
@Configuration
@EnableSwagger2
@EnableKnife4j
public class Swagger {

    @Bean
    public Docket docket(){
        return new Docket(DocumentationType.SWAGGER_2)
             	//通用响应参数配置
                .globalResponseMessage(RequestMethod.GET.GET, getGlobalResponseMessage()) 
                .globalResponseMessage(RequestMethod.POST, getGlobalResponseMessage())
                .apiInfo(apiInfo()).select()
                .apis(RequestHandlerSelectors.basePackage("com.simplemw"))
                .paths(PathSelectors.any()).build()
            	//统一添加后缀
            	.pathMapping("api");

    }

    private ApiInfo apiInfo(){
        return new ApiInfoBuilder()
                //页面标题
                .title("springBoot测试使用Swagger2构建RESTful API")
                //创建人
                .contact(new Contact("admin","127.0.0.1",""))
                //版本号
                .version("1.0")
                //描述
                .description("API 描述")
                .build();
    }


    /**
     * 通用响应码配置
     */
    private List<ResponseMessage> getGlobalResponseMessage() {
        List<ResponseMessage> responseList = new ArrayList<>();
        responseList.add(new ResponseMessageBuilder().code(200).message("成功").build());
        responseList.add(new ResponseMessageBuilder().code(406).message("失败").build());
        return responseList;
    }
}
```

- 然后就是在controller类和pojo类中加上各种api注解

controller中

```java
@Api(value="这是controller类的描述",tags = "这是controller类的描述")   //对类的描述，注：展示是按controller为总目录展示的
```

```java
@ApiOperation("这是方法描述")		//对方法的描述
@ApiImplicitParam(name = "map",value = "这是对方法入参的描述")
```

若为文件导出在 @ApiOperation注解中可以加上 produces = "application/octet-stream" 如

```java
@ApiOperation("这是方法描述",produces = "application/octet-stream")		//对方法的描述
```

pojo中

```java
@ApiModel(value = "这是pojo类的描述", description = "这是pojo类的描述")   //对类的描述
```

```java
@ApiModelProperty(value = "模板名称")    //对属性的描述
```

- 动态返回

```java
@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ReturnDto<T> implements Serializable {
    private String msg;
    private T data;
    private Integer code;
}
```

- 举例Controller接口

```java
@Api("测试")
@Slf4j
@RestController
@RequestMapping("/demo")
public class DemoController {

    @ApiOperation(value = "用户列表")
    @GetMapping("getUser")
    public ReturnDto<List<UserDto>> getUser(){
        List<UserDto> list = new ArrayList<>();
        list.add(UserDto.builder().name("111").message("message").build());
        return new ReturnDto<List<UserDto>>("查询成功!",list,200);
    }
}
```



---

配置完成后 访问路径  http://localhost:8080/swagger-ui.html#/

增强ui的访问页面  http://localhost:8080/doc.html#/

运行时，swagger会自动将api注解配置到网页上


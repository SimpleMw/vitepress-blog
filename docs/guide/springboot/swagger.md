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

- 设置swagger的配置

```java
@Configuration
@EnableSwagger2
public class SwaggerConfig {

    public Docket createRestApi(){
        return new Docket(DocumentationType.SWAGGER_2)
                .apiInfo(apiInfo())
                .select()
                //扫描的controller包路径
                .apis(RequestHandlerSelectors.basePackage("com.simplemw"))
                .paths(PathSelectors.any())
                //写最后
                .build();
    }

    //公共描述
    //也可直接用在上面方法中，分开写的原因是，有时会扫描多个包路径，就可以直接用公共描述了
    private ApiInfo apiInfo(){
        return new ApiInfoBuilder()
                .title("这是标题")//设置页面标题
                .description("这是描述......")//描述
                .version("1.0")//版本
                //这是联系人信息
                .contact(new Contact("simplemw", "http://localhost:8080", "xxx@qq.com"))
                //写最后
                .build();
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



---

配置完成后 访问路径  http://localhost:8080/swagger-ui.html#/

增强ui的访问页面  http://localhost:8080/doc.html#/

运行时，swagger会自动将api注解配置到网页上
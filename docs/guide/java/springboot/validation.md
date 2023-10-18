---
title: validation参数验证
date: 2021-10-14 19:01:00
---

#### 原理

- 依赖

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-validation</artifactId>
</dependency>
```

- 配置handler

```java
@RestControllerAdvice
@Slf4j
public class exceptionHander {

    /**
     * 抓取自带注解的报错(校验@NotNull、@NotBlank 等)
     * @param e 异常
     * @return 返回信息
     */
    @ExceptionHandler(BindException.class)
    public ReturnDto handleError(BindException e) {
        return ReturnDto.error(e.getBindingResult().getFieldError().getDefaultMessage());
    }

    /**
     * 抓取自带注解的报错
     * @param e 异常
     * @return 返回信息
     */
    @ExceptionHandler(ConstraintViolationException.class)
    public ReturnDto handleError(ConstraintViolationException e) {
        return ReturnDto.error(e.getMessage());
    }

    /**
     * 抓取自定义注解的报错(或校验@Length 等)
     * @param e 异常
     * @return 返回信息
     */
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ReturnDto exceptionHandler(MethodArgumentNotValidException e) {
        return ReturnDto.error(e.getBindingResult().getFieldError().getDefaultMessage());
    }

}
```

- 实体类

```java
@ApiModelProperty("标题")
@NotNull(message = "标题不能为空")
private String title;

@ApiModelProperty("信息")
@NotNull(message = "信息不能为空")
@Length(min=0, max=5)
private String message;
```


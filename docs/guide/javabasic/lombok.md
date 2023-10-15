---
title: lombok注解
date: 2020-11-10 18:34:36
category: java基础相关
tag: java
top_img: false
---

### lombok常见注解

pojo中作用

#### @Getter/@Setter

生成所有成员变量的get、set方法

#### @ToString

toString()方法  of属性限定显示，exclude属性排除

#### @NonNull

用于判断成员变量标识是否为空，为空抛出空指针异常



#### @NoArgsConstructor

生成无参构造器

#### @RequiredArgsConstructor

生成包含final和@NonNull注解的成员变量的构造器

#### @AllArgsConstructor

生成全参构造器

#### @Data

作用于类上，@ToString @EqualsAndHashCode @Getter @Setter @RequiredArgsConstructor的集合

#### @log

生成日志变量

#### @Builder 

将类转变为建造者模式，然后可以通过链式风格来创建对象



#### @Cleanup

修饰对象，自动关闭资源，如io流的Stream

#### @SneakyThrows

java中一些可能出现异常的地方，编译器会自动让你处理，trycatch或者trow，加上该注解即可骗过编译器，实际不会抛出异常


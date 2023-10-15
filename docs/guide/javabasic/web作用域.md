---
title: web相关复习
date: 2020-10-04 13:25:25
category: java基础相关
tag: java
top_img: false
---

javaweb 三大组件 Servlet，Filter，Listener

## Servlet

### 生命周期四个阶段：

- 实例化：调用构造方法

- 初始化：调用init()方法

- 处理请求：调用service()方法

- 销毁：调用destroy()方法

### 使用Servlet方式

实现方式：继承httpServlet类，重写doPost()、doGet()方法；

实现原理：HttpServlet的service(HttpServletRequest,HttpServletResponse)方法会去判断当前请求是GET还是POST，如果是GET请求，那么会去调用本类的doGet()方法，如果是POST请求会去调用doPost()方法

### Jsp和Servlet

- Jsp就是后缀为jsp的文件，即是HTML中写java代码
- Servlet 在javaweb开发中主要的功能为 处理请求和发送响应
- 两者的区别是  
  - Jsp是在HTML中写java代码 ，servlet是java代码中写HTML
  - Jsp是先部署后编译，servlet是先编译后部署

## Fileter 过滤器

### 使用Filter方式

实现方法：实现Filter接口，重新doFiler()方法

实现原理：对配置的拦截的url的request和response进行修改

### 过滤器和拦截器的区别

- 拦截器是基于java的反射机制的，而过滤器是基于函数回调。
- 拦截器是spring的一个组件不依赖与servlet容器，过滤器依赖与servlet容器。
- 拦截器能应用于所有的方法前后以及异常抛出前后，而过滤器只在servlet前后其作用

## Listener 监听器

监听器是对某个对象的监听，一般是监听其创建、销毁以及改变

- **ServletContext对象监听器**
- **HttpSession对象监听器**
- **ServletRequest对象监听器**

使用Listener方式

实现方法：例 实现HttpSessionListener 接口，重写sessionCreated()方法或者sessionDestroyed()方法监听创建和销毁

## 四大作用域

- page域 

  Jsp页面使用

- request域

  一个请求到转发的周期

- session域

  从打开浏览器到关闭浏览器，可以有多个请求

- application域

  应用启动到应用结束，所有用户共享application中的变量

## 九大内置对象

| 对象        | 解释           | 作用域      | 类型                           | 在Servlet中如何获得                           |
| ----------- | -------------- | ----------- | ------------------------------ | --------------------------------------------- |
| application | 应用程序对象   | Application | javax.servlet.ServletContext   | this.getServletContext()                      |
| session     | 会话对象       | Session     | javax.servlet.http.HttpSession | requset.getSession()                          |
| request     | 请求对象       | Request     | javax.servlet.ServletRequest   | service方法中的request参数                    |
| response    | 响应对象       | Page        | javax.servlet.SrvletResponse   | service方法中的response参数                   |
| pageContext | 页面上下文对象 | Page        | javax.servlet.jsp.PageContext  | 不能在servlet中使用，可以获得其他对象         |
| out         | 输出对象       | Page        | javax.servlet.jsp.JspWriter    | response.getWriter<注意这里类型是printWriter> |
| config      | 配置对象       | Page        | javax.servlet.ServletConfig    | this.getServletConfig()                       |
| page        | 页面对象       | Page        | javax.lang.Object              | this                                          |
| exception   | 异常对象       | Page        | javax.lang.Throwable           | new Throwable();                              |
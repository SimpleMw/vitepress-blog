---
title: IOC和AOP
date: 2020-10-17 8:34:36
---

# 控制反转(IOC)

分为控制和反转

控制：对象的创建交给了spring容器，在spring创建对象的过程中会根据 bean来创建对象，也可以说一个bean就是一个对象

反转：主动权由程序员交给了用户，用户可以选择调用；传统的是 在程序中使用new来创建对象然后使用对象调用方法， 现为 spring容器创建对象然后传入对象，不需要更改原程序，原程序只使用传入的对象(此种方式在springboot中非常常见，如重写拦截器)

也叫依赖注入，即将  需要生成对象的类 注入，由spring容器自动创建，创建实例的方式，是通过反射的方式获取类，然后实例化后注入

## xml配置方式

- 实际service层

```JAVA
public interface UserService {

    public void origdothings();

}
```

```JAVA
public class UserServiceImp implements UserService{
    
    public void origdothings() {
        System.out.println("这是原本要做的事");
    }
    
}
```

- 配置相应的xml

```XML
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
        http://www.springframework.org/schema/beans/spring-beans.xsd">

    <!-- 注入bean中-->
    <bean id="service" class="com.simplemw.service.UserServiceImp"/>
    
</beans>
```

- 测试类

```JAVA
public class MyTest {

    public static void main(String[] args) {
        //获取配置文件的bean
        ApplicationContext context = new ClassPathXmlApplicationContext("applicationContext.xml");
        //从connext中获取userService对象
        UserService userService = (UserService) context.getBean("service");
        userService.origdothings();
    }

}
```

## 注解配置方式

- 实际service层

```JAVA
public interface UserService {

    public void origdothings();

}
```

```JAVA
//注入到bean中
@Component("userservice")
public class UserServiceImp implements UserService{

    public void origdothings() {
        System.out.println("这是原本要做的事");
    }

}
```

- 配置相应的xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
        http://www.springframework.org/schema/beans/spring-beans.xsd">

    <!-- 开启bean注解扫描 -->
    <context:component-scan base-package="com.simplemw.service"></context:component-scan>
    
</beans>
```

- 测试类

```JAVA
public class MyTest {

    public static void main(String[] args) {
        //获取配置文件的bean
        ApplicationContext context = new ClassPathXmlApplicationContext("applicationContext.xml");
        //从connext中获取userService对象
        UserService userService = (UserService) context.getBean("service");
        userService.origdothings();
    }

}
```

# 面向切面编程(AOP)

解释：在不改变原有代码轨迹的基础上给其添加一些额外的功能   如日志打印等

## xml配置方式

- 实际service层

```JAVA
public interface UserService {

    public void origdothings();

}
```

```JAVA
public class UserServiceImp implements UserService{
    
    public void origdothings() {
        System.out.println("这是原本要做的事");
    }
    
}
```

- 要添加的方法类

```JAVA
public class AddThings {

    /*
     * 术语，通知，即需要加入的功能
     */

    public void before(){
        System.out.println("之前做的事");
    }

    public void after(){
        System.out.println("之后做的事");
    }

    public void around(ProceedingJoinPoint pjp) throws Throwable {
        System.out.println("环绕前做的事");
        pjp.proceed();//用来表示原来要做的事，即切面的事
        System.out.println("环绕后做的事");
    }

    public void after_return(){
        System.out.println("方法完成后的通知");
    }

    public void after_throwing(){
        System.out.println("方法抛出后的通知");
    }
    
}
```

- 配置相应的xml

```XML
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:aop="http://www.springframework.org/schema/aop"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
        http://www.springframework.org/schema/beans/spring-beans.xsd
        http://www.springframework.org/schema/aop
        http://www.springframework.org/schema/aop/spring-aop.xsd">

    <!-- 注入bean中-->
    <!-- 要切的类 -->
    <bean id="service" class="com.simplemw.service.UserServiceImp"/>
    <!-- 添加的方法的类 -->
    <bean id="add" class="com.simplemw.add.AddThings"/>

    <!-- 配置切面以及切入的方法-->
    <aop:config>
        <aop:aspect ref="add">
            <!-- 配置切入点，此处配置的为UserServiceImp类下所有的方法 -->
            <!-- execution()方法解释 前面*为返回参数类型，后面为方法表示其中前面为带包路径的类路径，后面的*为所有方法名..表示所有类型参数列表，也可以特别指代某一个方法 -->
            <aop:pointcut id="point" expression="execution(* com.simplemw.service.UserServiceImp.*(..))"/>
            <!-- 之前 -->
            <aop:before method="before" pointcut-ref="point"/>
            <!-- 之后 -->
            <aop:after method="after" pointcut-ref="point"/>
            <!-- 环绕前后 -->
            <aop:around method="around" pointcut-ref="point"/>
            <!-- 方法完成后 -->
            <aop:after-returning method="after_return" pointcut-ref="point"/>
            <!-- 抛出后 -->
            <aop:after-throwing method="after_throwing" pointcut-ref="point"/>
        </aop:aspect>
    </aop:config>
</beans>

```

- 测试类

```JAVA
public class MyTest {

    public static void main(String[] args) {
        //获取配置文件的bean
        ApplicationContext context = new ClassPathXmlApplicationContext("applicationContext.xml");
        //从connext中获取userService对象
        UserService userService = (UserService) context.getBean("service");
        userService.origdothings();
    }

}

```

- 输出结果

```txt
之前做的事
环绕前做的事
这是原本要做的事
方法完成后的通知
环绕后做的事
之后做的事

```

<font color=red>注：此种方式，添加的功能顺序与配置顺序有关，即先配置环绕和后配置环绕，输出结果不同</font>

## 注解配置方式

- 实际service层

```JAVA
public interface UserService {

    public void origdothings();

}

```

```JAVA
//注入到bean中,命名为userservice
@Component("userservice")
public class UserServiceImp implements UserService{

    public void origdothings() {
        System.out.println("这是原本要做的事");
    }

}

```

- 切面配置类

```JAVA
//该类也要注入bean中
@Component
//表示这是一个切面配置类
@Aspect
public class AnnotationPoint {

    /*
     *连接点：每个方法的前后
     *切点，通知和连接点关联的地方为切点
     *切面，通知和连接点关联 为切面
     * (解释不重要，理解到就行)
     */

    //配置切点
    @Pointcut("execution(* com.simplemw.service.UserServiceImp.*(..))")
    public void point(){}

    //将通知与切点关联
    @Before("point()")
    public void before(){
        System.out.println("之前做的事");
    }

    @After("point()")
    public void after(){
        System.out.println("之后做的事");
    }
    @Around("point()")
    public void around(ProceedingJoinPoint pjp) throws Throwable {
        System.out.println("环绕前做的事");
        //用来表示原来要做的事，即切面的事
        pjp.proceed();
        System.out.println("环绕后做的事");
    }
    @AfterReturning("point()")
    public void after_return(){
        System.out.println("方法完成后的通知");
    }
    @AfterThrowing("point()")
    public void after_throwing(){
        System.out.println("方法抛出后的通知");
    }

}

```

- XML配置

```XML
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xmlns:aop="http://www.springframework.org/schema/aop"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
        http://www.springframework.org/schema/beans/spring-beans.xsd
        http://www.springframework.org/schema/context
        http://www.springframework.org/schema/context/spring-context.xsd
        http://www.springframework.org/schema/aop
        http://www.springframework.org/schema/aop/spring-aop.xsd">

    <!-- 开启bean注解扫面 -->
    <!-- 需要把切点配置类也扫描，注入到bean中 -->
    <context:component-scan base-package="com.simplemw"></context:component-scan>

    <!-- 开启aop注解配置，@Aspect注解的类将会被扫描到 -->
    <aop:aspectj-autoproxy/>

</beans>

```

- 测试类

```JAVA
public class MyTest {

    public static void main(String[] args) {
        ApplicationContext context = new ClassPathXmlApplicationContext("applicationContext.xml");
        UserService userService = (UserService) context.getBean("userservice");
        userService.origdothings();
    }

}

```

- 输出结果

```txt
环绕前做的事
之前做的事
这是原本要做的事
方法完成后的通知
之后做的事
环绕后做的事

```

<font color=red>注：此种方式与xml配置方式不同，插入功能顺序与配置顺序无关</font>

xml配置方式和注解配置方式可以混用

----

## 自定义注解方式

- 自定义注解类

```java
@Retention(RetentionPolicy.RUNTIME)
@Target({ElementType.METHOD})
public @interface MyLabel {

    String value() default "";
}
```

```java
@Retention(RetentionPolicy.RUNTIME)
@Target({ElementType.METHOD})
public @interface MyLabelTwo {

    String value() default "";
}
```

- 切面配置类

```java
@Component
@Aspect
public class AopConfig {

    @Before(value = "@annotation(myLabel1)")
    public void before(MyLabel myLabel1){
        TestService.str = myLabel1.value();
    }

    /**
     * 配置切面
     */
    @Pointcut(value = "@annotation(myLabel2)")
    public void myPointCut(MyLabelTwo myLabel2){

    }

    @Before(value = "myPointCut(myLabel2)")
    public void beforeTwo(MyLabelTwo myLabel2){
        TestService.str = myLabel2.value();
    }

}
```

- service

```java
public static String str = "原始的字符串";

@MyLabel("第一次传入字符串")
public void function(){

}

@MyLabelTwo("第二次传入字符串")
public void function1(String str){

}
```

- controler

```java
@Autowired
private TestService testService;


@GetMapping("/ces")
public String getString(){
    testService.function();
    System.out.println(TestService.str);
    testService.function1("这是第二次");
    System.out.println(TestService.str);
    return TestService.str;
}
```


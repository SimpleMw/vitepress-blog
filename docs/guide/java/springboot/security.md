---
title: security
date: 2021-11-11 11:11:11
---



使用场景：用于访问权限的限制于管理

过程：通过用户名查询密码和角色，校验密码和判断该url是否允许该角色访问

##### 引用Security准备

- 依赖

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
</dependency>
<!-- mybatisplus相关依赖 -->
<dependency>
    <groupId>com.baomidou</groupId>
    <artifactId>mybatis-plus-boot-starter</artifactId>
    <version>3.3.1.tmp</version>
</dependency>
<!-- 数据库连接 -->
<dependency>
    <groupId>mysql</groupId>
    <artifactId>mysql-connector-java</artifactId>
    <scope>runtime</scope>
    <version>8.0.13</version>
</dependency>
<!-- lombok -->
<dependency>
    <groupId>org.projectlombok</groupId>
    <artifactId>lombok</artifactId>
    <version>1.18.8</version>
</dependency>
<!-- 角色安全控制 -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-security</artifactId>
</dependency>
<!-- swagger相关依赖 -->
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
<!-- json转换类 -->
<dependency>
    <groupId>com.alibaba</groupId>
    <artifactId>fastjson</artifactId>
    <version>1.2.75</version>
</dependency>
```

- 配置类

```java
/**
 * security配置类
 */
@Configuration
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private UserService userService;
    @Autowired
    private LoginFailHandler loginFailHandler;
    @Autowired
    private LoginSuccessHandler loginSuccessHandler;
    @Autowired
    private ForbidHandler forbidHandler;

    /**
     * 指定加密方式
     */
    @Bean
    public PasswordEncoder passwordEncoder() {
        // 使用BCrypt加密密码
        return new BCryptPasswordEncoder();
    }

    /**
     * 设置认证用户的来源
     */
    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userService);
    }

    /**
     * 配置各种拦截规则
     */
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        //关闭csrf
        http.csrf().disable();

        //自定义登录
        http.formLogin()
                .loginPage("/login.html")
                .loginProcessingUrl("/login")
                //设置登录成功或者失败的Handler,也可直接配置静态页面
                .successHandler(loginSuccessHandler)
                .failureHandler(loginFailHandler);

        //自定义无权限跳转页面也可直接配置静态页面
        http.exceptionHandling().accessDeniedHandler(forbidHandler);
        
        //注销调登出接口
        http.logout()
                //前端点击注销请求logout接口
                .logoutUrl("/logout")
                //logout请求成功后调登出接口返回登录界面
                .logoutSuccessUrl("/test/toLogin");
        
        //权限配置
        http.authorizeRequests()
                //放行
                .antMatchers("/login.html").permitAll()
                //其它请求需登录获取权限
                .anyRequest().authenticated();
    }
}
```

- 获取用户以及获取角色权限

```java
/**
 * 继承该类实现loadUserByUsername方法
 */
@Service
public class UserService implements UserDetailsService {

    @Autowired
    private SysUserDao sysUserDao;
    @Autowired
    private PasswordEncoder passwordEncoder;

    /**
     * 根据用户名查询所有的role，最后根据role去判断是否可以访问
     */
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        //获取用户信息
        QueryWrapper<SysUser> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("username", username);
        List<SysUser> users = sysUserDao.selectList(queryWrapper);
        if (users.size() < 0) {
            throw new UsernameNotFoundException("未找到用户信息");
        }

        //角色集合
        List<GrantedAuthority> authorities = new ArrayList<>();
        for (SysUser sysUser:users) {
            //得到用户角色
            String role = sysUser.getRole();
            //直接添加role角色权限(通过 hasAuthority、hasAnyAuthority 判断)
            authorities.add(new SimpleGrantedAuthority(role));
            //通过工具类传入role角色(通过 hasRole、hasAnyRole 判断)
//            authorities = AuthorityUtils.commaSeparatedStringToAuthorityList("ROLE_"+role);
        }

        SysUser user = users.get(0);
        return new User(user.getUsername(), passwordEncoder.encode(user.getPassword()), authorities);
    }
}
```

- Handler

登录成功Handler

```java
@Component
public class LoginSuccessHandler implements AuthenticationSuccessHandler {

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        response.setContentType("application/json;charset=UTF-8");
        response.setCharacterEncoding("utf-8");
        PrintWriter printWriter = response.getWriter();
        printWriter.write(ReturnDto.ok().toString());
        printWriter.flush();
        printWriter.close();
    }
}
```

登录失败Handler

```java
@Component
public class LoginFailHandler implements AuthenticationFailureHandler {

    @Override
    public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response, AuthenticationException exception) throws IOException, ServletException {
        response.setContentType("application/json;charset=UTF-8");
        response.setCharacterEncoding("utf-8");
        PrintWriter printWriter = response.getWriter();
        printWriter.write(ReturnDto.error("登录失败").toString());
        printWriter.flush();
        printWriter.close();
    }
}
```

无访问权限Handler

```java
@Component
public class ForbidHandler implements AccessDeniedHandler {

    @Override
    public void handle(HttpServletRequest request, HttpServletResponse response, AccessDeniedException accessDeniedException) throws IOException, ServletException {
        response.setContentType("application/json;charset=UTF-8");
        response.setCharacterEncoding("utf-8");
        PrintWriter printWriter = response.getWriter();
        printWriter.write(ReturnDto.error("无查看权限").toString());
        printWriter.flush();
        printWriter.close();
    }
}
```

##### 配置类方式配置

- 测试Controller

```java
@RestController
@RequestMapping("/test")
public class SecurityController {

    @GetMapping("/toLogin")
    public void toLogin(HttpServletResponse response) throws IOException {
        response.sendRedirect("login.html");
    }
    
    @GetMapping("/test1")
    public ReturnDto TestOnly(){
        return ReturnDto.ok("访问成功");
    }
}
```

- 配置类修改

```java
/**
 * security配置类
 */
@Configuration
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private UserService userService;
    @Autowired
    private LoginFailHandler loginFailHandler;
    @Autowired
    private LoginSuccessHandler loginSuccessHandler;
    @Autowired
    private ForbidHandler forbidHandler;

    /**
     * 指定加密方式
     */
    @Bean
    public PasswordEncoder passwordEncoder() {
        // 使用BCrypt加密密码
        return new BCryptPasswordEncoder();
    }

    /**
     * 设置认证用户的来源
     */
    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userService);
    }

    /**
     * 配置各种拦截规则
     */
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        //关闭csrf
        http.csrf().disable();

        //自定义登录
        http.formLogin()
                .loginPage("/login.html")
                .loginProcessingUrl("/login")
                //设置登录成功或者失败的Handler,也可直接配置静态页面
                .successHandler(loginSuccessHandler)
                .failureHandler(loginFailHandler);

        //自定义无权限跳转页面也可直接配置静态页面
        http.exceptionHandling().accessDeniedHandler(forbidHandler);
        
        //注销调登出接口
        http.logout()
                //前端点击注销请求logout接口
                .logoutUrl("/logout")
                //logout请求成功后调登出接口返回登录界面
                .logoutSuccessUrl("/test/toLogin");
        
        //权限配置
        http.authorizeRequests()
                //放行
                .antMatchers("/login.html").permitAll()
                //设置仅admin用户访问的url
//                .antMatchers("/test/**").hasAuthority("admin")
//                .antMatchers("/test/**").hasAnyAuthority("admin")
//                .antMatchers("/test/**").hasRole("admin")
//                .antMatchers("/test/**").hasAnyRole("admin")
                //其它请求需登录获取权限
                .anyRequest().authenticated();
    }
}
```

##### 注解方式配置

- 开启注解功能

```java
@EnableGlobalMethodSecurity(securedEnabled = true)
```

- 使用注解

```java
//只能判断角色
@Secured({"ROLE_admin","ROLE_user"})
```

```java
//方法执行之前判断判断
@PreAuthorize("hasAnyAuthority('admin')")
@PreAuthorize("hasAnyRole('ROLE_admin')")
```

```java
//在方法执行之后判断
@PostAuthorize("hasAnyAuthority('admin')")
@PostAuthorize("hasAnyRole('ROLE_admin')")
```

```java
//对请求参数进行过滤
@PreFilter("filterObject.key == '正'")
```

```java
//对返回数据进行过滤
@PostFilter("filterObject.key == '正'")
```

代码例子

- controller

```java
@RestController
@RequestMapping("/test")
public class SecurityController {

    @Autowired
    private TestService testService;

    @GetMapping("/toLogin")
    public void toLogin(HttpServletResponse response) throws IOException {
        response.sendRedirect("login.html");
    }
    
    @GetMapping("/test1")
//    @Secured({"ROLE_admin","ROLE_user"})
//    @PreAuthorize("hasAnyRole('ROLE_admin')")
//    @PostAuthorize("hasAnyRole('ROLE_admin')")
    public ReturnDto TestOnly(){
        return ReturnDto.ok("成功");
    }

    @GetMapping("/testPostFilter")
    public ReturnDto testPostFilter(){
        return ReturnDto.ok(testService.testPostFilter());
    }

    @GetMapping("/testPreFilter")
    public ReturnDto testPreFilter(){
        List<TestEntity> testEntities = new ArrayList<>();
        testEntities.add(new TestEntity("正","数据1"));
        testEntities.add(new TestEntity("反","数据1(反)"));
        testEntities.add(new TestEntity("反","数据2(反)"));
        testEntities.add(new TestEntity("正","数据2"));
        testEntities.add(new TestEntity("反","数据3(反)"));
        testEntities.add(new TestEntity("正","数据3"));
        return ReturnDto.ok(testService.testPreFilter(testEntities));
    }

}
```

- service

```java
@Service
public class TestService {

    @PostFilter("filterObject.key == '正'")
    public List<TestEntity> testPostFilter(){
        List<TestEntity> testEntities = new ArrayList<>();
        testEntities.add(new TestEntity("正","数据1"));
        testEntities.add(new TestEntity("反","数据1(反)"));
        testEntities.add(new TestEntity("反","数据2(反)"));
        testEntities.add(new TestEntity("正","数据2"));
        testEntities.add(new TestEntity("反","数据3(反)"));
        testEntities.add(new TestEntity("正","数据3"));
        return testEntities;
    }

    @PreFilter("filterObject.key == '正'")
    public List<TestEntity> testPreFilter(List<TestEntity> testEntities){
        return testEntities;
    }
}
```
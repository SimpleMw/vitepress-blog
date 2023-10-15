import{_ as s,o as n,c as a,Q as l}from"./chunks/framework.8153c8a6.js";const d=JSON.parse('{"title":"mysql数据库连接","description":"","frontmatter":{"title":"mysql数据库连接","date":"2020-10-14T08:48:16.000Z"},"headers":[],"relativePath":"guide/database/mysql/mysql-数据库连接.md","filePath":"guide/database/mysql/mysql-数据库连接.md"}'),p={name:"guide/database/mysql/mysql-数据库连接.md"},o=l(`<ul><li>数据库连接代码</li></ul><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">static</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">main</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">String</span><span style="color:#E1E4E8;">[] args) {</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    Connection con;</span></span>
<span class="line"><span style="color:#E1E4E8;">    Statement stm </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    ResultSet rs </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">//根据导入的包中的Driver路径来写</span></span>
<span class="line"><span style="color:#E1E4E8;">    String driver </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;com.mysql.jdbc.Driver&quot;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    String url</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&quot;jdbc:mysql://localhost:3306/cloud_data?useUnicode=true&amp;characterEncoding=UTF-8&amp;zeroDateTimeBehavior=convertToNull&amp;useSSL=true&quot;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    String username</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&quot;root&quot;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    String password</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&quot;123456&quot;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    String sql </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;select * from dept&quot;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    String deptname;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">try</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">//这里会出现异常找不到类 ClassNotFoundException，也即找不到驱动</span></span>
<span class="line"><span style="color:#E1E4E8;">        Class.</span><span style="color:#B392F0;">forName</span><span style="color:#E1E4E8;">(driver);</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">//获取连接以及获取statement以及后面的执行sql语句都会出现 SQLException 异常</span></span>
<span class="line"><span style="color:#E1E4E8;">        con </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> DriverManager.</span><span style="color:#B392F0;">getConnection</span><span style="color:#E1E4E8;">(url,username,password);</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">//创建执行对象</span></span>
<span class="line"><span style="color:#E1E4E8;">        stm </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> con.</span><span style="color:#B392F0;">createStatement</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">//查询的结果是放在结果集中的</span></span>
<span class="line"><span style="color:#E1E4E8;">        rs </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> stm.</span><span style="color:#B392F0;">executeQuery</span><span style="color:#E1E4E8;">(sql);</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">//此处进行判断是否存在数据</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">while</span><span style="color:#E1E4E8;">(rs.</span><span style="color:#B392F0;">next</span><span style="color:#E1E4E8;">()){</span></span>
<span class="line"><span style="color:#E1E4E8;">            deptname </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> rs.</span><span style="color:#B392F0;">getString</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;deptname&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">            System.out.</span><span style="color:#B392F0;">println</span><span style="color:#E1E4E8;">(deptname);</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">//关闭结果集</span></span>
<span class="line"><span style="color:#E1E4E8;">        rs.</span><span style="color:#B392F0;">close</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">//关闭执行对象</span></span>
<span class="line"><span style="color:#E1E4E8;">        stm.</span><span style="color:#B392F0;">close</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">//关闭连接</span></span>
<span class="line"><span style="color:#E1E4E8;">        con.</span><span style="color:#B392F0;">close</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">    } </span><span style="color:#F97583;">catch</span><span style="color:#E1E4E8;"> (ClassNotFoundException | SQLException </span><span style="color:#FFAB70;">e</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        e.</span><span style="color:#B392F0;">printStackTrace</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">static</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">main</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">String</span><span style="color:#24292E;">[] args) {</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    Connection con;</span></span>
<span class="line"><span style="color:#24292E;">    Statement stm </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">null</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    ResultSet rs </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">null</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">//根据导入的包中的Driver路径来写</span></span>
<span class="line"><span style="color:#24292E;">    String driver </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;com.mysql.jdbc.Driver&quot;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    String url</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&quot;jdbc:mysql://localhost:3306/cloud_data?useUnicode=true&amp;characterEncoding=UTF-8&amp;zeroDateTimeBehavior=convertToNull&amp;useSSL=true&quot;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    String username</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&quot;root&quot;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    String password</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&quot;123456&quot;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    String sql </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;select * from dept&quot;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    String deptname;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">try</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">//这里会出现异常找不到类 ClassNotFoundException，也即找不到驱动</span></span>
<span class="line"><span style="color:#24292E;">        Class.</span><span style="color:#6F42C1;">forName</span><span style="color:#24292E;">(driver);</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">//获取连接以及获取statement以及后面的执行sql语句都会出现 SQLException 异常</span></span>
<span class="line"><span style="color:#24292E;">        con </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> DriverManager.</span><span style="color:#6F42C1;">getConnection</span><span style="color:#24292E;">(url,username,password);</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">//创建执行对象</span></span>
<span class="line"><span style="color:#24292E;">        stm </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> con.</span><span style="color:#6F42C1;">createStatement</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">//查询的结果是放在结果集中的</span></span>
<span class="line"><span style="color:#24292E;">        rs </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> stm.</span><span style="color:#6F42C1;">executeQuery</span><span style="color:#24292E;">(sql);</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">//此处进行判断是否存在数据</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">while</span><span style="color:#24292E;">(rs.</span><span style="color:#6F42C1;">next</span><span style="color:#24292E;">()){</span></span>
<span class="line"><span style="color:#24292E;">            deptname </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> rs.</span><span style="color:#6F42C1;">getString</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;deptname&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">            System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(deptname);</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">//关闭结果集</span></span>
<span class="line"><span style="color:#24292E;">        rs.</span><span style="color:#6F42C1;">close</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">//关闭执行对象</span></span>
<span class="line"><span style="color:#24292E;">        stm.</span><span style="color:#6F42C1;">close</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">//关闭连接</span></span>
<span class="line"><span style="color:#24292E;">        con.</span><span style="color:#6F42C1;">close</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">    } </span><span style="color:#D73A49;">catch</span><span style="color:#24292E;"> (ClassNotFoundException | SQLException </span><span style="color:#E36209;">e</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        e.</span><span style="color:#6F42C1;">printStackTrace</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><ul><li><p>execute() 返回结果为boolean executeUpdate() 返回结果是int executeQuery()返回结果是结果集</p><ul><li>executeQuery() 常用于查询</li><li>executeUpdate() 常用于增删改</li><li>execute() 用在有多个结果集等情况下</li></ul></li><li><p>url解释</p><ul><li>useUnicode=true 使用编码为unicode</li><li>characterEncoding=UTF-8 使用字符编码集为 utf-8</li><li>zeroDateTimeBehavior=convertToNull 日期异常处理方式 <ul><li>l exception：默认值，即抛出SQL state [S1009]. Cannot convert value....的异常；</li><li>l convertToNull：将日期转换成NULL值；</li><li>l round：替换成最近的日期即0001-01-01；</li></ul></li><li>useSSL=true 解决mysql和jdbc版本不兼容问题</li></ul></li><li><p>还存在预编译的执行方式</p></li></ul><div class="language-JAVA vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">JAVA</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">static</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">main</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">String</span><span style="color:#E1E4E8;">[] args) {</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    Connection con;</span></span>
<span class="line"><span style="color:#E1E4E8;">    PreparedStatement pstm;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">int</span><span style="color:#E1E4E8;"> result;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">//根据导入的包中的Driver路径来写</span></span>
<span class="line"><span style="color:#E1E4E8;">    String driver </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;com.mysql.jdbc.Driver&quot;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    String url</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&quot;jdbc:mysql://localhost:3306/cloud_data?useUnicode=true&amp;characterEncoding=UTF-8&amp;zeroDateTimeBehavior=convertToNull&amp;useSSL=true&quot;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    String username</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&quot;root&quot;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    String password</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&quot;123456&quot;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">try</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">//这里会出现异常找不到类 ClassNotFoundException，也即找不到驱动</span></span>
<span class="line"><span style="color:#E1E4E8;">        Class.</span><span style="color:#B392F0;">forName</span><span style="color:#E1E4E8;">(driver);</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">//获取连接以及获取statement以及后面的执行sql语句都会出现 SQLException 异常</span></span>
<span class="line"><span style="color:#E1E4E8;">        con </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> DriverManager.</span><span style="color:#B392F0;">getConnection</span><span style="color:#E1E4E8;">(url,username,password);</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">//创建执行对象</span></span>
<span class="line"><span style="color:#E1E4E8;">        pstm </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> con.</span><span style="color:#B392F0;">prepareStatement</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;update dept set deptname = ? where deptno = ?&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">//将数据放入pstm对象中</span></span>
<span class="line"><span style="color:#E1E4E8;">        pstm.</span><span style="color:#B392F0;">setString</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">,</span><span style="color:#9ECBFF;">&quot;物流部门&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">        pstm.</span><span style="color:#B392F0;">setInt</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;">,</span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">//执行sql语句获取结果</span></span>
<span class="line"><span style="color:#E1E4E8;">        result </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> pstm.</span><span style="color:#B392F0;">executeUpdate</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">        System.out.</span><span style="color:#B392F0;">println</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;更新了 &quot;</span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;">result</span><span style="color:#F97583;">+</span><span style="color:#9ECBFF;">&quot; 条数据&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">//关闭执行对象</span></span>
<span class="line"><span style="color:#E1E4E8;">        pstm.</span><span style="color:#B392F0;">close</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">//关闭连接</span></span>
<span class="line"><span style="color:#E1E4E8;">        con.</span><span style="color:#B392F0;">close</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">    } </span><span style="color:#F97583;">catch</span><span style="color:#E1E4E8;"> (ClassNotFoundException | SQLException </span><span style="color:#FFAB70;">e</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        e.</span><span style="color:#B392F0;">printStackTrace</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">static</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">main</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">String</span><span style="color:#24292E;">[] args) {</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    Connection con;</span></span>
<span class="line"><span style="color:#24292E;">    PreparedStatement pstm;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">int</span><span style="color:#24292E;"> result;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">//根据导入的包中的Driver路径来写</span></span>
<span class="line"><span style="color:#24292E;">    String driver </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;com.mysql.jdbc.Driver&quot;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    String url</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&quot;jdbc:mysql://localhost:3306/cloud_data?useUnicode=true&amp;characterEncoding=UTF-8&amp;zeroDateTimeBehavior=convertToNull&amp;useSSL=true&quot;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    String username</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&quot;root&quot;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    String password</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&quot;123456&quot;</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">try</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">//这里会出现异常找不到类 ClassNotFoundException，也即找不到驱动</span></span>
<span class="line"><span style="color:#24292E;">        Class.</span><span style="color:#6F42C1;">forName</span><span style="color:#24292E;">(driver);</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">//获取连接以及获取statement以及后面的执行sql语句都会出现 SQLException 异常</span></span>
<span class="line"><span style="color:#24292E;">        con </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> DriverManager.</span><span style="color:#6F42C1;">getConnection</span><span style="color:#24292E;">(url,username,password);</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">//创建执行对象</span></span>
<span class="line"><span style="color:#24292E;">        pstm </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> con.</span><span style="color:#6F42C1;">prepareStatement</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;update dept set deptname = ? where deptno = ?&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">//将数据放入pstm对象中</span></span>
<span class="line"><span style="color:#24292E;">        pstm.</span><span style="color:#6F42C1;">setString</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">1</span><span style="color:#24292E;">,</span><span style="color:#032F62;">&quot;物流部门&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">        pstm.</span><span style="color:#6F42C1;">setInt</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">2</span><span style="color:#24292E;">,</span><span style="color:#005CC5;">1</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">//执行sql语句获取结果</span></span>
<span class="line"><span style="color:#24292E;">        result </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> pstm.</span><span style="color:#6F42C1;">executeUpdate</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">        System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;更新了 &quot;</span><span style="color:#D73A49;">+</span><span style="color:#24292E;">result</span><span style="color:#D73A49;">+</span><span style="color:#032F62;">&quot; 条数据&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">//关闭执行对象</span></span>
<span class="line"><span style="color:#24292E;">        pstm.</span><span style="color:#6F42C1;">close</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">//关闭连接</span></span>
<span class="line"><span style="color:#24292E;">        con.</span><span style="color:#6F42C1;">close</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">    } </span><span style="color:#D73A49;">catch</span><span style="color:#24292E;"> (ClassNotFoundException | SQLException </span><span style="color:#E36209;">e</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        e.</span><span style="color:#6F42C1;">printStackTrace</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>注：此种方式更加灵活，不管执行多少个此类sql，都只会解析和编译一次，而使用statement则是对每个执行的sql都解析和编译，PreparedStatement 也比 statement 方式更加安全</p>`,5),e=[o];function t(c,r,E,y,i,u){return n(),a("div",null,e)}const m=s(p,[["render",t]]);export{d as __pageData,m as default};

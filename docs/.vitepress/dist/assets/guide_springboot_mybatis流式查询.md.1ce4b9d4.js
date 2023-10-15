import{_ as s,o as n,c as a,Q as p}from"./chunks/framework.8153c8a6.js";const A=JSON.parse('{"title":"Mybatis流式查询","description":"","frontmatter":{"title":"Mybatis流式查询","date":"2023-02-13T10:20:27.000Z"},"headers":[],"relativePath":"guide/springboot/mybatis流式查询.md","filePath":"guide/springboot/mybatis流式查询.md"}'),l={name:"guide/springboot/mybatis流式查询.md"},o=p(`<ul><li>使用Mybatis的Cursor</li><li>代码</li></ul><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> org.apache.ibatis.cursor.Cursor;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> org.apache.ibatis.session.SqlSession;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> org.apache.ibatis.session.SqlSessionFactory;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> org.springframework.beans.factory.annotation.Autowired;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> org.springframework.stereotype.Service;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> org.springframework.transaction.PlatformTransactionManager;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> org.springframework.transaction.support.TransactionTemplate;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> javax.annotation.Resource;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> java.io.IOException;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> java.util.ArrayList;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> java.util.List;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> java.util.stream.StreamSupport;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">@</span><span style="color:#F97583;">Service</span></span>
<span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">DemoService</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    @</span><span style="color:#F97583;">Autowired</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">private</span><span style="color:#E1E4E8;"> DemoMapper demoMapper;</span></span>
<span class="line"><span style="color:#E1E4E8;">    @</span><span style="color:#F97583;">Autowired</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">private</span><span style="color:#E1E4E8;"> SqlSessionFactory sqlSessionFactory;</span></span>
<span class="line"><span style="color:#E1E4E8;">    @</span><span style="color:#F97583;">Resource</span></span>
<span class="line"><span style="color:#E1E4E8;">    PlatformTransactionManager platformTransactionManager;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> List&lt;</span><span style="color:#F97583;">Demo</span><span style="color:#E1E4E8;">&gt; </span><span style="color:#B392F0;">getDataFromMysql</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">        List&lt;</span><span style="color:#F97583;">Demo</span><span style="color:#E1E4E8;">&gt; demos </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> ArrayList&lt;&gt;();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">//第一种方式(sqlseesion方式)</span></span>
<span class="line"><span style="color:#E1E4E8;">        SqlSession sqlSession </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> sqlSessionFactory.</span><span style="color:#B392F0;">openSession</span><span style="color:#E1E4E8;">();  </span><span style="color:#6A737D;">// 1</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">try</span><span style="color:#E1E4E8;"> (Cursor&lt;</span><span style="color:#F97583;">Demo</span><span style="color:#E1E4E8;">&gt; cursor </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> sqlSession.</span><span style="color:#B392F0;">getMapper</span><span style="color:#E1E4E8;">(DemoMapper.class).</span><span style="color:#B392F0;">getDataFromMysql</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;">);){</span></span>
<span class="line"><span style="color:#E1E4E8;">            StreamSupport.</span><span style="color:#B392F0;">stream</span><span style="color:#E1E4E8;">(cursor.</span><span style="color:#B392F0;">spliterator</span><span style="color:#E1E4E8;">(), </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">).</span><span style="color:#B392F0;">forEach</span><span style="color:#E1E4E8;">(</span></span>
<span class="line"><span style="color:#E1E4E8;">                    demo </span><span style="color:#F97583;">-&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">                        demos.</span><span style="color:#B392F0;">add</span><span style="color:#E1E4E8;">(demo);</span></span>
<span class="line"><span style="color:#E1E4E8;">                    }</span></span>
<span class="line"><span style="color:#E1E4E8;">            );</span></span>
<span class="line"><span style="color:#E1E4E8;">        } </span><span style="color:#F97583;">catch</span><span style="color:#E1E4E8;"> (Exception </span><span style="color:#FFAB70;">e</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#F97583;">throw</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">RuntimeException</span><span style="color:#E1E4E8;">(e);</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">////第二种方式(spring事务管理器方式)</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">//TransactionTemplate transactionTemplate = new TransactionTemplate(platformTransactionManager);</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">//transactionTemplate.execute(status -&gt; {               // 2</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">//    try (Cursor&lt;Demo&gt; cursor = demoMapper.getDataFromMysql(2)) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">//        StreamSupport.stream(cursor.spliterator(), true).forEach(</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">//                demo -&gt; {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">//                    demos.add(demo);</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">//                }</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">//        );</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">//    } catch (IOException e) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">//        e.printStackTrace();</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">//    }</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">//    return null;</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">//});</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">//</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">////第三种 @Transactional(此方法加上@Transactional)</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">//try (Cursor&lt;Demo&gt; cursor = demoMapper.getDataFromMysql(2)) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">//    StreamSupport.stream(cursor.spliterator(), true).forEach(</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">//            demo -&gt; {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">//                demos.add(demo);</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">//            }</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">//    );</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">//} catch (IOException e) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">//    e.printStackTrace();</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">//}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> demos;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> org.apache.ibatis.cursor.Cursor;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> org.apache.ibatis.session.SqlSession;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> org.apache.ibatis.session.SqlSessionFactory;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> org.springframework.beans.factory.annotation.Autowired;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> org.springframework.stereotype.Service;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> org.springframework.transaction.PlatformTransactionManager;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> org.springframework.transaction.support.TransactionTemplate;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> javax.annotation.Resource;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> java.io.IOException;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> java.util.ArrayList;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> java.util.List;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> java.util.stream.StreamSupport;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">@</span><span style="color:#D73A49;">Service</span></span>
<span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">DemoService</span><span style="color:#24292E;"> {</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    @</span><span style="color:#D73A49;">Autowired</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">private</span><span style="color:#24292E;"> DemoMapper demoMapper;</span></span>
<span class="line"><span style="color:#24292E;">    @</span><span style="color:#D73A49;">Autowired</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">private</span><span style="color:#24292E;"> SqlSessionFactory sqlSessionFactory;</span></span>
<span class="line"><span style="color:#24292E;">    @</span><span style="color:#D73A49;">Resource</span></span>
<span class="line"><span style="color:#24292E;">    PlatformTransactionManager platformTransactionManager;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> List&lt;</span><span style="color:#D73A49;">Demo</span><span style="color:#24292E;">&gt; </span><span style="color:#6F42C1;">getDataFromMysql</span><span style="color:#24292E;">() {</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">        List&lt;</span><span style="color:#D73A49;">Demo</span><span style="color:#24292E;">&gt; demos </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> ArrayList&lt;&gt;();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">//第一种方式(sqlseesion方式)</span></span>
<span class="line"><span style="color:#24292E;">        SqlSession sqlSession </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> sqlSessionFactory.</span><span style="color:#6F42C1;">openSession</span><span style="color:#24292E;">();  </span><span style="color:#6A737D;">// 1</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">try</span><span style="color:#24292E;"> (Cursor&lt;</span><span style="color:#D73A49;">Demo</span><span style="color:#24292E;">&gt; cursor </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> sqlSession.</span><span style="color:#6F42C1;">getMapper</span><span style="color:#24292E;">(DemoMapper.class).</span><span style="color:#6F42C1;">getDataFromMysql</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">2</span><span style="color:#24292E;">);){</span></span>
<span class="line"><span style="color:#24292E;">            StreamSupport.</span><span style="color:#6F42C1;">stream</span><span style="color:#24292E;">(cursor.</span><span style="color:#6F42C1;">spliterator</span><span style="color:#24292E;">(), </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">).</span><span style="color:#6F42C1;">forEach</span><span style="color:#24292E;">(</span></span>
<span class="line"><span style="color:#24292E;">                    demo </span><span style="color:#D73A49;">-&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">                        demos.</span><span style="color:#6F42C1;">add</span><span style="color:#24292E;">(demo);</span></span>
<span class="line"><span style="color:#24292E;">                    }</span></span>
<span class="line"><span style="color:#24292E;">            );</span></span>
<span class="line"><span style="color:#24292E;">        } </span><span style="color:#D73A49;">catch</span><span style="color:#24292E;"> (Exception </span><span style="color:#E36209;">e</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#D73A49;">throw</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">RuntimeException</span><span style="color:#24292E;">(e);</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">////第二种方式(spring事务管理器方式)</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">//TransactionTemplate transactionTemplate = new TransactionTemplate(platformTransactionManager);</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">//transactionTemplate.execute(status -&gt; {               // 2</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">//    try (Cursor&lt;Demo&gt; cursor = demoMapper.getDataFromMysql(2)) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">//        StreamSupport.stream(cursor.spliterator(), true).forEach(</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">//                demo -&gt; {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">//                    demos.add(demo);</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">//                }</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">//        );</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">//    } catch (IOException e) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">//        e.printStackTrace();</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">//    }</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">//    return null;</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">//});</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">//</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">////第三种 @Transactional(此方法加上@Transactional)</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">//try (Cursor&lt;Demo&gt; cursor = demoMapper.getDataFromMysql(2)) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">//    StreamSupport.stream(cursor.spliterator(), true).forEach(</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">//            demo -&gt; {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">//                demos.add(demo);</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">//            }</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">//    );</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">//} catch (IOException e) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">//    e.printStackTrace();</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">//}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> demos;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div>`,2),e=[o];function t(r,c,E,y,i,m){return n(),a("div",null,e)}const u=s(l,[["render",t]]);export{A as __pageData,u as default};

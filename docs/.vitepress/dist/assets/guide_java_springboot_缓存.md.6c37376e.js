import{_ as s,o as n,c as a,Q as l}from"./chunks/framework.dd5a1521.js";const d=JSON.parse('{"title":"cache","description":"","frontmatter":{"title":"cache","date":"2024-01-04T19:20:27.000Z"},"headers":[],"relativePath":"guide/java/springboot/缓存.md","filePath":"guide/java/springboot/缓存.md"}'),p={name:"guide/java/springboot/缓存.md"},o=l(`<h4 id="缓存介绍" tabindex="-1">缓存介绍 <a class="header-anchor" href="#缓存介绍" aria-label="Permalink to &quot;缓存介绍&quot;">​</a></h4><p>redis、guava、ehcahe、jcache</p><ul><li>Redis（Remote Dictionary Server）：Redis是一个开源的内存数据存储系统，也可以用作缓存解决方案。它支持多种数据结构（如字符串、哈希、列表、集合、有序集合等），并提供了丰富的功能和灵活的配置选项。Redis的特点包括高性能、持久化、集群支持、发布/订阅等。</li><li>Guava：Guava是Google开发的Java核心库的扩展部分，其中包含了一些实用的缓存工具类。Guava的缓存实现提供了简单易用的API，并支持各种缓存策略（如基于大小、基于时间、基于访问频率等）。它还提供了缓存的加载和刷新机制，以及统计和监听功能。</li><li>Ehcache：Ehcache是一个流行的Java缓存库，提供了灵活的配置选项和高性能的缓存实现。它支持多种缓存策略（如基于大小、基于时间、基于访问频率等），并提供了内存和磁盘存储的支持。Ehcache还可以与其他框架（如Spring）集成，提供了更多的功能和扩展性。</li><li>JCache（JSR-107）：JCache是Java规范中定义的缓存API，旨在提供一个通用的缓存接口，使得开发人员可以在不同的缓存实现之间无缝切换。JCache定义了一组标准的缓存操作（如获取、存储、删除等），并提供了一些缓存配置选项。各个缓存实现（如Ehcache、Redis等）可以实现JCache接口，从而实现与应用程序的集成。</li></ul><h4 id="ehcahe实现" tabindex="-1">Ehcahe实现 <a class="header-anchor" href="#ehcahe实现" aria-label="Permalink to &quot;Ehcahe实现&quot;">​</a></h4><ul><li>依赖</li></ul><div class="language-xml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">xml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">&lt;!-- 缓存 --&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">dependency</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">groupId</span><span style="color:#E1E4E8;">&gt;org.springframework.boot&lt;/</span><span style="color:#85E89D;">groupId</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">artifactId</span><span style="color:#E1E4E8;">&gt;spring-boot-starter-cache&lt;/</span><span style="color:#85E89D;">artifactId</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">dependency</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">dependency</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">groupId</span><span style="color:#E1E4E8;">&gt;net.sf.ehcache&lt;/</span><span style="color:#85E89D;">groupId</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">artifactId</span><span style="color:#E1E4E8;">&gt;ehcache&lt;/</span><span style="color:#85E89D;">artifactId</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">dependency</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">dependency</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">groupId</span><span style="color:#E1E4E8;">&gt;org.projectlombok&lt;/</span><span style="color:#85E89D;">groupId</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">artifactId</span><span style="color:#E1E4E8;">&gt;lombok&lt;/</span><span style="color:#85E89D;">artifactId</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">optional</span><span style="color:#E1E4E8;">&gt;true&lt;/</span><span style="color:#85E89D;">optional</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">dependency</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">dependency</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">groupId</span><span style="color:#E1E4E8;">&gt;com.baomidou&lt;/</span><span style="color:#85E89D;">groupId</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">artifactId</span><span style="color:#E1E4E8;">&gt;mybatis-plus-boot-starter&lt;/</span><span style="color:#85E89D;">artifactId</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">version</span><span style="color:#E1E4E8;">&gt;3.4.1&lt;/</span><span style="color:#85E89D;">version</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">dependency</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#6A737D;">&lt;!-- mysql --&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">dependency</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">groupId</span><span style="color:#E1E4E8;">&gt;mysql&lt;/</span><span style="color:#85E89D;">groupId</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">artifactId</span><span style="color:#E1E4E8;">&gt;mysql-connector-java&lt;/</span><span style="color:#85E89D;">artifactId</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">scope</span><span style="color:#E1E4E8;">&gt;runtime&lt;/</span><span style="color:#85E89D;">scope</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">dependency</span><span style="color:#E1E4E8;">&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">&lt;!-- 缓存 --&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">dependency</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">groupId</span><span style="color:#24292E;">&gt;org.springframework.boot&lt;/</span><span style="color:#22863A;">groupId</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">artifactId</span><span style="color:#24292E;">&gt;spring-boot-starter-cache&lt;/</span><span style="color:#22863A;">artifactId</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">dependency</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">dependency</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">groupId</span><span style="color:#24292E;">&gt;net.sf.ehcache&lt;/</span><span style="color:#22863A;">groupId</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">artifactId</span><span style="color:#24292E;">&gt;ehcache&lt;/</span><span style="color:#22863A;">artifactId</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">dependency</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">dependency</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">groupId</span><span style="color:#24292E;">&gt;org.projectlombok&lt;/</span><span style="color:#22863A;">groupId</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">artifactId</span><span style="color:#24292E;">&gt;lombok&lt;/</span><span style="color:#22863A;">artifactId</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">optional</span><span style="color:#24292E;">&gt;true&lt;/</span><span style="color:#22863A;">optional</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">dependency</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">dependency</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">groupId</span><span style="color:#24292E;">&gt;com.baomidou&lt;/</span><span style="color:#22863A;">groupId</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">artifactId</span><span style="color:#24292E;">&gt;mybatis-plus-boot-starter&lt;/</span><span style="color:#22863A;">artifactId</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">version</span><span style="color:#24292E;">&gt;3.4.1&lt;/</span><span style="color:#22863A;">version</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">dependency</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#6A737D;">&lt;!-- mysql --&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">dependency</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">groupId</span><span style="color:#24292E;">&gt;mysql&lt;/</span><span style="color:#22863A;">groupId</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">artifactId</span><span style="color:#24292E;">&gt;mysql-connector-java&lt;/</span><span style="color:#22863A;">artifactId</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">scope</span><span style="color:#24292E;">&gt;runtime&lt;/</span><span style="color:#22863A;">scope</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">dependency</span><span style="color:#24292E;">&gt;</span></span></code></pre></div><ul><li>配置</li></ul><div class="language-xml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">xml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">server:</span></span>
<span class="line"><span style="color:#E1E4E8;">  port: 8081</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">spring:</span></span>
<span class="line"><span style="color:#E1E4E8;">  application:</span></span>
<span class="line"><span style="color:#E1E4E8;">    name: logTest</span></span>
<span class="line"><span style="color:#E1E4E8;">  datasource:</span></span>
<span class="line"><span style="color:#E1E4E8;">    url: jdbc:mysql://localhost:3306/fakexist?useUnicode=true</span><span style="color:#FDAEB7;font-style:italic;">&amp;</span><span style="color:#E1E4E8;">characterEncoding=utf8</span><span style="color:#FDAEB7;font-style:italic;">&amp;</span><span style="color:#E1E4E8;">serverTimezone=UTC</span></span>
<span class="line"><span style="color:#E1E4E8;">    username: root</span></span>
<span class="line"><span style="color:#E1E4E8;">    password: 123456</span></span>
<span class="line"><span style="color:#E1E4E8;">    driverClassName: com.mysql.cj.jdbc.Driver</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">mybatis-plus:</span></span>
<span class="line"><span style="color:#E1E4E8;">  mapper-locations: classpath:mapper/*Mapper.xml</span></span>
<span class="line"><span style="color:#E1E4E8;">  configuration:</span></span>
<span class="line"><span style="color:#E1E4E8;">    log-impl: org.apache.ibatis.logging.stdout.StdOutImpl</span></span>
<span class="line"><span style="color:#E1E4E8;">    map-underscore-to-camel-case: true</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">server:</span></span>
<span class="line"><span style="color:#24292E;">  port: 8081</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">spring:</span></span>
<span class="line"><span style="color:#24292E;">  application:</span></span>
<span class="line"><span style="color:#24292E;">    name: logTest</span></span>
<span class="line"><span style="color:#24292E;">  datasource:</span></span>
<span class="line"><span style="color:#24292E;">    url: jdbc:mysql://localhost:3306/fakexist?useUnicode=true</span><span style="color:#B31D28;font-style:italic;">&amp;</span><span style="color:#24292E;">characterEncoding=utf8</span><span style="color:#B31D28;font-style:italic;">&amp;</span><span style="color:#24292E;">serverTimezone=UTC</span></span>
<span class="line"><span style="color:#24292E;">    username: root</span></span>
<span class="line"><span style="color:#24292E;">    password: 123456</span></span>
<span class="line"><span style="color:#24292E;">    driverClassName: com.mysql.cj.jdbc.Driver</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">mybatis-plus:</span></span>
<span class="line"><span style="color:#24292E;">  mapper-locations: classpath:mapper/*Mapper.xml</span></span>
<span class="line"><span style="color:#24292E;">  configuration:</span></span>
<span class="line"><span style="color:#24292E;">    log-impl: org.apache.ibatis.logging.stdout.StdOutImpl</span></span>
<span class="line"><span style="color:#24292E;">    map-underscore-to-camel-case: true</span></span></code></pre></div><ul><li>controller开启缓存</li></ul><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> org.springframework.boot.SpringApplication;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> org.springframework.boot.autoconfigure.SpringBootApplication;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> org.springframework.cache.annotation.EnableCaching;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">@</span><span style="color:#F97583;">SpringBootApplication</span></span>
<span class="line"><span style="color:#E1E4E8;">@</span><span style="color:#F97583;">EnableCaching</span></span>
<span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">DemoApplication</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">static</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">main</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">String</span><span style="color:#E1E4E8;">[] </span><span style="color:#FFAB70;">args</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        SpringApplication.</span><span style="color:#B392F0;">run</span><span style="color:#E1E4E8;">(DemoApplication.class, args);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> org.springframework.boot.SpringApplication;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> org.springframework.boot.autoconfigure.SpringBootApplication;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> org.springframework.cache.annotation.EnableCaching;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">@</span><span style="color:#D73A49;">SpringBootApplication</span></span>
<span class="line"><span style="color:#24292E;">@</span><span style="color:#D73A49;">EnableCaching</span></span>
<span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">DemoApplication</span><span style="color:#24292E;"> {</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">static</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">main</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">String</span><span style="color:#24292E;">[] </span><span style="color:#E36209;">args</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        SpringApplication.</span><span style="color:#6F42C1;">run</span><span style="color:#24292E;">(DemoApplication.class, args);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><ul><li>创建xml配置文件 ehcache.xml</li></ul><div class="language-xml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">xml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">&lt;?</span><span style="color:#85E89D;">xml</span><span style="color:#B392F0;"> version</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;1.0&quot;</span><span style="color:#B392F0;"> encoding</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;UTF-8&quot;</span><span style="color:#E1E4E8;">?&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">ehcache</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">xmlns:xsi</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;http://www.w3.org/2001/XMLSchema-instance&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">         </span><span style="color:#B392F0;">xsi:noNamespaceSchemaLocation</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;http://ehcache.org/ehcache.xsd&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">         </span><span style="color:#B392F0;">updateCheck</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;false&quot;</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">&lt;!--    eternal=&quot;false&quot;：指定缓存项是否有过期时间。如果设置为true，则缓存项将永不过期；如果设置为false，则缓存项将根据timeToIdleSeconds和timeToLiveSeconds属性进行过期。--&gt;</span></span>
<span class="line"><span style="color:#6A737D;">&lt;!--    maxElementsInMemory=&quot;1000&quot;：指定内存中最大的缓存项数量。当达到这个数量时，根据memoryStoreEvictionPolicy属性定义的策略，可能会从缓存中移除一些项以腾出空间。--&gt;</span></span>
<span class="line"><span style="color:#6A737D;">&lt;!--    overflowToDisk=&quot;false&quot;：指定当缓存项数量达到maxElementsInMemory时，是否将溢出的项存储到磁盘上。如果设置为true，则溢出的项将存储到磁盘上，否则将不会存储到磁盘。--&gt;</span></span>
<span class="line"><span style="color:#6A737D;">&lt;!--    diskPersistent=&quot;false&quot;：指定磁盘上的缓存是否是持久化的。如果设置为true，则缓存将在重启后仍然可用；如果设置为false，则缓存将在重启后被清除。--&gt;</span></span>
<span class="line"><span style="color:#6A737D;">&lt;!--    timeToIdleSeconds=&quot;300&quot;：指定缓存项在最后一次访问后的空闲时间，以秒为单位。如果缓存项在指定的时间内没有被访问，它将被视为过期并可能被清除。--&gt;</span></span>
<span class="line"><span style="color:#6A737D;">&lt;!--    timeToLiveSeconds=&quot;0&quot;：指定缓存项的生存时间，以秒为单位。如果设置为0，则缓存项将不会过期，除非被显式地移除。--&gt;</span></span>
<span class="line"><span style="color:#6A737D;">&lt;!--    memoryStoreEvictionPolicy=&quot;LRU&quot;：指定内存中的缓存项溢出策略。在达到maxElementsInMemory时，根据此策略决定哪些项将被移除。LRU表示最近最少使用的项将被优先移除。--&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">defaultCache</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#B392F0;">eternal</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;false&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#B392F0;">maxElementsInMemory</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;1000&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#B392F0;">overflowToDisk</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;false&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#B392F0;">diskPersistent</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;false&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#B392F0;">timeToIdleSeconds</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;10&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#B392F0;">timeToLiveSeconds</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;0&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#B392F0;">memoryStoreEvictionPolicy</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;LRU&quot;</span><span style="color:#E1E4E8;"> /&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">cache</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#B392F0;">name</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;local&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#B392F0;">eternal</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;false&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#B392F0;">maxElementsInMemory</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;1000&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#B392F0;">overflowToDisk</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;false&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#B392F0;">diskPersistent</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;false&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#B392F0;">timeToIdleSeconds</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;10&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#B392F0;">timeToLiveSeconds</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;4&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#B392F0;">memoryStoreEvictionPolicy</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;LRU&quot;</span><span style="color:#E1E4E8;"> /&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">ehcache</span><span style="color:#E1E4E8;">&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">&lt;?</span><span style="color:#22863A;">xml</span><span style="color:#6F42C1;"> version</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;1.0&quot;</span><span style="color:#6F42C1;"> encoding</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;UTF-8&quot;</span><span style="color:#24292E;">?&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">ehcache</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">xmlns:xsi</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;http://www.w3.org/2001/XMLSchema-instance&quot;</span></span>
<span class="line"><span style="color:#24292E;">         </span><span style="color:#6F42C1;">xsi:noNamespaceSchemaLocation</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;http://ehcache.org/ehcache.xsd&quot;</span></span>
<span class="line"><span style="color:#24292E;">         </span><span style="color:#6F42C1;">updateCheck</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;false&quot;</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">&lt;!--    eternal=&quot;false&quot;：指定缓存项是否有过期时间。如果设置为true，则缓存项将永不过期；如果设置为false，则缓存项将根据timeToIdleSeconds和timeToLiveSeconds属性进行过期。--&gt;</span></span>
<span class="line"><span style="color:#6A737D;">&lt;!--    maxElementsInMemory=&quot;1000&quot;：指定内存中最大的缓存项数量。当达到这个数量时，根据memoryStoreEvictionPolicy属性定义的策略，可能会从缓存中移除一些项以腾出空间。--&gt;</span></span>
<span class="line"><span style="color:#6A737D;">&lt;!--    overflowToDisk=&quot;false&quot;：指定当缓存项数量达到maxElementsInMemory时，是否将溢出的项存储到磁盘上。如果设置为true，则溢出的项将存储到磁盘上，否则将不会存储到磁盘。--&gt;</span></span>
<span class="line"><span style="color:#6A737D;">&lt;!--    diskPersistent=&quot;false&quot;：指定磁盘上的缓存是否是持久化的。如果设置为true，则缓存将在重启后仍然可用；如果设置为false，则缓存将在重启后被清除。--&gt;</span></span>
<span class="line"><span style="color:#6A737D;">&lt;!--    timeToIdleSeconds=&quot;300&quot;：指定缓存项在最后一次访问后的空闲时间，以秒为单位。如果缓存项在指定的时间内没有被访问，它将被视为过期并可能被清除。--&gt;</span></span>
<span class="line"><span style="color:#6A737D;">&lt;!--    timeToLiveSeconds=&quot;0&quot;：指定缓存项的生存时间，以秒为单位。如果设置为0，则缓存项将不会过期，除非被显式地移除。--&gt;</span></span>
<span class="line"><span style="color:#6A737D;">&lt;!--    memoryStoreEvictionPolicy=&quot;LRU&quot;：指定内存中的缓存项溢出策略。在达到maxElementsInMemory时，根据此策略决定哪些项将被移除。LRU表示最近最少使用的项将被优先移除。--&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">defaultCache</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6F42C1;">eternal</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;false&quot;</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6F42C1;">maxElementsInMemory</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;1000&quot;</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6F42C1;">overflowToDisk</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;false&quot;</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6F42C1;">diskPersistent</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;false&quot;</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6F42C1;">timeToIdleSeconds</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;10&quot;</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6F42C1;">timeToLiveSeconds</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;0&quot;</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6F42C1;">memoryStoreEvictionPolicy</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;LRU&quot;</span><span style="color:#24292E;"> /&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">cache</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6F42C1;">name</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;local&quot;</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6F42C1;">eternal</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;false&quot;</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6F42C1;">maxElementsInMemory</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;1000&quot;</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6F42C1;">overflowToDisk</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;false&quot;</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6F42C1;">diskPersistent</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;false&quot;</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6F42C1;">timeToIdleSeconds</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;10&quot;</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6F42C1;">timeToLiveSeconds</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;4&quot;</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6F42C1;">memoryStoreEvictionPolicy</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;LRU&quot;</span><span style="color:#24292E;"> /&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">ehcache</span><span style="color:#24292E;">&gt;</span></span></code></pre></div><ul><li>创建缓存的存和取</li></ul><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> com.simplemw.model.entity.Demo;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> org.springframework.cache.annotation.CachePut;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> org.springframework.cache.annotation.Cacheable;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">interface</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">DemoCacheService</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">static</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">final</span><span style="color:#E1E4E8;"> String CACHE_NAME </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;local&quot;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">//key可以自定义</span></span>
<span class="line"><span style="color:#E1E4E8;">    @</span><span style="color:#F97583;">CachePut</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">value</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> CACHE_NAME, </span><span style="color:#79B8FF;">key</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;&#39;demo_&#39;+#demo.getId()&quot;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">    Demo </span><span style="color:#B392F0;">saveDemo</span><span style="color:#E1E4E8;">(Demo </span><span style="color:#FFAB70;">demo</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    @</span><span style="color:#F97583;">Cacheable</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">value</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> CACHE_NAME, </span><span style="color:#79B8FF;">key</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;&#39;demo_&#39;+#id&quot;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">    Demo </span><span style="color:#B392F0;">getDemo</span><span style="color:#E1E4E8;">(Long </span><span style="color:#FFAB70;">id</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> com.simplemw.model.entity.Demo;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> org.springframework.cache.annotation.CachePut;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> org.springframework.cache.annotation.Cacheable;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">interface</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">DemoCacheService</span><span style="color:#24292E;"> {</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">static</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">final</span><span style="color:#24292E;"> String CACHE_NAME </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;local&quot;</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">//key可以自定义</span></span>
<span class="line"><span style="color:#24292E;">    @</span><span style="color:#D73A49;">CachePut</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">value</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> CACHE_NAME, </span><span style="color:#005CC5;">key</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;&#39;demo_&#39;+#demo.getId()&quot;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">    Demo </span><span style="color:#6F42C1;">saveDemo</span><span style="color:#24292E;">(Demo </span><span style="color:#E36209;">demo</span><span style="color:#24292E;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    @</span><span style="color:#D73A49;">Cacheable</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">value</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> CACHE_NAME, </span><span style="color:#005CC5;">key</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;&#39;demo_&#39;+#id&quot;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">    Demo </span><span style="color:#6F42C1;">getDemo</span><span style="color:#24292E;">(Long </span><span style="color:#E36209;">id</span><span style="color:#24292E;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> com.simplemw.cache.DemoCacheService;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> com.simplemw.dao.DemoMapper;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> com.simplemw.model.entity.Demo;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> lombok.extern.slf4j.Slf4j;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> org.springframework.beans.factory.annotation.Autowired;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> org.springframework.stereotype.Service;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> java.util.List;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">@</span><span style="color:#F97583;">Service</span></span>
<span class="line"><span style="color:#E1E4E8;">@</span><span style="color:#F97583;">Slf4j</span></span>
<span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">DemoCacheCacheServiceImpl</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">implements</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">DemoCacheService</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    @</span><span style="color:#F97583;">Autowired</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">private</span><span style="color:#E1E4E8;"> DemoMapper demoMapper;</span></span>
<span class="line"><span style="color:#E1E4E8;">    @</span><span style="color:#F97583;">Override</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> Demo </span><span style="color:#B392F0;">saveDemo</span><span style="color:#E1E4E8;">(Demo </span><span style="color:#FFAB70;">demo</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> demo;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    @</span><span style="color:#F97583;">Override</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> Demo </span><span style="color:#B392F0;">getDemo</span><span style="color:#E1E4E8;">(Long </span><span style="color:#FFAB70;">id</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        System.out.</span><span style="color:#B392F0;">println</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;这是查询了数据库&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">        QueryWrapper&lt;</span><span style="color:#F97583;">Demo</span><span style="color:#E1E4E8;">&gt; queryWrapper </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> QueryWrapper&lt;&gt;();</span></span>
<span class="line"><span style="color:#E1E4E8;">        queryWrapper.</span><span style="color:#B392F0;">eq</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;id&quot;</span><span style="color:#E1E4E8;">,id);</span></span>
<span class="line"><span style="color:#E1E4E8;">        List&lt;</span><span style="color:#F97583;">Demo</span><span style="color:#E1E4E8;">&gt; demos </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> demoMapper.</span><span style="color:#B392F0;">selectList</span><span style="color:#E1E4E8;">(queryWrapper);</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> demos.</span><span style="color:#B392F0;">stream</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#E1E4E8;">                .</span><span style="color:#B392F0;">findFirst</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#E1E4E8;">                .</span><span style="color:#B392F0;">orElse</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> com.simplemw.cache.DemoCacheService;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> com.simplemw.dao.DemoMapper;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> com.simplemw.model.entity.Demo;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> lombok.extern.slf4j.Slf4j;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> org.springframework.beans.factory.annotation.Autowired;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> org.springframework.stereotype.Service;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> java.util.List;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">@</span><span style="color:#D73A49;">Service</span></span>
<span class="line"><span style="color:#24292E;">@</span><span style="color:#D73A49;">Slf4j</span></span>
<span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">DemoCacheCacheServiceImpl</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">implements</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">DemoCacheService</span><span style="color:#24292E;"> {</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    @</span><span style="color:#D73A49;">Autowired</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">private</span><span style="color:#24292E;"> DemoMapper demoMapper;</span></span>
<span class="line"><span style="color:#24292E;">    @</span><span style="color:#D73A49;">Override</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> Demo </span><span style="color:#6F42C1;">saveDemo</span><span style="color:#24292E;">(Demo </span><span style="color:#E36209;">demo</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> demo;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    @</span><span style="color:#D73A49;">Override</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> Demo </span><span style="color:#6F42C1;">getDemo</span><span style="color:#24292E;">(Long </span><span style="color:#E36209;">id</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;这是查询了数据库&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">        QueryWrapper&lt;</span><span style="color:#D73A49;">Demo</span><span style="color:#24292E;">&gt; queryWrapper </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> QueryWrapper&lt;&gt;();</span></span>
<span class="line"><span style="color:#24292E;">        queryWrapper.</span><span style="color:#6F42C1;">eq</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;id&quot;</span><span style="color:#24292E;">,id);</span></span>
<span class="line"><span style="color:#24292E;">        List&lt;</span><span style="color:#D73A49;">Demo</span><span style="color:#24292E;">&gt; demos </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> demoMapper.</span><span style="color:#6F42C1;">selectList</span><span style="color:#24292E;">(queryWrapper);</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> demos.</span><span style="color:#6F42C1;">stream</span><span style="color:#24292E;">()</span></span>
<span class="line"><span style="color:#24292E;">                .</span><span style="color:#6F42C1;">findFirst</span><span style="color:#24292E;">()</span></span>
<span class="line"><span style="color:#24292E;">                .</span><span style="color:#6F42C1;">orElse</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">null</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><ul><li>测试</li></ul><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">@</span><span style="color:#F97583;">RestController</span></span>
<span class="line"><span style="color:#E1E4E8;">@</span><span style="color:#F97583;">RequestMapping</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">value</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;demoTest&quot;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">DemoController</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    @</span><span style="color:#F97583;">Autowired</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">private</span><span style="color:#E1E4E8;"> DemoService demoService;</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    @</span><span style="color:#F97583;">ApiOperation</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;测试保存缓存&quot;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">    @</span><span style="color:#F97583;">GetMapping</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;saveDemo&quot;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> Demo </span><span style="color:#B392F0;">saveDemo</span><span style="color:#E1E4E8;">(){</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> demoService.</span><span style="color:#B392F0;">saveDemo</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    @</span><span style="color:#F97583;">ApiOperation</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;测试获取缓存&quot;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">    @</span><span style="color:#F97583;">GetMapping</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;getDemo&quot;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> Demo </span><span style="color:#B392F0;">getDemo</span><span style="color:#E1E4E8;">(@</span><span style="color:#F97583;">RequestParam</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;id&quot;</span><span style="color:#E1E4E8;">) Long </span><span style="color:#FFAB70;">id</span><span style="color:#E1E4E8;">){</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> demoService.</span><span style="color:#B392F0;">getDemo</span><span style="color:#E1E4E8;">(id);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">@</span><span style="color:#D73A49;">RestController</span></span>
<span class="line"><span style="color:#24292E;">@</span><span style="color:#D73A49;">RequestMapping</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">value</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;demoTest&quot;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">DemoController</span><span style="color:#24292E;"> {</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    @</span><span style="color:#D73A49;">Autowired</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">private</span><span style="color:#24292E;"> DemoService demoService;</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    @</span><span style="color:#D73A49;">ApiOperation</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;测试保存缓存&quot;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">    @</span><span style="color:#D73A49;">GetMapping</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;saveDemo&quot;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> Demo </span><span style="color:#6F42C1;">saveDemo</span><span style="color:#24292E;">(){</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> demoService.</span><span style="color:#6F42C1;">saveDemo</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    @</span><span style="color:#D73A49;">ApiOperation</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;测试获取缓存&quot;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">    @</span><span style="color:#D73A49;">GetMapping</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;getDemo&quot;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> Demo </span><span style="color:#6F42C1;">getDemo</span><span style="color:#24292E;">(@</span><span style="color:#D73A49;">RequestParam</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;id&quot;</span><span style="color:#24292E;">) Long </span><span style="color:#E36209;">id</span><span style="color:#24292E;">){</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> demoService.</span><span style="color:#6F42C1;">getDemo</span><span style="color:#24292E;">(id);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> com.simplemw.cache.DemoCacheService;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> com.simplemw.model.entity.Demo;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> org.springframework.beans.factory.annotation.Autowired;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> org.springframework.stereotype.Service;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> java.util.Date;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">@</span><span style="color:#F97583;">Service</span></span>
<span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">DemoService</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    @</span><span style="color:#F97583;">Autowired</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">private</span><span style="color:#E1E4E8;"> DemoCacheService demoCacheService;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> Demo </span><span style="color:#B392F0;">saveDemo</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">//保存到cache中</span></span>
<span class="line"><span style="color:#E1E4E8;">        Demo demo </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Demo</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">        demo.</span><span style="color:#B392F0;">setId</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">1L</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">        demo.</span><span style="color:#B392F0;">setName</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;ces&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">        demo.</span><span style="color:#B392F0;">setMessage</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;message&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">        demo.</span><span style="color:#B392F0;">setCreateDt</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Date</span><span style="color:#E1E4E8;">());</span></span>
<span class="line"><span style="color:#E1E4E8;">        demoCacheService.</span><span style="color:#B392F0;">saveDemo</span><span style="color:#E1E4E8;">(demo);</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> demo;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> Demo </span><span style="color:#B392F0;">getDemo</span><span style="color:#E1E4E8;">(Long </span><span style="color:#FFAB70;">id</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> demoCacheService.</span><span style="color:#B392F0;">getDemo</span><span style="color:#E1E4E8;">(id);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> com.simplemw.cache.DemoCacheService;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> com.simplemw.model.entity.Demo;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> org.springframework.beans.factory.annotation.Autowired;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> org.springframework.stereotype.Service;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> java.util.Date;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">@</span><span style="color:#D73A49;">Service</span></span>
<span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">DemoService</span><span style="color:#24292E;"> {</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    @</span><span style="color:#D73A49;">Autowired</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">private</span><span style="color:#24292E;"> DemoCacheService demoCacheService;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> Demo </span><span style="color:#6F42C1;">saveDemo</span><span style="color:#24292E;">() {</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">//保存到cache中</span></span>
<span class="line"><span style="color:#24292E;">        Demo demo </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Demo</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">        demo.</span><span style="color:#6F42C1;">setId</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">1L</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">        demo.</span><span style="color:#6F42C1;">setName</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;ces&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">        demo.</span><span style="color:#6F42C1;">setMessage</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;message&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">        demo.</span><span style="color:#6F42C1;">setCreateDt</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Date</span><span style="color:#24292E;">());</span></span>
<span class="line"><span style="color:#24292E;">        demoCacheService.</span><span style="color:#6F42C1;">saveDemo</span><span style="color:#24292E;">(demo);</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> demo;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> Demo </span><span style="color:#6F42C1;">getDemo</span><span style="color:#24292E;">(Long </span><span style="color:#E36209;">id</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> demoCacheService.</span><span style="color:#6F42C1;">getDemo</span><span style="color:#24292E;">(id);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div>`,18),e=[o];function t(c,r,E,y,i,m){return n(),a("div",null,e)}const F=s(p,[["render",t]]);export{d as __pageData,F as default};

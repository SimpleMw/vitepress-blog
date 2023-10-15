import{_ as s,o as n,c as a,Q as l}from"./chunks/framework.8153c8a6.js";const d=JSON.parse('{"title":"整合sentinel","description":"","frontmatter":{"title":"整合sentinel","date":"2021-08-03T18:12:13.000Z"},"headers":[],"relativePath":"guide/springcloud/Spring Cloud Alibaba/Sentinel.md","filePath":"guide/springcloud/Spring Cloud Alibaba/Sentinel.md"}'),p={name:"guide/springcloud/Spring Cloud Alibaba/Sentinel.md"},o=l(`<p>sentinel用于对请求的流量控制，熔断降级的管控</p><p>实现原理：通过拦截器对配置了限流规则的接口或者代码块进行限流和熔断降级处理</p><h4 id="代码整合" tabindex="-1">代码整合 <a class="header-anchor" href="#代码整合" aria-label="Permalink to &quot;代码整合&quot;">​</a></h4><p>流程原理：目的微服务暴露8719端口，控制台可根据8719的接口获取埋点的信息(若该端口被已经被占用，则会开启8719自增未被占用的端口)，控制台设置规则并将规则发送到目的微服务，目的微服务在进行每次访问的时候被其拦截器拦截，根据规则来流量控制</p><h5 id="开启控制台" tabindex="-1">开启控制台 <a class="header-anchor" href="#开启控制台" aria-label="Permalink to &quot;开启控制台&quot;">​</a></h5><p>控制台用于获取要控制的微服务的埋点，以及给每个埋点设置规则</p><ul><li><p>官网下载sentinel代码或者直接<a href="https://github.com/alibaba/Sentinel" target="_blank" rel="noreferrer">下载</a>dashbord的jar包</p><p>启动dashbord</p></li><li><p>默认端口为8080</p></li></ul><h5 id="整合sentinel" tabindex="-1">整合sentinel <a class="header-anchor" href="#整合sentinel" aria-label="Permalink to &quot;整合sentinel&quot;">​</a></h5><h6 id="依赖" tabindex="-1">依赖 <a class="header-anchor" href="#依赖" aria-label="Permalink to &quot;依赖&quot;">​</a></h6><div class="language-XML vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">XML</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">dependency</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">groupId</span><span style="color:#E1E4E8;">&gt;com.alibaba.cloud&lt;/</span><span style="color:#85E89D;">groupId</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">artifactId</span><span style="color:#E1E4E8;">&gt;spring-cloud-starter-alibaba-sentinel&lt;/</span><span style="color:#85E89D;">artifactId</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">version</span><span style="color:#E1E4E8;">&gt;2.1.2.RELEASE&lt;/</span><span style="color:#85E89D;">version</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">dependency</span><span style="color:#E1E4E8;">&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">dependency</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">groupId</span><span style="color:#24292E;">&gt;com.alibaba.cloud&lt;/</span><span style="color:#22863A;">groupId</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">artifactId</span><span style="color:#24292E;">&gt;spring-cloud-starter-alibaba-sentinel&lt;/</span><span style="color:#22863A;">artifactId</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">version</span><span style="color:#24292E;">&gt;2.1.2.RELEASE&lt;/</span><span style="color:#22863A;">version</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">dependency</span><span style="color:#24292E;">&gt;</span></span></code></pre></div><h6 id="xml配置" tabindex="-1">xml配置 <a class="header-anchor" href="#xml配置" aria-label="Permalink to &quot;xml配置&quot;">​</a></h6><div class="language-XML vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">XML</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">spring:</span></span>
<span class="line"><span style="color:#E1E4E8;">  application:</span></span>
<span class="line"><span style="color:#E1E4E8;">    name: sentinel</span></span>
<span class="line"><span style="color:#E1E4E8;">  cloud:</span></span>
<span class="line"><span style="color:#E1E4E8;">    sentinel:</span></span>
<span class="line"><span style="color:#E1E4E8;">      transport:</span></span>
<span class="line"><span style="color:#E1E4E8;">        #配置sentinel控制台的ip和端口</span></span>
<span class="line"><span style="color:#E1E4E8;">        dashboard: localhost:8080</span></span>
<span class="line"><span style="color:#E1E4E8;">        heartbeat-interval-ms: 500</span></span>
<span class="line"><span style="color:#E1E4E8;">      #懒加载标志 默认是false</span></span>
<span class="line"><span style="color:#E1E4E8;">      eager: true</span></span>
<span class="line"><span style="color:#E1E4E8;">      filter:</span></span>
<span class="line"><span style="color:#E1E4E8;">        #配置是否对controller进行默认控制，默认是true</span></span>
<span class="line"><span style="color:#E1E4E8;">        enabled: true</span></span>
<span class="line"><span style="color:#E1E4E8;">feign:</span></span>
<span class="line"><span style="color:#E1E4E8;">  sentinel:</span></span>
<span class="line"><span style="color:#E1E4E8;">    #feign开启sentinel限流，默认为false，且只需在FeignClient注解中配置属性 fallback就行</span></span>
<span class="line"><span style="color:#E1E4E8;">    enabled: true</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">spring:</span></span>
<span class="line"><span style="color:#24292E;">  application:</span></span>
<span class="line"><span style="color:#24292E;">    name: sentinel</span></span>
<span class="line"><span style="color:#24292E;">  cloud:</span></span>
<span class="line"><span style="color:#24292E;">    sentinel:</span></span>
<span class="line"><span style="color:#24292E;">      transport:</span></span>
<span class="line"><span style="color:#24292E;">        #配置sentinel控制台的ip和端口</span></span>
<span class="line"><span style="color:#24292E;">        dashboard: localhost:8080</span></span>
<span class="line"><span style="color:#24292E;">        heartbeat-interval-ms: 500</span></span>
<span class="line"><span style="color:#24292E;">      #懒加载标志 默认是false</span></span>
<span class="line"><span style="color:#24292E;">      eager: true</span></span>
<span class="line"><span style="color:#24292E;">      filter:</span></span>
<span class="line"><span style="color:#24292E;">        #配置是否对controller进行默认控制，默认是true</span></span>
<span class="line"><span style="color:#24292E;">        enabled: true</span></span>
<span class="line"><span style="color:#24292E;">feign:</span></span>
<span class="line"><span style="color:#24292E;">  sentinel:</span></span>
<span class="line"><span style="color:#24292E;">    #feign开启sentinel限流，默认为false，且只需在FeignClient注解中配置属性 fallback就行</span></span>
<span class="line"><span style="color:#24292E;">    enabled: true</span></span></code></pre></div><h6 id="自定义配置类" tabindex="-1">自定义配置类 <a class="header-anchor" href="#自定义配置类" aria-label="Permalink to &quot;自定义配置类&quot;">​</a></h6><ul><li>配置超出规则后的默认返回</li></ul><div class="language-JAVA vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">JAVA</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> com.alibaba.csp.sentinel.adapter.spring.webmvc.callback.BlockExceptionHandler;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> com.alibaba.csp.sentinel.slots.block.BlockException;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> com.alibaba.fastjson.JSON;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> org.springframework.stereotype.Component;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> javax.servlet.http.HttpServletRequest;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> javax.servlet.http.HttpServletResponse;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> java.io.PrintWriter;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> java.util.HashMap;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> java.util.Map;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * 自定义sentinel拦截返回</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#E1E4E8;">@</span><span style="color:#F97583;">Component</span></span>
<span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">SentinelExceptionHandler</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">implements</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">BlockExceptionHandler</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">handle</span><span style="color:#E1E4E8;">(HttpServletRequest </span><span style="color:#FFAB70;">httpServletRequest</span><span style="color:#E1E4E8;">, HttpServletResponse </span><span style="color:#FFAB70;">httpServletResponse</span><span style="color:#E1E4E8;">, BlockException </span><span style="color:#FFAB70;">e</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">throws</span><span style="color:#E1E4E8;"> Exception {</span></span>
<span class="line"><span style="color:#E1E4E8;">        Map&lt;</span><span style="color:#F97583;">String</span><span style="color:#E1E4E8;">,</span><span style="color:#F97583;">Object</span><span style="color:#E1E4E8;">&gt; map </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> HashMap&lt;</span><span style="color:#F97583;">String</span><span style="color:#E1E4E8;">, </span><span style="color:#F97583;">Object</span><span style="color:#E1E4E8;">&gt;();</span></span>
<span class="line"><span style="color:#E1E4E8;">        map.</span><span style="color:#B392F0;">put</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;code&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">500</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">        map.</span><span style="color:#B392F0;">put</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;mesg&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&quot;流量控制，请求失败&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">        map.</span><span style="color:#B392F0;">put</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;data&quot;</span><span style="color:#E1E4E8;">,</span><span style="color:#9ECBFF;">&quot;&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">        String jsonString </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> JSON.</span><span style="color:#B392F0;">toJSONString</span><span style="color:#E1E4E8;">(map);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">        httpServletResponse.</span><span style="color:#B392F0;">setStatus</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">500</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">        httpServletResponse.</span><span style="color:#B392F0;">setCharacterEncoding</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;utf-8&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">        httpServletResponse.</span><span style="color:#B392F0;">setContentType</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;text/html;charset=utf-8&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">        PrintWriter out </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> httpServletResponse.</span><span style="color:#B392F0;">getWriter</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">        out.</span><span style="color:#B392F0;">print</span><span style="color:#E1E4E8;">(jsonString);</span></span>
<span class="line"><span style="color:#E1E4E8;">        out.</span><span style="color:#B392F0;">flush</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">        out.</span><span style="color:#B392F0;">close</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> com.alibaba.csp.sentinel.adapter.spring.webmvc.callback.BlockExceptionHandler;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> com.alibaba.csp.sentinel.slots.block.BlockException;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> com.alibaba.fastjson.JSON;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> org.springframework.stereotype.Component;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> javax.servlet.http.HttpServletRequest;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> javax.servlet.http.HttpServletResponse;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> java.io.PrintWriter;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> java.util.HashMap;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> java.util.Map;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * 自定义sentinel拦截返回</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#24292E;">@</span><span style="color:#D73A49;">Component</span></span>
<span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">SentinelExceptionHandler</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">implements</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">BlockExceptionHandler</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">handle</span><span style="color:#24292E;">(HttpServletRequest </span><span style="color:#E36209;">httpServletRequest</span><span style="color:#24292E;">, HttpServletResponse </span><span style="color:#E36209;">httpServletResponse</span><span style="color:#24292E;">, BlockException </span><span style="color:#E36209;">e</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">throws</span><span style="color:#24292E;"> Exception {</span></span>
<span class="line"><span style="color:#24292E;">        Map&lt;</span><span style="color:#D73A49;">String</span><span style="color:#24292E;">,</span><span style="color:#D73A49;">Object</span><span style="color:#24292E;">&gt; map </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> HashMap&lt;</span><span style="color:#D73A49;">String</span><span style="color:#24292E;">, </span><span style="color:#D73A49;">Object</span><span style="color:#24292E;">&gt;();</span></span>
<span class="line"><span style="color:#24292E;">        map.</span><span style="color:#6F42C1;">put</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;code&quot;</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">500</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">        map.</span><span style="color:#6F42C1;">put</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;mesg&quot;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&quot;流量控制，请求失败&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">        map.</span><span style="color:#6F42C1;">put</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;data&quot;</span><span style="color:#24292E;">,</span><span style="color:#032F62;">&quot;&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">        String jsonString </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> JSON.</span><span style="color:#6F42C1;">toJSONString</span><span style="color:#24292E;">(map);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">        httpServletResponse.</span><span style="color:#6F42C1;">setStatus</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">500</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">        httpServletResponse.</span><span style="color:#6F42C1;">setCharacterEncoding</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;utf-8&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">        httpServletResponse.</span><span style="color:#6F42C1;">setContentType</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;text/html;charset=utf-8&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">        PrintWriter out </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> httpServletResponse.</span><span style="color:#6F42C1;">getWriter</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">        out.</span><span style="color:#6F42C1;">print</span><span style="color:#24292E;">(jsonString);</span></span>
<span class="line"><span style="color:#24292E;">        out.</span><span style="color:#6F42C1;">flush</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">        out.</span><span style="color:#6F42C1;">close</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><ul><li>配置权限控制的校验</li></ul><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> com.alibaba.csp.sentinel.adapter.spring.webmvc.callback.RequestOriginParser;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> org.springframework.stereotype.Component;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> javax.servlet.http.HttpServletRequest;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * 自定义Sentinel授权规则，可根据请求信息，做一个判断，返回审核结果</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#E1E4E8;">@</span><span style="color:#F97583;">Component</span></span>
<span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">SentinelRequestOriginParser</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">implements</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">RequestOriginParser</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">//配置授权规则可根据返回的信息进行控制</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> String </span><span style="color:#B392F0;">parseOrigin</span><span style="color:#E1E4E8;">(HttpServletRequest </span><span style="color:#FFAB70;">httpServletRequest</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">//如：可以获取头部信息中的token去限制访问</span></span>
<span class="line"><span style="color:#E1E4E8;">        String token </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> httpServletRequest.</span><span style="color:#B392F0;">getHeader</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;token&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">//如：判断token</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">//如：返回的String为调用方，在dashbord中授权规则配置中是根据返回的调用方去设置黑白名单</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;stopUser&quot;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> com.alibaba.csp.sentinel.adapter.spring.webmvc.callback.RequestOriginParser;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> org.springframework.stereotype.Component;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> javax.servlet.http.HttpServletRequest;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * 自定义Sentinel授权规则，可根据请求信息，做一个判断，返回审核结果</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#24292E;">@</span><span style="color:#D73A49;">Component</span></span>
<span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">SentinelRequestOriginParser</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">implements</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">RequestOriginParser</span><span style="color:#24292E;"> {</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">//配置授权规则可根据返回的信息进行控制</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> String </span><span style="color:#6F42C1;">parseOrigin</span><span style="color:#24292E;">(HttpServletRequest </span><span style="color:#E36209;">httpServletRequest</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">//如：可以获取头部信息中的token去限制访问</span></span>
<span class="line"><span style="color:#24292E;">        String token </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> httpServletRequest.</span><span style="color:#6F42C1;">getHeader</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;token&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">//如：判断token</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">//如：返回的String为调用方，在dashbord中授权规则配置中是根据返回的调用方去设置黑白名单</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;stopUser&quot;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h6 id="controller" tabindex="-1">controller <a class="header-anchor" href="#controller" aria-label="Permalink to &quot;controller&quot;">​</a></h6><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> com.alibaba.csp.sentinel.Entry;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> com.alibaba.csp.sentinel.SphU;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> com.alibaba.csp.sentinel.Tracer;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> com.alibaba.csp.sentinel.annotation.SentinelResource;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> com.alibaba.csp.sentinel.context.ContextUtil;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> com.alibaba.csp.sentinel.slots.block.BlockException;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> org.springframework.web.bind.annotation.GetMapping;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> org.springframework.web.bind.annotation.RequestMapping;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> org.springframework.web.bind.annotation.RestController;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> java.util.Date;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">@</span><span style="color:#F97583;">RestController</span></span>
<span class="line"><span style="color:#E1E4E8;">@</span><span style="color:#F97583;">RequestMapping</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;/ces&quot;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">DemoController</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">    /**</span></span>
<span class="line"><span style="color:#6A737D;">     * SentinelResource 注解是用于热点流控的埋点</span></span>
<span class="line"><span style="color:#6A737D;">     * fallback和fallbackClass指定自定义的返回的类的方法，注：该方法要为static</span></span>
<span class="line"><span style="color:#6A737D;">     * blockHandler和blockHandlerClass指定自定义的返回的类的方法</span></span>
<span class="line"><span style="color:#6A737D;">     * 两组SentinelResource的属性配置的区别是fallback是方法异常时返回，blockHandler是超出限流规则时返回</span></span>
<span class="line"><span style="color:#6A737D;">     * </span><span style="color:#F97583;">@return</span></span>
<span class="line"><span style="color:#6A737D;">     */</span></span>
<span class="line"><span style="color:#E1E4E8;">    @</span><span style="color:#F97583;">GetMapping</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;ces&quot;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">    @</span><span style="color:#F97583;">SentinelResource</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">value</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;ces&quot;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> String </span><span style="color:#B392F0;">ces</span><span style="color:#E1E4E8;">(){</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;1111&quot;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">    /**</span></span>
<span class="line"><span style="color:#6A737D;">     * 手动创建对方法或者代码块的限流控制</span></span>
<span class="line"><span style="color:#6A737D;">     * </span><span style="color:#F97583;">@return</span></span>
<span class="line"><span style="color:#6A737D;">     */</span></span>
<span class="line"><span style="color:#E1E4E8;">    @</span><span style="color:#F97583;">GetMapping</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;manual&quot;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> String </span><span style="color:#B392F0;">ManualSentinelDo</span><span style="color:#E1E4E8;">(){</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">//为了方便记录直接写在controller</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">        ContextUtil.</span><span style="color:#B392F0;">enter</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;manual&quot;</span><span style="color:#E1E4E8;">,</span><span style="color:#9ECBFF;">&quot;stopUser&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">        Entry entry </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">try</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#6A737D;">//设置规则</span></span>
<span class="line"><span style="color:#E1E4E8;">            entry </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> SphU.</span><span style="color:#B392F0;">entry</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;manual&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#6A737D;">//要做限流的代码块---------------------------start</span></span>
<span class="line"><span style="color:#E1E4E8;">            String date </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Date</span><span style="color:#E1E4E8;">().</span><span style="color:#B392F0;">toString</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> date;</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#6A737D;">//要做限流的代码块----------------------------end</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">        } </span><span style="color:#F97583;">catch</span><span style="color:#E1E4E8;"> (BlockException </span><span style="color:#FFAB70;">e</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">            e.</span><span style="color:#B392F0;">printStackTrace</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;熔断降级处理...&quot;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">        } </span><span style="color:#F97583;">catch</span><span style="color:#E1E4E8;"> (Exception </span><span style="color:#FFAB70;">e</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#6A737D;">//正常返回异常</span></span>
<span class="line"><span style="color:#E1E4E8;">            e.</span><span style="color:#B392F0;">printStackTrace</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#6A737D;">//用于sentinel统计代码块中异常次数</span></span>
<span class="line"><span style="color:#E1E4E8;">            Tracer.</span><span style="color:#B392F0;">trace</span><span style="color:#E1E4E8;">(e);</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span><span style="color:#F97583;">finally</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#6A737D;">//如果不为空则关闭</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;">(entry </span><span style="color:#F97583;">!=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;">){</span></span>
<span class="line"><span style="color:#E1E4E8;">                entry.</span><span style="color:#B392F0;">exit</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">            }</span></span>
<span class="line"><span style="color:#E1E4E8;">            ContextUtil.</span><span style="color:#B392F0;">exit</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;result&quot;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> com.alibaba.csp.sentinel.Entry;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> com.alibaba.csp.sentinel.SphU;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> com.alibaba.csp.sentinel.Tracer;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> com.alibaba.csp.sentinel.annotation.SentinelResource;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> com.alibaba.csp.sentinel.context.ContextUtil;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> com.alibaba.csp.sentinel.slots.block.BlockException;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> org.springframework.web.bind.annotation.GetMapping;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> org.springframework.web.bind.annotation.RequestMapping;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> org.springframework.web.bind.annotation.RestController;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> java.util.Date;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">@</span><span style="color:#D73A49;">RestController</span></span>
<span class="line"><span style="color:#24292E;">@</span><span style="color:#D73A49;">RequestMapping</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;/ces&quot;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">DemoController</span><span style="color:#24292E;"> {</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">    /**</span></span>
<span class="line"><span style="color:#6A737D;">     * SentinelResource 注解是用于热点流控的埋点</span></span>
<span class="line"><span style="color:#6A737D;">     * fallback和fallbackClass指定自定义的返回的类的方法，注：该方法要为static</span></span>
<span class="line"><span style="color:#6A737D;">     * blockHandler和blockHandlerClass指定自定义的返回的类的方法</span></span>
<span class="line"><span style="color:#6A737D;">     * 两组SentinelResource的属性配置的区别是fallback是方法异常时返回，blockHandler是超出限流规则时返回</span></span>
<span class="line"><span style="color:#6A737D;">     * </span><span style="color:#D73A49;">@return</span></span>
<span class="line"><span style="color:#6A737D;">     */</span></span>
<span class="line"><span style="color:#24292E;">    @</span><span style="color:#D73A49;">GetMapping</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;ces&quot;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">    @</span><span style="color:#D73A49;">SentinelResource</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">value</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;ces&quot;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> String </span><span style="color:#6F42C1;">ces</span><span style="color:#24292E;">(){</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;1111&quot;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">    /**</span></span>
<span class="line"><span style="color:#6A737D;">     * 手动创建对方法或者代码块的限流控制</span></span>
<span class="line"><span style="color:#6A737D;">     * </span><span style="color:#D73A49;">@return</span></span>
<span class="line"><span style="color:#6A737D;">     */</span></span>
<span class="line"><span style="color:#24292E;">    @</span><span style="color:#D73A49;">GetMapping</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;manual&quot;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> String </span><span style="color:#6F42C1;">ManualSentinelDo</span><span style="color:#24292E;">(){</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">//为了方便记录直接写在controller</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">        ContextUtil.</span><span style="color:#6F42C1;">enter</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;manual&quot;</span><span style="color:#24292E;">,</span><span style="color:#032F62;">&quot;stopUser&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">        Entry entry </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">null</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">try</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6A737D;">//设置规则</span></span>
<span class="line"><span style="color:#24292E;">            entry </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> SphU.</span><span style="color:#6F42C1;">entry</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;manual&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6A737D;">//要做限流的代码块---------------------------start</span></span>
<span class="line"><span style="color:#24292E;">            String date </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Date</span><span style="color:#24292E;">().</span><span style="color:#6F42C1;">toString</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> date;</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6A737D;">//要做限流的代码块----------------------------end</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">        } </span><span style="color:#D73A49;">catch</span><span style="color:#24292E;"> (BlockException </span><span style="color:#E36209;">e</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">            e.</span><span style="color:#6F42C1;">printStackTrace</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;熔断降级处理...&quot;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">        } </span><span style="color:#D73A49;">catch</span><span style="color:#24292E;"> (Exception </span><span style="color:#E36209;">e</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6A737D;">//正常返回异常</span></span>
<span class="line"><span style="color:#24292E;">            e.</span><span style="color:#6F42C1;">printStackTrace</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6A737D;">//用于sentinel统计代码块中异常次数</span></span>
<span class="line"><span style="color:#24292E;">            Tracer.</span><span style="color:#6F42C1;">trace</span><span style="color:#24292E;">(e);</span></span>
<span class="line"><span style="color:#24292E;">        }</span><span style="color:#D73A49;">finally</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6A737D;">//如果不为空则关闭</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#D73A49;">if</span><span style="color:#24292E;">(entry </span><span style="color:#D73A49;">!=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">null</span><span style="color:#24292E;">){</span></span>
<span class="line"><span style="color:#24292E;">                entry.</span><span style="color:#6F42C1;">exit</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">            }</span></span>
<span class="line"><span style="color:#24292E;">            ContextUtil.</span><span style="color:#6F42C1;">exit</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;result&quot;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h6 id="其它" tabindex="-1">其它 <a class="header-anchor" href="#其它" aria-label="Permalink to &quot;其它&quot;">​</a></h6><p>注：</p><ul><li><p>若同一个ip起两个整合了sentinel的微服务，则第一个开发8719端口，第二个开启的端口会累加</p></li><li><p>规则是在埋点的基础上进行设置的</p></li><li><p>埋点可以是controller的接口，也可以是方法，甚至可以是一段代码块</p></li></ul>`,22),e=[o];function t(c,r,E,y,i,u){return n(),a("div",null,e)}const b=s(p,[["render",t]]);export{d as __pageData,b as default};

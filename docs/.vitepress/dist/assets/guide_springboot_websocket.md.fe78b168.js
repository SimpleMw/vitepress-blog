import{_ as o,C as e,o as t,c,H as a,w as l,a as s,Q as p}from"./chunks/framework.8153c8a6.js";const b=JSON.parse('{"title":"Websocket","description":"","frontmatter":{"title":"Websocket","date":"2021-01-27T07:20:27.000Z"},"headers":[],"relativePath":"guide/springboot/websocket.md","filePath":"guide/springboot/websocket.md"}'),r={name:"guide/springboot/websocket.md"},E=p(`<p>一次握手，双向数据传输</p><p>介绍：特点是一次握手，双向数据传输</p><p>出现原因：http协议的生命周期是 客户端发送请求，服务端接收响应，缺点是服务端无法在客户端未发送请求的情况下主动发送信息，websocket就是在这种情况下产生的，在建立连接后实现双通道传输。</p><p>springboot整合websocket</p><h5 id="依赖" tabindex="-1">依赖 <a class="header-anchor" href="#依赖" aria-label="Permalink to &quot;依赖&quot;">​</a></h5><div class="language-xml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">xml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">&lt;!-- 若启动报错排除tomcat依赖试试 --&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">dependency</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">groupId</span><span style="color:#E1E4E8;">&gt;org.springframework.boot&lt;/</span><span style="color:#85E89D;">groupId</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">artifactId</span><span style="color:#E1E4E8;">&gt;spring-boot-starter-web&lt;/</span><span style="color:#85E89D;">artifactId</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">exclusions</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">        &lt;</span><span style="color:#85E89D;">exclusion</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">            &lt;</span><span style="color:#85E89D;">groupId</span><span style="color:#E1E4E8;">&gt;org.springframework.boot&lt;/</span><span style="color:#85E89D;">groupId</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">            &lt;</span><span style="color:#85E89D;">artifactId</span><span style="color:#E1E4E8;">&gt;spring-boot-starter-tomcat&lt;/</span><span style="color:#85E89D;">artifactId</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">        &lt;/</span><span style="color:#85E89D;">exclusion</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;/</span><span style="color:#85E89D;">exclusions</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">dependency</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#6A737D;">&lt;!-- websocket依赖 --&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">dependency</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">groupId</span><span style="color:#E1E4E8;">&gt;org.springframework.boot&lt;/</span><span style="color:#85E89D;">groupId</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">artifactId</span><span style="color:#E1E4E8;">&gt;spring-boot-starter-websocket&lt;/</span><span style="color:#85E89D;">artifactId</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">version</span><span style="color:#E1E4E8;">&gt;2.1.3.RELEASE&lt;/</span><span style="color:#85E89D;">version</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">dependency</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#6A737D;">&lt;!-- json转换工具 --&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">dependency</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">groupId</span><span style="color:#E1E4E8;">&gt;com.alibaba&lt;/</span><span style="color:#85E89D;">groupId</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">artifactId</span><span style="color:#E1E4E8;">&gt;fastjson&lt;/</span><span style="color:#85E89D;">artifactId</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">version</span><span style="color:#E1E4E8;">&gt;1.2.75&lt;/</span><span style="color:#85E89D;">version</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">dependency</span><span style="color:#E1E4E8;">&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">&lt;!-- 若启动报错排除tomcat依赖试试 --&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">dependency</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">groupId</span><span style="color:#24292E;">&gt;org.springframework.boot&lt;/</span><span style="color:#22863A;">groupId</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">artifactId</span><span style="color:#24292E;">&gt;spring-boot-starter-web&lt;/</span><span style="color:#22863A;">artifactId</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">exclusions</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">        &lt;</span><span style="color:#22863A;">exclusion</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">            &lt;</span><span style="color:#22863A;">groupId</span><span style="color:#24292E;">&gt;org.springframework.boot&lt;/</span><span style="color:#22863A;">groupId</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">            &lt;</span><span style="color:#22863A;">artifactId</span><span style="color:#24292E;">&gt;spring-boot-starter-tomcat&lt;/</span><span style="color:#22863A;">artifactId</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">        &lt;/</span><span style="color:#22863A;">exclusion</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;/</span><span style="color:#22863A;">exclusions</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">dependency</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#6A737D;">&lt;!-- websocket依赖 --&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">dependency</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">groupId</span><span style="color:#24292E;">&gt;org.springframework.boot&lt;/</span><span style="color:#22863A;">groupId</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">artifactId</span><span style="color:#24292E;">&gt;spring-boot-starter-websocket&lt;/</span><span style="color:#22863A;">artifactId</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">version</span><span style="color:#24292E;">&gt;2.1.3.RELEASE&lt;/</span><span style="color:#22863A;">version</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">dependency</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#6A737D;">&lt;!-- json转换工具 --&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">dependency</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">groupId</span><span style="color:#24292E;">&gt;com.alibaba&lt;/</span><span style="color:#22863A;">groupId</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">artifactId</span><span style="color:#24292E;">&gt;fastjson&lt;/</span><span style="color:#22863A;">artifactId</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">version</span><span style="color:#24292E;">&gt;1.2.75&lt;/</span><span style="color:#22863A;">version</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">dependency</span><span style="color:#24292E;">&gt;</span></span></code></pre></div><h5 id="配置类" tabindex="-1">配置类 <a class="header-anchor" href="#配置类" aria-label="Permalink to &quot;配置类&quot;">​</a></h5><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">@</span><span style="color:#F97583;">Configuration</span></span>
<span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">WebSocketConfig</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#6A737D;">    /**</span></span>
<span class="line"><span style="color:#6A737D;">     * ServerEndpointExporter 作用</span></span>
<span class="line"><span style="color:#6A737D;">     * 这个Bean会自动注册使用@ServerEndpoint注解声明的websocket endpoint</span></span>
<span class="line"><span style="color:#6A737D;">     * </span><span style="color:#F97583;">@return</span></span>
<span class="line"><span style="color:#6A737D;">     */</span></span>
<span class="line"><span style="color:#E1E4E8;">    @</span><span style="color:#F97583;">Bean</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> ServerEndpointExporter </span><span style="color:#B392F0;">serverEndpointExporter</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">ServerEndpointExporter</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">@</span><span style="color:#D73A49;">Configuration</span></span>
<span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">WebSocketConfig</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#6A737D;">    /**</span></span>
<span class="line"><span style="color:#6A737D;">     * ServerEndpointExporter 作用</span></span>
<span class="line"><span style="color:#6A737D;">     * 这个Bean会自动注册使用@ServerEndpoint注解声明的websocket endpoint</span></span>
<span class="line"><span style="color:#6A737D;">     * </span><span style="color:#D73A49;">@return</span></span>
<span class="line"><span style="color:#6A737D;">     */</span></span>
<span class="line"><span style="color:#24292E;">    @</span><span style="color:#D73A49;">Bean</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> ServerEndpointExporter </span><span style="color:#6F42C1;">serverEndpointExporter</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">ServerEndpointExporter</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h5 id="实现类" tabindex="-1">实现类 <a class="header-anchor" href="#实现类" aria-label="Permalink to &quot;实现类&quot;">​</a></h5><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">@</span><span style="color:#F97583;">ServerEndpoint</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">value</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;/connect&quot;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">@</span><span style="color:#F97583;">Component</span></span>
<span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">WebSocketServer</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">private</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">static</span><span style="color:#E1E4E8;"> Logger log </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> LoggerFactory.</span><span style="color:#B392F0;">getLogger</span><span style="color:#E1E4E8;">(WebSocketServer.class);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">//静态变量，用来记录当前在线连接数。应该把它设计成线程安全的。</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">private</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">static</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">int</span><span style="color:#E1E4E8;"> onlineCount </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">//concurrent包的线程安全Set，用来存放每个客户端对应的MyWebSocket对象。</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">private</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">static</span><span style="color:#E1E4E8;"> CopyOnWriteArraySet&lt;</span><span style="color:#F97583;">WebSocketServer</span><span style="color:#E1E4E8;">&gt; webSocketSet </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> CopyOnWriteArraySet&lt;&gt;();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">//与某个客户端的连接会话，需要通过它来给客户端发送数据</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">private</span><span style="color:#E1E4E8;"> Session session;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">//接收sid</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">private</span><span style="color:#E1E4E8;"> String sid </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;&quot;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">    /**</span></span>
<span class="line"><span style="color:#6A737D;">     * 连接</span></span>
<span class="line"><span style="color:#6A737D;">     * </span><span style="color:#F97583;">@param</span><span style="color:#6A737D;"> </span><span style="color:#FFAB70;">session</span></span>
<span class="line"><span style="color:#6A737D;">     * </span><span style="color:#F97583;">@param</span><span style="color:#6A737D;"> </span><span style="color:#FFAB70;">sid</span></span>
<span class="line"><span style="color:#6A737D;">     */</span></span>
<span class="line"><span style="color:#E1E4E8;">    @</span><span style="color:#F97583;">OnOpen</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">onOpen</span><span style="color:#E1E4E8;">(Session </span><span style="color:#FFAB70;">session</span><span style="color:#E1E4E8;">, @</span><span style="color:#F97583;">PathParam</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;sid&quot;</span><span style="color:#E1E4E8;">) String </span><span style="color:#FFAB70;">sid</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.session </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> session;</span></span>
<span class="line"><span style="color:#E1E4E8;">        webSocketSet.</span><span style="color:#B392F0;">add</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">);     </span><span style="color:#6A737D;">//加入set中</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">addOnlineCount</span><span style="color:#E1E4E8;">();           </span><span style="color:#6A737D;">//在线数加1</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">!</span><span style="color:#9ECBFF;">&quot;&quot;</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">equals</span><span style="color:#E1E4E8;">(sid)){</span></span>
<span class="line"><span style="color:#E1E4E8;">            log.</span><span style="color:#B392F0;">info</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;有新的连接加入：sid=&quot;</span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;">sid</span><span style="color:#F97583;">+</span><span style="color:#9ECBFF;">&quot;&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">        log.</span><span style="color:#B392F0;">info</span><span style="color:#E1E4E8;">( </span><span style="color:#9ECBFF;">&quot;当前在线人数为&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">getOnlineCount</span><span style="color:#E1E4E8;">());</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.sid </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> sid;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">try</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#B392F0;">sendMessage</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;连接成功&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">        } </span><span style="color:#F97583;">catch</span><span style="color:#E1E4E8;"> (IOException </span><span style="color:#FFAB70;">e</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">            log.</span><span style="color:#B392F0;">error</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;websocket IO异常&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">    /**</span></span>
<span class="line"><span style="color:#6A737D;">     * 断开</span></span>
<span class="line"><span style="color:#6A737D;">     */</span></span>
<span class="line"><span style="color:#E1E4E8;">    @</span><span style="color:#F97583;">OnClose</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">onClose</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">        webSocketSet.</span><span style="color:#B392F0;">remove</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">);  </span><span style="color:#6A737D;">//从set中删除</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">subOnlineCount</span><span style="color:#E1E4E8;">();           </span><span style="color:#6A737D;">//在线数减1</span></span>
<span class="line"><span style="color:#E1E4E8;">        log.</span><span style="color:#B392F0;">info</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;有一连接关闭！当前在线数为&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">getOnlineCount</span><span style="color:#E1E4E8;">());</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    @</span><span style="color:#F97583;">OnMessage</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">onMessage</span><span style="color:#E1E4E8;">(String </span><span style="color:#FFAB70;">message</span><span style="color:#E1E4E8;">, Session </span><span style="color:#FFAB70;">session</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        BaseResult result </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">BaseResult</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">//把用户发来的消息解析成json对象</span></span>
<span class="line"><span style="color:#E1E4E8;">        JSONObject param </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> JSONObject.</span><span style="color:#B392F0;">parseObject</span><span style="color:#E1E4E8;">(message);</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">//测试获取里面的一个参数</span></span>
<span class="line"><span style="color:#E1E4E8;">        System.out.</span><span style="color:#B392F0;">println</span><span style="color:#E1E4E8;">(param.</span><span style="color:#B392F0;">get</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;test&quot;</span><span style="color:#E1E4E8;">));</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">try</span><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">        	System.out.</span><span style="color:#B392F0;">println</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;这里执行操作&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">            result.</span><span style="color:#B392F0;">setStatus</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;OK&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">            result.</span><span style="color:#B392F0;">setCode</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;200&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">            result.</span><span style="color:#B392F0;">setMsg</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;执行成功&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">            session.</span><span style="color:#B392F0;">getAsyncRemote</span><span style="color:#E1E4E8;">().</span><span style="color:#B392F0;">sendText</span><span style="color:#E1E4E8;">(JSON.</span><span style="color:#B392F0;">toJSONString</span><span style="color:#E1E4E8;">(result));</span></span>
<span class="line"><span style="color:#E1E4E8;">        } </span><span style="color:#F97583;">catch</span><span style="color:#E1E4E8;"> (Exception </span><span style="color:#FFAB70;">e</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">            e.</span><span style="color:#B392F0;">printStackTrace</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">            result.</span><span style="color:#B392F0;">setStatus</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;fail&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">            result.</span><span style="color:#B392F0;">setCode</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;406&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">            result.</span><span style="color:#B392F0;">setMsg</span><span style="color:#E1E4E8;">(e.</span><span style="color:#B392F0;">getMessage</span><span style="color:#E1E4E8;">());</span></span>
<span class="line"><span style="color:#E1E4E8;">            session.</span><span style="color:#B392F0;">getAsyncRemote</span><span style="color:#E1E4E8;">().</span><span style="color:#B392F0;">sendText</span><span style="color:#E1E4E8;">(JSON.</span><span style="color:#B392F0;">toJSONString</span><span style="color:#E1E4E8;">(result));</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    @</span><span style="color:#F97583;">OnError</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">onError</span><span style="color:#E1E4E8;">(Session </span><span style="color:#FFAB70;">session</span><span style="color:#E1E4E8;">, Throwable </span><span style="color:#FFAB70;">error</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        log.</span><span style="color:#B392F0;">error</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;发生错误&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">        error.</span><span style="color:#B392F0;">printStackTrace</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">    /**</span></span>
<span class="line"><span style="color:#6A737D;">     * 主动推送</span></span>
<span class="line"><span style="color:#6A737D;">     * </span><span style="color:#F97583;">@param</span><span style="color:#6A737D;"> </span><span style="color:#FFAB70;">message</span></span>
<span class="line"><span style="color:#6A737D;">     * </span><span style="color:#F97583;">@throws</span><span style="color:#6A737D;"> </span><span style="color:#B392F0;">IOException</span></span>
<span class="line"><span style="color:#6A737D;">     */</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">sendMessage</span><span style="color:#E1E4E8;">(String </span><span style="color:#FFAB70;">message</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">throws</span><span style="color:#E1E4E8;"> IOException {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.session.</span><span style="color:#B392F0;">getBasicRemote</span><span style="color:#E1E4E8;">().</span><span style="color:#B392F0;">sendText</span><span style="color:#E1E4E8;">(message);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">    /**</span></span>
<span class="line"><span style="color:#6A737D;">     * 自定义群发消息</span></span>
<span class="line"><span style="color:#6A737D;">     * </span><span style="color:#F97583;">@param</span><span style="color:#6A737D;"> </span><span style="color:#FFAB70;">message</span></span>
<span class="line"><span style="color:#6A737D;">     * </span><span style="color:#F97583;">@param</span><span style="color:#6A737D;"> </span><span style="color:#FFAB70;">sid</span></span>
<span class="line"><span style="color:#6A737D;">     * </span><span style="color:#F97583;">@throws</span><span style="color:#6A737D;"> </span><span style="color:#B392F0;">IOException</span></span>
<span class="line"><span style="color:#6A737D;">     */</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">static</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">sendInfo</span><span style="color:#E1E4E8;">(String </span><span style="color:#FFAB70;">message</span><span style="color:#E1E4E8;">, @</span><span style="color:#F97583;">PathParam</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;sid&quot;</span><span style="color:#E1E4E8;">) String </span><span style="color:#FFAB70;">sid</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">throws</span><span style="color:#E1E4E8;"> IOException {</span></span>
<span class="line"><span style="color:#E1E4E8;">        log.</span><span style="color:#B392F0;">info</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;推送消息到窗口&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> sid </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;,推送消息内容:&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> message);</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">for</span><span style="color:#E1E4E8;"> (WebSocketServer item </span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> webSocketSet) {</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#F97583;">try</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">                </span><span style="color:#6A737D;">//设定只能推送这个sid，为null则全部推送</span></span>
<span class="line"><span style="color:#E1E4E8;">                </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (sid </span><span style="color:#F97583;">==</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">                    item.</span><span style="color:#B392F0;">sendMessage</span><span style="color:#E1E4E8;">(message);</span></span>
<span class="line"><span style="color:#E1E4E8;">                } </span><span style="color:#F97583;">else</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (item.sid.</span><span style="color:#B392F0;">equals</span><span style="color:#E1E4E8;">(sid)) {</span></span>
<span class="line"><span style="color:#E1E4E8;">                    item.</span><span style="color:#B392F0;">sendMessage</span><span style="color:#E1E4E8;">(message);</span></span>
<span class="line"><span style="color:#E1E4E8;">                }</span></span>
<span class="line"><span style="color:#E1E4E8;">            } </span><span style="color:#F97583;">catch</span><span style="color:#E1E4E8;"> (IOException </span><span style="color:#FFAB70;">e</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">                </span><span style="color:#F97583;">continue</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">            }</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">static</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">synchronized</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">int</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">getOnlineCount</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> onlineCount;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">static</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">synchronized</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">addOnlineCount</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">        WebSocketServer.onlineCount</span><span style="color:#F97583;">++</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">static</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">synchronized</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">subOnlineCount</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">        WebSocketServer.onlineCount</span><span style="color:#F97583;">--</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">@</span><span style="color:#D73A49;">ServerEndpoint</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">value</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;/connect&quot;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">@</span><span style="color:#D73A49;">Component</span></span>
<span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">WebSocketServer</span><span style="color:#24292E;"> {</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">private</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">static</span><span style="color:#24292E;"> Logger log </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> LoggerFactory.</span><span style="color:#6F42C1;">getLogger</span><span style="color:#24292E;">(WebSocketServer.class);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">//静态变量，用来记录当前在线连接数。应该把它设计成线程安全的。</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">private</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">static</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">int</span><span style="color:#24292E;"> onlineCount </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">//concurrent包的线程安全Set，用来存放每个客户端对应的MyWebSocket对象。</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">private</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">static</span><span style="color:#24292E;"> CopyOnWriteArraySet&lt;</span><span style="color:#D73A49;">WebSocketServer</span><span style="color:#24292E;">&gt; webSocketSet </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> CopyOnWriteArraySet&lt;&gt;();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">//与某个客户端的连接会话，需要通过它来给客户端发送数据</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">private</span><span style="color:#24292E;"> Session session;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">//接收sid</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">private</span><span style="color:#24292E;"> String sid </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;&quot;</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">    /**</span></span>
<span class="line"><span style="color:#6A737D;">     * 连接</span></span>
<span class="line"><span style="color:#6A737D;">     * </span><span style="color:#D73A49;">@param</span><span style="color:#6A737D;"> </span><span style="color:#E36209;">session</span></span>
<span class="line"><span style="color:#6A737D;">     * </span><span style="color:#D73A49;">@param</span><span style="color:#6A737D;"> </span><span style="color:#E36209;">sid</span></span>
<span class="line"><span style="color:#6A737D;">     */</span></span>
<span class="line"><span style="color:#24292E;">    @</span><span style="color:#D73A49;">OnOpen</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">onOpen</span><span style="color:#24292E;">(Session </span><span style="color:#E36209;">session</span><span style="color:#24292E;">, @</span><span style="color:#D73A49;">PathParam</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;sid&quot;</span><span style="color:#24292E;">) String </span><span style="color:#E36209;">sid</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.session </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> session;</span></span>
<span class="line"><span style="color:#24292E;">        webSocketSet.</span><span style="color:#6F42C1;">add</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">this</span><span style="color:#24292E;">);     </span><span style="color:#6A737D;">//加入set中</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">addOnlineCount</span><span style="color:#24292E;">();           </span><span style="color:#6A737D;">//在线数加1</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">if</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">!</span><span style="color:#032F62;">&quot;&quot;</span><span style="color:#24292E;">.</span><span style="color:#6F42C1;">equals</span><span style="color:#24292E;">(sid)){</span></span>
<span class="line"><span style="color:#24292E;">            log.</span><span style="color:#6F42C1;">info</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;有新的连接加入：sid=&quot;</span><span style="color:#D73A49;">+</span><span style="color:#24292E;">sid</span><span style="color:#D73A49;">+</span><span style="color:#032F62;">&quot;&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">        log.</span><span style="color:#6F42C1;">info</span><span style="color:#24292E;">( </span><span style="color:#032F62;">&quot;当前在线人数为&quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">getOnlineCount</span><span style="color:#24292E;">());</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.sid </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> sid;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">try</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6F42C1;">sendMessage</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;连接成功&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">        } </span><span style="color:#D73A49;">catch</span><span style="color:#24292E;"> (IOException </span><span style="color:#E36209;">e</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">            log.</span><span style="color:#6F42C1;">error</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;websocket IO异常&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">    /**</span></span>
<span class="line"><span style="color:#6A737D;">     * 断开</span></span>
<span class="line"><span style="color:#6A737D;">     */</span></span>
<span class="line"><span style="color:#24292E;">    @</span><span style="color:#D73A49;">OnClose</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">onClose</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">        webSocketSet.</span><span style="color:#6F42C1;">remove</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">this</span><span style="color:#24292E;">);  </span><span style="color:#6A737D;">//从set中删除</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">subOnlineCount</span><span style="color:#24292E;">();           </span><span style="color:#6A737D;">//在线数减1</span></span>
<span class="line"><span style="color:#24292E;">        log.</span><span style="color:#6F42C1;">info</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;有一连接关闭！当前在线数为&quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">getOnlineCount</span><span style="color:#24292E;">());</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    @</span><span style="color:#D73A49;">OnMessage</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">onMessage</span><span style="color:#24292E;">(String </span><span style="color:#E36209;">message</span><span style="color:#24292E;">, Session </span><span style="color:#E36209;">session</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        BaseResult result </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">BaseResult</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">//把用户发来的消息解析成json对象</span></span>
<span class="line"><span style="color:#24292E;">        JSONObject param </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> JSONObject.</span><span style="color:#6F42C1;">parseObject</span><span style="color:#24292E;">(message);</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">//测试获取里面的一个参数</span></span>
<span class="line"><span style="color:#24292E;">        System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(param.</span><span style="color:#6F42C1;">get</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;test&quot;</span><span style="color:#24292E;">));</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">try</span><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">        	System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;这里执行操作&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">            result.</span><span style="color:#6F42C1;">setStatus</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;OK&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">            result.</span><span style="color:#6F42C1;">setCode</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;200&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">            result.</span><span style="color:#6F42C1;">setMsg</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;执行成功&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">            session.</span><span style="color:#6F42C1;">getAsyncRemote</span><span style="color:#24292E;">().</span><span style="color:#6F42C1;">sendText</span><span style="color:#24292E;">(JSON.</span><span style="color:#6F42C1;">toJSONString</span><span style="color:#24292E;">(result));</span></span>
<span class="line"><span style="color:#24292E;">        } </span><span style="color:#D73A49;">catch</span><span style="color:#24292E;"> (Exception </span><span style="color:#E36209;">e</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">            e.</span><span style="color:#6F42C1;">printStackTrace</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">            result.</span><span style="color:#6F42C1;">setStatus</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;fail&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">            result.</span><span style="color:#6F42C1;">setCode</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;406&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">            result.</span><span style="color:#6F42C1;">setMsg</span><span style="color:#24292E;">(e.</span><span style="color:#6F42C1;">getMessage</span><span style="color:#24292E;">());</span></span>
<span class="line"><span style="color:#24292E;">            session.</span><span style="color:#6F42C1;">getAsyncRemote</span><span style="color:#24292E;">().</span><span style="color:#6F42C1;">sendText</span><span style="color:#24292E;">(JSON.</span><span style="color:#6F42C1;">toJSONString</span><span style="color:#24292E;">(result));</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    @</span><span style="color:#D73A49;">OnError</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">onError</span><span style="color:#24292E;">(Session </span><span style="color:#E36209;">session</span><span style="color:#24292E;">, Throwable </span><span style="color:#E36209;">error</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        log.</span><span style="color:#6F42C1;">error</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;发生错误&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">        error.</span><span style="color:#6F42C1;">printStackTrace</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">    /**</span></span>
<span class="line"><span style="color:#6A737D;">     * 主动推送</span></span>
<span class="line"><span style="color:#6A737D;">     * </span><span style="color:#D73A49;">@param</span><span style="color:#6A737D;"> </span><span style="color:#E36209;">message</span></span>
<span class="line"><span style="color:#6A737D;">     * </span><span style="color:#D73A49;">@throws</span><span style="color:#6A737D;"> </span><span style="color:#6F42C1;">IOException</span></span>
<span class="line"><span style="color:#6A737D;">     */</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">sendMessage</span><span style="color:#24292E;">(String </span><span style="color:#E36209;">message</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">throws</span><span style="color:#24292E;"> IOException {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.session.</span><span style="color:#6F42C1;">getBasicRemote</span><span style="color:#24292E;">().</span><span style="color:#6F42C1;">sendText</span><span style="color:#24292E;">(message);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">    /**</span></span>
<span class="line"><span style="color:#6A737D;">     * 自定义群发消息</span></span>
<span class="line"><span style="color:#6A737D;">     * </span><span style="color:#D73A49;">@param</span><span style="color:#6A737D;"> </span><span style="color:#E36209;">message</span></span>
<span class="line"><span style="color:#6A737D;">     * </span><span style="color:#D73A49;">@param</span><span style="color:#6A737D;"> </span><span style="color:#E36209;">sid</span></span>
<span class="line"><span style="color:#6A737D;">     * </span><span style="color:#D73A49;">@throws</span><span style="color:#6A737D;"> </span><span style="color:#6F42C1;">IOException</span></span>
<span class="line"><span style="color:#6A737D;">     */</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">static</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">sendInfo</span><span style="color:#24292E;">(String </span><span style="color:#E36209;">message</span><span style="color:#24292E;">, @</span><span style="color:#D73A49;">PathParam</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;sid&quot;</span><span style="color:#24292E;">) String </span><span style="color:#E36209;">sid</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">throws</span><span style="color:#24292E;"> IOException {</span></span>
<span class="line"><span style="color:#24292E;">        log.</span><span style="color:#6F42C1;">info</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;推送消息到窗口&quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> sid </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;,推送消息内容:&quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> message);</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">for</span><span style="color:#24292E;"> (WebSocketServer item </span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> webSocketSet) {</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#D73A49;">try</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">                </span><span style="color:#6A737D;">//设定只能推送这个sid，为null则全部推送</span></span>
<span class="line"><span style="color:#24292E;">                </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (sid </span><span style="color:#D73A49;">==</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">null</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">                    item.</span><span style="color:#6F42C1;">sendMessage</span><span style="color:#24292E;">(message);</span></span>
<span class="line"><span style="color:#24292E;">                } </span><span style="color:#D73A49;">else</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (item.sid.</span><span style="color:#6F42C1;">equals</span><span style="color:#24292E;">(sid)) {</span></span>
<span class="line"><span style="color:#24292E;">                    item.</span><span style="color:#6F42C1;">sendMessage</span><span style="color:#24292E;">(message);</span></span>
<span class="line"><span style="color:#24292E;">                }</span></span>
<span class="line"><span style="color:#24292E;">            } </span><span style="color:#D73A49;">catch</span><span style="color:#24292E;"> (IOException </span><span style="color:#E36209;">e</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">                </span><span style="color:#D73A49;">continue</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">            }</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">static</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">synchronized</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">int</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">getOnlineCount</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> onlineCount;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">static</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">synchronized</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">addOnlineCount</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">        WebSocketServer.onlineCount</span><span style="color:#D73A49;">++</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">static</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">synchronized</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">subOnlineCount</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">        WebSocketServer.onlineCount</span><span style="color:#D73A49;">--</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>注：</p><p>实现类中</p>`,12),y=p(`<p>测试方法：</p><p>网络找websocket在线测试工具，介绍网站 <a href="https://www.toolfk.com/" target="_blank" rel="noreferrer">工具网站</a></p><p>地址为 ws://IP:端口/connect 注：connect为@ServerEndpoint注解设置的</p><p>先连接，后发送信息如</p><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">&quot;test&quot;</span><span style="color:#E1E4E8;">:</span><span style="color:#9ECBFF;">&quot;紧急信息&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">&quot;test&quot;</span><span style="color:#24292E;">:</span><span style="color:#032F62;">&quot;紧急信息&quot;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>扩展：</p><p>网上搜索websocket的时候，都提到了ajax和long poll，记录自己理解</p><p>ajax：一直发送请求，一直轮询，有新消息就接收，所以ajax一般用在保证实时性高的地方，如项目开发中的可视化数据展示</p><p>long poll：长轮询，后端接收到前端的消息后，后端在进行处理的时候如果处理时间很长就会将该请求一直等待，直到处理完毕后，才将响应返回</p>`,9);function i(F,u,A,g,d,D){const n=e("font");return t(),c("div",null,[E,a(n,{color:"red"},{default:l(()=>[s("@OnOpen")]),_:1}),s("注解的方法为第一次握手执行"),a(n,{color:"red"},{default:l(()=>[s("@OnMessage")]),_:1}),s("注解的方法为连接后数据传输执行的"),y])}const S=o(r,[["render",i]]);export{b as __pageData,S as default};

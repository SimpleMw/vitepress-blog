import{_ as p,C as o,o as e,c as t,k as n,H as c,w as r,a as s,Q as a}from"./chunks/framework.8153c8a6.js";const f=JSON.parse('{"title":"redis分布式锁使用","description":"","frontmatter":{"title":"redis分布式锁使用","date":"2021-04-22T10:20:27.000Z"},"headers":[],"relativePath":"guide/springcloud/分布式锁/Redis分布式锁.md","filePath":"guide/springcloud/分布式锁/Redis分布式锁.md"}'),E={name:"guide/springcloud/分布式锁/Redis分布式锁.md"},y=a(`<h5 id="安装redis" tabindex="-1"><a href="./.html">安装redis</a> <a class="header-anchor" href="#安装redis" aria-label="Permalink to &quot;[安装redis]()&quot;">​</a></h5><h5 id="整合redis" tabindex="-1">整合redis <a class="header-anchor" href="#整合redis" aria-label="Permalink to &quot;整合redis&quot;">​</a></h5><h5 id="简单的原生实现" tabindex="-1">简单的原生实现 <a class="header-anchor" href="#简单的原生实现" aria-label="Permalink to &quot;简单的原生实现&quot;">​</a></h5><ul><li>依赖</li></ul><div class="language-XML vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">XML</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">dependency</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">groupId</span><span style="color:#E1E4E8;">&gt;org.springframework.boot&lt;/</span><span style="color:#85E89D;">groupId</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">artifactId</span><span style="color:#E1E4E8;">&gt;spring-boot-starter-data-redis&lt;/</span><span style="color:#85E89D;">artifactId</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">version</span><span style="color:#E1E4E8;">&gt;2.1.5.RELEASE&lt;/</span><span style="color:#85E89D;">version</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">dependency</span><span style="color:#E1E4E8;">&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">dependency</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">groupId</span><span style="color:#24292E;">&gt;org.springframework.boot&lt;/</span><span style="color:#22863A;">groupId</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">artifactId</span><span style="color:#24292E;">&gt;spring-boot-starter-data-redis&lt;/</span><span style="color:#22863A;">artifactId</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">version</span><span style="color:#24292E;">&gt;2.1.5.RELEASE&lt;/</span><span style="color:#22863A;">version</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">dependency</span><span style="color:#24292E;">&gt;</span></span></code></pre></div><ul><li>创建加锁和解锁方法</li></ul><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">@</span><span style="color:#F97583;">Component</span></span>
<span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">RedisLockCommon</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    @</span><span style="color:#F97583;">Resource</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">private</span><span style="color:#E1E4E8;"> RedisTemplate redisTemplate;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">    /**</span></span>
<span class="line"><span style="color:#6A737D;">     * Redis加锁的操作</span></span>
<span class="line"><span style="color:#6A737D;">     * </span><span style="color:#F97583;">@param</span><span style="color:#6A737D;"> </span><span style="color:#FFAB70;">key</span></span>
<span class="line"><span style="color:#6A737D;">     * </span><span style="color:#F97583;">@param</span><span style="color:#6A737D;"> </span><span style="color:#FFAB70;">value</span></span>
<span class="line"><span style="color:#6A737D;">     * </span><span style="color:#F97583;">@return</span></span>
<span class="line"><span style="color:#6A737D;">     */</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> Boolean </span><span style="color:#B392F0;">tryLock</span><span style="color:#E1E4E8;">(String </span><span style="color:#FFAB70;">key</span><span style="color:#E1E4E8;">, String </span><span style="color:#FFAB70;">value</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#6A737D;">//创建redis键值对,设置超时时间为2000毫秒</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#F97583;">boolean</span><span style="color:#E1E4E8;"> localresult </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> redisTemplate.</span><span style="color:#B392F0;">opsForValue</span><span style="color:#E1E4E8;">().</span><span style="color:#B392F0;">setIfAbsent</span><span style="color:#E1E4E8;">(key,value,</span><span style="color:#79B8FF;">2000</span><span style="color:#E1E4E8;">,TimeUnit.MILLISECONDS);</span></span>
<span class="line"><span style="color:#E1E4E8;">            System.out.</span><span style="color:#B392F0;">println</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;key：&quot;</span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;">key</span><span style="color:#F97583;">+</span><span style="color:#9ECBFF;">&quot; value: &quot;</span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;">value);</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;">(localresult){</span></span>
<span class="line"><span style="color:#E1E4E8;">                System.out.</span><span style="color:#B392F0;">println</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;创建成功&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">                </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">            }</span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">!</span><span style="color:#E1E4E8;">localresult){</span></span>
<span class="line"><span style="color:#E1E4E8;">                System.out.</span><span style="color:#B392F0;">println</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;已存在，循环等待&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">                </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">false</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">            }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">false</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">    /**</span></span>
<span class="line"><span style="color:#6A737D;">     * Redis解锁的操作</span></span>
<span class="line"><span style="color:#6A737D;">     * </span><span style="color:#F97583;">@param</span><span style="color:#6A737D;"> </span><span style="color:#FFAB70;">key</span></span>
<span class="line"><span style="color:#6A737D;">     * </span><span style="color:#F97583;">@param</span><span style="color:#6A737D;"> </span><span style="color:#FFAB70;">value</span></span>
<span class="line"><span style="color:#6A737D;">     */</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">unlock</span><span style="color:#E1E4E8;">(String </span><span style="color:#FFAB70;">key</span><span style="color:#E1E4E8;">, String </span><span style="color:#FFAB70;">value</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        String currentValue </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> redisTemplate.</span><span style="color:#B392F0;">opsForValue</span><span style="color:#E1E4E8;">().</span><span style="color:#B392F0;">get</span><span style="color:#E1E4E8;">(key).</span><span style="color:#B392F0;">toString</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">try</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (StringUtil.</span><span style="color:#B392F0;">isNotEmpty</span><span style="color:#E1E4E8;">(currentValue) </span><span style="color:#F97583;">&amp;&amp;</span><span style="color:#E1E4E8;"> currentValue.</span><span style="color:#B392F0;">equals</span><span style="color:#E1E4E8;">(value)) {</span></span>
<span class="line"><span style="color:#E1E4E8;">                redisTemplate.</span><span style="color:#B392F0;">opsForValue</span><span style="color:#E1E4E8;">().</span><span style="color:#B392F0;">getOperations</span><span style="color:#E1E4E8;">().</span><span style="color:#B392F0;">delete</span><span style="color:#E1E4E8;">(key);</span></span>
<span class="line"><span style="color:#E1E4E8;">            }</span></span>
<span class="line"><span style="color:#E1E4E8;">        } </span><span style="color:#F97583;">catch</span><span style="color:#E1E4E8;"> (Exception </span><span style="color:#FFAB70;">e</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">@</span><span style="color:#D73A49;">Component</span></span>
<span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">RedisLockCommon</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    @</span><span style="color:#D73A49;">Resource</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">private</span><span style="color:#24292E;"> RedisTemplate redisTemplate;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">    /**</span></span>
<span class="line"><span style="color:#6A737D;">     * Redis加锁的操作</span></span>
<span class="line"><span style="color:#6A737D;">     * </span><span style="color:#D73A49;">@param</span><span style="color:#6A737D;"> </span><span style="color:#E36209;">key</span></span>
<span class="line"><span style="color:#6A737D;">     * </span><span style="color:#D73A49;">@param</span><span style="color:#6A737D;"> </span><span style="color:#E36209;">value</span></span>
<span class="line"><span style="color:#6A737D;">     * </span><span style="color:#D73A49;">@return</span></span>
<span class="line"><span style="color:#6A737D;">     */</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> Boolean </span><span style="color:#6F42C1;">tryLock</span><span style="color:#24292E;">(String </span><span style="color:#E36209;">key</span><span style="color:#24292E;">, String </span><span style="color:#E36209;">value</span><span style="color:#24292E;">) {</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6A737D;">//创建redis键值对,设置超时时间为2000毫秒</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#D73A49;">boolean</span><span style="color:#24292E;"> localresult </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> redisTemplate.</span><span style="color:#6F42C1;">opsForValue</span><span style="color:#24292E;">().</span><span style="color:#6F42C1;">setIfAbsent</span><span style="color:#24292E;">(key,value,</span><span style="color:#005CC5;">2000</span><span style="color:#24292E;">,TimeUnit.MILLISECONDS);</span></span>
<span class="line"><span style="color:#24292E;">            System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;key：&quot;</span><span style="color:#D73A49;">+</span><span style="color:#24292E;">key</span><span style="color:#D73A49;">+</span><span style="color:#032F62;">&quot; value: &quot;</span><span style="color:#D73A49;">+</span><span style="color:#24292E;">value);</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#D73A49;">if</span><span style="color:#24292E;">(localresult){</span></span>
<span class="line"><span style="color:#24292E;">                System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;创建成功&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">                </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">            }</span><span style="color:#D73A49;">if</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">!</span><span style="color:#24292E;">localresult){</span></span>
<span class="line"><span style="color:#24292E;">                System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;已存在，循环等待&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">                </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">false</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">            }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">false</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">    /**</span></span>
<span class="line"><span style="color:#6A737D;">     * Redis解锁的操作</span></span>
<span class="line"><span style="color:#6A737D;">     * </span><span style="color:#D73A49;">@param</span><span style="color:#6A737D;"> </span><span style="color:#E36209;">key</span></span>
<span class="line"><span style="color:#6A737D;">     * </span><span style="color:#D73A49;">@param</span><span style="color:#6A737D;"> </span><span style="color:#E36209;">value</span></span>
<span class="line"><span style="color:#6A737D;">     */</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">unlock</span><span style="color:#24292E;">(String </span><span style="color:#E36209;">key</span><span style="color:#24292E;">, String </span><span style="color:#E36209;">value</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        String currentValue </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> redisTemplate.</span><span style="color:#6F42C1;">opsForValue</span><span style="color:#24292E;">().</span><span style="color:#6F42C1;">get</span><span style="color:#24292E;">(key).</span><span style="color:#6F42C1;">toString</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">try</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (StringUtil.</span><span style="color:#6F42C1;">isNotEmpty</span><span style="color:#24292E;">(currentValue) </span><span style="color:#D73A49;">&amp;&amp;</span><span style="color:#24292E;"> currentValue.</span><span style="color:#6F42C1;">equals</span><span style="color:#24292E;">(value)) {</span></span>
<span class="line"><span style="color:#24292E;">                redisTemplate.</span><span style="color:#6F42C1;">opsForValue</span><span style="color:#24292E;">().</span><span style="color:#6F42C1;">getOperations</span><span style="color:#24292E;">().</span><span style="color:#6F42C1;">delete</span><span style="color:#24292E;">(key);</span></span>
<span class="line"><span style="color:#24292E;">            }</span></span>
<span class="line"><span style="color:#24292E;">        } </span><span style="color:#D73A49;">catch</span><span style="color:#24292E;"> (Exception </span><span style="color:#E36209;">e</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><ul><li>Service写法</li></ul><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">@</span><span style="color:#F97583;">Resource</span></span>
<span class="line"><span style="color:#F97583;">private</span><span style="color:#E1E4E8;"> RedisLockCommon redisLock;    </span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">doThings</span><span style="color:#E1E4E8;">(){</span></span>
<span class="line"><span style="color:#E1E4E8;">    String key </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;dec_store_lock&quot;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    String value </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> UUID.</span><span style="color:#B392F0;">randomUUID</span><span style="color:#E1E4E8;">().</span><span style="color:#B392F0;">toString</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">try</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">boolean</span><span style="color:#E1E4E8;">  flag </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">while</span><span style="color:#E1E4E8;">(flag){</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;">(redisLock.</span><span style="color:#B392F0;">tryLock</span><span style="color:#E1E4E8;">(key, value)){</span></span>
<span class="line"><span style="color:#E1E4E8;">                </span></span>
<span class="line"><span style="color:#E1E4E8;">                </span><span style="color:#6A737D;">//这里写要执行的代码</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">                </span><span style="color:#6A737D;">//将flag改为false</span></span>
<span class="line"><span style="color:#E1E4E8;">                flag </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">false</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">            }</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">    } </span><span style="color:#F97583;">catch</span><span style="color:#E1E4E8;"> (Exception </span><span style="color:#FFAB70;">e</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        e.</span><span style="color:#B392F0;">printStackTrace</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">    } </span><span style="color:#F97583;">finally</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">//解锁</span></span>
<span class="line"><span style="color:#E1E4E8;">        redisLock.</span><span style="color:#B392F0;">unlock</span><span style="color:#E1E4E8;">(key, value);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">@</span><span style="color:#D73A49;">Resource</span></span>
<span class="line"><span style="color:#D73A49;">private</span><span style="color:#24292E;"> RedisLockCommon redisLock;    </span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">doThings</span><span style="color:#24292E;">(){</span></span>
<span class="line"><span style="color:#24292E;">    String key </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;dec_store_lock&quot;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    String value </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> UUID.</span><span style="color:#6F42C1;">randomUUID</span><span style="color:#24292E;">().</span><span style="color:#6F42C1;">toString</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">try</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">boolean</span><span style="color:#24292E;">  flag </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">while</span><span style="color:#24292E;">(flag){</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#D73A49;">if</span><span style="color:#24292E;">(redisLock.</span><span style="color:#6F42C1;">tryLock</span><span style="color:#24292E;">(key, value)){</span></span>
<span class="line"><span style="color:#24292E;">                </span></span>
<span class="line"><span style="color:#24292E;">                </span><span style="color:#6A737D;">//这里写要执行的代码</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">                </span><span style="color:#6A737D;">//将flag改为false</span></span>
<span class="line"><span style="color:#24292E;">                flag </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">false</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">            }</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">    } </span><span style="color:#D73A49;">catch</span><span style="color:#24292E;"> (Exception </span><span style="color:#E36209;">e</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        e.</span><span style="color:#6F42C1;">printStackTrace</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">    } </span><span style="color:#D73A49;">finally</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">//解锁</span></span>
<span class="line"><span style="color:#24292E;">        redisLock.</span><span style="color:#6F42C1;">unlock</span><span style="color:#24292E;">(key, value);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>注：本例子只是为了简单实现redis分布式锁，未表示出可重入锁、和看门狗特性，具体请百度</p><p>也可使用jedis来实现，Jedis 是简单的封装了 Redis 的API库，可以看作是Redis客户端，它的方法和Redis 的命令很类似，尝试加锁的命令是 setnx()</p>`,11),i={id:"redis分布式锁实现原理",tabindex:"-1"},d=n("a",{class:"header-anchor",href:"#redis分布式锁实现原理","aria-label":'Permalink to "<font color=red>redis分布式锁实现原理</font>"'},"​",-1),u=a(`<p>1.关键在于setIfAbsent()方法，对应linux命令setnx，即若已经存在同样的key则返回false，若不存在则创建</p><p>2.加锁即在该key中，将区分本线程与其它线程的信息写入该key的value中，可以是本线程产生的uuid也可以是本线程的线程id</p><p>3.未抢到锁的线程需不断地循环去获取锁，即创建 键值对</p><h5 id="使用redisson实现" tabindex="-1">使用redisson实现 <a class="header-anchor" href="#使用redisson实现" aria-label="Permalink to &quot;使用redisson实现&quot;">​</a></h5><ul><li>依赖</li></ul><div class="language-XML vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">XML</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">&lt;!-- https://mvnrepository.com/artifact/org.redisson/redisson --&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">dependency</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">groupId</span><span style="color:#E1E4E8;">&gt;org.redisson&lt;/</span><span style="color:#85E89D;">groupId</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">artifactId</span><span style="color:#E1E4E8;">&gt;redisson&lt;/</span><span style="color:#85E89D;">artifactId</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">version</span><span style="color:#E1E4E8;">&gt;3.15.4&lt;/</span><span style="color:#85E89D;">version</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">dependency</span><span style="color:#E1E4E8;">&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">&lt;!-- https://mvnrepository.com/artifact/org.redisson/redisson --&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">dependency</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">groupId</span><span style="color:#24292E;">&gt;org.redisson&lt;/</span><span style="color:#22863A;">groupId</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">artifactId</span><span style="color:#24292E;">&gt;redisson&lt;/</span><span style="color:#22863A;">artifactId</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">version</span><span style="color:#24292E;">&gt;3.15.4&lt;/</span><span style="color:#22863A;">version</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">dependency</span><span style="color:#24292E;">&gt;</span></span></code></pre></div><ul><li>实现代码，创建client客户端</li></ul><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">String host </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;localhost&quot;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">String port </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;6379&quot;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;">* 创建redisson</span></span>
<span class="line"><span style="color:#6A737D;">* </span><span style="color:#F97583;">@return</span></span>
<span class="line"><span style="color:#6A737D;">*/</span></span>
<span class="line"><span style="color:#E1E4E8;">@</span><span style="color:#F97583;">Bean</span></span>
<span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> RedissonClient </span><span style="color:#B392F0;">redissonClient</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">    Config config </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Config</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">    config.</span><span style="color:#B392F0;">useSingleServer</span><span style="color:#E1E4E8;">().</span><span style="color:#B392F0;">setAddress</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;redis://&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> host </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;:&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> port);</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> Redisson.</span><span style="color:#B392F0;">create</span><span style="color:#E1E4E8;">(config);</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">String host </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;localhost&quot;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">String port </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;6379&quot;</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;">* 创建redisson</span></span>
<span class="line"><span style="color:#6A737D;">* </span><span style="color:#D73A49;">@return</span></span>
<span class="line"><span style="color:#6A737D;">*/</span></span>
<span class="line"><span style="color:#24292E;">@</span><span style="color:#D73A49;">Bean</span></span>
<span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> RedissonClient </span><span style="color:#6F42C1;">redissonClient</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">    Config config </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Config</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">    config.</span><span style="color:#6F42C1;">useSingleServer</span><span style="color:#24292E;">().</span><span style="color:#6F42C1;">setAddress</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;redis://&quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> host </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;:&quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> port);</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> Redisson.</span><span style="color:#6F42C1;">create</span><span style="color:#24292E;">(config);</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><ul><li>使用</li></ul><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">@</span><span style="color:#F97583;">Autowired</span></span>
<span class="line"><span style="color:#F97583;">private</span><span style="color:#E1E4E8;"> RedissonClient redissonClient;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">doThings</span><span style="color:#E1E4E8;">(){</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">//作为锁的key</span></span>
<span class="line"><span style="color:#E1E4E8;">	String key </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;lock_product&quot;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    RLock lock  </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> redissonClient.</span><span style="color:#B392F0;">getLock</span><span style="color:#E1E4E8;">(key);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">try</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">//尝试获取锁操作，当获取到成功后即执行要实现的代码，否则则一直循环尝试获取锁</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">//第一个参数是等待时间该时间后获取不到锁，则直接返回。 第二个参数是强制释放时间</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">boolean</span><span style="color:#E1E4E8;"> flag </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> lock.</span><span style="color:#B392F0;">tryLock</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">5000</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">60000</span><span style="color:#E1E4E8;">, TimeUnit.MILLISECONDS);</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (flag) {</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#6A737D;">//这中间是要实现的代码</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">    } </span><span style="color:#F97583;">catch</span><span style="color:#E1E4E8;"> (InterruptedException </span><span style="color:#FFAB70;">e</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        e.</span><span style="color:#B392F0;">printStackTrace</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">    } </span><span style="color:#F97583;">finally</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">//执行完毕后解锁</span></span>
<span class="line"><span style="color:#E1E4E8;">        lock.</span><span style="color:#B392F0;">unlock</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">@</span><span style="color:#D73A49;">Autowired</span></span>
<span class="line"><span style="color:#D73A49;">private</span><span style="color:#24292E;"> RedissonClient redissonClient;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">doThings</span><span style="color:#24292E;">(){</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">//作为锁的key</span></span>
<span class="line"><span style="color:#24292E;">	String key </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;lock_product&quot;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    RLock lock  </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> redissonClient.</span><span style="color:#6F42C1;">getLock</span><span style="color:#24292E;">(key);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">try</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">//尝试获取锁操作，当获取到成功后即执行要实现的代码，否则则一直循环尝试获取锁</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">//第一个参数是等待时间该时间后获取不到锁，则直接返回。 第二个参数是强制释放时间</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">boolean</span><span style="color:#24292E;"> flag </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> lock.</span><span style="color:#6F42C1;">tryLock</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">5000</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">60000</span><span style="color:#24292E;">, TimeUnit.MILLISECONDS);</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (flag) {</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6A737D;">//这中间是要实现的代码</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">    } </span><span style="color:#D73A49;">catch</span><span style="color:#24292E;"> (InterruptedException </span><span style="color:#E36209;">e</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        e.</span><span style="color:#6F42C1;">printStackTrace</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">    } </span><span style="color:#D73A49;">finally</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">//执行完毕后解锁</span></span>
<span class="line"><span style="color:#24292E;">        lock.</span><span style="color:#6F42C1;">unlock</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div>`,10);function F(A,g,D,k,C,h){const l=o("font");return e(),t("div",null,[y,n("h5",i,[c(l,{color:"red"},{default:r(()=>[s("redis分布式锁实现原理")]),_:1}),s(),d]),u])}const m=p(E,[["render",F]]);export{f as __pageData,m as default};

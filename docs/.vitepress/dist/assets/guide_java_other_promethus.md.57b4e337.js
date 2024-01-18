import{_ as s,o as a,c as n,Q as p}from"./chunks/framework.dd5a1521.js";const u=JSON.parse('{"title":"Promethus","description":"","frontmatter":{"title":"Promethus","date":"2023-08-23T08:46:11.000Z"},"headers":[],"relativePath":"guide/java/other/promethus.md","filePath":"guide/java/other/promethus.md"}'),l={name:"guide/java/other/promethus.md"},e=p(`<p>场景 springboot整合promethus</p><h4 id="官网下载" tabindex="-1"><a href="https://prometheus.io/download/" target="_blank" rel="noreferrer">官网下载</a> <a class="header-anchor" href="#官网下载" aria-label="Permalink to &quot;[官网下载](https://prometheus.io/download/)&quot;">​</a></h4><h4 id="springboot项目暴露参数" tabindex="-1">Springboot项目暴露参数 <a class="header-anchor" href="#springboot项目暴露参数" aria-label="Permalink to &quot;Springboot项目暴露参数&quot;">​</a></h4><ul><li>依赖</li></ul><div class="language-xml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">xml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">dependency</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">groupId</span><span style="color:#E1E4E8;">&gt;org.springframework.boot&lt;/</span><span style="color:#85E89D;">groupId</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">artifactId</span><span style="color:#E1E4E8;">&gt;spring-boot-starter-actuator&lt;/</span><span style="color:#85E89D;">artifactId</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">dependency</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">dependency</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">groupId</span><span style="color:#E1E4E8;">&gt;io.micrometer&lt;/</span><span style="color:#85E89D;">groupId</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">artifactId</span><span style="color:#E1E4E8;">&gt;micrometer-registry-prometheus&lt;/</span><span style="color:#85E89D;">artifactId</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">dependency</span><span style="color:#E1E4E8;">&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">dependency</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">groupId</span><span style="color:#24292E;">&gt;org.springframework.boot&lt;/</span><span style="color:#22863A;">groupId</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">artifactId</span><span style="color:#24292E;">&gt;spring-boot-starter-actuator&lt;/</span><span style="color:#22863A;">artifactId</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">dependency</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">dependency</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">groupId</span><span style="color:#24292E;">&gt;io.micrometer&lt;/</span><span style="color:#22863A;">groupId</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">artifactId</span><span style="color:#24292E;">&gt;micrometer-registry-prometheus&lt;/</span><span style="color:#22863A;">artifactId</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">dependency</span><span style="color:#24292E;">&gt;</span></span></code></pre></div><ul><li>yml配置</li></ul><div class="language-yml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#85E89D;">spring</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">application</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">prometheus-demo</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#85E89D;">server</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">port</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">8080</span></span>
<span class="line"></span>
<span class="line"><span style="color:#85E89D;">management</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">server</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">port</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">8082</span><span style="color:#E1E4E8;"> </span><span style="color:#6A737D;">#通过什么端口暴露出去</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">endpoint</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">prometheus</span><span style="color:#E1E4E8;">: </span><span style="color:#6A737D;">#启用Prometheus</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">enabled</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">true</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">health</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">enabled</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;"> </span><span style="color:#6A737D;">#启用健康检查</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">show-details</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">always</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">metrics</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">enabled</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;"> </span><span style="color:#6A737D;">#启用访问</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">export</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">prometheus</span><span style="color:#E1E4E8;">: </span><span style="color:#6A737D;">#启用promehus的访问</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">enabled</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">true</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">endpoints</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">enabled-by-default</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">#启用所有暴露端点,默认情况下所有端点都启动</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">web</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">exposure</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">include</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&#39;*&#39;</span><span style="color:#E1E4E8;"> </span><span style="color:#6A737D;">#通配符</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#22863A;">spring</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">application</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">prometheus-demo</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#22863A;">server</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">port</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">8080</span></span>
<span class="line"></span>
<span class="line"><span style="color:#22863A;">management</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">server</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">port</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">8082</span><span style="color:#24292E;"> </span><span style="color:#6A737D;">#通过什么端口暴露出去</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">endpoint</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">prometheus</span><span style="color:#24292E;">: </span><span style="color:#6A737D;">#启用Prometheus</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">enabled</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">true</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">health</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">enabled</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">true</span><span style="color:#24292E;"> </span><span style="color:#6A737D;">#启用健康检查</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">show-details</span><span style="color:#24292E;">: </span><span style="color:#032F62;">always</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">metrics</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">enabled</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">true</span><span style="color:#24292E;"> </span><span style="color:#6A737D;">#启用访问</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">export</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">prometheus</span><span style="color:#24292E;">: </span><span style="color:#6A737D;">#启用promehus的访问</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">enabled</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">true</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">endpoints</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">enabled-by-default</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">  </span><span style="color:#6A737D;">#启用所有暴露端点,默认情况下所有端点都启动</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">web</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">exposure</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">include</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&#39;*&#39;</span><span style="color:#24292E;"> </span><span style="color:#6A737D;">#通配符</span></span></code></pre></div><ul><li>启动类</li></ul><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">@</span><span style="color:#F97583;">Bean</span></span>
<span class="line"><span style="color:#E1E4E8;">MeterRegistryCustomizer</span><span style="color:#F97583;">&lt;</span><span style="color:#E1E4E8;">MeterRegistry</span><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">configurer</span><span style="color:#E1E4E8;">(@</span><span style="color:#F97583;">Value</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;\${spring.application.name}&quot;</span><span style="color:#E1E4E8;">) String applicationName) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> registry </span><span style="color:#F97583;">-&gt;</span><span style="color:#E1E4E8;"> registry.</span><span style="color:#B392F0;">config</span><span style="color:#E1E4E8;">().</span><span style="color:#B392F0;">commonTags</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;application&quot;</span><span style="color:#E1E4E8;">, applicationName);</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">@</span><span style="color:#D73A49;">Bean</span></span>
<span class="line"><span style="color:#24292E;">MeterRegistryCustomizer</span><span style="color:#D73A49;">&lt;</span><span style="color:#24292E;">MeterRegistry</span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">configurer</span><span style="color:#24292E;">(@</span><span style="color:#D73A49;">Value</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;\${spring.application.name}&quot;</span><span style="color:#24292E;">) String applicationName) {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> registry </span><span style="color:#D73A49;">-&gt;</span><span style="color:#24292E;"> registry.</span><span style="color:#6F42C1;">config</span><span style="color:#24292E;">().</span><span style="color:#6F42C1;">commonTags</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;application&quot;</span><span style="color:#24292E;">, applicationName);</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h4 id="配置promethus" tabindex="-1">配置Promethus <a class="header-anchor" href="#配置promethus" aria-label="Permalink to &quot;配置Promethus&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">  - </span><span style="color:#85E89D;">job_name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;springboot&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">static_configs</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">      - </span><span style="color:#85E89D;">targets</span><span style="color:#E1E4E8;">: [</span><span style="color:#9ECBFF;">&quot;localhost:8082&quot;</span><span style="color:#E1E4E8;">]    </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">metrics_path</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;/actuator/prometheus&quot;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">  - </span><span style="color:#22863A;">job_name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;springboot&quot;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">static_configs</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#22863A;">targets</span><span style="color:#24292E;">: [</span><span style="color:#032F62;">&quot;localhost:8082&quot;</span><span style="color:#24292E;">]    </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">metrics_path</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;/actuator/prometheus&quot;</span></span></code></pre></div><p>启动服务后访问地址 <a href="http://localhost:9090/" target="_blank" rel="noreferrer">http://localhost:9090/</a></p><p>初始访问密码admin/admin</p><p>查看接口请求时间</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">http_server_requests_seconds_max{uri=&#39;/packing/createJobActPackForStation&#39;}[5m]</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">http_server_requests_seconds_max{uri=&#39;/packing/createJobActPackForStation&#39;}[5m]</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">sort_desc(http_server_requests_seconds_max{instance=&#39;10.222.48.218:8699&#39;})</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">sort_desc(http_server_requests_seconds_max{instance=&#39;10.222.48.218:8699&#39;})</span></span></code></pre></div><p>常见的指标</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">常用的jvm的Prometheus 指标示例：</span></span>
<span class="line"><span style="color:#e1e4e8;">1. JVM内存指标：</span></span>
<span class="line"><span style="color:#e1e4e8;">   - \`jvm_memory_used_bytes\`: JVM内存使用量。</span></span>
<span class="line"><span style="color:#e1e4e8;">   - \`jvm_memory_max_bytes\`: JVM内存最大可用量。</span></span>
<span class="line"><span style="color:#e1e4e8;">   - \`jvm_memory_committed_bytes\`: JVM内存已分配量。</span></span>
<span class="line"><span style="color:#e1e4e8;">2. JVM线程指标：</span></span>
<span class="line"><span style="color:#e1e4e8;">   - \`jvm_threads_current\`: 当前活动线程数。</span></span>
<span class="line"><span style="color:#e1e4e8;">   - \`jvm_threads_daemon\`: 守护线程数。</span></span>
<span class="line"><span style="color:#e1e4e8;">   - \`jvm_threads_peak\`: 峰值线程数。</span></span>
<span class="line"><span style="color:#e1e4e8;">3. JVM垃圾回收指标：</span></span>
<span class="line"><span style="color:#e1e4e8;">   - \`jvm_gc_collection_seconds\`: 垃圾回收的持续时间。</span></span>
<span class="line"><span style="color:#e1e4e8;">   - \`jvm_gc_collection_count\`: 垃圾回收的次数。</span></span>
<span class="line"><span style="color:#e1e4e8;">4. JVM类加载指标：</span></span>
<span class="line"><span style="color:#e1e4e8;">   - \`jvm_classes_loaded\`: 已加载的类数量。</span></span>
<span class="line"><span style="color:#e1e4e8;">   - \`jvm_classes_unloaded\`: 已卸载的类数量。</span></span>
<span class="line"><span style="color:#e1e4e8;">5. JVM启动时间指标：</span></span>
<span class="line"><span style="color:#e1e4e8;">   - \`jvm_uptime_seconds\`: JVM运行时间。</span></span>
<span class="line"><span style="color:#e1e4e8;">6. JVM文件描述符指标：</span></span>
<span class="line"><span style="color:#e1e4e8;">   - \`jvm_fd_usage\`: 文件描述符使用情况。</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">以jvm_memory_used_bytes为例</span></span>
<span class="line"><span style="color:#e1e4e8;">在Prometheus中，\`jvm_memory_used_bytes\` 指标通常有多个实例，每个实例代表不同的内存区域。以下是一些常见的内存区域及其对应的实例：</span></span>
<span class="line"><span style="color:#e1e4e8;">- \`jvm_memory_used_bytes{area=&quot;heap&quot;}\`：表示JVM堆内存使用量。</span></span>
<span class="line"><span style="color:#e1e4e8;">- \`jvm_memory_used_bytes{area=&quot;nonheap&quot;}\`：表示JVM非堆内存使用量。</span></span>
<span class="line"><span style="color:#e1e4e8;">- \`jvm_memory_used_bytes{area=&quot;codecache&quot;}\`：表示JVM代码缓存使用量。</span></span>
<span class="line"><span style="color:#e1e4e8;">- \`jvm_memory_used_bytes{area=&quot;metaspace&quot;}\`：表示JVM元空间使用量。</span></span>
<span class="line"><span style="color:#e1e4e8;">- \`jvm_memory_used_bytes{area=&quot;compressed_class_space&quot;}\`：表示JVM压缩类空间使用量。</span></span>
<span class="line"><span style="color:#e1e4e8;">- \`jvm_memory_used_bytes{area=&quot;thread_stack&quot;}\`：表示JVM线程堆栈使用量。</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">常用的jvm的Prometheus 指标示例：</span></span>
<span class="line"><span style="color:#24292e;">1. JVM内存指标：</span></span>
<span class="line"><span style="color:#24292e;">   - \`jvm_memory_used_bytes\`: JVM内存使用量。</span></span>
<span class="line"><span style="color:#24292e;">   - \`jvm_memory_max_bytes\`: JVM内存最大可用量。</span></span>
<span class="line"><span style="color:#24292e;">   - \`jvm_memory_committed_bytes\`: JVM内存已分配量。</span></span>
<span class="line"><span style="color:#24292e;">2. JVM线程指标：</span></span>
<span class="line"><span style="color:#24292e;">   - \`jvm_threads_current\`: 当前活动线程数。</span></span>
<span class="line"><span style="color:#24292e;">   - \`jvm_threads_daemon\`: 守护线程数。</span></span>
<span class="line"><span style="color:#24292e;">   - \`jvm_threads_peak\`: 峰值线程数。</span></span>
<span class="line"><span style="color:#24292e;">3. JVM垃圾回收指标：</span></span>
<span class="line"><span style="color:#24292e;">   - \`jvm_gc_collection_seconds\`: 垃圾回收的持续时间。</span></span>
<span class="line"><span style="color:#24292e;">   - \`jvm_gc_collection_count\`: 垃圾回收的次数。</span></span>
<span class="line"><span style="color:#24292e;">4. JVM类加载指标：</span></span>
<span class="line"><span style="color:#24292e;">   - \`jvm_classes_loaded\`: 已加载的类数量。</span></span>
<span class="line"><span style="color:#24292e;">   - \`jvm_classes_unloaded\`: 已卸载的类数量。</span></span>
<span class="line"><span style="color:#24292e;">5. JVM启动时间指标：</span></span>
<span class="line"><span style="color:#24292e;">   - \`jvm_uptime_seconds\`: JVM运行时间。</span></span>
<span class="line"><span style="color:#24292e;">6. JVM文件描述符指标：</span></span>
<span class="line"><span style="color:#24292e;">   - \`jvm_fd_usage\`: 文件描述符使用情况。</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">以jvm_memory_used_bytes为例</span></span>
<span class="line"><span style="color:#24292e;">在Prometheus中，\`jvm_memory_used_bytes\` 指标通常有多个实例，每个实例代表不同的内存区域。以下是一些常见的内存区域及其对应的实例：</span></span>
<span class="line"><span style="color:#24292e;">- \`jvm_memory_used_bytes{area=&quot;heap&quot;}\`：表示JVM堆内存使用量。</span></span>
<span class="line"><span style="color:#24292e;">- \`jvm_memory_used_bytes{area=&quot;nonheap&quot;}\`：表示JVM非堆内存使用量。</span></span>
<span class="line"><span style="color:#24292e;">- \`jvm_memory_used_bytes{area=&quot;codecache&quot;}\`：表示JVM代码缓存使用量。</span></span>
<span class="line"><span style="color:#24292e;">- \`jvm_memory_used_bytes{area=&quot;metaspace&quot;}\`：表示JVM元空间使用量。</span></span>
<span class="line"><span style="color:#24292e;">- \`jvm_memory_used_bytes{area=&quot;compressed_class_space&quot;}\`：表示JVM压缩类空间使用量。</span></span>
<span class="line"><span style="color:#24292e;">- \`jvm_memory_used_bytes{area=&quot;thread_stack&quot;}\`：表示JVM线程堆栈使用量。</span></span></code></pre></div>`,18),o=[e];function t(c,r,y,E,i,d){return a(),n("div",null,o)}const _=s(l,[["render",t]]);export{u as __pageData,_ as default};

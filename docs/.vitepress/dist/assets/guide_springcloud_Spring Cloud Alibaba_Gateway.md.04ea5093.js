import{_ as s,o as a,c as n,Q as l}from"./chunks/framework.8153c8a6.js";const g=JSON.parse('{"title":"gateway配置","description":"","frontmatter":{"title":"gateway配置","date":"2020-11-12T11:12:13.000Z"},"headers":[],"relativePath":"guide/springcloud/Spring Cloud Alibaba/Gateway.md","filePath":"guide/springcloud/Spring Cloud Alibaba/Gateway.md"}'),p={name:"guide/springcloud/Spring Cloud Alibaba/Gateway.md"},o=l(`<h3 id="介绍" tabindex="-1">介绍 <a class="header-anchor" href="#介绍" aria-label="Permalink to &quot;介绍&quot;">​</a></h3><p>gateway位于客户端与服务端之间，作为两者的中间层，可以实现监控、认证等功能</p><h4 id="实现方式" tabindex="-1">实现方式 <a class="header-anchor" href="#实现方式" aria-label="Permalink to &quot;实现方式&quot;">​</a></h4><p>主要是通过过滤器对请求进行过滤然后实现 添加的 功能，最后转发路由到其它微服务</p><p>注：gateway存在很多的内置过滤器，下面只举例对path的过滤器</p><h5 id="添加依赖" tabindex="-1">添加依赖 <a class="header-anchor" href="#添加依赖" aria-label="Permalink to &quot;添加依赖&quot;">​</a></h5><div class="language-xml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">xml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">dependency</span><span style="color:#E1E4E8;">&gt;    </span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">groupId</span><span style="color:#E1E4E8;">&gt;org.springframework.cloud&lt;/</span><span style="color:#85E89D;">groupId</span><span style="color:#E1E4E8;">&gt;    </span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">artifactId</span><span style="color:#E1E4E8;">&gt;spring-cloud-starter-gateway&lt;/</span><span style="color:#85E89D;">artifactId</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">dependency</span><span style="color:#E1E4E8;">&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">dependency</span><span style="color:#24292E;">&gt;    </span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">groupId</span><span style="color:#24292E;">&gt;org.springframework.cloud&lt;/</span><span style="color:#22863A;">groupId</span><span style="color:#24292E;">&gt;    </span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">artifactId</span><span style="color:#24292E;">&gt;spring-cloud-starter-gateway&lt;/</span><span style="color:#22863A;">artifactId</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">dependency</span><span style="color:#24292E;">&gt;</span></span></code></pre></div><h5 id="xml配置方式" tabindex="-1">xml配置方式 <a class="header-anchor" href="#xml配置方式" aria-label="Permalink to &quot;xml配置方式&quot;">​</a></h5><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#85E89D;">spring</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">cloud</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">gateway</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">routes</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">      	  </span><span style="color:#6A737D;">#可任意定义，不能重复，route的id</span></span>
<span class="line"><span style="color:#E1E4E8;">        - </span><span style="color:#85E89D;">id</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">routeid</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#6A737D;">#要跳转的路径</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">uri</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">https://simplemw.gitee.io/blog/</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#6A737D;">#断言 返回的是true和false</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">predicates</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">          	</span><span style="color:#6A737D;">#配置gateway的过滤器以及过滤条件将结果返回给predicates</span></span>
<span class="line"><span style="color:#E1E4E8;">            - </span><span style="color:#9ECBFF;">Path=/blog</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#22863A;">spring</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">cloud</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">gateway</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">routes</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      	  </span><span style="color:#6A737D;">#可任意定义，不能重复，route的id</span></span>
<span class="line"><span style="color:#24292E;">        - </span><span style="color:#22863A;">id</span><span style="color:#24292E;">: </span><span style="color:#032F62;">routeid</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#6A737D;">#要跳转的路径</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">uri</span><span style="color:#24292E;">: </span><span style="color:#032F62;">https://simplemw.gitee.io/blog/</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#6A737D;">#断言 返回的是true和false</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">predicates</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">          	</span><span style="color:#6A737D;">#配置gateway的过滤器以及过滤条件将结果返回给predicates</span></span>
<span class="line"><span style="color:#24292E;">            - </span><span style="color:#032F62;">Path=/blog</span></span></code></pre></div><p>遇到的坑：</p><p>使用路径过滤器的，必须满足转发前的路径和转发后的路径 最后一层url都一样</p><p>如 localhost:8080/blog 就会跳转 <a href="https://simplemw.gitee.io/blog/" target="_blank" rel="noreferrer">https://simplemw.gitee.io/blog/</a></p><h5 id="配置类配置方式" tabindex="-1">配置类配置方式 <a class="header-anchor" href="#配置类配置方式" aria-label="Permalink to &quot;配置类配置方式&quot;">​</a></h5><p>可以写在启动类中</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">@</span><span style="color:#F97583;">SpringBootApplication</span></span>
<span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">gatewayApplication</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">    /**</span></span>
<span class="line"><span style="color:#6A737D;">     * 启动器</span></span>
<span class="line"><span style="color:#6A737D;">     * </span><span style="color:#F97583;">@param</span><span style="color:#6A737D;"> </span><span style="color:#FFAB70;">args</span></span>
<span class="line"><span style="color:#6A737D;">     */</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">static</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">main</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">String</span><span style="color:#E1E4E8;">[] </span><span style="color:#FFAB70;">args</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        SpringApplication.</span><span style="color:#B392F0;">run</span><span style="color:#E1E4E8;">(gatewayApplication.class,args);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">    /**</span></span>
<span class="line"><span style="color:#6A737D;">     * gateway过滤器配置</span></span>
<span class="line"><span style="color:#6A737D;">     * </span><span style="color:#F97583;">@param</span><span style="color:#6A737D;"> </span><span style="color:#FFAB70;">builder</span></span>
<span class="line"><span style="color:#6A737D;">     * </span><span style="color:#F97583;">@return</span></span>
<span class="line"><span style="color:#6A737D;">     */</span></span>
<span class="line"><span style="color:#E1E4E8;">    @</span><span style="color:#F97583;">Bean</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> RouteLocator </span><span style="color:#B392F0;">customRouteLocator</span><span style="color:#E1E4E8;">(RouteLocatorBuilder </span><span style="color:#FFAB70;">builder</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> builder.</span><span style="color:#B392F0;">routes</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#E1E4E8;">            	</span><span style="color:#6A737D;">//此处可以写多个过滤器</span></span>
<span class="line"><span style="color:#E1E4E8;">                .</span><span style="color:#B392F0;">route</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;route&quot;</span><span style="color:#E1E4E8;">, r </span><span style="color:#F97583;">-&gt;</span><span style="color:#E1E4E8;"> r.</span><span style="color:#B392F0;">path</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;/blog&quot;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">                        .</span><span style="color:#B392F0;">uri</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;https://simplemw.gitee.io/blog/&quot;</span><span style="color:#E1E4E8;">))</span></span>
<span class="line"><span style="color:#E1E4E8;">                .</span><span style="color:#B392F0;">route</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;route1&quot;</span><span style="color:#E1E4E8;">, r </span><span style="color:#F97583;">-&gt;</span><span style="color:#E1E4E8;"> r.</span><span style="color:#B392F0;">path</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;/spring-cloud&quot;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">                        .</span><span style="color:#B392F0;">uri</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;https://spring.io/projects/spring-cloud&quot;</span><span style="color:#E1E4E8;">))</span></span>
<span class="line"><span style="color:#E1E4E8;">                .</span><span style="color:#B392F0;">build</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">@</span><span style="color:#D73A49;">SpringBootApplication</span></span>
<span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">gatewayApplication</span><span style="color:#24292E;"> {</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">    /**</span></span>
<span class="line"><span style="color:#6A737D;">     * 启动器</span></span>
<span class="line"><span style="color:#6A737D;">     * </span><span style="color:#D73A49;">@param</span><span style="color:#6A737D;"> </span><span style="color:#E36209;">args</span></span>
<span class="line"><span style="color:#6A737D;">     */</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">static</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">main</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">String</span><span style="color:#24292E;">[] </span><span style="color:#E36209;">args</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        SpringApplication.</span><span style="color:#6F42C1;">run</span><span style="color:#24292E;">(gatewayApplication.class,args);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">    /**</span></span>
<span class="line"><span style="color:#6A737D;">     * gateway过滤器配置</span></span>
<span class="line"><span style="color:#6A737D;">     * </span><span style="color:#D73A49;">@param</span><span style="color:#6A737D;"> </span><span style="color:#E36209;">builder</span></span>
<span class="line"><span style="color:#6A737D;">     * </span><span style="color:#D73A49;">@return</span></span>
<span class="line"><span style="color:#6A737D;">     */</span></span>
<span class="line"><span style="color:#24292E;">    @</span><span style="color:#D73A49;">Bean</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> RouteLocator </span><span style="color:#6F42C1;">customRouteLocator</span><span style="color:#24292E;">(RouteLocatorBuilder </span><span style="color:#E36209;">builder</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> builder.</span><span style="color:#6F42C1;">routes</span><span style="color:#24292E;">()</span></span>
<span class="line"><span style="color:#24292E;">            	</span><span style="color:#6A737D;">//此处可以写多个过滤器</span></span>
<span class="line"><span style="color:#24292E;">                .</span><span style="color:#6F42C1;">route</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;route&quot;</span><span style="color:#24292E;">, r </span><span style="color:#D73A49;">-&gt;</span><span style="color:#24292E;"> r.</span><span style="color:#6F42C1;">path</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;/blog&quot;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">                        .</span><span style="color:#6F42C1;">uri</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;https://simplemw.gitee.io/blog/&quot;</span><span style="color:#24292E;">))</span></span>
<span class="line"><span style="color:#24292E;">                .</span><span style="color:#6F42C1;">route</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;route1&quot;</span><span style="color:#24292E;">, r </span><span style="color:#D73A49;">-&gt;</span><span style="color:#24292E;"> r.</span><span style="color:#6F42C1;">path</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;/spring-cloud&quot;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">                        .</span><span style="color:#6F42C1;">uri</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;https://spring.io/projects/spring-cloud&quot;</span><span style="color:#24292E;">))</span></span>
<span class="line"><span style="color:#24292E;">                .</span><span style="color:#6F42C1;">build</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>转发其它服务方式</p><div class="language-YML vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">YML</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#85E89D;">spring</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">cloud</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">gateway</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">routes</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">#可任意定义，不能重复，route的id</span></span>
<span class="line"><span style="color:#E1E4E8;">        - </span><span style="color:#85E89D;">id</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">demo</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#6A737D;">#要跳转的微服务为demo</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">uri</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">lb://demo</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#6A737D;">#断言 返回的是true和false</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">predicates</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#6A737D;">#配置gateway的过滤器以及过滤条件将结果返回给predicates</span></span>
<span class="line"><span style="color:#E1E4E8;">            - </span><span style="color:#9ECBFF;">Path=/demo/*</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">filters</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">            - </span><span style="color:#9ECBFF;">StripPrefix=1</span></span>
<span class="line"><span style="color:#E1E4E8;">        - </span><span style="color:#85E89D;">id</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">demo1</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#6A737D;">#要跳转的微服务为demo1</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">uri</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">lb://demo1</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#6A737D;">#断言 返回的是true和false</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">predicates</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#6A737D;">#配置gateway的过滤器以及过滤条件将结果返回给predicates</span></span>
<span class="line"><span style="color:#E1E4E8;">            - </span><span style="color:#9ECBFF;">Path=/demo1/*</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">filters</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">            - </span><span style="color:#9ECBFF;">StripPrefix=1</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#22863A;">spring</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">cloud</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">gateway</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">routes</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">#可任意定义，不能重复，route的id</span></span>
<span class="line"><span style="color:#24292E;">        - </span><span style="color:#22863A;">id</span><span style="color:#24292E;">: </span><span style="color:#032F62;">demo</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#6A737D;">#要跳转的微服务为demo</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">uri</span><span style="color:#24292E;">: </span><span style="color:#032F62;">lb://demo</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#6A737D;">#断言 返回的是true和false</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">predicates</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6A737D;">#配置gateway的过滤器以及过滤条件将结果返回给predicates</span></span>
<span class="line"><span style="color:#24292E;">            - </span><span style="color:#032F62;">Path=/demo/*</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">filters</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">            - </span><span style="color:#032F62;">StripPrefix=1</span></span>
<span class="line"><span style="color:#24292E;">        - </span><span style="color:#22863A;">id</span><span style="color:#24292E;">: </span><span style="color:#032F62;">demo1</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#6A737D;">#要跳转的微服务为demo1</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">uri</span><span style="color:#24292E;">: </span><span style="color:#032F62;">lb://demo1</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#6A737D;">#断言 返回的是true和false</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">predicates</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6A737D;">#配置gateway的过滤器以及过滤条件将结果返回给predicates</span></span>
<span class="line"><span style="color:#24292E;">            - </span><span style="color:#032F62;">Path=/demo1/*</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">filters</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">            - </span><span style="color:#032F62;">StripPrefix=1</span></span></code></pre></div><p>可配合Eureka或者nacos服务注册发现</p>`,18),e=[o];function t(c,r,E,y,i,d){return a(),n("div",null,e)}const A=s(p,[["render",t]]);export{g as __pageData,A as default};

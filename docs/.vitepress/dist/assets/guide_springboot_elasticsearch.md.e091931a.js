import{_ as s,o as n,c as a,Q as l}from"./chunks/framework.8153c8a6.js";const d=JSON.parse('{"title":"elasticsearch","description":"","frontmatter":{"title":"elasticsearch","date":"2023-03-10T18:12:13.000Z"},"headers":[],"relativePath":"guide/springboot/elasticsearch.md","filePath":"guide/springboot/elasticsearch.md"}'),p={name:"guide/springboot/elasticsearch.md"},o=l(`<h4 id="下载和安装" tabindex="-1">下载和安装 <a class="header-anchor" href="#下载和安装" aria-label="Permalink to &quot;下载和安装&quot;">​</a></h4><ul><li><p>官网下载</p><ul><li>docker 下载</li></ul><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">docker</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">pull</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">docker.elastic.co/elasticsearch/elasticsearch:8.4.3</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">docker</span><span style="color:#24292E;"> </span><span style="color:#032F62;">pull</span><span style="color:#24292E;"> </span><span style="color:#032F62;">docker.elastic.co/elasticsearch/elasticsearch:8.4.3</span></span></code></pre></div><ul><li>启动</li></ul><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">docker run </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">d </span><span style="color:#F97583;">--</span><span style="color:#E1E4E8;">name es </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">p </span><span style="color:#79B8FF;">9200</span><span style="color:#F97583;">:</span><span style="color:#79B8FF;">9200</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">p </span><span style="color:#79B8FF;">9300</span><span style="color:#F97583;">:</span><span style="color:#79B8FF;">9300</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">e </span><span style="color:#9ECBFF;">&quot;discovery.type=single-node&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">e </span><span style="color:#9ECBFF;">&quot;ES_JAVA_OPTS=-Xms512m -Xmx512m&quot;</span><span style="color:#E1E4E8;">  ce2b9dc7fe85</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">docker run </span><span style="color:#D73A49;">-</span><span style="color:#24292E;">d </span><span style="color:#D73A49;">--</span><span style="color:#24292E;">name es </span><span style="color:#D73A49;">-</span><span style="color:#24292E;">p </span><span style="color:#005CC5;">9200</span><span style="color:#D73A49;">:</span><span style="color:#005CC5;">9200</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">-</span><span style="color:#24292E;">p </span><span style="color:#005CC5;">9300</span><span style="color:#D73A49;">:</span><span style="color:#005CC5;">9300</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">-</span><span style="color:#24292E;">e </span><span style="color:#032F62;">&quot;discovery.type=single-node&quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">-</span><span style="color:#24292E;">e </span><span style="color:#032F62;">&quot;ES_JAVA_OPTS=-Xms512m -Xmx512m&quot;</span><span style="color:#24292E;">  ce2b9dc7fe85</span></span></code></pre></div></li><li><p>设置相关参数</p><ul><li>设置跨域以及ip地址</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">http.cors.enabled: true</span></span>
<span class="line"><span style="color:#e1e4e8;">http.cors.allow-origin: &quot;*&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">network.host: 127.0.0.1</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">http.cors.enabled: true</span></span>
<span class="line"><span style="color:#24292e;">http.cors.allow-origin: &quot;*&quot;</span></span>
<span class="line"><span style="color:#24292e;">network.host: 127.0.0.1</span></span></code></pre></div><ul><li>设置用户名和密码</li></ul><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#79B8FF;">.</span><span style="color:#E1E4E8;">\\elasticsearch-reset-password </span><span style="color:#79B8FF;">--username</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">elastic</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-i</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#005CC5;">.</span><span style="color:#24292E;">\\elasticsearch-reset-password </span><span style="color:#005CC5;">--username</span><span style="color:#24292E;"> </span><span style="color:#032F62;">elastic</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-i</span></span></code></pre></div></li></ul><h4 id="常见的restful请求操作" tabindex="-1">常见的Restful请求操作 <a class="header-anchor" href="#常见的restful请求操作" aria-label="Permalink to &quot;常见的Restful请求操作&quot;">​</a></h4><h5 id="名词解释" tabindex="-1">名词解释 <a class="header-anchor" href="#名词解释" aria-label="Permalink to &quot;名词解释&quot;">​</a></h5><ul><li><p>索引(相当于mysql的数据库)</p></li><li><p>类型(相当于mysql的表)</p></li><li><p>文档(相当于mysql的行)</p></li><li><p>字段(相当于mysql的列)</p></li><li><p>相关restful请求接口</p></li><li><p>新增 PUT</p><ul><li>索引 article</li><li>4个分片 1个副本</li></ul></li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">http://127.0.0.1:9200/article</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">{</span></span>
<span class="line"><span style="color:#e1e4e8;">	&quot;settings&quot;: {</span></span>
<span class="line"><span style="color:#e1e4e8;">		&quot;number_of_shards&quot;: &quot;4&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">		&quot;number_of_replicas&quot;: &quot;1&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">	},</span></span>
<span class="line"><span style="color:#e1e4e8;">	&quot;mappings&quot;: {</span></span>
<span class="line"><span style="color:#e1e4e8;">		&quot;properties&quot;: {</span></span>
<span class="line"><span style="color:#e1e4e8;">			&quot;id&quot;: {</span></span>
<span class="line"><span style="color:#e1e4e8;">				&quot;type&quot;: &quot;long&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">				&quot;store&quot;: true</span></span>
<span class="line"><span style="color:#e1e4e8;">			},</span></span>
<span class="line"><span style="color:#e1e4e8;">			&quot;title&quot;: {</span></span>
<span class="line"><span style="color:#e1e4e8;">				&quot;type&quot;: &quot;text&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">				&quot;store&quot;: true,</span></span>
<span class="line"><span style="color:#e1e4e8;">				&quot;index&quot;: true,</span></span>
<span class="line"><span style="color:#e1e4e8;">				&quot;analyzer&quot;: &quot;standard&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">			},</span></span>
<span class="line"><span style="color:#e1e4e8;">			&quot;content&quot;: {</span></span>
<span class="line"><span style="color:#e1e4e8;">				&quot;type&quot;: &quot;text&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">				&quot;store&quot;: true,</span></span>
<span class="line"><span style="color:#e1e4e8;">				&quot;index&quot;: true,</span></span>
<span class="line"><span style="color:#e1e4e8;">				&quot;analyzer&quot;: &quot;standard&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">			}</span></span>
<span class="line"><span style="color:#e1e4e8;">		}</span></span>
<span class="line"><span style="color:#e1e4e8;">	}</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">http://127.0.0.1:9200/article</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">{</span></span>
<span class="line"><span style="color:#24292e;">	&quot;settings&quot;: {</span></span>
<span class="line"><span style="color:#24292e;">		&quot;number_of_shards&quot;: &quot;4&quot;,</span></span>
<span class="line"><span style="color:#24292e;">		&quot;number_of_replicas&quot;: &quot;1&quot;</span></span>
<span class="line"><span style="color:#24292e;">	},</span></span>
<span class="line"><span style="color:#24292e;">	&quot;mappings&quot;: {</span></span>
<span class="line"><span style="color:#24292e;">		&quot;properties&quot;: {</span></span>
<span class="line"><span style="color:#24292e;">			&quot;id&quot;: {</span></span>
<span class="line"><span style="color:#24292e;">				&quot;type&quot;: &quot;long&quot;,</span></span>
<span class="line"><span style="color:#24292e;">				&quot;store&quot;: true</span></span>
<span class="line"><span style="color:#24292e;">			},</span></span>
<span class="line"><span style="color:#24292e;">			&quot;title&quot;: {</span></span>
<span class="line"><span style="color:#24292e;">				&quot;type&quot;: &quot;text&quot;,</span></span>
<span class="line"><span style="color:#24292e;">				&quot;store&quot;: true,</span></span>
<span class="line"><span style="color:#24292e;">				&quot;index&quot;: true,</span></span>
<span class="line"><span style="color:#24292e;">				&quot;analyzer&quot;: &quot;standard&quot;</span></span>
<span class="line"><span style="color:#24292e;">			},</span></span>
<span class="line"><span style="color:#24292e;">			&quot;content&quot;: {</span></span>
<span class="line"><span style="color:#24292e;">				&quot;type&quot;: &quot;text&quot;,</span></span>
<span class="line"><span style="color:#24292e;">				&quot;store&quot;: true,</span></span>
<span class="line"><span style="color:#24292e;">				&quot;index&quot;: true,</span></span>
<span class="line"><span style="color:#24292e;">				&quot;analyzer&quot;: &quot;standard&quot;</span></span>
<span class="line"><span style="color:#24292e;">			}</span></span>
<span class="line"><span style="color:#24292e;">		}</span></span>
<span class="line"><span style="color:#24292e;">	}</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><ul><li>新增数据 mappings</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">put http://127.0.0.1:9200/article/_mappings</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">{</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;mappings&quot;:{</span></span>
<span class="line"><span style="color:#e1e4e8;">        &quot;properties&quot;:{</span></span>
<span class="line"><span style="color:#e1e4e8;">            &quot;id&quot;:{</span></span>
<span class="line"><span style="color:#e1e4e8;">                &quot;type&quot;:&quot;long&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">                &quot;store&quot;:true</span></span>
<span class="line"><span style="color:#e1e4e8;">            },</span></span>
<span class="line"><span style="color:#e1e4e8;">            &quot;title&quot;:{</span></span>
<span class="line"><span style="color:#e1e4e8;">                &quot;type&quot;:&quot;text&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">                &quot;store&quot;:true,</span></span>
<span class="line"><span style="color:#e1e4e8;">                &quot;index&quot;:true,</span></span>
<span class="line"><span style="color:#e1e4e8;">                &quot;analyzer&quot;:&quot;standard&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">            },</span></span>
<span class="line"><span style="color:#e1e4e8;">            &quot;content&quot;:{</span></span>
<span class="line"><span style="color:#e1e4e8;">                &quot;type&quot;:&quot;text&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">                &quot;store&quot;:true,</span></span>
<span class="line"><span style="color:#e1e4e8;">                &quot;index&quot;:true,</span></span>
<span class="line"><span style="color:#e1e4e8;">                &quot;analyzer&quot;:&quot;standard&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">            }</span></span>
<span class="line"><span style="color:#e1e4e8;">        }</span></span>
<span class="line"><span style="color:#e1e4e8;">    }</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">put http://127.0.0.1:9200/article/_mappings</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">{</span></span>
<span class="line"><span style="color:#24292e;">    &quot;mappings&quot;:{</span></span>
<span class="line"><span style="color:#24292e;">        &quot;properties&quot;:{</span></span>
<span class="line"><span style="color:#24292e;">            &quot;id&quot;:{</span></span>
<span class="line"><span style="color:#24292e;">                &quot;type&quot;:&quot;long&quot;,</span></span>
<span class="line"><span style="color:#24292e;">                &quot;store&quot;:true</span></span>
<span class="line"><span style="color:#24292e;">            },</span></span>
<span class="line"><span style="color:#24292e;">            &quot;title&quot;:{</span></span>
<span class="line"><span style="color:#24292e;">                &quot;type&quot;:&quot;text&quot;,</span></span>
<span class="line"><span style="color:#24292e;">                &quot;store&quot;:true,</span></span>
<span class="line"><span style="color:#24292e;">                &quot;index&quot;:true,</span></span>
<span class="line"><span style="color:#24292e;">                &quot;analyzer&quot;:&quot;standard&quot;</span></span>
<span class="line"><span style="color:#24292e;">            },</span></span>
<span class="line"><span style="color:#24292e;">            &quot;content&quot;:{</span></span>
<span class="line"><span style="color:#24292e;">                &quot;type&quot;:&quot;text&quot;,</span></span>
<span class="line"><span style="color:#24292e;">                &quot;store&quot;:true,</span></span>
<span class="line"><span style="color:#24292e;">                &quot;index&quot;:true,</span></span>
<span class="line"><span style="color:#24292e;">                &quot;analyzer&quot;:&quot;standard&quot;</span></span>
<span class="line"><span style="color:#24292e;">            }</span></span>
<span class="line"><span style="color:#24292e;">        }</span></span>
<span class="line"><span style="color:#24292e;">    }</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><ul><li>查询GET</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">http://localhost:9200/_cat/indices   //查询当前所有的索引</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">http://localhost:9200/_cat/indices   //查询当前所有的索引</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">http://127.0.0.1:9200/article/_mappings   //查询索引详情</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">http://127.0.0.1:9200/article/_mappings   //查询索引详情</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">http://localhost:9200/article/_search     //查询内容</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">{</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;query&quot;: {</span></span>
<span class="line"><span style="color:#e1e4e8;">        &quot;query_string&quot;: {</span></span>
<span class="line"><span style="color:#e1e4e8;">            &quot;query&quot;: &quot;message1&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">        }</span></span>
<span class="line"><span style="color:#e1e4e8;">    },</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;size&quot;: 10,</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;from&quot;: 0,</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;sort&quot;: []</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">http://localhost:9200/article/_search     //查询内容</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">{</span></span>
<span class="line"><span style="color:#24292e;">    &quot;query&quot;: {</span></span>
<span class="line"><span style="color:#24292e;">        &quot;query_string&quot;: {</span></span>
<span class="line"><span style="color:#24292e;">            &quot;query&quot;: &quot;message1&quot;</span></span>
<span class="line"><span style="color:#24292e;">        }</span></span>
<span class="line"><span style="color:#24292e;">    },</span></span>
<span class="line"><span style="color:#24292e;">    &quot;size&quot;: 10,</span></span>
<span class="line"><span style="color:#24292e;">    &quot;from&quot;: 0,</span></span>
<span class="line"><span style="color:#24292e;">    &quot;sort&quot;: []</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">{</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;query&quot;: {</span></span>
<span class="line"><span style="color:#e1e4e8;">        &quot;match&quot;: {</span></span>
<span class="line"><span style="color:#e1e4e8;">            &quot;content&quot;: &quot;仙人&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">        }</span></span>
<span class="line"><span style="color:#e1e4e8;">    },</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;size&quot;: 10,</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;from&quot;: 0,</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;sort&quot;: []</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">{</span></span>
<span class="line"><span style="color:#24292e;">    &quot;query&quot;: {</span></span>
<span class="line"><span style="color:#24292e;">        &quot;match&quot;: {</span></span>
<span class="line"><span style="color:#24292e;">            &quot;content&quot;: &quot;仙人&quot;</span></span>
<span class="line"><span style="color:#24292e;">        }</span></span>
<span class="line"><span style="color:#24292e;">    },</span></span>
<span class="line"><span style="color:#24292e;">    &quot;size&quot;: 10,</span></span>
<span class="line"><span style="color:#24292e;">    &quot;from&quot;: 0,</span></span>
<span class="line"><span style="color:#24292e;">    &quot;sort&quot;: []</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><ul><li>删除 DELETE</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">localhost:9200/article?pretty</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">localhost:9200/article?pretty</span></span></code></pre></div><ul><li>传入数据</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">localhost:9200/articl/_doc</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">{</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;id&quot;:1,</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;title&quot;:&quot;标题&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;content&quot;:&quot;内容&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">localhost:9200/articl/_doc</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">{</span></span>
<span class="line"><span style="color:#24292e;">    &quot;id&quot;:1,</span></span>
<span class="line"><span style="color:#24292e;">    &quot;title&quot;:&quot;标题&quot;,</span></span>
<span class="line"><span style="color:#24292e;">    &quot;content&quot;:&quot;内容&quot;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><ul><li>查询文档</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">POST http://localhost:9200/article/_search?q=title:标题</span></span>
<span class="line"><span style="color:#e1e4e8;">{</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;size&quot;:10,</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;from&quot;:0,</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;_source&quot;:[&quot;title&quot;,&quot;content&quot;],</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;sort&quot;:[</span></span>
<span class="line"><span style="color:#e1e4e8;">        {</span></span>
<span class="line"><span style="color:#e1e4e8;">            &quot;id&quot;:&quot;desc&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">        }</span></span>
<span class="line"><span style="color:#e1e4e8;">    ]</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">POST http://localhost:9200/article/_search?q=title:标题</span></span>
<span class="line"><span style="color:#24292e;">{</span></span>
<span class="line"><span style="color:#24292e;">    &quot;size&quot;:10,</span></span>
<span class="line"><span style="color:#24292e;">    &quot;from&quot;:0,</span></span>
<span class="line"><span style="color:#24292e;">    &quot;_source&quot;:[&quot;title&quot;,&quot;content&quot;],</span></span>
<span class="line"><span style="color:#24292e;">    &quot;sort&quot;:[</span></span>
<span class="line"><span style="color:#24292e;">        {</span></span>
<span class="line"><span style="color:#24292e;">            &quot;id&quot;:&quot;desc&quot;</span></span>
<span class="line"><span style="color:#24292e;">        }</span></span>
<span class="line"><span style="color:#24292e;">    ]</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><h4 id="简单整合" tabindex="-1">简单整合 <a class="header-anchor" href="#简单整合" aria-label="Permalink to &quot;简单整合&quot;">​</a></h4><ul><li>依赖</li></ul><div class="language-xml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">xml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">dependency</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">groupId</span><span style="color:#E1E4E8;">&gt;org.springframework.boot&lt;/</span><span style="color:#85E89D;">groupId</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">artifactId</span><span style="color:#E1E4E8;">&gt;spring-boot-starter-data-elasticsearch&lt;/</span><span style="color:#85E89D;">artifactId</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">dependency</span><span style="color:#E1E4E8;">&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">dependency</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">groupId</span><span style="color:#24292E;">&gt;org.springframework.boot&lt;/</span><span style="color:#22863A;">groupId</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">artifactId</span><span style="color:#24292E;">&gt;spring-boot-starter-data-elasticsearch&lt;/</span><span style="color:#22863A;">artifactId</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">dependency</span><span style="color:#24292E;">&gt;</span></span></code></pre></div><ul><li>配置</li></ul><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#85E89D;">spring</span><span style="color:#E1E4E8;">:         </span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">elasticsearch</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">rest</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">uris</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">localhost:9200</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#22863A;">spring</span><span style="color:#24292E;">:         </span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">elasticsearch</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">rest</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">uris</span><span style="color:#24292E;">: </span><span style="color:#032F62;">localhost:9200</span></span></code></pre></div><ul><li>映射实体类</li></ul><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">@</span><span style="color:#F97583;">Data</span></span>
<span class="line"><span style="color:#E1E4E8;">@</span><span style="color:#F97583;">Document</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">indexName</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;article&quot;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Article</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    @</span><span style="color:#F97583;">Id</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">private</span><span style="color:#E1E4E8;"> String id;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">private</span><span style="color:#E1E4E8;"> String title;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">private</span><span style="color:#E1E4E8;"> String content;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">@</span><span style="color:#D73A49;">Data</span></span>
<span class="line"><span style="color:#24292E;">@</span><span style="color:#D73A49;">Document</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">indexName</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;article&quot;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Article</span><span style="color:#24292E;"> {</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    @</span><span style="color:#D73A49;">Id</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">private</span><span style="color:#24292E;"> String id;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">private</span><span style="color:#24292E;"> String title;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">private</span><span style="color:#24292E;"> String content;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><ul><li>接口映射 Repository</li></ul><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">@</span><span style="color:#F97583;">Repository</span></span>
<span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">interface</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">ArticleRepository</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">extends</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">ElasticsearchRepository</span><span style="color:#E1E4E8;">&lt;</span><span style="color:#F97583;">Article</span><span style="color:#E1E4E8;">,</span><span style="color:#F97583;">String</span><span style="color:#E1E4E8;">&gt; {</span></span>
<span class="line"><span style="color:#E1E4E8;">    Iterable&lt;</span><span style="color:#F97583;">Article</span><span style="color:#E1E4E8;">&gt; </span><span style="color:#B392F0;">findByTitle</span><span style="color:#E1E4E8;">(String </span><span style="color:#FFAB70;">s</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    List&lt;</span><span style="color:#F97583;">Article</span><span style="color:#E1E4E8;">&gt; </span><span style="color:#B392F0;">findByContent</span><span style="color:#E1E4E8;">(String </span><span style="color:#FFAB70;">s</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">@</span><span style="color:#D73A49;">Repository</span></span>
<span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">interface</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">ArticleRepository</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">extends</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">ElasticsearchRepository</span><span style="color:#24292E;">&lt;</span><span style="color:#D73A49;">Article</span><span style="color:#24292E;">,</span><span style="color:#D73A49;">String</span><span style="color:#24292E;">&gt; {</span></span>
<span class="line"><span style="color:#24292E;">    Iterable&lt;</span><span style="color:#D73A49;">Article</span><span style="color:#24292E;">&gt; </span><span style="color:#6F42C1;">findByTitle</span><span style="color:#24292E;">(String </span><span style="color:#E36209;">s</span><span style="color:#24292E;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    List&lt;</span><span style="color:#D73A49;">Article</span><span style="color:#24292E;">&gt; </span><span style="color:#6F42C1;">findByContent</span><span style="color:#24292E;">(String </span><span style="color:#E36209;">s</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><ul><li>crud</li></ul><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">@</span><span style="color:#F97583;">Service</span></span>
<span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">DemoService</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    @</span><span style="color:#F97583;">Autowired</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">private</span><span style="color:#E1E4E8;"> ArticleRepository articleRepository;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">save</span><span style="color:#E1E4E8;">(){</span></span>
<span class="line"><span style="color:#E1E4E8;">        Article article </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Article</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">        article.</span><span style="color:#B392F0;">setId</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;1&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">        article.</span><span style="color:#B392F0;">setTitle</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;经乱离后天恩流夜郎忆旧游书怀赠江夏韦太守良宰&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">        article.</span><span style="color:#B392F0;">setContent</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;天上白玉京，十二楼五城。</span><span style="color:#79B8FF;">\\n</span><span style="color:#9ECBFF;">&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">+</span></span>
<span class="line"><span style="color:#E1E4E8;">                </span><span style="color:#9ECBFF;">&quot;仙人抚我顶，结发受长生。</span><span style="color:#79B8FF;">\\n</span><span style="color:#9ECBFF;">&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">+</span></span>
<span class="line"><span style="color:#E1E4E8;">                </span><span style="color:#9ECBFF;">&quot;误逐世间乐，颇穷理乱情。</span><span style="color:#79B8FF;">\\n</span><span style="color:#9ECBFF;">&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">+</span></span>
<span class="line"><span style="color:#E1E4E8;">                </span><span style="color:#9ECBFF;">&quot;九十六圣君，浮云挂空名。</span><span style="color:#79B8FF;">\\n</span><span style="color:#9ECBFF;">&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">+</span></span>
<span class="line"><span style="color:#E1E4E8;">                </span><span style="color:#9ECBFF;">&quot;天地赌一掷，未能忘战争。</span><span style="color:#79B8FF;">\\n</span><span style="color:#9ECBFF;">&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">+</span></span>
<span class="line"><span style="color:#E1E4E8;">                </span><span style="color:#9ECBFF;">&quot;试涉霸王略，将期轩冕荣。&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">        articleRepository.</span><span style="color:#B392F0;">save</span><span style="color:#E1E4E8;">(article);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">get</span><span style="color:#E1E4E8;">(){</span></span>
<span class="line"><span style="color:#E1E4E8;">        Iterable&lt;</span><span style="color:#F97583;">Article</span><span style="color:#E1E4E8;">&gt; all </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> articleRepository.</span><span style="color:#B392F0;">findAll</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">for</span><span style="color:#E1E4E8;"> (Article article</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;">all) {</span></span>
<span class="line"><span style="color:#E1E4E8;">            System.out.</span><span style="color:#B392F0;">println</span><span style="color:#E1E4E8;">(article.</span><span style="color:#B392F0;">toString</span><span style="color:#E1E4E8;">());</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">get1</span><span style="color:#E1E4E8;">(String </span><span style="color:#FFAB70;">message</span><span style="color:#E1E4E8;">){</span></span>
<span class="line"><span style="color:#E1E4E8;">        Iterable&lt;</span><span style="color:#F97583;">Article</span><span style="color:#E1E4E8;">&gt; all </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> articleRepository.</span><span style="color:#B392F0;">findByContent</span><span style="color:#E1E4E8;">(message);</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">for</span><span style="color:#E1E4E8;"> (Article article</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;">all) {</span></span>
<span class="line"><span style="color:#E1E4E8;">            System.out.</span><span style="color:#B392F0;">println</span><span style="color:#E1E4E8;">(article.</span><span style="color:#B392F0;">toString</span><span style="color:#E1E4E8;">());</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">update</span><span style="color:#E1E4E8;">(){</span></span>
<span class="line"><span style="color:#E1E4E8;">        Article article </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Article</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">        article.</span><span style="color:#B392F0;">setId</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;1&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">        article.</span><span style="color:#B392F0;">setTitle</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;这是我修改后的名称&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">        article.</span><span style="color:#B392F0;">setContent</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;这是我修改之后的内容&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">        articleRepository.</span><span style="color:#B392F0;">save</span><span style="color:#E1E4E8;">(article);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">delete</span><span style="color:#E1E4E8;">(){</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">//Article article = new Article();</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">//articleRepository.delete(article);</span></span>
<span class="line"><span style="color:#E1E4E8;">        articleRepository.</span><span style="color:#B392F0;">deleteByContent</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;白玉京&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">@</span><span style="color:#D73A49;">Service</span></span>
<span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">DemoService</span><span style="color:#24292E;"> {</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    @</span><span style="color:#D73A49;">Autowired</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">private</span><span style="color:#24292E;"> ArticleRepository articleRepository;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">save</span><span style="color:#24292E;">(){</span></span>
<span class="line"><span style="color:#24292E;">        Article article </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Article</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">        article.</span><span style="color:#6F42C1;">setId</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;1&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">        article.</span><span style="color:#6F42C1;">setTitle</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;经乱离后天恩流夜郎忆旧游书怀赠江夏韦太守良宰&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">        article.</span><span style="color:#6F42C1;">setContent</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;天上白玉京，十二楼五城。</span><span style="color:#005CC5;">\\n</span><span style="color:#032F62;">&quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">+</span></span>
<span class="line"><span style="color:#24292E;">                </span><span style="color:#032F62;">&quot;仙人抚我顶，结发受长生。</span><span style="color:#005CC5;">\\n</span><span style="color:#032F62;">&quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">+</span></span>
<span class="line"><span style="color:#24292E;">                </span><span style="color:#032F62;">&quot;误逐世间乐，颇穷理乱情。</span><span style="color:#005CC5;">\\n</span><span style="color:#032F62;">&quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">+</span></span>
<span class="line"><span style="color:#24292E;">                </span><span style="color:#032F62;">&quot;九十六圣君，浮云挂空名。</span><span style="color:#005CC5;">\\n</span><span style="color:#032F62;">&quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">+</span></span>
<span class="line"><span style="color:#24292E;">                </span><span style="color:#032F62;">&quot;天地赌一掷，未能忘战争。</span><span style="color:#005CC5;">\\n</span><span style="color:#032F62;">&quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">+</span></span>
<span class="line"><span style="color:#24292E;">                </span><span style="color:#032F62;">&quot;试涉霸王略，将期轩冕荣。&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">        articleRepository.</span><span style="color:#6F42C1;">save</span><span style="color:#24292E;">(article);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">get</span><span style="color:#24292E;">(){</span></span>
<span class="line"><span style="color:#24292E;">        Iterable&lt;</span><span style="color:#D73A49;">Article</span><span style="color:#24292E;">&gt; all </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> articleRepository.</span><span style="color:#6F42C1;">findAll</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">for</span><span style="color:#24292E;"> (Article article</span><span style="color:#D73A49;">:</span><span style="color:#24292E;">all) {</span></span>
<span class="line"><span style="color:#24292E;">            System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(article.</span><span style="color:#6F42C1;">toString</span><span style="color:#24292E;">());</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">get1</span><span style="color:#24292E;">(String </span><span style="color:#E36209;">message</span><span style="color:#24292E;">){</span></span>
<span class="line"><span style="color:#24292E;">        Iterable&lt;</span><span style="color:#D73A49;">Article</span><span style="color:#24292E;">&gt; all </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> articleRepository.</span><span style="color:#6F42C1;">findByContent</span><span style="color:#24292E;">(message);</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">for</span><span style="color:#24292E;"> (Article article</span><span style="color:#D73A49;">:</span><span style="color:#24292E;">all) {</span></span>
<span class="line"><span style="color:#24292E;">            System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(article.</span><span style="color:#6F42C1;">toString</span><span style="color:#24292E;">());</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">update</span><span style="color:#24292E;">(){</span></span>
<span class="line"><span style="color:#24292E;">        Article article </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Article</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">        article.</span><span style="color:#6F42C1;">setId</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;1&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">        article.</span><span style="color:#6F42C1;">setTitle</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;这是我修改后的名称&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">        article.</span><span style="color:#6F42C1;">setContent</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;这是我修改之后的内容&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">        articleRepository.</span><span style="color:#6F42C1;">save</span><span style="color:#24292E;">(article);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">delete</span><span style="color:#24292E;">(){</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">//Article article = new Article();</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">//articleRepository.delete(article);</span></span>
<span class="line"><span style="color:#24292E;">        articleRepository.</span><span style="color:#6F42C1;">deleteByContent</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;白玉京&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div>`,30),e=[o];function t(c,r,i,y,E,u){return n(),a("div",null,e)}const F=s(p,[["render",t]]);export{d as __pageData,F as default};

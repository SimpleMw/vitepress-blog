import{_ as s,o as n,c as a,Q as l}from"./chunks/framework.8153c8a6.js";const u=JSON.parse('{"title":"flowable新理解","description":"","frontmatter":{"title":"flowable新理解","date":"2023-05-24T18:12:13.000Z"},"headers":[],"relativePath":"guide/springboot/Flowable-new.md","filePath":"guide/springboot/Flowable-new.md"}'),p={name:"guide/springboot/Flowable-new.md"},o=l(`<h4 id="部分" tabindex="-1">部分 <a class="header-anchor" href="#部分" aria-label="Permalink to &quot;部分&quot;">​</a></h4><ul><li>流程</li><li>应用程序</li><li>任务</li></ul><p>注：</p><p>1.创建流程 -&gt; 创建应用程序 -&gt;开启任务 -&gt; 用户任务提交和完成</p><p>2.启动程序的时候会校验是否已经创建表，若不存在则会创建</p><p>3.创建流程的时候不止可以指定单人，也可以指定组</p><p>4.一个流程可以创建多个流程定义</p><h4 id="api相关" tabindex="-1">API相关 <a class="header-anchor" href="#api相关" aria-label="Permalink to &quot;API相关&quot;">​</a></h4><ul><li>ProcessEngine 管理整个流程引擎</li><li>RepositoryService 管理流程定义</li><li>RuntimeService 管理流程实例</li><li>TaskService 管理流程任务</li></ul><h4 id="整合" tabindex="-1">整合 <a class="header-anchor" href="#整合" aria-label="Permalink to &quot;整合&quot;">​</a></h4><ul><li>maven配置</li></ul><div class="language-xml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">xml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">parent</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">groupId</span><span style="color:#E1E4E8;">&gt;org.springframework.boot&lt;/</span><span style="color:#85E89D;">groupId</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">artifactId</span><span style="color:#E1E4E8;">&gt;spring-boot-starter-parent&lt;/</span><span style="color:#85E89D;">artifactId</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">version</span><span style="color:#E1E4E8;">&gt;2.6.2&lt;/</span><span style="color:#85E89D;">version</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">relativePath</span><span style="color:#E1E4E8;">/&gt; </span><span style="color:#6A737D;">&lt;!-- lookup parent from repository --&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">parent</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">dependencies</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">dependency</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">        &lt;</span><span style="color:#85E89D;">groupId</span><span style="color:#E1E4E8;">&gt;org.springframework.boot&lt;/</span><span style="color:#85E89D;">groupId</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">        &lt;</span><span style="color:#85E89D;">artifactId</span><span style="color:#E1E4E8;">&gt;spring-boot-starter-web&lt;/</span><span style="color:#85E89D;">artifactId</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;/</span><span style="color:#85E89D;">dependency</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">dependency</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">        &lt;</span><span style="color:#85E89D;">groupId</span><span style="color:#E1E4E8;">&gt;org.springframework.boot&lt;/</span><span style="color:#85E89D;">groupId</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">        &lt;</span><span style="color:#85E89D;">artifactId</span><span style="color:#E1E4E8;">&gt;spring-boot-starter-test&lt;/</span><span style="color:#85E89D;">artifactId</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;/</span><span style="color:#85E89D;">dependency</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">&lt;!-- 可以采用MySQL存储，也可以采用H2，看自己的需要 --&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">&lt;!--mysql驱动--&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">dependency</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">        &lt;</span><span style="color:#85E89D;">groupId</span><span style="color:#E1E4E8;">&gt;mysql&lt;/</span><span style="color:#85E89D;">groupId</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">        &lt;</span><span style="color:#85E89D;">artifactId</span><span style="color:#E1E4E8;">&gt;mysql-connector-java&lt;/</span><span style="color:#85E89D;">artifactId</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">        &lt;</span><span style="color:#85E89D;">version</span><span style="color:#E1E4E8;">&gt;8.0.18&lt;/</span><span style="color:#85E89D;">version</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;/</span><span style="color:#85E89D;">dependency</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">dependency</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">        &lt;</span><span style="color:#85E89D;">groupId</span><span style="color:#E1E4E8;">&gt;org.projectlombok&lt;/</span><span style="color:#85E89D;">groupId</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">        &lt;</span><span style="color:#85E89D;">artifactId</span><span style="color:#E1E4E8;">&gt;lombok&lt;/</span><span style="color:#85E89D;">artifactId</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">        &lt;</span><span style="color:#85E89D;">version</span><span style="color:#E1E4E8;">&gt;1.18.12&lt;/</span><span style="color:#85E89D;">version</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;/</span><span style="color:#85E89D;">dependency</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">&lt;!-- flowable --&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">dependency</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">        &lt;</span><span style="color:#85E89D;">groupId</span><span style="color:#E1E4E8;">&gt;org.flowable&lt;/</span><span style="color:#85E89D;">groupId</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">        &lt;</span><span style="color:#85E89D;">artifactId</span><span style="color:#E1E4E8;">&gt;flowable-spring-boot-starter&lt;/</span><span style="color:#85E89D;">artifactId</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">        &lt;</span><span style="color:#85E89D;">version</span><span style="color:#E1E4E8;">&gt;\${flowable.version}&lt;/</span><span style="color:#85E89D;">version</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;/</span><span style="color:#85E89D;">dependency</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">dependency</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">        &lt;</span><span style="color:#85E89D;">groupId</span><span style="color:#E1E4E8;">&gt;org.flowable&lt;/</span><span style="color:#85E89D;">groupId</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">        &lt;</span><span style="color:#85E89D;">artifactId</span><span style="color:#E1E4E8;">&gt;flowable-spring-boot-starter-ui-modeler&lt;/</span><span style="color:#85E89D;">artifactId</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">        &lt;</span><span style="color:#85E89D;">version</span><span style="color:#E1E4E8;">&gt;\${flowable.version}&lt;/</span><span style="color:#85E89D;">version</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;/</span><span style="color:#85E89D;">dependency</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">dependency</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">        &lt;</span><span style="color:#85E89D;">groupId</span><span style="color:#E1E4E8;">&gt;org.flowable&lt;/</span><span style="color:#85E89D;">groupId</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">        &lt;</span><span style="color:#85E89D;">artifactId</span><span style="color:#E1E4E8;">&gt;flowable-spring-boot-starter-ui-admin&lt;/</span><span style="color:#85E89D;">artifactId</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">        &lt;</span><span style="color:#85E89D;">version</span><span style="color:#E1E4E8;">&gt;\${flowable.version}&lt;/</span><span style="color:#85E89D;">version</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;/</span><span style="color:#85E89D;">dependency</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">dependency</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">        &lt;</span><span style="color:#85E89D;">groupId</span><span style="color:#E1E4E8;">&gt;org.flowable&lt;/</span><span style="color:#85E89D;">groupId</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">        &lt;</span><span style="color:#85E89D;">artifactId</span><span style="color:#E1E4E8;">&gt;flowable-spring-boot-starter-ui-idm&lt;/</span><span style="color:#85E89D;">artifactId</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">        &lt;</span><span style="color:#85E89D;">version</span><span style="color:#E1E4E8;">&gt;\${flowable.version}&lt;/</span><span style="color:#85E89D;">version</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;/</span><span style="color:#85E89D;">dependency</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">dependency</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">        &lt;</span><span style="color:#85E89D;">groupId</span><span style="color:#E1E4E8;">&gt;org.flowable&lt;/</span><span style="color:#85E89D;">groupId</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">        &lt;</span><span style="color:#85E89D;">artifactId</span><span style="color:#E1E4E8;">&gt;flowable-spring-boot-starter-ui-task&lt;/</span><span style="color:#85E89D;">artifactId</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">        &lt;</span><span style="color:#85E89D;">version</span><span style="color:#E1E4E8;">&gt;\${flowable.version}&lt;/</span><span style="color:#85E89D;">version</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;/</span><span style="color:#85E89D;">dependency</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">&lt;!-- Flowable 内部日志采用 SLF4J --&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">dependency</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">        &lt;</span><span style="color:#85E89D;">groupId</span><span style="color:#E1E4E8;">&gt;org.slf4j&lt;/</span><span style="color:#85E89D;">groupId</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">        &lt;</span><span style="color:#85E89D;">artifactId</span><span style="color:#E1E4E8;">&gt;slf4j-api&lt;/</span><span style="color:#85E89D;">artifactId</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;/</span><span style="color:#85E89D;">dependency</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">dependency</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">        &lt;</span><span style="color:#85E89D;">groupId</span><span style="color:#E1E4E8;">&gt;org.slf4j&lt;/</span><span style="color:#85E89D;">groupId</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">        &lt;</span><span style="color:#85E89D;">artifactId</span><span style="color:#E1E4E8;">&gt;slf4j-log4j12&lt;/</span><span style="color:#85E89D;">artifactId</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;/</span><span style="color:#85E89D;">dependency</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">&lt;!-- fastjson --&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">dependency</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">        &lt;</span><span style="color:#85E89D;">groupId</span><span style="color:#E1E4E8;">&gt;com.alibaba&lt;/</span><span style="color:#85E89D;">groupId</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">        &lt;</span><span style="color:#85E89D;">artifactId</span><span style="color:#E1E4E8;">&gt;fastjson&lt;/</span><span style="color:#85E89D;">artifactId</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">        &lt;</span><span style="color:#85E89D;">version</span><span style="color:#E1E4E8;">&gt;1.2.75&lt;/</span><span style="color:#85E89D;">version</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;/</span><span style="color:#85E89D;">dependency</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">dependencies</span><span style="color:#E1E4E8;">&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">parent</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">groupId</span><span style="color:#24292E;">&gt;org.springframework.boot&lt;/</span><span style="color:#22863A;">groupId</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">artifactId</span><span style="color:#24292E;">&gt;spring-boot-starter-parent&lt;/</span><span style="color:#22863A;">artifactId</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">version</span><span style="color:#24292E;">&gt;2.6.2&lt;/</span><span style="color:#22863A;">version</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">relativePath</span><span style="color:#24292E;">/&gt; </span><span style="color:#6A737D;">&lt;!-- lookup parent from repository --&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">parent</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">dependencies</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">dependency</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">        &lt;</span><span style="color:#22863A;">groupId</span><span style="color:#24292E;">&gt;org.springframework.boot&lt;/</span><span style="color:#22863A;">groupId</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">        &lt;</span><span style="color:#22863A;">artifactId</span><span style="color:#24292E;">&gt;spring-boot-starter-web&lt;/</span><span style="color:#22863A;">artifactId</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;/</span><span style="color:#22863A;">dependency</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">dependency</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">        &lt;</span><span style="color:#22863A;">groupId</span><span style="color:#24292E;">&gt;org.springframework.boot&lt;/</span><span style="color:#22863A;">groupId</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">        &lt;</span><span style="color:#22863A;">artifactId</span><span style="color:#24292E;">&gt;spring-boot-starter-test&lt;/</span><span style="color:#22863A;">artifactId</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;/</span><span style="color:#22863A;">dependency</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">&lt;!-- 可以采用MySQL存储，也可以采用H2，看自己的需要 --&gt;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">&lt;!--mysql驱动--&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">dependency</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">        &lt;</span><span style="color:#22863A;">groupId</span><span style="color:#24292E;">&gt;mysql&lt;/</span><span style="color:#22863A;">groupId</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">        &lt;</span><span style="color:#22863A;">artifactId</span><span style="color:#24292E;">&gt;mysql-connector-java&lt;/</span><span style="color:#22863A;">artifactId</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">        &lt;</span><span style="color:#22863A;">version</span><span style="color:#24292E;">&gt;8.0.18&lt;/</span><span style="color:#22863A;">version</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;/</span><span style="color:#22863A;">dependency</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">dependency</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">        &lt;</span><span style="color:#22863A;">groupId</span><span style="color:#24292E;">&gt;org.projectlombok&lt;/</span><span style="color:#22863A;">groupId</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">        &lt;</span><span style="color:#22863A;">artifactId</span><span style="color:#24292E;">&gt;lombok&lt;/</span><span style="color:#22863A;">artifactId</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">        &lt;</span><span style="color:#22863A;">version</span><span style="color:#24292E;">&gt;1.18.12&lt;/</span><span style="color:#22863A;">version</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;/</span><span style="color:#22863A;">dependency</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">&lt;!-- flowable --&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">dependency</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">        &lt;</span><span style="color:#22863A;">groupId</span><span style="color:#24292E;">&gt;org.flowable&lt;/</span><span style="color:#22863A;">groupId</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">        &lt;</span><span style="color:#22863A;">artifactId</span><span style="color:#24292E;">&gt;flowable-spring-boot-starter&lt;/</span><span style="color:#22863A;">artifactId</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">        &lt;</span><span style="color:#22863A;">version</span><span style="color:#24292E;">&gt;\${flowable.version}&lt;/</span><span style="color:#22863A;">version</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;/</span><span style="color:#22863A;">dependency</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">dependency</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">        &lt;</span><span style="color:#22863A;">groupId</span><span style="color:#24292E;">&gt;org.flowable&lt;/</span><span style="color:#22863A;">groupId</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">        &lt;</span><span style="color:#22863A;">artifactId</span><span style="color:#24292E;">&gt;flowable-spring-boot-starter-ui-modeler&lt;/</span><span style="color:#22863A;">artifactId</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">        &lt;</span><span style="color:#22863A;">version</span><span style="color:#24292E;">&gt;\${flowable.version}&lt;/</span><span style="color:#22863A;">version</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;/</span><span style="color:#22863A;">dependency</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">dependency</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">        &lt;</span><span style="color:#22863A;">groupId</span><span style="color:#24292E;">&gt;org.flowable&lt;/</span><span style="color:#22863A;">groupId</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">        &lt;</span><span style="color:#22863A;">artifactId</span><span style="color:#24292E;">&gt;flowable-spring-boot-starter-ui-admin&lt;/</span><span style="color:#22863A;">artifactId</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">        &lt;</span><span style="color:#22863A;">version</span><span style="color:#24292E;">&gt;\${flowable.version}&lt;/</span><span style="color:#22863A;">version</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;/</span><span style="color:#22863A;">dependency</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">dependency</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">        &lt;</span><span style="color:#22863A;">groupId</span><span style="color:#24292E;">&gt;org.flowable&lt;/</span><span style="color:#22863A;">groupId</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">        &lt;</span><span style="color:#22863A;">artifactId</span><span style="color:#24292E;">&gt;flowable-spring-boot-starter-ui-idm&lt;/</span><span style="color:#22863A;">artifactId</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">        &lt;</span><span style="color:#22863A;">version</span><span style="color:#24292E;">&gt;\${flowable.version}&lt;/</span><span style="color:#22863A;">version</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;/</span><span style="color:#22863A;">dependency</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">dependency</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">        &lt;</span><span style="color:#22863A;">groupId</span><span style="color:#24292E;">&gt;org.flowable&lt;/</span><span style="color:#22863A;">groupId</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">        &lt;</span><span style="color:#22863A;">artifactId</span><span style="color:#24292E;">&gt;flowable-spring-boot-starter-ui-task&lt;/</span><span style="color:#22863A;">artifactId</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">        &lt;</span><span style="color:#22863A;">version</span><span style="color:#24292E;">&gt;\${flowable.version}&lt;/</span><span style="color:#22863A;">version</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;/</span><span style="color:#22863A;">dependency</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">&lt;!-- Flowable 内部日志采用 SLF4J --&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">dependency</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">        &lt;</span><span style="color:#22863A;">groupId</span><span style="color:#24292E;">&gt;org.slf4j&lt;/</span><span style="color:#22863A;">groupId</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">        &lt;</span><span style="color:#22863A;">artifactId</span><span style="color:#24292E;">&gt;slf4j-api&lt;/</span><span style="color:#22863A;">artifactId</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;/</span><span style="color:#22863A;">dependency</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">dependency</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">        &lt;</span><span style="color:#22863A;">groupId</span><span style="color:#24292E;">&gt;org.slf4j&lt;/</span><span style="color:#22863A;">groupId</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">        &lt;</span><span style="color:#22863A;">artifactId</span><span style="color:#24292E;">&gt;slf4j-log4j12&lt;/</span><span style="color:#22863A;">artifactId</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;/</span><span style="color:#22863A;">dependency</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">&lt;!-- fastjson --&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">dependency</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">        &lt;</span><span style="color:#22863A;">groupId</span><span style="color:#24292E;">&gt;com.alibaba&lt;/</span><span style="color:#22863A;">groupId</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">        &lt;</span><span style="color:#22863A;">artifactId</span><span style="color:#24292E;">&gt;fastjson&lt;/</span><span style="color:#22863A;">artifactId</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">        &lt;</span><span style="color:#22863A;">version</span><span style="color:#24292E;">&gt;1.2.75&lt;/</span><span style="color:#22863A;">version</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;/</span><span style="color:#22863A;">dependency</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">dependencies</span><span style="color:#24292E;">&gt;</span></span></code></pre></div><ul><li>配置</li></ul><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#85E89D;">spring</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">application</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">flowableDemo</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">datasource</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">url</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">jdbc:mysql://localhost:3306/flowable?useUnicode=true&amp;characterEncoding=utf8&amp;serverTimezone=GMT%2b8&amp;nullCatalogMeansCurrent=true</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">username</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">root</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">password</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">123456</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">driverClassName</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">com.mysql.cj.jdbc.Driver</span></span>
<span class="line"></span>
<span class="line"><span style="color:#85E89D;">flowable</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">#关闭定时任务JOB</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">async-executor-activate</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">false</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">database-schema-update</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">true</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#22863A;">spring</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">application</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">flowableDemo</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">datasource</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">url</span><span style="color:#24292E;">: </span><span style="color:#032F62;">jdbc:mysql://localhost:3306/flowable?useUnicode=true&amp;characterEncoding=utf8&amp;serverTimezone=GMT%2b8&amp;nullCatalogMeansCurrent=true</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">username</span><span style="color:#24292E;">: </span><span style="color:#032F62;">root</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">password</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">123456</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">driverClassName</span><span style="color:#24292E;">: </span><span style="color:#032F62;">com.mysql.cj.jdbc.Driver</span></span>
<span class="line"></span>
<span class="line"><span style="color:#22863A;">flowable</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">#关闭定时任务JOB</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">async-executor-activate</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">false</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">database-schema-update</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">true</span></span></code></pre></div><ul><li>controller</li></ul><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> com.simplemw.common.ReturnDto;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> com.simplemw.model.vo.CompleteTaskVo;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> com.simplemw.service.FlowableOperateService;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> io.swagger.annotations.Api;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> org.springframework.beans.factory.annotation.Autowired;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> org.springframework.web.bind.annotation.GetMapping;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> org.springframework.web.bind.annotation.RequestMapping;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> org.springframework.web.bind.annotation.RequestParam;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> org.springframework.web.bind.annotation.RestController;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">@</span><span style="color:#F97583;">RestController</span></span>
<span class="line"><span style="color:#E1E4E8;">@</span><span style="color:#F97583;">RequestMapping</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">value</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;/flowable&quot;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">@</span><span style="color:#F97583;">Api</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">value</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;/flowable&quot;</span><span style="color:#E1E4E8;">,</span><span style="color:#79B8FF;">tags</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> {</span><span style="color:#9ECBFF;">&quot;flowable&quot;</span><span style="color:#E1E4E8;">})</span></span>
<span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">FlowableOperateController</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    @</span><span style="color:#F97583;">Autowired</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">private</span><span style="color:#E1E4E8;"> FlowableOperateService flowableOperateService;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">    /**</span></span>
<span class="line"><span style="color:#6A737D;">     * 获取所有的流程模型</span></span>
<span class="line"><span style="color:#6A737D;">     */</span></span>
<span class="line"><span style="color:#E1E4E8;">    @</span><span style="color:#F97583;">GetMapping</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;/getAllDefinition&quot;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> ReturnDto </span><span style="color:#B392F0;">getAllDefinition</span><span style="color:#E1E4E8;">(){</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> flowableOperateService.</span><span style="color:#B392F0;">getAllDefinition</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">    /**</span></span>
<span class="line"><span style="color:#6A737D;">     * 获取所有的应用程序</span></span>
<span class="line"><span style="color:#6A737D;">     */</span></span>
<span class="line"><span style="color:#E1E4E8;">    @</span><span style="color:#F97583;">GetMapping</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;/getAllDeployment&quot;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> ReturnDto </span><span style="color:#B392F0;">getAllDeployment</span><span style="color:#E1E4E8;">(){</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> flowableOperateService.</span><span style="color:#B392F0;">getAllDeployment</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">    /**</span></span>
<span class="line"><span style="color:#6A737D;">     * 启动流程</span></span>
<span class="line"><span style="color:#6A737D;">     */</span></span>
<span class="line"><span style="color:#E1E4E8;">    @</span><span style="color:#F97583;">GetMapping</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;/startProcess&quot;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> ReturnDto </span><span style="color:#B392F0;">startProcess</span><span style="color:#E1E4E8;">(@</span><span style="color:#F97583;">RequestParam</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;processName&quot;</span><span style="color:#E1E4E8;">) String </span><span style="color:#FFAB70;">processName</span><span style="color:#E1E4E8;">){</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> flowableOperateService.</span><span style="color:#B392F0;">startProcess</span><span style="color:#E1E4E8;">(processName);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">    /**</span></span>
<span class="line"><span style="color:#6A737D;">     * 根据用户名获取要处理的任务</span></span>
<span class="line"><span style="color:#6A737D;">     */</span></span>
<span class="line"><span style="color:#E1E4E8;">    @</span><span style="color:#F97583;">GetMapping</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;/getTaskList&quot;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> ReturnDto </span><span style="color:#B392F0;">getTaskList</span><span style="color:#E1E4E8;">(@</span><span style="color:#F97583;">RequestParam</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;name&quot;</span><span style="color:#E1E4E8;">) String </span><span style="color:#FFAB70;">name</span><span style="color:#E1E4E8;">){</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> flowableOperateService.</span><span style="color:#B392F0;">getTaskList</span><span style="color:#E1E4E8;">(name);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">    /**</span></span>
<span class="line"><span style="color:#6A737D;">     * 任务提交和完成</span></span>
<span class="line"><span style="color:#6A737D;">     */</span></span>
<span class="line"><span style="color:#E1E4E8;">    @</span><span style="color:#F97583;">GetMapping</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;/completeTask&quot;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> ReturnDto </span><span style="color:#B392F0;">completeTask</span><span style="color:#E1E4E8;">(CompleteTaskVo </span><span style="color:#FFAB70;">completeTaskVo</span><span style="color:#E1E4E8;">){</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> flowableOperateService.</span><span style="color:#B392F0;">completeTask</span><span style="color:#E1E4E8;">(completeTaskVo);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> com.simplemw.common.ReturnDto;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> com.simplemw.model.vo.CompleteTaskVo;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> com.simplemw.service.FlowableOperateService;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> io.swagger.annotations.Api;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> org.springframework.beans.factory.annotation.Autowired;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> org.springframework.web.bind.annotation.GetMapping;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> org.springframework.web.bind.annotation.RequestMapping;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> org.springframework.web.bind.annotation.RequestParam;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> org.springframework.web.bind.annotation.RestController;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">@</span><span style="color:#D73A49;">RestController</span></span>
<span class="line"><span style="color:#24292E;">@</span><span style="color:#D73A49;">RequestMapping</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">value</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;/flowable&quot;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">@</span><span style="color:#D73A49;">Api</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">value</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;/flowable&quot;</span><span style="color:#24292E;">,</span><span style="color:#005CC5;">tags</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> {</span><span style="color:#032F62;">&quot;flowable&quot;</span><span style="color:#24292E;">})</span></span>
<span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">FlowableOperateController</span><span style="color:#24292E;"> {</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    @</span><span style="color:#D73A49;">Autowired</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">private</span><span style="color:#24292E;"> FlowableOperateService flowableOperateService;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">    /**</span></span>
<span class="line"><span style="color:#6A737D;">     * 获取所有的流程模型</span></span>
<span class="line"><span style="color:#6A737D;">     */</span></span>
<span class="line"><span style="color:#24292E;">    @</span><span style="color:#D73A49;">GetMapping</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;/getAllDefinition&quot;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> ReturnDto </span><span style="color:#6F42C1;">getAllDefinition</span><span style="color:#24292E;">(){</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> flowableOperateService.</span><span style="color:#6F42C1;">getAllDefinition</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">    /**</span></span>
<span class="line"><span style="color:#6A737D;">     * 获取所有的应用程序</span></span>
<span class="line"><span style="color:#6A737D;">     */</span></span>
<span class="line"><span style="color:#24292E;">    @</span><span style="color:#D73A49;">GetMapping</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;/getAllDeployment&quot;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> ReturnDto </span><span style="color:#6F42C1;">getAllDeployment</span><span style="color:#24292E;">(){</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> flowableOperateService.</span><span style="color:#6F42C1;">getAllDeployment</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">    /**</span></span>
<span class="line"><span style="color:#6A737D;">     * 启动流程</span></span>
<span class="line"><span style="color:#6A737D;">     */</span></span>
<span class="line"><span style="color:#24292E;">    @</span><span style="color:#D73A49;">GetMapping</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;/startProcess&quot;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> ReturnDto </span><span style="color:#6F42C1;">startProcess</span><span style="color:#24292E;">(@</span><span style="color:#D73A49;">RequestParam</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;processName&quot;</span><span style="color:#24292E;">) String </span><span style="color:#E36209;">processName</span><span style="color:#24292E;">){</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> flowableOperateService.</span><span style="color:#6F42C1;">startProcess</span><span style="color:#24292E;">(processName);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">    /**</span></span>
<span class="line"><span style="color:#6A737D;">     * 根据用户名获取要处理的任务</span></span>
<span class="line"><span style="color:#6A737D;">     */</span></span>
<span class="line"><span style="color:#24292E;">    @</span><span style="color:#D73A49;">GetMapping</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;/getTaskList&quot;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> ReturnDto </span><span style="color:#6F42C1;">getTaskList</span><span style="color:#24292E;">(@</span><span style="color:#D73A49;">RequestParam</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;name&quot;</span><span style="color:#24292E;">) String </span><span style="color:#E36209;">name</span><span style="color:#24292E;">){</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> flowableOperateService.</span><span style="color:#6F42C1;">getTaskList</span><span style="color:#24292E;">(name);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">    /**</span></span>
<span class="line"><span style="color:#6A737D;">     * 任务提交和完成</span></span>
<span class="line"><span style="color:#6A737D;">     */</span></span>
<span class="line"><span style="color:#24292E;">    @</span><span style="color:#D73A49;">GetMapping</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;/completeTask&quot;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> ReturnDto </span><span style="color:#6F42C1;">completeTask</span><span style="color:#24292E;">(CompleteTaskVo </span><span style="color:#E36209;">completeTaskVo</span><span style="color:#24292E;">){</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> flowableOperateService.</span><span style="color:#6F42C1;">completeTask</span><span style="color:#24292E;">(completeTaskVo);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><ul><li>service</li></ul><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> com.simplemw.common.ReturnDto;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> com.simplemw.config.exception.MyFlowableException;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> com.simplemw.model.vo.CompleteTaskVo;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> org.flowable.common.engine.api.FlowableException;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> org.flowable.engine.ProcessEngine;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> org.flowable.engine.RepositoryService;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> org.flowable.engine.RuntimeService;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> org.flowable.engine.TaskService;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> org.flowable.engine.repository.Deployment;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> org.flowable.engine.repository.ProcessDefinition;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> org.flowable.engine.runtime.ProcessInstance;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> org.flowable.task.api.Task;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> org.springframework.beans.factory.annotation.Autowired;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> org.springframework.stereotype.Service;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> java.util.HashMap;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> java.util.List;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> java.util.Map;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">@</span><span style="color:#F97583;">Service</span></span>
<span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">FlowableOperateService</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    @</span><span style="color:#F97583;">Autowired</span></span>
<span class="line"><span style="color:#E1E4E8;">    RepositoryService repositoryService;</span></span>
<span class="line"><span style="color:#E1E4E8;">    @</span><span style="color:#F97583;">Autowired</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">private</span><span style="color:#E1E4E8;"> ProcessEngine processEngine;</span></span>
<span class="line"><span style="color:#E1E4E8;">    @</span><span style="color:#F97583;">Autowired</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">private</span><span style="color:#E1E4E8;"> RuntimeService runtimeService;</span></span>
<span class="line"><span style="color:#E1E4E8;">    @</span><span style="color:#F97583;">Autowired</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">private</span><span style="color:#E1E4E8;"> TaskService taskService;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">    /**</span></span>
<span class="line"><span style="color:#6A737D;">     * 获取所有的流程模型</span></span>
<span class="line"><span style="color:#6A737D;">     */</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> ReturnDto </span><span style="color:#B392F0;">getAllDefinition</span><span style="color:#E1E4E8;">(){</span></span>
<span class="line"><span style="color:#E1E4E8;">        RepositoryService repositoryService </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> processEngine.</span><span style="color:#B392F0;">getRepositoryService</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">        List&lt;</span><span style="color:#F97583;">ProcessDefinition</span><span style="color:#E1E4E8;">&gt; definitions </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> repositoryService.</span><span style="color:#B392F0;">createProcessDefinitionQuery</span><span style="color:#E1E4E8;">().</span><span style="color:#B392F0;">list</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">        definitions.</span><span style="color:#B392F0;">forEach</span><span style="color:#E1E4E8;">(System.out</span><span style="color:#F97583;">::</span><span style="color:#E1E4E8;">println);</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> ReturnDto.</span><span style="color:#B392F0;">ok</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">    /**</span></span>
<span class="line"><span style="color:#6A737D;">     * 获取所有的应用程序(流程定义)</span></span>
<span class="line"><span style="color:#6A737D;">     */</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> ReturnDto </span><span style="color:#B392F0;">getAllDeployment</span><span style="color:#E1E4E8;">(){</span></span>
<span class="line"><span style="color:#E1E4E8;">        List&lt;</span><span style="color:#F97583;">Deployment</span><span style="color:#E1E4E8;">&gt; deployments </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> repositoryService.</span><span style="color:#B392F0;">createDeploymentQuery</span><span style="color:#E1E4E8;">().</span><span style="color:#B392F0;">list</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">        deployments.</span><span style="color:#B392F0;">forEach</span><span style="color:#E1E4E8;">(System.out</span><span style="color:#F97583;">::</span><span style="color:#E1E4E8;">println);</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> ReturnDto.</span><span style="color:#B392F0;">ok</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">    /**</span></span>
<span class="line"><span style="color:#6A737D;">     * 启动流程实例</span></span>
<span class="line"><span style="color:#6A737D;">     */</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> ReturnDto </span><span style="color:#B392F0;">startProcess</span><span style="color:#E1E4E8;">(String </span><span style="color:#FFAB70;">processName</span><span style="color:#E1E4E8;">){</span></span>
<span class="line"><span style="color:#E1E4E8;">        Map&lt;</span><span style="color:#F97583;">String</span><span style="color:#E1E4E8;">, </span><span style="color:#F97583;">Object</span><span style="color:#E1E4E8;">&gt; variables </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> HashMap&lt;&gt;();</span></span>
<span class="line"><span style="color:#E1E4E8;">        variables.</span><span style="color:#B392F0;">put</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;description&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&quot;启动实例&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">        ProcessInstance processInstance </span><span style="color:#F97583;">=</span></span>
<span class="line"><span style="color:#E1E4E8;">                runtimeService.</span><span style="color:#B392F0;">startProcessInstanceByKey</span><span style="color:#E1E4E8;">(processName, variables);</span></span>
<span class="line"><span style="color:#E1E4E8;">        System.out.</span><span style="color:#B392F0;">println</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;processInstance: &quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> processInstance.</span><span style="color:#B392F0;">toString</span><span style="color:#E1E4E8;">());</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> ReturnDto.</span><span style="color:#B392F0;">ok</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">    /**</span></span>
<span class="line"><span style="color:#6A737D;">     * 根据用户名获取要处理的任务</span></span>
<span class="line"><span style="color:#6A737D;">     */</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> ReturnDto </span><span style="color:#B392F0;">getTaskList</span><span style="color:#E1E4E8;">(String </span><span style="color:#FFAB70;">name</span><span style="color:#E1E4E8;">){</span></span>
<span class="line"><span style="color:#E1E4E8;">        List&lt;</span><span style="color:#F97583;">Task</span><span style="color:#E1E4E8;">&gt; list </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> taskService.</span><span style="color:#B392F0;">createTaskQuery</span><span style="color:#E1E4E8;">().</span><span style="color:#B392F0;">taskAssignee</span><span style="color:#E1E4E8;">(name).</span><span style="color:#B392F0;">list</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">        list.</span><span style="color:#B392F0;">forEach</span><span style="color:#E1E4E8;">(System.out</span><span style="color:#F97583;">::</span><span style="color:#E1E4E8;">println);</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> ReturnDto.</span><span style="color:#B392F0;">ok</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">    /**</span></span>
<span class="line"><span style="color:#6A737D;">     * 任务提交和完成</span></span>
<span class="line"><span style="color:#6A737D;">     */</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> ReturnDto </span><span style="color:#B392F0;">completeTask</span><span style="color:#E1E4E8;">(CompleteTaskVo </span><span style="color:#FFAB70;">completeTaskVo</span><span style="color:#E1E4E8;">){</span></span>
<span class="line"><span style="color:#E1E4E8;">        String taskId </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> completeTaskVo.</span><span style="color:#B392F0;">getTaskId</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">        String submitter </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> completeTaskVo.</span><span style="color:#B392F0;">getSubmitter</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">//判断是否存在该任务</span></span>
<span class="line"><span style="color:#E1E4E8;">        Task task </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> taskService.</span><span style="color:#B392F0;">createTaskQuery</span><span style="color:#E1E4E8;">().</span><span style="color:#B392F0;">taskId</span><span style="color:#E1E4E8;">(taskId).</span><span style="color:#B392F0;">singleResult</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;">(task </span><span style="color:#F97583;">==</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#F97583;">throw</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">MyFlowableException</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;未找到任务,请检查&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;">(submitter.</span><span style="color:#B392F0;">equals</span><span style="color:#E1E4E8;">(task.</span><span style="color:#B392F0;">getAssignee</span><span style="color:#E1E4E8;">())){</span></span>
<span class="line"><span style="color:#E1E4E8;">            Map&lt;</span><span style="color:#F97583;">String</span><span style="color:#E1E4E8;">, </span><span style="color:#F97583;">Object</span><span style="color:#E1E4E8;">&gt; variables </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> HashMap&lt;&gt;();</span></span>
<span class="line"><span style="color:#E1E4E8;">            variables.</span><span style="color:#B392F0;">put</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;approved&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">            taskService.</span><span style="color:#B392F0;">complete</span><span style="color:#E1E4E8;">(taskId, variables);</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> ReturnDto.</span><span style="color:#B392F0;">ok</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;提交成功&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span><span style="color:#F97583;">else</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#F97583;">throw</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">FlowableException</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;提交人和当前任务不匹配&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> com.simplemw.common.ReturnDto;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> com.simplemw.config.exception.MyFlowableException;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> com.simplemw.model.vo.CompleteTaskVo;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> org.flowable.common.engine.api.FlowableException;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> org.flowable.engine.ProcessEngine;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> org.flowable.engine.RepositoryService;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> org.flowable.engine.RuntimeService;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> org.flowable.engine.TaskService;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> org.flowable.engine.repository.Deployment;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> org.flowable.engine.repository.ProcessDefinition;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> org.flowable.engine.runtime.ProcessInstance;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> org.flowable.task.api.Task;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> org.springframework.beans.factory.annotation.Autowired;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> org.springframework.stereotype.Service;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> java.util.HashMap;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> java.util.List;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> java.util.Map;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">@</span><span style="color:#D73A49;">Service</span></span>
<span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">FlowableOperateService</span><span style="color:#24292E;"> {</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    @</span><span style="color:#D73A49;">Autowired</span></span>
<span class="line"><span style="color:#24292E;">    RepositoryService repositoryService;</span></span>
<span class="line"><span style="color:#24292E;">    @</span><span style="color:#D73A49;">Autowired</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">private</span><span style="color:#24292E;"> ProcessEngine processEngine;</span></span>
<span class="line"><span style="color:#24292E;">    @</span><span style="color:#D73A49;">Autowired</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">private</span><span style="color:#24292E;"> RuntimeService runtimeService;</span></span>
<span class="line"><span style="color:#24292E;">    @</span><span style="color:#D73A49;">Autowired</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">private</span><span style="color:#24292E;"> TaskService taskService;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">    /**</span></span>
<span class="line"><span style="color:#6A737D;">     * 获取所有的流程模型</span></span>
<span class="line"><span style="color:#6A737D;">     */</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> ReturnDto </span><span style="color:#6F42C1;">getAllDefinition</span><span style="color:#24292E;">(){</span></span>
<span class="line"><span style="color:#24292E;">        RepositoryService repositoryService </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> processEngine.</span><span style="color:#6F42C1;">getRepositoryService</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">        List&lt;</span><span style="color:#D73A49;">ProcessDefinition</span><span style="color:#24292E;">&gt; definitions </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> repositoryService.</span><span style="color:#6F42C1;">createProcessDefinitionQuery</span><span style="color:#24292E;">().</span><span style="color:#6F42C1;">list</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">        definitions.</span><span style="color:#6F42C1;">forEach</span><span style="color:#24292E;">(System.out</span><span style="color:#D73A49;">::</span><span style="color:#24292E;">println);</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> ReturnDto.</span><span style="color:#6F42C1;">ok</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">    /**</span></span>
<span class="line"><span style="color:#6A737D;">     * 获取所有的应用程序(流程定义)</span></span>
<span class="line"><span style="color:#6A737D;">     */</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> ReturnDto </span><span style="color:#6F42C1;">getAllDeployment</span><span style="color:#24292E;">(){</span></span>
<span class="line"><span style="color:#24292E;">        List&lt;</span><span style="color:#D73A49;">Deployment</span><span style="color:#24292E;">&gt; deployments </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> repositoryService.</span><span style="color:#6F42C1;">createDeploymentQuery</span><span style="color:#24292E;">().</span><span style="color:#6F42C1;">list</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">        deployments.</span><span style="color:#6F42C1;">forEach</span><span style="color:#24292E;">(System.out</span><span style="color:#D73A49;">::</span><span style="color:#24292E;">println);</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> ReturnDto.</span><span style="color:#6F42C1;">ok</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">    /**</span></span>
<span class="line"><span style="color:#6A737D;">     * 启动流程实例</span></span>
<span class="line"><span style="color:#6A737D;">     */</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> ReturnDto </span><span style="color:#6F42C1;">startProcess</span><span style="color:#24292E;">(String </span><span style="color:#E36209;">processName</span><span style="color:#24292E;">){</span></span>
<span class="line"><span style="color:#24292E;">        Map&lt;</span><span style="color:#D73A49;">String</span><span style="color:#24292E;">, </span><span style="color:#D73A49;">Object</span><span style="color:#24292E;">&gt; variables </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> HashMap&lt;&gt;();</span></span>
<span class="line"><span style="color:#24292E;">        variables.</span><span style="color:#6F42C1;">put</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;description&quot;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&quot;启动实例&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">        ProcessInstance processInstance </span><span style="color:#D73A49;">=</span></span>
<span class="line"><span style="color:#24292E;">                runtimeService.</span><span style="color:#6F42C1;">startProcessInstanceByKey</span><span style="color:#24292E;">(processName, variables);</span></span>
<span class="line"><span style="color:#24292E;">        System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;processInstance: &quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> processInstance.</span><span style="color:#6F42C1;">toString</span><span style="color:#24292E;">());</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> ReturnDto.</span><span style="color:#6F42C1;">ok</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">    /**</span></span>
<span class="line"><span style="color:#6A737D;">     * 根据用户名获取要处理的任务</span></span>
<span class="line"><span style="color:#6A737D;">     */</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> ReturnDto </span><span style="color:#6F42C1;">getTaskList</span><span style="color:#24292E;">(String </span><span style="color:#E36209;">name</span><span style="color:#24292E;">){</span></span>
<span class="line"><span style="color:#24292E;">        List&lt;</span><span style="color:#D73A49;">Task</span><span style="color:#24292E;">&gt; list </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> taskService.</span><span style="color:#6F42C1;">createTaskQuery</span><span style="color:#24292E;">().</span><span style="color:#6F42C1;">taskAssignee</span><span style="color:#24292E;">(name).</span><span style="color:#6F42C1;">list</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">        list.</span><span style="color:#6F42C1;">forEach</span><span style="color:#24292E;">(System.out</span><span style="color:#D73A49;">::</span><span style="color:#24292E;">println);</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> ReturnDto.</span><span style="color:#6F42C1;">ok</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">    /**</span></span>
<span class="line"><span style="color:#6A737D;">     * 任务提交和完成</span></span>
<span class="line"><span style="color:#6A737D;">     */</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> ReturnDto </span><span style="color:#6F42C1;">completeTask</span><span style="color:#24292E;">(CompleteTaskVo </span><span style="color:#E36209;">completeTaskVo</span><span style="color:#24292E;">){</span></span>
<span class="line"><span style="color:#24292E;">        String taskId </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> completeTaskVo.</span><span style="color:#6F42C1;">getTaskId</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">        String submitter </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> completeTaskVo.</span><span style="color:#6F42C1;">getSubmitter</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">//判断是否存在该任务</span></span>
<span class="line"><span style="color:#24292E;">        Task task </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> taskService.</span><span style="color:#6F42C1;">createTaskQuery</span><span style="color:#24292E;">().</span><span style="color:#6F42C1;">taskId</span><span style="color:#24292E;">(taskId).</span><span style="color:#6F42C1;">singleResult</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">if</span><span style="color:#24292E;">(task </span><span style="color:#D73A49;">==</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">null</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#D73A49;">throw</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">MyFlowableException</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;未找到任务,请检查&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">if</span><span style="color:#24292E;">(submitter.</span><span style="color:#6F42C1;">equals</span><span style="color:#24292E;">(task.</span><span style="color:#6F42C1;">getAssignee</span><span style="color:#24292E;">())){</span></span>
<span class="line"><span style="color:#24292E;">            Map&lt;</span><span style="color:#D73A49;">String</span><span style="color:#24292E;">, </span><span style="color:#D73A49;">Object</span><span style="color:#24292E;">&gt; variables </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> HashMap&lt;&gt;();</span></span>
<span class="line"><span style="color:#24292E;">            variables.</span><span style="color:#6F42C1;">put</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;approved&quot;</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">            taskService.</span><span style="color:#6F42C1;">complete</span><span style="color:#24292E;">(taskId, variables);</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> ReturnDto.</span><span style="color:#6F42C1;">ok</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;提交成功&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">        }</span><span style="color:#D73A49;">else</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#D73A49;">throw</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">FlowableException</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;提交人和当前任务不匹配&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div>`,18),e=[o];function t(c,r,E,y,i,g){return n(),a("div",null,e)}const d=s(p,[["render",t]]);export{u as __pageData,d as default};

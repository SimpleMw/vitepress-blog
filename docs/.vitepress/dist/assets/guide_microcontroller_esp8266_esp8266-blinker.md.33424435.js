import{_ as s,o as n,c as a,Q as l}from"./chunks/framework.dd5a1521.js";const u=JSON.parse('{"title":"ESP8266","description":"","frontmatter":{"title":"ESP8266","date":"2023-02-11T08:40:27.000Z"},"headers":[],"relativePath":"guide/microcontroller/esp8266/esp8266-blinker.md","filePath":"guide/microcontroller/esp8266/esp8266-blinker.md"}'),p={name:"guide/microcontroller/esp8266/esp8266-blinker.md"},o=l(`<h4 id="接入小爱控制引脚4" tabindex="-1">接入小爱控制引脚4 <a class="header-anchor" href="#接入小爱控制引脚4" aria-label="Permalink to &quot;接入小爱控制引脚4&quot;">​</a></h4><ul><li>通过wifi连接点灯科技</li><li>将点灯科技设备接入米家</li><li>小爱同学通过命令发送不同的操作指令控制灯</li></ul><p>APP软件有</p><pre><code>- 电灯-blinker
- 米家
- 小爱音响
</code></pre><p>[ESP8266引脚图](<a href="https://www.bilibili.com/read/cv14229875" target="_blank" rel="noreferrer">ESP8266 GPIO 的指南：引脚图 - 哔哩哔哩 (bilibili.com)</a>)</p><p>[点灯科技引入](<a href="https://www.diandeng.tech/doc/xiaoai" target="_blank" rel="noreferrer">点灯科技 (diandeng.tech)</a>)</p><div class="language-c++ vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">c++</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">#define</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">BLINKER_WIFI</span><span style="color:#E1E4E8;">  //用于指定设备接入方式 wifi 接入</span></span>
<span class="line"><span style="color:#F97583;">#define</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">BLINKER_MIOT_LIGHT</span></span>
<span class="line"><span style="color:#F97583;">#define</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">BLINKER_MIOT_OUTLET</span></span>
<span class="line"><span style="color:#F97583;">#define</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">BLINKER_MIOT_SENSOR</span></span>
<span class="line"><span style="color:#F97583;">#define</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">BLINKER_MIOT_FAN</span></span>
<span class="line"><span style="color:#F97583;">#define</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">BLINKER_MIOT_AIR_CONDITION</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">#include</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&lt;Blinker.h&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">//设备密钥</span></span>
<span class="line"><span style="color:#F97583;">char</span><span style="color:#E1E4E8;"> auth[] </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;58347aa10ecb&quot;</span><span style="color:#E1E4E8;">; </span></span>
<span class="line"><span style="color:#6A737D;">//wifi名称</span></span>
<span class="line"><span style="color:#F97583;">char</span><span style="color:#E1E4E8;"> ssid[] </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;ChinaNet-aemM&quot;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#6A737D;">//wifi密码</span></span>
<span class="line"><span style="color:#F97583;">char</span><span style="color:#E1E4E8;"> pswd[] </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;wp907678446&quot;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">int</span><span style="color:#E1E4E8;"> colorW </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">//app的按钮名称(若不添加按钮可以不设置)</span></span>
<span class="line"><span style="color:#B392F0;">BlinkerButton</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Button1</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;myLamp&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">//app 按钮回调</span></span>
<span class="line"><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">button1_callback</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">String</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&amp;</span><span style="color:#E1E4E8;"> </span><span style="color:#FFAB70;">state</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">     </span><span style="color:#B392F0;">BLINKER_LOG</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;get button state: &quot;</span><span style="color:#E1E4E8;">, state);</span></span>
<span class="line"><span style="color:#E1E4E8;">     </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (state</span><span style="color:#F97583;">==</span><span style="color:#9ECBFF;">&quot;on&quot;</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">digitalWrite</span><span style="color:#E1E4E8;">(LED_BUILTIN, LOW);</span></span>
<span class="line"><span style="color:#6A737D;">        // 反馈开关状态</span></span>
<span class="line"><span style="color:#E1E4E8;">        Button1.</span><span style="color:#B392F0;">print</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;on&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">    } </span><span style="color:#F97583;">else</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;">(state</span><span style="color:#F97583;">==</span><span style="color:#9ECBFF;">&quot;off&quot;</span><span style="color:#E1E4E8;">){</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">digitalWrite</span><span style="color:#E1E4E8;">(LED_BUILTIN, HIGH); </span></span>
<span class="line"><span style="color:#6A737D;">        // 反馈开关状态</span></span>
<span class="line"><span style="color:#E1E4E8;">        Button1.</span><span style="color:#B392F0;">print</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;off&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">//电源类回调</span></span>
<span class="line"><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">miotPowerState</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">String</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&amp;</span><span style="color:#E1E4E8;"> </span><span style="color:#FFAB70;">state</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">BLINKER_LOG</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;need set power state: &quot;</span><span style="color:#E1E4E8;">, state);</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (state </span><span style="color:#F97583;">==</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;on&quot;</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">digitalWrite</span><span style="color:#E1E4E8;">(LED_BUILTIN, LOW);</span></span>
<span class="line"><span style="color:#6A737D;">      // 反馈开关状态</span></span>
<span class="line"><span style="color:#E1E4E8;">      Button1.</span><span style="color:#B392F0;">print</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;on&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">      BlinkerMIOT.</span><span style="color:#B392F0;">powerState</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;on&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">      BlinkerMIOT.</span><span style="color:#B392F0;">print</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">else</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (state </span><span style="color:#F97583;">==</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;off&quot;</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">digitalWrite</span><span style="color:#E1E4E8;">(LED_BUILTIN, HIGH); </span></span>
<span class="line"><span style="color:#6A737D;">      // 反馈开关状态</span></span>
<span class="line"><span style="color:#E1E4E8;">      Button1.</span><span style="color:#B392F0;">print</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;off&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">      BlinkerMIOT.</span><span style="color:#B392F0;">powerState</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;off&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">      BlinkerMIOT.</span><span style="color:#B392F0;">print</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">//亮度回调</span></span>
<span class="line"><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">miotBright</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">String</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&amp;</span><span style="color:#E1E4E8;"> </span><span style="color:#FFAB70;">bright</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">BLINKER_LOG</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;need set brightness: &quot;</span><span style="color:#E1E4E8;">, bright);</span></span>
<span class="line"><span style="color:#E1E4E8;">    colorW </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> bright.</span><span style="color:#B392F0;">toInt</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">BLINKER_LOG</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;now set brightness: &quot;</span><span style="color:#E1E4E8;">, colorW);</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">analogWrite</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;">,</span><span style="color:#79B8FF;">100</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">colorW);</span><span style="color:#6A737D;"> //给指定引脚写入数据</span></span>
<span class="line"><span style="color:#E1E4E8;">    BlinkerMIOT.</span><span style="color:#B392F0;">brightness</span><span style="color:#E1E4E8;">(colorW);</span></span>
<span class="line"><span style="color:#E1E4E8;">    BlinkerMIOT.</span><span style="color:#B392F0;">print</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">setup</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#6A737D;">    //初始化串口，并开启调试信息</span></span>
<span class="line"><span style="color:#E1E4E8;">    Serial.</span><span style="color:#B392F0;">begin</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">115200</span><span style="color:#E1E4E8;">);    </span></span>
<span class="line"><span style="color:#E1E4E8;">    BLINKER_DEBUG.</span><span style="color:#B392F0;">stream</span><span style="color:#E1E4E8;">(Serial); </span></span>
<span class="line"><span style="color:#6A737D;">    //初始化blinker</span></span>
<span class="line"><span style="color:#E1E4E8;">    Blinker.</span><span style="color:#B392F0;">begin</span><span style="color:#E1E4E8;">(auth, ssid, pswd);</span></span>
<span class="line"><span style="color:#E1E4E8;">    BlinkerMIOT.</span><span style="color:#B392F0;">attachPowerState</span><span style="color:#E1E4E8;">(miotPowerState);</span></span>
<span class="line"><span style="color:#E1E4E8;">    BlinkerMIOT.</span><span style="color:#B392F0;">attachBrightness</span><span style="color:#E1E4E8;">(miotBright);</span></span>
<span class="line"><span style="color:#E1E4E8;">    Button1.</span><span style="color:#B392F0;">attach</span><span style="color:#E1E4E8;">(button1_callback);</span><span style="color:#6A737D;"> //绑定按键执行回调函数</span></span>
<span class="line"><span style="color:#6A737D;">    //设置LED灯为输出模式</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">pinMode</span><span style="color:#E1E4E8;">(LED_BUILTIN, OUTPUT);</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">pinMode</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;">,OUTPUT);</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">analogWriteRange</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">100</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">loop</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">    Blinker.</span><span style="color:#B392F0;">run</span><span style="color:#E1E4E8;">(); </span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">#define</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">BLINKER_WIFI</span><span style="color:#24292E;">  //用于指定设备接入方式 wifi 接入</span></span>
<span class="line"><span style="color:#D73A49;">#define</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">BLINKER_MIOT_LIGHT</span></span>
<span class="line"><span style="color:#D73A49;">#define</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">BLINKER_MIOT_OUTLET</span></span>
<span class="line"><span style="color:#D73A49;">#define</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">BLINKER_MIOT_SENSOR</span></span>
<span class="line"><span style="color:#D73A49;">#define</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">BLINKER_MIOT_FAN</span></span>
<span class="line"><span style="color:#D73A49;">#define</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">BLINKER_MIOT_AIR_CONDITION</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">#include</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&lt;Blinker.h&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">//设备密钥</span></span>
<span class="line"><span style="color:#D73A49;">char</span><span style="color:#24292E;"> auth[] </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;58347aa10ecb&quot;</span><span style="color:#24292E;">; </span></span>
<span class="line"><span style="color:#6A737D;">//wifi名称</span></span>
<span class="line"><span style="color:#D73A49;">char</span><span style="color:#24292E;"> ssid[] </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;ChinaNet-aemM&quot;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#6A737D;">//wifi密码</span></span>
<span class="line"><span style="color:#D73A49;">char</span><span style="color:#24292E;"> pswd[] </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;wp907678446&quot;</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">int</span><span style="color:#24292E;"> colorW </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">//app的按钮名称(若不添加按钮可以不设置)</span></span>
<span class="line"><span style="color:#6F42C1;">BlinkerButton</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Button1</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;myLamp&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">//app 按钮回调</span></span>
<span class="line"><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">button1_callback</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">String</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&amp;</span><span style="color:#24292E;"> </span><span style="color:#E36209;">state</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">     </span><span style="color:#6F42C1;">BLINKER_LOG</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;get button state: &quot;</span><span style="color:#24292E;">, state);</span></span>
<span class="line"><span style="color:#24292E;">     </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (state</span><span style="color:#D73A49;">==</span><span style="color:#032F62;">&quot;on&quot;</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">digitalWrite</span><span style="color:#24292E;">(LED_BUILTIN, LOW);</span></span>
<span class="line"><span style="color:#6A737D;">        // 反馈开关状态</span></span>
<span class="line"><span style="color:#24292E;">        Button1.</span><span style="color:#6F42C1;">print</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;on&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">    } </span><span style="color:#D73A49;">else</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">if</span><span style="color:#24292E;">(state</span><span style="color:#D73A49;">==</span><span style="color:#032F62;">&quot;off&quot;</span><span style="color:#24292E;">){</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">digitalWrite</span><span style="color:#24292E;">(LED_BUILTIN, HIGH); </span></span>
<span class="line"><span style="color:#6A737D;">        // 反馈开关状态</span></span>
<span class="line"><span style="color:#24292E;">        Button1.</span><span style="color:#6F42C1;">print</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;off&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">//电源类回调</span></span>
<span class="line"><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">miotPowerState</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">String</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&amp;</span><span style="color:#24292E;"> </span><span style="color:#E36209;">state</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">BLINKER_LOG</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;need set power state: &quot;</span><span style="color:#24292E;">, state);</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (state </span><span style="color:#D73A49;">==</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;on&quot;</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">digitalWrite</span><span style="color:#24292E;">(LED_BUILTIN, LOW);</span></span>
<span class="line"><span style="color:#6A737D;">      // 反馈开关状态</span></span>
<span class="line"><span style="color:#24292E;">      Button1.</span><span style="color:#6F42C1;">print</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;on&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">      BlinkerMIOT.</span><span style="color:#6F42C1;">powerState</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;on&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">      BlinkerMIOT.</span><span style="color:#6F42C1;">print</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">else</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (state </span><span style="color:#D73A49;">==</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;off&quot;</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">digitalWrite</span><span style="color:#24292E;">(LED_BUILTIN, HIGH); </span></span>
<span class="line"><span style="color:#6A737D;">      // 反馈开关状态</span></span>
<span class="line"><span style="color:#24292E;">      Button1.</span><span style="color:#6F42C1;">print</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;off&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">      BlinkerMIOT.</span><span style="color:#6F42C1;">powerState</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;off&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">      BlinkerMIOT.</span><span style="color:#6F42C1;">print</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">//亮度回调</span></span>
<span class="line"><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">miotBright</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">String</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&amp;</span><span style="color:#24292E;"> </span><span style="color:#E36209;">bright</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">BLINKER_LOG</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;need set brightness: &quot;</span><span style="color:#24292E;">, bright);</span></span>
<span class="line"><span style="color:#24292E;">    colorW </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> bright.</span><span style="color:#6F42C1;">toInt</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">BLINKER_LOG</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;now set brightness: &quot;</span><span style="color:#24292E;">, colorW);</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">analogWrite</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">2</span><span style="color:#24292E;">,</span><span style="color:#005CC5;">100</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">colorW);</span><span style="color:#6A737D;"> //给指定引脚写入数据</span></span>
<span class="line"><span style="color:#24292E;">    BlinkerMIOT.</span><span style="color:#6F42C1;">brightness</span><span style="color:#24292E;">(colorW);</span></span>
<span class="line"><span style="color:#24292E;">    BlinkerMIOT.</span><span style="color:#6F42C1;">print</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">setup</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#6A737D;">    //初始化串口，并开启调试信息</span></span>
<span class="line"><span style="color:#24292E;">    Serial.</span><span style="color:#6F42C1;">begin</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">115200</span><span style="color:#24292E;">);    </span></span>
<span class="line"><span style="color:#24292E;">    BLINKER_DEBUG.</span><span style="color:#6F42C1;">stream</span><span style="color:#24292E;">(Serial); </span></span>
<span class="line"><span style="color:#6A737D;">    //初始化blinker</span></span>
<span class="line"><span style="color:#24292E;">    Blinker.</span><span style="color:#6F42C1;">begin</span><span style="color:#24292E;">(auth, ssid, pswd);</span></span>
<span class="line"><span style="color:#24292E;">    BlinkerMIOT.</span><span style="color:#6F42C1;">attachPowerState</span><span style="color:#24292E;">(miotPowerState);</span></span>
<span class="line"><span style="color:#24292E;">    BlinkerMIOT.</span><span style="color:#6F42C1;">attachBrightness</span><span style="color:#24292E;">(miotBright);</span></span>
<span class="line"><span style="color:#24292E;">    Button1.</span><span style="color:#6F42C1;">attach</span><span style="color:#24292E;">(button1_callback);</span><span style="color:#6A737D;"> //绑定按键执行回调函数</span></span>
<span class="line"><span style="color:#6A737D;">    //设置LED灯为输出模式</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">pinMode</span><span style="color:#24292E;">(LED_BUILTIN, OUTPUT);</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">pinMode</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">2</span><span style="color:#24292E;">,OUTPUT);</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">analogWriteRange</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">100</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">loop</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">    Blinker.</span><span style="color:#6F42C1;">run</span><span style="color:#24292E;">(); </span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div>`,7),e=[o];function t(c,r,E,y,i,F){return n(),a("div",null,e)}const I=s(p,[["render",t]]);export{u as __pageData,I as default};

---
title: Websocket
date: 2021-1-27 7:20:27
---

一次握手，双向数据传输

介绍：特点是一次握手，双向数据传输

出现原因：http协议的生命周期是 客户端发送请求，服务端接收响应，缺点是服务端无法在客户端未发送请求的情况下主动发送信息，websocket就是在这种情况下产生的，在建立连接后实现双通道传输。



springboot整合websocket

##### 依赖

```xml
<!-- 若启动报错排除tomcat依赖试试 -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
    <exclusions>
        <exclusion>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-tomcat</artifactId>
        </exclusion>
    </exclusions>
</dependency>
<!-- websocket依赖 -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-websocket</artifactId>
    <version>2.1.3.RELEASE</version>
</dependency>
<!-- json转换工具 -->
<dependency>
    <groupId>com.alibaba</groupId>
    <artifactId>fastjson</artifactId>
    <version>1.2.75</version>
</dependency>
```

##### 配置类

```java
@Configuration
public class WebSocketConfig {
    /**
     * ServerEndpointExporter 作用
     * 这个Bean会自动注册使用@ServerEndpoint注解声明的websocket endpoint
     * @return
     */
    @Bean
    public ServerEndpointExporter serverEndpointExporter() {
        return new ServerEndpointExporter();
    }
}
```

##### 实现类

```java
@ServerEndpoint(value = "/connect")
@Component
public class WebSocketServer {

    private static Logger log = LoggerFactory.getLogger(WebSocketServer.class);

    //静态变量，用来记录当前在线连接数。应该把它设计成线程安全的。
    private static int onlineCount = 0;

    //concurrent包的线程安全Set，用来存放每个客户端对应的MyWebSocket对象。
    private static CopyOnWriteArraySet<WebSocketServer> webSocketSet = new CopyOnWriteArraySet<>();

    //与某个客户端的连接会话，需要通过它来给客户端发送数据
    private Session session;

    //接收sid
    private String sid = "";

    /**
     * 连接
     * @param session
     * @param sid
     */
    @OnOpen
    public void onOpen(Session session, @PathParam("sid") String sid) {
        this.session = session;
        webSocketSet.add(this);     //加入set中
        addOnlineCount();           //在线数加1
        if(!"".equals(sid)){
            log.info("有新的连接加入：sid="+sid+"");
        }
        log.info( "当前在线人数为" + getOnlineCount());
        this.sid = sid;

        try {
            sendMessage("连接成功");
        } catch (IOException e) {
            log.error("websocket IO异常");
        }
    }

    /**
     * 断开
     */
    @OnClose
    public void onClose() {
        webSocketSet.remove(this);  //从set中删除
        subOnlineCount();           //在线数减1
        log.info("有一连接关闭！当前在线数为" + getOnlineCount());
    }

    @OnMessage
    public void onMessage(String message, Session session) {
        BaseResult result = new BaseResult();
        //把用户发来的消息解析成json对象
        JSONObject param = JSONObject.parseObject(message);
        //测试获取里面的一个参数
        System.out.println(param.get("test"));
        try{
        	System.out.println("这里执行操作");
            result.setStatus("OK");
            result.setCode("200");
            result.setMsg("执行成功");
            session.getAsyncRemote().sendText(JSON.toJSONString(result));
        } catch (Exception e) {
            e.printStackTrace();
            result.setStatus("fail");
            result.setCode("406");
            result.setMsg(e.getMessage());
            session.getAsyncRemote().sendText(JSON.toJSONString(result));
        }
    }


    @OnError
    public void onError(Session session, Throwable error) {
        log.error("发生错误");
        error.printStackTrace();
    }


    /**
     * 主动推送
     * @param message
     * @throws IOException
     */
    public void sendMessage(String message) throws IOException {
        this.session.getBasicRemote().sendText(message);
    }


    /**
     * 自定义群发消息
     * @param message
     * @param sid
     * @throws IOException
     */
    public static void sendInfo(String message, @PathParam("sid") String sid) throws IOException {
        log.info("推送消息到窗口" + sid + ",推送消息内容:" + message);
        for (WebSocketServer item : webSocketSet) {
            try {
                //设定只能推送这个sid，为null则全部推送
                if (sid == null) {
                    item.sendMessage(message);
                } else if (item.sid.equals(sid)) {
                    item.sendMessage(message);
                }
            } catch (IOException e) {
                continue;
            }
        }
    }

    public static synchronized int getOnlineCount() {
        return onlineCount;
    }

    public static synchronized void addOnlineCount() {
        WebSocketServer.onlineCount++;
    }

    public static synchronized void subOnlineCount() {
        WebSocketServer.onlineCount--;
    }

}
```

注：

实现类中

<font color=red>@OnOpen</font>注解的方法为第一次握手执行

<font color=red>@OnMessage</font>注解的方法为连接后数据传输执行的



测试方法：

网络找websocket在线测试工具，介绍网站 [工具网站](https://www.toolfk.com/) 

地址为 ws://IP:端口/connect     注：connect为@ServerEndpoint注解设置的

先连接，后发送信息如

```json
{
    "test":"紧急信息"
}
```



扩展：

网上搜索websocket的时候，都提到了ajax和long poll，记录自己理解

ajax：一直发送请求，一直轮询，有新消息就接收，所以ajax一般用在保证实时性高的地方，如项目开发中的可视化数据展示

long poll：长轮询，后端接收到前端的消息后，后端在进行处理的时候如果处理时间很长就会将该请求一直等待，直到处理完毕后，才将响应返回
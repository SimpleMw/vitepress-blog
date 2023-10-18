---
title: disruptor
date: 2023-10-17 08:40:27
---



[实现借鉴](https://tech.meituan.com/2016/11/18/disruptor.html)

#### 依赖

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
</dependency>
<dependency>
    <groupId>com.lmax</groupId>
    <artifactId>disruptor</artifactId>
    <version>3.3.4</version>
</dependency>
<dependency>
    <groupId>org.projectlombok</groupId>
    <artifactId>lombok</artifactId>
    <version>1.18.26</version>
</dependency>
```

#### 相关配置类

```java
/**
 * 消息的实体类
 */
@Data
public class MessageEntity {

    private String title;
    private String message;
    private String other;
}
```

```java
/**
 * 消息工厂,用于自动创建消息bean
 */
public class MessageEventFactory implements EventFactory<MessageEntity> {
    @Override
    public MessageEntity newInstance() {
        return new MessageEntity();
    }
}
```

```java
/**
 * 消息管理器(给每个消息队列创建一个消息管理器)
 */
@Configuration
public class MQManager {

    @Bean("messageEntityBean") //定义消息管理器的名称
    public RingBuffer<MessageEntity> messageModelRingBuffer() {
        //创建线程工厂
        ThreadFactory threadFactory = new ThreadFactory(){
            @Override
            public Thread newThread(Runnable r) {
                return new Thread(r, "threadFactory");
            }
        };
        //RingBuffer生产工厂,初始化RingBuffer的时候使用
        EventFactory factory = new MessageEventFactory();
        //指定RingBuffer的大小
        int bufferSize = 16;
        //阻塞策略
        BlockingWaitStrategy strategy = new BlockingWaitStrategy();
        //创建disruptor，采用单线程模式
        Disruptor<MessageEntity> disruptor = new Disruptor(factory, bufferSize, threadFactory, ProducerType.SINGLE, strategy);
        //设置EventHandler
        MessageEventHandler handler = new MessageEventHandler();
        disruptor.handleEventsWith(handler);
        //启动disruptor的线程
        disruptor.start();
        RingBuffer<MessageEntity> ringBuffer = disruptor.getRingBuffer();
        return ringBuffer;
    }
}
```

#### 消费者

```java
/**
 * 消息监听器
 */
@Slf4j
public class MessageEventHandler implements EventHandler<MessageEntity> {

    /**
     * 消费者逻辑
     */
    @Override
    public void onEvent(MessageEntity messageEntity, long l, boolean b) throws Exception {
        Thread.sleep(1000);
        //模拟消息处理
        log.info("消费者消费消息："+messageEntity.toString());
    }
}
```

#### 生产者

```java
@Slf4j
@Service
public class DisruptorMqService {

    @Autowired
    private RingBuffer<MessageEntity> messageEntityRingBuffer;

    public void testSend(MessageEntity message) {
        log.info("record the message: {}",message.toString());
        //获取队列的下一个可用位置的下标
        long sequence = messageEntityRingBuffer.next();
        try {
            //给Event填充数据
            MessageEntity event = messageEntityRingBuffer.get(sequence);
            event.setTitle(message.getTitle());
            event.setMessage(message.getMessage());
            event.setOther(message.getOther());
            log.info("往消息队列中添加消息：{}", event);
        } catch (Exception e) {
            log.info("消息填入队列失败"+e.getMessage());
        } finally {
            //消息填入
            messageEntityRingBuffer.publish(sequence);
        }
    }
}
```

#### 测试

```java
@RestController
@RequestMapping("/ces")
public class DemoTestController {

    @Autowired
    private DisruptorMqService disruptorMqService;

    @GetMapping("demo2")
    public void testSend(){
        for (int i = 0; i < 10; i++) {
            MessageEntity message = new MessageEntity();
            message.setTitle("title"+i);
            message.setMessage("message"+i);
            message.setOther("other"+i);
            disruptorMqService.testSend(message);
        }
    }
}
```


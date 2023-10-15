---
title: kafka
date: 2023-01-30 08:40:27
---



构成：

- 生产者 productor
- 消费者 consumer
- 消息服务器 broker

流程

生产者将消息push到消息服务器，consumer从消息服务器去pull消息

名词解释

- 消费者组

  一个消费者组由多个消费者组成

- topic 主题(事件流)

- partition 分区(topic可分为多个存储在partition中)

- record 内容(即message)



##### 下载

- [下载]([Apache Kafka](https://kafka.apache.org/downloads))  kafka

- windows启动

  - 启动zookeeper

  ```
  zookeeper-server-start.bat ..\..\config\zookeeper.properties
  ```

  - 启动kafka	

  ```
  kafka-server-start.bat ..\..\config\server.properties
  ```

##### 代码整合

- 依赖

```xml
<!--spring-kafka 依赖-->
<dependency>
    <groupId>org.springframework.kafka</groupId>
    <artifactId>spring-kafka</artifactId>
</dependency>
<dependency>
    <groupId>org.projectlombok</groupId>
    <artifactId>lombok</artifactId>
    <version>1.18.12</version>
</dependency>
<!-- https://mvnrepository.com/artifact/com.alibaba/fastjson -->
<dependency>
    <groupId>com.alibaba</groupId>
    <artifactId>fastjson</artifactId>
    <version>1.2.75</version>
</dependency>
```

###### 生产者服务

- application.yml

```yaml
server:
  port: 2201

spring:
  kafka:
    bootstrap-servers: 10.245.228.89:9092
    # 生产者即消息发送者
    producer:
      # 发生错误后，消息重发的次数。
      retries: 0
      #当有多个消息需要被发送到同一个分区时，生产者会把它们放在同一个批次里。该参数指定了一个批次可以使用的内存大小，按照字节数计算。
      batch-size: 16384
      # 设置生产者内存缓冲区的大小。
      buffer-memory: 33554432
      # 键的序列化方式
      key-serializer: org.apache.kafka.common.serialization.StringSerializer
      # 值的序列化方式
      value-serializer: org.apache.kafka.common.serialization.StringSerializer
      # acks=0 ： 生产者在成功写入消息之前不会等待任何来自服务器的响应。
      # acks=1 ： 只要集群的首领节点收到消息，生产者就会收到一个来自服务器成功响应。
      # acks=all ：只有当所有参与复制的节点全部收到消息时，生产者才会收到一个来自服务器的成功响应。
      acks: 1
```

- 实现类

```java
import com.alibaba.fastjson.JSONObject;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.kafka.support.SendResult;
import org.springframework.stereotype.Component;
import org.springframework.util.concurrent.ListenableFuture;
import org.springframework.util.concurrent.ListenableFutureCallback;

@Component
@Slf4j
public class KafkaProducer {

    @Autowired
    private KafkaTemplate<String, Object> kafkaTemplate;

    //自定义topic
    public static final String TOPIC_TEST = "topic.test";

    public void send(Object obj) {
        String obj2String = JSONObject.toJSONString(obj);
        log.info("准备发送消息为：{}", obj2String);
        //发送消息
        ListenableFuture<SendResult<String, Object>> future = kafkaTemplate.send(TOPIC_TEST, obj);

        //监听消息发送
        future.addCallback(new ListenableFutureCallback<SendResult<String, Object>>() {
            @Override
            public void onFailure(Throwable throwable) {
                //发送失败的处理
                log.info(TOPIC_TEST + " - 生产者 发送消息失败：" + throwable.getMessage());
            }

            @Override
            public void onSuccess(SendResult<String, Object> stringObjectSendResult) {
                //成功的处理
                log.info(TOPIC_TEST + " - 生产者 发送消息成功：" + stringObjectSendResult.toString());
            }
        });


    }
}
```

- controller

```java
import com.simplemw.Service.DemoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/send")
public class DemoController {

    @Autowired
    private DemoService demoService;

    @PostMapping("/ces")
    public String SendMessage(@RequestBody String message) {
        return demoService.SendMessage(message);
    }

}
```

###### 消费者服务

- application.yml

```yaml
server:
  port: 2202

spring:
  kafka:
    bootstrap-servers: 10.245.228.89:9092
    # 消费者即消息接受者
    consumer:
      # 自动提交的时间间隔 在spring boot 2.X 版本中这里采用的是值的类型为Duration 需要符合特定的格式，如1S,1M,2H,5D
      auto-commit-interval: 1S
      # 该属性指定了消费者在读取一个没有偏移量的分区或者偏移量无效的情况下该作何处理：
      # latest（默认值）在偏移量无效的情况下，消费者将从最新的记录开始读取数据（在消费者启动之后生成的记录）
      # earliest ：在偏移量无效的情况下，消费者将从起始位置读取分区的记录
      auto-offset-reset: earliest
      # 是否自动提交偏移量，默认值是true,为了避免出现重复数据和数据丢失，可以把它设置为false,然后手动提交偏移量
      enable-auto-commit: false
      # 键的反序列化方式
      key-deserializer: org.apache.kafka.common.serialization.StringDeserializer
      # 值的反序列化方式
      value-deserializer: org.apache.kafka.common.serialization.StringDeserializer
    # 监听
    listener:
      # 在侦听器容器中运行的线程数。
      concurrency: 5
      #listner负责ack，每调用一次，就立即commit
      ack-mode: manual_immediate
      missing-topics-fatal: false
```

- 实现类

```java
import lombok.extern.slf4j.Slf4j;
import org.apache.kafka.clients.consumer.ConsumerRecord;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.support.Acknowledgment;
import org.springframework.kafka.support.KafkaHeaders;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
@Slf4j
public class KafkaConsumer {

    public static final String TOPIC_TEST = "topic.test";

    public static final String TOPIC_GROUP1 = "topic.group1";

    public static final String TOPIC_GROUP2 = "topic.group2";

    @KafkaListener(topics = TOPIC_GROUP1, groupId = TOPIC_GROUP1)
    public void topic_test(ConsumerRecord<?, ?> record, Acknowledgment ack, @Header(KafkaHeaders.RECEIVED_TOPIC) String topic) {

        Optional message = Optional.ofNullable(record.value());
        if (message.isPresent()) {
            Object msg = message.get();
            log.info("topic_test 消费了： Topic:" + topic + ",Message:" + msg);
            System.out.println("topic_test 消费了： Topic:" + topic + ",Message:" + msg);
            ack.acknowledge();
        }
    }

    @KafkaListener(topics = TOPIC_TEST, groupId = TOPIC_GROUP2)
    public void topic_test1(ConsumerRecord<?, ?> record, Acknowledgment ack, @Header(KafkaHeaders.RECEIVED_TOPIC) String topic) {

        Optional message = Optional.ofNullable(record.value());
        if (message.isPresent()) {
            Object msg = message.get();
            log.info("topic_test1 消费了： Topic:" + topic + ",Message:" + msg);
            System.out.println("topic_test1 消费了： Topic:" + topic + ",Message:" + msg);
            ack.acknowledge();
        }
    }
}

```

测试通过post请求请求生产者的接口



注：

1.topic分成多个record存在partition中，offset是record在partition中的偏移量，所以在topic层面来说是无序的，在partition中是有序的

2.kafka集群中，topic可以存在不同的server的partition中



ack机制

- 0：生产者不等待broker的ack
- 1：leader确认
- -1：leader和follower都确认

注：

- 0和1会出现消息丢失的情况
  - 0，生产者发送消息途中，leader宕机
  - 1，生产者发送消息，leader收到后在与follower同步的时候leader宕机了



1.kafka如何保证消息不被重复消费

产生场景：消费者在消费了消息提交offset到zookeeper时，消费者进程被直接杀掉，重启后此时消费者已经消费，但是目前消息还是未消费状态

处理方式：将消费记录存入库中(数据库或者redis)，每次在消费的时候都去查询是否已经被消费过，若已经被消费则不处理

2.kafka如何保证顺序消费

​	topic层面是没有顺序的，partition里面的offset是有顺序的，可以将消息放在同一个partition下做顺序消费

3.ISR、OSR、AR

- ISR:	leader副本保持一定同步程度的副本（包括leader）组成ISR
- OSR:	速率和leader相差大于10秒的follower
- AR:	全部分区的follower

4.kafka的 HW、LEO

- HW:	leader和follower都存在的消息的最大offset偏移量
- LEO:	leader和follower的最大offset偏移量
- LSO:	当有事务存在时，LSO为事务中第一个offset的位置

举例：1个消息4个offset，ISR有3个副本，1个leader和2个follower，leader收到消息后offset为4，存在某一个时刻，follower1同步到的消息offset为3，follower2同步的消息的offset为2，此时的HW就为2，因为此时都存在的消息的offset最大为2












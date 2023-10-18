---
title: RabbitMQ
date: 2022-01-26 08:40:27
---

场景：需要基于队列实现消息传递，保证消息不被丢弃和稳定

##### 安装

###### 安装erlang

- 安装

```shell
yum install -y epel-release
```

```shell
wget https://packages.erlang-solutions.com/erlang-solutions-1.0-1.noarch.rpm
```

```shell
rpm -Uvh erlang-solutions-1.0-1.noarch.rpm
```

```shell
yum install -y erlang
```

- 验证安装成功

```shell
erl -version
```

###### 安装RabitMq

- 官网下载 RPM包，上传到服务器上

```shell
rpm -Uvh rabbitmq-server-3.9.12-1.el7.noarch.rpm
```

- 启动

```shell
systemctl start rabbitmq-server
```

- 查看状态

```shell
systemctl status rabbitmq-server
```

- 启动控制台

```
rabbitmq-plugins enable rabbitmq_management
```

- 添加用户名和密码以及设置权限

[参考](https://www.cnblogs.com/shangpolu/p/8275126.html)

```
rabbitmqctl add_user admin 123456
rabbitmqctl set_user_tags admin administrator
rabbitmqctl set_permissions -p / admin ".*" ".*" ".*"
```

- 访问

```
http://192.168.226.128:15672
```

##### 简单实现

- 依赖

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-amqp</artifactId>
</dependency>
```

###### 生产者

```java
import com.rabbitmq.client.*;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.Scanner;
import java.util.concurrent.TimeoutException;

public class provider {

    //队列名称
    private static final String QUEUE_NAME = "myQueue";
    //交换机名称
    private static final String EXCHANGE_NAME = "myDirectExchange";
    //设置一个路由键
    private static final String ROUTE_KEY = "routeKey";
    //队列是否持久化
    private static final boolean QUEUE_PERSISTENCE = true;
    //是否共享消息
    private static final boolean MESSAGE_SHART = false;
    //是否自动删除
    private static final boolean AUTO_DELETE = false;


    public static void main(String[] args) throws IOException, TimeoutException, InterruptedException {
        ConnectionFactory connectionFactory = new ConnectionFactory();
        connectionFactory.setHost("192.168.226.128");
        connectionFactory.setPort(5672);
        connectionFactory.setUsername("admin");
        connectionFactory.setPassword("123456");
        //创建连接
        Connection connection = connectionFactory.newConnection();
        //创建信道
        Channel channel = connection.createChannel();
        //信道绑定队列和配置参数
        channel.queueDeclare(QUEUE_NAME,QUEUE_PERSISTENCE,MESSAGE_SHART,AUTO_DELETE,null);
        //信道开启发布确认
        channel.confirmSelect();
        /**
         * 信道绑定交换机 交换机类型
         * 1.direct 严格校验routeKey,只有设置相同的routeKey的才能收到
         * 2.fanout 所有连接该交换机的队列都能收到
         * 3.topic 模糊匹配，关键词中间以点隔开，#号匹配1个或多个字，*匹配一个关键字
         * 4.headers 根据消息中的headers属性匹配
         */
        channel.exchangeDeclare(EXCHANGE_NAME,BuiltinExchangeType.DIRECT);
        //信道绑定交换机和队列
        channel.queueBind(QUEUE_NAME,EXCHANGE_NAME,ROUTE_KEY,null);

        //设置发送成功与否的监听器
        ConfirmCallback ackCallback = (deliveryTag, multiple) -> {
            //deliveryTag 消息序号，multiple是否批量确认
            System.out.println("["+deliveryTag +"]发送成功");
        };
        //设置失败回调函数
        ConfirmCallback nackCallback = (deliveryTag, multiple) -> {
            //deliveryTag 消息序号，multiple是否批量确认
            System.out.println("["+deliveryTag +"]发送失败");
        };
        channel.addConfirmListener(ackCallback, nackCallback);

        Scanner scanner = new Scanner(System.in);
        while(scanner.hasNextLine()){
            String str = scanner.next();
            /**
             * 发送消息
             * 1.交换机
             * 2.队列
             * 3.消息的属性 MessageProperties.PERSISTENT_TEXT_PLAIN 消息持久化
             * 4.消息体
             */
            //设置超时时间
            AMQP.BasicProperties basicProperties = new AMQP.BasicProperties().builder().expiration("10000").build();
            channel.basicPublish(EXCHANGE_NAME,ROUTE_KEY,basicProperties,str.getBytes(StandardCharsets.UTF_8));
            //调用方法确认
            while(true){
                //通过waitForConfirms可用于判断是否发送成功
                if(channel.waitForConfirms()){
                    System.out.println("消息发送成功:["+str+"]");
                    break;
                }
            }
        }
    }
}
```

###### 消费者

```java
import com.rabbitmq.client.*;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.TimeoutException;

public class consumer {

    //队列名称
    private static final String QUEUE_NAME = "myQueue";
    //交换机名称
    private static final String EXCHANGE_NAME = "myDirectExchange";
    //设置一个路由键
    private static final String CONSUMER_ROUTE_KEY = "routeKey1";
    //死信队列名称
    private static final String DEAD_QUEUE_NAME = "myDeadQueue";
    //死信交换机名称
    private static final String DEAD_EXCHANGE_NAME = "myDeadDirectExchange";
    //设置一个死信路由键
    private static final String CONSUMER_DEAD_ROUTE_KEY = "routeKeyDead";
    //是否自动应答
    private static final boolean AUTO_ACK = false;
    //是否批量应答
    private static final boolean BATCH_ACK_FLAG = false;

    public static void main(String[] args) throws IOException, TimeoutException {
        ConnectionFactory connectionFactory = new ConnectionFactory();
        connectionFactory.setHost("192.168.226.128");
        connectionFactory.setPort(5672);
        connectionFactory.setUsername("admin");
        connectionFactory.setPassword("123456");
        //创建连接
        Connection connection = connectionFactory.newConnection();
        //创建信道
        Channel channel = connection.createChannel();
        //设置预取值 0-是公平分发即轮询获取 >=1-不公平分发(理解:信道的容量，即最多堆积的数量)
        channel.basicQos(1);
        //设置交换机
        channel.exchangeDeclare(EXCHANGE_NAME,BuiltinExchangeType.DIRECT);
        //信道绑定交换机和队列
        channel.queueBind(QUEUE_NAME,EXCHANGE_NAME,CONSUMER_ROUTE_KEY,null);

        Map<String, Object> arguments = new HashMap<>();
        arguments.put("x-dead-letter-exchange",DEAD_EXCHANGE_NAME); //设置死信交换机
        arguments.put("x-dead-letter-routing-key",CONSUMER_DEAD_ROUTE_KEY); //设置死信路由键
        arguments.put("x-max-length",20); //设置最大存储消息量
        //设置死信交换机
        channel.exchangeDeclare(DEAD_EXCHANGE_NAME,BuiltinExchangeType.DIRECT);
        //信道绑定死信交换机和死信队列
        channel.queueBind(DEAD_QUEUE_NAME,DEAD_EXCHANGE_NAME,CONSUMER_DEAD_ROUTE_KEY,null);
        //信道绑定队列
        channel.queueDeclare(QUEUE_NAME,false,false,false,arguments);
        channel.queueDeclare(DEAD_QUEUE_NAME,false,false,false,arguments);


        //正常消费回调函数
        DeliverCallback deliverCallback = (consumerTag,message) ->{
            //打印接收到的消息信息
            System.out.println("消费者["+consumerTag+"]:" +
                    "消息序号["+message.getEnvelope().getDeliveryTag()+"]:" +
                    "路由键["+message.getEnvelope().getRoutingKey()+"]:"+
                    "内容["+new String(message.getBody())+"]");
            //手动应答
            channel.basicAck(message.getEnvelope().getDeliveryTag(),BATCH_ACK_FLAG);
        };
        //取消消费的回调函数
        CancelCallback cancelCallback = (consumerTag) -> {
            System.out.println("这是返回的回调");
        };

        /**
         * 1.队列名
         * 2.应答方式 true-自动应答 false-手动应答
         * 3.回调函数
         * 4.取消消费的回调
         */
        channel.basicConsume(QUEUE_NAME,AUTO_ACK,deliverCallback,cancelCallback);
    }
}
```

注：

- 一个信道可以对应多个交换机，一个交换机可以绑定多个队列
- 交换机和队列中间有个routing_key(路由键)，路由键在交换机是direct的时候起作用
- 死信队列出现的情况
  - 消息被拒绝
  - 消息超时响应
  - 队列达到最大长度

- 消息的应答方式有自动应答和手动应答，手动应答时可通过回调函数处理逻辑
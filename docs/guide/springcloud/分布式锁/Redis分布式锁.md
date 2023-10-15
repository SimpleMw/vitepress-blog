---
title: redis分布式锁使用
date: 2021-04-22 10:20:27
---

##### [安装redis]()

##### 整合redis

##### 简单的原生实现

- 依赖

```XML
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-redis</artifactId>
    <version>2.1.5.RELEASE</version>
</dependency>
```

- 创建加锁和解锁方法

```java
@Component
public class RedisLockCommon {
    @Resource
    private RedisTemplate redisTemplate;

    /**
     * Redis加锁的操作
     * @param key
     * @param value
     * @return
     */
    public Boolean tryLock(String key, String value) {

            //创建redis键值对,设置超时时间为2000毫秒
            boolean localresult = redisTemplate.opsForValue().setIfAbsent(key,value,2000,TimeUnit.MILLISECONDS);
            System.out.println("key："+key+" value: "+value);
            if(localresult){
                System.out.println("创建成功");
                return true;
            }if(!localresult){
                System.out.println("已存在，循环等待");
                return false;
            }

        return false;
    }


    /**
     * Redis解锁的操作
     * @param key
     * @param value
     */
    public void unlock(String key, String value) {
        String currentValue = redisTemplate.opsForValue().get(key).toString();
        try {
            if (StringUtil.isNotEmpty(currentValue) && currentValue.equals(value)) {
                redisTemplate.opsForValue().getOperations().delete(key);
            }
        } catch (Exception e) {
        }
    }
}
```

- Service写法

```java
@Resource
private RedisLockCommon redisLock;    

public void doThings(){
    String key = "dec_store_lock";
    String value = UUID.randomUUID().toString();
    try {
        boolean  flag = true;
        while(flag){
            if(redisLock.tryLock(key, value)){
                
                //这里写要执行的代码

                //将flag改为false
                flag = false;
            }
        }
    } catch (Exception e) {
        e.printStackTrace();
    } finally {
        //解锁
        redisLock.unlock(key, value);
    }

}
```

注：本例子只是为了简单实现redis分布式锁，未表示出可重入锁、和看门狗特性，具体请百度

也可使用jedis来实现，Jedis 是简单的封装了 Redis 的API库，可以看作是Redis客户端，它的方法和Redis 的命令很类似，尝试加锁的命令是 setnx()

##### <font color=red>redis分布式锁实现原理</font>

1.关键在于setIfAbsent()方法，对应linux命令setnx，即若已经存在同样的key则返回false，若不存在则创建

2.加锁即在该key中，将区分本线程与其它线程的信息写入该key的value中，可以是本线程产生的uuid也可以是本线程的线程id

3.未抢到锁的线程需不断地循环去获取锁，即创建 键值对



##### 使用redisson实现

- 依赖

```XML
<!-- https://mvnrepository.com/artifact/org.redisson/redisson -->
<dependency>
    <groupId>org.redisson</groupId>
    <artifactId>redisson</artifactId>
    <version>3.15.4</version>
</dependency>
```

- 实现代码，创建client客户端

```java
String host = "localhost";
String port = "6379";

/**
* 创建redisson
* @return
*/
@Bean
public RedissonClient redissonClient() {
    Config config = new Config();
    config.useSingleServer().setAddress("redis://" + host + ":" + port);
    return Redisson.create(config);
}
```

- 使用

```java
@Autowired
private RedissonClient redissonClient;

public void doThings(){
    //作为锁的key
	String key = "lock_product";
    RLock lock  = redissonClient.getLock(key);

    try {
        //尝试获取锁操作，当获取到成功后即执行要实现的代码，否则则一直循环尝试获取锁
        //第一个参数是等待时间该时间后获取不到锁，则直接返回。 第二个参数是强制释放时间
        boolean flag = lock.tryLock(5000, 60000, TimeUnit.MILLISECONDS);
        if (flag) {
            //这中间是要实现的代码
        }
    } catch (InterruptedException e) {
        e.printStackTrace();
    } finally {
        //执行完毕后解锁
        lock.unlock();
    }
}
```




---
title: webflux
date: 2024-1-3 19:20:27
---

##### 介绍

- spring webflux 类比于 spring mvc
- spring mvc 使用Servlet(阻塞式I/O模型)，spring webflux 使用Reactive(非阻塞式I/O模型)

##### Reactive两个类

###### 创建

- Mono

```java
Mono<Integer> integerMono = Mono.just(1);
```

```java
Mono<String> stringMono = Mono.fromSupplier(() -> "1");
```

- Flux

```java
Flux<Integer> integerFlux = Flux.just(1,2,3,4,5);
```

```java
Flux<String> stringFlux = Flux.fromStream(IntStream.range(1, 5).mapToObj(i -> {
    return "数字"+i;
}));
```

###### 区别

- 都是实现的provider类
- Mono存放一个值，Flux存放多个值

##### webflux使用

###### 注解方式

```java
@GetMapping("/hellowOne")
public Mono<String> hellowTwo(){
    log.info("StartTime:"+System.currentTimeMillis());
    Mono<String> result = Mono.fromSupplier(() -> "1");
    log.info("EndTime:"+System.currentTimeMillis());
    return result;
}
```

```java
@GetMapping(value = "/pushStr",produces = MediaType.TEXT_EVENT_STREAM_VALUE)
public Flux<String> pushStr(){
    Flux<String> result = Flux.fromStream(IntStream.range(1, 5).mapToObj(i -> {
        return "打印数字" + i;
    }));
    return result;
}
```

###### handler方式

- handler类(相当于Controller)

```java
@Component
@Slf4j
public class TestHandler {

    @Autowired
    private TestDemoService testDemoService;

    /**
     * Mono和 Flux都是实现的Provider接口,都是属于发布者
     * 两者区别在于 Mono只能返回一个信息,Flux可以返回多个信息
     */

    public Mono<ServerResponse> hallowTwo(ServerRequest request){
        return ServerResponse.ok().contentType(MediaType.TEXT_PLAIN)
                .body(Mono.fromSupplier(() -> "1"),String.class);
    }

    public Mono<ServerResponse> pushStr(ServerRequest request){
        return ServerResponse.ok().contentType(MediaType.TEXT_PLAIN)
                .body(Flux.fromStream(() -> IntStream.range(1, 5).mapToObj(i -> {
                    try {
                        TimeUnit.SECONDS.sleep(1);
                    } catch (InterruptedException e) {

                    }
                    return "print number: " + i;
                })),String.class);
    }
}
```

- 路由类

```java
@Configuration
public class RoutingConfiguration {

    @Bean
    public RouterFunction<ServerResponse> monoRouterFunction(TestHandler testHandler) {

        //路由函数的编写
        return RouterFunctions.nest(
                RequestPredicates.path("/test1"), //前缀，相当于Controller上面的RequestMapping
                RouterFunctions.route(RequestPredicates.GET("hellowTree"),testHandler::hallowTwo)
                        .andRoute(RequestPredicates.GET("pushStr"),testHandler::pushStr)
        );
    }
}
```

注：

- Spring mvc 请求和响应对象
  - HttpServerRequest
  - HttpServerResponse
- spring webflux 请求和响应对象
  - ServerRequest
  - ServerResponse

- 非阻塞式请求不是说响应时间会减短，而是当处理的业务逻辑复杂时，当前主线程不会进行等待，可以将更多的资源用于其它的请求

```java
/**
     * 阻塞式
     */
@GetMapping("/hellowOne")
public String hellowOne(){
    log.info("StartTime:"+System.currentTimeMillis());
    String str = testDemoService.doThings();
    log.info("EndTime:"+System.currentTimeMillis());
    return str;
}

/**
     * 非阻塞式
     */
@GetMapping("/hellowTwo")
public Mono<String> hellowTwo(){
    log.info("StartTime:"+System.currentTimeMillis());
    Mono<String> result = Mono.fromSupplier(() -> testDemoService.doThings());
    log.info("EndTime:"+System.currentTimeMillis());
    return result;
}
```

```java
@Service
public class TestDemoService {
    public String doThings(){
        //此处模拟实际业务,线程暂停6秒
        try {
            Thread.sleep(6000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        return "this is my message";
    }
}
```



##### http请求

```java
import org.springframework.http.MediaType;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.ClientRequest;
import org.springframework.web.reactive.function.client.ExchangeFilterFunction;
import org.springframework.web.reactive.function.client.ExchangeFunction;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.util.UriComponentsBuilder;
import reactor.core.publisher.Mono;

import java.util.Map;

public class HTTPUtils {

    //post请求
    public static String doPost(String url, Object body,Map<String,String> header){

        WebClient webClient = WebClient.create();
        //传入头数据
        if(header != null && !header.isEmpty()){
            webClient = webClient.mutate().filter(addCustomHeaders(header))
                    .build();
        }
        Mono<String> stringMono = webClient.post()
                .uri(url)
                .contentType(MediaType.APPLICATION_JSON)
                .body(BodyInserters.fromObject(body))
                .retrieve()
                .bodyToMono(String.class);
        return stringMono.block();
    }

	//get请求
    public static String doGet(String url, Map<String,Object> map,Map<String,String> header){
        WebClient webClient = WebClient.create();
        UriComponentsBuilder builder = UriComponentsBuilder.fromHttpUrl(url);
        for (Map.Entry<String, Object> entry : map.entrySet()) {
            builder.queryParam(entry.getKey(), entry.getValue());
        }
        //传入头数据
        if(header != null && !header.isEmpty()){
            webClient = webClient.mutate().filter(addCustomHeaders(header))
                    .build();
        }
        String uri = builder.build().toUriString();
        Mono<String> stringMono = webClient.get()
                .uri(uri)
                .retrieve()
                .bodyToMono(String.class);
        return stringMono.block();
    }

    private static ExchangeFilterFunction addCustomHeaders(Map<String,String> header) {
        return (ClientRequest request, ExchangeFunction next) -> {
            ClientRequest.Builder requestBuilder = ClientRequest.from(request);
            header.keySet().forEach(
                    s -> {
                        requestBuilder.header(s, header.get(s));
                    }
            );
            ClientRequest newRequest = requestBuilder.build();
            return next.exchange(newRequest);
        };
    }
}
```


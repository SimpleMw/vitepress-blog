---
title: jwt理解
date: 2020-10-28 18:34:36
category: java基础相关
tag: java
top_img: false
---

#### 组成

java web token简称jwt

- 组成

  - 头部(header)

    头部存 类型和加密算法

    ```json
    { 
    “typ”: “JWT”, 
    “alg”: “HS256” 
    }
    ```

  - 有效载荷(playload)

    实际需要保存的参数，如token签发者、签发时间、到期时间，以及如用户名之类的后续需要用到的参数。 注：如密码等涉及到安全的信息不宜放进去

  - 签名(signature)

    头部和有效载荷加上密钥通过头部里面的加密算法进行加密后得到

- 头部与有效载荷均通过base64进行加密

#### 应用环境

二次登录，即第一次登录后，关闭页面，一段时间内重新访问不需要重新登录

- 原实现方式：由服务器存储登录信息，当第二次请求过来时判断以前是否登录过，若是则直接访问

  - 客户端请求
  - 服务器产生登录信息
  - 登录信息传给客户端，客户端存储在cookie中
  - 客户端第二次访问时带cookie请求
  - 服务器端进行校验

  注：弊端，由于登录信息存在session中，即存在内存中会占用服务器资源

- 现解决办法：第一次登录请求，服务器产生token，存储客户端，第二次访问校验token
  - 客户端请求
  - 服务端产生token
  - 客户端存储token
  - 客户端第二次访问时带token
  - 服务器进行校验

#### 解决疑问

- token的头部和有效载荷通过base64加密安全吗？

  答：正因为如此，不能在有效载荷中放入涉及安全的信息如密码

- 有效载荷被篡改了怎么办？

  答：由服务器产生，由服务器校验，即使token在第二次请求的时候被拦截，然后对里面的有效载荷进行篡改，在进行校验的时候，会比对签名串信息，若将头部和有效载荷以及密钥进行加密后与签名串不能匹配则表示被篡改





#### 代码实现

- 依赖

```xml
<dependency>
    <groupId>com.auth0</groupId>
    <artifactId>java-jwt</artifactId>
    <version>3.18.2</version>
</dependency>
```

- 实现类

```java
private static String SecretKey = "5oiR5piv5aSn5biF5ZOl";

public static void main(String[] args) {
    String token = creatToken();
    analysisToken(token);
}

//生成jwt
public static String creatToken(){
    Map<String, Object> map = new HashMap<>();
    map.put("alg", "HS256");
    map.put("typ", "JWT");

    LocalDateTime nowLocalDateTime = LocalDateTime.now();
    //获取当前时间
    Date nowDate = Date.from(nowLocalDateTime.atZone(ZoneId.systemDefault()).toInstant());
    //获取到期时间
    LocalDateTime expireLocalDateTime = nowLocalDateTime.plusMinutes(30);
    Date expireDate = Date.from(expireLocalDateTime.atZone(ZoneId.systemDefault()).toInstant());

    //根据用户名和密码生成token
    String token = JWT.create()
        .withHeader(map)  //传入头数据
        .withSubject("test")
        //传入自定义的键值对
        .withClaim("username","wp")
        .withClaim("account","13245678912")
        .withIssuedAt(nowDate)              //签名时间
        .withExpiresAt(expireDate)          //过期时间
        //设置签名
        .sign(Algorithm.HMAC256(SecretKey));   //签名

    System.out.println(token);
    return token;
}

//解析jwt
public static void analysisToken(String token){
    JWTVerifier verifier = JWT.require(Algorithm.HMAC256(SecretKey)).build();
    //判断签名是否有效
    try {
        DecodedJWT jwt = verifier.verify(token);
    } catch (SignatureVerificationException e) {
        e.printStackTrace();
        System.out.println("签名校验失败");
    }

    DecodedJWT decodedJWT = JWT.decode(token);
    //解析token
    Map<String, Claim> map = decodedJWT.getClaims();
    Iterator<Map.Entry<String,Claim>> it=map.entrySet().iterator();
    while(it.hasNext()){
        Map.Entry<String,Claim> entry=it.next();
        System.out.println("key:"+entry.getKey()+" "
                           +"Value:"+entry.getValue());
    }
}
```


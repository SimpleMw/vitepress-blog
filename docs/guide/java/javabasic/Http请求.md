---
title: Http请求
date: 2020-12-15 18:34:36
---

场景：后台Http请求其它接口获取token

#### 常规

##### GET请求

```java
private String HttpGetUrlJump(String getUrl, Map<String, Object> HeaderParams, Map<String, Object> params) {
    String result = "";
    try {
        //拼url
        if (params != null) {
            Iterator<String> it = params.keySet().iterator();
            StringBuffer sb = null;
            while (it.hasNext()) {
                String key = it.next();
                String value = (String) params.get(key);
                if (sb == null) {
                    sb = new StringBuffer();
                    sb.append("?");
                } else {
                    sb.append("&");
                }
                sb.append(key);
                sb.append("=");
                sb.append(value);
            }
            getUrl += sb.toString();
        }

        //创建url
        URL url = new URL(getUrl);
        //创建连接对象（HttpURLConnection是实现的接口URLConnection）
        HttpURLConnection connection = (HttpURLConnection) url.openConnection();
        //默认为true，设置后可使用inputStream获取数据
        connection.setDoInput(true);
        //设置为GET提交
        connection.setRequestMethod("GET");
        //Post 请求不能使用缓存
        connection.setUseCaches(false);
        //最高超时时间
        connection.setConnectTimeout(60000);
        //最高读取时间
        connection.setReadTimeout(60000);
        //最高连接时间
        connection.setConnectTimeout(60000);
        //设置本次连接是否自动重定向
        connection.setInstanceFollowRedirects(false);

        //判断是否需要Header传参
        if (HeaderParams.size() > 0) {
            Set<String> set = HeaderParams.keySet();
            for (String str : set) {
                //设置每一条请求头信息
                connection.setRequestProperty(str, (String) HeaderParams.get(str));
            }
        }
        //连接
        connection.connect();

        //获取响应
        BufferedReader reader = new BufferedReader(new InputStreamReader(connection.getInputStream()));
        String line;
        while ((line = reader.readLine()) != null) {
            result += line;
        }
        //关闭reader
        reader.close();
        //断开连接
        connection.disconnect();
        return result;
    } catch (Exception e) {
        e.printStackTrace();
        return result;
    }
}
```



上面拼url方法来自网络，非常巧妙，使用一个外接变量，初始设为null判断为null为第一次的方式巧妙地确定了第一次---------------------<font color=red>good，good，good，机智，机智，机智</font>

##### POST请求

需要传入url，请求头header，请求body信息(都以map的形式传入)

```java
private String HttpPostUrlJump(String postUrl, Map<String,Object> HeaderParams, Map<String,Object> params){
    String result="";
    try {
        //创建url
        URL url = new URL(postUrl);
        //创建连接对象（HttpURLConnection是实现的接口URLConnection）
        HttpURLConnection connection = (HttpURLConnection) url.openConnection();
        //默认未false,设置后可使用outputStream传数据；若为get请求不需开启
        connection.setDoOutput(true);
        //默认为true，设置后可使用inputStream获取数据
        connection.setDoInput(true);
        //设置为post提交
        connection.setRequestMethod("POST");
        //Post 请求不能使用缓存
        connection.setUseCaches(false);
        //最高超时时间
        connection.setConnectTimeout(60000);
        //最高读取时间
        connection.setReadTimeout(60000);
        //最高连接时间
        connection.setConnectTimeout(60000);
        //设置本次连接是否自动重定向
        connection.setInstanceFollowRedirects(false);
        //设置请求头信息key，value
        //Content-Type设置发送的内容编码类型,通用使用application/x-www-form-urlencoded，json使用application/json
        connection.setRequestProperty("Content-Type","application/json");

        //判断是否需要Header传参
        if(HeaderParams.size()>0){
            Set<String> set = HeaderParams.keySet();
            for (String str : set) {
                //设置每一条请求头信息
                connection.setRequestProperty(str, (String) HeaderParams.get(str));
            }
        }

        //连接
        connection.connect();
        // 得到请求的输出流对象
        OutputStreamWriter writer = new OutputStreamWriter(connection.getOutputStream(),"UTF-8");
        //传入请求体信息body为json格式
        if(params.size()>0){
            //传入body内容json格式
            JSONObject json = new JSONObject(params);
            writer.write(String.valueOf(json));
        }else{
            //传入参数为空时传入{}
            writer.write("{}");
        }
        //刷新缓冲区
        writer.flush();
        //关闭writer
        writer.close();

        //获取响应
        BufferedReader reader = new BufferedReader(new InputStreamReader(connection.getInputStream()));
        String line;
        while ((line = reader.readLine()) != null){
            result += line;
        }
        //关闭reader
        reader.close();
        //断开连接
        connection.disconnect();
        return result;
    } catch (Exception e) {
        e.printStackTrace();
        return result;
    }
}
```

注：其中有些值还是写死，具体情况具体修改

Http的两种提交方式跳转：[GET,POST比较](https://simplemw.gitee.io/blog/2020/11/12/spring-基础.html#web提交)

#### OkHttp

##### 依赖

```xml
<dependency>
    <groupId>com.squareup.okhttp3</groupId>
    <artifactId>okhttp</artifactId>
    <version>3.9.0</version>
</dependency>
<dependency>
    <groupId>com.alibaba</groupId>
    <artifactId>fastjson</artifactId>
    <version>1.2.61</version>
</dependency>
<dependency>
    <groupId>org.apache.commons</groupId>
    <artifactId>commons-lang3</artifactId>
    <version>3.4</version>
</dependency>
<dependency>
    <groupId>org.projectlombok</groupId>
    <artifactId>lombok</artifactId>
    <version>1.18.12</version>
</dependency>
```

##### 实现

```java
import com.alibaba.fastjson.JSON;
import lombok.extern.slf4j.Slf4j;
import okhttp3.*;
import org.apache.commons.lang3.exception.ExceptionUtils;

import java.io.File;
import java.util.Map;
import java.util.Objects;
import java.util.concurrent.TimeUnit;

@Slf4j
public class OkHttpUtil {

    public static final MediaType jsonType = MediaType.parse("application/json; charset=utf-8");

    public static final MediaType mediaType = MediaType.parse("application/octet-stream");

    public final static OkHttpClient okHttpClient = new OkHttpClient.Builder()
            .connectTimeout(8000, TimeUnit.MILLISECONDS)
            .readTimeout(8000, TimeUnit.MILLISECONDS)
            .build();

    /**
     * 发送get请求通过Form表单形式
     *
     * @param reqUrl 请求url
     * @param mapParam 请求参数
     *
     */
    public static String sendGetByForm(String reqUrl, Map<String,String> mapParam,Map<String, String> mapHeader){
        try {
            long startTime = System.currentTimeMillis();
            //循环将键值对拼接到url总
            HttpUrl.Builder urlBuilder = Objects.requireNonNull(HttpUrl.parse(reqUrl)).newBuilder();
            for (Map.Entry<String, String> entry : mapParam.entrySet()) {
                urlBuilder.addQueryParameter(entry.getKey(), entry.getValue());
            }
            String url = urlBuilder.build().toString();
            Request.Builder builder = new Request.Builder().url(url).get();
            //添加请求头
            if (mapHeader != null && !mapHeader.isEmpty()) {
                for (Map.Entry<String, String> entry : mapHeader.entrySet()) {
                    String key = entry.getKey();
                    String value = entry.getValue();
                    builder.header(key, value);
                }
            }
            try(Response response = okHttpClient.newCall(builder.build()).execute()){
                String body = response.body().string();
                log.info("{} response body:{}", reqUrl.substring(reqUrl.lastIndexOf("/") + 1),
                        body);
                return body;
            }catch(Exception e){
                log.error("调用接口出错\n"+ ExceptionUtils.getMessage(e));
            }finally{
                long endTime = System.currentTimeMillis();
                log.info("{} cost time:{}", reqUrl.substring(reqUrl.lastIndexOf("/") + 1),
                        (endTime - startTime));
            }
        } catch (Exception e) {
            log.error("error", e);
        }
        return null;
    }



    /**
     * 发送post请求通过Form表单形式
     *
     * @param reqUrl 请求url
     * @param mapParam 请求参数
     *
     */
    public String sendPostByForm(String reqUrl, Map<String,String> mapParam,Map<String, String> mapHeader){
        try {
            long startTime = System.currentTimeMillis();
            //循环form表单，将表单内容添加到form builder中
            FormBody.Builder formBody = new FormBody.Builder();
            for (Map.Entry<String, String> m : mapParam.entrySet()) {
                String name = m.getKey();
                String value = m.getValue();
                formBody.add(name, value);
            }
            //构建formBody(formBody.build())，将其传入Request请求中
            Request.Builder builder = new Request.Builder().url(reqUrl).post(formBody.build());
            //添加请求头
            if (mapHeader != null && !mapHeader.isEmpty()) {
                for (Map.Entry<String, String> entry : mapHeader.entrySet()) {
                    String key = entry.getKey();
                    String value = entry.getValue();
                    builder.header(key, value);
                }
            }
            try(Response response = okHttpClient.newCall(builder.build()).execute()){
                String body = response.body().string();
                log.info("{} response body:{}", reqUrl.substring(reqUrl.lastIndexOf("/") + 1),
                        body);
                return body;
            }catch(Exception e){
                log.error("调用接口出错\n"+ ExceptionUtils.getMessage(e));
            }finally{
                long endTime = System.currentTimeMillis();
                log.info("{} cost time:{}", reqUrl.substring(reqUrl.lastIndexOf("/") + 1),
                        (endTime - startTime));
            }
        } catch (Exception e) {
            log.error("error", e);
        }
        return null;
    }

    /**
     * 发送post请求通过JSON参数
     *
     * @param reqUrl 请求url
     * @param param 请求参数
     *
     */
    public String sendPostByJson(String reqUrl, Object param,Map<String, String> mapHeader){
        try {
            String paramStr = JSON.toJSONString(param);

            RequestBody requestBody = RequestBody.create(jsonType, paramStr);
            long startTime = System.currentTimeMillis();
            Request.Builder builder = new Request.Builder().url(reqUrl).post(requestBody);
            //添加请求头
            if (mapHeader != null && !mapHeader.isEmpty()) {
                for (Map.Entry<String, String> entry : mapHeader.entrySet()) {
                    String key = entry.getKey();
                    String value = entry.getValue();
                    builder.header(key, value);
                }
            }
            try(Response response = okHttpClient.newCall(builder.build()).execute()){
                String body = response.body().string();
            }catch(Exception e){
                log.error("调用接口出错\n"+ ExceptionUtils.getMessage(e));
            }finally{
                long endTime = System.currentTimeMillis();
                log.info("{} cost time:{}", reqUrl.substring(reqUrl.lastIndexOf("/") + 1),
                        (endTime - startTime));
            }
        } catch (Exception e) {
            log.error("error", e);
        }
        return null;
    }

    /**
     * 上传文件
     *
     * @param reqUrl 请求url
     * @param file 上传的文件
     * @param fileName 文件名称
     *
     */
    public String uploadFile(String reqUrl, File file, String fileName,Map<String, String> mapHeader) {
        try {
            RequestBody fileBody = RequestBody.create(mediaType, file);
            RequestBody requestBody = new MultipartBody.Builder()
                    .setType(MultipartBody.FORM)
                    .addFormDataPart("fileName", fileName)
                    .addFormDataPart("file", fileName, fileBody).build();

            long startTime = System.currentTimeMillis();
            Request.Builder builder = new Request.Builder().url(reqUrl).post(requestBody);
            //添加请求头
            if (mapHeader != null && !mapHeader.isEmpty()) {
                for (Map.Entry<String, String> entry : mapHeader.entrySet()) {
                    String key = entry.getKey();
                    String value = entry.getValue();
                    builder.header(key, value);
                }
            }
            try(Response response = okHttpClient.newCall(builder.build()).execute()){
                return response.body().string();
            }catch(Exception e){
                log.error("调用接口出错\n"+ ExceptionUtils.getMessage(e));
            }finally{
                long endTime = System.currentTimeMillis();
                log.info("{} cost time:{}", reqUrl.substring(reqUrl.lastIndexOf("/") + 1),
                        (endTime - startTime));
            }
        } catch (Exception e) {
            log.error("error", e);
        }
        return null;
    }
}
```


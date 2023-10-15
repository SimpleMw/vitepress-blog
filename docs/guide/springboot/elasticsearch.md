---
title: elasticsearch
date: 2023-03-10 18:12:13
---



#### 下载和安装

- 官网下载

  - docker 下载

  ```shell
  docker pull docker.elastic.co/elasticsearch/elasticsearch:8.4.3
  ```

  - 启动

  ```java
  docker run -d --name es -p 9200:9200 -p 9300:9300 -e "discovery.type=single-node" -e "ES_JAVA_OPTS=-Xms512m -Xmx512m"  ce2b9dc7fe85
  ```

- 设置相关参数

  - 设置跨域以及ip地址

  ```
  http.cors.enabled: true
  http.cors.allow-origin: "*"
  network.host: 127.0.0.1
  ```

  - 设置用户名和密码

  ```shell
  .\elasticsearch-reset-password --username elastic -i
  ```

  

#### 常见的Restful请求操作

##### 名词解释

- 索引(相当于mysql的数据库)
- 类型(相当于mysql的表)
- 文档(相当于mysql的行)

- 字段(相当于mysql的列)



- 相关restful请求接口
- 新增 PUT
  - 索引 article
  - 4个分片 1个副本

```
http://127.0.0.1:9200/article

{
	"settings": {
		"number_of_shards": "4",
		"number_of_replicas": "1"
	},
	"mappings": {
		"properties": {
			"id": {
				"type": "long",
				"store": true
			},
			"title": {
				"type": "text",
				"store": true,
				"index": true,
				"analyzer": "standard"
			},
			"content": {
				"type": "text",
				"store": true,
				"index": true,
				"analyzer": "standard"
			}
		}
	}
}
```

- 新增数据 mappings

```
put http://127.0.0.1:9200/article/_mappings

{
    "mappings":{
        "properties":{
            "id":{
                "type":"long",
                "store":true
            },
            "title":{
                "type":"text",
                "store":true,
                "index":true,
                "analyzer":"standard"
            },
            "content":{
                "type":"text",
                "store":true,
                "index":true,
                "analyzer":"standard"
            }
        }
    }
}
```

- 查询GET

```
http://localhost:9200/_cat/indices   //查询当前所有的索引
```

```
http://127.0.0.1:9200/article/_mappings   //查询索引详情
```

```
http://localhost:9200/article/_search     //查询内容

{
    "query": {
        "query_string": {
            "query": "message1"
        }
    },
    "size": 10,
    "from": 0,
    "sort": []
}
```

```
{
    "query": {
        "match": {
            "content": "仙人"
        }
    },
    "size": 10,
    "from": 0,
    "sort": []
}
```

- 删除 DELETE

```
localhost:9200/article?pretty
```

- 传入数据

```
localhost:9200/articl/_doc

{
    "id":1,
    "title":"标题",
    "content":"内容"
}
```

- 查询文档

```
POST http://localhost:9200/article/_search?q=title:标题
{
    "size":10,
    "from":0,
    "_source":["title","content"],
    "sort":[
        {
            "id":"desc"
        }
    ]
}
```





#### 简单整合

- 依赖

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-elasticsearch</artifactId>
</dependency>
```

- 配置

```yaml
spring:         
  elasticsearch:
    rest:
      uris: localhost:9200
```

- 映射实体类

```java
@Data
@Document(indexName = "article")
public class Article {

    @Id
    private String id;
    private String title;
    private String content;
}
```

- 接口映射 Repository

```java
@Repository
public interface ArticleRepository extends ElasticsearchRepository<Article,String> {
    Iterable<Article> findByTitle(String s);

    List<Article> findByContent(String s);
}
```

- crud

```java
@Service
public class DemoService {

    @Autowired
    private ArticleRepository articleRepository;

    public void save(){
        Article article = new Article();
        article.setId("1");
        article.setTitle("经乱离后天恩流夜郎忆旧游书怀赠江夏韦太守良宰");
        article.setContent("天上白玉京，十二楼五城。\n" +
                "仙人抚我顶，结发受长生。\n" +
                "误逐世间乐，颇穷理乱情。\n" +
                "九十六圣君，浮云挂空名。\n" +
                "天地赌一掷，未能忘战争。\n" +
                "试涉霸王略，将期轩冕荣。");
        articleRepository.save(article);
    }

    public void get(){
        Iterable<Article> all = articleRepository.findAll();
        for (Article article:all) {
            System.out.println(article.toString());
        }
    }

    public void get1(String message){
        Iterable<Article> all = articleRepository.findByContent(message);
        for (Article article:all) {
            System.out.println(article.toString());
        }
    }

    public void update(){
        Article article = new Article();
        article.setId("1");
        article.setTitle("这是我修改后的名称");
        article.setContent("这是我修改之后的内容");
        articleRepository.save(article);
    }

    public void delete(){
        //Article article = new Article();
        //articleRepository.delete(article);
        articleRepository.deleteByContent("白玉京");
    }
}
```




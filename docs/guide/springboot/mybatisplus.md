---
title: Mybaisplus相关
date: 2020-11-07 10:20:27
---

此为mybatisplus的使用方式  mybatis [点击](http://simplemw.gitee.io/blog/2020/11/26/spring-mybatis.html) 进入

### QueryWrapper构造器方式

QueryWrapper构造器是来构建where条件的，所以只有删改查才会用到

#### 步骤1

- mapper类继承 BaseMapper<>类

```java
@Mapper
public interface PojoMapper extends BaseMapper<Pojo> {
}
```

#### 步骤2

- serviceimple类调用方法

##### 查询

```java
//创建queryWrapper对象
QueryWrapper<Pojo> queryWrapper = new QueryWrapper<>();
//传入有值类条件
queryWrapper.eq("表字段名","值");
//传入无值类条件 表字段名 is not null
queryWrapper.isNotNull("表字段名")
//传入无值类条件 表字段名 is null
queryWrapper.isNull("表字段名")
//查询
PojoMapper.selectList(queryWrapper);
```

如果是in的查询条件的话，就将eq改为in

##### 修改

```java
//创建queryWrapper对象
QueryWrapper<Pojo> queryWrapper = new QueryWrapper<>();
//传入有值类条件
queryWrapper.eq("表字段名","值");
//传入无值类条件 表字段名 is not null
queryWrapper.isNotNull("表字段名")
//传入无值类条件 表字段名 is null
queryWrapper.isNull("表字段名")
//查询
PojoMapper.update(pojo对象,queryWrapper);
```

queryWrapper中的值为where后的条件，实际的修改是将pojo中的数据替换满足条件的数据

##### 删除

```java
//创建queryWrapper对象
QueryWrapper<Pojo> queryWrapper = new QueryWrapper<>();
//传入有值类条件
queryWrapper.eq("表字段名","值");
//传入无值类条件 表字段名 is not null
queryWrapper.isNotNull("表字段名")
//传入无值类条件 表字段名 is null
queryWrapper.isNull("表字段名")
//查询
PojoMapper.delete(queryWrapper);
```

##### 增加

```java
PojoMapper.insert(pojo对象);
```

注：增加不需要创建queryWrapper来构建条件

##### 分页查询

mybatisplus 使用pagehelper分页

- mybatisplus自带了pagehelper不用注入依赖
- 添加配置类

```java
@Configuration
public class MybatisPlus {
    @Bean
    public PaginationInterceptor paginationInterceptor() {
        PaginationInterceptor paginationInterceptor = new PaginationInterceptor();
        return paginationInterceptor;
    }
}
```

- application或者bootstrap配置

```yaml
pagehelper:
  #默认为false,合理化查询，页码<=0的时候查询第一页，超过最大页查询最后一页
  reasonable: true
  #默认为false,设置为true当设置pageSize为0的时候查全部
  pageSizeZero: true #pageSize=0
  #默认为false,判断Dao要执行的方法参数列表是否有pageNum和pageSize参数，有会自动进行分页
  supportMethodsArguments: true
  #默认为false,多数据源时自动识别分页方言
  autoRuntimeDialect: true
```

- mapper配置(plus中需要mapper去继承BaseMapper)

```java
@Mapper
public interface PrintTemplateMapper extends BaseMapper<PrintTemplate> {
}
```

- service中写法

```java
QueryWrapper<PrintTemplate> queryWrapper = new QueryWrapper<>();
//填入分页信息
Page<PrintTemplate> page = new Page<>(pageIndex, pageSize);
//填入条件
queryWrapper.eq("id", "123");
//分页查询
printTemplateMapper.selectPage(page, queryWrapper);
```

### xml配置SQL方式

此种方式很灵活，要做什么crud直接写sql进去就行，多表连表查询一般用此种方式

#### 步骤1

- 写mapper接口

```java
@Mapper
public interface PojoMapper{
    List<Pojo> selectAll(String linename);
}
```

#### 步骤2

- 实现mapper.xml接口，我放的路径为 resources/Mybatis/PojoMapper.xml

```XML
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN" "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<!-- 这里绑定mapper接口 -->
<mapper namespace="com.simplemw.mapper.PojoMapper">
    
    <!-- 中间实现接口中的方法 -->
    <select id="selectAll" resultType="com.simplemw.mapper.pojo.Pojo">
    	select * from tablename where linename=#{linename}
    </select>
    
</mapper>
```

- 添加application.yml配置

```yaml
mybatis-plus: 
    mapper-locations: classpath:Mybatis/**/*Mapper.xml
```

### 自动填入值

场景：

- 数据新增时，需要自动产生ID、需要自动导入产生时间
- 数据修改时，需要自动导入编辑时间

使用mybatisplus的TableField类

#### 填入UUID

pojo属性字段添加注解

```java
@TableId(type = IdType.ASSIGN_ID)
```

#### 填入其它值

这里以自动导入时间为例，解决办法使用 MetaObjectHandler

- 实现 MetaObjectHandler 接口，并实现 insertFill、updateFill方法(其两种方法主要是定义 在插入操作或者更新操作的时候哪些值可以自动导入，以及导入什么值)

```java
@Component
public class MybatisObjectHandler implements MetaObjectHandler {
    @Override
    public void insertFill(MetaObject metaObject) {
        this.setFieldValByName("createdDt",new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new Date()),metaObject);
        this.setFieldValByName("deletedDt",null,metaObject);
        this.setFieldValByName("lastEditedDt",new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new Date()),metaObject);
    }

    @Override
    public void updateFill(MetaObject metaObject) {
        this.setFieldValByName("lastEditedDt",new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new Date()),metaObject);
    }
}
```

注：需要@Component 扫描

- pojo属性字段添加注解

  DEFAULT 默认不处理

  INSERT 插入填充字段

  UPDATE 更新填充字段

  INSERT_UPDATE 插入和更新填充字段

```java
@TableField(fill = FieldFill.INSERT)
```

注解功能解释：即当为插入数据库时，自动填充值进下面的属性



### 持续更新中
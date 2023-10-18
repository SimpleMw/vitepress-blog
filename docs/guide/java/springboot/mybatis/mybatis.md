---
title: Mybatis相关
date: 2020-11-26 10:20:27
---

此为mybatis的用法，plus的用法 [点击](http://simplemw.gitee.io/blog/2020/11/07/spring-mybatisplus.html) 进入

##### xml中使用uuid

- uuid用法

```XML
<selectKey  keyProperty="key名" resultType="java.lang.String" order="BEFORE">
    select uuid()
</selectKey>
```

在<insert>   </insert>中间加上上面段落 keyProperty为insert的id栏位值

- 即使java中有方法重载，但XML中标签id不能有相同的

- yml配置

```YML
mybatis:
  mapperLocations: classpath:mapper/*.xml #mapper.xml配置路径，该配置对应resources/mapper/
  type-aliases-package: com.simplemw.entity # 实体类所在的位置
  configuration:
    log-impl: org.apache.ibatis.logging.stdout.StdOutImpl #用于控制台打印sql语句
```

##### 使用handler处理字段

mybtis中提供了不同类型的继承```BaseTypeHandler<T>```的不同类型的handler来处理字段

工作中问题，存入数据在blob中，拿出来的时候乱码，解决办法：使用mybtis的handler直接进行处理

- 配置handler

```java
public class MybatisBlobHandler extends BaseTypeHandler<String> {

    //指定字符集
    private static final String DEFAULT_CHARSET = "utf-8";

    /**
     * 处理 数据插入时 执行
     * @param ps PreparedStatement
     * @param i parameter参数位置
     * @param parameter 参数
     * @param jdbcType 参数类型
     * @throws SQLException
     */
    @Override
    public void setNonNullParameter(PreparedStatement ps, int i,String parameter, JdbcType jdbcType) throws SQLException {
        ByteArrayInputStream bis;
        try {
            //把String转化成byte流，字符集为 utf-8
            bis = new ByteArrayInputStream(parameter.getBytes(DEFAULT_CHARSET));
        } catch (UnsupportedEncodingException e) {
            //String转化byte失败时使用
            throw new RuntimeException("Blob Encoding Error!");
        }
        //传入 PreparedStatement
        ps.setBinaryStream(i, bis, parameter.length());
    }

    /**
     * 处理 根据列名获取时 执行
     * @param rs 查询结果集
     * @param columnName 列名
     * @return
     * @throws SQLException
     */
    @Override
    public String getNullableResult(ResultSet rs, String columnName)throws SQLException {
        //获取结果集中的数据
        Blob blob = (Blob) rs.getBlob(columnName);
        byte[] returnValue = null;
        if (null != blob) {
            //转换为byte[]
            returnValue = blob.getBytes(1, (int) blob.length());
        }
        try {
            //把byte转化成string，使用字符集为 utf-8
            return new String(returnValue, DEFAULT_CHARSET);
        } catch (UnsupportedEncodingException e) {
            throw new RuntimeException("Blob Encoding Error!");
        }
    }

    /**
     * 处理 根据下标获取时 执行
     * @param cs
     * @param columnIndex
     * @return
     * @throws SQLException
     */
    @Override
    public String getNullableResult(CallableStatement cs, int columnIndex)throws SQLException {
        //从结果集中获取blob
        Blob blob = (Blob) cs.getBlob(columnIndex);
        byte[] returnValue = null;
        if (null != blob) {
            //blob转byte[]
            returnValue = blob.getBytes(1, (int) blob.length());
        }
        try {
            //返回值
            return new String(returnValue, DEFAULT_CHARSET);
        } catch (UnsupportedEncodingException e) {
            throw new RuntimeException("Blob Encoding Error!");
        }
    }

    /**
     * 处理 存储过程调用时 执行
     * @param rs
     * @param columnIndex
     * @return
     * @throws SQLException
     */
    @Override
    public String getNullableResult(ResultSet rs, int columnIndex)throws SQLException {
        // TODO Auto-generated method stub
        return null;
    }
}
```

- pojo中配置

```java
@TableField(typeHandler = MybatisBlobHandler.class)
```

理解：

BaseTypeHandler 中存在4个方法，一个set与三个get(通过列名从结果集中获取字段，通过下标从结果集中获取字段，还有一个专用于存储过程(吾目前没用过))

setNonNullParameter()，mybatis中的sql执行是以预编译的形式，上面的实现原理就是在insert之前对数据进行处理然后放入PreparedStatement中

getNullableResult()，查询结果出来后，获取查询的信息，对其中的信息做处理然后返回至pojo对象中

##### 使用pagehelper分页

实现原理就是在执行的sql后面添加 limit(pageNum,pageSize)

- 添加依赖

```xml
<dependency>
    <groupId>com.github.pagehelper</groupId>
    <artifactId>pagehelper-spring-boot-starter</artifactId>
    <version>1.2.12</version>
</dependency>
```

- xml配置

```yaml
pagehelper:
  #默认会自动识别数据库类型，但也可以指定
  helperDialect: mysql
  #默认为false,合理化查询，页码<=0的时候查询第一页，超过最大页查询最后一页
  reasonable: true
  #默认为false,设置为true当设置pageSize为0的时候查全部
  pageSizeZero: true #pageSize=0
  #默认为false,判断Dao要执行的方法参数列表是否有pageNum和pageSize参数，有会自动进行分页
  supportMethodsArguments: true
  #默认为false,多数据源时自动识别分页方言
  autoRuntimeDialect: true
```

- service使用方法

```java
//pageNum为页码，pageSize为每页记录数
PageHelper.startPage(pageNum,pageSize);
```

注：若xml中配置了  supportMethodsArguments：true，则在Dao层方法的参数列表中直接添加pageNum和pageSize可以自动识别分页

##### pagehelper 补充

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
public interface PrintTemplateMapper extends `BaseMapper<PrintTemplate>` {
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

##### 代码生成器

两种方式：启动类，plugin插件

###### 启动类

- 依赖

```xml
<!-- 自动生成mapper和pojo的依赖 -->
<dependency>
    <groupId>org.mybatis.generator</groupId>
    <artifactId>mybatis-generator-core</artifactId>
    <version>1.3.6</version>
</dependency>
```

- xml配置

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE generatorConfiguration PUBLIC "-//mybatis.org//DTD MyBatis Generator Configuration 1.0//EN" "http://mybatis.org/dtd/mybatis-generator-config_1_0.dtd" >
<generatorConfiguration>

    <!-- 填数据库连接jar，使用plugin的时候必须指定 -->
    <classPathEntry location="D:\maven\mysql\mysql-connector-java\8.0.15\mysql-connector-java-8.0.15.jar"/>

    <context id="mysql" targetRuntime="MyBatis3">
        <!-- 生成的Java文件的编码 -->
        <property name="javaFileEncoding" value="UTF-8" />
        <!-- 格式化java代码 -->
        <property name="javaFormatter"
                  value="org.mybatis.generator.api.dom.DefaultJavaFormatter" />
        <!-- 格式化XML代码 -->
        <property name="xmlFormatter"
                  value="org.mybatis.generator.api.dom.DefaultXmlFormatter" />
        <!-- 生成的pojo，将implements Serializable-->
        <plugin type="org.mybatis.generator.plugins.SerializablePlugin"></plugin>
        <commentGenerator>
            <!-- 是否去除自动生成的注释 true：是 ： false:否 -->
            <property name="suppressAllComments" value="true" />
        </commentGenerator>

        <!-- 数据库链接URL、用户名、密码 -->
        <jdbcConnection driverClass="com.mysql.cj.jdbc.Driver"
                        connectionURL="jdbc:mysql://localhost:3306/cloud_data?useUnicode=true&amp;characterEncoding=utf-8&amp;useSSL=true&amp;serverTimezone=UTC"
                        userId="root"
                        password="123456">
        </jdbcConnection>

        <!-- 默认false，把JDBC DECIMAL 和 NUMERIC 类型解析为 Integer
            true，把JDBC DECIMAL 和 NUMERIC 类型解析为java.math.BigDecimal -->
        <javaTypeResolver>
            <property name="forceBigDecimals" value="false" />
        </javaTypeResolver>

        <!-- targetPackage为实体类生成到的路径 -->
        <javaModelGenerator targetProject="./src/main/java" targetPackage="com.simplemw.entity" >
            <property name="enableSubPackages" value="true"/>
            <!-- 从数据库返回的值被清理前后的空格  -->
            <property name="trimStrings" value="true" />
        </javaModelGenerator>

        <!-- 对应的dao层文件 -->
        <javaClientGenerator targetProject="./src/main/java" targetPackage="com.simplemw.dao" type="XMLMAPPER" >
            <property name="enableSubPackages" value="true"/>
        </javaClientGenerator>
        
        <!--对应的mapper.xml文件  -->
        <sqlMapGenerator targetProject="./src/main/resources" targetPackage="mapper" >
            <property name="enableSubPackages" value="true"/>
        </sqlMapGenerator>

        <!-- 列出要生成代码的所有表 -->
        <!-- tableName表名，domainObjectName生成的pojo名，其它的配置是否生成sql -->
        <table tableName="dept" domainObjectName="Dept"
               enableCountByExample="false" enableUpdateByExample="false" enableDeleteByExample="false"
               enableSelectByExample="false" selectByExampleQueryId="false" >
            <property name="useActualColumnNames" value="false"/>
        </table>
    </context>
</generatorConfiguration>
```

- 启动类

```java
public class generator {
    public static void main(String[] args) throws Exception{
        List<String> warnings = new ArrayList<String>();
        //设置如果已经存在生成的文件是否需要覆盖
        boolean overwrite = true;
        //设置配置文件的路径,此处配置的相对路劲要与启动类的位置对应
        File configFile = new File("src/main/resources/generatorConfig.xml");
        ConfigurationParser cp = new ConfigurationParser(warnings);
        Configuration config = cp.parseConfiguration(configFile);
        DefaultShellCallback callback = new DefaultShellCallback(overwrite);
        MyBatisGenerator myBatisGenerator = new MyBatisGenerator(config, callback, warnings);
        myBatisGenerator.generate(null);
    }
}
```

###### plugin插件

```xml
<plugin>
    <groupId>org.mybatis.generator</groupId>
    <artifactId>mybatis-generator-maven-plugin</artifactId>
    <version>1.4.0</version>
    <executions>
        <execution>
            <id>Generate MyBatis Artifacts</id>
            <goals>
                <goal>generate</goal>
            </goals>
        </execution>
    </executions>
    <configuration>
        <!-- 输出详细信息 -->
        <verbose>true</verbose>
        <!-- 覆盖生成文件 -->
        <overwrite>true</overwrite>
        <!-- 定义配置文件 -->
        <configurationFile>${basedir}/src/main/resources/generatorConfig.xml</configurationFile>
    </configuration>
</plugin>
```

注：generatorConfig.xml中需要加入本地的数据库连接jar地址

```xml
<classPathEntry location="D:\maven\mysql\mysql-connector-java\8.0.15\mysql-connector-java-8.0.15.jar"/>
```



##### Mybatis时间格式化

- mysql时间格式化   

```xml
date_format(now(), '%Y-%m-%d %H:%i:%s')
```

- 接收前端参数格式化 

```java
@DateTimeFormat(pattern="yyyy-MM-dd HH:mm:ss")
```

- 返回前端参数格式化 

```java
@JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
@JSONField(format="yyyy-MM-dd")
```

##### Mybatis查询补充

###### in

- 代码

```XML
id in
<foreach collection="ids" index="index" item="item" open="(" separator="," close=")">
	#{item}
</foreach>
```

- 解释 

open="(" separator="," close=")"   拼接括号参数

index="index"  确定foreach的起始位置，类似于游标的功能

collection="ids"  传入的list名称

item="item"  每一个元素的名称

###### if else

- 代码

```XML
<choose>
    <when test="condition == 1">
        AND name = #{name1}
    </when>
    <when test="condition == 2">
        AND name = #{name2}
    </when>
    <otherwise>
        AND name = #{name3}
    </otherwise>
</choose>
```

- 解释

```java
if(condition == 1){
    AND name = #{name1}
}else if(condition == 2){
    AND name = #{name2}
}else{
    AND name = #{name3}
}
```

###### #{}和${}

```java
#{} 预编译(最终带单引号)
${} 直接获取(不带单引号)    若需要加单引号可使用 <![CDATA['${id}']]>
```



##### 注

判断相等时，后面的字符串要加toString()

```xml
<choose>
    <when test="condition == '1'.toString()">
        AND name = #{name1}
    </when>
    <when test="condition == '2'.toString()">
        AND name = #{name2}
    </when>
    <otherwise>
        AND name = #{name3}
    </otherwise>
</choose>
```




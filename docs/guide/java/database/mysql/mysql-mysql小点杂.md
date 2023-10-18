---
title: mysql小点杂
date: 2021-09-30 09:34:36
---



#### 时间差

- 类型 

| 秒数   | 分钟数 | 小时数 | 天数 | 周数 | 季度数  | 月数  | 年数 |
| ------ | ------ | ------ | ---- | ---- | ------- | ----- | ---- |
| SECOND | MINUTE | HOUR   | DAY  | WEEK | QUARTER | MONTH | YEAR |

- 举例 

```sql
SELECT TIMESTAMPDIFF(SECOND,‘1993-03-23 00:00:00’,DATE_FORMAT(NOW(), '%Y-%m-%d %H:%i:%S'))
```



#### 补位

- 前后补字符

```sql
select RPAD('1',8,'0') as num
select LPAD('1',8,'0') as num
```



#### varchar转decimal

- 常用于varchar存小数，要算最小值和最大值时的转换

```sql
select CAST('21.00000' AS DECIMAL(10, 3))
```



#### 行拆分

- 对于逗号隔开的数据拆分成行

```sql
SELECT
    substring_index(substring_index( a.note,',',b.help_topic_id + 1),',' ,- 1)
FROM
    (select '1,2,3,4' as note) a  
JOIN mysql.help_topic b ON b.help_topic_id <
(length(a.note) - length( replace(a.note,',','')) + 1)
```

- 变形，补行

```sql
SELECT
    a.startNum + b.help_topic_id AS rn
FROM
    (select '001' AS startNum,'200' as endNumber) a  
JOIN mysql.help_topic b ON b.help_topic_id <
(a.endNumber -a.startNum   + 1)
```

- 结合上面的行拆分

```sql
SELECT
    LPAD(a.startNum + b.help_topic_id,3,'0') AS rn
FROM
    (select '001' AS startNum,'200' as endNumber) a  
JOIN mysql.help_topic b ON b.help_topic_id <
(a.endNumber -a.startNum   + 1)
```

#### 逗号隔开的数据关联查询

table2的PARAM_ID是逗号隔开的，要查询显示逗号隔开的table2.PARAM_NAME

```sql
SELECT
	GROUP_CONCAT( table2.PARAM_NAME ) 
FROM
	table2 
WHERE
	table2.PARAM_ID REGEXP ( SELECT REPLACE ( ( SELECT table1.PARAM_ID FROM table1 WHERE table1.id = '1' ), ',', '|' ) )
```

#### 行转列

- 逗号隔开的数据

```sql
SELECT
	SUBSTRING_INDEX( SUBSTRING_INDEX( '1,2,3,4', ',', help_topic_id + 1 ), ',',- 1 ) AS num 
FROM
	mysql.help_topic 
WHERE
	help_topic_id < LENGTH( '1,2,3,4' ) - LENGTH( REPLACE ( '1,2,3,4', ',', '' ) ) +1
```

- 非逗号隔开的数据

```sql
SELECT LEFT(SUBSTRING('QWER',help_topic_id+1),1) AS num FROM mysql.help_topic WHERE help_topic_id < LENGTH('QWER');
```



#### 常用语法

<font color='red'>获取某个表的某个字段信息</font>

```SQL
SELECT * FROM INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='表名' and COLUMN_NAME='列名'
```

<font color=red>参数连接</font>

```sql
select CONCAT(A, B, C) from table 
```

参数连接用concat函数

注：存在复杂字符串连接，若其中某个字段查询为null，则整个字符串为null(解决办法为通过IFNULL函数判断，IFNULL(AAA,''))



#### 查看执行计划

explain 字段

- 查看mysql的耗cpu

```sql
select * from performance_schema.threads where PROCESSLIST_COMMAND = 'Query' order by THREAD_OS_ID DESC
```

注：THREAD_OS_ID越高用的线程数越高

- 查看目前正在查询的耗时时间长的SQL

```sql
select * from information_schema.`PROCESSLIST` where Command != 'Sleep' order by `time` DESC
```



- 统一修改字符集(生产修改的sql然后统一执行)

```sql
select 
distinct
CONCAT("ALTER TABLE `", TABLE_NAME,"` CONVERT TO CHARACTER SET utf8 COLLATE utf8_general_ci;") 
from information_schema.COLUMNS where TABLE_SCHEMA = 'fit'  and table_name like 't_pom%' 
and (character_set_name != 'utf8'
or collation_name != 'utf8_general_ci')
```



- 查询缓存

```sql
#quert_cache_type 0-关闭 1-开启 2-查询使用SQL_CACHE的才缓存 
#linux my.cnf文件
query_cache_type=0
#使用方法(一般对于静态表才使用缓存)
SELECT SQL_CACHE * FROM test where id = 1
```



#### 导出数据

```sql
mysqldump -u root -p 数据库名>d:\数据库名.sql
```


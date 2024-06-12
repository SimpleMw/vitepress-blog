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

#### 关联非存在表

```sql
select a.*,b.* from
(
	select '张三' as name
union
	select '李四' as name
union
	select '王麻子' as name
) a
left join (
	select '2024-06-11' as `date`
union
	select '2024-06-12' as `date`
union
	select '2024-06-13' as `date`
) b on 1 = 1
where 1=1
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

- 查看当前ip的执行记录

```sql
select *  from information_schema.`PROCESSLIST` where HOST LIKE '10.245.228.89%' order by `time` DESC
```

- 查看全表扫描的

```sql
select * from statements_with_full_table_scans;
```

各个参数代表以下含义：
1. `query`：执行全表扫描的查询语句。

2. `db`：查询所属的数据库名称。

3. `exec_count`：查询的执行次数。

4. `total_latency`：查询的总延迟时间。

5. `rows_sent`：查询返回的行数。

6. `rows_examined`：查询扫描的行数，包括通过全表扫描访问的行数。

7. `rows_affected`：查询影响的行数。

8. `full_scan`：指示是否进行了全表扫描，通常是一个布尔值或标志。

  注：`query`查询的语句不是完整的，所以也只能通过其它方式查看全表扫描的表

- 查看锁表

```
select * from innodb_lock_waits;
```

表中的一些常见字段的含义：

1.`requesting_trx_id`：正在请求锁定的事务ID。

2.`requested_lock_id`：正在请求的锁定ID。

3.`blocking_trx_id`：正在阻塞当前请求的事务ID。

4.`blocking_lock_id`：导致阻塞的锁定ID。

5.`requested_lock_mode`：正在请求的锁定模式，例如共享锁（S）或排他锁（X）。

6.`blocking_lock_mode`：导致阻塞的锁定模式。

7.`waiting_query`：正在等待锁定的查询语句。

8.`blocking_query`：导致阻塞的查询语句。

9.`wait_started`：等待开始的时间戳。

10.`wait_age`：等待持续的时间。



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



#### 批量操作

- 批量删除索引

```sql
SELECT 
CONCAT("ALTER TABLE `", TABLE_NAME,"` DROP INDEX IX_DELETED;") 
FROM INFORMATION_SCHEMA.STATISTICS WHERE TABLE_SCHEMA = 'aps_vn1' AND INDEX_NAME = 'IX_DELETED';
```



#### 优化SQL

- 统一修改字符集(生产修改的sql然后统一执行)

```sql
select 
distinct
CONCAT("ALTER TABLE `", TABLE_NAME,"` CONVERT TO CHARACTER SET utf8 COLLATE utf8_general_ci;") 
from information_schema.COLUMNS where TABLE_SCHEMA = 'fit'  and table_name like 't_pom%' 
and (character_set_name != 'utf8'
or collation_name != 'utf8_general_ci')
```

- 修改索引表的查询顺序

在内连接中，强制使用左表当作驱动表，改表优化器对于联表查询的执行顺序

```sql
STRAiGHT_JOIN
```

- 强制索引

```sql
SELECT * FROM table_name FORCE INDEX (index_name);
```

- 分析表

以便优化器可以更好地理解表的结构，更新表的统计信息包括行数、索引使用情况等

```SQL
analyze table 表名
```



#### 常见的mysql配置

```mysql
show VARIABLES
```

- 慢sql相关

```
slow_query_log: 是否启用慢查询日志功能
long_query_time: 定义慢查询的阈值时间，超过该时间的查询会被记录在慢查询日志中
log_queries_not_using_indexes: 是否记录未使用索引的查询语句
log_slow_admin_statements: 是否记录管理员操作的慢查询语句
log_slow_slave_statements: 是否记录从服务器执行的慢查询语句
slow_query_log_file: 慢查询日志文件的路径
slow_query_log_timestamp_always: 是否在慢查询日志中始终包含时间戳
slow_query_log_timestamp_precision: 慢查询日志时间戳的精度
log_output: 慢查询日志的输出方式，可以选择FILE、TABLE或者NONE
log_slow_rate_limit: 控制慢查询日志记录速率的限制
```

- 连接相关

```
max_connections: 允许的最大连接数
wait_timeout: 客户端连接没有活动时，服务器将关闭连接之前等待的秒数
interactive_timeout: 客户端连接没有活动时，服务器将关闭连接之前等待的秒数
connect_timeout: 客户端连接到服务器的超时时间
max_user_connections: 每个用户的最大连接数限制
thread_cache_size: 线程缓存池的大小，用于重用已经创建的线程
max_connect_errors: 允许的连接错误次数，超过该次数后将禁止连接
back_log: 服务器在拒绝新连接之前可以排队的最大连接数
net_read_timeout: 从服务器读取数据的超时时间
net_write_timeout: 向服务器写入数据的超时时间
```

- 查询缓存

```
query_cache_type: 查询缓存的类型，可以设置为OFF、ON或者DEMAND
query_cache_size: 查询缓存的大小
query_cache_limit: 查询结果的大小限制，超过该大小的查询结果不会被缓存
query_cache_min_res_unit: 查询结果的最小缓存单位
query_cache_strip_comments: 是否在缓存查询前去除注释
query_cache_wlock_invalidate: 是否在写锁时使查询缓存无效
query_cache_limit: 查询结果的大小限制，超过该大小的查询结果不会被缓存
query_cache_type: 查询缓存的类型，可以设置为OFF、ON或者DEMAND
query_cache_size: 查询缓存的大小
query_cache_min_res_unit: 查询结果的最小缓存单位
```












---
title: Oracle数据库创建
date: 2019-10-15 8:48:16
---

用户、表空间、schema

- 用户，用户是用来连接和访问数据库

- 表空间，数据存储的实际物理空间 (理解方面:一个表中的数据可能是存在几个表空间中的）

  注：临时表空间是用来 做排序操作，查询视图等操作的临时运行空间，运行完成后自动清理临时对象

- schema

  Oracle中，创建一个用户默认创建一个缺省的同名schema，一个用户对应一个schema

  理解：创建一个schema就是创建一个对象，该对象将  某些表或者视图关联起来，方便在使用时直接使用schema就能找到



- 创建用户

```sql
create user 用户名 identified by 密码 default tablespace 表空间名;
```

eg：create user wpuse identified by qwer1111;可以指定表空间，也可以不指定表空间

- 删除用户

```SQL
drop user 用户名 cascade;
```

- 给用户授权

语法：GRANT 权限1,权限2,权限3 on 表名 to 用户名;

```SQL
GRANT CONNECT, RESOURCE, DBA TO 用户名;    --- 授登录权限
GRANT SELECT, INSERT, UPDATE, DELETE ON 表名 TO 用户名;  --- 授特定表CIUD权限
GRANT ALL ON 表名 TO 用户名;    --- 授特定表所有权限
```

- 撤消用户授权

语法：REVOKE 权限1,权限2,权限3 on 表名 to 用户名;

```SQL
REVOKE CONNECT, RESOURCE, DBA from 用户名;
```

- 查询schema  (即查询所有的用户)(sys在Oracle中有最大权限)

```SQL
select * from sys.dba_users;   --- 查询所有的用户
select * from sys.uesr_users;   --- 查询当前用户的信息
```

default_tablespace 默认表空间   temporary_tablespace 临时表空间

- 创建表空间

```SQL
create tablespace 表空间名 datafile 表空间位置(带引号) size 表空间大小;
```

eg：create tablespace mytablespace datafile 'd:\ztwork\oracle\oradata\orcl\mytablespace.dbf' size 10m;

- 删除表空间

```SQL
drop tablespace 表空间名;  --- 删除空的表空间，但是不包含数据文件
drop tablespace 表空间名 including contents;  --- 若表空间不为空，需加上 contents
drop tablespace 表空间名 including datafiles;  --- 若还要删除数据文件，需加上 datafiles
drop tablespace 表空间名 including contents and datafiles; --- 删除非空表空间以及数据文件
drop tablespace 表空间名 including contents and datafiles CASCADE CONSTRAINTS;  --- 若该表空间存在 其它表空间表的 外键约束则需加上 CASCADE CONSTRAINTS
```

- 查询表空间

```sql
select tablespace_name from sys.dba_tablespaces; --- 查询所有的表空间
select tablespace_name from sys.user_tablespaces; --- 
```

- 查询表空间详细信息(与数据文件的关系)

```SQL
Select * FROM sys.dba_data_files;
```

FILE_NAME 表空间物理存储位置，TABLESPACE_NAME 表空间名称，BYTES 表空间大小

AUTOEXTENSIBLE 自动增长，MAXBYTES 为重新定义的大小

- 查询临时数据文件表空间详细信息

```SQL
select * from sys.dba_temp_files;
```



**sqlload的使用**

- 需要导入的文件、ctl文件(做配置导入数据与表字段对应关系)

```
sqlldr 用户/密码@ip:端口/数据库的sid control=ctl执行的文件名 log=日志打印的文件名
```

eg：sqlldr wpuse/qwer1111@127.0.0.1:1521/orcl control=sqlload.ctl log=sqlload.out

eg：

sqlldr afa/afa@172.31.231.169:1521/orcl control=sqlload_tro.ctl log=sqlload.out



```
LOAD DATA
infile '文件名地址'
into table 导入的表名
(
字段名1(即列名) terminated by 分割方式(whitespace表示空格),
字段名2(即列名) terminated by whitespace,
字段名3(即列名) terminated by whitespace,
字段名4(即列名) terminated by whitespace
)
```

eg：

LOAD DATA
infile 'F:\1111111.txt'
into table firsttable
(
id terminated by whitespace,
name terminated by whitespace,
phone terminated by whitespace,
message terminated by whitespace
)



**Oracle常用命令**

- sqlplus    连接Oracle

- connect/ as sysdba     获取管理员权限

  shutdown   immediate    关闭数据库

  startup   开启数据库

- lsnrctl       进入监听器后台管理

- lsnrctl  start   启动监听器

- lsnrctl  stop   关闭监听器

- lsnrctl  status    查看监听器状态



注：该空闲例程用来在Oracle已经关闭，用system等用户无法登录的情况

sqlplus 连接空闲例程   

用户名：sys as sysdba

密码：空



**Oracle连接出现问题**

- 本地能连接，其它客户端无法连接

解决办法：在服务端host文件中创建  本地ip对应的域名，监听文件中使用自己创建的域名，当开启监听的时候就会跳过dns解析，其它客户端就能直接连上了

- 出现用户被锁定

解决办法：使用  sys as sysdba 登录sql，alter user 用户名 account unlock;

- 出现身份证明检索失败

解决办法：修改服务端 sqlnet.ora 文件(修改认证方式 NTS为NONE)

SQLNET.AUTHENTICATION_SERVICES= (NTS)



**数据库查询**

- 查询某个表的某个字段一样的数据      表名:example_table	列名:example_row

```SQL
select * from example_table a where exists 
(select * from example_table where example_row = a.example_row 
 group by example_row having count(*)>=2)
```

- 查询两个表的同名字段的所有枚举值(有点像group by的枚举,只不过是两个表)

```SQL
select same_rowname from example_table1
union
select same_rowname from example_table2
```

注：查询出的分别两个表的 same_rowname字段枚举值都不允许出现重复，然后合在一起

```SQL
select same_rowname from example_table1
union ALL
select same_rowname from example_table2
```

注：查询出的 same_rowname允许出现重复,且是 union all前面查询的表 same_rowname可以重复，后面查询的表出现的same_rowname字段枚举值不允许重复

- 查询目前数据库的连接情况

```sql
select OSUSER,MACHINE from v$session where status='ACTIVE';
```



**表结构** 

- VARCHAR2(4 CHAR)与VARCHAR2(4)区别

VARCHAR2(4)等同于VARCHAR2(4 BYTE)，即VARCHAR2(4 CHAR) 为 VARCHAR2(4)的4倍大小



超出打开游标的最大数

出现这种情况只有两种可能

一就是游标数真的很少，可以用SQL查询下。 
二、就是重复创建没有及时关闭，例如再循环中创建却没有再循环中关闭，建议检查下代码。








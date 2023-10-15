---
title: mysql8 免安装配置
date: 2020-10-14 8:48:16
---

- 解压压缩包

- 配置环境变量 path中加入mysql的bin路径

- myql8解压根路径下新建 my.ini文件,写入以下(my.ini为配置文件)，其中mysql的安装路径以及数据库的数据存放路径要修改相应的位置，若以前解压目录下存在data文件夹，可以删除

  ```
  [mysql]
  # 设置mysql客户端默认字符集
  default-character-set=utf8
   
  [mysqld]
  # 绑定IPv4
  bind-address=0.0.0.0
  # 设置端口号
  port=3306
  # 设置mysql的安装目录，即解压目录
  basedir=D:\\uwork\\mysql\\mysql-8.0.19-winx64
  # 设置数据库的数据存放目录
  datadir=D:\\uwork\\mysql\\mysql-8.0.19-winx64\\data
  # 设置允许最大连接数
  max_connections=200
  # 设置允许连接失败次数
  max_connect_errors=10
  # 设置服务端的默认字符集
  character-set-server=utf8
  # 创建表使用的默认存储引擎
  default-storage-engine=INNODB
  # 使用“mysql_native_password”插件认证
  default_authentication_plugin=mysql_native_password
  # 设置只读属性
  read-only=0
  ```

- 初始化mysql      **mysqld --initialize --console**    等待初始化完成，此时会自动创建root用户

  日志中显示为   root@localhost：一串随机密码      可以记下随机密码等会登录

  该操作完成后，根目录下会存在data文件夹

- 安装mysql服务 **mysqld --install mysql --defaults-file="D:\uwork\mysql\mysql-8.0.19-winx64\my.ini"**

  注：报错 Install/Remove of the Service Denied! 原因为cmd未以管理员运行

  该操作是创建mysql服务在windows的服务中

  卸载服务 **mysqld --remove mysql**

- 启动服务 
  - 第一种 在windows的服务中 找到 mysql 点启动
  - 第二种 cmd中输入 **net start mysql**      **(**  **net stop mysql 是关闭服务** **)**

- 登录mysql

  **mysql -u  root -p**

  提示输入 password   则输入刚才记下的 密码，成功则进行下面修改密码，失败则操作下下步

----

<font color = red>初始化失败</font>

- 执行**mysqld --defaults-file="D:\uwork\mysql\mysql-8.0.19-winx64\my.ini" --initialize-insecure**
- 安装服务后，**net start mysql**

---

<font color=red size=4>登录正常改密</font>

- 修改user密码

   **ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '新密码';**

  刷新权限

  **flush privileges;**

- 退出重新使用新密码登录，大功告成

----

<font color=red size=4>密码输入错误解决</font>

输入记下的随机密码报错，则一般是密码错误(或者其它玩意)

- 解决办法，免密登录后然后删除密码

- 关闭mysql服务   **net stop mysql**

- 在bin目录cmd下 输入 **mysqld --console --skip-grant-tables --shared-memory** ，输入成功后不管它

- 新建cmd窗口  输入**mysql**  登录数据库   ,然后输入  **use mysql**   连接数据库

- (这里开始就是操作数据库了,后面都加分号)输入 **show tables;**  显示所有的表    

  - （查询语句，查询user表，authentication_string 就是密码列名）

  select user,host, authentication_string from user;       

  - （修改密码为空）

  update mysql.user set authentication_string = '' where user = 'root' and host = 'localhost';     

修改成功后有 query ok字样

- **exit**  退出数据库连接，关闭第一个cmd窗口
- cmd窗口中 重启服务   **net start mysql**    然后   **mysql -u  root -p**  ，输入密码时直接回车就登录进去了
- 最后按上面步骤修改密码 



----

<font color='red'>创建用户</font>

- 创建用户

```shell
create user canal identified by 'canal';
update mysql.user set authentication_string = '' where user = 'canal' and host = 'localhost';
ALTER USER 'canal'@'localhost' IDENTIFIED WITH mysql_native_password BY '123456';
```

- 授权

```shell
grant select,replication slave,replication client on*.* to 'canal'@'%';
```

```shell
grant all privileges on *.* to 'canal'@'%';
```

- 刷新权限

```shell
flush privileges
```


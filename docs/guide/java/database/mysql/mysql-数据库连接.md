---
title: mysql数据库连接
date: 2020-10-14 8:48:16
---

- 数据库连接代码

```java
public static void main(String[] args) {

    Connection con;
    Statement stm = null;
    ResultSet rs = null;
    //根据导入的包中的Driver路径来写
    String driver = "com.mysql.jdbc.Driver";
    String url="jdbc:mysql://localhost:3306/cloud_data?useUnicode=true&characterEncoding=UTF-8&zeroDateTimeBehavior=convertToNull&useSSL=true";
    String username="root";
    String password="123456";
    String sql = "select * from dept";
    String deptname;

    try {
        //这里会出现异常找不到类 ClassNotFoundException，也即找不到驱动
        Class.forName(driver);
        //获取连接以及获取statement以及后面的执行sql语句都会出现 SQLException 异常
        con = DriverManager.getConnection(url,username,password);
        //创建执行对象
        stm = con.createStatement();
        //查询的结果是放在结果集中的
        rs = stm.executeQuery(sql);
        //此处进行判断是否存在数据
        while(rs.next()){
            deptname = rs.getString("deptname");
            System.out.println(deptname);
        }
        //关闭结果集
        rs.close();
        //关闭执行对象
        stm.close();
        //关闭连接
        con.close();
    } catch (ClassNotFoundException | SQLException e) {
        e.printStackTrace();
    }
}
```

- execute() 返回结果为boolean   executeUpdate() 返回结果是int  executeQuery()返回结果是结果集
  - executeQuery() 常用于查询
  - executeUpdate() 常用于增删改
  - execute() 用在有多个结果集等情况下
- url解释
  - useUnicode=true 使用编码为unicode
  - characterEncoding=UTF-8 使用字符编码集为 utf-8
  - zeroDateTimeBehavior=convertToNull   日期异常处理方式
    - l exception：默认值，即抛出SQL state [S1009]. Cannot convert value....的异常；
    - l convertToNull：将日期转换成NULL值；
    - l round：替换成最近的日期即0001-01-01；
  - useSSL=true  解决mysql和jdbc版本不兼容问题

- 还存在预编译的执行方式

```JAVA
public static void main(String[] args) {

    Connection con;
    PreparedStatement pstm;
    int result;
    //根据导入的包中的Driver路径来写
    String driver = "com.mysql.jdbc.Driver";
    String url="jdbc:mysql://localhost:3306/cloud_data?useUnicode=true&characterEncoding=UTF-8&zeroDateTimeBehavior=convertToNull&useSSL=true";
    String username="root";
    String password="123456";

    try {
        //这里会出现异常找不到类 ClassNotFoundException，也即找不到驱动
        Class.forName(driver);
        //获取连接以及获取statement以及后面的执行sql语句都会出现 SQLException 异常
        con = DriverManager.getConnection(url,username,password);
        //创建执行对象
        pstm = con.prepareStatement("update dept set deptname = ? where deptno = ?");
        //将数据放入pstm对象中
        pstm.setString(1,"物流部门");
        pstm.setInt(2,1);
        //执行sql语句获取结果
        result = pstm.executeUpdate();
        System.out.println("更新了 "+result+" 条数据");
        //关闭执行对象
        pstm.close();
        //关闭连接
        con.close();
    } catch (ClassNotFoundException | SQLException e) {
        e.printStackTrace();
    }
}
```

注：此种方式更加灵活，不管执行多少个此类sql，都只会解析和编译一次，而使用statement则是对每个执行的sql都解析和编译，PreparedStatement 也比 statement 方式更加安全


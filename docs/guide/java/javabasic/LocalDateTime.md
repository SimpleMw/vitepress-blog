---
title: 日期时间 LocalDateTime
date: 2020-12-02 13:25:25
updated: 2021-09-15 10:00:00
category: java基础相关
tag: java
top_img: false
---

场景：

SimpleDateFormat 的format和parse方法是线程不安全的

LocalDateTime、LocalDate、LocalTime 

##### 创建

```java
//创建当前日期
LocalDate localDate = LocalDate.now();
//创建当前时间
LocalTime localTime = LocalTime.now();
//创建当前日期时间
LocalDateTime localDateTime = LocalDateTime.now();

//构造日期
LocalDate localDate1 = LocalDate.of(2020, 5, 12);
//构造时间
LocalTime localTime1 = LocalTime.of(9, 15, 0);
//构造日期时间
LocalDateTime localDateTime1 = LocalDateTime.of(2020, 5, 12,13,14,0);
//根据构造日期和构造时间合成日期时间
LocalDateTime localDateTime2 = LocalDateTime.of(localDate1,localTime1);
```

##### 格式转换

```java
LocalDateTime localDateTime = LocalDateTime.now();
//格式化日期时间 使用LocalDateTime的标准样式转字符串
String str1 = localDateTime.format(DateTimeFormatter.ISO_LOCAL_DATE_TIME);
System.out.println(str1);

//指定格式格式化 LocalDateTime转字符串
DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern("yyyy.MM.dd HH:mm:ss");
String str2 = dateTimeFormatter.format(localDateTime);
System.out.println(str2);

//指定时间格式解析时间 字符串转LocalDateTime
String str = "2020.05.12 13:14:00";
LocalDateTime dateTime = LocalDateTime.parse(str, dateTimeFormatter);
System.out.println(dateTime);
```

##### 获取年月日时分秒

```java
//获取年月日时分秒
int year = dateTime.getYear();
Month month = dateTime.getMonth();
int day = dateTime.getDayOfMonth();
int hour = dateTime.getHour();
int minute = dateTime.getMinute();
int second = dateTime.getSecond();
System.out.println("年："+year+" 月："+month+" 日："+day+" 时："+hour+" 分："+minute+" 秒："+second);
```

##### LocalDateTime转Date

```java
LocalDateTime localDateTime = LocalDateTime.now();
Date date = Date.from(localDateTime.atZone(ZoneId.systemDefault()).toInstant());
```

##### Date转LocalDateTime

```java
Date date = new Date();
LocalDateTime ldt = date.toInstant()
        .atZone(ZoneId.systemDefault())
        .toLocalDateTime();
```
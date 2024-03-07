---
title: python基础
date: 2022-11-20 16:34:11
category: python
tags: python
top_img: false
---

#### 基本数据类型

- 数字类型

  - int

  ```python
  age = 1
  print(type(age))
  ```

  - float

  ```python
  price = 1.2
  print(type(price))
  ```

- 布尔

  ```python
  booleanName = True
  booleanName1 = False
  print(type(booleanName),type(booleanName1))
  ```

- 字符串

  ``` python
  str1 = '字符串1'
  str2 = "字符串2"
  str3 = """字符串3"""
  str4 = str(1111)
  print(type(str1),type(str2),type(str3),type(str4))
  ```

- 列表

  ``` python
  # 创建
  peoples=[['小明',18,['语文','数学']],['小红',19,['英语','地理']]]
  print(peoples[0][2][0])
  # 追加
  peoples.append(['张三',17,['法外狂徒']])
  print(peoples)
  # 批量添加
  peoples1 = [['张三',17,['法外狂徒']],['张三复制',17,['法外狂徒']]]
  peoples.extend(peoples1)
  # 按下标添加 下标，内容
  peoples.insert(1,['李四',17,['法外狂徒2']])
  print(peoples)
  # 按照内容移除
  peoples.remove(['李四',17,['法外狂徒2']])
  print(peoples)
  # 按照下标移除
  del peoples[1]
  print(peoples)
  ```

- 元组

  ```python
  # 创建
  peoples=(('小明',18,('语文','数学')),('小红',19,('英语','地理')),('张三',17,('法外狂徒')))
  print(peoples)
  # 按下标获取
  print(peoples[1])
  # 获取所有元素
  # sub 取出的元素带逗号
  print(peoples[1:2])
  # 正数-左往右 负数-右往左 不填则表示到头或尾
  print(peoples[1:])
  print(peoples[:-1])
  # 获取长度
  print(len(peoples))
  # 扩展
  peoples1=(('小明',18,('语文','数学')),('小红',19,('英语','地理')),('张三',17,('法外狂徒')))
  peoplesnew = peoples + peoples1
  print(peoples)
  print(peoples1)
  print(peoplesnew)
  ```

  注：元组为静态的，列表为动态的

- 字典

  ``` python
  people = {'name':'名字','age':18,'sex':'男'}
  # 获取其中一个元素的value
  print(people.get('name'))
  # 不存在则新增,存在则更新
  people["message"] = "详细信息"
  people["sex"] = "女"
  print(people)
  # 不存在则新增,存在则更新
  people.update({"country": "china"})
  people.update({"age": 19})
  print(people)
  # 根据内容更新 存在则更新，不存在则新增
  people.update(name = "新名字", address = "马鞍山")
  print(people)
  # 删除
  del [people['address']]
  print(people)
  people.pop("country")
  print(people)
  people.clear()
  print(people)
  ```

#### 运算符

| 符号 | 含义 | 举例   | 结果 |
| ---- | ---- | ------ | ---- |
| +    | 加   | 1+1    | 2    |
| -    | 减   | 1-1    | 0    |
| *    | 乘   | 2*2    | 4.5  |
| /    | 除   | 9/2    | 1    |
| %    | 取模 | 9 % 2  | 1    |
| **   | 次方 | 2 ** 3 | 8    |
| //   | 整除 | 9 // 2 | 4    |

#### 逻辑运算

| 符号 | 含义 | 举例           | 结果  |
| ---- | ---- | -------------- | ----- |
| and  | 与   | True and False | False |
| or   | 或   | True or False  | True  |
| not  | 非   | not True       | False |

#### 逻辑语句

##### 条件语句

```python
age = 25
driver = True
drink = False
if driver:
    if drink:
        print("酒驾了")
    elif age < 18:
        print("未成年不准开车")
    else:
        print("成年，未喝酒，放行")
else:
    print("没开车不影响")
```

##### 循环语句

- while

```python
num = 1
while num < 100 :
    print("num=", num)
    # 加
    num += 1
print("循环结束!")
```

- for

```python
for i in range(100):
    print(i)
print("循环结束!")
```

#### 异常捕获

```python
try:
    print(1/0)
except ZeroDivisionError as e:
    print("捕获到了异常")
else:
    print("未捕获到异常，正常运行")
finally:
    print("这是做最后的操作(不管是否出现异常)")
raise "这是我手动抛出的异常"
```





#### 属性

##### 动态属性

```python
@property
```

可以自定义get，set方法

##### 魔法函数

```python
__getattr__
```

```python
__getattribute__
```

- getattribute 先于 getattr 执行
- 在属性查找过程中若为找到定义属性，会执行此两个魔法函数


---
title: java基本数据流
date: 2020-10-01 8:34:36
category: java基础相关
tag: java
top_img: false
---

# 字节流、字符流

- 能用字符流的一定能用字节流
- 能用字节流的不一定能用字符流

------

### 步骤

- 连接数据源 File类构建路径
- 拿到字节流或字符流对象
- 输入或者输出操作
- 关闭字节流或者关闭字符流

------

- 文件操作

```java
public static void main(String[] args) throws IOException {
    //创建文件路径,创建文件名
    String path = "C:\\Users\\SimpleManWp\\Desktop";
    String filename = "123.txt";
    //根据路径和文件名创建文件对象
    File f=new File(path,filename); 	
    System.out.println("文件长度："+f.length()+"字节");
    System.out.println("文件或者目录："+(f.isFile()?"是文件":"不是文件"));
    System.out.println("文件或者目录："+(f.isDirectory()?"是目录":"不是目录"));
    System.out.println("是否可读："+(f.canRead()?"可读取":"不可读取"));
    System.out.println("是否可写："+(f.canWrite()?"可写入":"不可写入"));
    System.out.println("是否隐藏："+(f.isHidden()?"是隐藏文件":"不是隐藏文件"));
    System.out.println("最后修改日期："+new Date(f.lastModified()));
    System.out.println("文件名称："+f.getName());
    System.out.println("文件路径："+f.getPath());
    System.out.println("绝对路径："+f.getAbsolutePath());
    //删除文件 和 创建新文件
    if(f.exists()) {
        f.delete();
    }else {
        f.createNewFile();
    }

}
```

注：File不是创建文件的函数，而是创建路径的函数；new File(),括号中填的参数列表只要能拼出路径就行

- 目录操作

```java
String path = "C:\\Users\\SimpleManWp\\Desktop\\123";
//创建路径对象
File f = new File(path);
if(f.exists()) {
    f.delete();	
}else {
    f.mkdir();
}
```

- 遍历目录下的文件

```java
String path = "C:\\Users\\SimpleManWp\\Desktop";
File f = new File(path);
String Filelist[] = f.list();
for (int i=0;i<Filelist.length;i++)
{    //遍历返回的字符数组
    System.out.print(Filelist[i]+"\t\t");
    System.out.print((new File("C:\\\\Users\\\\SimpleManWp\\\\Desktop",Filelist[i])).isFile()?"文件"+ "\t\t":"文件夹"+"\t\t");
    System.out.println((new File("C:\\\\Users\\\\SimpleManWp\\\\Desktop",Filelist[i])).length()+"字节");
}
```

- 显示目录下的 特定文件类型的 文件
  - 实现文件名过滤接口

```java
public class FileFilter implements FilenameFilter {

	@Override
	public boolean accept(File dir, String name) {
		//过滤文件格式为.txt和.exe的文件
		return name.endsWith(".txt")||name.endsWith(".exe");
	}

}
		String path = "C:\\Users\\SimpleManWp\\Desktop";
		File f = new File(path);
		//获取 文件名过滤的文件
		String Filelist[] = f.list(new FileFilter());
		//遍历文件
        for (int i=0;i<Filelist.length;i++)
        {    //遍历返回的字符数组
            System.out.print(Filelist[i]+"\t\t");
            System.out.print((new File("C:\\\\Users\\\\SimpleManWp\\\\Desktop",Filelist[i])).isFile()?"文件"+ "\t\t":"文件夹"+"\t\t");
            System.out.println((new File("C:\\\\Users\\\\SimpleManWp\\\\Desktop",Filelist[i])).length()+"字节");
        }
```

参考
http://c.biancheng.net/view/1133.html

#### 动态读取文件

##### RandomAccessFile篇

```java
package demo;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.RandomAccessFile;
import java.io.UnsupportedEncodingException;

public class wjrw {

	public static void main(String[] args) {
	
		//固定路径下创建一个文件
		String path = "C:\\Users\\SimpleManWp\\Desktop\\123.txt";
		File file = new File(path);
		if(file.exists()) {
			file.delete();
			
			try {
				file.createNewFile();
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}else {
			try {
				file.createNewFile();
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		

		try {
			RandomAccessFile rf = new RandomAccessFile(file,"rw");
			//创建要写入的字符串
			String str1="男儿横行当有术，区区莽夫难登天";
			//进行编码转换
			try {
				String str2=new String(str1.getBytes("GBK"),"iso8859-1");
				//将要写入的 字符串写入文件
				try {
					//按照内容不同使用不同的方法
					rf.writeBytes(str2);
					//获取当前指针的位置
					System.out.println(rf.getFilePointer());
					//移动指针位置
					rf.seek(0);
					//创建一个定长的数组
					byte[] buffer=new byte[14];
					//read函数 在文件rf中的当前指针下截取(buffer长度)数据放在buffer数组中
					rf.read(buffer);
					//将数组buffer中的数据以字符串形式输出
					System.out.println(new String(buffer));
					
				} catch (IOException e) {
					e.printStackTrace();
				}
			} catch (UnsupportedEncodingException e) {
				e.printStackTrace();
			} 	
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		}
	}

}
```

注：使用read()方法后，指针会进行移位
例: 文件中的句子为 "男儿横行当有术，区区莽夫难登天",下面打印的就是"区区莽夫难登天"

```java
//创建一个定长数组
byte[] buffer1 = new byte[14];
byte[] buffer2 = new byte[2];
byte[] buffer3 = new byte[14];
//读取rf当前 指针下 buffer1长度的 数据放在buffer中
//执行之后指针跳至第7个汉字之后
rf.read(buffer1);
//执行之后指针跳至第8个汉字之后
rf.read(buffer2);
//执行之后指针跳至第15个汉字之后
rf.read(buffer3);
System.out.print(new String(buffer3));
```

- 循环获取
  根据前面两种结合，循环读取

```java
byte[] buffer1 = new byte[2];
int len=0;
while((len=rf.read(buffer1))!=-1) {
System.out.print(new String(buffer1));
}
```

https://blog.csdn.net/weixin_41543601/article/details/88638342



## InputStream篇

### FileInputStream

- 第一种读取固定长度的数据

```java
public static void main(String[] args) throws IOException {
    String path = "C:/Users/SimpleManWp/Desktop";
    String name = "测试文件.txt";
    //只要括号中能拼出路径就行了，写法多样
    File file = new File(path,name);

    //拿到需要读取的字节流对象
    InputStream input = new FileInputStream(file);

    //创建一个去拿数据的byte数组
    byte bytes[] = new byte[7];
    //自我理解用创建的byte数组去input里面去装
    input.read(bytes);   //亲测，txt中换行符占两个字节
    //关闭
    input.close();

    System.out.println(new String(bytes));
}
```

- 第二种读取文件大小的数据，直接读取全部

```java
public static void main(String[] args) throws IOException {
    String path = "C:/Users/SimpleManWp/Desktop";
    String name = "测试文件.txt";
    //只要括号中能拼出路径就行了，写法多样
    File file = new File(path,name);

    //拿到需要读取的字节流对象
    InputStream input = new FileInputStream(file);

    //创建一个去拿数据的byte数组,数组大小为文件大小
    byte bytes[] = new byte[(int)file.length()];
    input.read(bytes);
    //关闭
    input.close();

    System.out.println(new String(bytes));
```

- 第三种读取文件大小的数据，挨个读取字节，不存在下一个的时候停止

```java
public static void main(String[] args) throws IOException {
    String path = "C:/Users/SimpleManWp/Desktop";
    String name = "测试文件.txt";
    //只要括号中能拼出路径就行了，写法多样
    File file = new File(path,name);

    //拿到需要读取的字节流对象
    InputStream input = new FileInputStream(file);

    //创建一个去拿数据的byte数组,数组大小为文件大小
    byte bytes[] = new byte[(int)file.length()];
    int len = 0 ;
    int temp = 0 ;
    //挨个读取input中的每个字节，当出现读取不到，read()返回值为-1的时候，就不再读取（read读取到的每个字节都会对应一个数字，当为空的时候为-1）
    while((temp=input.read())!=-1){
        bytes[len] = (byte)temp ;
        len++ ;
    }

    System.out.println(new String(bytes));
```

https://www.cnblogs.com/kongxianghao/articles/6879367.html



## outputStream篇

### FileOutputStream

- 按字节流来读取和写入

```java
public static void main(String[] args) throws IOException {

//获取文件路径对象
File intfile = new File("C:/Users/SimpleManWp/Desktop/桌面文件.txt");
//创建文件对象
FileInputStream input = new FileInputStream(intfile);
//创建读取文件大小的byte数组
byte[] bytes = new byte[(int) intfile.length()];
//将读取的数据放在创建的数组中
input.read(bytes);
//byte数组中得到的 是字节流，强转char，字节流转字符流
for(int i=0;i<bytes.length;i++){
System.out.println((char)bytes[i]);
}
//关闭文件读取
input.close();

//获取要写入的字符串，添加"\r"、"\n"、"\r\n"都是换行,"\t"是空格
String str = "66666" +"\r" +"\t"+"123"+new String(bytes);
//获取文件路径对象
File file = new File("C:/Users/SimpleManWp/Desktop/桌面文件.txt")	;
//创建文件对象
FileOutputStream output = new FileOutputStream(file);
//文件写入新的 byte数组
output.write(str.getBytes());
//关不文件写入
output.close();
}
```
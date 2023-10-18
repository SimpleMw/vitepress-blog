---
title: JFrame画板
date: 2022-12-27 17:34:36
category: java基础相关
tag: java
top_img: false
---



- 展示画板内容

```java
import javax.swing.*;
import java.util.HashMap;
import java.util.Map;

public class JFramePrint {

    Map<String,JFrame> map = new HashMap<>();

    public void printMessage(String jframeName,String message){
        JFrame jf = createJFrame(jframeName);
        //创建画笔
        JPanel jp=new JPanel();
        //传入文本
        JTextArea jta=new JTextArea(message);
        jp.add(jta);
        //内容展示在面板上
        jf.add(jp);
        jp.updateUI();
    }

    public JFrame createJFrame(String name){
        if(map.containsKey(name)){
            return map.get(name);
        }else{
            JFrame jf=new JFrame("窗口");// 创建一个标题为"JTextArea"的窗口
            jf.setBounds(100, 100, 800, 600);// 设置窗口的坐标和大小
            jf.setDefaultCloseOperation(WindowConstants.EXIT_ON_CLOSE);// 设置窗口关闭即退出程序
            jf.setVisible(true);// 设置窗口可见
            map.put(name,jf);
            return jf;
        }
    }


    public static void main(String[] args) {
        JFramePrint jFramePrint = new JFramePrint();
        jFramePrint.printMessage("ces","hellowold");
    }

}
```


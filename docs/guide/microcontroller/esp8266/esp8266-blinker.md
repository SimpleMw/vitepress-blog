---
title: ESP8266
date: 2023-02-11 08:40:27
---



#### 接入小爱控制引脚4

- 通过wifi连接点灯科技
- 将点灯科技设备接入米家
- 小爱同学通过命令发送不同的操作指令控制灯

APP软件有

	- 电灯-blinker
	- 米家
	- 小爱音响

[ESP8266引脚图]([ESP8266 GPIO 的指南：引脚图 - 哔哩哔哩 (bilibili.com)](https://www.bilibili.com/read/cv14229875))

[点灯科技引入]([点灯科技 (diandeng.tech)](https://www.diandeng.tech/doc/xiaoai))

```c++
#define BLINKER_WIFI  //用于指定设备接入方式 wifi 接入
#define BLINKER_MIOT_LIGHT
#define BLINKER_MIOT_OUTLET
#define BLINKER_MIOT_SENSOR
#define BLINKER_MIOT_FAN
#define BLINKER_MIOT_AIR_CONDITION

#include <Blinker.h>

//设备密钥
char auth[] = "58347aa10ecb"; 
//wifi名称
char ssid[] = "ChinaNet-aemM";
//wifi密码
char pswd[] = "wp907678446";

int colorW = 0;

//app的按钮名称(若不添加按钮可以不设置)
BlinkerButton Button1("myLamp");

//app 按钮回调
void button1_callback(const String & state) {
     BLINKER_LOG("get button state: ", state);
     if (state=="on") {
      digitalWrite(LED_BUILTIN, LOW);
        // 反馈开关状态
        Button1.print("on");
    } else if(state=="off"){
      digitalWrite(LED_BUILTIN, HIGH); 
        // 反馈开关状态
        Button1.print("off");
    }
}

//电源类回调
void miotPowerState(const String & state)
{
    BLINKER_LOG("need set power state: ", state);
    if (state == "on") {
      digitalWrite(LED_BUILTIN, LOW);
      // 反馈开关状态
      Button1.print("on");
      BlinkerMIOT.powerState("on");
      BlinkerMIOT.print();
    }
    else if (state == "off") {
      digitalWrite(LED_BUILTIN, HIGH); 
      // 反馈开关状态
      Button1.print("off");
      BlinkerMIOT.powerState("off");
      BlinkerMIOT.print();
    }
}

//亮度回调
void miotBright(const String & bright)
{
    BLINKER_LOG("need set brightness: ", bright);
    colorW = bright.toInt();
    BLINKER_LOG("now set brightness: ", colorW);
    analogWrite(2,100-colorW); //给指定引脚写入数据
    BlinkerMIOT.brightness(colorW);
    BlinkerMIOT.print();
}

void setup() {
    //初始化串口，并开启调试信息
    Serial.begin(115200);    
    BLINKER_DEBUG.stream(Serial); 
    //初始化blinker
    Blinker.begin(auth, ssid, pswd);
    BlinkerMIOT.attachPowerState(miotPowerState);
    BlinkerMIOT.attachBrightness(miotBright);
    Button1.attach(button1_callback); //绑定按键执行回调函数
    //设置LED灯为输出模式
    pinMode(LED_BUILTIN, OUTPUT);
    pinMode(2,OUTPUT);
    analogWriteRange(100);
}

void loop() {
    Blinker.run(); 
}
```


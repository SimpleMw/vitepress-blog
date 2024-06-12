---
title: docker
date: 2023-08-23 08:46:11
---

### 虚拟机安装Docker以及启动

#### 将老版本docker删除干净

```
yum remove docker \
                  docker-client \
                  docker-client-latest \
                  docker-common \
                  docker-latest \
                  docker-latest-logrotate \
                  docker-logrotate \
                  docker-engine
rpm  -qa |grep  docker
yum list installed | grep docker
yum remove -y  containerd.io.x86_64   docker-ce.x86_64   docker-ce-cli.x86_64
```

安装见 [教程](https://blog.csdn.net/weixin_39553910/article/details/89953617)

#### 修改docker.service文件   

/etc/systemd/system/docker.service

- 第一种

```
ExecStart=/usr/bin/dockerd -H tcp://0.0.0.0:2375 -H fd:// --containerd=/run/containerd/containerd.sock
```

若启动失败，则删除 -H fd:// --containerd=/run/containerd/containerd.sock

- 第二种

```
ExecStart=/usr/bin/dockerd -H tcp://0.0.0.0:2375 -H unix://var/run/docker.sock
```

#### 重新加载配置

```
systemctl daemon-reload
```

#### 启动docker

```
systemctl start docker
```



#### 加入宿主机路由

虚拟机启动docker，宿主机无法访问虚拟机中的docker，需加入路由

route -p add 172.17.0.0 mask 255.255.0.0 192.168.128.129  前面是docker的ip后面是虚拟机的ip

- 其它方式(windows) [参考](https://blog.csdn.net/qq_35911589/article/details/130884067))

  - CMD管理员执行

    ```
    netsh interface portproxy add v4tov4 listenport=2375 listenaddress= 10.245.228.89 connectaddress=127.0.0.1 connectport=2375
    ```

  - IP_Helper 服务重启

    



#### Dockerfile文件

- FROM      基于什么基础镜像
- RUN    构建镜像时运行的指令

```
#运行shell指令
RUN yum install -y vim
```

```
#运行数组模式的命令
RUN ["yum","install","-y","vim"]
```

```
#运行echo打印
RUN echo hello
```

- EXPOSE    暴露的端口

- WORKDIR  进入镜像的落脚点目录

- COPY、ADD   将文件拷贝入镜像中

  解释：区别：ADD会自动解压、ADD还能对文件中的地址进行自动下载，但对下载的压缩包不会自动解压

- VOLUME    设置镜像可挂载目录

- ENV 设置环境变量   

```
ENV JAVA_HOME /data/JDK
```

- CMD、ENTRYPOINT

解释：区别，ENTRYPOINT只能执行一个指令，CMD可以运行多个但只能执行最后一个

与 RUN的区别，RUN是在镜像生成时执行，CMD和ENTRYPOINT是在运行容器时第一个命令



### 常用命令

#### 查看所有镜像

```
docker images
```

#### 新建镜像

```
docker build -t  mycentos:01 .
```

解释：后面的.表示Dockerfile在当前路径下

#### 启动镜像

```shell
docker run -it centos
```

解释：加it表示运行时进入container

```shell
#加长版run
docker run -d -p 9669:9669 --name demoname mycentos:01 --network host
```

解释：-d 后台启动  -p 设置端口映射  --name 设置容器名称 --network host 以当前服务器的ip作为容器ip

```shell
docker run -d -p 9669:9669 --name demoname mycentos:01 --restart=always
```

解释：--restart=always 服务器开机自启镜像

```shell
docker exec -it
```

解释：在运行的容器中执行命令

#### 查看容器

```
#查看正在运行的容器
docker ps
```

```
#查看运行过的容器
docker ps -a
```

#### 关闭容器

```
docker stop 容器名
```

#### 移除容器

```
#移除停止的容器
docker rm 容器名
```

```
#移除全部已经停止的容器
docker rm $(docker ps -qa)
```

#### 移除镜像

```
docker rmi 镜像ID
```

#### 镜像物理转移

- 镜像转tar

```shell
docker save -o aaa.tar mycentos:01
```

- tar转镜像

```shell
docker load -i aaa.tar
```

#### 修改镜像中的内容

```shell
docker run -it --name temp_container <image_name> /bin/bash
```



#### docker容器的模式

1. 桥接模式（Bridge）：容器连接到一个虚拟网桥中，在该虚拟网桥中，它们可以相互通信，也可以与宿主机和外部网络通信。
2. 主机模式（Host）：容器直接使用主机的网络，能够和外部网络进行直接通信。
3. 容器模式（Container）：将一个容器连接到另一个容器的网络栈中，这样它们就可以直接通信。
4. 无网络模式（None）：容器没有网络，只能通过ipc的方式通信。



#### 常规参数

##### 允许容器访问宿主机的网络接口

```shell
--add-host=host.docker.internal:host-gateway
```



#### 注

- 使用docker-desktop启动容器后网段为WSL的网段





### IDEA集成docker

#### 安装docker插件

#### 编写Dockerfile文件

```dockerfile
#设置基础镜像
FROM openjdk:8-jre
#设置进入镜像的目录
WORKDIR /app
#将上下文目录中的jar复制到WORKDIR目录
ADD docker-0.0.1-SNAPSHOT.jar app.jar
#暴露接口
EXPOSE 9669
#容器运行时最先执行的命令
ENTRYPOINT ["java","-jar"]
CMD ["app.jar"]
```

#### POM中引入dockerfile

```xml
<build>
	<plugins>
		<plugin>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-maven-plugin</artifactId>
		</plugin>
		<plugin>
			<groupId>com.spotify</groupId>
			<artifactId>docker-maven-plugin</artifactId>
			<version>1.0.0</version>
			<configuration>
				<!-- 这里实际配置的是在docker服务器上要执行的命令 -->
				<!-- 要生成的镜像名称 -->
				<imageName>dockerdemo:0.0.1</imageName>
				<!-- 指定远程 docker api地址 -->
				<dockerHost>http://172.17.0.1:2375</dockerHost>
				<!-- 配置用户的安全验证，用户名和密码，需在maven的setting.xml文件中进行配置 -->
				<!-- setting.xml有两处配置位置：
				1.用户/.m2/settings.xml
				2.maven/apache-maven-3.6.3/conf/setting.xml(maven安装路径)-->
				<serverId>my-docker-registry</serverId>
				<!-- 配置tar信息及地址(需要先对项目进行package打包) -->
				<resources>
					<resource>
						<directory>${project.build.directory}</directory>
						<include>${project.build.finalName}.jar</include>
					</resource>
				</resources>
				<!-- 描述，可以写开发人员的信息 -->
				<maintainer>docker_maven docker_maven@email.com</maintainer>
				<!-- 引入Dockerfile-->
				<dockerDirectory>${project.basedir}/src/main/docker</dockerDirectory>
			</configuration>
		</plugin>
	</plugins>
</build>
```


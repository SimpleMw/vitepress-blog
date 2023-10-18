---
title: flowable新理解
date: 2023-05-24 18:12:13
---



#### 部分

- 流程
- 应用程序
- 任务

注：

1.创建流程 -> 创建应用程序 ->开启任务 -> 用户任务提交和完成

2.启动程序的时候会校验是否已经创建表，若不存在则会创建

3.创建流程的时候不止可以指定单人，也可以指定组

4.一个流程可以创建多个流程定义



#### API相关

- ProcessEngine  管理整个流程引擎
- RepositoryService 管理流程定义
- RuntimeService 管理流程实例
- TaskService 管理流程任务



#### 整合

- maven配置

```xml
<parent>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-parent</artifactId>
    <version>2.6.2</version>
    <relativePath/> <!-- lookup parent from repository -->
</parent>

<dependencies>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-test</artifactId>
    </dependency>
    <!-- 可以采用MySQL存储，也可以采用H2，看自己的需要 -->
    <!--mysql驱动-->
    <dependency>
        <groupId>mysql</groupId>
        <artifactId>mysql-connector-java</artifactId>
        <version>8.0.18</version>
    </dependency>
    <dependency>
        <groupId>org.projectlombok</groupId>
        <artifactId>lombok</artifactId>
        <version>1.18.12</version>
    </dependency>
    <!-- flowable -->
    <dependency>
        <groupId>org.flowable</groupId>
        <artifactId>flowable-spring-boot-starter</artifactId>
        <version>${flowable.version}</version>
    </dependency>
    <dependency>
        <groupId>org.flowable</groupId>
        <artifactId>flowable-spring-boot-starter-ui-modeler</artifactId>
        <version>${flowable.version}</version>
    </dependency>
    <dependency>
        <groupId>org.flowable</groupId>
        <artifactId>flowable-spring-boot-starter-ui-admin</artifactId>
        <version>${flowable.version}</version>
    </dependency>
    <dependency>
        <groupId>org.flowable</groupId>
        <artifactId>flowable-spring-boot-starter-ui-idm</artifactId>
        <version>${flowable.version}</version>
    </dependency>
    <dependency>
        <groupId>org.flowable</groupId>
        <artifactId>flowable-spring-boot-starter-ui-task</artifactId>
        <version>${flowable.version}</version>
    </dependency>
    <!-- Flowable 内部日志采用 SLF4J -->
    <dependency>
        <groupId>org.slf4j</groupId>
        <artifactId>slf4j-api</artifactId>
    </dependency>
    <dependency>
        <groupId>org.slf4j</groupId>
        <artifactId>slf4j-log4j12</artifactId>
    </dependency>
    <!-- fastjson -->
    <dependency>
        <groupId>com.alibaba</groupId>
        <artifactId>fastjson</artifactId>
        <version>1.2.75</version>
    </dependency>
</dependencies>
```

- 配置

```yaml
spring:
  application:
    name: flowableDemo
  datasource:
    url: jdbc:mysql://localhost:3306/flowable?useUnicode=true&characterEncoding=utf8&serverTimezone=GMT%2b8&nullCatalogMeansCurrent=true
    username: root
    password: 123456
    driverClassName: com.mysql.cj.jdbc.Driver

flowable:
  #关闭定时任务JOB
  async-executor-activate: false
  database-schema-update: true
```

- controller

```java
import com.simplemw.common.ReturnDto;
import com.simplemw.model.vo.CompleteTaskVo;
import com.simplemw.service.FlowableOperateService;
import io.swagger.annotations.Api;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/flowable")
@Api(value = "/flowable",tags = {"flowable"})
public class FlowableOperateController {

    @Autowired
    private FlowableOperateService flowableOperateService;

    /**
     * 获取所有的流程模型
     */
    @GetMapping("/getAllDefinition")
    public ReturnDto getAllDefinition(){
        return flowableOperateService.getAllDefinition();
    }

    /**
     * 获取所有的应用程序
     */
    @GetMapping("/getAllDeployment")
    public ReturnDto getAllDeployment(){
        return flowableOperateService.getAllDeployment();
    }

    /**
     * 启动流程
     */
    @GetMapping("/startProcess")
    public ReturnDto startProcess(@RequestParam("processName") String processName){
        return flowableOperateService.startProcess(processName);
    }

    /**
     * 根据用户名获取要处理的任务
     */
    @GetMapping("/getTaskList")
    public ReturnDto getTaskList(@RequestParam("name") String name){
        return flowableOperateService.getTaskList(name);
    }

    /**
     * 任务提交和完成
     */
    @GetMapping("/completeTask")
    public ReturnDto completeTask(CompleteTaskVo completeTaskVo){
        return flowableOperateService.completeTask(completeTaskVo);
    }

}
```

- service

```java
import com.simplemw.common.ReturnDto;
import com.simplemw.config.exception.MyFlowableException;
import com.simplemw.model.vo.CompleteTaskVo;
import org.flowable.common.engine.api.FlowableException;
import org.flowable.engine.ProcessEngine;
import org.flowable.engine.RepositoryService;
import org.flowable.engine.RuntimeService;
import org.flowable.engine.TaskService;
import org.flowable.engine.repository.Deployment;
import org.flowable.engine.repository.ProcessDefinition;
import org.flowable.engine.runtime.ProcessInstance;
import org.flowable.task.api.Task;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class FlowableOperateService {

    @Autowired
    RepositoryService repositoryService;
    @Autowired
    private ProcessEngine processEngine;
    @Autowired
    private RuntimeService runtimeService;
    @Autowired
    private TaskService taskService;

    /**
     * 获取所有的流程模型
     */
    public ReturnDto getAllDefinition(){
        RepositoryService repositoryService = processEngine.getRepositoryService();
        List<ProcessDefinition> definitions = repositoryService.createProcessDefinitionQuery().list();
        definitions.forEach(System.out::println);
        return ReturnDto.ok();
    }

    /**
     * 获取所有的应用程序(流程定义)
     */
    public ReturnDto getAllDeployment(){
        List<Deployment> deployments = repositoryService.createDeploymentQuery().list();
        deployments.forEach(System.out::println);
        return ReturnDto.ok();
    }

    /**
     * 启动流程实例
     */
    public ReturnDto startProcess(String processName){
        Map<String, Object> variables = new HashMap<>();
        variables.put("description", "启动实例");
        ProcessInstance processInstance =
                runtimeService.startProcessInstanceByKey(processName, variables);
        System.out.println("processInstance: " + processInstance.toString());
        return ReturnDto.ok();
    }

    /**
     * 根据用户名获取要处理的任务
     */
    public ReturnDto getTaskList(String name){
        List<Task> list = taskService.createTaskQuery().taskAssignee(name).list();
        list.forEach(System.out::println);
        return ReturnDto.ok();
    }

    /**
     * 任务提交和完成
     */
    public ReturnDto completeTask(CompleteTaskVo completeTaskVo){
        String taskId = completeTaskVo.getTaskId();
        String submitter = completeTaskVo.getSubmitter();
        //判断是否存在该任务
        Task task = taskService.createTaskQuery().taskId(taskId).singleResult();
        if(task == null) {
            throw new MyFlowableException("未找到任务,请检查");
        }
        if(submitter.equals(task.getAssignee())){
            Map<String, Object> variables = new HashMap<>();
            variables.put("approved", true);
            taskService.complete(taskId, variables);
            return ReturnDto.ok("提交成功");
        }else {
            throw new FlowableException("提交人和当前任务不匹配");
        }
    }
}
```


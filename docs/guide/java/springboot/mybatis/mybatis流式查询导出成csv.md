---
title: Mybatis流式查询导出CSV
date: 2023-10-10 08:20:27
---





注:

大数据量导出，csv是不带任何格式的字符串，csv的格式是逗号隔开个字符串



#### 创建写入执行工具类

```java
import cn.afterturn.easypoi.excel.annotation.Excel;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.List;

/**
 * 导出成csv
 */
public class DownloadProcessor {
    private final HttpServletResponse response;

    public DownloadProcessor(Class<?> pojoClass,HttpServletResponse response) throws IOException {


        this.response = response;
        String fileName = System.currentTimeMillis() + ".csv";
        this.response.addHeader("Content-Type", "application/csv");
        this.response.addHeader("Content-Disposition", "attachment; filename="+fileName);
        this.response.setCharacterEncoding("UTF-8");

        //反射获取类的值放入第一行
        List<String> values = new ArrayList<>();
        Field[] fields = pojoClass.getDeclaredFields();
        // 遍历字段，获取@Excel注解的值(此处也可以是使用自定义注解)
        for (Field field : fields) {
            Excel excelAnnotation = field.getAnnotation(Excel.class);
            if (excelAnnotation != null) {
                String excelValue = excelAnnotation.name();
                values.add(excelValue);
            }
        }
        // 将值用逗号隔开并写入Excel
        String csvLine = String.join(",", values);
        response.getWriter().write(csvLine);
        response.getWriter().write("\n");
    }

    public <E> void processData(E record) {
        try {
            //csv文件每一行的内容为字符串逗号隔开
            response.getWriter().write(record.toString());
            response.getWriter().write("\n");
        }catch (IOException e){
            e.printStackTrace();
        }
    }
}
```

#### 写handler

```java
import org.apache.ibatis.session.ResultContext;
import org.apache.ibatis.session.ResultHandler;

public class CustomResultHandler implements ResultHandler {

    private final DownloadProcessor downloadProcessor;

    public CustomResultHandler(
            DownloadProcessor downloadProcessor) {
        super();
        this.downloadProcessor = downloadProcessor;
    }

    @Override
    public void handleResult(ResultContext resultContext) {
        Person person = (Person)resultContext.getResultObject();
        downloadProcessor.processData(person);
    }

}
```

#### 使用

```java
CustomResultHandler customResultHandler = new CustomResultHandler(
    new DownloadProcessor (Person.class,httpServletResponse));
//此处注明要查询的mapper,以及传参
HashMap<String, Object> param = new HashMap<>();
param.put("name", '张三');
param.put("age", 18);
sqlSessionTemplate.select(
    "com.simplemw.dao.InfoDao.listPerson", param, customResultHandler);
httpServletResponse.getWriter().flush();
httpServletResponse.getWriter().close();
```




---
title: Easyexcel
date: 2024-04-08 8:34:36
category: java基础相关
tag: java
top_img: false
---

### EasyExcel使用

- 依赖

```xml
<dependency>
    <groupId>com.alibaba</groupId>
    <artifactId>easyexcel</artifactId>
    <version>3.0.5</version>
</dependency>
```

#### 导入

- 使用背景，excel数据量大导致读取的时候内存溢出，可通过EasyExcel解决
- 原理，一行一行解析，可自由调节处理的数据条数
- 实现类(此处是直接用Map去接收的,也可用类去接收每行的数据)

<font color=red>后面都是一些业务的用法，方便复制</font>

##### 简单的导入

```java
import com.alibaba.excel.EasyExcel;
import com.alibaba.excel.context.AnalysisContext;
import com.alibaba.excel.event.AnalysisEventListener;
import com.alibaba.excel.metadata.CellExtra;
import com.alibaba.excel.read.builder.ExcelReaderBuilder;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

@Service
public class DemoOneService {

    //直接使用EasyExcel解析
    public void exportExcel(MultipartFile file) {

        final int[] j = {0};
        //创建list集合
        List<Map<Integer, String>> list = new LinkedList<>();
        //创建listener
        AnalysisEventListener<Map<Integer, String>> analysisEventListener = new AnalysisEventListener<Map<Integer, String>>() {
            @Override
            public void onException(Exception exception, AnalysisContext context) throws Exception {
                super.onException(exception, context);
            }

            //每解析一行数据,该方法会被调用一次
            @Override
            public void invoke(Map<Integer, String> map, AnalysisContext analysisContext) {
                //此处可以做很多筛选
                //获取sheetNo
                analysisContext.readSheetHolder().getSheetNo();
                //获取sheetName
                analysisContext.readSheetHolder().getSheetName();

                //由于感觉后面读取的忽略空行不起作用，故此处单独做空行判断(实际业务中可能只需判断一个值是否为空就能判断)
                if(map.get(0) == null || StringUtils.isEmpty(map.get(0))){
                    //做业务处理
                    for (Map<Integer,String> map1:list) {
                        j[0] = j[0] +1;
                        System.out.println("第"+ j[0] +"行数据是----"+map1.toString());
                    }
                    //清理list
                    list.clear();
                }else{
                    //数据放入list
                    list.add(map);
                    //一般处理方式
                    if (list.size() >= 200) {
                        //做业务处理
                        for (Map<Integer,String> map1:list) {
                            j[0] = j[0] +1;
                            System.out.println("第"+ j[0] +"行数据是----"+map1.toString());
                        }
                        //清理list
                        list.clear();
                    }
                }
            }

            @Override
            public void extra(CellExtra extra, AnalysisContext context) {
                System.out.println("EXTRA");
                super.extra(extra, context);
            }

            //可以用来处理最后剩下的数据
            @Override
            public void doAfterAllAnalysed(AnalysisContext analysisContext) {
                //做业务处理
                for (Map<Integer,String> map1:list) {
                    j[0] = j[0] +1;
                    System.out.println("第"+ j[0] +"行数据是----"+map1.toString());
                }
                //清理list
                list.clear();
                System.out.println("---------------"+analysisContext.readSheetHolder().getSheetName()+" 已解析完成");
            }

            //没解析完一行数据后，如果存在下一行数据就会调这个方法
            @Override
            public boolean hasNext(AnalysisContext context) {
                return super.hasNext(context);
            }
        };

        //通过EasyExcel
        try {
            EasyExcel.read(file.getInputStream(),analysisEventListener)
                    .headRowNumber(1) //指定表头
                    .ignoreEmptyRow(false) //是否忽略空行，感觉不起作用
//                    .sheet(1).doRead(); //可指定sheet,指定sheet后用doRead
                    .doReadAll();

//            //也可通过 ExcelReaderBuilder 构建
//            ExcelReaderBuilder excelReaderBuilder = new ExcelReaderBuilder();
//            excelReaderBuilder.file(file.getInputStream())
//                    .registerReadListener(analysisEventListener)
//                    .ignoreEmptyRow(true) //忽略空行，感觉不起作用
//                    .autoCloseStream(true) //是否自动关闭流
//                    .headRowNumber(1) //表头行数
//                    .doReadAll();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
```

##### 动态表头导入

其实就是根据第一行的表头做对应关系

```java
public void importExtend(MultipartFile file){

    List<String> items = new ArrayList<>();
    final int[] begin = {0};
    final int[] end = {0};
    Map<String,List<String>> dataMap = new HashMap<>();

    /**
         * 创建listener
         */
    AnalysisEventListener<Map<Integer, String>> analysisEventListener = new AnalysisEventListener<Map<Integer, String>>() {
        @Override
        public void invoke(Map<Integer, String> data, AnalysisContext context) {
            if(context.readRowHolder().getRowIndex() == 0){
                //设置开始位置和结束位置的字符串
                String startStr;
                String endStr;
                if("SysTime".equals(data.get(1))) { //自定义判断第一行，若不需要则直接指定
                    startStr = "start";
                    endStr = "end";
                } else {
                    throw new ExcelAnalysisStopException();
                }
                //解析并获取所有的项次
                boolean getFlag = false;
                for (Integer integer : data.keySet()) {
                    if(endStr.equals(data.get(integer))){
                        getFlag = false;
                        end[0] = integer;
                    }
                    if(getFlag){
                        items.add(data.get(integer));
                        dataMap.put(data.get(integer),new ArrayList<>());
                    }
                    if(startStr.equals(data.get(integer))){
                        getFlag = true;
                        begin[0] = integer + 1;
                    }
                }
                return;
            }
            //跳过前面几行，若不需要则直接跳过
            if(context.readRowHolder().getRowIndex() <= 3){
                return;
            }
            //处理后面几行数据
            for (int i = 0; i < data.size(); i++) {
                if(i >= begin[0] && i < end[0]){
                    dataMap.get(items.get(i-begin[0])).add(data.get(i));
                }
            }
        }

        @Override
        public void doAfterAllAnalysed(AnalysisContext analysisContext) {

        }
    };

    //easyexcel执行
    try {
        EasyExcel.read(file.getInputStream(),analysisEventListener)
            .excelType(ExcelTypeEnum.CSV)
            .headRowNumber(0) //指定表头
            .ignoreEmptyRow(false) //是否忽略空行，感觉不起作用
            //                    .sheet(1).doRead(); //可指定sheet,指定sheet后用doRead
            .doReadAll();
    } catch (IOException e) {
        e.printStackTrace();
    }
}
```



##### 带合并单元格的导入

简单的处理只有一个合并项的导入，复杂的需要重新设计缓存上一行

```JAVA
import com.alibaba.excel.annotation.ExcelProperty;
import com.fasterxml.jackson.annotation.JsonFormat;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.util.Date;

@Data
public class TestDemo {

    @ApiModelProperty(value = "CFG编号")
    @ExcelProperty(value = "CFG编号", index = 0)
    private String cfgNo;
    @ApiModelProperty(value = "专案")
    @ExcelProperty(value = "专案", index = 1)
    private String project;
    @ApiModelProperty(value = "build")
    @ExcelProperty(value = "build", index = 2)
    private String build;
    @ApiModelProperty(value = "测试数量")
    @ExcelProperty(value = "测试数量", index = 3)
    private String qty;
    @ApiModelProperty(value = "总时长")
    @ExcelProperty(value = "总时长", index = 4)
    private String totalTime;
    @ApiModelProperty(value = "状态")
    @ExcelProperty(value = "status", index = 5)
    private String status;
    @ApiModelProperty(value = "预计开始时间")
    @ExcelProperty(value = "预计开始时间", index = 6)
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private Date startTime;
    @ApiModelProperty(value = "预计结束时间")
    @ExcelProperty(value = "预计结束时间", index = 7)
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private Date endTime;


    @ApiModelProperty(value = "WF_ID")
    @ExcelProperty(value = "WF_ID", index = 8)
    private String wfid;
    @ApiModelProperty(value = "测试项目名称")
    @ExcelProperty(value = "测试项目名称", index = 9)
    private String testName;
    @ApiModelProperty(value = "测试时长")
    @ExcelProperty(value = "测试时长", index = 10)
    private Integer testTime;
    @ApiModelProperty(value = "数量")
    @ExcelProperty(value = "数量", index = 11)
    private Integer detailQty;
    @ApiModelProperty(value = "预计开始时间")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    @ExcelProperty(value = "预计开始时间", index = 12)
    private Date detailStartTime;
    @ApiModelProperty(value = "预计结束时间")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    @ExcelProperty(value = "预计结束时间", index = 13)
    private Date detailEndTime;

    public TestDemo() {
    }

    public TestDemo(TestDemo testDemo,TestDemoExtend testDemoExtend) {
        this.cfgNo = testDemoExtend.getCfgNo();
        this.project = testDemoExtend.getProject();
        this.build = testDemoExtend.getBuild();
        this.qty = testDemoExtend.getQty();
        this.totalTime = testDemoExtend.getTotalTime();
        this.status = testDemoExtend.getStatus();
        this.startTime = testDemoExtend.getStartTime();
        this.endTime = testDemoExtend.getEndTime();

        this.wfid = testDemo.getWfid();
        this.testName = testDemo.getTestName();
        this.testTime = testDemo.getTestTime();
        this.detailQty = testDemo.getDetailQty();
        this.detailStartTime = testDemo.getDetailStartTime();
        this.detailEndTime = testDemo.getDetailEndTime();
    }
}
```

```java
import com.fasterxml.jackson.annotation.JsonFormat;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.util.Date;

@Data
public class TestDemoExtend {

    @ApiModelProperty(value = "CFG编号")
    private String cfgNo;
    @ApiModelProperty(value = "专案")
    private String project;
    @ApiModelProperty(value = "build")
    private String build;
    @ApiModelProperty(value = "测试数量")
    private String qty;
    @ApiModelProperty(value = "总时长")
    private String totalTime;
    @ApiModelProperty(value = "状态")
    private String status;
    @ApiModelProperty(value = "预计开始时间")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private Date startTime;
    @ApiModelProperty(value = "预计结束时间")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private Date endTime;
}

```

```java
@PostMapping("/importExcel2")
@ApiOperation(value = "测试导入")
public void importExcel(@RequestParam("file") MultipartFile file){

    List<TestDemo> dataList = new ArrayList<>();

    AnalysisEventListener<TestDemo> analysisEventListener = new AnalysisEventListener<TestDemo>() {

        final TestDemoExtend testDemoOther = new TestDemoExtend();

        @Override
        public void invoke(TestDemo data, AnalysisContext context) {
            if(!StringUtils.isEmpty(data.getCfgNo())){
                BeanUtils.copyProperties(data,testDemoOther);
                dataList.add(data);
            }else{
                TestDemo newData = new TestDemo(data,testDemoOther);
                dataList.add(newData);
            }

        }

        @Override
        public void doAfterAllAnalysed(AnalysisContext analysisContext) {

        }
    };

    try {
        EasyExcel.read(file.getInputStream(),TestDemo.class,analysisEventListener)
            .headRowNumber(2) //指定表头
            .ignoreEmptyRow(false) //是否忽略空行，感觉不起作用
            //                    .sheet(1).doRead(); //可指定sheet,指定sheet后用doRead
            .doReadAll();
        for (TestDemo testDemo : dataList) {
            System.out.println(testDemo.toString());
        }

    } catch (IOException e) {
        e.printStackTrace();
    }
}
```

#### 导出

##### 带实体的导出

- 实体

```java
@Data
public class ExcelDemoTwoEntity {

    //index 表示导出的excel的下标0为第一列，若不注明index则会直接紧凑排列

    @ExcelProperty(value = {"公共头","名称"},index = 0)
    private String name;
    @ExcelProperty(value = {"公共头","信息"},index = 1)
    private String message;
    @ExcelProperty(value = {"公共头","信息1"},index = 2)
    private String message1;
    @ExcelProperty(value = {"公共头","信息2"},index = 3)
    private String message2;
    @ExcelProperty(value = {"公共头","信息3"},index = 4)
    private String message3;
    @ExcelProperty(value = {"公共头","信息4"},index = 5)
    private String message4;
    @DateTimeFormat("yyyyMMddHHmmss")
    @ExcelProperty(value = {"公共头","日期1"},index = 6)
    private Date date1;
    @NumberFormat("#.##%")
    @ExcelProperty(value = {"公共头","数字1"},index = 7)
    private Double number1;

}
```

- 简单的导出实例

```java
public void exportExcel(HttpServletRequest request, HttpServletResponse response){
    List<ExcelDemoTwoEntity> list = new ArrayList<>();
    for (int i = 0; i < 30; i++) {
        //创建数据
        ExcelDemoTwoEntity excelDemoTwoEntity = new ExcelDemoTwoEntity();
        excelDemoTwoEntity.setName("name"+i);
        excelDemoTwoEntity.setMessage("信息"+i);
        excelDemoTwoEntity.setMessage1("信息1"+i);
        excelDemoTwoEntity.setMessage2("信息2"+i);
        excelDemoTwoEntity.setMessage3("信息3"+i);
        excelDemoTwoEntity.setMessage4("信息4"+i);
        excelDemoTwoEntity.setDate1(new Date());
        excelDemoTwoEntity.setNumber1(new Double(0.001));
        list.add(excelDemoTwoEntity);
    }
    String fileName = "导出文件";
    response.setContentType("application/vnd.ms-excel");
    response.setCharacterEncoding("utf-8");
    response.setHeader("Content-disposition", "attachment;filename=" + fileName + ".xlsx");
    try {

        //最简单的导出
        EasyExcel.write(response.getOutputStream(), ExcelDemoTwoEntity.class)
                .sheet("sheet1")
                .doWrite(list);

//            //按名称排除列
//            Set<String> excludeColumnFiledNames = new HashSet<String>();
//            excludeColumnFiledNames.add("message1");
//            EasyExcel.write(response.getOutputStream(), ExcelDemoTwoEntity.class)
//                    .excludeColumnFiledNames(excludeColumnFiledNames)
//                    .sheet("sheet1").doWrite(list);
//
//            //按下标排除列
//            Set<Integer> excludeColumnIndexes = new HashSet<>();
//            excludeColumnIndexes.add(2);
//            EasyExcel.write(response.getOutputStream(), ExcelDemoTwoEntity.class)
//                    .excludeColumnIndexes(excludeColumnIndexes)
//                    .sheet("sheet1").doWrite(list);

//            //按名称注明导入的字段
//            Set<String> includeColumnFiledNames = new HashSet<String>();
//            includeColumnFiledNames.add("message1");
//            EasyExcel.write(response.getOutputStream(), ExcelDemoTwoEntity.class)
//                    .includeColumnFiledNames(includeColumnFiledNames)
//                    .sheet("sheet1").doWrite(list);
//
//            //按下标注明导入的字段
//            Set<Integer> includeColumnIndexes = new HashSet<Integer>();
//            includeColumnFiledNames.add("1");
//            EasyExcel.write(response.getOutputStream(), ExcelDemoTwoEntity.class)
//                    .includeColumnIndexes(includeColumnIndexes)
//                    .sheet("sheet1").doWrite(list);

    } catch (IOException e) {
        e.printStackTrace();
    }
}
```

##### 多个sheet的导出

```java
List<Person1> list1 = new ArrayList<>();
List<Person2> list2 = new ArrayList<>();
String fileName = "output";
response.setContentType("application/vnd.ms-excel");
response.setCharacterEncoding("utf-8");
response.setHeader("Content-disposition", "attachment;filename=" + fileName + ".xlsx");
//导出采购单模板 放在sheet0
ExcelWriter excelWriter = EasyExcel.write(response.getOutputStream()).build();
WriteSheet mainSheet = EasyExcel.writerSheet(0, "sheet1").head(Person1.class).build();
excelWriter.write(list1,mainSheet);
//导出采购单明细模板 放在sheet1
WriteSheet detailSheet = EasyExcel.writerSheet(1, "sheet2").head(Person2.class).build();
excelWriter.write(list2,detailSheet);
//关闭流
excelWriter.finish();
```

##### 指定表头的导出

自定义表头

```java
@GetMapping("/export")
@ApiOperation(value = "测试导出",produces = "application/octet-stream")
public void export(HttpServletResponse response) throws IOException {
    //表头
    List<List<String>> heads = new ArrayList<>();
    heads.add(Arrays.asList("Message1"));
    heads.add(Arrays.asList("Message2"));
    heads.add(Arrays.asList("Message3"));
    heads.add(Arrays.asList("Message4"));
    List<Map> body = new ArrayList<>();

    for (int i = 0; i < 10; i++) {
        Map<String, Object> map = new LinkedHashMap<>();
        for (int j = 0; j < 4; j++) {
            map.put("Message"+(j+1),"内容"+j);
        }
        body.add(map);
    }

    List<Map> list = body;
    Map m = list.get(0);
    Iterator iterator = m.keySet().iterator();
    List<String> head = new ArrayList<>();
    while (iterator.hasNext()) {
        head.add(String.valueOf(iterator.next()));
    }
    List<List<Object>> data = list.stream().map(d -> {
        return head.stream().map(h -> {
            return d.get(h);
        }).collect(Collectors.toList());
    }).collect(Collectors.toList());
    response.setContentType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
    response.setCharacterEncoding("utf-8");
    String name = URLEncoder.encode("导出文件", "UTF-8");
    response.setHeader("Content-disposition", "attachment;filename=" + name + ".xlsx");
    EasyExcel.write(response.getOutputStream()).head(heads).sheet("sheet1").doWrite(data);

}
```

##### 填充数据的导出

excel格式

- map的填充

| message   | message1   | message2   |
| --------- | ---------- | ---------- |
| {message} | {message1} | {message2} |

```java
@PostMapping("/changeExcel")
@ApiOperation(value = "修改excel",produces = "application/octet-stream")
public void changeExcel(HttpServletResponse response){
    InputStream inputStream;
    try {
        ClassPathResource cpr = new ClassPathResource("测试修改map.xlsx");
        inputStream = cpr.getInputStream();
    } catch (IOException e) {
        throw new RuntimeException(e);
    }

    try {
        response.setContentType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        response.setCharacterEncoding("utf-8");
        String name = URLEncoder.encode("导出文件", "UTF-8");
        response.setHeader("Content-disposition", "attachment;filename=" + name + ".xlsx");

        Map<String, BigDecimal> map = new HashMap<>();
        map.put("message1",new BigDecimal(1));
        map.put("message2",new BigDecimal(2));
        map.put("message3",new BigDecimal(3));
        ExcelWriter excelWriter = EasyExcelFactory
            .write(response.getOutputStream()) //输出流
            .withTemplate(inputStream) //输入流
            .inMemory(true) //内存模式
            //                    .autoCloseStream(Boolean.FALSE)
            .build();
        //获取要填充的sheet
        WriteSheet writeSheet = EasyExcelFactory.writerSheet().build();
        excelWriter.fill(map, writeSheet);
        //关闭流
        excelWriter.finish();
    } catch (IOException e) {
        throw new RuntimeException(e);
    }
    return;
}
```

- list的填充

| message    | message1    | message2    |
| ---------- | ----------- | ----------- |
| {.message} | {.message1} | {.message2} |

```java
@PostMapping("/changeExcel")
@ApiOperation(value = "修改excel",produces = "application/octet-stream")
public void changeExcel(HttpServletResponse response){
    InputStream inputStream;
    try {
        ClassPathResource cpr = new ClassPathResource("测试修改list.xlsx");
        inputStream = cpr.getInputStream();
    } catch (IOException e) {
        throw new RuntimeException(e);
    }

    try {
        response.setContentType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        response.setCharacterEncoding("utf-8");
        String name = URLEncoder.encode("导出文件", "UTF-8");
        response.setHeader("Content-disposition", "attachment;filename=" + name + ".xlsx");

        List<Map<String,BigDecimal>> list = new ArrayList<>();
        Map<String, BigDecimal> map1 = new HashMap<>();
        map1.put("message1",new BigDecimal(1));
        map1.put("message2",new BigDecimal(1));
        map1.put("message3",new BigDecimal(1));
        Map<String,BigDecimal> map2 = new HashMap<>();
        map2.put("message1",new BigDecimal(2));
        map2.put("message2",new BigDecimal(2));
        map2.put("message3",new BigDecimal(2));
        list.add(map1);
        list.add(map2);

        ExcelWriter excelWriter = EasyExcelFactory
            .write(response.getOutputStream()) //输出流
            .withTemplate(inputStream) //输入流
            .inMemory(true) //内存模式
            .build();
        //获取Sheet(用于后面公式刷新)
        WriteSheet writeSheet = EasyExcelFactory.writerSheet().build();
        //填充数据
        excelWriter.fill(list, writeSheet);
        Workbook workbook = excelWriter.writeContext().writeWorkbookHolder().getWorkbook();
        //此设置是在excel打开的时候自动做一次计算
        workbook.setForceFormulaRecalculation(true);

        //            //调用evaluateAll对Excel的所有公式做一次计算,在inMemory为false时，evaluateAll无效
        //            workbook.getCreationHelper().createFormulaEvaluator().evaluateAll();
        //关闭流
        excelWriter.finish();
    } catch (IOException e) {
        throw new RuntimeException(e);
    }
}
```

注：此方式涉及到公式计算，处理方式，第一种是直接数据填充后做一次计算，第二种是不做计算让导出的文件在打开的时候做计算


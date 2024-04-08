---
title: java基础POI引用
date: 2020-1-26 8:34:36
category: java基础相关
tag: java
top_img: false
---

### 常规POI使用

#### 依赖

```xml
<dependency>
    <groupId>org.apache.poi</groupId>
    <artifactId>poi</artifactId>
    <version>4.1.0</version>
</dependency>
<dependency>
    <groupId>org.apache.poi</groupId>
    <artifactId>poi-ooxml</artifactId>
    <version>4.1.0</version>
</dependency>
```

#### 导入

##### controller

```java
@PostMapping("import")
@ApiOperation(value = "批量导入", notes = "批量导入")
@OperLog(operModul = "批量导入",operType = OperType.INSERT,operDesc = "批量导入")
public ReturnDto importExcel(MultipartFile file) {
    return itemService.importExcel(file);
}
```

##### service

```java
public void importExcel(MultipartFile file) {
    try {
        String fileExt = FileUtil.extName(file.getOriginalFilename());
        if (fileExt == null || (!"xls".equals(fileExt.toLowerCase()) && !"xlsx".equals(fileExt.toLowerCase()))) {
            return new ReturnDto(MessageUtils.get("110009"), "406", null);
        }
        Workbook workbook = null;
        try {
            workbook = new HSSFWorkbook(file.getInputStream());//2003版本
        } catch (Exception ex) {
            workbook = new XSSFWorkbook(file.getInputStream());//2007版本
        }
        Sheet sheet = workbook.getSheetAt(0);

        for (int i = 1; i < sheet.getPhysicalNumberOfRows(); i++) {//循环sheet中的row
            Row row = sheet.getRow(i);
            ControlItemAddVm itemAddVm = new ControlItemAddVm();
            //获取第一个参数放入对象
            itemAddVm.setItemCode(row.getCell(0).toString());
            //做数据存入数据库
            save(itemAddVm);
        }
    } catch (Exception e){
        log.error("importExcel",e);
    }
}
```

#### 导出

##### controller

```java
@ApiOperation(value = "文件导出导出",produces = "application/octet-stream")
@GetMapping(value = "/export",produces="application/vnd.ms-excel;charset=UTF-8")
@OperLog(operModul = "文件导出",operType = OperType.QUERY,operDesc = "文件导出")
public ReturnDto export(HttpServletResponse response) {
    service.queryItemForExport(response);
    return ReturnDto.ok();
}
```

##### service

```java
/**
* FQC异常单信息导出
* @param response
*/
public void queryItemForExport(HttpServletResponse response) {

    OutFileEntity outFileEntity = new OutFileEntity();
    //设置文件名称
    String fileName = "异常信息" + ".xls";// 设置要导出的文件的名字
    outFileEntity.setFileName(fileName);
    //设置表名
    outFileEntity.setSheetName("异常信息");
    //设置第一行表头,英文
    String[] filedHeaders = {"fqcNo","inWarehouseNo","aql","materialNo","materialName","version","lotNum","qty","samplingPlan","inspectDate","result"};
    outFileEntity.setFiledHeaders(filedHeaders);
    //设置第二行表头，中文
    String[] filedHeadersNotes = {"单号","入库单号","AQL","料号","物料名称","版本","批号","不良数量","抽样方案","点检日期","判定结果"};
    outFileEntity.setFiledHeadersNotes(filedHeadersNotes);

    //查询出需要导出的数据
    List<FqcListDto> fqcListDtos = fqcMainMapper.queryItemForExport();
    //创建报表体
    List<List<String>> fileBody = new ArrayList<>();
    for (FqcListDto fqcListDto : fqcListDtos) {
        List<String> bodyValue = new ArrayList<>();
        bodyValue.add(fqcListDto.getFqcNo());
        bodyValue.add(fqcListDto.getInWarehouseNo());
        bodyValue.add(fqcListDto.getAql());
        bodyValue.add(fqcListDto.getMaterialNo());
        bodyValue.add(fqcListDto.getMaterialName());
        bodyValue.add(fqcListDto.getVersion());
        bodyValue.add(fqcListDto.getLotNum());
        bodyValue.add(fqcListDto.getQty());
        bodyValue.add(fqcListDto.getSamplingPlan());
        bodyValue.add(String.valueOf(fqcListDto.getInspectDate()));
        bodyValue.add(fqcListDto.getResult());
        //将数据添加到报表体中
        fileBody.add(bodyValue);
    }
    outFileEntity.setFiledBody(fileBody);

    //导出文件
    ExcelExportUtil.outFile(response,outFileEntity);
}
```

##### 工具类

设置excel格式，可自行调整

```java
public class ExcelExportUtil {

    static final short borderpx = 1;

    /**
     * 设置单元格
     * @author LiuYang
     * @param cellStyle 工作簿
     * @param border border样式
     */
    public static void setBorderStyle(HSSFCellStyle cellStyle, short border) {
        cellStyle.setBorderBottom(BorderStyle.valueOf(border)); // 下边框
        cellStyle.setBorderLeft(BorderStyle.valueOf(border));// 左边框
        cellStyle.setBorderTop(BorderStyle.valueOf(border));// 上边框
        cellStyle.setBorderRight(BorderStyle.valueOf(border));// 右边框
    }

    /**
     * 设置字体样式
     * @param workbook 工作簿
     * @param name 字体类型
     * @param height 字体大小
     * @return HSSFFont
     */
    public static HSSFFont setFontStyle(HSSFWorkbook workbook, String name, short height) {
        HSSFFont font = workbook.createFont();
        font.setFontHeightInPoints(height);
        font.setFontName(name);
        return font;
    }

    public static void outFile(HttpServletResponse response, OutFileEntity outFileEntity){

        //创建文件对象
        HSSFWorkbook workbook = new HSSFWorkbook();
        //创建sheet，设置sheet表名
        HSSFSheet sheet = workbook.createSheet(outFileEntity.getSheetName());

        //设置表头单元格格式
        HSSFCellStyle cellStyleHeader = workbook.createCellStyle();
        //设置边框
        short borderpx = 1;
        setBorderStyle(cellStyleHeader,borderpx);  //设置边框
        cellStyleHeader.setFont(setFontStyle(workbook, "黑体", (short) 12));  //设置字体大小与格式
        cellStyleHeader.setAlignment(HorizontalAlignment.CENTER_SELECTION);//左右居中
        cellStyleHeader.setVerticalAlignment(VerticalAlignment.CENTER);//上下居中

        //设置表体单元格格式
        HSSFCellStyle cellStyleBody = workbook.createCellStyle();
        //设置边框
        setBorderStyle(cellStyleBody,borderpx);   //设置边框
        cellStyleBody.setFont(setFontStyle(workbook, "宋体", (short) 12));   //设置字体大小与格式
        cellStyleBody.setAlignment(HorizontalAlignment.CENTER_SELECTION);//左右居中
        cellStyleBody.setVerticalAlignment(VerticalAlignment.CENTER);//上下居中
        CreationHelper createHelper=workbook.getCreationHelper();
        cellStyleBody.setDataFormat(createHelper.createDataFormat().getFormat("yyy-mm-dd hh:mm:ss"));

        //创建第一行，即表头
        HSSFRow filedRow = sheet.createRow(0);
        // 在excel表中添加表头
        for (int i = 0; i < outFileEntity.getFiledHeaders().length; i++) {
            //创建单元格
            HSSFCell cellHeader = filedRow.createCell(i);
            //设置单元格格式
            cellHeader.setCellStyle(cellStyleHeader);
            //单元格传入数据
            HSSFRichTextString text = new HSSFRichTextString(outFileEntity.getFiledHeaders()[i]);
            cellHeader.setCellValue(text);
        }
        //创建第二行，即表头注释
        HSSFRow row = sheet.createRow(1);
        // 在excel表中添加表头
        for (int i = 0; i < outFileEntity.getFiledHeadersNotes().length; i++) {
            //创建单元格
            HSSFCell cellHeader = row.createCell(i);
            //设置单元格格式
            cellHeader.setCellStyle(cellStyleHeader);
            //单元格传入数据
            HSSFRichTextString text = new HSSFRichTextString(outFileEntity.getFiledHeadersNotes()[i]);
            cellHeader.setCellValue(text);
        }

        //锁定表头
        sheet.createFreezePane(0,2,0,2);

        //文件体添加数据
        HSSFRow row1;
        for (int i = 0; i < outFileEntity.getFiledBody().size(); i++) {
            //创建行
            row1 = sheet.createRow(2+i);
            for (int j = 0; j < outFileEntity.getFiledBody().get(i).size(); j++) {
                //创建单元格
                HSSFCell cellBodyrow = row1.createCell(j);
                //设置单元格格式
                cellBodyrow.setCellStyle(cellStyleBody);
                //单元格传入数据
                if(outFileEntity.getFiledBody().get(i).get(j) == null || "".equals(outFileEntity.getFiledBody().get(i).get(j))){
                    cellBodyrow.setCellValue("");
                }else{
                    cellBodyrow.setCellValue(outFileEntity.getFiledBody().get(i).get(j));
                }
            }
        }

        //设置自适应列宽
        for (int i = 0, isize = outFileEntity.getFiledHeaders().length; i < isize; i++) {
            sheet.autoSizeColumn(i);
        }

        //输出文件
        response.setContentType("application/vnd.ms-excel;charset=utf-8");
        try {
            response.setHeader("Content-Disposition",
                    "attachment;filename=" + java.net.URLEncoder.encode(outFileEntity.getFileName(), "UTF-8"));
            response.flushBuffer();
            workbook.write(response.getOutputStream());
            workbook.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

}
```

### Eazypoi使用

#### Eazypoi简单表格的使用

##### 导入

- 依赖

```XML
<dependency>
    <groupId>cn.afterturn</groupId>
    <artifactId>easypoi-spring-boot-starter</artifactId>
    <version>4.1.2</version>
</dependency>
```

- 实体类

```java
@Data
public class TestEntity {

    @Excel(name = "第一个字段")
    private String strOne;
    @Excel(name = "第二个字段")
    private String strTwo;

    @Override
    public String toString() {
        return "TestEntity{" +
                "strOne='" + strOne + '\'' +
                ", strTwo='" + strTwo + '\'' +
                '}';
    }
}
```

- controller

```java
@PostMapping("fileImport")
public String fileImport(MultipartFile file) throws Exception {
    demoService.fileImport(file);
    return "";
}
```

- 操作类

```java
public void fileImport(MultipartFile file) throws Exception {
    ImportParams params = new ImportParams();
    //设置表头行数，表头为@Excel注解上的name
    //申明，这里的行数是指这个@Excel注解上的name占excel的行数，如果有英文表头，则直接将英文表头放入标题中行数中
    params.setHeadRows(1);
    //设置标题行数
    params.setTitleRows(0);
    List<TestEntity> result = ExcelImportUtil.importExcel(file.getInputStream(),TestEntity.class, params);
    for (TestEntity entity:result) {
        System.out.println(entity.toString());
    }
}
```

##### 导出

- 依赖

```xml
<dependency>
    <groupId>cn.afterturn</groupId>
    <artifactId>easypoi-spring-boot-starter</artifactId>
    <version>4.1.2</version>
</dependency>
```

- 实体类

```java
//实体类字段上加@Excel设置表头
@Excel(name = "数量",width = 25)
private String count;
```

注：@Excel中有可以设置的，常用的有

```java
//{"显示值_原来值","显示值_原来值"}
@Excel(name = "性别",replace = {"女_0","男_1"}) 
```

```java
@Excel(name = "创建时间",exportFormat="yyyy-MM-dd HH:mm:ss",importFormat = "yyyy-MM-dd HH:mm:ss")
```

- controller

```java
@PostMapping("fileOutput")
@ApiOperation(value = "文件导出",produces = "application/octet-stream")
public ReturnDto fileOutput(HttpServletResponse httpServletResponse){
    demoService.fileOutput(httpServletResponse);
    return ReturnDto.ok();
}
```

- 操作类

```java
public void fileOutput(HttpServletResponse httpServletResponse){
    try {
        // 设置响应输出的头类型
        httpServletResponse.setHeader("content-Type", "application/vnd.ms-excel;charset=utf-8");
        // 下载文件的默认名称
        httpServletResponse.setHeader("Content-Disposition", "attachment;filename=Test.xls");
        //这里可设置sheet的信息
        ExportParams exportParams = new ExportParams();
        //设置内容， Dto.class为实体类，list为查询出来的数据
        Workbook workbook = ExcelExportUtil.exportExcel(exportParams, Dto.class, list);
        //将workbook写入响应流
        workbook.write(httpServletResponse.getOutputStream());
    } catch (Exception e) {
        log.error(e.getMessage(), e);
        throw new CloudVisualException("文件导出错误，请重试");
    }
}
```

#### Eazypoi复杂表格使用

##### 导出

- 依赖

```xml
<dependency>
    <groupId>cn.afterturn</groupId>
    <artifactId>easypoi-spring-boot-starter</artifactId>
    <version>4.1.2</version>
</dependency>
```

- 操作类

```java
//创建全表list
List<ExcelExportEntity> colList = new ArrayList<ExcelExportEntity>();
colList.add(new ExcelExportEntity("第一列", "first"));
colList.add(new ExcelExportEntity("第二列", "second"));
colList.add(new ExcelExportEntity("第三列", "third"));
//设置合并单月格
colList.stream().forEach(excelExportEntity -> excelExportEntity.setNeedMerge(true));

ExcelExportEntity detailGroup = new ExcelExportEntity("明细", "detail");
List<ExcelExportEntity> detailGroupList = new ArrayList<ExcelExportEntity>();
detailGroupList.add(new ExcelExportEntity("明细第一列", "detailFirst"));
detailGroupList.add(new ExcelExportEntity("明细第二列", "detailSecond"));
detailGroupList.add(new ExcelExportEntity("明细第三列", "detailThird"));
detailGroup.setList(detailGroupList);
colList.add(detailGroup);

List<Map<String, Object>> list = new ArrayList<Map<String, Object>>();
//查询主信息
List<MainDto> mainDtos = mapper.selectAll(mainVm);
//遍历每一个主信息，查询明细
for (MainDto mainDto:mainDtos) {

    Map<String, Object> valMap = new HashMap<String, Object>();
    valMap.put("first", mainDto.getFirst());
    valMap.put("second", mainDto.getSecond());
    valMap.put("third", mainDto.getThird());

    //查询明细信息
    List<DetailDto> detailDtos = detailMapper.selectByMainId(mainDto.getMainId());

    List<Map<String, Object>> deliList = new ArrayList<Map<String, Object>>();
    for (DetailDto detailDto:detailDtos) {
        Map<String, Object> deliValMap = new HashMap<String, Object>();
        deliValMap.put("detailFirst", detailDto.getDetailFirst());
        deliValMap.put("detailSecond", detailDto.getDetailSecond());
        deliValMap.put("detailThird", detailDto.getDetailThird());
        deliList.add(deliValMap);
    }
    valMap.put("detail", deliList);
    list.add(valMap);
}

//生成excel文件并导出
try {
    // 设置响应输出的头类型
    httpServletResponse.setHeader("content-Type", "application/vnd.ms-excel;charset=utf-8");
    //设置返回格式
    httpServletResponse.setContentType("application/vnd.ms-excel");
    httpServletResponse.setCharacterEncoding("UTF-8");
    // 下载文件的默认名称
    httpServletResponse.setHeader("Content-Disposition", "attachment;filename=" + URLEncoder.encode("XX表.xlsx", "utf-8"));
    //这里可设置sheet的信息
    ExportParams exportParams = new ExportParams();
    //设置表体单元格格式
    Workbook workbook = ExcelExportUtil.exportExcel(exportParams, colList, list);
    workbook.write(httpServletResponse.getOutputStream());

} catch (Exception e) {
    log.error(e.getMessage(), e);
    throw new CloudmesException("文件导出错误，请重试");
}
```




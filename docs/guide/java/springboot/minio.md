---
title: minio
date: 2024-03-14 8:48:16
---

##### 下载minio并启动 [官方文档](https://www.minio.org.cn/docs/minio/windows/index.html)

- 启动服务

```shell
.\minio.exe server .\data\ --console-address :9090
```

- Access keys创建访问密钥

##### 集成

- maven

```xml
<dependency>
    <groupId>io.minio</groupId>
    <artifactId>minio</artifactId>
    <version>7.1.0</version>
</dependency>
```

- Application.yaml

```yaml
minio:
  endpoint: http://127.0.0.1:9000
  accessKey: Y3bLqP0y50Vg0NRt2IRM
  secretKey: DrOYveBqP2uihqW8H86ht8QqkmG6ejG0ECbVPawS
  bucket: demo
```

- Controller

```java
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.net.URLEncoder;

@RestController
@RequestMapping("test")
public class TestDemoController {

    @Autowired
    private MinioTemplateService minioTemplateService;

    @PostMapping("createBucket")
    @ApiOperation(value = "创建bucket")
    public Object createBucket(@RequestParam("bucketname") String bucketname) {
        minioTemplateService.createBucket(bucketname);
        return "OK";
    }

    @PostMapping("uploadFile")
    @ApiOperation(value = "文件上传")
    public Object uploadFile(@RequestParam("bucketname") String bucketname,
                             @RequestParam("file") MultipartFile file) {
        minioTemplateService.uploadField(bucketname,file);
        return "OK";
    }

    @PostMapping("delFile")
    @ApiOperation(value = "删除文件")
    public Object delFile(@RequestParam("bucketname") String bucketname,
                          @RequestParam("fileUrl") String fileUrl) {
        minioTemplateService.delFile(bucketname,fileUrl);
        return "OK";
    }

    @PostMapping("downFile")
    @ApiOperation(value = "文件下载",produces = "application/octet-stream")
    public void downFile(@RequestParam("bucketname") String bucketname,
                         @RequestParam("fileUrl") String fileUrl, HttpServletResponse response) {
        File file = new File(fileUrl);
        String fileName = file.getName();
        InputStream inputStream = minioTemplateService.downFile(bucketname, fileUrl);
        try {
            response.setCharacterEncoding("UTF-8");
            response.setHeader("Content-Disposition", "attachment;filename=" + URLEncoder.encode(fileName, "utf-8"));
            byte[] buffer = new byte[1024];
            int bytesRead;
            while ((bytesRead = inputStream.read(buffer)) != -1) {
                response.getOutputStream().write(buffer, 0, bytesRead);
            }
            inputStream.close();
            response.getOutputStream().flush();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

}
```

- Service

```java
import io.minio.*;
import io.minio.errors.*;
import io.minio.messages.DeleteError;
import io.minio.messages.DeleteObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.time.LocalDate;
import java.util.LinkedList;
import java.util.List;

@Service
public class MinioTemplateService {

    @Autowired
    private MinioClient minioClient;

    //路径
    String prefix = "test/"+ LocalDate.now()+"/";


    public void createBucket(String bucketname) {
        try {
            if (!minioClient.bucketExists(BucketExistsArgs.builder().bucket(bucketname).build())) {
                minioClient.makeBucket(MakeBucketArgs.builder().bucket(bucketname).build());
            }
        } catch (ErrorResponseException e) {
            throw new RuntimeException(e);
        } catch (InsufficientDataException e) {
            throw new RuntimeException(e);
        } catch (InternalException e) {
            throw new RuntimeException(e);
        } catch (InvalidBucketNameException e) {
            throw new RuntimeException(e);
        } catch (InvalidKeyException e) {
            throw new RuntimeException(e);
        } catch (InvalidResponseException e) {
            throw new RuntimeException(e);
        } catch (IOException e) {
            throw new RuntimeException(e);
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException(e);
        } catch (ServerException e) {
            throw new RuntimeException(e);
        } catch (XmlParserException e) {
            throw new RuntimeException(e);
        } catch (RegionConflictException e) {
            throw new RuntimeException(e);
        }
    }

    public void uploadField(String bucketname, MultipartFile file){
        String fileUrl = prefix + file.getOriginalFilename();
        System.out.println(fileUrl);
        try {
            minioClient.putObject(
                    PutObjectArgs.builder()
                    .bucket(bucketname) //桶名称
                    .object(fileUrl) //地址 前缀+文件名
                    .stream(file.getInputStream(), file.getSize(), PutObjectArgs.MIN_MULTIPART_SIZE) //文件流
                    .contentType(file.getContentType())
                    .build());
        } catch (ErrorResponseException e) {
            throw new RuntimeException(e);
        } catch (InsufficientDataException e) {
            throw new RuntimeException(e);
        } catch (InternalException e) {
            throw new RuntimeException(e);
        } catch (InvalidBucketNameException e) {
            throw new RuntimeException(e);
        } catch (InvalidKeyException e) {
            throw new RuntimeException(e);
        } catch (InvalidResponseException e) {
            throw new RuntimeException(e);
        } catch (IOException e) {
            throw new RuntimeException(e);
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException(e);
        } catch (ServerException e) {
            throw new RuntimeException(e);
        } catch (XmlParserException e) {
            throw new RuntimeException(e);
        }
    }

    public InputStream downFile(String bucketname, String fileUrl) {
        try {
            return minioClient.getObject(GetObjectArgs.builder().bucket(bucketname).object(fileUrl).build());
        } catch (ErrorResponseException e) {
            throw new RuntimeException(e);
        } catch (InsufficientDataException e) {
            throw new RuntimeException(e);
        } catch (InternalException e) {
            throw new RuntimeException(e);
        } catch (InvalidBucketNameException e) {
            throw new RuntimeException(e);
        } catch (InvalidKeyException e) {
            throw new RuntimeException(e);
        } catch (InvalidResponseException e) {
            throw new RuntimeException(e);
        } catch (IOException e) {
            throw new RuntimeException(e);
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException(e);
        } catch (ServerException e) {
            throw new RuntimeException(e);
        } catch (XmlParserException e) {
            throw new RuntimeException(e);
        }
    }

    public void delFile(String bucketname, String fileUrl) {
        List<DeleteObject> objects = new LinkedList<>();
        objects.add(new DeleteObject(fileUrl));
        Iterable<Result<DeleteError>> results = minioClient.removeObjects(RemoveObjectsArgs.builder()
                .bucket(bucketname).objects(objects).build());
        for (Result<DeleteError> result : results) {
            DeleteError error = null;
            try {
                error = result.get();
                System.out.println("Error in deleting object " + error.objectName() + "; " + error.message());
            } catch (ErrorResponseException e) {
                throw new RuntimeException(e);
            } catch (InsufficientDataException e) {
                throw new RuntimeException(e);
            } catch (InternalException e) {
                throw new RuntimeException(e);
            } catch (InvalidBucketNameException e) {
                throw new RuntimeException(e);
            } catch (InvalidKeyException e) {
                throw new RuntimeException(e);
            } catch (InvalidResponseException e) {
                throw new RuntimeException(e);
            } catch (IOException e) {
                throw new RuntimeException(e);
            } catch (NoSuchAlgorithmException e) {
                throw new RuntimeException(e);
            } catch (ServerException e) {
                throw new RuntimeException(e);
            } catch (XmlParserException e) {
                throw new RuntimeException(e);
            }
        }
    }
}
```


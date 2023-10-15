---
title: Mybatis流式查询
date: 2023-02-13 10:20:27
---



- 使用Mybatis的Cursor
- 代码

```java
import org.apache.ibatis.cursor.Cursor;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.support.TransactionTemplate;

import javax.annotation.Resource;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.StreamSupport;

@Service
public class DemoService {

    @Autowired
    private DemoMapper demoMapper;
    @Autowired
    private SqlSessionFactory sqlSessionFactory;
    @Resource
    PlatformTransactionManager platformTransactionManager;

    public List<Demo> getDataFromMysql() {

        List<Demo> demos = new ArrayList<>();

        //第一种方式(sqlseesion方式)
        SqlSession sqlSession = sqlSessionFactory.openSession();  // 1
        try (Cursor<Demo> cursor = sqlSession.getMapper(DemoMapper.class).getDataFromMysql(2);){
            StreamSupport.stream(cursor.spliterator(), true).forEach(
                    demo -> {
                        demos.add(demo);
                    }
            );
        } catch (Exception e) {
            throw new RuntimeException(e);
        }

        ////第二种方式(spring事务管理器方式)
        //TransactionTemplate transactionTemplate = new TransactionTemplate(platformTransactionManager);
        //transactionTemplate.execute(status -> {               // 2
        //    try (Cursor<Demo> cursor = demoMapper.getDataFromMysql(2)) {
        //        StreamSupport.stream(cursor.spliterator(), true).forEach(
        //                demo -> {
        //                    demos.add(demo);
        //                }
        //        );
        //    } catch (IOException e) {
        //        e.printStackTrace();
        //    }
        //    return null;
        //});
        //
        ////第三种 @Transactional(此方法加上@Transactional)
        //try (Cursor<Demo> cursor = demoMapper.getDataFromMysql(2)) {
        //    StreamSupport.stream(cursor.spliterator(), true).forEach(
        //            demo -> {
        //                demos.add(demo);
        //            }
        //    );
        //} catch (IOException e) {
        //    e.printStackTrace();
        //}

        return demos;
    }
}
```


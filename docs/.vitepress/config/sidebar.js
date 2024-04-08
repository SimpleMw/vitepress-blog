//sidebar.js
export default {
    sidebar: {
        '/guide/java': [
            {
                text: '数据库',
                collapsed: true,
                items: [
                    {
                        text: 'Oracle',
                        collapsed: true,
                        items: [
                            {
                                "text": 'Oracle-触发器',
                                "link": '/guide/java/database/oracle/Oracle-触发器.md'
                            },
                            {
                                "text": 'Oracle-数据库学习',
                                "link": '/guide/java/database/oracle/Oracle-数据库学习.md'
                            },
                        ],
                    },
                    {
                        text: 'Mysql',
                        collapsed: true,
                        items: [
                            {
                                "text": 'mysql-数据库连接',
                                "link": '/guide/java/database/mysql/mysql-数据库连接.md'
                            },
                            {
                                "text": 'mysql-mysql8配置',
                                "link": '/guide/java/database/mysql/mysql-mysql8配置.md'
                            },
                            {
                                "text": 'mysql-mysql索引',
                                "link": '/guide/java/database/mysql/mysql-mysql索引.md'
                            },
                            {
                                "text": 'mysql-mysql小点杂',
                                "link": '/guide/java/database/mysql/mysql-mysql小点杂.md'
                            },
                            {
                                "text": 'mysql-lock',
                                "link": '/guide/java/database/mysql/mysql-lock.md'
                            },
                        ],
                    },
                    {
                        text: 'Sqlserver',
                        collapsed: true,
                        items: [
                        ],
                    },
                ],
            },
            {
                text: 'java基础',
                collapsed: true,
                items: [
                    {
                        "text": 'GC垃圾回收思想',
                        "link": '/guide/java/javabasic/GC垃圾回收思想.md'
                    },
                    {
                        "text": 'Http请求',
                        "link": '/guide/java/javabasic/Http请求.md'
                    },
                    {
                        "text": 'IO流',
                        "link": '/guide/java/javabasic/IO流.md'
                    },
                    {
                        "text": 'JFrame',
                        "link": '/guide/java/javabasic/JFrame.md'
                    },
                    {
                        "text": "jvm",
                        "link": "/guide/java/javabasic/jvm.md"
                    },
                    {
                        "text": "jwt",
                        "link": "/guide/java/javabasic/jwt.md"
                    },
                    {
                        "text": "LocalDateTime",
                        "link": "/guide/java/javabasic/LocalDateTime.md"
                    },
                    {
                        "text": "lombok",
                        "link": "/guide/java/javabasic/lombok.md"
                    },
                    {
                        "text": "Poi",
                        "link": "/guide/java/javabasic/poi.md"
                    },
                    {
                        "text": "Easyexcel",
                        "link": "/guide/java/javabasic/poi-easyexcel.md"
                    },
                    {
                        "text": "web作用域",
                        "link": "/guide/java/javabasic/web作用域.md"
                    },
                    {
                        "text": "反射",
                        "link": "/guide/java/javabasic/反射.md"
                    },
                    {
                        "text": "基础小点杂",
                        "link": "/guide/java/javabasic/基础小点杂.md"
                    },
                    {
                        "text": "序列化和反序列化",
                        "link": "/guide/java/javabasic/序列化和反序列化.md"
                    },
                    {
                        "text": "数据类型",
                        "link": "/guide/java/javabasic/数据类型.md"
                    },
                    {
                        "text": "格式转换",
                        "link": "/guide/java/javabasic/格式转换.md"
                    },
                    {
                        "text": "正则表达式",
                        "link": "/guide/java/javabasic/正则表达式.md"
                    },
                    {
                        "text": "设计模式",
                        "link": "/guide/java/javabasic/设计模式.md"
                    },
                    {
                        "text": "锁",
                        "link": "/guide/java/javabasic/锁.md"
                    }
                ],
            },
            {
                text: 'Spring基础',
                collapsed: true,
                items: [
                    {
                        "text": "GET和POST",
                        "link": "/guide/java/springbasic/GET和POST.md"
                    },
                    {
                        "text": "IOC和AOP",
                        "link": "/guide/java/springbasic/IOC和AOP.md"
                    },
                    {
                        "text": "参数接收",
                        "link": "/guide/java/springbasic/参数接收.md"
                    },
                    {
                        "text": "异步任务",
                        "link": "/guide/java/springbasic/异步任务.md"
                    },
                    {
                        "text": "循环依赖",
                        "link": "/guide/java/springbasic/循环依赖.md"
                    },
                    {
                        "text": "抛出全局异常",
                        "link": "/guide/java/springbasic/抛出全局异常.md"
                    },
                    {
                        "text": "获取配置文件数据",
                        "link": "/guide/java/springbasic/获取配置文件数据.md"
                    }
                ],
            },
            {
                text: 'SpringBoot',
                collapsed: true,
                items: [
                    {
                        text: "mybatis",
                        collapsed: true,
                        items: [

                            {
                                "text": "mybatis",
                                "link": "/guide/java/SpringBoot/mybatis/mybatis.md"
                            },
                            {
                                "text": "mybatisplus",
                                "link": "/guide/java/SpringBoot/mybatis/mybatisplus.md"
                            },
                            {
                                "text": "mybatis流式查询",
                                "link": "/guide/java/SpringBoot/mybatis/mybatis流式查询.md"
                            },
                            {
                                "text": "mybatis流式查询导出成csv",
                                "link": "/guide/java/SpringBoot/mybatis/mybatis流式查询导出成csv.md"
                            },
                        ]
                    },
                    {
                        text: "swagger",
                        collapsed: true,
                        items: [
                            {
                                "text": "swagger",
                                "link": "/guide/java/SpringBoot/swagger/swagger.md"
                            },
                            {
                                "text": "swagger3",
                                "link": "/guide/java/SpringBoot/swagger/swagger3.md"
                            },]
                    },

                    {
                        text: "flowable",
                        collapsed: true,
                        items: [
                            {
                                "text": "Flowable",
                                "link": "/guide/java/SpringBoot/flowable/Flowable.md"
                            },
                            {
                                "text": "Flowable-new",
                                "link": "/guide/java/SpringBoot/flowable/Flowable-new.md"
                            },]
                    },

                    {
                        "text": "elasticsearch",
                        "link": "/guide/java/SpringBoot/elasticsearch.md"
                    },
                    {
                        "text": "maven",
                        "link": "/guide/java/SpringBoot/maven.md"
                    },
                    {
                        "text": "native",
                        "link": "/guide/java/SpringBoot/native.md"
                    },
                    {
                        "text": "security",
                        "link": "/guide/java/SpringBoot/security.md"
                    },
                    {
                        "text": "Promethus",
                        "link": "/guide/java/SpringBoot/Promethus.md"
                    },

                    {
                        "text": "validation",
                        "link": "/guide/java/SpringBoot/validation.md"
                    },
                    {
                        "text": "websocket",
                        "link": "/guide/java/SpringBoot/websocket.md"
                    },
                    {
                        "text": "webflux",
                        "link": "/guide/java/SpringBoot/webflux.md"
                    },
                    {
                        "text": "minio",
                        "link": "/guide/java/SpringBoot/minio.md"
                    },
                    {
                        "text": "缓存机制",
                        "link": "/guide/java/SpringBoot/缓存.md"
                    },
                    {
                        "text": "多数据源",
                        "link": "/guide/java/SpringBoot/多数据源.md"
                    },
                    {
                        "text": "日志配置",
                        "link": "/guide/java/SpringBoot/log.md"
                    },
                    {
                        "text": "重试机制",
                        "link": "/guide/java/SpringBoot/重试机制.md"
                    },
                ],
            },
            {
                text: 'SpringCloud',
                collapsed: true,
                items: [
                    {
                        text: 'Spring Cloud Netflix',
                        collapsed: true,
                        items: [
                            {
                                "text": 'Eureka',
                                "link": '/guide/java/SpringCloud/Spring Cloud Netflix/Eureka.md'
                            },
                            {
                                "text": 'Feign',
                                "link": '/guide/java/SpringCloud/Spring Cloud Netflix/Feign.md'
                            },
                            {
                                "text": 'Hystrix',
                                "link": '/guide/java/SpringCloud/Spring Cloud Netflix/Hystrix.md'
                            },
                            {
                                "text": 'Ribbon',
                                "link": '/guide/java/SpringCloud/Spring Cloud Netflix/Ribbon.md'
                            },
                        ],
                    },
                    {
                        text: 'Spring Cloud Alibaba',
                        collapsed: true,
                        items: [
                            {
                                "text": "Gateway",
                                "link": "/guide/java/SpringCloud/Spring Cloud Alibaba/Gateway.md"
                            },
                            {
                                "text": "Nacos",
                                "link": "/guide/java/SpringCloud/Spring Cloud Alibaba/Nacos.md"
                            },
                            {
                                "text": "Seata",
                                "link": "/guide/java/SpringCloud/Spring Cloud Alibaba/Seata.md"
                            }
                        ],
                    },
                    {
                        text: '消息中间件',
                        collapsed: true,
                        items: [
                            {
                                "text": "Kafka",
                                "link": "/guide/java/SpringCloud/消息中间件/Kafka.md"
                            },
                            {
                                "text": "RabbitMq",
                                "link": "/guide/java/SpringCloud/消息中间件/RabbitMq.md"
                            },
                            {
                                "text": "Disruptor",
                                "link": "/guide/java/SpringCloud/消息中间件/Disruptor.md"
                            },
                        ],
                    },
                    {
                        text: '分布式锁',
                        collapsed: true,
                        items: [
                            {
                                "text": "Redis分布式锁",
                                "link": "/guide/java/分布式锁/Redis分布式锁.md"
                            },
                            {
                                "text": "Zookeeper分布式锁",
                                "link": "/guide/java/分布式锁/Zookeeper分布式锁.md"
                            }
                        ],
                    },
                ],
            },
            {
                text: 'other',
                collapsed: true,
                items: [
                    {
                        text: 'Promethus',
                        link: '/guide/java/other/promethus.md'
                    },
                ]
            }
        ],
        '/guide/python': [
            {
                text: 'python基础',
                collapsed: false,
                items: [
                    {
                        "text": "python基础",
                        "link": "/guide/python/pythonbasic/python基础.md"
                    },
                ]
            }
        ]
    }
};
//sidebar.js
export default {
    sidebar: {
        '/guide':
            [
                {
                    text: '数据库',
                    collapsed: true,
                    items: [
                        {
                            text: 'Oracle',
                            collapsed: true,
                            items: [
                                {
                                    text: 'Oracle-触发器',
                                    link: '/guide/database/oracle/Oracle-触发器.md'
                                },
                                {
                                    text: 'Oracle-数据库学习',
                                    link: '/guide/database/oracle/Oracle-数据库学习.md'
                                },
                            ],
                        },
                        {
                            text: 'Mysql',
                            collapsed: true,
                            items: [
                                {
                                    text: 'mysql-数据库连接',
                                    link: '/guide/database/mysql/mysql-数据库连接.md'
                                },
                                {
                                    text: 'mysql-mysql8配置',
                                    link: '/guide/database/mysql/mysql-mysql8配置.md'
                                },
                                {
                                    text: 'mysql-mysql索引',
                                    link: '/guide/database/mysql/mysql-mysql索引.md'
                                },
                                {
                                    text: 'mysql-mysql小点杂',
                                    link: '/guide/database/mysql/mysql-mysql小点杂.md'
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
                            text: 'GC垃圾回收思想',
                            link: '/guide/javabasic/GC垃圾回收思想.md'
                        },
                        {
                            text: 'Http请求',
                            link: '/guide/javabasic/Http请求.md'
                        },
                        {
                            text: 'IO流',
                            link: '/guide/javabasic/IO流.md'
                        },
                        {
                            text: 'JFrame',
                            link: '/guide/javabasic/JFrame.md'
                        },
                        {
                            "text": "jvm",
                            "link": "/guide/javabasic/jvm.md"
                        },
                        {
                            "text": "jwt",
                            "link": "/guide/javabasic/jwt.md"
                        },
                        {
                            "text": "LocalDateTime",
                            "link": "/guide/javabasic/LocalDateTime.md"
                        },
                        {
                            "text": "lombok",
                            "link": "/guide/javabasic/lombok.md"
                        },
                        {
                            "text": "Poi",
                            "link": "/guide/javabasic/Poi.md"
                        },
                        {
                            "text": "python基础",
                            "link": "/guide/javabasic/python基础.md"
                        },
                        {
                            "text": "web作用域",
                            "link": "/guide/javabasic/web作用域.md"
                        },
                        {
                            "text": "反射",
                            "link": "/guide/javabasic/反射.md"
                        },
                        {
                            "text": "基础小点杂",
                            "link": "/guide/javabasic/基础小点杂.md"
                        },
                        {
                            "text": "序列化和反序列化",
                            "link": "/guide/javabasic/序列化和反序列化.md"
                        },
                        {
                            "text": "数据类型",
                            "link": "/guide/javabasic/数据类型.md"
                        },
                        {
                            "text": "格式转换",
                            "link": "/guide/javabasic/格式转换.md"
                        },
                        {
                            "text": "正则表达式",
                            "link": "/guide/javabasic/正则表达式.md"
                        },
                        {
                            "text": "设计模式",
                            "link": "/guide/javabasic/设计模式.md"
                        },
                        {
                            "text": "锁",
                            "link": "/guide/javabasic/锁.md"
                        }
                    ],
                },
                {
                    text: 'Spring基础',
                    collapsed: true,
                    items: [
                        {
                            "text": "GET和POST",
                            "link": "/guide/springbasic/GET和POST.md"
                        },
                        {
                            "text": "IOC和AOP",
                            "link": "/guide/springbasic/IOC和AOP.md"
                        },
                        {
                            "text": "参数接收",
                            "link": "/guide/springbasic/参数接收.md"
                        },
                        {
                            "text": "异步任务",
                            "link": "/guide/springbasic/异步任务.md"
                        },
                        {
                            "text": "循环依赖",
                            "link": "/guide/springbasic/循环依赖.md"
                        },
                        {
                            "text": "抛出全局异常",
                            "link": "/guide/springbasic/抛出全局异常.md"
                        },
                        {
                            "text": "获取配置文件数据",
                            "link": "/guide/springbasic/获取配置文件数据.md"
                        }
                    ],
                },
                {
                    text: 'SpringBoot',
                    collapsed: true,
                    items: [
                        {
                            "text": "elasticsearch",
                            "link": "/guide/SpringBoot/elasticsearch.md"
                        },
                        {
                            "text": "flowable",
                            "link": "/guide/SpringBoot/flowable.md"
                        },
                        {
                            "text": "maven",
                            "link": "/guide/SpringBoot/maven.md"
                        },
                        {
                            "text": "mybatis",
                            "link": "/guide/SpringBoot/mybatis.md"
                        },
                        {
                            "text": "mybatisplus",
                            "link": "/guide/SpringBoot/mybatisplus.md"
                        },
                        {
                            "text": "mybatis流式查询",
                            "link": "/guide/SpringBoot/mybatis流式查询.md"
                        },
                        {
                            "text": "native",
                            "link": "/guide/SpringBoot/native.md"
                        },
                        {
                            "text": "security",
                            "link": "/guide/SpringBoot/security.md"
                        },
                        {
                            "text": "Flowable-new",
                            "link": "/guide/SpringBoot/Flowable-new.md"
                        },
                        {
                            "text": "Promethus",
                            "link": "/guide/SpringBoot/Promethus.md"
                        },
                        {
                            "text": "swagger",
                            "link": "/guide/SpringBoot/swagger.md"
                        },
                        {
                            "text": "swagger3",
                            "link": "/guide/SpringBoot/swagger3.md"
                        },
                        {
                            "text": "validation",
                            "link": "/guide/SpringBoot/validation.md"
                        },
                        {
                            "text": "websocket",
                            "link": "/guide/SpringBoot/websocket.md"
                        },
                        {
                            "text": "多数据源",
                            "link": "/guide/SpringBoot/多数据源.md"
                        }
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
                                    text: 'Eureka',
                                    link: '/guide/SpringCloud/Spring Cloud Netflix/Eureka.md'
                                },
                                {
                                    text: 'Feign',
                                    link: '/guide/SpringCloud/Spring Cloud Netflix/Feign.md'
                                },
                                {
                                    text: 'Hystrix',
                                    link: '/guide/SpringCloud/Spring Cloud Netflix/Hystrix.md'
                                },
                                {
                                    text: 'Ribbon',
                                    link: '/guide/SpringCloud/Spring Cloud Netflix/Ribbon.md'
                                },
                            ],
                        },
                        {
                            text: 'Spring Cloud Alibaba',
                            collapsed: true,
                            items: [
                                {
                                    "text": "Gateway",
                                    "link": "/guide/SpringCloud/Spring Cloud Alibaba/Gateway.md"
                                },
                                {
                                    "text": "Nacos",
                                    "link": "/guide/SpringCloud/Spring Cloud Alibaba/Nacos.md"
                                },
                                {
                                    "text": "Seata",
                                    "link": "/guide/SpringCloud/Spring Cloud Alibaba/Seata.md"
                                }
                            ],
                        },
                        {
                            text: '消息中间件',
                            collapsed: true,
                            items: [
                                {
                                    "text": "Kafka",
                                    "link": "/guide/SpringCloud/消息中间件/Kafka.md"
                                },
                                {
                                    "text": "RabbitMq",
                                    "link": "/guide/SpringCloud/消息中间件/RabbitMq.md"
                                }
                            ],
                        },
                        {
                            text: '分布式锁',
                            collapsed: true,
                            items: [
                                {
                                    "text": "Redis分布式锁",
                                    "link": "/guide/分布式锁/Redis分布式锁.md"
                                },
                                {
                                    "text": "Zookeeper分布式锁",
                                    "link": "/guide/分布式锁/Zookeeper分布式锁.md"
                                }
                            ],
                        },
                    ],
                },
            ],
    }
};
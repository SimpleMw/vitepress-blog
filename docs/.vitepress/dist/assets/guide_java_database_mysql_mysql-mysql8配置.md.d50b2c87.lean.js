import{_ as e,C as t,o as c,c as r,H as a,w as p,Q as o,k as s,a as n}from"./chunks/framework.03c32d59.js";const k=JSON.parse('{"title":"mysql8 免安装配置","description":"","frontmatter":{"title":"mysql8 免安装配置","date":"2020-10-14T08:48:16.000Z"},"headers":[],"relativePath":"guide/java/database/mysql/mysql-mysql8配置.md","filePath":"guide/java/database/mysql/mysql-mysql8配置.md"}'),y={name:"guide/java/database/mysql/mysql-mysql8配置.md"},i=o("",2),E=s("ul",null,[s("li",null,[n("执行"),s("strong",null,'mysqld --defaults-file="D:\\uwork\\mysql\\mysql-8.0.19-winx64\\my.ini" --initialize-insecure')]),s("li",null,[n("安装服务后，"),s("strong",null,"net start mysql")])],-1),d=s("hr",null,null,-1),F=s("ul",null,[s("li",null,[s("p",null,"修改user密码"),s("p",null,[s("strong",null,"ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '新密码';")]),s("p",null,"刷新权限"),s("p",null,[s("strong",null,"flush privileges;")])]),s("li",null,[s("p",null,"退出重新使用新密码登录，大功告成")])],-1),u=s("hr",null,null,-1),m=o("",5),_=o("",7);function g(h,C,q,v,B,f){const l=t("font");return c(),r("div",null,[i,a(l,{color:"red"},{default:p(()=>[n("初始化失败")]),_:1}),E,d,a(l,{color:"red",size:"4"},{default:p(()=>[n("登录正常改密")]),_:1}),F,u,a(l,{color:"red",size:"4"},{default:p(()=>[n("密码输入错误解决")]),_:1}),m,a(l,{color:"red"},{default:p(()=>[n("创建用户")]),_:1}),_])}const w=e(y,[["render",g]]);export{k as __pageData,w as default};

import{_ as c,o as a,c as i,h as d,j as l,X as u,b as m,e as p,H as v}from"./chunks/framework.dd5a1521.js";const f={},h={class:"loading"};function g(r,t){return a(),i("div",h)}const x=c(f,[["render",g]]);const y={id:"xmind-container"},w={__name:"XmindViewer",props:{url:String},setup(r){const t=d(!0),o=r;return l(async()=>{const{XMindEmbedViewer:_}=await u(()=>import("./chunks/index.223215d0.js"),[]),e=new _({el:"#xmind-container"});e.setStyles({width:"100%",height:"100%"});const s=()=>{t.value=!1,e.removeEventListener("map-ready",s)};e.addEventListener("map-ready",s),fetch(o.url).then(n=>n.arrayBuffer()).then(n=>{e.load(n)}).catch(n=>{t.value=!1,console.log("加载xmind文件出错！"),e.removeEventListener("map-ready",s)})}),(_,e)=>(a(),i("div",y,[t.value?(a(),m(x,{key:0})):p("",!0)]))}},b=JSON.parse('{"title":"知识体系","description":"","frontmatter":{"title":"知识体系"},"headers":[],"relativePath":"guide/java/index.md","filePath":"guide/java/index.md"}'),E={name:"guide/java/index.md"},V=Object.assign(E,{setup(r){return(t,o)=>(a(),i("div",null,[v(w,{url:"../../public/xmind/springboot.xmind"})]))}});export{b as __pageData,V as default};

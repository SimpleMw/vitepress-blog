import{_ as c,o as a,c as o,h as d,j as l,V as u,b as m,e as p,H as v}from"./chunks/framework.03c32d59.js";const f={},h={class:"loading"};function g(r,s){return a(),o("div",h)}const x=c(f,[["render",g]]);const y={id:"xmind-container"},w={__name:"XmindViewer",props:{url:String},setup(r){const s=r,t=d(!0);return l(async()=>{const{XMindEmbedViewer:_}=await u(()=>import("./chunks/index.223215d0.js"),[]),e=new _({el:"#xmind-container"});e.setStyles({width:"100%",height:"100%"});const i=()=>{t.value=!1,e.removeEventListener("map-ready",i)};e.addEventListener("map-ready",i),fetch(s.url).then(n=>n.arrayBuffer()).then(n=>{e.load(n)}).catch(n=>{t.value=!1,console.log("加载xmind文件出错！"),e.removeEventListener("map-ready",i)})}),(_,e)=>(a(),o("div",y,[t.value?(a(),m(x,{key:0})):p("",!0)]))}},V=JSON.parse('{"title":"知识体系","description":"","frontmatter":{"title":"知识体系"},"headers":[],"relativePath":"guide/index.md","filePath":"guide/index.md"}'),E={name:"guide/index.md"},b=Object.assign(E,{setup(r){return(s,t)=>(a(),o("div",null,[v(w,{url:"../public/xmind/springboot.xmind"})]))}});export{V as __pageData,b as default};
import{_ as s,o as i,c as r,k as t,a as c,t as o}from"./chunks/framework.03c32d59.js";const d={data(){return{sentences:["To see the world,","things dangerous to come to,","to see behind walls,to draw closer,","things dangerous to come to,","to find each other and to feel,","that is the purpose of life."],currentSentenceIndex:0,currentCount:0,isDeleting:!1,typingSpeed:100,deletingSpeed:35}},mounted(){this.type()},methods:{type(){const e=this.sentences[this.currentSentenceIndex];this.isDeleting?this.currentCount>0?(this.currentCount--,setTimeout(this.type,this.deletingSpeed)):(this.isDeleting=!1,this.currentSentenceIndex++,this.currentSentenceIndex>=this.sentences.length&&(this.currentSentenceIndex=0),setTimeout(this.type,this.typingSpeed)):this.currentCount<e.length?(this.currentCount++,setTimeout(this.type,this.typingSpeed)):(this.isDeleting=!0,setTimeout(this.type,this.typingSpeed))}},computed:{displayedSentence(){const e=this.sentences[this.currentSentenceIndex];return this.isDeleting?e.slice(0,this.currentCount):e.slice(0,this.currentCount+1)}}},S=JSON.parse(`{"title":"","description":"","frontmatter":{"layout":"home","hero":{"name":"Simplemw's blog","tagline":"Buiding...","image":{"src":"./images/romantic.jpg","alt":"VitePress"},"actions":[{"theme":"brand","text":"Get Started","link":"/guide/"}]}},"headers":[],"relativePath":"index.md","filePath":"index.md"}`),a={class:"typewriter"},l=t("span",{class:"cursor"},null,-1);function u(e,h,p,_,g,n){return i(),r("div",null,[t("div",null,[t("div",a,[c(o(n.displayedSentence)+" ",1),l])])])}const f=s(d,[["render",u]]);export{S as __pageData,f as default};
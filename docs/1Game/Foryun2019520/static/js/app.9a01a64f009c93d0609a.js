webpackJsonp([1],{38:function(n,e,t){t(84);var r=t(23)(t(40),t(96),"data-v-bd26cd6c",null);n.exports=r.exports},40:function(n,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=t(24),o=t.n(r),i=t(45),s=t.n(i),a=t(44),l=t.n(a),u=t(93),c=t.n(u),d=t(92),f=t.n(d),m=t(81),h=(t.n(m),function(){for(var n=navigator.userAgent,e=["Android","iPhone","SymbianOS","Windows Phone","iPad","iPod"],t=!0,r=0;r<e.length;r++)if(n.indexOf(e[r])>0){t=!1;break}return t}()),g=function(n,e){var t=new Date(Date.parse(n.replace(/-/g,"/"))).getTime(),r=new Date(Date.parse(e.replace(/-/g,"/"))).getTime();return Math.abs(t-r)/864e5};document.title+=g((new Date).getFullYear()+"-"+((new Date).getMonth()+1)+"-"+(new Date).getDate(),"2009-10-09")+1+"天",e.default={name:"app",components:{StyleEditor:c.a,ResumeEditor:f.a},data:function(){return{interval:27,currentStyle:"",enableHtml:!1,fullStyle:["/*\n* Hi。宝贝！\n* 今天是520，我爱你，么么哒。\n* 我会努力让我们的生活，\n* 像下面这个页面一样，越来越多姿多彩。\n* 嗯。说起来手机和电脑还得区分一下。\n* 你现在用的是。。。"+(h?"电脑":"手机")+"\n*/\n\n/* 首先给所有元素加上过渡效果 */\n* {\n  -webkit-transition: all .3s;\n  transition: all .3s;\n}\n/* 白色背景太单调了。来点背景 */\nhtml {\n  color: rgb(222,222,222);\n  background: rgb(0,43,54); \n}\n/* 文字太近了 */\n.styleEditor {\n  padding: .5em;\n  border: 1px solid;\n  margin: .5em;\n  overflow: auto;\n  "+(h?"width: 48%;height: 96%;":"width: 96%;height: 50%;")+"\n  font-size: 14px;\n  line-height:1.5;\n}\n/* 这些代码颜色都一样。加点儿高亮区别来 */\n.token.selector{ color: rgb(133,153,0) }\n.token.property{ color: rgb(187,137,0) }\n.token.punctuation{ color: yellow }\n.token.function{ color: rgb(42,161,152) }\n.token.comment{ color: rgb(177,177,177) }\n/* 加个 3D 效果 */\nhtml{\n  -webkit-perspective: 1000px;\n          perspective: 1000px;\n}\n.styleEditor {\n  position: fixed; \n  "+(h?"left: 0;":"left:0;right:0;margin:auto;")+"\n  top: 0; \n  -webkit-transition: none; \n  transition: none;   \n  "+(h?"-webkit-transform: rotateY(10deg) translateZ(-100px) ;transform: rotateY(10deg) translateZ(-100px) ;":"-webkit-transform: rotateX(-10deg) translateZ(-100px) ;transform: rotateX(-10deg) translateZ(-100px) ;")+"\n  "+(h?"":"-webkit-transform-origin: 50% 0% 0;transform-origin: 50% 0% 0;")+"\n}\n\n/* 再来一张信纸 */\n.resumeEditor{\n  position: fixed; \n  "+(h?"right: 0;":"left:0;right:0;margin:auto;")+"\n  "+(h?"top: 0;":"bottom:2%;")+"\n  padding: .5em;  \n  "+(h?"margin: .5em;":"")+"\n  "+(h?"width: 48%;height: 96%;":"width: 96%;height: 50%;")+"\n  border: 1px solid;\n  color: #222;\n  overflow: auto;\n  font-size: 14px;\n  line-height:1.5;\n  "+(h?"-webkit-transform: rotateY(-10deg) translateZ(-100px) ;transform: rotateY(-10deg) translateZ(-100px) ;":"-webkit-transform: rotateX(10deg) translateZ(-100px) ;transform: rotateX(10deg) translateZ(-100px) ;")+"\n    "+(h?"":"-webkit-transform-origin: 50% 0% 0;transform-origin: 50% 0% 0;")+"\n  }\n/* 我开始写了 */\n\n\n","\n/* 是不是看着很简陋粗糙？\n * 因为这是 Markdown 格式的\n * 一种程序员用来写文档日志的简易语言\n * 翻译成 网页 就行了\n */\n",'\n/* 再加点样式 */\n.resumeEditor{\n  padding: 2em;\n  line-height:1.8;\n}\n.resumeEditor h2{\n  display: inline-block;\n  border-bottom: 1px solid;\n  margin: 1em 0 .5em;\n  font-size:18px;\n}\n.resumeEditor ul,.resumeEditor ol{\n  list-style: none;\n}\n.resumeEditor ul> li::before{\n  content: \'•\';\n  margin-right: .5em;\n}\n.resumeEditor ol {\n  counter-reset: section;\n}\n.resumeEditor ol li::before {\n  counter-increment: section;            \n  content: counters(section, ".") " ";  \n  margin-right: .5em;\n}\n.resumeEditor blockquote {\n  margin: 1em;\n  padding: .5em;\n  background: rgba(221,221,221,.5);\n}\n\n/* OK。完成！ */\n\n'],currentMarkdown:"",fullMarkdown:"锦 × 云\n----\n\n2009年10月09日。在一起。  \n已有 `"+(g((new Date).getFullYear()+"-"+((new Date).getMonth()+1)+"-"+(new Date).getDate(),"2009-10-09")+1)+"` 天\n\n一起去过的地方\n----\n\n* 厦门\n* 南京\n* 北京\n* 广州\n* 武汉\n* 深圳\n* ……\n\n一起看过的电影\n----\n\n1. 分歧者：异类觉醒\n2. 心花路放\n3. 星际穿越\n4. 横冲直撞好莱坞\n5. 我是路人甲\n6. 蚁人\n7. 饥饿游戏3\n8. 星球大战：原力觉醒\n9. 云中行走\n10. 魔兽\n11. 微微一笑很倾城\n12. 盗墓笔记\n13. 从你的全世界路过\n14. 奇异博士\n15. 比利*林恩的中场故事\n16. 神奇动物在哪里\n17. 你的名字\n18. 功夫瑜伽\n19. 乘风破浪\n20. 西游伏妖篇\n21. ……\n\n一起玩过的游戏\n----\n\n* 英雄联盟\n* 龙之谷\n* 刺激战场\n* QQ炫舞\n* 王者荣耀\n* 连连看\n* ……\n\n\n> 我希望与你携手，相伴一生，慢慢变老。\n> 云儿，我爱你。\n\n"}},created:function(){this.makeResume()},methods:{makeResume:function(){function n(){return e.apply(this,arguments)}var e=l()(s.a.mark(function n(){return s.a.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,this.progressivelyShowStyle(0);case 2:return n.next=4,this.progressivelyShowResume();case 4:return n.next=6,this.progressivelyShowStyle(1);case 6:return n.next=8,this.showHtml();case 8:return n.next=10,this.progressivelyShowStyle(2);case 10:case"end":return n.stop()}},n,this)}));return n}(),showHtml:function(){var n=this;return new o.a(function(e,t){n.enableHtml=!0,e()})},progressivelyShowStyle:function(n){var e=this;return new o.a(function(t,r){var o=e.interval,i=l()(s.a.mark(function e(){var r,a,l,u,c,d=this;return s.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(r=this.fullStyle[n]){e.next=3;break}return e.abrupt("return");case 3:a=this.fullStyle.filter(function(e,t){return t<=n}).map(function(n){return n.length}).reduce(function(n,e){return n+e},0),l=a-r.length,this.currentStyle.length<a?(u=this.currentStyle.length-l,c=r.substring(u,u+1)||" ",this.currentStyle+=c,"\n"===r.substring(u-1,u)&&this.$refs.styleEditor&&this.$nextTick(function(){d.$refs.styleEditor.goBottom()}),setTimeout(i,o)):t();case 6:case"end":return e.stop()}},e,this)})).bind(e);i()})},progressivelyShowResume:function(){var n=this;return new o.a(function(e,t){var r=n.fullMarkdown.length,o=n.interval;!function t(){if(n.currentMarkdown.length<r){n.currentMarkdown=n.fullMarkdown.substring(0,n.currentMarkdown.length+1);n.currentMarkdown[n.currentMarkdown.length-1];"\n"===n.currentMarkdown[n.currentMarkdown.length-2]&&n.$refs.resumeEditor&&n.$nextTick(function(){return n.$refs.resumeEditor.goBottom()}),setTimeout(t,o)}else e()}()})}}}},41:function(n,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=t(85),o=t.n(r);e.default={props:["markdown","enableHtml"],name:"ResumeEditor",computed:{result:function(){return this.enableHtml?o()(this.markdown):this.markdown}},methods:{goBottom:function(){this.$refs.container.scrollTop=1e5}}}},42:function(n,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=t(86),o=t.n(r);e.default={name:"Editor",props:["code"],computed:{highlightedCode:function(){return o.a.highlight(this.code,o.a.languages.css)},codeInStyleTag:function(){return"<style>"+this.code+"</style>"}},methods:{goBottom:function(){this.$refs.container.scrollTop=1e5}}}},43:function(n,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=t(39),o=t(38),i=t.n(o);new r.a({el:"#app",render:function(n){return n(i.a)}})},81:function(n,e){},82:function(n,e){},83:function(n,e){},84:function(n,e){},92:function(n,e,t){t(83);var r=t(23)(t(41),t(95),"data-v-3539023c",null);n.exports=r.exports},93:function(n,e,t){t(82);var r=t(23)(t(42),t(94),"data-v-23b5cc2c",null);n.exports=r.exports},94:function(n,e){n.exports={render:function(){var n=this,e=n.$createElement,t=n._self._c||e;return t("div",{ref:"container",staticClass:"styleEditor"},[t("div",{staticClass:"code",domProps:{innerHTML:n._s(n.codeInStyleTag)}}),n._v(" "),t("pre",{domProps:{innerHTML:n._s(n.highlightedCode)}})])},staticRenderFns:[]}},95:function(n,e){n.exports={render:function(){var n=this,e=n.$createElement,t=n._self._c||e;return t("div",{ref:"container",staticClass:"resumeEditor",class:{htmlMode:n.enableHtml}},[n.enableHtml?t("div",{domProps:{innerHTML:n._s(n.result)}}):t("pre",[n._v(n._s(n.result))])])},staticRenderFns:[]}},96:function(n,e){n.exports={render:function(){var n=this,e=n.$createElement,t=n._self._c||e;return t("div",{attrs:{id:"app"}},[t("StyleEditor",{ref:"styleEditor",attrs:{code:n.currentStyle}}),n._v(" "),t("ResumeEditor",{ref:"resumeEditor",attrs:{markdown:n.currentMarkdown,enableHtml:n.enableHtml}})],1)},staticRenderFns:[]}}},[43]);
(this["webpackJsonpimage-split"]=this["webpackJsonpimage-split"]||[]).push([[0],{43:function(e,t,a){e.exports=a(52)},48:function(e,t,a){},52:function(e,t,a){"use strict";a.r(t);var n=a(0),i=a.n(n),l=a(8),r=a.n(l),c=(a(48),a(36)),o=a(87),h=a(93),u=a(92),m=a(90),s=a(94),d=Object(o.a)((function(e){return{container:{maxWidth:300},button:{margin:e.spacing(1)},checkboxLabel:{lineHeight:"40px",verticalAlign:"middle"}}})),g=function(e){var t=document.createElement("div");return r.a.render(e,t),t.innerHTML};var w=function(){var e=d(),t=Object(n.useRef)(null),a=Object(n.useRef)(null),l=Object(n.useRef)(null),r=Object(n.useRef)(null),o=Object(n.useRef)(null),w=Object(n.useRef)(null),f=Object(n.useState)(!0),v=Object(c.a)(f,2),x=v[0],p=v[1];return i.a.createElement(m.a,{container:!0,classes:{root:e.container}},i.a.createElement(m.a,{item:!0,xs:6},"DPI:"),i.a.createElement(m.a,{item:!0,xs:6},i.a.createElement(h.a,{inputRef:l,defaultValue:"225",fullWidth:!0})),i.a.createElement(m.a,{item:!0,xs:6},"Width:"),i.a.createElement(m.a,{item:!0,xs:6},i.a.createElement(h.a,{inputRef:t,defaultValue:"auto",fullWidth:!0})),i.a.createElement(m.a,{item:!0,xs:6},"Height:"),i.a.createElement(m.a,{item:!0,xs:6},i.a.createElement(h.a,{inputRef:a,defaultValue:"auto",fullWidth:!0})),i.a.createElement(m.a,{item:!0,xs:6},"Rows:"),i.a.createElement(m.a,{item:!0,xs:6},i.a.createElement(h.a,{inputRef:r,defaultValue:"2",fullWidth:!0})),i.a.createElement(m.a,{item:!0,xs:6},"Cols:"),i.a.createElement(m.a,{item:!0,xs:6},i.a.createElement(h.a,{inputRef:o,defaultValue:"2",fullWidth:!0})),i.a.createElement(m.a,{item:!0,xs:6,classes:{root:e.checkboxLabel}},"Wrap Tiles In SVG:"),i.a.createElement(m.a,{item:!0,xs:6},i.a.createElement(s.a,{checked:x,onChange:function(e){return p(e.target.checked)}})),i.a.createElement(m.a,{item:!0,xs:12},i.a.createElement(u.a,{fullWidth:!0,classes:{root:e.button},variant:"contained",component:"label"},"Convert File",i.a.createElement("input",{type:"file",style:{display:"none"},ref:w,onChange:function(e){var n=parseInt(r.current.value)||2,c=parseInt(o.current.value)||2,h=parseInt(l.current.value)||225,u="auto"===t.current.value?void 0:parseInt(t.current.value),m="auto"===a.current.value?void 0:parseInt(a.current.value),s=e.target.files[0].name,d=new FileReader;d.onload=function(e){var t=document.createElement("img");t.onload=function(){console.log(t.width,t.height);var e=document.createElement("canvas");!u&&m&&(u=t.width/t.height*m),u&&!m&&(m=t.height/t.width*u),e.width=u?u/c:t.width/c,e.height=m?m/n:t.height/n;for(var a=e.getContext("2d"),l=t.width/c,r=t.height/n,o=[],d=0;d<n;d++)for(var f=0;f<c;f++)if(a.clearRect(0,0,e.width,e.height),a.drawImage(t,f*l,d*r,l,r,0,0,e.width,e.height),x){var v=g(i.a.createElement("svg",{width:e.width,height:e.height,viewBox:"0 0 "+e.width+" "+e.height,xmlns:"http://www.w3.org/2000/svg",xmlnsXlink:"http://www.w3.org/1999/xlink"},i.a.createElement("image",{imageRendering:"pixelated",x:0,y:0,width:e.width,height:e.height,xlinkHref:e.toDataURL()}))),p="data:image/svg+xml;base64,"+btoa(v);o.push(i.a.createElement("image",{key:"".concat(d,",").concat(f),imageRendering:"pixelated",x:f*e.width,y:d*e.height,width:e.width,height:e.height,xlinkHref:p}))}else o.push(i.a.createElement("image",{key:"".concat(d,",").concat(f),imageRendering:"pixelated",x:f*e.width,y:d*e.height,width:e.width,height:e.height,xlinkHref:e.toDataURL()}));!function(e,t){var a=t.type,n=t.filename,i=document.createElement("a"),l=new Blob([e],{type:a}),r=window.URL.createObjectURL(l);i.download=n,i.href=r,i.click()}(g(i.a.createElement("svg",{width:u?u/h+"in":t.width/h+"in",height:m?m/h+"in":t.height/h+"in",viewBox:"0 0 "+(u||t.width)+" "+(m||t.height),xmlns:"http://www.w3.org/2000/svg",xmlnsXlink:"http://www.w3.org/1999/xlink"},o)),{type:"image/svg+xml",filename:s+".svg"}),w.current.value=""},t.src=e.target.result},d.readAsDataURL(e.target.files[0])}}))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));r.a.render(i.a.createElement(i.a.StrictMode,null,i.a.createElement(w,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[43,1,2]]]);
//# sourceMappingURL=main.380e8778.chunk.js.map
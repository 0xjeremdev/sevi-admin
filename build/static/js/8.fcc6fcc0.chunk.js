(this["webpackJsonp@pick-bazar/admin"]=this["webpackJsonp@pick-bazar/admin"]||[]).push([[8],{141:function(e,a,t){"use strict";t.d(a,"b",(function(){return l})),t.d(a,"c",(function(){return o})),t.d(a,"a",(function(){return m}));var r=t(101),n=t(149),l=Object(r.b)(n.Grid,()=>({})),o=Object(r.b)(n.Row,()=>({margin:"0 -15px 30px",":last-child":{marginBottom:"0px"}})),m=Object(r.b)(n.Col,()=>({padding:"0 15px"}))},145:function(e,a,t){"use strict";t.d(a,"c",(function(){return u})),t.d(a,"b",(function(){return i})),t.d(a,"a",(function(){return s}));var r=t(72),n=t(61),l=t(0),o=t.n(l);var m=function(e,a){var t=Object(l.createContext)(e),n=Object(l.createContext)(()=>e);return[function(e){return Object(l.useContext)(t)[e]},function(){return Object(l.useContext)(n)},function({children:l}){var m=o.a.useReducer(a,e),c=Object(r.a)(m,2),u=c[0],i=c[1];return o.a.createElement(n.Provider,{value:i},o.a.createElement(t.Provider,{value:u},l))}]}({isOpen:!1,drawerComponent:null,data:null},(function(e,a){switch(a.type){case"OPEN_DRAWER":return Object(n.a)(Object(n.a)({},e),{},{isOpen:!0,drawerComponent:a.drawerComponent,data:a.data});case"CLOSE_DRAWER":return Object(n.a)(Object(n.a)({},e),{},{isOpen:!1,drawerComponent:null,data:null});default:return e}})),c=Object(r.a)(m,3),u=c[0],i=c[1],s=c[2]},149:function(e,a,t){"use strict";Object.defineProperty(a,"__esModule",{value:!0}),a.getColumnProps=a.Col=a.getRowProps=a.Row=a.Grid=void 0;var r=t(178);Object.defineProperty(a,"getRowProps",{enumerable:!0,get:function(){return r.getRowProps}});var n=t(180);Object.defineProperty(a,"getColumnProps",{enumerable:!0,get:function(){return n.getColumnProps}});var l=c(t(181)),o=c(r),m=c(n);function c(e){return e&&e.__esModule?e:{default:e}}a.Grid=l.default,a.Row=o.default,a.Col=m.default},150:function(e,a,t){"use strict";Object.defineProperty(a,"__esModule",{value:!0}),a.default=function(e){return l.default&&l.default[e]?l.default[e]:e};var r,n=t(179),l=(r=n)&&r.__esModule?r:{default:r}},151:function(e,a,t){"use strict";Object.defineProperty(a,"__esModule",{value:!0}),a.default=function(e,a,t){var r={};Object.keys(a).filter((function(a){return"children"===a||!e[a]})).forEach((function(e){return r[e]=a[e]}));var n=t.filter((function(e){return e})).join(" ");return Object.assign({},r,{className:n})}},161:function(e,a,t){"use strict";Object.defineProperty(a,"__esModule",{value:!0}),a.ViewportSizeType=a.ColumnSizeType=void 0;var r,n=t(36),l=(r=n)&&r.__esModule?r:{default:r};a.ColumnSizeType=l.default.oneOfType([l.default.number,l.default.bool]),a.ViewportSizeType=l.default.oneOf(["xs","sm","md","lg","xl"])},178:function(e,a,t){"use strict";Object.defineProperty(a,"__esModule",{value:!0}),a.getRowProps=s,a.default=d;var r=c(t(150)),n=c(t(0)),l=c(t(36)),o=c(t(151)),m=t(161);function c(e){return e&&e.__esModule?e:{default:e}}var u=["start","center","end","top","middle","bottom","around","between"],i={reverse:l.default.bool,start:m.ViewportSizeType,center:m.ViewportSizeType,end:m.ViewportSizeType,top:m.ViewportSizeType,middle:m.ViewportSizeType,bottom:m.ViewportSizeType,around:m.ViewportSizeType,between:m.ViewportSizeType,className:l.default.string,tagName:l.default.string,children:l.default.node};function s(e){return(0,o.default)(i,e,function(e){for(var a=[e.className,(0,r.default)("row")],t=0;t<u.length;++t){var n=u[t],l=e[n];l&&a.push((0,r.default)(n+"-"+l))}return e.reverse&&a.push((0,r.default)("reverse")),a}(e))}function d(e){return n.default.createElement(e.tagName||"div",s(e))}d.propTypes=i},179:function(e,a,t){},180:function(e,a,t){"use strict";Object.defineProperty(a,"__esModule",{value:!0}),a.getColumnProps=d,a.default=f;var r=c(t(0)),n=c(t(36)),l=c(t(151)),o=c(t(150)),m=t(161);function c(e){return e&&e.__esModule?e:{default:e}}var u={xs:m.ColumnSizeType,sm:m.ColumnSizeType,md:m.ColumnSizeType,lg:m.ColumnSizeType,xl:m.ColumnSizeType,xsOffset:n.default.number,smOffset:n.default.number,mdOffset:n.default.number,lgOffset:n.default.number,xlOffset:n.default.number,first:m.ViewportSizeType,last:m.ViewportSizeType,className:n.default.string,tagName:n.default.string,children:n.default.node},i={xs:"col-xs",sm:"col-sm",md:"col-md",lg:"col-lg",xl:"col-xl",xsOffset:"col-xs-offset",smOffset:"col-sm-offset",mdOffset:"col-md-offset",lgOffset:"col-lg-offset",xlOffset:"col-xl-offset"};function s(e){var a=[];return e.className&&a.push(e.className),e.first&&a.push((0,o.default)("first-"+e.first)),e.last&&a.push((0,o.default)("last-"+e.last)),Object.keys(e).filter((function(e){return i[e]})).map((function(a){return(0,o.default)("number"===typeof(t=e[a])&&isFinite(t)&&Math.floor(t)===t?i[a]+"-"+e[a]:i[a]);var t})).concat(a)}function d(e){return(0,l.default)(u,e,s(e))}function f(e){var a=e.tagName,t=function(e,a){var t={};for(var r in e)a.indexOf(r)>=0||Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t}(e,["tagName"]);return r.default.createElement(a||"div",d(t))}f.propTypes=u},181:function(e,a,t){"use strict";Object.defineProperty(a,"__esModule",{value:!0}),a.default=u;var r=m(t(0)),n=m(t(36)),l=m(t(151)),o=m(t(150));function m(e){return e&&e.__esModule?e:{default:e}}var c={fluid:n.default.bool,className:n.default.string,tagName:n.default.string,children:n.default.node};function u(e){var a=(0,o.default)(e.fluid?"container-fluid":"container"),t=[e.className,a];return r.default.createElement(e.tagName||"div",(0,l.default)(c,e,t))}u.propTypes=c},207:function(e,a,t){"use strict";t.d(a,"a",(function(){return l}));var r=t(0),n=t.n(r),l=({width:e="15.6",height:a="13"})=>n.a.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:e,height:a,viewBox:"0 0 15.6 13"},n.a.createElement("path",{"data-name":"Path 154",d:"M299.593,418.656l-3.148-4.494a.9.9,0,0,0-.572-.272.658.658,0,0,0-.573.272l-3.148,4.494h-3.435a.66.66,0,0,0-.716.677v.207l1.789,6.327a1.448,1.448,0,0,0,1.36,1.023h9.3a1.366,1.366,0,0,0,1.359-1.023l1.789-6.327v-.207a.659.659,0,0,0-.716-.677Zm-5.87,0,2.149-3,2.145,3Zm2.149,5.443a1.362,1.362,0,1,1,1.428-1.363,1.4,1.4,0,0,1-1.428,1.363Zm0,0",transform:"translate(-288 -413.89)",fill:"currentColor"}))},208:function(e,a,t){"use strict";t.d(a,"a",(function(){return l}));var r=t(0),n=t.n(r),l=({width:e="12.958",height:a="13"})=>n.a.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:e,height:a,viewBox:"0 0 12.958 13"},n.a.createElement("path",{"data-name":"Path 321",d:"M1.015,10.3,1,4.388a.4.4,0,0,1,.564-.373l5.379,2.3a.4.4,0,0,1,.246.371L7.2,12.594a.4.4,0,0,1-.564.373l-5.379-2.3A.4.4,0,0,1,1.015,10.3Zm12.323-5.63L8.375,6.816l.013,5.468,4.963-2.15-.013-5.468m.2-.713a.405.405,0,0,1,.405.4l.014,5.908a.4.4,0,0,1-.244.372L8.347,12.963a.4.4,0,0,1-.565-.37L7.768,6.684a.4.4,0,0,1,.244-.372l5.368-2.325a.4.4,0,0,1,.16-.034ZM7.44.626l-5.149,2.3L7.451,5.2,12.6,2.9,7.44.626m0-.626A.4.4,0,0,1,7.6.034l5.659,2.495a.4.4,0,0,1,0,.74L7.617,5.79a.4.4,0,0,1-.328,0L1.63,3.3a.4.4,0,0,1,0-.74L7.275.035A.4.4,0,0,1,7.439,0Z",transform:"translate(-1.001)",fill:"currentColor"}))},209:function(e,a,t){"use strict";t.d(a,"a",(function(){return l}));var r=t(0),n=t.n(r),l=({width:e="11.321",height:a="13"})=>n.a.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:e,height:a,viewBox:"0 0 11.321 13"},n.a.createElement("g",{"data-name":"Group 1087",transform:"translate(0)"},n.a.createElement("g",{"data-name":"Group 1086"},n.a.createElement("path",{"data-name":"Path 322",d:"M274.867.365A.733.733,0,0,0,274.234,0h-2.718V3.215h5Z",transform:"translate(-265.461)",fill:"currentColor"}),n.a.createElement("path",{"data-name":"Path 323",d:"M48.821,0H46.077a.733.733,0,0,0-.633.366L43.8,3.215h5.02V0Z",transform:"translate(-43.528)",fill:"currentColor"}),n.a.createElement("path",{"data-name":"Path 324",d:"M33.057,156.648v8.127a.9.9,0,0,0,.9.9h9.529a.9.9,0,0,0,.9-.9v-8.127Zm7.39,3.418-1.971,1.971a.38.38,0,0,1-.539,0l-.924-.924a.381.381,0,1,1,.539-.539l.654.654,1.7-1.7a.381.381,0,1,1,.539.539Z",transform:"translate(-33.057 -152.671)",fill:"currentColor"}))))},210:function(e,a,t){"use strict";t.d(a,"a",(function(){return l}));var r=t(0),n=t.n(r),l=({width:e="11.426",height:a="13"})=>n.a.createElement("svg",{"data-name":"Group 2930",xmlns:"http://www.w3.org/2000/svg",width:e,height:a,viewBox:"0 0 11.426 13"},n.a.createElement("g",null,n.a.createElement("path",{"data-name":"Path 3616",d:"M116.344,226.9a1.513,1.513,0,0,0-.27.027l-.982-1.113,1.958-2.219a1.526,1.526,0,0,0-.135-2.15l-2.839,3.218,0,0-.632.716h-.769l.386.439-.984,1.115a1.523,1.523,0,1,0,1.222,1.493,1.5,1.5,0,0,0-.085-.478l.862-.977.839.952a1.5,1.5,0,0,0-.093.5,1.523,1.523,0,1,0,1.523-1.523Zm-4.57,2.285a.762.762,0,1,1,.762-.762A.764.764,0,0,1,111.774,229.182Zm4.57,0a.762.762,0,1,1,.762-.762A.764.764,0,0,1,116.344,229.182Zm0,0",transform:"translate(-107.965 -216.944)",fill:"currentColor"}),n.a.createElement("path",{"data-name":"Path 3617",d:"M4.605,0V1.574H3.844V0H-2.25V7.668H2.884l.96-1.089v-1.2h.762v.335L6.632,3.425l.571.5A2.287,2.287,0,0,1,7.409,7.15l-.457.518H9.176V0ZM1.178,3.479A1.141,1.141,0,0,1,1.559,5.7v.8H.8V5.7A1.139,1.139,0,0,1,.035,4.621H.8a.381.381,0,1,0,.381-.381A1.141,1.141,0,0,1,.8,2.024v-.83h.762v.83A1.139,1.139,0,0,1,2.32,3.1H1.559a.381.381,0,1,0-.381.381ZM4.605,4.621H3.844V3.859h.762Zm0-1.523H3.844V2.336h.762Zm0,0",transform:"translate(2.25)",fill:"currentColor"})))},345:function(e,a,t){"use strict";t.r(a),t.d(a,"default",(function(){return A}));var r=t(0),n=t.n(r),l=t(61),o=t(101),m=Object(o.b)("div",()=>({display:"flex",backgroundColor:"#fff",cursor:"pointer",padding:"35px 20px",height:"100%"})),c=Object(o.b)("div",({$theme:e})=>({display:"flex",justifyContent:"center",alignItems:"center",width:"100px",color:e.colors.primary,marginRight:"10px"})),u=Object(o.b)("div",()=>({display:"flex",flexDirection:"column"})),i=Object(o.b)("h3",({$theme:e})=>Object(l.a)(Object(l.a)({},e.typography.fontBold24),{},{color:e.colors.primary,margin:"0 0 5px"})),s=Object(o.b)("span",({$theme:e})=>Object(l.a)(Object(l.a)({},e.typography.font14),{},{color:e.colors.textDark,margin:"0"}));function d({icon:e,title:a,subtitle:t,onClick:r}){return n.a.createElement(m,{onClick:r},n.a.createElement(c,null,e),n.a.createElement(u,null,n.a.createElement(i,null,a),n.a.createElement(s,null,t)))}var f=t(145),p=t(23),h=({color:e="currentColor",width:a="56px",height:t="56px"})=>n.a.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:a,height:t,viewBox:"0 0 56 56"},n.a.createElement("g",{transform:"translate(-0.001)"},n.a.createElement("g",{"data-name":"Group 2845",transform:"translate(0.001)"},n.a.createElement("g",{"data-name":"Group 2844"},n.a.createElement("path",{"data-name":"Path 2442",d:"M20.211,11.444l-1.1-.95v-.456l1.1-.95a.935.935,0,0,0,.3-.9,10.074,10.074,0,0,0-.727-2.166.933.933,0,0,0-.762-.537l-1.438-.131q-.146-.211-.3-.41l.31-1.355a.935.935,0,0,0-.287-.9,10.539,10.539,0,0,0-1.877-1.344.934.934,0,0,0-.924.007l-1.237.718c-.167-.057-.338-.111-.516-.16L12.183.567A.934.934,0,0,0,11.324,0H9.212a.933.933,0,0,0-.859.567L7.782,1.909c-.178.049-.349.1-.516.16L6.029,1.351A.938.938,0,0,0,5.1,1.343,10.575,10.575,0,0,0,3.228,2.687a.933.933,0,0,0-.287.9l.31,1.354c-.1.133-.206.271-.3.411L1.51,5.488a.933.933,0,0,0-.762.537A10.066,10.066,0,0,0,.021,8.191a.934.934,0,0,0,.3.9l1.1.95v.456l-1.1.95a.935.935,0,0,0-.3.9,10.074,10.074,0,0,0,.727,2.166.933.933,0,0,0,.762.537l1.438.131q.146.211.3.41l-.31,1.355a.933.933,0,0,0,.287.9A10.455,10.455,0,0,0,5.1,19.189a.931.931,0,0,0,.923-.007l1.238-.717c.167.057.338.111.516.16l.571,1.342a.934.934,0,0,0,.859.567h2.113a.933.933,0,0,0,.859-.567l.571-1.342c.178-.049.349-.1.516-.16l1.237.718a.936.936,0,0,0,1.012-.048l1.71-1.224a.934.934,0,0,0,.366-.968l-.31-1.354c.1-.133.206-.271.3-.411l1.438-.131a.933.933,0,0,0,.762-.537,10.072,10.072,0,0,0,.727-2.166A.935.935,0,0,0,20.211,11.444Zm-2.646.185.994.855q-.107.376-.256.753l-1.333.121a.935.935,0,0,0-.709.439,6.84,6.84,0,0,1-.688.931.933.933,0,0,0-.21.827l.274,1.2-.714.511-1.1-.638A.939.939,0,0,0,13,16.572a6.962,6.962,0,0,1-1.127.352.933.933,0,0,0-.651.544l-.511,1.2h-.88l-.511-1.2a.929.929,0,0,0-.651-.544,6.989,6.989,0,0,1-1.127-.352.932.932,0,0,0-.826.055l-1.146.664q-.349-.224-.68-.486l.286-1.25a.934.934,0,0,0-.209-.826,6.863,6.863,0,0,1-.689-.931.935.935,0,0,0-.709-.439l-1.333-.121q-.148-.377-.256-.753l.994-.855a.935.935,0,0,0,.324-.707V9.611A.935.935,0,0,0,2.971,8.9l-.994-.856q.107-.375.256-.752l1.332-.121a.935.935,0,0,0,.709-.439A6.839,6.839,0,0,1,4.963,5.8a.933.933,0,0,0,.21-.827l-.286-1.25q.33-.261.681-.487l1.145.664a.942.942,0,0,0,.826.055,6.962,6.962,0,0,1,1.127-.352.933.933,0,0,0,.651-.544l.511-1.2h.88l.511,1.2a.929.929,0,0,0,.651.544A6.977,6.977,0,0,1,13,3.961a.936.936,0,0,0,.826-.055l1.145-.664q.35.226.681.487l-.286,1.25a.934.934,0,0,0,.209.826,6.864,6.864,0,0,1,.689.931.935.935,0,0,0,.709.439L18.3,7.3q.148.377.256.753l-.994.855a.935.935,0,0,0-.324.707v1.311A.935.935,0,0,0,17.565,11.629Z",transform:"translate(-0.001)",fill:e}))),n.a.createElement("g",{"data-name":"Group 2847",transform:"translate(5.601 5.6)"},n.a.createElement("g",{"data-name":"Group 2846"},n.a.createElement("path",{"data-name":"Path 2443",d:"M52.669,48a4.667,4.667,0,1,0,4.667,4.667A4.667,4.667,0,0,0,52.669,48Zm0,7.467a2.8,2.8,0,1,1,2.8-2.8A2.8,2.8,0,0,1,52.669,55.467Z",transform:"translate(-48.002 -48)",fill:e}))),n.a.createElement("g",{"data-name":"Group 2849",transform:"translate(1.868 46.667)"},n.a.createElement("g",{"data-name":"Group 2848"},n.a.createElement("path",{"data-name":"Path 2444",d:"M24.4,400H16.935a.933.933,0,0,0-.933.933h0V408.4a.933.933,0,0,0,.933.933H24.4a.933.933,0,0,0,.933-.933h0v-7.467A.933.933,0,0,0,24.4,400Zm-.934,7.467h-5.6v-5.6h5.6Z",transform:"translate(-16.002 -400)",fill:e}))),n.a.createElement("g",{"data-name":"Group 2851",transform:"translate(15.868 43.867)"},n.a.createElement("g",{"data-name":"Group 2850"},n.a.createElement("path",{"data-name":"Path 2445",d:"M144.4,376h-7.467a.933.933,0,0,0-.933.933h0V387.2a.933.933,0,0,0,.933.933H144.4a.933.933,0,0,0,.933-.933h0V376.933A.933.933,0,0,0,144.4,376Zm-.934,10.267h-5.6v-8.4h5.6Z",transform:"translate(-136.002 -376)",fill:e}))),n.a.createElement("g",{"data-name":"Group 2853",transform:"translate(29.868 40.133)"},n.a.createElement("g",{"data-name":"Group 2852"},n.a.createElement("path",{"data-name":"Path 2446",d:"M264.4,344h-7.467a.933.933,0,0,0-.933.933h0v14a.933.933,0,0,0,.933.933H264.4a.933.933,0,0,0,.933-.933h0v-14A.933.933,0,0,0,264.4,344Zm-.934,14h-5.6V345.867h5.6Z",transform:"translate(-256.002 -344)",fill:e}))),n.a.createElement("g",{"data-name":"Group 2855",transform:"translate(43.868 31.733)"},n.a.createElement("g",{"data-name":"Group 2854"},n.a.createElement("path",{"data-name":"Path 2447",d:"M384.4,272h-7.467a.933.933,0,0,0-.933.933h0v22.4a.933.933,0,0,0,.933.933H384.4a.933.933,0,0,0,.933-.933h0v-22.4A.933.933,0,0,0,384.4,272Zm-.934,22.4h-5.6V273.867h5.6Z",transform:"translate(-376.002 -272)",fill:e}))),n.a.createElement("g",{"data-name":"Group 2857",transform:"translate(1.356 18.702)"},n.a.createElement("g",{"data-name":"Group 2856"},n.a.createElement("path",{"data-name":"Path 2448",d:"M42.263,162.177l-.017-.005-6.533-1.867-.513,1.8,4.574,1.307L11.611,181.889l1.024,1.56,27.7-18.179L38.8,170.262l1.784.549,2.3-7.467A.934.934,0,0,0,42.263,162.177Z",transform:"translate(-11.611 -160.305)",fill:e}))),n.a.createElement("g",{"data-name":"Group 2859",transform:"translate(36.401 3.733)"},n.a.createElement("g",{"data-name":"Group 2858"},n.a.createElement("path",{"data-name":"Path 2449",d:"M326.654,37.255a.933.933,0,0,0-.511-.255l-4.022-.615-1.807-3.85a.933.933,0,0,0-1.69,0l-1.807,3.85L312.794,37a.933.933,0,0,0-.527,1.574l2.938,3.011-.695,4.263a.933.933,0,0,0,1.373.967l3.586-1.982,3.586,1.982a.933.933,0,0,0,1.373-.967l-.695-4.263,2.938-3.011A.933.933,0,0,0,326.654,37.255Zm-4.587,3.364a.932.932,0,0,0-.253.8l.462,2.831-2.356-1.3a.933.933,0,0,0-.9,0l-2.356,1.3.462-2.831a.932.932,0,0,0-.253-.8l-2-2.048,2.719-.416a.931.931,0,0,0,.7-.526l1.174-2.5,1.174,2.5a.932.932,0,0,0,.7.526l2.719.416Z",transform:"translate(-312.002 -31.998)",fill:e}))),n.a.createElement("g",{"data-name":"Group 2861",transform:"translate(41.774 22.245)"},n.a.createElement("g",{"data-name":"Group 2860"},n.a.createElement("path",{"data-name":"Path 2450",d:"M361.942,190.672a10.25,10.25,0,0,1-1.778.155h-.014a10.286,10.286,0,0,1-1.773-.153l-.321,1.839a18.6,18.6,0,0,0,2.109.18,12.1,12.1,0,0,0,2.1-.184Z",transform:"translate(-358.057 -190.672)",fill:e}))),n.a.createElement("g",{"data-name":"Group 2863",transform:"translate(45.621 0.176)"},n.a.createElement("g",{"data-name":"Group 2862"},n.a.createElement("path",{"data-name":"Path 2451",d:"M391.342,1.508l-.316,1.839a10.177,10.177,0,0,1,3.351,1.208l.929-1.619A12.016,12.016,0,0,0,391.342,1.508Z",transform:"translate(-391.026 -1.508)",fill:e}))),n.a.createElement("g",{"data-name":"Group 2865",transform:"translate(37.772 0.187)"},n.a.createElement("g",{"data-name":"Group 2864"},n.a.createElement("path",{"data-name":"Path 2452",d:"M327.708,1.6a12.054,12.054,0,0,0-3.955,1.453l.94,1.613a10.191,10.191,0,0,1,3.344-1.229Z",transform:"translate(-323.753 -1.602)",fill:e}))),n.a.createElement("g",{"data-name":"Group 2867",transform:"translate(49.006 18.729)"},n.a.createElement("g",{"data-name":"Group 2866"},n.a.createElement("path",{"data-name":"Path 2453",d:"M422.772,160.531a10.3,10.3,0,0,1-2.73,2.294l.936,1.615a12.15,12.15,0,0,0,3.223-2.708Z",transform:"translate(-420.042 -160.531)",fill:e}))),n.a.createElement("g",{"data-name":"Group 2869",transform:"translate(53.519 12.099)"},n.a.createElement("g",{"data-name":"Group 2868"},n.a.createElement("path",{"data-name":"Path 2454",d:"M460.795,103.7l-1.454.035a10.241,10.241,0,0,1-.616,3.512l1.755.638a12.138,12.138,0,0,0,.727-4.177Z",transform:"translate(-458.725 -103.703)",fill:e}))),n.a.createElement("g",{"data-name":"Group 2871",transform:"translate(51.711 4.302)"},n.a.createElement("g",{"data-name":"Group 2870"},n.a.createElement("path",{"data-name":"Path 2455",d:"M444.65,36.875l-1.425,1.2a10.223,10.223,0,0,1,1.794,3.078l1.752-.645A12.071,12.071,0,0,0,444.65,36.875Z",transform:"translate(-443.225 -36.875)",fill:e}))),n.a.createElement("g",{"data-name":"Group 2873",transform:"translate(32.455 4.355)"},n.a.createElement("g",{"data-name":"Group 2872"},n.a.createElement("path",{"data-name":"Path 2456",d:"M280.274,37.328a12.093,12.093,0,0,0-2.1,3.652l1.755.634a10.223,10.223,0,0,1,1.777-3.089Z",transform:"translate(-278.174 -37.328)",fill:e}))),n.a.createElement("g",{"data-name":"Group 2875",transform:"translate(34.585 18.743)"},n.a.createElement("g",{"data-name":"Group 2874"},n.a.createElement("path",{"data-name":"Path 2457",d:"M297.859,160.656l-1.427,1.2a12.154,12.154,0,0,0,3.228,2.7l.933-1.617A10.286,10.286,0,0,1,297.859,160.656Z",transform:"translate(-296.432 -160.656)",fill:e}))),n.a.createElement("g",{"data-name":"Group 2877",transform:"translate(31.735 12.154)"},n.a.createElement("g",{"data-name":"Group 2876"},n.a.createElement("path",{"data-name":"Path 2458",d:"M273.873,104.18l-1.867,0a12.084,12.084,0,0,0,.736,4.147l1.753-.642A10.227,10.227,0,0,1,273.873,104.18Z",transform:"translate(-272.006 -104.18)",fill:e}))))),g=({color:e="currentColor",width:a="56px",height:t="56px"})=>n.a.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:a,height:t,viewBox:"0 0 56 56"},n.a.createElement("path",{"data-name":"Path 2434",d:"M56,21.656a4.49,4.49,0,0,0-3.218-4.326l-5.814-1.743V14.215a6.344,6.344,0,0,0,2.71-5.183V6.323a6.323,6.323,0,1,0-12.645,0v2.71a6.343,6.343,0,0,0,2.71,5.183v1.371l-4.065,1.219-4.065-1.219V14.215a6.344,6.344,0,0,0,2.71-5.183V6.323a6.323,6.323,0,1,0-12.645,0v2.71a6.343,6.343,0,0,0,2.71,5.183v1.371l-4.065,1.219-4.065-1.219V14.215a6.344,6.344,0,0,0,2.71-5.183V6.323a6.323,6.323,0,0,0-12.645,0v2.71a6.343,6.343,0,0,0,2.71,5.183v1.371L3.218,17.331A4.488,4.488,0,0,0,0,21.656v8.151H4.516V40.646H15.355v8.129H9.032V56H23.484V48.775H17.161V40.646h2.71V41.3l1.169.39a7.079,7.079,0,0,0,.665,1.6l-.552,1.1,2.2,2.2,1.1-.552a7.117,7.117,0,0,0,1.6.664l.39,1.169h3.109l.389-1.17a7.126,7.126,0,0,0,1.6-.664l1.1.552,2.2-2.2-.552-1.1a7.187,7.187,0,0,0,.665-1.6l1.17-.389v-.651h2.71v8.129H32.516V56H46.968V48.775H40.645V40.646H51.484V29.807H56ZM21.677,54.194H10.839V50.581H21.677Zm23.484,0H34.323V50.581H45.161ZM43.355,1.807A4.525,4.525,0,0,1,47.78,5.42H45.374a7.688,7.688,0,0,1-3.422-.808l-.583-.291-.46.46a2.192,2.192,0,0,1-1.541.639H38.93a4.525,4.525,0,0,1,4.425-3.613ZM38.839,9.033V7.226h.529a3.955,3.955,0,0,0,2.324-.747,9.5,9.5,0,0,0,3.682.747h2.5V9.033a4.534,4.534,0,0,1-2.259,3.908l-.451.261v2.574l-1.806,1.2-1.806-1.2V13.2L41.1,12.94a4.533,4.533,0,0,1-2.259-3.908ZM28,1.807A4.525,4.525,0,0,1,32.425,5.42H30.019A7.688,7.688,0,0,1,26.6,4.611l-.583-.291-.46.46a2.192,2.192,0,0,1-1.541.639h-.438A4.525,4.525,0,0,1,28,1.807ZM23.484,9.033V7.226h.529a3.955,3.955,0,0,0,2.324-.747,9.5,9.5,0,0,0,3.682.747h2.5V9.033a4.534,4.534,0,0,1-2.259,3.908l-.451.261v2.574L28,16.979l-1.806-1.2V13.2l-.451-.261a4.533,4.533,0,0,1-2.259-3.908Zm1.659,8.213L28,19.151l2.857-1.905,6.05,1.815a2.693,2.693,0,0,1,1.931,2.6V28H17.161V21.656a2.693,2.693,0,0,1,1.931-2.6ZM12.645,1.807A4.525,4.525,0,0,1,17.07,5.42h-.438a2.2,2.2,0,0,1-1.542-.639l-.461-.46-.583.291a7.679,7.679,0,0,1-3.421.808H8.22a4.525,4.525,0,0,1,4.425-3.613ZM8.129,9.033V7.226h2.5a9.5,9.5,0,0,0,3.682-.747,3.957,3.957,0,0,0,2.324.747h.529V9.033A4.533,4.533,0,0,1,14.9,12.94l-.451.261v2.574l-1.806,1.2-1.806-1.2V13.2l-.451-.261A4.533,4.533,0,0,1,8.129,9.033ZM1.806,21.656a2.693,2.693,0,0,1,1.931-2.6l6.05-1.816,2.857,1.906L15.5,17.246l1.975.593a4.474,4.474,0,0,0-2.123,3.818V28H1.806ZM34.323,39.994l-.907.3-.1.514a5.365,5.365,0,0,1-.8,1.932l-.291.436.428.856-.357.358-.855-.429L31,44.253a5.359,5.359,0,0,1-1.932.8l-.514.1-.3.909h-.5l-.3-.908-.514-.1a5.349,5.349,0,0,1-1.932-.8l-.437-.291-.855.429-.357-.358.428-.856-.291-.436a5.343,5.343,0,0,1-.8-1.932l-.1-.514-.907-.3v-.5l.907-.3.1-.514a5.352,5.352,0,0,1,.8-1.932l.291-.436-.428-.857.357-.357.855.429L25,35.231a5.359,5.359,0,0,1,1.932-.8l.514-.1.3-.908h.5l.3.908.514.1a5.349,5.349,0,0,1,1.932.8l.437.291.855-.429.357.357-.428.857.291.436a5.33,5.33,0,0,1,.8,1.932l.1.514.907.3Zm15.355-1.155H36.129v-.651L34.96,37.8a7.063,7.063,0,0,0-.665-1.6l.552-1.1-2.2-2.2-1.1.552a7.117,7.117,0,0,0-1.6-.664l-.39-1.169H26.445l-.389,1.17a7.125,7.125,0,0,0-1.6.664l-1.1-.552-2.2,2.2.552,1.1a7.169,7.169,0,0,0-.665,1.6l-1.17.389v.651H6.323V29.807H49.677ZM54.194,28H40.645V21.656a4.474,4.474,0,0,0-2.123-3.818l1.975-.593,2.857,1.905,2.857-1.905,6.05,1.815a2.693,2.693,0,0,1,1.931,2.6Zm0,0",transform:"translate(0 0)",fill:e})),E=t(209),v=t(210),b=t(208),w=t(207),O=t(141),M=t(10),x=Object(o.d)(O.a,()=>({"@media only screen and (max-width: 767px)":{marginBottom:"20px",":last-child":{marginBottom:0}}}));function A(){var e=Object(M.g)(),a=Object(f.b)(),t=Object(r.useCallback)(()=>a({type:"OPEN_DRAWER",drawerComponent:"STAFF_MEMBER_FORM"}),[a]),l=Object(r.useCallback)(()=>a({type:"OPEN_DRAWER",drawerComponent:"CATEGORY_FORM"}),[a]),o=Object(r.useCallback)(()=>a({type:"OPEN_DRAWER",drawerComponent:"PRODUCT_FORM"}),[a]),m=Object(r.useCallback)(()=>a({type:"OPEN_DRAWER",drawerComponent:"CAMPAING_FORM"}),[a]);return n.a.createElement(O.b,{fluid:!0},n.a.createElement(O.c,null,n.a.createElement(x,{md:6},n.a.createElement(d,{icon:n.a.createElement(g,null),title:"Staff Members",subtitle:"Manage your employees and their permission",onClick:()=>e.push(p.k)})),n.a.createElement(x,{md:6},n.a.createElement(d,{icon:n.a.createElement(h,null),title:"Site Settings",subtitle:"View and update your site settings",onClick:()=>e.push(p.j)}))),n.a.createElement(O.c,null,n.a.createElement(x,{md:6},n.a.createElement(d,{icon:n.a.createElement(w.a,{width:"56px",height:"56px"}),title:"Add Products",subtitle:"Add products from here",onClick:o})),n.a.createElement(x,{md:6},n.a.createElement(d,{icon:n.a.createElement(b.a,{width:"56px",height:"56px"}),title:"Add Categories",subtitle:"Add product categories from here",onClick:l}))),n.a.createElement(O.c,null,n.a.createElement(x,{md:6},n.a.createElement(d,{icon:n.a.createElement(E.a,{width:"56px",height:"56px"}),title:"Add Staff Members",subtitle:"Add your staff members from here",onClick:t})),n.a.createElement(x,{md:6},n.a.createElement(d,{icon:n.a.createElement(v.a,{width:"56px",height:"56px"}),title:"Add Coupons",subtitle:"Add coupons from here",onClick:m}))))}}}]);
//# sourceMappingURL=8.fcc6fcc0.chunk.js.map
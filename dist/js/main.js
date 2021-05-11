!function(e){var t={};function o(r){if(t[r])return t[r].exports;var n=t[r]={i:r,l:!1,exports:{}};return e[r].call(n.exports,n,n.exports,o),n.l=!0,n.exports}o.m=e,o.c=t,o.d=function(e,t,r){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},o.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(o.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)o.d(r,n,function(t){return e[t]}.bind(null,n));return r},o.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="",o(o.s=0)}([function(e,t,o){o(1),e.exports=o(2)},function(e,t){[Element.prototype,CharacterData.prototype,DocumentType.prototype].filter(Boolean).forEach((function(e){e.hasOwnProperty("remove")||Object.defineProperty(e,"remove",{configurable:!0,enumerable:!0,writable:!0,value:function(){this.parentNode&&this.parentNode.removeChild(this)}})}))},function(e,t){var o,r=[{id:"0",page:"#bg"},{id:"1",page:"#about"},{id:"2",page:"#projects"}],n=[],c=0,i=100,l=null;function u(){document.querySelector("#loadingScreen").style.opacity="0",setTimeout((function(){document.querySelector("#loadingScreen").remove(),document.querySelector(".headerDot").classList.add("jump")}),300)}function d(e){var t=r.filter((function(t){if(t.id===e.currentTarget.dataset.id)return t}));f(r.filter((function(e){if(e.id===document.body.dataset.page)return e}))[0].page),y(t[0].page),S(t[0].id),s()}function a(){var e=document.querySelector("#mobileMenuBtn"),t=[document.querySelector("#mobileMenuBtn #firstElem"),document.querySelector("#mobileMenuBtn #midElem"),document.querySelector("#mobileMenuBtn #lastElem")];"hidden"===e.dataset.mode?(e.dataset.mode="shown",t[2].style="margin-top:-10px;",t[0].style="margin: -6% 0;",setTimeout((function(){return t[0].style.transform="rotate(45deg)"}),200),setTimeout((function(){t[1].style.transform+="translateY(-200%) rotate(-45deg)",t[2].style.opacity="0"})),document.querySelector("#mobileMenu").style.left="0%"):(e.dataset.mode="hidden",t[2].style="margin-top: 5px;",setTimeout((function(){t[1].style.transform="translateY(0.5px)",t[0].style.transform="rotate(0deg)",t[1].style.transform="translateY(0%) rotate(0deg)",t[2].style.opacity="1"}),200),document.querySelector("#mobileMenu").style.left="300%")}function m(e){document.querySelectorAll(".mobileMenuElem").forEach((function(e){return e.className="mobileMenuElem"})),e.currentTarget.className+=" active",d(e)}function s(){document.querySelectorAll("#dotsMenu li").forEach((function(e){return e.removeAttribute("class")})),document.querySelector("#dotsMenu li[data-id='".concat(document.body.dataset.page,"']")).className="filledDot"}function f(e){if(document.querySelector(e).style.height=0,"#about"===e)return document.querySelector(".row").style.display="none",n=[],cancelAnimationFrame(l)}function y(e){if("#about"===e){if(document.querySelector(".row").style.display="block",p(),function(){var e=document.querySelector("canvas");e.getContext("2d");e.width=window.innerWidth,e.height=window.innerHeight,c=Math.floor(50*Math.random())+50}(),w(),q(),b(),window.screen.width<=600){var t=document.createElement("div");t.id="waveBoxMobile",t.innerHTML='<img src="./dist/img/wave.png" />',document.querySelector("#about").appendChild(t),setTimeout((function(){null!==document.querySelector("#waveBoxMobile")&&(document.querySelector("#waveBoxMobile").style.opacity="1")}),300)}setTimeout((function(){document.querySelector(".row").style.opacity="1"}),300)}else"#bg"===e?null!==document.querySelector("#waveBoxMobile")?document.querySelector("#waveBoxMobile").remove():null!==document.querySelector(".wave")&&(document.querySelector(".wave").style.opacity="0",setTimeout((function(){null!==document.querySelector(".wave")&&document.querySelector(".wave").remove()}),350)):"#projects"===e&&(window.screen.width<=1024&&(o=document.createElement("div"),r=document.createElement("div"),n=0,o.id="firstRow",r.id="secRow",null===document.querySelector("#firstRow")?(document.querySelectorAll("#projectsWrap a").forEach((function(e){n<3?o.appendChild(e):r.appendChild(e),n++})),document.querySelector("#projectsWrap").append(o,r)):document.querySelectorAll("#projectsWrap a").forEach((function(e){n<3?document.querySelector("#firstRow").appendChild(e):document.querySelector("#secRow").appendChild(e),n++}))),null!==document.querySelector("#waveBoxMobile")&&document.querySelector("#waveBoxMobile").remove(),p(),h(),document.querySelector("#loadMoreProjects").addEventListener("click",h));var o,r,n;document.querySelector(e).style.height="100%"}function p(){if(null===document.querySelector(".wave")){var e=document.createElement("div");e.className="wave",document.body.appendChild(e),document.querySelector(".wave").innerHTML='<img src="dist/img/wave.png" />',document.querySelector(".wave").addEventListener("wheel",v)}}function h(){if(null===document.querySelector(".projectLoadingScreen")){var e=[{id:0,url:"https://video-finder.netlify.app/",name:"Video Finder",img:"dist/img/video-finder.jpg"},{id:1,url:"#",name:"devcobb",img:"dist/img/portoflio.JPG"},{id:2,url:"https://github.com/devcobb/Financer",name:"Financer",img:"dist/img/financer.JPG"},{id:3,url:"dist/deliciae/html/index.html",name:"Deliciae",img:"dist/img/deliciae.JPG"},{id:4,url:"dist/tanky/html/index.html",name:"Tanky",img:"dist/img/tanky.JPG"},{id:5,url:"https://github.com/devcobb/Filmer",name:"Filmer",img:"dist/img/filmer.JPG"},{id:6,url:"dist/calendation/html/index.html",name:"Calendation",img:"dist/img/calendation.JPG"},{id:7,url:"dist/evolution/html/index.html",name:"Evolution",img:"dist/img/evolution.JPG"},{id:8,url:"dist/crime/html/index.html",name:"Crime",img:"dist/img/crime.JPG"},{id:9,url:"dist/tubedit/html/index.html",name:"Tubedit",img:"dist/img/tubedit.JPG"},{id:10,url:"dist/cardmemory/html/index.html",name:"Cardmemory",img:"dist/img/cardmemory.JPG"},{id:11,url:"dist/quiz/html/index.html",name:"Quiz App",img:"dist/img/quiz.JPG"}];document.querySelectorAll(".project").forEach((function(e){var t=document.createElement("div");t.className="projectLoadingScreen",e.appendChild(t)})),setTimeout((function(){if(""===document.querySelector(".project").style.backgroundImage)document.querySelectorAll(".project").forEach((function(t){t.parentNode.href=e[Number(t.dataset.id)].url,t.style.backgroundImage="url('".concat(e[Number(t.dataset.id)].img,"')")})),g();else{if(Number(document.querySelectorAll(".project")[document.querySelectorAll(".project").length-1].dataset.id)!==e[e.length-1].id)for(var t=0;t<document.querySelectorAll(".project").length;t++)document.querySelectorAll(".project")[t].parentNode.href=e[t+document.querySelectorAll(".project").length].url,document.querySelectorAll(".project")[t].style.backgroundImage="url(".concat(e[t+document.querySelectorAll(".project").length].img,")"),document.querySelectorAll(".project")[t].dataset.id=t+document.querySelectorAll(".project").length;else for(var o=0;o<document.querySelectorAll(".project").length;o++)document.querySelectorAll(".project")[o].parentNode.href=e[o].url,document.querySelectorAll(".project")[o].style.backgroundImage="url(".concat(e[o].img,")"),document.querySelectorAll(".project")[o].dataset.id=o;g()}}),600)}}function g(){document.querySelectorAll(".projectLoadingScreen").forEach((function(e){e.style.opacity=0})),setTimeout((function(){document.querySelectorAll(".projectLoadingScreen").forEach((function(e){return e.remove()}))}),500)}function S(e){document.body.dataset.page=e}function v(e){var t=r.filter((function(e){if(e.id===document.body.dataset.page)return e})),o=null,n=!1;e.deltaY<100?"0"!==t[0].id?o=r.filter((function(e){if(Number(e.id)===Number(document.body.dataset.page)-1)return e})):n=!0:"2"!==t[0].id?o=r.filter((function(e){if(Number(e.id)===Number(document.body.dataset.page)+1)return e})):n=!0,n||(f(t[0].page),y(o[0].page),S(o[0].id),s())}function b(){var e=document.querySelector("canvas");e.getContext("2d").clearRect(0,0,e.width,e.height),i>=0?(n.forEach((function(e){e.y-=1})),i-=1):(c=Math.floor(5*Math.random())+5,i=100,w()),q(),l=requestAnimationFrame(b)}function q(){var e=document.querySelector("canvas").getContext("2d");n.forEach((function(t){e.beginPath(),e.fillStyle=t.color,e.arc(t.x,t.y,t.size,0,2*Math.PI),e.fill()}))}function w(){for(var e,t=document.querySelector("canvas"),o=0;o<c;o++)n.push({x:Math.floor(Math.random()*t.width),y:c>=50?Math.floor(Math.random()*t.height):Math.floor(t.height+150*Math.random()),size:window.screen.width>768?Math.floor(18*Math.random())+2:Math.floor(14*Math.random())+1,color:(e=void 0,e=["#ffffff","#262626","#cccccc","#efefef","2d2d2d","#1d1d1d"],e[Math.floor(Math.random()*e.length)])})}(o=document.createElement("div")).id="loadingScreen",o.innerHTML='<img src="dist/img/logo.png" />',document.body.appendChild(o),window.chrome||document.querySelector("#mouseScroll").remove(),window.addEventListener("load",u),document.querySelectorAll("#menu li").forEach((function(e){return e.addEventListener("click",d)})),document.querySelectorAll("#dotsMenu li").forEach((function(e){return e.addEventListener("click",d)})),document.querySelectorAll(".container").forEach((function(e){return e.addEventListener("wheel",v)})),document.querySelectorAll("#mobileMenu .mobileMenuElem").forEach((function(e){return e.addEventListener("click",m)})),document.querySelector("#mobileMenuBtn").addEventListener("click",a)}]);
(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{237:function(e,a,t){"use strict";t.r(a);t(53),t(23),t(24),t(13);var n=t(0),l=t.n(n),r=t(245),c=t(255),i=t.n(c);a.default=function(){var e=Object(n.useState)(!0),a=e[0],t=e[1],c=Object(n.useState)(void 0),s=c[0],o=c[1];Object(n.useEffect)(function(){console.info("%c Waiting for window.gapi to be defined --loading...","color:rebeccapurple");var e=setInterval(function(){if(window.gapi)return clearInterval(e),t(!1)},100)},[]),Object(n.useEffect)(function(){console.info('%c Loading changed to "'+a+'" object is: '+window.gapi,"color:rebeccapurple"),a||window.gapi.load("client:auth2",u)},[a]);var m=function(){console.info("Loading the table","color:rebeccapurple"),window.gapi.client.sheets.spreadsheets.values.get({spreadsheetId:"1HQL19Es4w30qruyOcAghqwot7jWthA7KrO79rkJSDdk",range:"A1:E"}).then(function(e){var a=e.result;a.values&&a.values.length,o(a.values)})},u=function(){console.info("initializing the client","color:rebeccapurple"),window.gapi.client.init({apiKey:"",clientId:"",discoveryDocs:[""],scope:""}).then(function(){m()},function(e){console.error("Can't connect to google docs...")})};return l.a.createElement(r.a,null,l.a.createElement(i.a,null,l.a.createElement("script",{src:"https://apis.google.com/js/api.js"})),l.a.createElement("h1",null,"Test Page"),l.a.createElement("p",null,"For reading out google spreadsheet"),l.a.createElement("br",null),l.a.createElement("button",{className:"button",onClick:m},"Refresh Table"),l.a.createElement("hr",null),l.a.createElement("br",null),l.a.createElement("h1",null,"Table"),l.a.createElement("br",null),s?s.map(function(e,a){return l.a.createElement("p",{key:"row_"+a}," ",e.toString())}):l.a.createElement("h1",null,"Loading..."))}},240:function(e,a,t){var n;e.exports=(n=t(243))&&n.default||n},241:function(e,a,t){"use strict";var n=t(0),l=t.n(n),r=t(70),c=t.n(r);t.d(a,"a",function(){return c.a});t(240),t(9).default.enqueue,l.a.createContext({})},242:function(e){e.exports={data:{site:{siteMetadata:{title:"ZIM | Blog-Template"}}}}},243:function(e,a,t){"use strict";t.r(a);t(18);var n=t(0),l=t.n(n),r=t(97);a.default=function(e){var a=e.location,t=e.pageResources;return t?l.a.createElement(r.a,Object.assign({location:a,pageResources:t},t.json)):null}},244:function(e){e.exports={data:{placeholderImage:{childImageSharp:{fluid:{base64:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAWCAYAAADAQbwGAAAACXBIWXMAAAsSAAALEgHS3X78AAAB/0lEQVQ4y31VOy9EURA+u0uj0CBUSgnNdoTEPxAFHR2CQqfZ+AUaVEKilojKq9DSCiISQSLxKCSrkEiI157rm83M5ruTuyb5ch53znfmeW5IkiSIxBgLMsoaKAEvSVpegQ8guv0DnO1RjnyKDGM7FI5I+VvHO2AbOFXCX/1m5J/AeGBWJbsloooeFNkDZoEt9z3SpSKzgdw0y75I4UfHFaAIrOnaLKs4T26MsOQ+RIURbqjeuK7v1f3EeXIuSq1A2d1oFpjiiRI2Ae8IzyrGPtIxvQtRmib3ossiz3uVdAIYBDoyLKwS7v1DyFYei4VBBfPujFhfSHafXdwSZ6GF4RHoUrK8JnJEQkD6VQtjHcLoEjWnZA0wQsYchSBFmGQQRedKGSRtSpCjUsvr3EruLGg7ZVlYK1iQjenBWnu69QwTnmWUTIWIZyxuZFlQt22vXy+u1uFynSzvSHdYe4qrZJkhp99bMH8DrmRzgCyzmO1aeUC5kUqlgHUths7KfekgO3To+vjJCpk6JEVMcyMcBq5ts0gFbMkQF5a08K+kJIBNoNOyba5TOS1ypqayMpwh8jb2uVgaabOvp3k6+KX4oQeALxr12Q8UBy7YIeChTvvZ6yyyaPHk7AdXCvYraMZ8AbjM6CArq3UqqZAS3nAZbNCi3TUrQSCP66S8oxxHkz8rPktMw1hakwAAAABJRU5ErkJggg==",aspectRatio:.8901098901098901,src:"/gatsby_markdownBlog/static/63fb8bc95eb1fe11f47cde72fc59a01d/23d8d/gams_example.png",srcSet:"/gatsby_markdownBlog/static/63fb8bc95eb1fe11f47cde72fc59a01d/e22c9/gams_example.png 75w,\n/gatsby_markdownBlog/static/63fb8bc95eb1fe11f47cde72fc59a01d/23d8d/gams_example.png 81w",sizes:"(max-width: 81px) 100vw, 81px"}}}}}},245:function(e,a,t){"use strict";var n=t(242),l=t(0),r=t.n(l),c=t(241),i=t(249),s=t.n(i),o=t(244),m=t(248),u=t.n(m),d=function(){var e=o.data;return r.a.createElement(u.a,{fluid:e.placeholderImage.childImageSharp.fluid,style:{position:"initial"},imgStyle:{margin:".75em"}})},E=function(){var e=Object(l.useState)(!1),a=e[0],t=e[1];return r.a.createElement("nav",{className:["navbar","is-fixed-top",s.a.navFixed].join(" "),role:"navigation","aria-label":"main navigation"},r.a.createElement("div",{className:"navbar-brand"},r.a.createElement("a",{className:"navbar-item",href:"https://bulma.io"}),r.a.createElement("a",{role:"button",className:"navbar-burger burger "+(a?"is-active":""),"aria-label":"menu","aria-expanded":"false","data-target":"navbarBasicExample",onClick:function(){t(!a)}},r.a.createElement("span",{"aria-hidden":"true"}),r.a.createElement("span",{"aria-hidden":"true"}),r.a.createElement("span",{"aria-hidden":"true"}))),r.a.createElement("div",{id:"navbarBasicExample",className:"navbar-menu "+s.a.navbarBasicExample+" "+(a?"is-active":"")},r.a.createElement("div",{className:["navbar-end",s.a.navBorder].join(" ")},r.a.createElement(c.a,{activeStyle:{textDecoration:"underline"},to:"/",className:"navbar-item"},"Home"),r.a.createElement(c.a,{activeStyle:{textDecoration:"underline"},to:"/blog",className:"navbar-item"},"Blog"),r.a.createElement(c.a,{activeStyle:{textDecoration:"underline"},to:"/about",className:"navbar-item"},"About")),r.a.createElement("div",{className:"navbar-end"},r.a.createElement("div",{className:["navbar-item has-text-left"].join(" "),style:{marginRight:"1.5em"}},r.a.createElement(d,null)))))},b=t(250),g=t.n(b),v=function(e){var a=e.siteTitle,t=void 0===a?"":a,n=e.showTeaser,l=void 0!==n&&n,c=r.a.createElement("header",{className:g.a.baseHeader},r.a.createElement("section",{className:"hero has-text-centered"},r.a.createElement("div",{className:"hero-body"},r.a.createElement("div",{className:["container",g.a.heroEnd].join(" ")},r.a.createElement("h1",{className:"title"},"ZIM Blog"),r.a.createElement("h2",{className:"subtitle"},"Based on React/Gatsby and Bulma"))))),i=r.a.createElement("header",null,r.a.createElement("section",{className:["hero is-medium is-bold",g.a.header].join(" ")},r.a.createElement("div",{className:"hero-body"},r.a.createElement("div",{className:"container"},r.a.createElement("h1",{className:"title has-text-black"},t),r.a.createElement("h2",{className:"subtitle has-text-white-ter"},"React/Gatsby, Bulma,"," "),r.a.createElement("br",null),r.a.createElement("div",{className:["container is-fluid"].join(" ")})))));return l?i:c},p=t(251),f=t.n(p),h=t(252),A=t.n(h),w=t(253),y=t.n(w),N=t(256),S=function(){return r.a.createElement("div",{className:y.a.iconBar},r.a.createElement("div",null,r.a.createElement("span",{className:y.a.iconHolder},r.a.createElement(N.a,{size:"1.25em"})),r.a.createElement("span",{className:y.a.iconHolder},r.a.createElement(N.c,{size:"1.25em"})),r.a.createElement("span",{className:y.a.iconHolder},r.a.createElement(N.b,{size:"1.25em"})),r.a.createElement("hr",null),r.a.createElement("p",null,"ZIM Blog")))};t(254),a.a=function(e){var a=e.children,t=e.showTeaser,l=void 0!==t&&t,c=e.showHeader,i=void 0===c||c,s=n.data,o=i?r.a.createElement(v,{siteTitle:s.site.siteMetadata.title,showTeaser:l}):null;return r.a.createElement(r.a.Fragment,null,o,r.a.createElement(E,null),r.a.createElement("div",{className:"container"},r.a.createElement("main",{className:["section",A.a.main].join(" ")},r.a.createElement(f.a,{showUnder:160,style:{right:"45vw"}},r.a.createElement("span",null,"Nach Oben")),r.a.createElement("main",null,a)),r.a.createElement("aside",null,r.a.createElement(S,null)),r.a.createElement("footer",null,"© ",(new Date).getFullYear(),", Built with"," ",r.a.createElement("a",{href:"https://www.gatsbyjs.org"},"Gatsby"))))}}}]);
//# sourceMappingURL=component---src-pages-test-tsx-234f69489d0548735684.js.map
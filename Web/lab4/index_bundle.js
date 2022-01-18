(()=>{"use strict";var n,e,t,r,o,a,i,c,s,p,d,l,u,f,h={466:(n,e,t)=>{t.d(e,{Z:()=>c});var r=t(81),o=t.n(r),a=t(645),i=t.n(a)()(o());i.push([n.id,'html,\nbody {\n  margin: 0;\n  height: 100%;\n}\n.app {\n  font-family: aakar;\n  margin-top: 80px;\n}\n.top {\n  position: relative;\n}\n.header {\n  font-family: sans-serif;\n  font-weight: 700;\n  font-size: 18px;\n  color: #000;\n}\nbutton {\n  background-color: #4CAF50;\n  /* Green */\n  border: none;\n  color: white;\n  margin: 10px;\n  padding: 0px 32px;\n  text-align: center;\n  text-decoration: none;\n  display: inline-block;\n  font-size: 16px;\n  border-radius: 20px;\n}\n.necessary {\n  color: #c01e1e;\n  padding-left: 5px;\n}\n.navBar {\n  top: 0;\n  margin: 0!important;\n  overflow: hidden;\n  width: 100%;\n  height: 80px;\n  background: #372577;\n  float: left;\n  display: flex;\n  border-bottom-right-radius: 25px;\n  border-bottom-left-radius: 25px;\n}\n#deletePainting {\n  width: 50px;\n  height: 50px;\n  right: 0;\n}\n#contentNavbar {\n  display: flex;\n  text-align: center;\n  align-items: center;\n}\na {\n  color: #f2f2f2;\n  padding: 52px;\n  font-size: 18px;\n  text-decoration: none;\n}\n.padding {\n  padding: 17px 20px;\n}\na:hover {\n  color: black;\n}\n.textLogo {\n  height: 30px;\n  width: 30px;\n  font-family: "Fira Code Retina";\n  font-size: 46px;\n  padding: 14px 16px;\n}\ndialog {\n  border-radius: 10px;\n}\n.boxWithPainting {\n  width: calc(100vw/5);\n  height: calc(100vh/3);\n  background: #4CAF50;\n}',""]);const c=i},645:n=>{n.exports=function(n){var e=[];return e.toString=function(){return this.map((function(e){var t="",r=void 0!==e[5];return e[4]&&(t+="@supports (".concat(e[4],") {")),e[2]&&(t+="@media ".concat(e[2]," {")),r&&(t+="@layer".concat(e[5].length>0?" ".concat(e[5]):""," {")),t+=n(e),r&&(t+="}"),e[2]&&(t+="}"),e[4]&&(t+="}"),t})).join("")},e.i=function(n,t,r,o,a){"string"==typeof n&&(n=[[null,n,void 0]]);var i={};if(r)for(var c=0;c<this.length;c++){var s=this[c][0];null!=s&&(i[s]=!0)}for(var p=0;p<n.length;p++){var d=[].concat(n[p]);r&&i[d[0]]||(void 0!==a&&(void 0===d[5]||(d[1]="@layer".concat(d[5].length>0?" ".concat(d[5]):""," {").concat(d[1],"}")),d[5]=a),t&&(d[2]?(d[1]="@media ".concat(d[2]," {").concat(d[1],"}"),d[2]=t):d[2]=t),o&&(d[4]?(d[1]="@supports (".concat(d[4],") {").concat(d[1],"}"),d[4]=o):d[4]="".concat(o)),e.push(d))}},e}},81:n=>{n.exports=function(n){return n[1]}},379:n=>{var e=[];function t(n){for(var t=-1,r=0;r<e.length;r++)if(e[r].identifier===n){t=r;break}return t}function r(n,r){for(var a={},i=[],c=0;c<n.length;c++){var s=n[c],p=r.base?s[0]+r.base:s[0],d=a[p]||0,l="".concat(p," ").concat(d);a[p]=d+1;var u=t(l),f={css:s[1],media:s[2],sourceMap:s[3],supports:s[4],layer:s[5]};if(-1!==u)e[u].references++,e[u].updater(f);else{var h=o(f,r);r.byIndex=c,e.splice(c,0,{identifier:l,updater:h,references:1})}i.push(l)}return i}function o(n,e){var t=e.domAPI(e);return t.update(n),function(e){if(e){if(e.css===n.css&&e.media===n.media&&e.sourceMap===n.sourceMap&&e.supports===n.supports&&e.layer===n.layer)return;t.update(n=e)}else t.remove()}}n.exports=function(n,o){var a=r(n=n||[],o=o||{});return function(n){n=n||[];for(var i=0;i<a.length;i++){var c=t(a[i]);e[c].references--}for(var s=r(n,o),p=0;p<a.length;p++){var d=t(a[p]);0===e[d].references&&(e[d].updater(),e.splice(d,1))}a=s}}},569:n=>{var e={};n.exports=function(n,t){var r=function(n){if(void 0===e[n]){var t=document.querySelector(n);if(window.HTMLIFrameElement&&t instanceof window.HTMLIFrameElement)try{t=t.contentDocument.head}catch(n){t=null}e[n]=t}return e[n]}(n);if(!r)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");r.appendChild(t)}},216:n=>{n.exports=function(n){var e=document.createElement("style");return n.setAttributes(e,n.attributes),n.insert(e,n.options),e}},565:(n,e,t)=>{n.exports=function(n){var e=t.nc;e&&n.setAttribute("nonce",e)}},795:n=>{n.exports=function(n){var e=n.insertStyleElement(n);return{update:function(t){!function(n,e,t){var r="";t.supports&&(r+="@supports (".concat(t.supports,") {")),t.media&&(r+="@media ".concat(t.media," {"));var o=void 0!==t.layer;o&&(r+="@layer".concat(t.layer.length>0?" ".concat(t.layer):""," {")),r+=t.css,o&&(r+="}"),t.media&&(r+="}"),t.supports&&(r+="}");var a=t.sourceMap;a&&"undefined"!=typeof btoa&&(r+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(a))))," */")),e.styleTagTransform(r,n,e.options)}(e,n,t)},remove:function(){!function(n){if(null===n.parentNode)return!1;n.parentNode.removeChild(n)}(e)}}}},589:n=>{n.exports=function(n,e){if(e.styleSheet)e.styleSheet.cssText=n;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(n))}}}},v={};function x(n){var e=v[n];if(void 0!==e)return e.exports;var t=v[n]={id:n,exports:{}};return h[n](t,t.exports,x),t.exports}x.n=n=>{var e=n&&n.__esModule?()=>n.default:()=>n;return x.d(e,{a:e}),e},x.d=(n,e)=>{for(var t in e)x.o(e,t)&&!x.o(n,t)&&Object.defineProperty(n,t,{enumerable:!0,get:e[t]})},x.o=(n,e)=>Object.prototype.hasOwnProperty.call(n,e),n=x(379),e=x.n(n),t=x(795),r=x.n(t),o=x(569),a=x.n(o),i=x(565),c=x.n(i),s=x(216),p=x.n(s),d=x(589),l=x.n(d),u=x(466),(f={}).styleTagTransform=l(),f.setAttributes=c(),f.insert=a().bind(null,"head"),f.domAPI=r(),f.insertStyleElement=p(),e()(u.Z,f),u.Z&&u.Z.locals&&u.Z.locals})();
parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"z2hx":[function(require,module,exports) {

"use strict";var e=function(){if("undefined"!=typeof self)return self;if("undefined"!=typeof window)return window;if(void 0!==t)return t;throw new Error("unable to locate global object")},t=e();module.exports=exports=t.fetch,t.fetch&&(exports.default=t.fetch.bind(t)),exports.Headers=t.Headers,exports.Request=t.Request,exports.Response=t.Response;
},{}],"CErC":[function(require,module,exports) {
function o(t){return(o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(o){return typeof o}:function(o){return o&&"function"==typeof Symbol&&o.constructor===Symbol&&o!==Symbol.prototype?"symbol":typeof o})(t)}module.exports="object"==("undefined"==typeof self?"undefined":o(self))?self.FormData:window.FormData;
},{}],"jAYW":[function(require,module,exports) {
var e=require("node-fetch"),r=require("form-data");class o extends Error{constructor(e){const{code:r,message:o}=e;super(o),this.code=r,this.message=o,this.name=this.constructor.name,Error.captureStackTrace(this,this.constructor)}}async function t(r){if(!r.url)throw new o({code:-2,message:'You forgot parameter "URL"'});var t=encodeURI(r.url),a=await(await e(`https://api.shrtco.de/v2/shorten?url=${t}`)).json();if(!0===a.ok)return a;throw new o({code:a.error_code,message:a.error})}async function a(r){if(!r.code)throw new o({code:-2,message:'You forgot parameter "code"'});var t=encodeURI(r.code),a=await(await e(`https://api.shrtco.de/v2/info?code=${t}`)).json();if(!0===a.ok)return a;throw new o({code:a.error_code,message:a.error})}async function s(t){if(!t.url)throw new o({code:-2,message:'You forgot parameter "url"'});if(!t.code)throw new o({code:-2,message:'You forgot parameter "code"'});var a=encodeURI(t.url),s=encodeURI(t.code),n=new r;n.append("url",a),n.append("custom_code",s);var c=await(await e("https://api.shrtco.de/v2/shorten",{method:"POST",body:n})).json();if(!0===c.ok)return c;throw new o({code:c.error_code,message:c.error})}async function n(r){if(!r.url)throw new o({code:-2,message:'You forgot parameter "url"'});var t=encodeURI(r.url),a=await(await e(`https://api.shrtco.de/v2/shorten?emoji&url=${t}`)).json();if(!0===a.ok)return a;throw new o({code:a.error_code,message:a.error})}async function c(t){if(!t.url)throw new o({code:-2,message:'You forgot parameter "url"'});if(!t.pass)throw new o({code:-2,message:'You forgot parameter "pass"'});var a=encodeURI(t.url),s=encodeURI(t.pass),n=new r;n.append("url",a),n.append("password",s);var c=await(await e("https://api.shrtco.de/v2/shorten",{method:"POST",body:n})).json();if(!0===c.ok)return c;throw new o({code:c.error_code,message:c.error})}module.exports={short:t,info:a,custom:s,emoji:n,pass:c};
},{"node-fetch":"z2hx","form-data":"CErC"}],"mpVp":[function(require,module,exports) {
var e=document.querySelector("#link"),t=document.querySelector("#shortenIt"),n=document.querySelector("#linkAppend"),r=document.querySelector("#linkAppendTemplate"),o="Links_KEY",c="shortLinks_KEY";window.onclick=function(e){if("copy"===e.target.className){var t=e.target.closest(".linkshortandbutton").innerText.split("\n")[0];navigator.clipboard.writeText(t),e.target.innerText="Copyed ! 😎"}};for(var i=require("shrtco.de"),l=h(c),a=h(o),u=0;u<a.length;u++)d(a[u],l[u]);function s(e){i.short({url:e}).then(function(t){var n=t.result.short_link;l.push(n),a.push(e),p(o,a),p(c,l),d(e,n)}).catch(function(e){return alert("Wrong URL 🙅‍♂️")})}function d(e,t){var o=r.content.cloneNode(!0),c=o.querySelector("#link_copy");o.querySelector("#shortened").innerText=t,c.innerText=e,n.appendChild(o)}function h(e){var t=localStorage.getItem(e);return JSON.parse(t)||[]}function p(e,t){localStorage.setItem(e,JSON.stringify(t))}t.addEventListener("click",function(t){if(t.preventDefault,""==e.value)return e.classList.add("active"),void(e.placeholder="Paste your 🔗 here FIRST ✌");e.classList.remove("active"),e.placeholder="Paste the 🔗 here...",s(e.value),e.value=""});
},{"shrtco.de":"jAYW"}]},{},["mpVp"], null)
//# sourceMappingURL=/script.0e5ecd45.js.map
// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"node_modules/node-fetch/browser.js":[function(require,module,exports) {

"use strict"; // ref: https://github.com/tc39/proposal-global

var getGlobal = function () {
  // the only reliable means to get the global object is
  // `Function('return this')()`
  // However, this causes CSP violations in Chrome apps.
  if (typeof self !== 'undefined') {
    return self;
  }

  if (typeof window !== 'undefined') {
    return window;
  }

  if (typeof global !== 'undefined') {
    return global;
  }

  throw new Error('unable to locate global object');
};

var global = getGlobal();
module.exports = exports = global.fetch; // Needed for TypeScript and Webpack.

if (global.fetch) {
  exports.default = global.fetch.bind(global);
}

exports.Headers = global.Headers;
exports.Request = global.Request;
exports.Response = global.Response;
},{}],"node_modules/shrtco.de/node_modules/form-data/lib/browser.js":[function(require,module,exports) {
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function (obj) { return typeof obj; }; } else { _typeof = function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/* eslint-env browser */
module.exports = (typeof self === "undefined" ? "undefined" : _typeof(self)) == 'object' ? self.FormData : window.FormData;
},{}],"node_modules/shrtco.de/index.js":[function(require,module,exports) {
var fetch = require("node-fetch");
var FormData = require("form-data");
class APIError extends Error {
/**
* @param {Object} params - Параметры ошибки
* @param {Number} params.code - Код ошибки
* @param {String} params.message - Сообщение ошибки
*/
constructor(params) {
const { 
		code, 
		message
 	  } = params;

super(message);

this.code = code;
this.message = message;
this.name = this.constructor.name;

Error.captureStackTrace(this, this.constructor);
}
};

async function short(params) {
	if (!params.url)throw new APIError({
		code: -2,
		message: "You forgot parameter \"URL\""
	});
	var url = encodeURI(params.url);
	var result = (await (await fetch(`https://api.shrtco.de/v2/shorten?url=${url}`)).json());
	if (result.ok === true){
		return result;
	} else {
		throw new APIError({
			code: result.error_code,
			message: result.error
		});
	}
};
async function info(params) {
	if (!params.code)throw new APIError({
		code: -2,
		message: "You forgot parameter \"code\""
	});
	var code = encodeURI(params.code);
	var result = (await (await fetch(`https://api.shrtco.de/v2/info?code=${code}`)).json());
	if (result.ok === true){
		return result;
	} else {
		throw new APIError({
			code: result.error_code,
			message: result.error
		});
	}
};

async function custom(params) {
	if (!params.url)throw new APIError({
		code: -2,
		message: "You forgot parameter \"url\""
	});
	if (!params.code)throw new APIError({
		code: -2,
		message: "You forgot parameter \"code\""
	});
	var url = encodeURI(params.url);
	var code = encodeURI(params.code);
	var form = new FormData();
	form.append("url", url);
	form.append("custom_code", code);
	var result = (await (await fetch("https://api.shrtco.de/v2/shorten", {
		method: "POST", 
		body: form 
	})).json());
	if (result.ok === true) {
		return result;
	} else {
		throw new APIError({
			code: result.error_code,
			message: result.error
		});
	}
};

async function emoji(params) {
	if (!params.url)throw new APIError({
		code: -2,
		message: "You forgot parameter \"url\""
	});
	var url = encodeURI(params.url);
	var result = (await (await fetch(`https://api.shrtco.de/v2/shorten?emoji&url=${url}`)).json());
	if (result.ok === true){
		return result;
	} else {
		throw new APIError({
			code: result.error_code,
			message: result.error
		});
	}
};
/*
*/
async function pass(params) {
	if (!params.url)throw new APIError({
		code: -2,
		message: "You forgot parameter \"url\""
	});
	if (!params.pass)throw new APIError({
		code: -2,
		message: "You forgot parameter \"pass\""
	});
	var url = encodeURI(params.url);
	var pass = encodeURI(params.pass);
	var form = new FormData();
	form.append("url", url);
	form.append("password", pass);
	var result = (await (await fetch("https://api.shrtco.de/v2/shorten", {
		method: "POST", 
		body: form 
	})).json());
	if (result.ok === true) {
		return result;
	} else {
		throw new APIError({
			code: result.error_code,
			message: result.error
		});
	}
};
module.exports = {
	short,
	info,
	custom,
	emoji,
	pass
};
},{"node-fetch":"node_modules/node-fetch/browser.js","form-data":"node_modules/shrtco.de/node_modules/form-data/lib/browser.js"}],"script.js":[function(require,module,exports) {
var link = document.querySelector("#link");
var shortenItButton = document.querySelector("#shortenIt");
var appendingUl = document.querySelector("#linkAppend");
var linkAppendTemplate = document.querySelector("#linkAppendTemplate");
var LINKS = "Links_KEY";
var shortLINKS = "shortLinks_KEY";

window.onclick = function (e) {
  if (e.target.className === "copy") {
    var innerTextAll = e.target.closest(".linkshortandbutton").innerText; // get the array of text and seperate them using split and then taking the first one copying it to the clipboard "Copyed ! 😎";

    var arrayOfinnerTextAll = innerTextAll.split("\n")[0];
    navigator.clipboard.writeText(arrayOfinnerTextAll);
    e.target.innerText = "Copyed ! 😎";
  }
};

var scode = require("shrtco.de");

var shortenLinksArray = renderLinks(shortLINKS); // Creating a array fro storing the links in localStorage and the rendering them using forEach

var linksStringArray = renderLinks(LINKS); // shortenLinksArray.forEach(renderLinkToTemplate);

for (var i = 0; i < linksStringArray.length; i++) {
  renderLinkToTemplate(linksStringArray[i], shortenLinksArray[i]);
}

shortenItButton.addEventListener("click", function (e) {
  e.preventDefault;

  if (link.value == "") {
    link.classList.add("active");
    link.placeholder = "Paste your 🔗 here FIRST ✌";
    return;
  } else {
    link.classList.remove("active");
    link.placeholder = "Paste the 🔗 here...";
  }

  var linkname = link.value; //   saving it to the localStorage
  //   rendering it to the template wiz appending and calling it in the promise below
  //   Shortnening it using the api

  shortenLink(linkname);
  link.value = "";
});

function shortenLink(linkname) {
  scode.short({
    url: linkname
  }).then(function (res) {
    var shortenedLink = res.result.short_link;
    shortenLinksArray.push(shortenedLink);
    linksStringArray.push(linkname);
    saveToLinksLocal(LINKS, linksStringArray);
    saveToLinksLocal(shortLINKS, shortenLinksArray);
    renderLinkToTemplate(linkname, shortenedLink);
  }).catch(function (error) {
    return alert("Wrong URL 🙅‍♂️");
  });
}

function renderLinkToTemplate(linkname, shortenedLink) {
  var templateClone = linkAppendTemplate.content.cloneNode(true);
  var urlname = templateClone.querySelector("#link_copy");
  var shortUrlName = templateClone.querySelector("#shortened");
  shortUrlName.innerText = shortenedLink;
  urlname.innerText = linkname;
  appendingUl.appendChild(templateClone);
}

function renderLinks(Link) {
  var linksRender = localStorage.getItem(Link);
  return JSON.parse(linksRender) || [];
}

function saveToLinksLocal(Name, arr) {
  localStorage.setItem(Name, JSON.stringify(arr));
}
},{"shrtco.de":"node_modules/shrtco.de/index.js"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "52380" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","script.js"], null)
//# sourceMappingURL=/script.75da7f30.js.map
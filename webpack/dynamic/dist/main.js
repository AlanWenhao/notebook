(function(modules, runtime) {
	var installedModules = {};
	var installedChunks = {
		main: 0
	};
	function __webpack_require__(moduleId) {
		if (installedModules[moduleId]) {
			return installedModules[moduleId].exports;
		}
		var module = installedModules[moduleId] = {
			i: moduleId,
			l: false,
			exports: {}
		};
		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
		module.l = true;
		return module.exports;
	}
	__webpack_require__.e = function(chunkId) {
		return new Promise((resovle, reject) => {
			installedChunks[chunkId] = resovle;
			let script = document.createElement('script');
			script.src = chunkId;
			document.body.appendChild(script);
		});
	}
	__webpack_require__.t = function(value) {
		value = __webpack_require__(value);
		return {
		default:
			value
		};
	}
	window.webpackJsonp = (chunkId, moreModules) => {
		for (moduleId in moreModules) {
			modules[moduleId] = moreModules[moduleId];
		}
		installedChunks[chunkId]();
		installedChunks[chunkId] = 0;
	}
	function startup() {
		return __webpack_require__("./src/index.js");
	};
	return startup();
  })({
	
			"./src/index.js": (function(module, exports, __webpack_require__) {
				let button = document.createElement('button');
button.innerHTML = '点我点我';
button.addEventListener('click', event => {
  debugger;
  __webpack_require__.e("src_hello_js.js").then(__webpack_require__.t.bind(__webpack_require__, "./src/hello.js")).then(result => {
    alert(result.default);
  });
});
document.body.appendChild(button);
			 }),
	
  });
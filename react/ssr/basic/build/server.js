/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/server/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/containers/Counter.js":
/*!***********************************!*\
  !*** ./src/containers/Counter.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("throw new Error(\"Module build failed (from ./node_modules/babel-loader/lib/index.js):\\nSyntaxError: /Users/admin/alan/notebook/react/ssr/basic/src/containers/Counter.js: Support for the experimental syntax 'classProperties' isn't currently enabled (4:11):\\n\\n\\u001b[0m \\u001b[90m 2 | \\u001b[39m\\u001b[0m\\n\\u001b[0m \\u001b[90m 3 | \\u001b[39m\\u001b[36mclass\\u001b[39m \\u001b[33mCounter\\u001b[39m \\u001b[36mextends\\u001b[39m \\u001b[33mComponent\\u001b[39m {\\u001b[0m\\n\\u001b[0m\\u001b[31m\\u001b[1m>\\u001b[22m\\u001b[39m\\u001b[90m 4 | \\u001b[39m    state \\u001b[33m=\\u001b[39m {\\u001b[0m\\n\\u001b[0m \\u001b[90m   | \\u001b[39m          \\u001b[31m\\u001b[1m^\\u001b[22m\\u001b[39m\\u001b[0m\\n\\u001b[0m \\u001b[90m 5 | \\u001b[39m        number\\u001b[33m:\\u001b[39m \\u001b[35m0\\u001b[39m\\u001b[33m,\\u001b[39m\\u001b[0m\\n\\u001b[0m \\u001b[90m 6 | \\u001b[39m    }\\u001b[0m\\n\\u001b[0m \\u001b[90m 7 | \\u001b[39m    render() {\\u001b[0m\\n\\nAdd @babel/plugin-proposal-class-properties (https://git.io/vb4SL) to the 'plugins' section of your Babel config to enable transformation.\\n    at Object.raise (/Users/admin/alan/notebook/react/ssr/basic/node_modules/@babel/parser/lib/index.js:3834:17)\\n    at Object.expectPlugin (/Users/admin/alan/notebook/react/ssr/basic/node_modules/@babel/parser/lib/index.js:5147:18)\\n    at Object.parseClassProperty (/Users/admin/alan/notebook/react/ssr/basic/node_modules/@babel/parser/lib/index.js:8167:12)\\n    at Object.pushClassProperty (/Users/admin/alan/notebook/react/ssr/basic/node_modules/@babel/parser/lib/index.js:8131:30)\\n    at Object.parseClassMemberWithIsStatic (/Users/admin/alan/notebook/react/ssr/basic/node_modules/@babel/parser/lib/index.js:8070:14)\\n    at Object.parseClassMember (/Users/admin/alan/notebook/react/ssr/basic/node_modules/@babel/parser/lib/index.js:8007:10)\\n    at withTopicForbiddingContext (/Users/admin/alan/notebook/react/ssr/basic/node_modules/@babel/parser/lib/index.js:7962:14)\\n    at Object.withTopicForbiddingContext (/Users/admin/alan/notebook/react/ssr/basic/node_modules/@babel/parser/lib/index.js:7133:14)\\n    at Object.parseClassBody (/Users/admin/alan/notebook/react/ssr/basic/node_modules/@babel/parser/lib/index.js:7939:10)\\n    at Object.parseClass (/Users/admin/alan/notebook/react/ssr/basic/node_modules/@babel/parser/lib/index.js:7913:10)\\n    at Object.parseStatementContent (/Users/admin/alan/notebook/react/ssr/basic/node_modules/@babel/parser/lib/index.js:7231:21)\\n    at Object.parseStatement (/Users/admin/alan/notebook/react/ssr/basic/node_modules/@babel/parser/lib/index.js:7199:17)\\n    at Object.parseBlockOrModuleBlockBody (/Users/admin/alan/notebook/react/ssr/basic/node_modules/@babel/parser/lib/index.js:7757:25)\\n    at Object.parseBlockBody (/Users/admin/alan/notebook/react/ssr/basic/node_modules/@babel/parser/lib/index.js:7744:10)\\n    at Object.parseTopLevel (/Users/admin/alan/notebook/react/ssr/basic/node_modules/@babel/parser/lib/index.js:7164:10)\\n    at Object.parse (/Users/admin/alan/notebook/react/ssr/basic/node_modules/@babel/parser/lib/index.js:8565:17)\\n    at parse (/Users/admin/alan/notebook/react/ssr/basic/node_modules/@babel/parser/lib/index.js:10537:38)\\n    at parser (/Users/admin/alan/notebook/react/ssr/basic/node_modules/@babel/core/lib/transformation/normalize-file.js:170:34)\\n    at normalizeFile (/Users/admin/alan/notebook/react/ssr/basic/node_modules/@babel/core/lib/transformation/normalize-file.js:138:11)\\n    at runSync (/Users/admin/alan/notebook/react/ssr/basic/node_modules/@babel/core/lib/transformation/index.js:44:43)\\n    at runAsync (/Users/admin/alan/notebook/react/ssr/basic/node_modules/@babel/core/lib/transformation/index.js:35:14)\\n    at process.nextTick (/Users/admin/alan/notebook/react/ssr/basic/node_modules/@babel/core/lib/transform.js:34:34)\\n    at _combinedTickCallback (internal/process/next_tick.js:131:7)\\n    at process._tickCallback (internal/process/next_tick.js:180:9)\");\n\n//# sourceURL=webpack:///./src/containers/Counter.js?");

/***/ }),

/***/ "./src/server/index.js":
/*!*****************************!*\
  !*** ./src/server/index.js ***!
  \*****************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_dom_server__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom/server */ \"react-dom/server\");\n/* harmony import */ var react_dom_server__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom_server__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _containers_Counter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../containers/Counter */ \"./src/containers/Counter.js\");\n/* harmony import */ var _containers_Counter__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_containers_Counter__WEBPACK_IMPORTED_MODULE_2__);\nvar express = __webpack_require__(/*! express */ \"express\");\n\nvar app = express();\n\n // import Home from '../containers/Home';\n\n\napp.get('/', function (req, res) {\n  var htmlStr = Object(react_dom_server__WEBPACK_IMPORTED_MODULE_1__[\"renderToString\"])(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_containers_Counter__WEBPACK_IMPORTED_MODULE_2___default.a, null));\n  console.log(htmlStr);\n  res.send(\"\\n        <!DOCTYPE html>\\n        <html lang=\\\"en\\\">\\n        <head>\\n            <meta charset=\\\"UTF-8\\\">\\n            <meta name=\\\"viewport\\\" content=\\\"width=device-width, initial-scale=1.0\\\">\\n            <meta http-equiv=\\\"X-UA-Compatible\\\" content=\\\"ie=edge\\\">\\n            <title>Document</title>\\n        </head>\\n        <body>\".concat(htmlStr, \"</body>\\n        </html>\\n    \"));\n});\napp.listen(3000, function () {\n  console.log('server is running on https://localhost:3000');\n});\n\n//# sourceURL=webpack:///./src/server/index.js?");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"express\");\n\n//# sourceURL=webpack:///external_%22express%22?");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"react\");\n\n//# sourceURL=webpack:///external_%22react%22?");

/***/ }),

/***/ "react-dom/server":
/*!***********************************!*\
  !*** external "react-dom/server" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"react-dom/server\");\n\n//# sourceURL=webpack:///external_%22react-dom/server%22?");

/***/ })

/******/ });
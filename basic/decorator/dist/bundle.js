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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("__webpack_require__(/*! ./man/index */ \"./src/man/index.js\");\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/man/index.js":
/*!**************************!*\
  !*** ./src/man/index.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("var _dec, _class, _class2;\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }\n\nfunction decorateArmour(target, key, descriptor) {\n  var method = descriptor.value;\n  var moreDef = 100;\n  var ret;\n\n  descriptor.value = function () {\n    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {\n      args[_key] = arguments[_key];\n    }\n\n    args[0] += moreDef;\n    ret = method.apply(target, args);\n    return ret;\n  };\n\n  return descriptor;\n}\n\nfunction decorateLight(target, key, descriptor) {\n  var method = descriptor.value;\n  var moreAtk = 50;\n  var ret;\n\n  descriptor.value = function () {\n    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {\n      args[_key2] = arguments[_key2];\n    }\n\n    args[1] += moreAtk;\n    ret = method.apply(target, args);\n    return ret;\n  };\n}\n\nfunction addFly(canFly) {\n  return function (target) {\n    target.canFly = canFly;\n    var extra = canFly ? '(技能加成：飞行能力)' : '';\n    var method = target.prototype.toString;\n\n    target.prototype.toString = function () {\n      for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {\n        args[_key3] = arguments[_key3];\n      }\n\n      return method.apply(target.prototype, args) + extra;\n    };\n\n    return target;\n  };\n}\n\nvar Man = (_dec = addFly(true), _dec(_class = (_class2 =\n/*#__PURE__*/\nfunction () {\n  function Man() {\n    var def = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 2;\n    var atk = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 3;\n    var hp = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 3;\n\n    _classCallCheck(this, Man);\n\n    this.init(def, atk, hp);\n  }\n\n  _createClass(Man, [{\n    key: \"init\",\n    value: function init(def, atk, hp) {\n      this.def = def;\n      this.atk = atk;\n      this.hp = hp;\n    }\n  }, {\n    key: \"toString\",\n    value: function toString() {\n      return \"\\u9632\\u5FA1\\u529B:\".concat(this.def, \",\\u653B\\u51FB\\u529B:\").concat(this.atk, \",\\u8840\\u91CF:\").concat(this.hp);\n    }\n  }]);\n\n  return Man;\n}(), (_applyDecoratedDescriptor(_class2.prototype, \"init\", [decorateLight, decorateArmour], Object.getOwnPropertyDescriptor(_class2.prototype, \"init\"), _class2.prototype)), _class2)) || _class);\nvar tony = new Man();\nconsole.log(\"\\u5F53\\u524D\\u72B6\\u6001 ===> \".concat(tony));\n\n//# sourceURL=webpack:///./src/man/index.js?");

/***/ })

/******/ });
(function (factory) {
  typeof define === 'function' && define.amd ? define(factory) :
  factory();
}((function () { 'use strict';

  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
  }

  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }

  function _iterableToArrayLimit(arr, i) {
    if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) {
      return;
    }

    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance");
  }

  var errCatch = {
    init: function init(cb) {
      window.onerror = function (message, source, lineno, colno, error) {
        var info = {
          message: error.message,
          name: error.name
        };
        var stack = error.stack;
        var matchUrl = stack.match(/http:\/\/[^\n]*/)[0];
        info.filename = matchUrl.match(/http:\/\/(?:\S*)\.js/)[0];

        var _matchUrl$match = matchUrl.match(/:(\d+):(\d+)/),
            _matchUrl$match2 = _slicedToArray(_matchUrl$match, 3),
            row = _matchUrl$match2[1],
            colume = _matchUrl$match2[2];

        info.row = row;
        info.colume = colume;
        cb(info);
      };
    }
  }; // 待解决的问题
  // 因为上线的代码都是通过压缩的，需要从 source-map 反解回来才能够正常打印出js报错位置
  // 不能捕获promise的错误

  /**
   * 监控页面的性能
   * 监控静态资源的加载情况
   * 监控ajax发送情况
   * 监控页面错误
   * 监控用户的行为
   */
  errCatch.init(function (data) {
    console.log('错误捕获', data);
  });

})));

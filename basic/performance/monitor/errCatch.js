export default {
  init(cb) {
    window.onerror = function(message, source, lineno, colno, error) {
      let info = {
        message: error.message,
        name: error.name
      }
      let stack = error.stack;
      let matchUrl = stack.match(/http:\/\/[^\n]*/)[0];
      info.filename = matchUrl.match(/http:\/\/(?:\S*)\.js/)[0];
      let [, row, colume] = matchUrl.match(/:(\d+):(\d+)/);
      info.row = row;
      info.colume = colume;
      cb(info);
    }
  }
}

// 待解决的问题
// 因为上线的代码都是通过压缩的，需要从 source-map 反解回来才能够正常打印出js报错位置
// 不能捕获promise的错误

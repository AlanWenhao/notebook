// 发送请求的监控一般要监控两种
// 一种是 xhr 的，一种是 fetch
export default {
  init(cb) {
    const xhr = window.XMLHttpRequest;
    const oldOpen = xhr.prototype.open;
    xhr.prototype.open = function(method, url, async, username, password) {
      this.info = {
        method, url, async, username, password
      }
      return oldOpen.apply(this, arguments);
    }

    const oldSend = xhr.prototype.send;
    xhr.prototype.send = function(value) {
      const start = Date.now();
      let fn = (type) => () => {
        this.info.time = Date.now() - start;
        this.info.requestSize = value ? value.length : 0;
        this.info.respenseSize = this.responseText.length;
        cb(this.info)
      }
      this.addEventListener('load', fn('load'), false);
      this.addEventListener('error', fn('error'), false);
      this.addEventListener('abort', fn('abort'), false);

      return oldSend.apply(this, arguments);
    }
  }

}

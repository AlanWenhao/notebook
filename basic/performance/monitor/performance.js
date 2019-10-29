const precessData = (p) => {
  const data = {
    prevPage: p.fetchStart - p.navigationStart,
    redirect: p.redirectEnd - p.redirectStart, // 充定向的时长
    dns: p.domainLookupEnd  - p.domainLookupStart, // dns解析时长
    connect: p.connectEnd - p.connectStart, // tcp连接时长
    send: p.responseEnd - p.requestStart, // 从请求到相应的时间
    ttfb: p.responseEnd - p.navigationStart, // 首字节接收到的时长
    domReady: p.domInteractive - p.domLoading, // dom准备时长
    // 白屏时间
    whiteScreen: p.domLoading - p.navigationStart,
    dom: p.domComplete - p.domLoading, // dom解析时间
    load: p.loadEventEnd - p.navigationStart, // window.onLoad执行时间
    total: p.loadEventEnd - p.navigationStart
  }

  return data;
}
// dom加载完且其中的资源请求完
const load = (cb) => {
  let timer;
  const check = () => {
    if (performance.timing.loadEventEnd) {
      clearTimeout(timer);
      cb();
    } else {
      timer = setTimeout(check, 100);
    }
  }
  window.addEventListener('load', check, false);
}

// dom加载完
const domready = (cb) => {
  let timer;
  const check = () => {
    if (performance.timing.domInteractive) {
      clearTimeout(timer);
      cb();
    } else {
      timer = setTimeout(check, 100);
    }
  }
  window.addEventListener('DOMContentLoaded', check, false);
}

export default {
  init(cb) {
    domready(() => {
      const perfData = performance.timing;
      const data = precessData(perfData);
      data.type = 'dom ready';
      cb(data);
    });
    load(() => {
      const perfData = performance.timing;
      const data = precessData(perfData);
      data.type = 'loaded';
      cb(data);
    })
  }
}

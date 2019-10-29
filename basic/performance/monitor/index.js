/**
 * 监控页面的性能
 * 监控静态资源的加载情况
 * 监控ajax发送情况
 * 监控页面错误
 * 监控用户的行为
 */
// import perf from './performance';

// const formatData = (obj) => {
//   let arr = [];
//   for (let key in obj) {
//     arr.push(`${key}=${obj[key]}`);
//   }
//   return arr.join('&');
// }

// perf.init((data) => {
//   new Image().src = 'p.gif?' + formatData(data)
//   console.log(data);
// });

/**
 * 统计静态组件加载
 */
// import resource from './resource';
// resource.init((data) => {
//   console.log(data);
// });


/**
 * 监控ajax发送时间
 * 面向切面 给原生的 xhr 中加入逻辑
 */
// import xhr from './xhr';
// xhr.init((data) => {
//   console.log('监控ajax', data);
// })

/**
 * 监控
 * 没有的功能：捕获promise的错误，上线后 source-map 的反解
 */
import errCatch from './errCatch';
errCatch.init((data) => {
  console.log('错误捕获', data);
});

// loader本质上是一个函数
// content就是源文件或者上一个loader返回的内容
// module.exports = function (content, map, meta) {
//   // console.log(content);
//   console.log(111);
//   return content;
// }

// 下面这种写法和上面那种写法是一样的（同步loader）
module.exports = function (content, map, meta) {
  console.log(111);
  // 第一个参数是是否有错误，第三四个参数是可选的
  this.callback(null, content, map, meta);
}


// pitch方法会根据loader的顺序从前往后执行
module.exports.pitch = function () {
  console.log('pitch 111');
}
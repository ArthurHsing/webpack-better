// loader本质上是一个函数

// 异步loader
module.exports = function (content, map, meta) {
  console.log(222);
  const callback = this.async();
  setTimeout(() => {
    callback(null, content)
  }, 1000)
  console.log('loader2中的异步')
}
module.exports.pitch = function () {
  console.log('pitch 222');
}
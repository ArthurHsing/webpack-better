// loader本质上是一个函数

// 异步loader
module.exports = function (content, map, meta) {
  console.log(222);
  // 调用this.async() 告诉webpack这是一个异步loader，需要等待 callback() 回调之后再进行下一个loader处理 
  const callback = this.async();
  setTimeout(() => {
    callback(null, content)
  }, 1000)
  console.log('loader2中的异步')
}
module.exports.pitch = function () {
  console.log('pitch 222');
}
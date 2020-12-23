// loader本质上是一个函数
// content就是源文件的内容
module.exports = function (content, map, meta) {
  console.log(content);
  return content;
}
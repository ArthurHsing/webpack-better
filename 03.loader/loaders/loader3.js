//getOptions方法可以来获取loader的选项（这个包webpack没有自带）
const { getOptions } = require('loader-utils');
// 验证options是不是符合规范（这个包是webpack内部自带的包）
const { validate } = require('schema-utils');

const schema = require('./schema');

module.exports = function (content, map, meta) {
  // 获取options
  const options = getOptions(this);

  console.log(333, options);

  // 校验options是否合法
  validate(schema, options, {
    name: 'loader3'
  })

  return content;
}
module.exports.pitch = function () {
  console.log('pitch 333');
}
// webpack5默认有一些entry和output的配置，所以可以不用写

const path = require('path');

module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        // loader: path.resolve(__dirname, 'loaders', 'loader1')
        // loader: 'loader1' //在resolveLoader里面指定了寻找的路径就不用再在这里具体指定路径了
        // 多个loader用use，是一个数组，且loader从后往前执行
        // 如果loader里面有pitch方法，那么pitch方法会根据loader的顺序从前往后执行一遍
        use: [
          'loader1',
          'loader2',
          'loader3'
        ]
      }
    ]
  },
  // 配置loader的解析规则
  resolveLoader: {
    // 指定找loader去哪个地方找
    modules: [
      // 这是默认值
      'node_modules',
      // 指定自己的
      path.resolve(__dirname, 'loaders')
    ]
  }
}
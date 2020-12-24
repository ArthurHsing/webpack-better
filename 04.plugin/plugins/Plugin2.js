const fs = require('fs');
const util = require('util');
const path = require('path');

const webpack = require('webpack');
const { RawSource } = webpack.sources;

// fs.readFile方法变成基于promise风格的异步方法
const readFile = util.promisify(fs.readFile);

class Plugin2 {
  apply(compiler) {
    compiler.hooks.thisCompilation.tap('Plugin2', (compilation, compilationParams) => {
      // debugger;
      // console.log(compilation);
      // 添加资源
      compilation.hooks.additionalAssets.tapAsync('Plugin2', async (cb) => {
        // debugger;
        // console.log(compilation);

        // 往要输出的资源中，添加一个a.txt
        const content = 'hello, plugin';
        compilation.assets['a.txt'] = {
          // 文件大小
          size() {
            return content.length;
          },
          // 文件内容
          source() {
            return content;
          }
        }
        const data = await readFile(path.resolve(__dirname, 'b.txt'));
        // RawSource方法可以生成像上面那样的数据结构
        // compilation.assets['b.txt'] = new RawSource(data);
        // 下面这种写法等价于上面这种写法
        compilation.emitAsset('b.txt', new RawSource(data));
        cb();
      })
    })
  }
};

module.exports = Plugin2; 
const { SyncHook, SyncBailHook, AsyncParallelHook, AsyncSeriesHook } = require('tapable');

class Lesson {
  constructor() {
    // 初始化hooks
    this.hooks = {
      // 同步hooks,任务会依次执行
      // go: new SyncHook(['address'])
      //SyncBailHook：一旦有返回值就会退出~
      go: new SyncBailHook(['address']),
      // 异步hooks
      // 异步的hooks也可以在tap里面注册同步事件，直接用tap就行
      // AsyncParallelHook：异步并行
      leave: new AsyncParallelHook(['name', 'age'])
      // AsyncSeriesHook：异步串行
      // leave: new AsyncSeriesHook(['name', 'age'])
    }
  }
  tap() {
    // 往hooks容器注册事件/添加回调函数
    this.hooks.go.tap('class0318', (address) => {
      console.log('class0318', address);
      // 一有返回值,bail就会退出
      return 111;
    })
    this.hooks.go.tap('class0410', (address) => {
      console.log('class0410', address);
    })
    this.hooks.leave.tapAsync('class0510', (name, age, cb) => {
      setTimeout(() => {
        console.log('class0510', name, age);
        cb();
      }, 2000);
    })
    this.hooks.leave.tapPromise('class0610', (name, age) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          console.log('class0610', name, age);
          resolve();
        }, 1000);
      })
    })
    // 用异步的hook定义同步的事件
    // this.hooks.leave.tap('class0410', (address) => {
    //   console.log('class0410', address);
    // })
  }
  start() {
    // 触发hooks
    this.hooks.go.call('c318');
    this.hooks.leave.callAsync('jack', 18, function () {
      // 代表所有leave容器中的函数触发完了，才触发
      console.log('end');
    });
  }
}

const l = new Lesson();
l.tap();
l.start();
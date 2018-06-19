/**
 * 循环执行一项任务 task:{}
 * 循环执行一系列任务，且任务之间有时差 task:[]
 * start:是否在项目最开始执行
 * delayTime:第一次执行的延迟，如果配置start为true则此项无效
 * func: 需要执行的函数
 * time: 间隔时间
 */
// 示例
// testMoreTaskBegin: {
//   start: true,
//   delayTime: 1000,
//   task: [
//     {func: () => console.log('testMoreTaskBegin1'), time: 1000},
//     {func: () => console.log('testMoreTaskBegin2'), time: 1000},
//     {func: () => console.log('testMoreTaskBegin3'), time: 1000},
//   ]
// },

export default {
  symbolsRefresh: {},
  topCurrency: {},
  topCurrencyRoll: {},
  noticeRoll: {},
  countDown: {},
  verifyCountDown: {},
  swiper: {}
}

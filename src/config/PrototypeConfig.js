const NUMBER_VALUE = [1000000000, 1000000, 1000, 1, 0.1, 0.01]; //数字分类
const NUMBER_SUFFIX_ARR = ['亿', '万']; // 数字后缀
const MONEY_FIX = {
  cny: {
    up: {prefix: '¥ '},
    stable: {prefix: '¥ '},
    down: {prefix: '¥ '}
  },
  usd: {
    up: {prefix: '$ '},
    stable: {prefix: '$ '},
    down: {prefix: '$ '}
  },
  btc: {
    up: {prefix: '<img src="/static/icon/btc_up@3x.png" style="position:relative; width: 8px; height: 17px; top: 2px;">'},
    stable: {prefix: '<img src="/static/icon/btc@3x.png" style="position:relative; width: 8px; height: 17px; top: 2px;">'},
    down: {prefix: '<img src="/static/icon/btc_down@3x.png" style="position:relative; width: 8px; height: 17px; top: 2px;">'}
  },
  eth: {
    up: {prefix: '<img src="/static/icon/eth_up@3x.png" style="position:relative; width: 11px; height: 13px; top: 2px;">'},
    stable: {prefix: '<img src="/static/icon/eth@3x.png" style="position:relative; width: 11px; height: 13px; top: 2px;">'},
    down: {prefix: '<img src="/static/icon/eth_down@3x.png" style="position:relative; width: 11px; height: 13px; top: 2px;">'}
  },
}
const NUMBER_FUNC = [];// 对不同大小数字操作的函数数组
NUMBER_FUNC.push(number => parseFloat((number / 100000000).toFixed(2)));
NUMBER_FUNC.push(number => parseFloat((number / 10000).toFixed(2)));
NUMBER_FUNC.push(number => parseInt(number.toFixed()));
NUMBER_FUNC.push(number => parseFloat(number.toFixed(2)));
NUMBER_FUNC.push(number => parseFloat(number.toFixed(4)));
NUMBER_FUNC.push(number => parseFloat(number.toFixed(6)));
NUMBER_FUNC.push(number => parseFloat(number.toFixed(8)));

export default {
  base: {
    format: {
      numberValue: NUMBER_VALUE,
      numberSuffixArr: NUMBER_SUFFIX_ARR,
      numberFunc: NUMBER_FUNC,
      moneyFix: MONEY_FIX
    },
    curNameSuffix:{
      digable:'<b style="color: #000"> *</b>',
      predigable:'<b style="color: #000"> **</b>',
      ifo:'<img src="/static/icon/ifo@3x.png" style="position:relative; width: 22px; height: 15px; top: 2px;">',
    }
  },
  core: {
    toPercent: {
      number: 2,
      perfix: ['+', '-', '']
    },
  }


}

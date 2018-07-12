import JsonBig from 'json-bigint'
import { BigNumber } from "bignumber.js";

JSON.stringify = (...parmas)=>{
  // console.log("修改JSON.stringify", ...parmas);
  // let res =
  // console.log("修改JSON.stringify结果", res);
  return JsonBig.stringify(...parmas)
}

JSON.parse = (...parmas)=>{
  // console.log("修改JSON.parse", ...parmas);
  return JsonBig.parse(...parmas)
}

const NUMBER_SUFFIX_ARR = []; // 数字后缀格式{value:10000,suffix:'万'},{value:100000000,suffix:'亿'}
const NUMBER_PREFIX_ARR = {
  cny: {
    up: {prefix: '¥'},
    stable: {prefix: '¥'},
    down: {prefix: '¥'}
  },
  usd: {
    up: {prefix: '$'},
    stable: {prefix: '$'},
    down: {prefix: '$'}
  }
}

const NUMBER_GENERAL_VALUE = [1000, 1, 0.1, 0.01]; //数字分类
const GENERAL_DECIMAL_LENGTH = [];//小数部分最小长度
const NUMBER_GENERAL_FUNC = [];// 对不同大小数字操作的函数数组
NUMBER_GENERAL_FUNC.push(number => parseInt(number.toFixed()));
NUMBER_GENERAL_FUNC.push(number => parseFloat(number.toFixed(2)));
NUMBER_GENERAL_FUNC.push(number => parseFloat(number.toFixed(4)));
NUMBER_GENERAL_FUNC.push(number => parseFloat(number.toFixed(6)));
NUMBER_GENERAL_FUNC.push(number => parseFloat(number.toFixed(8)));

const NUMBER_DIGITAL_VALUE = [100, 0.1, 0.01]; //数字分类
const DIGITAL_DECIMAL_LENGTH = [2, 4, 6, 8];//小数部分最小长度
const NUMBER_DIGITAL_FUNC = [];// 对不同大小数字操作的函数数组
NUMBER_DIGITAL_FUNC.push(number => parseFloat(number.toFixedWithoutUp(2)));
NUMBER_DIGITAL_FUNC.push(number => parseFloat(number.toFixedWithoutUp(4)));
NUMBER_DIGITAL_FUNC.push(number => parseFloat(number.toFixedWithoutUp(6)));
NUMBER_DIGITAL_FUNC.push(number => parseFloat(number.toFixedWithoutUp(8)));

const NUMBER_PROPERTY_VALUE = []; //数字分类
const PROPERTY_DECIMAL_LENGTH = [8];//小数部分最小长度
const NUMBER_PROPERTY_FUNC = [];// 对不同大小数字操作的函数数组
NUMBER_PROPERTY_FUNC.push(number => parseFloat(number.toFixedWithoutUp(8)));

const NUMBER_LEGAL_VALUE = []; //数字分类
const LEGAL_DECIMAL_LENGTH = [2];//小数部分最小长度
const NUMBER_LEGAL_FUNC = [];// 对不同大小数字操作的函数数组
NUMBER_LEGAL_FUNC.push(number => parseFloat(number.toFixedWithoutUp(2)));

let config = {
  format: {
    numberFormat: {
      general: {
        numberValue: NUMBER_GENERAL_VALUE,
        numberFunc: NUMBER_GENERAL_FUNC,
        decimalLength: GENERAL_DECIMAL_LENGTH
      },
      digital: {
        numberValue: NUMBER_DIGITAL_VALUE,
        numberFunc: NUMBER_DIGITAL_FUNC,
        decimalLength: DIGITAL_DECIMAL_LENGTH
      },
      property: {
        numberValue: NUMBER_PROPERTY_VALUE,
        numberFunc: NUMBER_PROPERTY_FUNC,
        decimalLength: PROPERTY_DECIMAL_LENGTH
      },
      legal: {
        numberValue: NUMBER_LEGAL_VALUE,
        numberFunc: NUMBER_LEGAL_FUNC,
        decimalLength: LEGAL_DECIMAL_LENGTH
      }
    },
    numberSuffixArr: NUMBER_SUFFIX_ARR,
    numberPrefixArr: NUMBER_PREFIX_ARR,
  },
}

//末尾省去函数，传入长度，不穿参数默认省略小数点后
Number.prototype.toFixedWithoutUp = function (length) {
  length = length || 0
  let numberCache = this.toFixed(length+1)
  return Number(numberCache.substring(0, numberCache.toString().length - 1))
}

//添加前缀后缀函数，分隔符，补零函数
Number.prototype.formatFixStyle = function (para) {
  // console.log('formatFixStyle',Math.abs(this) , Math.abs(this) === 0)
  // console.log('formatFixStyle', para.name)
  // if(Math.abs(this) === 0)
  //   return ''+this
  let number = Math.abs(this),
    negative = this < 0 ? "-" : "",
    numberPrefixArr = config.format.numberPrefixArr,
    numberValue = config.format.numberValue,
    numberSuffixArr = config.format.numberSuffixArr,
    prefix = para && (para.prefix || para.name && (numberPrefixArr[para.name] && numberPrefixArr[para.name][para.type || 'stable'].prefix)) || '',
    suffix = para && (para.suffix || para.name && (numberPrefixArr[para.name] && numberPrefixArr[para.name][para.type || 'stable'].suffix)) || '',
    decimalLength = para.decimalLength || -1,
    decimalSign = para.decimalSign || '.',
    thousandSign = typeof para.thousandSign !== 'boolean' && (para.thousandSign || ',') || '',
    numberArr = (number > 0.000001 || number === 0) ? number.toString().split('.') : number.toFixed(8).split('.'),
    numberSuffix = "", decimal = numberArr[1],
    i = numberArr[0],
    j = i.length > 3 ? i.length % 3 : 0;
  decimal && decimal.length < decimalLength && new Array(decimalLength - decimal.length).fill(0).forEach(v => decimal+=v)
  numberSuffixArr.forEach(v => number>=v.value && (numberSuffix = v.suffix));
  suffix += numberSuffix;
  return prefix + negative + (j ? i.substr(0, j) + thousandSign : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousandSign) + (numberArr.length > 1 ? decimalSign + decimal : '') + suffix;
}

//专业补零函数
String.prototype.addZero = function (length) {
  let numberArr = this.split('.'), decimal = numberArr[1] || ''
  return decimal.length < length && !(new Array(length - decimal.length).fill(0).forEach(v => decimal+=v)) && numberArr[0] + '.' + decimal || this
}

//此函数不会受到精度影响
function findFlag(number, formatType) {
  let numberValue = config.format.numberFormat[formatType].numberValue,
    flag = numberValue.length;
  for (let i = 0; i < numberValue.length; i++) {
    if (number >= numberValue[i]) {
      flag = i;
      break
    }
  }
  return flag
}

//精度格式化
// TODO: 目前仅支持传入类型修改精度，有待扩展
// TODO: 无法根据其他值修改精度要求，必须扩展
Number.prototype.formatFixNumber = function (formatType) {
  // console.log('formatFixNumber',Math.abs(this) , Math.abs(this) === 0)
  if(Math.abs(this) === 0)
    return this
  formatType = formatType || 'general'
  let type = this > 0 ? 1 : -1,
    number = Math.abs(this),
    numberFunc = config.format.numberFormat[formatType].numberFunc
  if(numberFunc.length === 0)
    return type * number
  let flag = findFlag(number, formatType)
  return type * numberFunc[flag](number);
};

Number.prototype.formatFixNumberForAmount = function (price) {
  // console.log('number amount 0',this, price, price < 100)
  if(price < 100){
    // console.log('number amount 1',this.toFixedWithoutUp(4).formatFixStyle({}).addZero(4))
    return (''+this.toFixedWithoutUp(4).formatFixStyle({})).addZero(4)
  }
  // console.log('number amount 2',this.toFixedWithoutUp(6).formatFixStyle({}).addZero(6))
  return (''+this.toFixedWithoutUp(6).formatFixStyle({})).addZero(6)
}

//数字format
//number根据什么类型格式化number
//format({number:'legal',style:{name:'cny'}})
//style根据什么类型加前缀和后缀
// TODO: 因现在没有添加后缀的需求，所以可以直接根据类型补零，必须修改
Number.prototype.format = function (para) {
  let numberType = para && para.number || "general",
    style = para && para.style || {},
    decimalLength = config.format.numberFormat[numberType].decimalLength,
    number = this.formatFixNumber(numberType),
    numberTypeStyle = (numberType === 'digital' || numberType === 'legal') && {thousandSign:false} || {},
    str = number.formatFixStyle(Object.assign(style,numberTypeStyle)),
    flag = findFlag(Math.abs(number), numberType);
  // console.log('Number.prototype.format', this, str, flag, decimalLength[flag], numberType)
  if(decimalLength[flag])
    str = str.addZero(decimalLength[flag])
  return str
}

//百分比
Number.prototype.toPercent = function (type = true){
  if(type && (this*100) === 0)
    return (this*100).toFixed(2)
  if(type && (this*100) > 0)
    return `+${(this*100).toFixed(2)}%`
  return `${(this*100).toFixed(2)}%`
}

//时间戳转换
Number.prototype.toDate = function (fmt) {
  let date = new Date(this * 1000);
  return date.dateHandle(fmt)
};

// xxxx-yy-zz, hh:mm:ss
/**
 * @returns {string}
 */
Date.prototype.dateHandle = function (fmt) {
  fmt = fmt || 'yyyy-MM-dd HH:mm:ss';
  let obj =
    {
      'y': this.getFullYear(), // 年份，注意必须用getFullYear
      'M': this.getMonth() + 1, // 月份，注意是从0-11
      'd': this.getDate(), // 日期
      'w': this.getDay(),
      'H': this.getHours(), // 24小时制
      'h': this.getHours() % 12 === 0 ? 12 : this.getHours() % 12, // 12小时制
      'm': this.getMinutes(), // 分钟
      's': this.getSeconds(), // 秒
      'S': this.getMilliseconds() // 毫秒
    };
  let week = ['日', '一', '二', '三', '四', '五', '六'];
  for (let i in obj) {
    fmt = fmt.replace(new RegExp(i + '+', 'g'), function (wfy) {
      let val = obj[i] + '';
      if (i === 'w') return (wfy.length > 2 ? '星期' : '周') + week[val];
      for (let j = 0, len = val.length; j < wfy.length - len; j++) val = '0' + val;
      return wfy.length === 1 ? val : val.substring(val.length - wfy.length);
    });
  }
  return fmt;
};

//  js Number加减乘除 计算 (依赖bignumber.js) 为了保留精度
//加
Number.prototype.plus = function(num){
  return( new BigNumber(this)).plus(num)
}
// 减
Number.prototype.minus = function(num) {
  return (new BigNumber(this)).minus(num);
};
// 乘
Number.prototype.multi = function(num) {
  return (new BigNumber(this)).multipliedBy(num);
};
// 除
Number.prototype.div = function(num) {
  return (new BigNumber(this)).dividedBy(num);
};
/**
 * 全局基本方法
 */

//完全深拷贝数组和对象
const deepCopy = (obj) => {
  return JSON.parse(JSON.stringify(obj))
}

/**
 * 判断两个对象是否属性相同
 * @param  {[Object]}  a [一个对象]
 * @param  {[Object]}  b [另一个对象]
 * @return {Boolean}   [相同为true，不同为false]
 */
const isObjectValueEqual =  (a, b) => {


  let aProps = Object.keys(a);
  let bProps = Object.keys(b);


  if (aProps.length != bProps.length) {
    return false;
  }

  for (let i = 0; i < aProps.length; i++) {
    let propName = aProps[i];
    if (typeof a[propName] === 'object' || typeof b[propName] === 'object') {
      let res = this.isObjectValueEqual(a[propName], b[propName])
      if (res)
        continue;
      return res
    }
    if (a[propName] !== b[propName]) {
      return false;
    }
  }
  return true;
}



module.exports = {
  deepCopy,
  isObjectValueEqual
}


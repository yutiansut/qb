import {createHash, pbkdf2Sync} from "crypto-browserify";

function stringToBytes(str) {
  var ch,
    st,
    re = [];
  for (var i = 0; i < str.length; i++) {
    ch = str.charCodeAt(i); // get char
    st = []; // set up "stack"
    do {
      st.push(ch & 0xff); // push byte to stack
      ch = ch >> 8; // shift value down by 1 byte
    } while (ch);
    // add stack contents to result
    // done because chars have "wrong" endianness
    re = re.concat(st.reverse());
  }
  // return an array of bytes
  return re;
}

export default function getSafePass(pwd, uid) {
  // '197102307060486144'
  // console.log(pwd, uid)
  let uidArr = [], // id数组
    sum = 0, // id 求和
    halfPass = "", // 转换密码
    sha1 = createHash("sha1"), // 创建并返回一个Hash可用于使用给定生成哈希摘要的对象algorithm
    endData = "";
  for (let j = 0; j < uid.length; j++) {
    // 字符串变数组
    uidArr.push(uid[j] * 1);
  }
  // console.log('getSafePass 0', uidArr)
  sum = uidArr.reduce((a, b) => a+b, sum);
  // console.log('getSafePass 1', uidArr, sum, sum%3, pwd)
  for (let i = 0; i < pwd.length; i++) {
    // 生成新密码
    if (i % 3 !== sum % 3) {
      // console.log('getSafePass 2',halfPass)
      halfPass += pwd.substring(i, i + 1);
    }
  }
  halfPass += uid;
  // console.log('getSafePass 3', sha1, halfPass, typeof halfPass, stringToBytes(halfPass))
  sha1.update(stringToBytes(halfPass)); // 更新散列内容
  endData = sha1.digest(); //计算传递给散列的所有数据的摘要
  // console.log('getSafePass 4','pwd',pwd, sha1, halfPass, 'salt',endData,pwd.split('').map(v=>v.charCodeAt()))
  let salt = endData,
    iter = 1005,
    encryptResult = pbkdf2Sync(
      pwd,
      salt,
      iter,
      32,
      "sha1"
    ); //bit bytes
  // console.log('getSafePass 5',encryptResult,encryptResult.slice(0, 32).toString('base64'), encryptResult.toString('base64'))
  return encryptResult.toString("base64"); // Base64加密再 encode;
}

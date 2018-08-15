function Regular(regTitle, regCon, tradeData) {
  let regularObj = {
    regIp: /^(?:(?:25[0-5]|2[0-4]\d|(?!0)[01]?\d\d?|0)\.){3}(?:25[0-5]|2[0-4]\d|(?!0)[01]?\d\d?|0)$/, // ip地址
    regEmail: /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/, // email
    regPhone: /^1[3456789]\d{9}$/, // phone
    regPwd: /^(?![A-Z]+$)(?![a-z]+$)(?=.*[A-Z].*)(?!\d+$)(?![\W_]+$)\S{6,18}$/, // 密码
    regTrade: new RegExp(`^[0-9]{0,${tradeData}}$`), // 交易价格、数量
    regId: /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/, // 身份证
    regPassPort1: /^[a-zA-Z]{5,17}$/, // 护照
    regPassPort2: /^[a-zA-Z0-9]{5,17}$/ // 护照
  }
  return regularObj[regTitle].test(regCon)
}

export default Regular


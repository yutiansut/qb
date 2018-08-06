function Regular() {
  let RegularObj = {
    ip: /^(?:(?:25[0-5]|2[0-4]\d|(?!0)[01]?\d\d?|0)\.){3}(?:25[0-5]|2[0-4]\d|(?!0)[01]?\d\d?|0)$/
  }
  return RegularObj
}

export default Regular
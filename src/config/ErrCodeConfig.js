import intl from "react-intl-universal";
export default {
  "-1": {
    // msg: "FETCH错误",
    get msg() {
      return intl.get("-1");
    },
    errCode: "FETCH_ERROR"
  },
  "-2": {
    // msg: "RESPONES解析错误",
    get msg() {
      return intl.get("-2");
    },
    errCode: "RESPONES_TEXT_ERROR"
  },
  "-3": {
    // msg: "JSON解析错误",
    get msg() {
      return intl.get("-3");
    },
    errCode: "JSON_PARSE_ERROR"
  },
  "-4": {
    // msg: "压缩错误",
    get msg() {
      return intl.get("-4");
    },
    errCode: "ZIP_PARSE_ERROR"
  },
  "-5": {
    // msg: "解压缩错误",
    get msg() {
      return intl.get("-5");
    },
    errCode: "UNZIP_PARSE_ERROR"
  },
  "-6": {
    // msg: "Blob数据解析错误",
    get msg() {
      return intl.get("-6");
    },
    errCode: "BLOB_PARSE_ERROR"
  },
  1: {
    // msg: "未知错误",
    get msg() {
      return intl.get(1);
    },
    errCode: "ErrCodeUnknown"
  },
  2: {
    // msg: "数据库错误",
    get msg() {
      return intl.get(2);
    },
    errCode: "ErrCodeUnknown"
  },
  95: {
    // msg: "参数错误",
    get msg() {
      return intl.get(95);
    },
    errCode: "ErrCodeUnknown"
  },
  101: {
    // msg: "身份认证进行中",
    get msg() {
      return intl.get(101);
    },
    errCode: "ErrCodeUnknown",
    ret: 101
  },
  102: {
    // msg: "身份认证状态不识别",
    get msg() {
      return intl.get(102);
    },
    errCode: "ErrCodeUnknown"
  },
  103: {
    // msg: "身份认证已通过",
    get msg() {
      return intl.get(103);
    },
    errCode: "ErrCodeUnknown"
  },
  601: {
    // msg: "密码错误",
    get msg() {
      return intl.get(601);
    },
    errCode: "PWD_ERROR"
  },
  602: {
    // msg: "数据库错误",
    get msg() {
      return intl.get(602);
    },
    errCode: "DB_ERROR"
  },
  603: {
    // msg: "请求参数错误",
    get msg() {
      return intl.get(603);
    },
    errCode: "PARAM_ERROR"
  },
  604: {
    // msg: "无此用户",
    get msg() {
      return intl.get(604);
    },
    errCode: "USER_NO_EXIST",
    ret: 604
  },
  605: {
    // msg: "用户服务系统访问失败",
    get msg() {
      return intl.get(605);
    },
    errCode: "USER_SYS_ERROR"
  },
  606: {
    // msg: "已发送，未超时3分钟",
    get msg() {
      return intl.get(606);
    },
    errCode: "CODE_NOT_EXPIRE"
  },
  607: {
    // msg: "验证码已过期",
    get msg() {
      return intl.get(607);
    },
    errCode: "CODE_NOT_EXPIRE"
  },
  608: {
    // msg: "验证码错误",
    get msg() {
      return intl.get(608);
    },
    errCode: "CODE_NOT_EXPIRE"
  },
  609: {
    // msg: "操作类型错误",
    get msg() {
      return intl.get(609);
    },
    errCode: "CODE_NOT_EXPIRE"
  },
  610: {
    // msg: "与原密码相同",
    get msg() {
      return intl.get(610);
    },
    errCode: "CODE_NOT_EXPIRE"
  },
  611: {
    get msg() {
      return intl.get('1416')
    },
    ret: 611
  },
  612: {
    // msg: "与原密码相同",
    get msg() {
      return intl.get(612, { number: this.ft % 60 ? parseInt(this.ft / 60) + 1 : parseInt(this.ft / 60)});
    },
    errCode: "FREEZE_PASSWORD"
  },
  613: {
    // msg: "未登录",
    get msg() {
      return intl.get(613);
    },
    errCode: "UN_LOGIN"
  },
  616: {
    // msg: "未设置密码",
    get msg() {
      return intl.get(616);
    },
    errCode: "NO_SET_PASSWORD"
  },
  617: {
    // msg: "用户未实名认证",
    get msg() {
      return intl.get(617);
    },
    errCode: "NO_VERIFIED"
  },
  619: {
    // msg: "图形验证码错误",
    get msg() {
      return intl.get(619);
    },
    errCode: "NO_PICTURECODE"
  },
  620: {
    // msg: "与资金密码相同",
    get msg() {
      return intl.get(620);
    },
    errCode: "NO_PICTURECODE"
  },
  621: {
    // msg: "与登陆密码相同",
    get msg() {
      return intl.get(621);
    },
    errCode: "NO_PICTURECODE"
  },
  623: {
    // msg: "与登陆密码相同",
    get msg() {
      return intl.get(623);
    },
    errCode: "NO_PICTURECODE"
  },
  624: {
    // msg: "验证码输入错误次数过多，处于禁止输入时间内",
    get msg() {
        return intl.get(624);
    },
    errCode: "CODE_EXCESSIVE"
  },
  625: {
    // msg: "谷歌验证码输入错误次数过多，处于禁止输入时间内",
    get msg() {
        return intl.get(625);
    },
    errCode: "GCODE_EXCESSIVE"
  },
  704: {
    // msg: "24小时内修改过资金密码,存在安全保护墙",
    get msg() {
      return intl.get(704);
    },
    errCode: "ALTER_IN_24H"
  },
  705: {
    // msg: "可用数量不足",
    get msg() {
      return intl.get(705);
    },
    errCode: "NO_ENOUGH"
  },
  706: {
    // msg: "小于最小提币限额",
    get msg() {
      return intl.get(706);
    },
    errCode: "LESS_MIN_WITHDRAW"
  },
  707: {
    // msg: "不支持提币操作",
    get msg() {
      return intl.get(707);
    },
    errCode: "NO_SUPPORT_WITHDRAW"
  },
  708: {
    // msg: "提币超过当日额度",
    get msg() {
      return intl.get(708);
    },
    errCode: "OUT_LIMIT"
  },
  709: {
    // msg: "提币：查询不到from地址",
    get msg() {
      return intl.get(709);
    },
    errCode: "NO_FROM"
  },
  710: {
    // msg: "提币：查询不到to地址",
    get msg() {
      return intl.get(710);
    },
    errCode: "NO_TO"
  },
  711: {
    // msg: "cws错误",
    get msg() {
      return intl.get(711);
    },
    errCode: "CWS_ERROR"
  },
  712: {
    // msg: "提币地址格式错误",
    get msg() {
      return intl.get(712);
    },
    errCode: "ERROR_ADDRESS"
  },
  713: {
    // msg: "提币地址地址已存在",
    get msg() {
      return intl.get(713);
    },
    errCode: "ERROR_ADDRESS_EXIST"
  },
  714: {
    // msg: "不能转账给自己",
    get msg() {
      return intl.get(714);
    },
    errCode: "ERROR_ADDRESS_EXIST"
  },
  1001: {
    // msg: "连接被禁止",
    get msg() {
      return intl.get(1001);
    },
    errCode: "CODE_NOT_EXPIRE"
  },
  1002: {
    // msg: "连接时传入的Token不合法",
    get msg() {
      return intl.get(1002);
    },
    errCode: "CODE_NOT_EXPIRE"
  },

  1412: {
    get msg() {
      return intl.get(1416)
    },
    ret: 1412
  },
  1416:{
    // 市价溢出
    get msg(){
      return intl.get(1416)
    },
    ret:1416,
    errCode: 'RPC_STATUS_ORDER_MARKET_TRADE_UNSUITABLE'
  },
  1420:{
    // 当前交易对不支持交易
    get msg(){
      return intl.get(1420)
    },
    ret:1420
  },
  1421:{
    // 价格精度超出限制
    get msg(){
      return intl.get(1421)
    },
    ret: 1421
  },
  1422:{
    // 数量精度超出限制
    get msg(){
      return intl.get(1422)
    },
    ret: 1422
  },
  2001: {
    // msg: "谷歌验证失败",
    get msg() {
      return intl.get(2001);
    },
    errCode: "CODE_NOT_EXPIRE"
  },
  // ErrVerifyCanNotBeNull    = 2011 //验证方式不能为空
  // ErrEmailNotBind          = 2012 //邮箱未绑定
  // ErrPhoneNotBind          = 2013 //手机未绑定
  // ErrGoogleNotBind         = 2014 //Google验证未绑定
  2002: {
    // msg: "谷歌验证未开启",
    get msg() {
      return intl.get(2002);
    },
    errCode: "CODE_NOT_EXPIRE"
  },
  2011: {
    // msg: "//验证方式不能为空",
    get msg() {
      return intl.get(2011);
    },
    errCode: "ErrVerifyCanNotBeNull"
  },
  2012: {
    // msg: "邮箱未绑定",
    get msg() {
      return intl.get(2012);
    },
    errCode: "ErrEmailNotBind"
  },
  2013: {
    // msg: "手机未绑定",
    get msg() {
      return intl.get(2013);
    },
    errCode: "ErrPhoneNotBind"
  },
  2014: {
    // msg: "Google验证未绑定",
    get msg() {
      return intl.get(2014);
    },
    errCode: "ErrGoogleNotBind"
  },
  2200: {
    // msg: "找不到活动",
    get msg() {
      return intl.get(2200);
    },
    errCode: "CODE_NOT_ACTIVE"
  },
  2201: {
    // msg: "您已经被邀请过",
    get msg() {
      return intl.get(2201);
    },
    errCode: "AWARD_DRAWED"
  },
  2400: {
    get msg() {
      return intl.get(2400);
    },
    errCode: "AWARD_DRAWED"
  },
  2401: {
    get msg() {
      return intl.get(2401);
    },
    errCode: "AWARD_DRAWED"
  },
  2402: {
    get msg() {
      return intl.get(2402);
    },
    errCode: "AWARD_DRAWED"
  },
  2601: {
    // msg: "奖励已经领取完毕，敬请期待下次活动",
    get msg() {
      return intl.get(2601);
    },
    errCode: "ERROR_ACTIVIY_OVER"
  }
};

// PWD_ERROR = 601 //密码错误
// DB_ERROR = 602 // 数据库错误
// PARAM_ERROR = 603 // 请求参数错误
// USER_NO_EXIST = 604 // 无此用户
// USER_SYS_ERROR = 605 // 用户服务系统访问失败
// JSON_ERROR = 606 // json转化错误
// CODE_NOT_EXPIRE = 606 // 已发送，未超时3分钟
// CODE_EXPIRE = 607 // 验证码已过期
// CODE_WRONG = 608 // 验证码错误
// OP_TYPE_ERROR = 609 // 操作类型错误
// PWD_SAME = 610 // 与原密码相同
//
// // 公共错误
// ErrCodeNone = 0    // 正确
// ErrCodeUnknown = 1    // 未知错误
// ErrCodeConnectForbidden = 1001 // 连接被禁止
// ErrCodeConnectTokenInvalid = 1002 // 连接时传入的Token不合法
//
// // 业务逻辑错误
// ErrCodeGoogleAuthFailed = 2001 // 谷歌验证失败
// ErrCodeGoogleAuthDisable = 2002 // 谷歌验证未开启

/**
 * 数据显示问题
 * 主要是跟排序有关
 * 如果前端不负责显示，则排序出问题
 *
 * 所以，
 * 前后端同时处理精度问题
 *
 * 此处，也可能会使显示与实际不同
 */

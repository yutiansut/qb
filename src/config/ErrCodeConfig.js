export default {
  "-1": {
    msg: "FETCH错误",
    errCode: "FETCH_ERROR"
  },
  "-2": {
    msg: "RESPONES解析错误",
    errCode: "RESPONES_TEXT_ERROR"
  },
  "-3": {
    msg: "JSON解析错误",
    errCode: "JSON_PARSE_ERROR"
  },
  1: {
    msg: "未知错误",
    errCode: "ErrCodeUnknown"
  },
  601: {
    msg: "密码错误",
    errCode: "PWD_ERROR"
  },
  602: {
    msg: "数据库错误",
    errCode: "DB_ERROR"
  },
  603: {
    msg: "请求参数错误",
    errCode: "PARAM_ERROR"
  },
  604: {
    msg: "无此用户",
    errCode: "USER_NO_EXIST"
  },
  605: {
    msg: "用户服务系统访问失败",
    errCode: "USER_SYS_ERROR"
  },
  606: {
    msg: "已发送，未超时3分钟",
    errCode: "CODE_NOT_EXPIRE"
  },
  607: {
    msg: "验证码已过期",
    errCode: "CODE_NOT_EXPIRE"
  },
  608: {
    msg: "验证码错误",
    errCode: "CODE_NOT_EXPIRE"
  },
  609: {
    msg: "操作类型错误",
    errCode: "CODE_NOT_EXPIRE"
  },
  610: {
    msg: "与原密码相同",
    errCode: "CODE_NOT_EXPIRE"
  },
  616: {
    msg: "未设置密码",
    errCode: "NO_SET_PASSWORD"
  },
  617: {
    msg: "用户未实名认证",
    errCode: "NO_VERIFIED"
  },
  704: {
    msg: "24小时内修改过资金密码,存在安全保护墙",
    errCode: "ALTER_IN_24H"
  },
  705: {
    msg: "可用数量不足",
    errCode: "NO_ENOUGH"
  },
  706: {
    msg: "小于最小提币限额",
    errCode: "LESS_MIN_WITHDRAW"
  },
  707: {
    msg: "不支持提币操作",
    errCode: "NO_SUPPORT_WITHDRAW"
  },
  708: {
    msg: "提币超过当日额度",
    errCode: "OUT_LIMIT"
  },
  709: {
    msg: "提币：查询不到from地址",
    errCode: "NO_FROM"
  },
  710: {
    msg: "提币：查询不到to地址",
    errCode: "NO_TO"
  },
  712: {
    msg: "提币地址格式错误",
    errCode: "ERROR_ADDRESS"
  },
  1001: {
    msg: "连接被禁止",
    errCode: "CODE_NOT_EXPIRE"
  },
  1002: {
    msg: "连接时传入的Token不合法",
    errCode: "CODE_NOT_EXPIRE"
  },
  2001: {
    msg: "谷歌验证失败",
    errCode: "CODE_NOT_EXPIRE"
  },
  2002: {
    msg: "谷歌验证未开启",
    errCode: "CODE_NOT_EXPIRE"
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
import ExchangeStoreBase from '../ExchangeStoreBase'

export default class UserStore extends ExchangeStoreBase {
  constructor() {
    super();
    this.state = {
      verifyNum: '获取验证码',
      userInfo: {},
      userAuth: {},
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVaWQiOiIyMjcxNzAxMzc0NTc4Mjc4NDAiLCJuYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE1MTYyMzkwMjJ9.tr6AowdEPkZJQRnib28_dfUjY_MTmI_aNu9UN-Cl5y0',
      user_info: { // 用户信息
        uid: 12345677788,
        name: 'aaaa',
        phone: '', // 没有为空
        email: '123456677@163.com', // 没有为空
        grade: 1, // 用户等级
        score: 50000, // 等级积分
        password: true, // 是否设置登录密码
        fundpass: false, // 是否设置资金密码
        verify: 0, // 是否认证:0未认证;1认证中;2已通过;3失败
        verify_type: 0, // 认证形式:0 身份证 1 护照 2 未认证
        id_card: "", // 身份证号码
        passport: "", // 护照
        googleVerify: true, // 是否开启谷歌验证
        login_type: 0, // 登录验证 0 谷歌 1 邮箱 2 短信 3 无         2, 谷歌验证  1, 邮件  3, 短信  0,无
        cash_type: 2, // 提现验证
        fund_type: 2, // 修改资金密码验证
        notice_type: 2, // 通知设置 1 邮箱 2短信
        first_name: "", // 姓
        lastame: "", // 名
        id_card_front: null, // 身份证正面照
        id_card_back: null, // 身份证反面照
        id_card_inhand: null, // 身份证手持照
        passport_front: null, // 护照正面照
        passport_inhand: null, // 护照手持照
        passport_ad: null, // 住址证明
        state: [
          {
            time: 1529047636,
            dev: "Mac OS X 10.12.5 / Chrome 66.0.3359",
            ip: "192.168.113.101",
            ip_addr: "-", // 没有显示—
            key: "bliirya9doxnsus2zrijzyrxn4id9xsl"
          }
        ],
        session_key: "bliirya9doxnsus2zrijzyrxn4id9xsl", // 匹配是否为当前设备
      },
      recent_info: [ // 近期记录
        {
          catalog_name: "登录日志",
          detail: "Signin",
          ip: "192.168.113.101",
          ip_addr: "-",
          time: 1529047636
        },
        {
          catalog_name: "登录日志",
          detail: "Signin",
          ip: "192.168.113.101",
          ip_addr: "-",
          time: 1529047636
        },
        {
          catalog_name: "登录日志",
          detail: "Signin",
          ip: "192.168.113.101",
          ip_addr: "-",
          time: 1529047636
        }
      ],
      score_info: { // 用户积分详情
        total: 20, // 总条数
        items: [
          {
            time: 1529047636,
            event: "每日登录",
            gain: 2
          },
          {
            time: 1529047636,
            event: "每日登录",
            gain: 2
          },
          {
            time: 1529047636,
            event: "每日登录",
            gain: 2
          }
        ]
      }
    }
    this.preHandler.push(this.userPreHandler)
    this.installProxy("user", this.preHandler, this.afterHandler)
  }

  userPreHandler(app, req) {
    // if (app.state.userInfo.loginState) {
    //   let headers = new Headers();
    //   headers.set('token', app.state.userInfo.token)
    //   req.data.headers = headers;
    // }
    // req.params = Object.assign({app:0}, req.params)
    console.log('用户', app, req)
  }

  async userInfo(){ // 获取用户信息
    let userInfo = await this.Proxy.getUserInfo({"userId": 3, "token": this.state.token});
    this.state.userInfo = userInfo;
    return userInfo
  }

  async userAuth(){ // 获取用户认证信息
    let userAuth = await this.Proxy.getUserAuth({"userId": 3});
    this.state.userAuth = userAuth;
    return userAuth
  }
}

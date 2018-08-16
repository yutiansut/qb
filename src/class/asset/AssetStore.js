import ExchangeStoreBase from "../ExchangeStoreBase";

export default class AssetStore extends ExchangeStoreBase {
  constructor() {
    super("asset", "general");
    this.state = {
      // 交易对手续费
      pairFees: [
        // {
        //   id: 0,
        //   name: "ETH/BTC",
        //   maker: 0.12,
        //   taker: 0.11
        // },
      ],
      // 总资产
      totalAsset: {
        valuationBTC: 0, //总资产
        valuationEN: 0, //换算美元
        valuationCN: 0, //换算人民币
        totalQuota: 0, //24小时提现额度
        availableQuota: 0, //可用额度
        usedQuota: 0 //已用额度
      },
      wallet: [],
      //币种列表
      walletList: {},
      walletHandle: {},
      // 获取单个币种资产及提现额度
      currencyAmount: {
        coinName: "BTC",
        availableCount: 0, //可用额度
        totalCount: 0, //总额度
        frozenCount: 0, //冻结额度
        totalQuota: 0, //24H提现额度
        availableQuota: 0, //可用提现额度
        usedQuota: 0 //已用额度
      },
      //提币信息
      walletExtract: {
        minerFee: 0, //矿工费
        extractAddr: [] //提现地址
      },
      //充币地址
      coinAddress: {
        // coinId: 0, //币种ID
        // verifyNumber: 5, //最大确认数
        // coinAddress: "asdfdeagds0gfhgdfjhgfjkgfhkjgsgdsfg" //地址
      },
      //充币记录
      // chargeHistory: {},
      //提币记录
      // extractHistory: {},
      //资产记录
      assetHistory: {
        total: 0,
        orderList: []
      }
    };
    // websocket监听用户资产更新推送
    this.WebSocket.general.on("userAssetUpdate", data => {
      let { va, vae, vac, cl } = data;
      this.state.totalAsset.valuationBTC = va; //总资产
      this.state.totalAsset.valuationEN = vae; //换算美元
      this.state.totalAsset.valuationCN = vac; //换算人民币
      this.state.wallet = cl.map(({ cn, fn, cic, cid, avc, frc, va, c, w, e, vac, vae}) => {
        return {
          coinName: cn,
          fullName: fn,
          coinIcon: cic, //币种icon
          coinId: cid,
          availableCount: avc, //可用余额
          frozenCount: frc, //冻结余额
          valuationBTC: va, //btc估值
          totalCount: Number(avc).plus(frc), //总量
          valuationCN: vac,
          valuationEN: vae,
          c: c,
          w: w,
          e: e
        };
      });
      this.controller.userAssetUpdate();
      // this.recommendData = data.data
    });
  }
  setController(ctrl) {
    this.controller = ctrl;
  }
  // 获取交易对手续费
  async getFee() {
    let result = await this.Proxy.getFee({
      token: this.controller.token
    });
    result && result.length
      ? (result = result.map(v => {
          return {
            id: v.id,
            name: v.na,
            taker: v.t,
            maker: v.m
          };
        }))
      : (result = []);
    // console.log('getFee')
    // console.log(result)
    this.state.pairFees = result;
    return result;
  }
  // 获取我的QBT
  // async getMyQbt() {
  //   // console.log(this.controller.token);
  //   let result = await this.Proxy.getMyQbt({
  //     token: this.controller.token
  //   });
  //   if (result && result.id) {
  //     return {
  //       availableCount: result.aw,
  //       price: result.p,
  //       coinIcon: "",
  //       coinId: "",
  //       coinName: this.controller.configData.coin,
  //       fullName: this.controller.configData.coin,
  //       valuationCN: result.vl
  //     };
  //   }
  //   return false;
  // }

  // 获取总资产
  async getTotalAsset() {
    let { va, vae, vac, cl } = await this.Proxy.totalAsset({
      // userId: this.controller.userId,
      token: this.controller.token
    });
    this.state.wallet =
      (cl &&
        cl.map(({ cn, fn, cic, cid, avc, frc, va, c, w, e, vac, vae}) => {
          return {
            coinName: cn,
            fullName: fn,
            coinIcon: cic, //币种icon
            coinId: cid,
            availableCount: avc, //可用余额
            frozenCount: frc, //冻结余额
            valuationBTC: va, //btc估值
            totalCount: Number(avc).plus(frc),//总量
            valuationCN: vac,
            valuationEN: vae,
            c:c,
            w:w,
            e:e
          };
        })) ||
      [];
    let { toq, avq, usq } = await this.Proxy.balance({
      // userId: this.controller.userId,
      // coinId: this.state.walletList["BTC"],
      // coinName: "btc",
      id: 0,
      token: this.controller.token
    });
    this.state.totalAsset = {
      valuationBTC: va, //总资产
      valuationEN: vae, //换算美元
      valuationCN: vac, //换算人民币
      totalQuota: toq, //24小时提现额度
      availableQuota: avq, //可用额度
      usedQuota: usq //已用额度
    };
  }
  // 获取walletList
  async getWalletList() {
    let result = await this.Proxy.getAllCoinList();
    if (result && result.l && result.l.length) {
      let obj = {};
      this.controller.sort(result.l, ["n"], 1).forEach(v => {
        obj[v.n.toUpperCase()] = v.id;
        this.state.walletHandle[v.n.toUpperCase()]= {
          c: v.c,
          w: v.w,
          e: v.e
        };
      });
      this.state.walletList = obj;
    }
  }

  // 获取单个币种资产信息
  async getCurrencyAmount(coin) {
    let obj = {
      // userId: this.controller.userId,
      id: this.state.walletList[coin],
      // coinName: coin.toLowerCase(),
      token: this.controller.token
    };
    let result = await this.Proxy.balance(obj);
    if (result && result.errCode) {
      return result;
    }
    result = {
      availableCount: result.avc, //当前币种可用余额
      totalCount: result.toc, //当前币种总余额
      frozenCount: result.frc, //当前币种冻结额度
      totalQuota: result.toq, //24H提现额度
      availableQuota: result.avq, //可用提现额度
      usedQuota: result.usq
    };
    this.state.currencyAmount = result;
    return result;
  }

  // 获取充币地址
  async getChargeAddress(coin) {
    let result = await this.Proxy.chargeAddress({
      // userId: this.controller.userId,
      id: this.state.walletList[coin],
      token: this.controller.token
    });
    result.cad
      ? (this.state.coinAddress = {
          coinId: result.id, //币种ID
          verifyNumber: result.ven, //最大确认数
          coinAddress: result.cad //地址
        })
      : (this.state.coinAddress = {
          coinId: this.state.walletList[coin], //币种ID
          verifyNumber: "", //最大确认数
          coinAddress: "" //地址
        });
  }

  // 清空充提记录
  initHistory() {
    this.state.assetHistory.orderList = [];
    this.state.assetHistory.total = 0;
  }

  // 获取确认中充币信息(顶部轮播)
  async getChargeMessage() {
    let result = await this.Proxy.history({
      token: this.controller.token,
      id: -1, //如果不设定 传-1 coin id
      na: -1, //coin name
      ot: 1, //充1提2转4  注意:交易所内提币收方显示为转账  所有状态传-1，如果需要两种状态则将需要的状态相与（|） //order type
      st: -1, //不设定传-1 都传Unix秒 start time
      et: -1, //不设定传-1 都传Unix秒 end time
      ost: 0, //所有状态传-1 //order status
      p: 0, //page
      s: 0 //page size
    });
    if (result && !result.errCode) {
      return result.ol.filter(v => v.dc !== v.vc).map(v => {
        return {
          orderType: 1,
          orderStatus: v.ost,
          fullname: v.fna,
          coinIcon: v.cic,
          coinName: v.cna,
          coinId: v.cid,
          count: v.cou,
          balance: b.bal, //余额
          postAddress: v.psa, //发送地址
          receiveAddress: v.rea, //接收地址
          fee: v.fee, //手续费
          verifyCount: v.vc, //确认数
          doneCount: v.dc, //已确认数
          hashAddress: v.ha, //hash地址
          blockSite: v.bs, //点击查看交易信息的地址
          orderTime: v.t,
          orderId: v.oid
        };
      });
    }
    return [];
  }

  // 获取资产记录
  async getHistory({
    coinId,
    coinName,
    orderType,
    startTime,
    endTime,
    orderStatus,
    page,
    pageSize
  }) {
    let result = await this.Proxy.history({
      // userId: this.controller.userId,
      token: this.controller.token,
      id: coinId, //如果不设定 传-1 coin id
      na: coinName, //coin name
      ot: orderType, //充1提2转4  注意:交易所内提币收方显示为转账  所有状态传-1，如果需要两种状态则将需要的状态相与（|） //order type
      st: startTime, //不设定传-1 都传Unix秒 start time
      et: endTime, //不设定传-1 都传Unix秒 end time
      ost: orderStatus, //所有状态传-1 //order status
      p: page, //page
      s: pageSize //page size
    });
    if (result && result.errCode) {
      this.state.assetHistory.orderList = [];
      this.state.assetHistory.total = 0;
      return this.state.assetHistory;
    }
    this.state.assetHistory.orderList =
      result &&
      result.ol.map(v => {
        return {
          orderType: v.ot === 15000 ? 2 : v.ot === 5 ? 4 : v.ot === 17000 ? 8 : v.ot,
          orderStatus: v.ost,
          fullname: v.fna,
          coinIcon: v.cic,
          coinName: v.cna,
          coinId: v.cid,
          count: v.cou,
          balance: v.bla, //余额
          postAddress: v.psa, //发送地址
          receiveAddress: v.rea, //接收地址
          fee: v.fee, //手续费
          verifyCount: v.vc, //确认数
          doneCount: v.dc, //已确认数
          hashAddress: v.ha, //hash地址
          blockSite: v.bs, //点击查看交易信息的地址
          orderTime: v.t,
          orderId: v.oid
        };
      });
    page === 0 && !result.tc && (this.state.assetHistory.total = 0);
    page === 0 && result.tc && (this.state.assetHistory.total = result.tc);
    return this.state.assetHistory;
  }
  // 导出资产记录
  async exportHistory() {
    let result = await this.Proxy.history({
      // userId: this.controller.userId,
      token: this.controller.token,
      id: -1, //如果不设定 传-1 coin id
      na: -1, //coin name
      ot: -1, //充1提2转4  注意:交易所内提币收方显示为转账  所有状态传-1，如果需要两种状态则将需要的状态相与（|） //order type
      st: -1, //不设定传-1 都传Unix秒 start time
      et: -1, //不设定传-1 都传Unix秒 end time
      ost: -1, //所有状态传-1 //order status
      p: 0, //page
      s: 0 //page size
    });
    if (result && result.errCode) {
      return [];
    }
    return result.ol.map(v => {
      return {
        orderType: v.ot,
        orderStatus: v.ost,
        fullname: v.fna,
        coinIcon: v.cic,
        coinName: v.cna,
        coinId: v.cid,
        count: v.cou,
        balance: v.bla, //余额
        postAddress: v.psa, //发送地址
        receiveAddress: v.rea, //接收地址
        fee: v.fee, //手续费
        verifyCount: v.vc, //确认数
        doneCount: v.dc, //已确认数
        hashAddress: v.ha, //hash地址
        blockSite: v.bs, //点击查看交易信息的地址
        orderTime: v.t,
        orderId: v.oid
      };
    });
  }
  // 获取矿工费
  async getMinerFee(coin, address) {
    let result = await this.Proxy.minerFee({
      id: this.state.walletList[coin],
      add: address,
      token: this.controller.token
    });
    this.state.walletExtract.minerFee = result.fee;
  }
  // 获取提币地址信息
  async getwalletExtract() {
    // if (this.state.walletExtract.extractAddr.length) return;
    let result = await this.Proxy.extractAddress({
      // userId: this.controller.userId,
      token: this.controller.token
    });
    if (result && result.errCode) {
      // console.log(result);
      return result;
    }
    this.state.walletExtract.extractAddr = result.add.map(v => {
      return {
        coinId: v.id,
        coinName: v.na,
        minCount: v.mic, //最小提币数量
        addressList: v.adl.map(i => {
          return {
            addressId: i.aid,
            addressName: i.ana,
            address: i.add
          };
        })
      };
    });
    return this.state.walletExtract;
  }

  // 提交提币订单
  async extractOrder(obj, isH5) {
    obj.fundPass = this.controller.RSAencrypt(obj.fundPass);

    let result = await this.Proxy.extractOrder({
      token: this.controller.token,
      id: this.state.walletList[obj.coinName], //coin id
      na: obj.coinName.toLowerCase(), //coin name
      tad: obj.toAddr, //to addre
      a: obj.amount, //amount
      // "rm": obj.remark,// 备注，可空remark
      fp: obj.fundPass, //资金密码
      cd: obj.code, //code
      ac: obj.account, // Googlecode传空 account
      md: obj.mode,//mode
      os: 3
    });
    if (result.ri !== undefined) {
      result = {
        recordId: result.ri,
        status: result.sta, // 0 审核 1通过 2未通过 4处理
        quota: result.qut // 是否超出限额
      };
    }
    return result;
  }
  // 撤销提币申请
  async cancelOrder(id) {
    let result = await this.Proxy.cancelWithdraw({
      // userId: this.controller.userId,
      token: this.controller.token,
      aid: id
    });
    if (result === null) {
      this.state.assetHistory.orderList.forEach(v => {
        if (v.orderId === id) v.orderStatus = 3;
      });
      return this.state.assetHistory;
    }
    return result;
  }
  // 增加提现地址
  async appendAddress({ coinName, addressName, address, code, account, mode, os=3 }) {
    let result = await this.Proxy.addAddress({
      // userId: this.controller.userId,
      address: address,
      token: this.controller.token,
      id: this.state.walletList[coinName], //coin id
      na: coinName.toLowerCase(), //coin name
      ana: addressName, //address name
      add: address,//address
      cd: code,
      ac: account,
      md: mode,
      os: os
    });
    if (result && result.errCode) {
      return result;
    }

    this.state.walletExtract.extractAddr.forEach(v => {
      v.coinId === this.state.walletList[coinName] &&
        v.addressList.push({
          addressName: addressName,
          address: address,
          addressId: result.aid
        });
    });
    return this.state.walletExtract;
  }

  // 删除提现地址
  async deletAddress({ coinName, addressId, addressName, address }) {
    // console.log(coinName, addressId, addressName, address);
    let result = await this.Proxy.delAddress({
      // userId: this.controller.userId,
      aid: addressId,
      token: this.controller.token
    });
    if (result && result.errCode) {
      return result;
    }
    this.state.walletExtract.extractAddr.forEach(v => {
      v.coinId === this.state.walletList[coinName] &&
        (v.addressList = v.addressList.filter(
          item => item.address !== address
        ));
    });
    return this.state.walletExtract;
    // this.state.walletExtract.extractAddr = this.state.walletExtract.extractAddr.filter(
    //   item => item.address !== address
    // );
  }
  // 验证资金密码
  async verifyPass(fundPass) {
    // console.log(this.controller.RSAencrypt(fundPass));
    let result = await this.Proxy.verifyFundPass({
      // userId: this.controller.userId,
      token: this.controller.token,
      fpd: this.controller.RSAencrypt(fundPass)
    });
    return result;
  }
}

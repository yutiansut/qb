import ExchangeStoreBase from "../ExchangeStoreBase";

export default class AssetStore extends ExchangeStoreBase {
  constructor(props) {
    super(props);
    this.state = {
      totalAsset: {
        usd: 0,
        cny: 0,
        btc: 91516.153351323,
        limit: 2,
        usedlimit: 0
      },
      wallet: [
        {
          currency: "BTC",
          avail: 0.21136,
          lock: 0.21136,
          tobtc: 0.21136,
          fullname: "Bitcoin"
        },
        {
          currency: "BTC",
          avail: 0.21136,
          lock: 0.21136,
          tobtc: 0.21136,
          fullname: "Bitcoin"
        },
        {
          currency: "BTC",
          avail: 0.21136,
          lock: 0.21136,
          tobtc: 0.21136,
          fullname: "Bitcoin"
        },
        {
          currency: "BTC",
          avail: 0.21136,
          lock: 0.21136,
          tobtc: 0.21136,
          fullname: "Bitcoin"
        },
        {
          currency: "BTC",
          avail: 0.21136,
          lock: 0.21136,
          tobtc: 0.21136,
          fullname: "Bitcoin"
        },
        {
          currency: "BTC",
          avail: 0.21136,
          lock: 0.21136,
          tobtc: 0.21136,
          fullname: "Bitcoin"
        },
        {
          currency: "BTC",
          avail: 0.21136,
          lock: 0.21136,
          tobtc: 0.21136,
          fullname: "Bitcoin"
        }
      ]
    };
  }
}

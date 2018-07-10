import ExchangeStoreBase from "../ExchangeStoreBase";

export default class KdepthStore extends ExchangeStoreBase {
     /*
     * data格式，bids-买单，asks-卖单
     * {
     *      bids: [
     *          [100,50],       //[价格，成交量]
     *          [100,50],
     *          [100,50],
     *          ...
     *      ],
     *      asks: [
     *          [123,45],       // [价格，成交量]
     *          [124,46],
     *          [125,47],
     *      ]
     * }
     */
  constructor() {
    super();
    this.state = {
      data: {}
    };
  }
}

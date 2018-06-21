import ExchangeStoreBase from '../ExchangeStoreBase'

export default class NoticeStore extends ExchangeStoreBase {
  constructor() {
    super();
    this.state = {
      informationList: [
        {title: '11111', time:46578979099},
        {title: '11111', time:46578979099},
        {title: '11111', time:46578979099},
        {title: '11111', time:46578979099},
        {title: '11111', time:46578979099}
      ],
      newsList: [
        {title: '22222', time:46578979099},
        {title: '22222', time:46578979099},
        {title: '22222', time:46578979099},
        {title: '22222', time:46578979099},
        {title: '22222', time:46578979099}
      ]
    }
  }
}
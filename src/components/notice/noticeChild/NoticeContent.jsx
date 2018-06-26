import React, {Component} from 'react';
import exchangeViewBase from '../../../components/ExchangeViewBase'
import Pagination from '../../../common/component/Pagination/index.jsx'


export default class noticeContent extends exchangeViewBase {
  constructor(props) {
    super(props);
    this.state = {}
    const {controller} = props
    //绑定view
    controller.setView(this)
    //初始化数据，数据来源即store里面的state
    this.state = Object.assign(this.state, controller.initState);
    // this.getInformation = controller.getInformation.bind(controller) // 获取资讯
    // this.getnews = controller.getnews.bind(controller) // 获取新闻
    console.log('12244', this.state)
  }

  setView(view){
    super.setView(view);
    // view.setState({count: this.store.count})
    return this.store.data
  }


  componentWillMount() {

  }

  async componentDidMount() {
    // await this.getInformation()
    // await this.getnews()

  }

  componentWillUpdate(...parmas) {

  }

  render() {
    /*
  currentPage	当前页码，默认为1
  total	数据总条数
  pageSize 每页数据条数
  showTotal 是否显示数据总条数
  showQuickJumper 是否显示快速跳转
*/

    return (
      <div className="bulletin-wrap">
        <div className="information-wrap">
          <h1>公告</h1>
          <h2 className={this.state.informationList.data ? 'hide' : ''}>暂无公告</h2>
          <dl className={this.state.informationList.data ? '' : 'hide'}>
            <dt>
              <i>标题</i>
              <em>类型</em>
              <span>时间</span>
            </dt>
            {this.state.informationList.data && this.state.informationList.data.map((v, index) => (<dd key={index}>
              <i>{v.subjectCN}</i>
              <em>公告</em>
              <span>{v.createdAt}</span>
            </dd>))}
          </dl>
          <div className={this.state.newsList.data ? '' : 'hide'}>
            <Pagination total="5"
                        pageSize="10"
                        showTotal={true}
                        showQuickJumper={true}/>
          </div>
        </div>
        <div className="news-wrap" >
          <h1>资讯</h1>
          <h2 className={this.state.newsList.data ? 'hide' : ''}>暂无资讯</h2>
          <dl className={this.state.newsList.data ? '' : 'hide'}>
            <dt>
              <i>标题</i>
              <em>类型</em>
              <span>时间</span>
            </dt>
            {this.state.newsList.data && this.state.newsList.data.map((v, index) => (<dd key={index}>
              <i>{v.subjectCN}</i>
              <em>资讯</em>
              <span>{v.createdAt}</span>
            </dd>))}
          </dl>
          <div className={this.state.newsList.data ? '' : 'hide'}>
            <Pagination total="5"
                        pageSize="10"
                        showTotal={true}
                        showQuickJumper={true}/>
          </div>
        </div>
      </div>
    );
  }

}
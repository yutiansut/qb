import React from "react";
import {observer} from "mobx-react";
import {translate} from "react-i18next";

@translate(['translations'], {wait: true})
class ChartBtn extends React.Component {
  constructor(props) {
    super(props);
    const {store} = this.props;
    store.selected = "K";
    this.showLine = this.showLine.bind(this);
    // this.getStyle = this.getStyle.bind(this);
    this.getActive = this.getActive.bind(this);
  }

  showLine(field, e) {
    const {store} = this.props;
    store.selected = field;
  }

  getActive(field) {
    const {store} = this.props;
    if (store.selected === field) {
      return "active"
    }
    return "";
  }

  render() {
    const {t} = this.props
    return <div className="k-menu d-flex flex-row">
      <div className={`k-btn mr-2 d-flex justify-content-center align-items-center to-pointer ${this.getActive("K")}`}
           onClick={this.showLine.bind(this, "K")}>{t('K线图')}
      </div>
      <div className={`k-btn d-flex justify-content-center align-items-center to-pointer ${this.getActive("DEPTH")}`}
           onClick={this.showLine.bind(this, "DEPTH")}>{t('深度图')}
      </div>
    </div>
  }
}


@observer
class Chart extends React.Component {
  constructor(props) {
    super(props);
    const {store} = this.props;
    store.selected = "K";
    // this.showLine = this.showLine.bind(this);
    this.getStyle = this.getStyle.bind(this);
    // this.getActive = this.getActive.bind(this);
  }

  componentDidMount() {
    // 初始化K线图.
    const {store, dStore, klineStore} = this.props;
    // console.log('TradingView.onready before', klineStore.settings, window.tvWidget)
    TradingView.onready(() => {
      // console.log('TradingView.onready 0', this.props)
      const {klineStore} = this.props;
      const settings = klineStore.settings;
      settings['container_id'] = "js-k-line";
      // console.log('TradingView.onready 0.5', settings, store.widget, window.tvWidget)
      store.widget = window.tvWidget = new TradingView.widget(settings);

  
      // console.log('TradingView.onready 1', store.widget, window.tvWidget, 'onChartReady',store.widget.onChartReady, '_ready', store.widget._ready,'_ready_handlers',store.widget._ready_handlers)
      store.widget.onChartReady(() => {
        // console.log('tvWidget.onChartReady', settings)
        store.chartReady = true;
      });
      // console.log()
    });

    // 初始化深度图.
    dStore.dChart = echarts.init(document.getElementById('js-d-chart'));
   
    const marketStore = this.props.marketStore;
    marketStore.klineHeight = document.getElementById('kline-height').offsetHeight
  }

  get depthWidth() {
    return document.getElementById('trade-plan') && document.getElementById('trade-plan').offsetWidth || 0
  }

  componentDidUpdate(){
    const marketStore = this.props.marketStore;
    marketStore.klineHeight = document.getElementById('kline-height').offsetHeight
  }

  getStyle(field) {
    const {store, dStore, marketStore} = this.props;
    const style = {};
    if (store.selected !== field) {
      style['display'] = "none"
    }
    if(store.selected === 'DEPTH'){
      dStore.dChart.resize({
        width:`${this.depthWidth}px`,
        height:`${marketStore.klineHeight}`
      })
      // style.width =
      // style.height = `${this.depthHeight}px`
    }
    return style;
  }

  render() {
    const {store} = this.props;
    return <div className="d-flex flex-column" style={{height:'100%',position:'relative'}}>
      <ChartBtn store={store}></ChartBtn>
      <div style={{height:'100%'}}>
        <div className="mix-kline" id="js-k-line" style={this.getStyle("K")}></div>
        <div id="js-d-chart" style={this.getStyle("DEPTH")}></div>
      </div>
    </div>
  }
}

export default Chart;

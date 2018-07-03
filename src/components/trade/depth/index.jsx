import React from 'react';
import './css/main.css';
import KDepth from './js/kdepth.js';

class ReactKDepth extends React.Component {

    constructor(props) {
        super(props);
        this.state={
            props: props,
            kline: null,
        }
    }

    /*
     * 调用setData更新数据并渲染视图
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
    setData(data){
        //this.state.kdepth.setData(data);
        this.state.kdepth.setData({asks:[[102.91,74.18],[102.9,5.76],[102.89,79.46],[102.87,20.58],[102.86,19.68],[102.85,82.83],[102.74,33.85],[102.72,12.49],[102.46,35.37],[102.45,17.61],[102.44,61.33],[102.43,57.71],[101.78,82.9],[101.77,38.13],[101.75,45.88],[101.74,5.73],[101.73,83.65],[101.72,57.02],[101.71,1.22],[101.69,11.69],[101.68,35.26],[101.67,18.13],[101.45,100],[101.23,27.93],[101.22,3.66],[101.2,43.76],[101.19,57.76],[101.18,31.21],[101.17,4.99]],bids:[[101.16,49.24],[101.15,20.91],[100.93,52.11],[100.92,35.25],[100.91,8.47],[100.9,33.11],[100.89,51.01],[100.88,62.17],[100.87,9.39],[100.85,31.87],[100.84,6.68],[100.83,19.1],[100.51,53.97],[100.02,24.01],[99.69,71.27],[97.85,73.9],[97.84,75.75],[97.83,10.93],[97.55,84.18],[97.54,15.71],[97.53,75.43],[97.51,12.72],[97.49,58.5],[97.48,13.86],[97.46,86.2],[97.45,7.13],[97.44,9.78],[97.43,5.61]]});
    }

    componentDidMount(){
        let tradeChart=document.querySelector(".trade-chart");
        let cfg={
            width: tradeChart.clientWidth,
            height: tradeChart.clientHeight,
        };
        Object.assign(cfg,this.state.props);
        this.state.kdepth = new KDepth(cfg);
        this.state.kdepth.draw();
        this.setData();
        //
        let _kdepth=this.state.kdepth;
        window.redrawKline=function () {
            let tradeChart=document.querySelector(".trade-chart");
            _kdepth.resize(tradeChart.clientWidth,tradeChart.clientHeight);
        }
    }

    componentWillUnmount(){
        this.state.kdepth.reset();
        window.redrawKline=null;
    }

    render() {
        return (
            <div id="depth_container" className="depth_container">
                <div className="">

                </div>
                <div className="depth_canvasGroup">
                    <canvas className="depth_canvas" id="depth_canvas"></canvas>
                    <canvas className="depth_canvas" id="depth_canvas2"></canvas>
                </div>
            </div>
        );
    }

}

export default ReactKDepth;
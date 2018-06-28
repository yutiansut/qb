import React from 'react';

class ReactTrend extends React.Component {

    constructor(props) {
        super(props);
        this.state={
            width: 100,         // 宽度，支持rem
            height: 30,
            ratio: 3.33,           // 宽高比例
            trends: [120,345,300,432,253,163,765,324],      // 数据节点
            stroke: "#333",                 // 线颜色
            strokeWidth: 1,                 // 线宽
        };
        Object.assign(this.state,this.props);
    }

    render() {

        let trends=this.state.trends;
        if(trends.length<2) return (
            <span>trends长度不小于2</span>
        );

        let ratio = this.state.ratio;
        let viewHeight=100 * ratio;
        let viewBox = "0 0 100 " + viewHeight;

        let dx = Math.floor(100 / (trends.length - 1));
        let max = trends[0];
        let min = trends[0];
        for(let i=0;i<trends.length;i++){
            trends[i] > max ? max = trends[i] : null;
            trends[i] < min ? min = trends[i] : null;
        }

        let points="";
        trends.forEach((e,i)=>{
            let x = i * dx;
            let y = viewHeight - (e - min) / (max - min) * viewHeight;
            points += x + "," + y + " ";
        });

        return (
            <svg className="kline-trend" viewBox={viewBox} preserveAspectRatio="none">
                <polyline points={points} style={{stroke:this.state.stroke,strokeWidth:this.state.strokeWidth,fill:"none"}}/>
            </svg>
        );
    }

}

export default ReactTrend;
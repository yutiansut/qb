import React from 'react';

class ReactTrend extends React.Component {

    constructor(props) {
        super(props);
        this.state={
            width: 100,         // 宽度，支持rem
            height: 30,
            ratio: 3.33,           // 宽高比例
            trends: [120,345,300,432,253,163,765,324],      // 数据节点
            stroke: "#fff",           // 线颜色
            strokeWidth: 1,                 // 线宽
        };
        // console.log(this.props)
        Object.assign(this.state,this.props);
    }

    render() {

        // let trends=this.state.trends;
         let trends=[5,4,8,2,7,3]
        if(trends.length<2) return (
            <span></span>
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

        let path="";
        trends.forEach((e,i)=>{
            let x = i * dx;

            let y;
            if(max===min){
                y=max;
            }else{
              y = viewHeight - (e - min) / (max - min) * viewHeight;
            }

            if(i<=0){
                path += "M"+x + "," + y + " ";
            }else{
                path += "L"+x + "," + y + " ";
            }
        });
        // console.log('path', path)

        return (
            <svg className="kline-trend" viewBox={viewBox} preserveAspectRatio="none">
                <path d={path} style={{stroke:this.state.stroke,strokeWidth:this.state.strokeWidth,fill:"none"}}/>
            </svg>
        );
    }

}

export default ReactTrend;
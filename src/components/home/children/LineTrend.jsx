import React from 'react';

class ReactTrend extends React.Component {

  constructor(props) {
    super(props);
    this.state={
      width: 200,
      height: 50,
      trends: [120,345,300,432,253,163,765,324],
      stroke: "#ccc",
      strokeWidth: 1,
    };
    Object.assign(this.state,this.props);
  }

  render() {
    let width=this.state.width;
    let height=this.state.height;
    let trends=this.state.trends;

    let ratio = this.state.height/this.state.width;
    let viewHeight=100 * ratio;
    let viewBox = "0 0 100 " + viewHeight;

    let dx = Math.floor(100 / trends.length);
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
      <svg width={width} height={height} viewBox={viewBox} preserveAspectRatio="none">
        <polyline points={points} style={{stroke:this.state.stroke,strokeWidth:this.state.strokeWidth,fill:"none"}}/>
      </svg>
    );
  }

}

export default ReactTrend;

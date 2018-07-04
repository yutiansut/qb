import KDepth from "./kdepth";
import Theme from "./theme";

export default class Plotter {

    constructor() {
        this._canvas=null;
        this._context=null;
        this._overlayCanvas=null;
        this._overlayContext=null;

        this.asks=[];
        this.bids=[];
        this.asks_min=[];
        this.asks_max=[];
        this.bids_min=[];
        this.bids_max=[];
        this.maxStrXW=0;
        this.maxStrYW=0;

        this.chartWidth=0;
        this.chartHeight=0;
        this.scaleLength=0;
        this.oX=0;
        this.oY=0;
        this.ratioStrX=0;
        this.ratioStrY=0;
        this.strX0=0;
        this.strY0=0;
        this.strX1=0;
        this.strY1=0;

        this.initOverlay=false;

        if(!Plotter.instance){
            Plotter.instance=this;
        }
    }

    bindCanvas(canvas) {
        canvas.setAttribute("width",KDepth.instance.width);
        canvas.setAttribute("height",KDepth.instance.height);
        this._canvas=canvas;
        this._context=canvas.getContext("2d");
    }

    bindOverlayCanvas(canvas){
        canvas.setAttribute("width",KDepth.instance.width);
        canvas.setAttribute("height",KDepth.instance.height);
        this._overlayCanvas=canvas;
        this._overlayContext=canvas.getContext("2d");
    }

    /*********************************************
     * Methods
     *********************************************/

    formatFloat(v, fractionDigits){
        let text = v.toFixed(fractionDigits);
        if(fractionDigits<=0) return text;
        for (let i = text.length - 1; i >= 0; i--) {
            if (text[i] === '.')
                return text.substring(0, i);
            if (text[i] !== '0')
                return text.substring(0, i + 1);
        }
    };

    drawDashLine(x1, y1, x2, y2, step = 2){
        let ctx=this._context;
        const x = x2 - x1,
            y = y2 - y1,
            count = Math.floor(Math.sqrt(x * x + y * y) / step),
            xv = Math.round(x/count),
            yv = Math.round(y/count);
        ctx.beginPath();
        for (let i = 0; i < count; i ++) {
            if (i % 2 === 0) {
                ctx.moveTo(x1, y1);
            } else {
                ctx.lineTo(x1, y1);
            }
            x1 += xv;
            y1 += yv;
        }
        ctx.lineTo(x2, y2);
        ctx.stroke();
    }

    draw() {
        let ctx=this._context;
        let padding={
            left: 20,
            right: 20,
            top: 30,
            bottom: 20,
        };
        let verAxisWidth=Math.floor(this.maxStrYW);
        let horAxisHeight=12;
        let scaleLength=5;
        let chartWidth=KDepth.instance.width-verAxisWidth-(padding.left+padding.right);
        let chartHeight=KDepth.instance.height-horAxisHeight-(padding.top+padding.bottom);
        let scaleXNum=Math.floor(chartWidth/(this.maxStrXW+40));
        let scaleYNum=Math.floor(chartHeight/50);
        let oX=padding.left+verAxisWidth;
        let oY=padding.top+chartHeight;

        let strX0=Math.min(this.asks_min[0],this.bids_min[0]);
        let strX1=Math.max(this.asks_max[0],this.bids_max[0]);
        let strY0=0;
        let strY1=Math.max(this.asks_max[2],this.bids_max[2]);
        let ratioStrX=(strX1-strX0)/chartWidth;
        let ratioStrY=(strY1-strY0)/chartHeight;

        this.chartWidth=chartWidth;
        this.chartHeight=chartHeight;
        this.scaleLength=scaleLength;
        this.oX=oX;
        this.oY=oY;
        this.ratioStrX=ratioStrX;
        this.ratioStrY=ratioStrY;
        this.strX0=strX0;
        this.strY0=strY0;
        this.strX1=strX1;
        this.strY1=strY1;

        //坐标轴
        ctx.strokeStyle=Theme._color["axisLine"];
        ctx.beginPath();
        ctx.moveTo(oX+0.5,oY+0.5);
        ctx.lineTo(oX+chartWidth+0.5,oY+0.5);
        ctx.moveTo(oX+0.5,oY+0.5);
        ctx.lineTo(oX+0.5,oY-chartHeight+0.5);
        ctx.stroke();

        let gapH=Math.floor(chartHeight/scaleYNum);
        let gapW=Math.floor(chartWidth/scaleXNum);

        //网格线
        ctx.strokeStyle=Theme._color["gridLine"];
        ctx.beginPath();
        for(let i=1;i<scaleXNum;i++){
            this.drawDashLine(oX+i*gapW+0.5, oY+0.5, oX+i*gapW+0.5, oY-chartHeight+0.5)
        }
        for(let i=1;i<=scaleYNum;i++){
            this.drawDashLine(oX+0.5, oY-i*gapH+0.5, oX+chartWidth+0.5, oY-i*gapH+0.5)
        }
        ctx.stroke();

        //刻度线
        ctx.strokeStyle=Theme._color["axisLine"];
        ctx.beginPath();
        for(let i=1;i<=scaleXNum;i++){
            ctx.moveTo(oX+i*gapW+0.5, oY+0.5);
            ctx.lineTo(oX+i*gapW+0.5, oY+scaleLength+0.5);
        }
        for(let i=1;i<=scaleYNum;i++){
            ctx.moveTo(oX+0.5, oY-i*gapH+0.5);
            ctx.lineTo(oX-scaleLength+0.5, oY-i*gapH+0.5);
        }
        ctx.stroke();

        //刻度线文本
        ctx.fillStyle=Theme._color["scaleFontColor"];
        ctx.font=Theme._fonts;
        for(let i=1;i<=scaleXNum;i++){
            let str=this.formatFloat(strX0+i*gapW*ratioStrX,2);
            let strW=ctx.measureText(str).width;
            ctx.fillText(str, oX+i*gapW-strW/2, oY+scaleLength+17);
        }
        for(let i=1;i<=scaleYNum;i++){
            let str=this.formatFloat(strY0+i*gapH*ratioStrY,0);
            let strW=ctx.measureText(str).width;
            ctx.fillText(str, oX-scaleLength-strW-7, oY-i*gapH+6)
        }
        let str=this.formatFloat(strY0,0);
        let strW=ctx.measureText(str).width;
        ctx.fillText(str, oX-scaleLength-strW-5, oY+6);

        //折线图
        let bids=this.bids;
        let asks=this.asks;
        // 买单
        ctx.beginPath();
        ctx.lineWidth=2;
        ctx.strokeStyle=Theme._color["depthLine1"];
        ctx.fillStyle=Theme._color["depthLine1Fill"];
        ctx.moveTo(oX, oY-(bids[0][2]-strY0)/ratioStrY);
        for(let i=0;i<bids.length-1;i++){
            ctx.lineTo(oX+(bids[i][0]-strX0)/ratioStrX, oY-(bids[i][2]-strY0)/ratioStrY);
            ctx.lineTo(oX+(bids[i][0]-strX0)/ratioStrX, oY-(bids[i+1][2]-strY0)/ratioStrY);
        }
        ctx.lineTo(oX+(bids[bids.length-1][0]-strX0)/ratioStrX, oY);
        ctx.stroke();
        ctx.lineWidth=1;
        ctx.strokeStyle="transparent";
        ctx.lineTo(oX,oY);
        ctx.closePath();
        ctx.stroke();
        ctx.fill();
        // 卖单
        ctx.beginPath();
        ctx.lineWidth=2;
        ctx.strokeStyle=Theme._color["depthLine2"];
        ctx.fillStyle=Theme._color["depthLine2Fill"];
        ctx.moveTo(oX+(asks[0][0]-strX0)/ratioStrX, oY);
        for(let i=0;i<asks.length-1;i++){
            ctx.lineTo(oX+(asks[i][0]-strX0)/ratioStrX, oY-(asks[i][2]-strY0)/ratioStrY);
            ctx.lineTo(oX+(asks[i+1][0]-strX0)/ratioStrX, oY-(asks[i][2]-strY0)/ratioStrY);
        }
        ctx.lineTo(oX+(strX1-strX0)/ratioStrX, oY-(asks[asks.length-1][2]-strY0)/ratioStrY);
        ctx.stroke();
        ctx.lineWidth=1;
        ctx.strokeStyle="transparent";
        ctx.lineTo(oX+(strX1-strX0)/ratioStrX, oY);
        ctx.closePath();
        ctx.stroke();
        ctx.fill();

        //柱状图
        ctx.fillStyle=Theme._color["barFill1"];
        for(let i=0;i<bids.length-1;i++){
            let bx=Math.round(oX+(bids[i][0]-strX0)/ratioStrX);
            let by=Math.round(oY-(bids[i][1]-strY0)/ratioStrY);
            let bw=1;
            let bh=oY-by;
            ctx.fillRect(bx,by,bw,bh);
        }
        ctx.fillStyle=Theme._color["barFill2"];
        for(let i=0;i<asks.length-1;i++){
            let bx=Math.round(oX+(asks[i][0]-strX0)/ratioStrX);
            let by=Math.round(oY-(asks[i][1]-strY0)/ratioStrY);
            let bw=1;
            let bh=oY-by;
            ctx.fillRect(bx,by,bw,bh);
        }

        // ======================================================================================
        // draw overlay

        if(this.initOverlay) return;
        this.initOverlay = true;

        this._overlayCanvas.addEventListener("mousemove", event => {

            let oCanvas=this._overlayCanvas;
            let oCtx=this._overlayContext;

            oCtx.clearRect(0, 0, KDepth.instance.width, KDepth.instance.height);

            let x = Math.round(event.clientX - oCanvas.getBoundingClientRect().left);
            let y = Math.round(event.clientY - oCanvas.getBoundingClientRect().top);

            let chartWidth=this.chartWidth;
            let chartHeight=this.chartHeight;
            let oX=this.oX;
            let oY=this.oY;
            let ratioStrX=this.ratioStrX;
            let ratioStrY=this.ratioStrY;
            let strX0=this.strX0;
            let strY0=this.strY0;
            let strX1=this.strX1;
            let strY1=this.strY1;
            let scaleLength=this.scaleLength;

            if (x < oX || x > oX + chartWidth || y > oY || y < oY - chartHeight) {
                oCanvas.style.cursor = "default";
                return;
            }
            oCanvas.style.cursor = "none";

            //测量线
            oCtx.beginPath();
            oCtx.strokeStyle = "#aaa";
            oCtx.moveTo(oX + 0.5, y + 0.5);
            oCtx.lineTo(oX + chartWidth + 0.5, y + 0.5);
            oCtx.moveTo(x + 0.5, oY + 0.5);
            oCtx.lineTo(x + 0.5, oY - chartHeight + 0.5);
            oCtx.stroke();

            //测量线文本
            let strX = (x - oX) * ratioStrX + strX0;
            let strY = (oY - y) * ratioStrY + strY0;
            strX = this.formatFloat(strX, 2);
            strY = this.formatFloat(strY, 0);
            let strXW = oCtx.measureText(strX).width;
            let strYW = oCtx.measureText(strY).width;
            oCtx.fillStyle = Theme._color["infoFontColor"];
            oCtx.font = Theme._fonts;
            oCtx.fillText(strX, x - strXW / 2, oY + scaleLength + 17);
            oCtx.fillText(strY, oX - scaleLength - strYW - 7, y + 6);

            //信息文本
            let strInfos = [];
            let strPrice = strX;
            let strVol = 0;
            let strAccu = 0;
            if (strX <= this.bids_max[0]) {
                strInfos = ["购买价格: ", "购买量: ", "累计购买量: "];
                for (let i = bids.length - 1; i > 0; i--) {
                    if (Math.abs(bids[i][0] - strX) < ratioStrX) {
                        strPrice = bids[i][0];
                        strVol = bids[i][1];
                    }
                    if (bids[i][0] >= strX) {
                        strAccu = bids[i][2];
                    }
                }
            } else {
                strInfos = ["出售价格：", "出售量：", "累计出售量："];
                for (let i = 0; i < asks.length; i++) {
                    if (Math.abs(asks[i][0] - strX) < ratioStrX) {
                        strPrice = asks[i][0];
                        strVol = asks[i][1];
                    }
                    if (asks[i][0] <= strX) {
                        strAccu = asks[i][2];
                    }
                }
            }
            oCtx.fillText(strInfos[0] + this.formatFloat(Number(strPrice), 2) + "  " + strInfos[1] + this.formatFloat(strVol, 0) + "  "
                + strInfos[2] + this.formatFloat(strAccu, 0), oX + 20, oY - chartHeight + 16);

        });

        this._overlayCanvas.addEventListener("mouseout",event=>{
            let oCtx=this._overlayContext;
            oCtx.clearRect(0,0,KDepth.instance.width,KDepth.instance.height);
        });
    }

    onSize(w,h){
        let ctx=this._context;
        let canvas=this._canvas;
        let oCanvas=this._overlayCanvas;
        let oCtx=this._overlayContext;

        canvas.setAttribute("width",w);
        canvas.setAttribute("height",h);
        oCanvas.setAttribute("width",w);
        oCanvas.setAttribute("height",h);

        ctx.fillStyle=Theme._color["background"];
        ctx.fillRect(0,0,KDepth.instance.width,KDepth.instance.height);
        oCtx.fillStyle="transparent";
        oCtx.fillRect(0,0,KDepth.instance.width,KDepth.instance.height);
        this.draw();
    }

    setData(data){
        let asks=data.asks;
        let bids=data.bids;

        //价格排序
        asks.sort((a,b)=>{
            return a[0]-b[0];
        });
        bids.sort((a,b)=>{
            return a[0]-b[0];
        });

        //计算累计量,[价格，成交量，累计成交量]
        bids[bids.length-1][2]=bids[bids.length-1][1];
        for(let i=bids.length-1;i>0;i--){
            bids[i-1][2]=bids[i-1][1]+bids[i][2];
        }
        asks[0][2]=asks[0][1];
        for(let i=1;i<asks.length;i++){
            asks[i][2]=asks[i][1]+asks[i-1][2];
        }

        //计算最值
        let asks_min=asks[0].slice(0);
        let asks_max=asks[0].slice(0);
        for(let i=0;i<asks.length;i++) {
            asks[i][0] < asks_min[0] && (asks_min[0] = asks[i][0]);
            asks[i][1] < asks_min[1] && (asks_min[1] = asks[i][1]);
            asks[i][2] < asks_min[2] && (asks_min[2] = asks[i][2]);
            asks[i][0] > asks_max[0] && (asks_max[0] = asks[i][0]);
            asks[i][1] > asks_max[1] && (asks_max[1] = asks[i][1]);
            asks[i][2] > asks_max[2] && (asks_max[2] = asks[i][2]);
        }
        let bids_min=bids[0].slice(0);
        let bids_max=bids[0].slice(0);
        for(let i=0;i<bids.length;i++) {
            bids[i][0] < bids_min[0] && (bids_min[0] = bids[i][0]);
            bids[i][1] < bids_min[1] && (bids_min[1] = bids[i][1]);
            bids[i][2] < bids_min[2] && (bids_min[2] = bids[i][2]);
            bids[i][0] > bids_max[0] && (bids_max[0] = bids[i][0]);
            bids[i][1] > bids_max[1] && (bids_max[1] = bids[i][1]);
            bids[i][2] > bids_max[2] && (bids_max[2] = bids[i][2]);
        }

        //计算文字最大宽度,x轴2位小数,y轴0位小数
        let ctx=this._context;
        let maxStrXW=0;
        let maxStrYW=0;
        for(let i=0;i<asks.length;i++){
            let xw=ctx.measureText(this.formatFloat(asks[i][0],2)).width;
            xw>maxStrXW && (maxStrXW=xw);
            let yw=ctx.measureText(this.formatFloat(asks[i][2],0)).width;
            yw>maxStrYW && (maxStrYW=yw);
        }
        for(let i=0;i<bids.length;i++){
            let xw=ctx.measureText(this.formatFloat(bids[i][0],2)).width;
            xw>maxStrXW && (maxStrXW=xw);
            let yw=ctx.measureText(this.formatFloat(bids[i][2],0)).width;
            yw>maxStrYW && (maxStrYW=yw);
        }

        //
        this.asks=asks;
        this.bids=bids;
        this.asks_min=asks_min;
        this.asks_max=asks_max;
        this.bids_min=bids_min;
        this.bids_max=bids_max;
        this.maxStrXW=maxStrXW;
        this.maxStrYW=maxStrYW;

        this.onSize(KDepth.instance.width,KDepth.instance.height);
    }

}
Plotter.instance = null;
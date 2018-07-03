import Plotter from "./plotter";

export default class KDepth {

    constructor(option) {
        this.timer=null;
        this.element="#depth_container";

        this.width=800;
        this.height=400;

        Object.assign(this,option);
        if(!KDepth.instance){
            KDepth.instance=this;
        }

        return KDepth.instance;
    }

    static requestData(showLoading) {
        window.clearTimeout(KDepth.instance.timer);
        if (showLoading === true) {
           
        }
        KDepth.instance.onRequestDataFunc(KDepth.instance.requestParam,function(res){
            if(res && res.success){
                Control.requestSuccessHandler(res);
            }else{
                if (KDepth.instance.debug) {
                    console.log(res);
                }
                KDepth.instance.timer = setTimeout(function () {
                    Control.requestData(true);
                }, KDepth.instance.intervalTime);
            }
        })
    }

    /*********************************************
     * Methods
     *********************************************/

    draw() {
        let view = document.querySelector(this.element);
        new Plotter();
        Plotter.instance.bindCanvas(document.querySelector("#depth_canvas"));
        Plotter.instance.bindOverlayCanvas(document.querySelector("#depth_canvas2"));
    }

    setData(data){
        Plotter.instance.setData(data);
    }

    resize(w,h){
        this.width=w;
        this.height=h;
        Plotter.instance.onSize(w,h);
    }

    reset(){
        Plotter.instance.initOverlay=false;
    }

    /*********************************************
     * Events
     *********************************************/

}
KDepth.instance = null;
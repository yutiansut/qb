import Plotter from "./plotter";

export default class KDepth {

    constructor(option) {
        this.element="#depth_container";

        this.width=800;
        this.height=400;
        this.lang = "zh-cn";

        Object.assign(this,option);
        if(!KDepth.instance){
            KDepth.instance=this;
        }

        return KDepth.instance;
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

    setLanguage(lang){
        this.lang=lang;
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
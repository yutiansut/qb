class Dom{

    constructor(el){
        this.els=[];
        if( typeof(el) === "object"){
            this.els.push(el);
        }else{
            this.els=document.querySelectorAll(el);
        }
    }

    find(el){
        let res=[];
        this.els.forEach((e)=>{console.log(e);
            res.concat(e.querySelectorAll(el));
        });
        this.els=res;
        return this;
    }

    bind(event,handler){
        this.els.forEach((e)=>{
            e.addEventListener(event,handler.bind(e));
        });
        return this;
    }

    attr(name,value){
        if(typeof(name)==="object"){
            for(let key in name){
                this.els.forEach((e)=>{
                    e.setAttribute(key,name[key]);
                });
            }
        }else{
            this.els.forEach((e)=>{
                e.setAttribute(name,value);
            })
        }
    }

    css(name,value){
        if(typeof(name)==="object"){
            for(let key in name){
                this.els.forEach((e)=>{
                    let name1=name.replace(/-./g,function(str) {
                        return str.substr(1).toUpperCase();
                    });
                    e.style[name1]=name[key];
                });
            }
        }else{
            this.els.forEach((e)=>{
                let name1=name.replace(/-./g,function(str) {
                    return str.substr(1).toUpperCase();
                });
                e.style[name1]=value;
            })
        }
    }

}

export default function $(el){
    return new Dom(el);
}
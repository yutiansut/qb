/*
 * Dom 模拟jquery常用的操作
 * 用于替换jquery
 */

class Dom{
    constructor(sel){
        if(typeof sel === "object"){
            if(sel instanceof Dom){
                return sel;
            }else if(sel instanceof Array){
                this.el = sel;
            }else{
                this.el = [sel];
            }
        }else{
            this.el = document.querySelectorAll(sel);
        }
        //
        this.registerEvent("mouseover");
        this.registerEvent("mouseout");
        this.registerEvent("mousemove");
        this.registerEvent("mouseleave");
        this.registerEvent("mouseup");
        this.registerEvent("mousedown");
        this.registerEvent("keyup");
        this.registerEvent("keydown");
        this.registerEvent("click");
        this.registerEvent("change");
        //
        for(let i=0;i<this.el.length;i++){
            this[i] = this.el[i];
        }
        //事件池
        if(!window.DomEventHandlers){
            window.DomEventHandlers = {};
        }
    }

    attr(){
        if(arguments.length === 1){
            if(typeof arguments[0] === "object"){
                this.el.forEach(el=>{
                    Object.keys(arguments[0]).forEach(key=>{
                        el.setAttribute(key, arguments[0][key]);
                    });
                });
            }
            if(typeof arguments[0] === "string"){
                return this.el[0].getAttribute(arguments[0]);
            }
        }else if(arguments.length === 2){
            this.el.forEach(el=>{
                el.setAttribute(arguments[0],arguments[1]);
            })
        }
        return this;
    }

    css() {
        if (arguments.length === 1) {
            if (typeof arguments[0] === "object") {
                this.el.forEach(el => {
                    Object.keys(arguments[0]).forEach(key => {
                        let nKey = key.replace(/-(\w)/g, (all, letter) => letter.toUpperCase());
                        el.style[nKey] = arguments[0][key];
                    });
                });
            }
            if (typeof arguments[0] === "string") {
                let nKey = arguments[0].replace(/-(\w)/g, (all, letter) => letter.toUpperCase());
                return this.el[0].style[nKey];
            }
        } else if (arguments.length === 2) {
            this.el.forEach(el => {
                let nKey = arguments[0].replace(/-(\w)/g, (all, letter) => letter.toUpperCase());
                el.style[nKey] = arguments[1];
            })
        }
        return this;
    }

   removeClass(name){
        this.el.forEach(el=>{
            el.classList.remove(name);
        });
        return this;
   }

   addClass(name){
        this.el.forEach(el=>{
            el.classList.add(name);
        });
        return this;
   }

   hasClass(name){
        return this.el[0].classList.contains(name);
   }

   html(){
        if(arguments.length===0){
            return this.el[0].innerHTML;
        }else if(arguments.length===1){
            this.el.forEach(el=>{
                el.innerHTML = arguments[0];
            })
        }
        return this;
   }

   text(){
       if(arguments.length===0){
           return this.el[0].innerText;
       }else if(arguments.length===1){
           this.el.forEach(el=>{
               el.innerText = arguments[0];
           })
       }
       return this;
   }

    width(){
        if(arguments.length===0){
            return this.el[0].offsetWidth;
        }else if(arguments.length===1){
            this.el.forEach(el=>{
                el.style.width = arguments[0];
            })
        }
        return this;
    }

    height(){
        if(arguments.length===0){
            return this.el[0].offsetHeight;
        }else if(arguments.length===1){
            this.el.forEach(el=>{
                el.style.height = arguments[0];
            })
        }
        return this;
    }

    offset(){
        if(arguments.length===0){
            let el = this.el[0];
            let left = 0,top = 0;
            while(el !== document.body){
                left += el.offsetLeft;
                top += el.offsetTop;
                el = el.parentNode;
            }
            return {left: left, top: top};
        }else{
            console.log("Dom.js：offset不支持此用法");
        }
        return this;
    }

    val(){
        if(arguments.length===0){
            return this.el[0].value;
        }else if(arguments.length===1){
            this.el.forEach(el=>{
                el.value = arguments[0];
            })
        }
        return this;
    }

    before(html){
        if(typeof html === "string"){
            this.el.forEach(el=>{
                el.insertAdjacentHTML("beforeBegin",html);
            });
        }else{
            this.el.forEach(el=>{
                el.insertAdjacentElement("beforeBegin",html);
            });
        }
        return this;
    }

    after(html){
        if(typeof html === "string"){
            this.el.forEach(el=>{
                el.insertAdjacentHTML("afterEnd",html);
            });
        }else{
            this.el.forEach(el=>{
                el.insertAdjacentElement("afterEnd",html);
            });
        }
        return this;
    }

    append(html){
        if(typeof html === "string"){
            this.el.forEach(el=>{
                el.insertAdjacentHTML("beforeEnd",html);
            });
        }else{
            this.el.forEach(el=>{
                el.insertAdjacentElement("beforeEnd",html);
            });
        }
        return this;
    }

    prepend(html){
        if(typeof html === "string"){
            this.el.forEach(el=>{
                el.insertAdjacentHTML("afterBegin",html);
            });
        }else{
            this.el.forEach(el=>{
                el.insertAdjacentElement("afterBegin",html);
            });
        }
        return this;
    }

   //-------------------------------------------------------
    parent(){
        return new Dom(this.el[0].parentNode);
    }

   find(sel){
        let newEl=[];
        this.el.forEach(el=>{
            el.querySelectorAll(sel).forEach(el2=>{
                newEl.push(el2);
            });
        });
        return new Dom(newEl);
   }

   next(){
        let newEl = [];
        this.el.forEach(el=>{
            newEl.push(el.nextSibling);
        });
        return new Dom(newEl)
   }

   prev(){
        let newEl = [];
        this.el.forEach(el=>{
            newEl.push(el.previousSibling);
        });
        return new Dom(newEl);
   }

   children(){
        if(arguments.length===0){
            let newEl = [];
            this.el.forEach(el=>{
                el.childNodes.forEach(el2=>{
                    newEl.push(el2);
                });
            });
            return new Dom(newEl);
        }else if(arguments.length===1){
            let newEl=[];
            this.el.forEach(el=>{
                el.querySelectorAll(arguments[0]).forEach(el2=>{
                    el2.parentNode === el && newEl.push(el2);
                });
            });
            return new Dom(newEl);
        }
   }

   //------------------------------------------------------

    each(func){
        this.el.forEach((item,index)=>{
            func.bind(item)(index,item);
        })
    }

   //--------------------------------------------------------class
    //注册事件
    registerEvent(name){
        this[name]= (func)=>{
            this.bind(name,func);
            return this;
        }
    }

    on(name,func){
        return this.bind(name,func);
    }

    bind(name,func){
        console.log("k线绑定事件：",name,"=====");
        if(name === "mousewheel"){
            this.bindMousewheel(func);
        }else{
            this.bindEvent(name,func);
        }
        return this;
    }

    isFirefox(){
        if(navigator.userAgent.indexOf('Firefox') >= 0){
            return true;
        }
        return false;
    }

    bindEvent(name,func){
        this.el.forEach(el=>{
            let eid = el["eid"];
            if(!eid){
                eid = Date.now();
                el["eid"] = eid;
            }
            let handler = (event)=>{
                func.bind(el)(event);
            };
            el.addEventListener(name, handler);
            !window.DomEventHandlers[eid] && (window.DomEventHandlers[eid] = []);
            window.DomEventHandlers[eid].push(handler);
            //console.log("k线-绑定事件：",name,el,eid);
            //console.log("k线-事件池：",window.DomEventHandlers);
        });
    }

    bindMousewheel(func){
        this.el.forEach(el=>{
            let eid = el["eid"];
            if(!eid){
                eid = Date.now();
                el["eid"] = eid;
            }
            if(this.isFirefox()){       //火狐
                let handler = (event)=>{
                    let delta = event.detail>0 ? -1 : 1;
                    func.bind(el)(event,delta);
                    event.preventDefault();
                    event.stopPropagation();
                };
                el.addEventListener("DOMMouseScroll",handler);
                !window.DomEventHandlers[eid] && (window.DomEventHandlers[eid] = []);
                window.DomEventHandlers[eid].push(handler);

            }else{                      //其他
                let handler = (event)=>{
                    let delta = event.wheelDelta>0 ? 1 : -1;
                    func.bind(el)(event, delta);
                    event.preventDefault();
                    event.stopPropagation();
                };
                el.addEventListener("mousewheel",handler);
                !window.DomEventHandlers[eid] && (window.DomEventHandlers[eid] = []);
                window.DomEventHandlers[eid].push(handler);
            }
        });
    }

    unbind(){
        if(arguments.length===1){
            this.el.forEach(el=>{
                let eid = el["eid"];
                let handlers = window.DomEventHandlers[eid];
                handlers.forEach(hdl =>{
                    el.removeEventListener(arguments[0],hdl);
                });
            });
        }else if(arguments.length===2){
            this.el.forEach(el=>{
                el.removeEventListener(arguments[0],arguments[1]);
            });
        }
    }

}

export default function $(el){
    return new Dom(el);
}
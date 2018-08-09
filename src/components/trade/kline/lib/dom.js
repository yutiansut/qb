/*
 * Dom 模拟jquery常用的操作
 * 用于替换jquery
 */
class Dom{

    constructor(sel){
        if(typeof sel === "object"){
            this.el = sel;
        }else{
            this.el = document.querySelectorAll(sel);
        }
    }

    bind(event,handler){
        this.el.forEach(el=>{
            el.addEventListener(event,handler.bind(el));
        });
        return this;
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

   parent(){
        return this.el[0].parentNode;
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

   /////////////////////////////////////
   before(nEl){
       let el = this.el;
       let parent = el.parentNode;
       for(let i=0;i<parent.childNodes.length;i++){
           if(parent.childNodes[i]===el){
               parent.insertBefore(nEl,parent.childNodes[i]);
           }
       }
       return this;
   }

   after(nEl){
        let el = this.el;
        let parent = el.parentNode;
        for(let i=0;i<parent.childNodes.length;i++){
            if(parent.childNodes[i]===el){
                if(i===parent.childNodes.length-1){
                    parent.appendChild(nEl);
                }else{
                    parent.insertBefore(nEl,parent.childNodes[i+1]);
                }
            }
        }
        return this;
   }

   append(nEl){
        let el=this.el;
        el.appendChild(nEl);
        return this;
   }

   //******************************************************************************************

    find(sel){
        let el = this.el;
        return el.querySelector(sel);
    }

    findA(sel){
        let el = this.el;
        return el.querySelectorAll(sel);
    }

    getEl(){
        return this.el;
    }

    width(){
        let el = this.el;
        return el.offsetWidth;
    }

    height(){
        let el = this.el;
        return el.offsetHeight;
    }

}

export default function $(el){
    return new Dom(el);
}
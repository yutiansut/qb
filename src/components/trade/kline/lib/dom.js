/*
 * Dom 模拟jquery常用的操作
 * 用于替换jquery
 */
class Dom{

    constructor(sel){
        if(typeof sel === "object"){
            this.el = sel;
        }else{
            this.el = document.querySelector(sel);
        }
    }

    bind(event,handler){
        let el = this.el;
        el.addEventListener(event,handler.bind(el));
        return this;
    }

    attr(name,value){
        let el = this.el;
        el.setAttribute(name,value);
        return this;
    }

    css(name,value){
        let el = this.el;
        let name1=name.replace(/-./g , function(str){
            return str.substr(1).toUpperCase();
        });
        el.style[name1]=value;
        return this;
    }

    cssA(obj){
        Object.keys(obj).forEach(key=>{
            this.css(key , obj[key]);
        });
        return this;
    }

   removeClass(cls){
        let el = this.el;
        el.className = el.className.replace(new RegExp(cls,"g"),"");
        el.className = el.className.replace(/^\s+|\s+$/g, '');
        return this;
   }

   addClass(cls){
        let el = this.el;
        el.className += " " + cls;
        el.className = el.className.replace(/^\s+|\s+$/g, '');
        return this;
   }

   parent(){
        let el = this.el;
        this.el = el.parentNode;
        return this;
   }

   html(txt){
        let el = this.el;
        el.innerHTML = txt;
        return this;
   }

   text(txt){
        let el = this.el;
        el.innerText = txt;
        return this;
   }

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
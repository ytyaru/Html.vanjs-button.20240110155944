(function(){
const {div,span,a} = van.tags

const darkness = new Switch4('dark', 'light')
const blueness = new Switch4('blue', 'yellow')
darkness.isDark // false     isLight
darkness.isSoft // false     isHard
darkness.value  // 0,1,2,3
humarize
const ergonomic = { // 人間工学
    'darkness': new Switch4('dark', 'light'),
    'blueness': new Switch4('dark', 'light'),
}
const 

const darkness = new Switch('dark', 'light')
const blueness = new Switch('blue', 'yellow')
class Switch() {
    constructor(foreName, backName, is=true) {
        this.is = true
        this.foreName = foreName
        this.backName = backName
    }
}
class Switch4() {
    constructor(foreName, backName, is=true) {
        this.is = true
        this.foreName = foreName
        this.backName = backName
        this.isSoft = false
        this._value = this.value
    }
    get is() { return this._is }
    get value() {
        if      ( this.is && !this.isSoft) { return 0 } // 基準（極端な値）
        else if ( this.is &&  this.isSoft) { return 1 } // 基準からほんの少し離れ中庸へ寄る
        else if (!this.is &&  this.isSoft) { return 2 } // 基準の真逆からほんの少し離れ中庸へ寄る
        else if (!this.is && !this.isSoft) { return 3 } // 基準の真逆（極端な値）
    }
    set value(v) {
        if      (0===v) { this.is=true; this.isSoft=false; }
        else if (1===v) { this.is=true; this.isSoft=true; }
        else if (2===v) { this.is=false; this.isSoft=true; }
        else if (3===v) { this.is=false; this.isSoft=false; }
    }
    get name() { return ((this._is) ? this._foreName : this._backName) }
    get subName() { return (this._isSoft) ? 'soft' : 'hard' }
    get fullName() {
        switch(this.value) {
            case 0: return this._foreName
            case 1: return this._foreName + '➖'
            case 2: return this._backName + '➖'
            case 3: return this._backName
        }
        return this.value
    }
}

Object.defineProperty(obj, 'name', {value:'', writable:true;})

new Proxy({isSelf:false, isSoft:false}, {
    get(target, prop, receiver) {
        if (''===prop) { return  }
        return Reflect.get(target, prop)
    }
})
class SwitchVolume {
    constructor(name) {
        this._isSelf = false
        this._isSoft = false
    }
    toggle() { this._isSelf = !this._isSelf }
    subToggle() { this._isSoft = !this._isSoft }
}
class SwitchVolume {
    constructor(name) {
        this._isSelf = false
        this._isSoft = false

        this._isDark = false
        this._isSoft = false
        this._isBlue = true

        this._darkness = 0,1,3,4 // 0,1,3,4(dark-strong, dark-week, light-week, light-strong)
        this._lightness = 0,1,3,4 // 0,1,3,4(dark-strong, dark-week, light-week, light-strong)

        this._blueness = 0,1,3,4
        this._fore = van.state('#000')
        this._back = van.state('#eee')
    }
    toggleLightness() {
        if (this._isDark) {

        }
    }
    toggleSoftness() {}
    toggleBlueness() {}
    setDark() { this._isDark = true; this.#setLightness() }
    setLight() { this._isDark = false; this.#setLightness() }
    #setColor() {
        if (this._isDark && this._isSoft && this._isBlue) {
            this._fore.val = '#eee'
            this._back.val = '#000'
        } else if (this._isDark && this._isSoft && !this._isBlue) {
            this._fore.val = '#000'
            this._back.val = '#eee'
        } else if (this._isDark && !this._isSoft && this._isBlue) {
            this._fore.val = '#000'
            this._back.val = '#eee'
        } else if (this._isDark && !this._isSoft && !this._isBlue) {
            this._fore.val = '#000'
            this._back.val = '#eee'
        } else if (this._isDark && this._isSoft && !this._isBlue) {
            this._fore.val = '#000'
            this._back.val = '#eee'
        } else if (this._isDark && this._isSoft && !this._isBlue) {
            this._fore.val = '#000'
            this._back.val = '#eee'
        } else if (this._isDark && this._isSoft && !this._isBlue) {
            this._fore.val = '#000'
            this._back.val = '#eee'
        } else if (this._isDark && this._isSoft && !this._isBlue) {
            this._fore.val = '#000'
            this._back.val = '#eee'
        } else if (this._isDark && this._isSoft && !this._isBlue) {
            this._fore.val = '#000'
            this._back.val = '#eee'
    }
    #setLightness() {
        if (this._isDark) {
            
        } else {

        }
    }
    setSoft()
    setHard()
    setBlue()
    setYellow()
    
    get fore() { return this._fore.val }
    set fore(v) { return this._fore.val = v }
    get back() { return this._back.val }
    set back(v) { return this._back.val = v }
    get element() { return this._element }
    #makeAttr(onClick, onKeydown) {
        const attr = {}
        if (onClick) { attr.onclick = (e)=>onClick(e) }
        if (onKeydown) { attr.onkeydown= (e)=>onKeydown(e) }
        attr.onfocus = (e)=>this.#toggleColor()
        attr.onblur = (e)=>this.#toggleColor()
        attr.onmouseenter= (e)=>this.#toggleColor()
        attr.onmouseleave= (e)=>this.#toggleColor()
        attr.style = ()=>this.#style()
        attr.tabindex = 0 // フォーカス可能にする
        return attr
    }
    //#style() { return `user-select:none;cursor:pointer;box-sizing:border-box;border:1px solid #000;display:flex;justify-content:center;align-items:center;padding:0;margin:0;color:${this._color.fore.val};background-color:${this._color.back.val};` }
    #style() { return `user-select:none;cursor:pointer;box-sizing:border-box;border:1px solid #000;display:flex;justify-content:center;align-items:center;padding:0;margin:0;color:${this._color.fore};background-color:${this._color.back};` }
    #toggleColor() {
        console.log('toggleColor():', this._color.fore)
        if ('#000'===this._color.fore) {
            this._color.fore = '#eee'
            this._color.back = '#000'
        } else {
            this._color.fore = '#000'
            this._color.back = '#eee'
        }
    }
    static make(text, onClick, onKeydown) { return new VanButton(text, onClick, onKeydown) }

    /*
    static make(text, onClick, onKeydown) {
        //return div({onclick:(e)=>onClick(e), onkeydown:(e)=>onKeydown(e)}, text)
        return div(this.#makeAttr(onClick, onKeydown), text)
    }
    */
    /*
    static #makeAttr(onClick, onKeydown) {
        const attr = {}
        if (onClick) { attr.onclick = (e)=>onClick(e) }
        if (onKeydown) { attr.onkeydown= (e)=>onKeydown(e) }
        attr.onfocus = (e)=>{}
        attr.style = ()=>this.#style()
        attr.tabindex = 0 // フォーカス可能にする
        return attr
    }
    */
//    static #style() { return `use-select:none;cursor:pointer;box-sizing:border-box;border:1px solid #000;display:flex;justify-content:center;align-items:center;padding:0;margin:0;` }
//    static #style() { return `use-select:none;cursor:pointer;box-sizing:border-box;border:1px solid #000;display:flex;justify-content:center;align-items:center;padding:0;margin:0;color:${this._color.fore.val};background-color:${this._color.back.val};` }
}
window.VanButton = VanButton
})()

(function(){
const {div,span,a} = van.tags
class VanButton {
    States = {'isFree':0, 'isHide':1, 'isDisabled':2, 'isRiveted':3, 'isDown':4, 'isLongDowned':5 }
    constructor(text, onClick, onKeydown) {
        this._state = van.state(this.States.isFree)
        /*
        this._state = vanX.reactive({
            isHide: 0,
            isDisabled: 0,
            isRiveted: 0,
            : 0,
            isLongDowned: 0,
        })
        */
        this._device = {
            'keyboard':{name:'', hasFocus:false, isDown:false, event:null},
            'gamepad':{name:'', hasFocus:false, isDown:false, event:null},
            'mouse':{name:'', isHover:false, isDown:false, event:null},
            'touch':{name:'', isTouch:false, isDown:false, event:null},
        }
        this._text = van.state(text)
        this._color = vanX.reactive({fore:'#000', back:'#eee'})
//        this._isDowning = false // マウス左ボタン押下中またはスペースキー押下中
//        this._isHover = false   // マウスポインタが領域内に存在する
        this._style = vanX.reactive({
            'display': 'flex', // flex,grid,table,none,inline,inline-block,block
            'color': {fore:'#000', back:'#eee'},
            'border': {width:'1px', style:'solid', color:'#000'},
        })
        this._element = this.#makeHtml(onClick, onKeydown)
        console.log(this._style.display)
        console.log(this._style.border)
        console.log(this._style.border.width)
        console.log(this.element)
        console.log(this.element)
    }
    get text() { return this._text }
    get element() { return this._element }
    #makeHtml(onClick, onKeydown) {
        return div(this.#makeAttr(onClick, onKeydown), ()=>this._text.val)
    }
    #makeAttr(onClick, onKeydown) {
        const attr = {}
        if (onClick) { attr.onclick = (e)=>onClick(e) }
        //if (onKeydown) { attr.onkeydown= (e)=>onKeydown(e) }
        attr.onkeydown = (e)=>this.#onKeydown(e)
        attr.onkeyup = (e)=>this.#onKeyup(e)
        attr.onfocus = (e)=>{console.log('focus');this._device.keyboard.isFocus=true;this._state = this.State.isRiveted;}
//        attr.onfocus = (e)=>{console.log('focus');this.#isSelected=true;if(!this._isDowning){this.#setFocusColor()}}
        //attr.onblur = (e)=>{console.log('blur');this.#isSelected=false;this.#setBlurColor();}
//        attr.onblur = (e)=>{console.log('blur');this.#isSelected=false;if(!this._isHover){this.#setBlurColor()};}
        attr.onblur = (e)=>{console.log('blur');this._device.keyboard.isFocus=false;}

//        attr.onmouseenter = (e)=>{console.log('mouseenter');this._isHover=true;}
//        attr.onmouseleave = (e)=>{console.log('mouseleave');this._isHover=false;}
//        attr.onmouseenter = (e)=>{console.log('mouseenter');this._isHover=true;if(!this._isDowning){this.#setFocusColor()}}
//        attr.onmouseleave = (e)=>{console.log('mouseleave');this._isHover=false;if(!this._isHover){this.#setBlurColor()};}
//        attr.onmouseout = (e)=>{console.log('mouseout');this.#isSelected=false;if(this.#hasFocus(e)){this.#setFocusColor()}else{this.#setBlurColor()}this._text.val='ボタン';}
//        attr.onmouseenter = (e)=>{console.log('mouseenter');this._isHover=true;this.#setFocusColor();}
//        attr.onmouseleave = (e)=>{console.log('mouseleave');this._isHover=false;this.#setBlurColor();}
        attr.onmouseenter = (e)=>{console.log('mouseenter');this._device.mouse.isHover=true;this._state = this.State.isRiveted;}
        attr.onmouseleave = (e)=>{console.log('mouseleave');this._device.mouse.isHover=false;}
        attr.onmousedown = (e)=>{console.log('mousedown');this._device.mouse.=true;}
        attr.onmouseup = (e)=>{console.log('mouseup');this._device.mouse.=false;}

        attr.onpointerenter = (e)=>{console.log('pointerenter');this._device.touch.isHover=true;}
        //attr.onpointerenter = (e)=>{console.log('pointerenter');this.#isSelected=true;this.#setFocusColor()}
        //attr.onpointerleave = (e)=>{console.log('pointerleave');this.#isSelected=false;if(!this.#hasFocus(e)){this.#setBlurColor()}}
        //attr.onpointerleave = (e)=>{console.log('pointerleave');this.#isSelected=false;if(!this.#hasFocus(e)&&!this._isHover){this.#setBlurColor()}}
        attr.onpointerleave = (e)=>{console.log('pointerleave');this._device.touch.isHover=false;}
        //attr.onpointerout = (e)=>{console.log('pointerout');this.#isSelected=false;if(!this.#hasFocus(e)){this.#setBlurColor()}}
        //attr.onpointerout = (e)=>{console.log('pointerout');this.#isSelected=false;if(this.#hasFocus(e)){this.#setFocusColor()}else{this.#setBlurColor()}this._text.val='ボタン';}
        attr.onpointerin = (e)=>{console.log('pointerin');this._device.touch.isHover=true;}
        attr.onpointerout = (e)=>{console.log('pointerout');this._device.touch.isHover=false;}
//        attr.onpointerdown = (e)=>{console.log('pointerdown');this._isDowning=true;this.#isSelected=true;this.#setDownColor()}
//        attr.onpointerup = (e)=>{console.log('pointerup');this._isDowning=false;this.#isSelected=false;this.#setUpColor(e)}
//        attr.onpointercancel = (e)=>{console.log('pointercancel');this.#isSelected=false;this.#setUpColor(e)}
        attr.onpointerdown = (e)=>{console.log('pointerdown');this._device.touch.=false;}
        attr.onpointerup = (e)=>{console.log('pointerup');this._device.touch.=false;}
        attr.onpointercancel = (e)=>{console.log('pointercancel');this._device.touch.=false;}

//        attr.onmouseenter= (e)=>{this.#setFocusColor()}
//        attr.onmouseleave= (e)=>{if(!this.#hasFocus(e)){this.#setBlurColor()}}
        attr.style = ()=>this.#style()
        attr.tabindex = 0 // フォーカス可能にする
        return attr
    }
    #onKeydown(e) {
        console.log('#onKeydown(e):', e.key)
        if      (' '===e.key) { this._state = this.State.isDown; this._device.keyboard.isDown = true; }
//        else if ('Enter'===e.key) { this.#isSelected=true;this.#setDownColor(); }
//        else if ('Esc'===e.key) { this.#isSelected=true;this.#setDownColor(); }
//        else if ('F1'===e.key) { this.#isSelected=true;this.#setDownColor(); }
    }
    #onKeyup(e) {
        console.log('#onKeyup(e)')
        //if (' '===e.key) { this.#isSelected=false;this.#setUpColor(e); }
        if (' '===e.key) { this._device.keyboard.isDown = false; }

    }
//    get #isSelected() { return this._isSelected }
//    set #isSelected(v) { this._isSelected = v }
    #hasFocus(e) { return (e.target===document.activeElement) }
    //#style() { return `user-select:none;cursor:pointer;box-sizing:border-box;border:1px solid #000;display:flex;justify-content:center;align-items:center;padding:0;margin:0;color:${this._color.fore.val};background-color:${this._color.back.val};` }
    //#style() { return `user-select:none;cursor:pointer;box-sizing:border-box;border:1px solid #000;display:flex;justify-content:center;align-items:center;padding:0;margin:0;color:${this._color.fore};background-color:${this._color.back};border-radius:8px;` }
    #style() { return `user-select:none;cursor:pointer;box-sizing:border-box;${this.#border()}${this.#display()}justify-content:center;align-items:center;padding:0;margin:0;color:${this._style.color.fore};background-color:${this._style.color.back};border-radius:8px;` }
    //#display() { console.log(`${this._style.display}`); return `display:${this._style.display};`; }
    #display() { return `display:${this._style.display};`; }
//    #border() { return `border:${this._style.border.width} ${this._style.border.style} ${this._style.border.color};` }
    #border() { return `border:1px solid #000;` }
    #updateState() {
        if (this._device.keyboard.hasFocus || this._device.gamepad.hasFocus || this._device.mouse.isHover) {
            this._state = this.States.isRiveted
        }
        if (this._device.keyboard.isDown || this._device.gamepad.isDown || this._device.mouse.isDown || this._device.touch.isTouch) {
            this._state = this.States.isDown
        }
    }
    #updateStyle() {
        this.#updateState()
        switch (this._state) {
            case this.States.isFree: return this.#setStyleFree()
            case this.States.isHide: return this.#setStyleHide()
            case this.States.isDisabled: return this.#setStyleDisabled()
            case this.States.isRiveted: return this.#setStyleRiveted()
            case this.States.isDown: return this.#setStyleDown()
            case this.States.isLongDown: return this.#setStyleLongDown()
            default: throw new Error('不正な状態です。')
        }
    }
    #setStyleFree() {
        this._color.fore = colorShceme.main // Css.get('--cs-main')
        this._color.back = colorShceme.base // Css.get('--cs-base')
    }
    #setStyleHide() { this._style.display = 'none' }
    #setStyleDisabled() {
        this._color.fore = chroma.average(colorShceme.main, colorShceme.base)
        this._color.back = chroma.average(colorShceme.main, colorShceme.base)
    }
    #setStyleRiveted() {
        this._color.fore = colorShceme.base
        this._color.back = colorShceme.main
    }
    #setStyleDown() {
        this._color.fore = colorShceme.accent
        this._color.back = colorShceme.base
    }
    #toggleColor() {
        console.log('toggleColor():', this._color.fore)
        if ('#000'===this._color.fore) { this.#setFocusColor() }
        else { this.#setBlurColor() }
    }
    #setFocusColor() {
        this._color.fore = '#eee'
        this._color.back = '#000'
        this._text.val = 'ボタン（フォーカスが当たっている）'
    }
    #setBlurColor() {
        console.log('#setBlurColor()')
//        if(!this._isDowning) {
            this._color.fore = '#000'
            this._color.back = '#eee'
            this._text.val = 'ボタン（フォーカスが外れている）'
//        }
    }
    #setDownColor() {
        this._color.fore = '#a00'
        this._color.back = '#eee'
        this._text.val = 'ボタンを押している'
    }
    #setUpColor(e) {
        if(!this.isSelected && !this.#hasFocus(e)) { this.#setBlurColor() }
        else { this.#setFocusColor() }
        this._text.val = 'ボタンを離した'
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

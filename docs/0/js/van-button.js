(function(){
const {div,span,a} = van.tags
class VanButton {
    constructor(text, onClick, onKeydown) {
        this._text = van.state(text)
        this._color = vanX.reactive({fore:'#000', back:'#eee'})
        this._element = div(this.#makeAttr(onClick, onKeydown), ()=>this._text.val)
        this._isDowning = false // マウス左ボタン押下中またはスペースキー押下中
        this._isHover = false   // マウスポインタが領域内に存在する
        console.log(this.element)
        console.log(this.element)
    }
    get text() { return this._text }
    get element() { return this._element }
    #makeAttr(onClick, onKeydown) {
        const attr = {}
        if (onClick) { attr.onclick = (e)=>onClick(e) }
        //if (onKeydown) { attr.onkeydown= (e)=>onKeydown(e) }
        attr.onkeydown = (e)=>this.#onKeydown(e)
        attr.onkeyup = (e)=>this.#onKeyup(e)
        attr.onfocus = (e)=>{console.log('focus');this.#isSelected=true;if(!this._isDowning){this.#setFocusColor()}}
        //attr.onblur = (e)=>{console.log('blur');this.#isSelected=false;this.#setBlurColor();}
        attr.onblur = (e)=>{console.log('blur');this.#isSelected=false;if(!this._isHover){this.#setBlurColor()};}

//        attr.onmouseenter = (e)=>{console.log('mouseenter');this._isHover=true;}
//        attr.onmouseleave = (e)=>{console.log('mouseleave');this._isHover=false;}
//        attr.onmouseenter = (e)=>{console.log('mouseenter');this._isHover=true;if(!this._isDowning){this.#setFocusColor()}}
//        attr.onmouseleave = (e)=>{console.log('mouseleave');this._isHover=false;if(!this._isHover){this.#setBlurColor()};}
        attr.onmouseenter = (e)=>{console.log('mouseenter');this._isHover=true;this.#setFocusColor();}
        attr.onmouseleave = (e)=>{console.log('mouseleave');this._isHover=false;this.#setBlurColor();}
//        attr.onmouseout = (e)=>{console.log('mouseout');this.#isSelected=false;if(this.#hasFocus(e)){this.#setFocusColor()}else{this.#setBlurColor()}this._text.val='ボタン';}

        attr.onpointerenter = (e)=>{console.log('pointerenter');this.#isSelected=true;this.#setFocusColor()}
        //attr.onpointerleave = (e)=>{console.log('pointerleave');this.#isSelected=false;if(!this.#hasFocus(e)){this.#setBlurColor()}}
        attr.onpointerleave = (e)=>{console.log('pointerleave');this.#isSelected=false;if(!this.#hasFocus(e)&&!this._isHover){this.#setBlurColor()}}
        //attr.onpointerout = (e)=>{console.log('pointerout');this.#isSelected=false;if(!this.#hasFocus(e)){this.#setBlurColor()}}
        attr.onpointerout = (e)=>{console.log('pointerout');this.#isSelected=false;if(this.#hasFocus(e)){this.#setFocusColor()}else{this.#setBlurColor()}this._text.val='ボタン';}
        attr.onpointerdown = (e)=>{console.log('pointerdown');this._isDowning=true;this.#isSelected=true;this.#setDownColor()}
        attr.onpointerup = (e)=>{console.log('pointerup');this._isDowning=false;this.#isSelected=false;this.#setUpColor(e)}
        attr.onpointercancel = (e)=>{console.log('pointercancel');this.#isSelected=false;this.#setUpColor(e)}
//        attr.onmouseenter= (e)=>{this.#setFocusColor()}
//        attr.onmouseleave= (e)=>{if(!this.#hasFocus(e)){this.#setBlurColor()}}
        attr.style = ()=>this.#style()
        attr.tabindex = 0 // フォーカス可能にする
        return attr
    }
    #onKeydown(e) {
        console.log('#onKeydown(e):', e.key)
        if (' '===e.key) { this.#isSelected=true;this.#setDownColor(); }
    }
    #onKeyup(e) {
        console.log('#onKeyup(e)')
        if (' '===e.key) { this.#isSelected=false;this.#setUpColor(e); }
    }
    get #isSelected() { return this._isSelected }
    set #isSelected(v) { this._isSelected = v }
    #hasFocus(e) { return (e.target===document.activeElement) }
    //#style() { return `user-select:none;cursor:pointer;box-sizing:border-box;border:1px solid #000;display:flex;justify-content:center;align-items:center;padding:0;margin:0;color:${this._color.fore.val};background-color:${this._color.back.val};` }
    #style() { return `user-select:none;cursor:pointer;box-sizing:border-box;border:1px solid #000;display:flex;justify-content:center;align-items:center;padding:0;margin:0;color:${this._color.fore};background-color:${this._color.back};border-radius:8px;` }
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

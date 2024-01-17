(function(){
const {div,span,a} = van.tags
class VanButton {
    static make(text, onClick, onKeydown) { return new VanButton(text, onClick, onKeydown) }
    States = {'isFree':0, 'isHide':1, 'isDisabled':2, 'isRiveted':3, 'isDown':4, 'isLongDowned':5 }
    constructor(text, onClick, onKeydown) {
        this._state = this.States.isFree
        this._device = {
            'keyboard':{name:'', isFocus:false, isDown:false, event:null},
            'gamepad':{name:'', isFocus:false, isDown:false, event:null},
            'mouse':{name:'', isHover:false, isDown:false, event:null},
            'touch':{name:'', isTouch:false, event:null},
        }
        this._text = van.state(text)
        this._themeColor = {
            base: chroma('#000'),
            main: chroma('#0d0'),
            accent: chroma('#dd0'),
        }
        this._style = vanX.reactive({
            'display': 'flex', // flex,grid,table,none,inline,inline-block,block
            'color': {fore:'#000', back:'#eee'},
            'border': {width:'2px', style:'solid', color:'#dd0'},
            'outline': {width:'2px', style:'dashed', color:'#000', offset:'2px' },
        })
        this._element = this.#makeHtml(onClick, onKeydown)
        this.#updateState() 
        console.log(this._style.display)
        console.log(this._style.border)
        console.log(this._style.border.width)
        console.log(this.element)
        console.log(this.element)
    }
    get text() { return this._text }
    get element() { return this._element }
    #makeHtml(onClick, onKeydown) {
        return div(this.#makeAttr(onClick, onKeydown), ()=>this._text.val) // div要素はonfocusが機能しない?!
        //return a(this.#makeAttr(onClick, onKeydown), ()=>this._text.val)
    }
    #makeAttr(onClick, onKeydown) {
        const attr = {}
        if (onClick) { attr.onclick = (e)=>onClick(e) }
        attr.onkeydown = (e)=>this.#onKeydown(e)
        attr.onkeyup = (e)=>this.#onKeyup(e)
        attr.onfocus = (e)=>{console.log('focus');this._device.keyboard.isFocus=true;this.#updateState();}
        attr.onblur = (e)=>{console.log('blur');this._device.keyboard.isFocus=false;this.#updateState();}
        attr.onmouseenter = (e)=>{console.log('mouseenter');this._device.mouse.isHover=true;this.#updateState();}
        attr.onmouseleave = (e)=>{console.log('mouseleave');this._device.mouse.isHover=false;this.#updateState();}
        attr.onmousedown = (e)=>{console.log('mousedown');this._device.mouse.isDown=true;this.#updateState();}
        attr.onmouseup = (e)=>{console.log('mouseup');this._device.mouse.isDown=false;this.#updateState();}
        attr.onpointerenter = (e)=>{console.log('pointerenter');this._device.touch.isHover=true;this.#updateState();}
        attr.onpointerleave = (e)=>{console.log('pointerleave');this._device.touch.isHover=false;this.#updateState();}
        attr.onpointerin = (e)=>{console.log('pointerin');this._device.touch.isHover=true;this.#updateState();}
        attr.onpointerout = (e)=>{console.log('pointerout');this._device.touch.isHover=false;this.#updateState();}
        attr.onpointerdown = (e)=>{console.log('pointerdown');this._device.touch.isTouch=true;this.#updateState();}
        attr.onpointerup = (e)=>{console.log('pointerup');this._device.touch.isTouch=false;this.#updateState();}
        attr.onpointercancel = (e)=>{console.log('pointercancel');this._device.touch.isTouch=false;this.#updateState();}
        attr.style = ()=>this.#style()
        attr.tabindex = 0 // フォーカス可能にする
        return attr
    }
    #onKeydown(e) {
        console.log('#onKeydown(e):', e.key, ' '===e.key)
        if      ([' ', 'Enter'].some(k=>k===e.key)) { this._device.keyboard.isDown = true; this.#updateState(); }
//        else if ('Enter'===e.key) { this._device.keyboard.isDown = true; this.#updateState(); }
//        else if ('Esc'===e.key) {  }
//        else if ('F1'===e.key) {  }
    }
    #onKeyup(e) {
        console.log('#onKeyup(e):', e.key)
        if ([' ', 'Enter'].some(k=>k===e.key)) { this._device.keyboard.isDown = false; this.#updateState(); }
    }
    #hasFocus(e) { return (e.target===document.activeElement) }
    #style() { return `user-select:none;cursor:pointer;box-sizing:border-box;${this.#outline()}${this.#border()}${this.#display()}justify-content:center;align-items:center;padding:0;margin:0;color:${this._style.color.fore};background-color:${this._style.color.back};` }
    #display() { return `display:${this._style.display};`; }
    #border() { return `border-width:${this._style.border.width};border-style:${this._style.border.style};border-color:${this._style.border.color};${this.#borderRadius()}` }
    #borderRadius() { return `border-radius:8px;` }
    #outline() { return `outline-width:${this._style.outline.width};outline-style:${this._style.outline.style};outline-color:${this._style.outline.color};outline-offset:${this._style.outline.offset};` }
    #updateState() {
        if (this.States.isHide===this._state) { }
        else if (this.States.isDisabled===this._state) { }
        else if (this.#isRiveted()) { this._state = ((this.#isDown()) ? this.States.isDown : this.States.isRiveted); }
        else if (this.#isDown()) { this._state = this.States.isDown }
        else { this._state = this.States.isFree; }
        console.log('this._state:', this._state)
        console.log('key:', this._device.keyboard.isFocus, 'pad:', this._device.gamepad.isFocus, 'hov:', this._device.mouse.isHover)
        console.log('key:', this._device.keyboard.isDown, 'pad:', this._device.gamepad.isDown, 'mou:', this._device.mouse.isDown, 'tou:', this._device.touch.isTouch)
        this.#updateStyle()
    }

    #isDown() { return (this._device.keyboard.isDown || this._device.gamepad.isDown || this._device.mouse.isDown || this._device.touch.isTouch) }
    #isRiveted() { return (this._device.keyboard.isFocus || this._device.gamepad.isFocus || this._device.mouse.isHover) }
    #updateStyle() {
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
        console.log('#setStyleFree()', this._style.color.fore, this._style.color.fore.val)
        this._style.color.fore = this._themeColor.main.hex() // Css.get('--cs-main')
        this._style.color.back = this._themeColor.base.hex() // Css.get('--cs-base')
        //this._style.border.color = this._style.color.fore
        this._style.border.color = this._themeColor.accent.hex()
        this._style.outline.width = '0px'
        console.log('fore:', this._style.color.fore)
        console.log('back:', this._style.color.back)
    }
    #setStyleHide() { this._style.display = 'none' }
    #setStyleDisabled() {
        this._style.color.fore = chroma.average(this._themeColor.main, this._themeColor.base).hex()
        this._style.color.back = chroma.average(this._themeColor.main, this._themeColor.base).hex()
        this._style.border.color = this._style.color.fore
        this._style.outline.width = '0px'
    }
    #setStyleRiveted() {
        console.log('#setStyleRiveted()', this._style.color.fore, this._style.color.fore.val)
        this._style.color.fore = this._themeColor.base.hex()
        this._style.color.back = this._themeColor.main.hex()
        this._style.border.color = this._style.color.fore
        this._style.outline.width = '2px'
        this._style.outline.color = this._themeColor.accent.hex()
        console.log('fore:', this._style.color.fore)
        console.log('back:', this._style.color.back)
    }
    #setStyleDown() {
        this._style.color.fore = this._themeColor.accent.hex()
        this._style.color.back = this._themeColor.base.hex()
        this._style.border.color = this._style.color.fore
        this._style.outline.width = '2px'
    }
    #setStyleLongDown() {
        this._style.color.fore = this._themeColor.accent.hex()
        this._style.color.back = this._themeColor.base.hex()
        this._style.border.color = this._style.color.fore
        this._style.outline.width = '2px'
    }
}
window.VanButton = VanButton
})()

(function(){
class Client {
    constructor() {
        this._writingMode = new ClientWritingMode()
        this._scrollBar = new ClientScrollBar(this._writingMode)
//        this._size = new ClientSize(this._writingMode)
    }
//    get size() { return this._size }
    get writingMode() { return this._writingMode }
    get scrollBar() { return this._scrollBar }

    get width() { return document.body.clientWidth }
    get height() { return document.documentElement.clientHeight }
    get edge() { return ({long:this.long, short:this.short}) }
    get long() { return (this.height <= this.width) ? {dir:'width', size:this.width} : {dir:'height', size:this.height} }
    get short() { return (this.height <= this.width) ? {dir:'height', size:this.height} : {dir:'width', size:this.width} }
    get longDir() { return (this.height <= this.width) ? 'width' : 'height' }
    get shortDir() { return (this.height <= this.width) ? 'height' : 'width' }
    get longSize() { return (this.height <= this.width) ? this.width : this.height }
    get shortSize() { return (this.height <= this.width) ? this.height : this.width }
    get isLandscape() { return 'width'===this.longDir }
    get isPortrate() { return 'height'===this.longDir }
    get inlineSize() { return ((this._writingMode.isHorizontal) ? this.width : this.height) }
    get blockSize() { return ((this._writingMode.isHorizontal) ? this.height : this.width) }
}
class ClientWritingMode {
    get isHorizontal() { return Css.get('writing-mode').startsWith('horizontal') }
    get isVertical() { return Css.get('writing-mode').startsWith('vertical') }
    setHorizontal() { Css.set('writing-mode', 'horizontal-tb'); this.#setTextOrientation(); }
    setVertical() { Css.set('writing-mode', 'vertical-rl'); this.#setTextOrientation(); }
    toggle() { Css.set('writing-mode', ((this.isHorizontal) ? 'vertical-rl' : 'horizontal-tb')); this.#setTextOrientation(); }
    #setTextOrientation() { Css.set('text-orientation', ((this.isHorizontal) ? 'mixed' : 'upright')) }
}
class ClientScrollBar {
    constructor(clientWritingMode) { this._cwm = clientWritingMode }
    get hasHorizontal() { return 0 < this.width }
    get hasVertial() { return 0 < this.height }
    get width() { return (window.innerWidth - document.body.clientWidth) }
    get height() { return (window.innerHeight - document.documentElement.clientHeight) }
    get inlineSize() { return ((this._cwm.isHorizontal) ? this.width : this.height) }
    get blockSize() { return ((this._cwm.isHorizontal) ? this.height : this.width) }
}
window.Client = new Client()
/*
class ClientSize {
    constructor(clientWritingMode) { this._cwm = clientWritingMode }
    get width() { return document.body.clientWidth }
    get height() { return document.documentElement.clientHeight }
    get edge() { return ({long:this.long, short:this.short}) }
    get long() { return (this.height <= this.width) ? {dir:'width', size:this.width} : {dir:'height', size:this.height} }
    get short() { return (this.height <= this.width) ? {dir:'height', size:this.height} : {dir:'width', size:this.width} }
    get longDir() { return (this.height <= this.width) ? 'width' : 'height' }
    get shortDir() { return (this.height <= this.width) ? 'height' : 'width' }
    get longSize() { return (this.height <= this.width) ? this.width : this.height }
    get shortSize() { return (this.height <= this.width) ? this.height : this.width }
    get isLandscape() { return 'width'===this.longDir }
    get isPortrate() { return 'height'===this.longDir }
    get inlineSize() { return ((this._cwm.isHorizontal) ? this.width : this.height) }
    get blockSize() { return ((this._cwm.isHorizontal) ? this.height : this.width) }
}
*/
class ElementSize {
    get width() { return document.body.clientWidth }
    get height() { return document.documentElement.clientHeight }
    get long() { return (this.height <= this.width) ? {dir:'width', size:this.width} : {dir:'height', size:this.height} }
    get short() { return (this.height <= this.width) ? {dir:'height', size:this.height} : {dir:'width', size:this.width} }
    get isLandscape() { return 'width'===this.long.dir }
    get isPortrate() { return 'height'===this.long.dir }
    get inlineSize() { return ((ClientWritingMode.isHorizontal) ? this.width : this.height) }
    get blockSize() { return ((ClientWritingMode.isHorizontal) ? this.height : this.width) }

    // https://webfrontend.ninja/js-how-to-get-dimension-of-html-element/
//    getMarginBox() { }
    getBorderBox(el)  { const b=el.getBoundingClientRect(); b.inlineSize=((this.isHorizontal(el)) ? b.width : b.height); b.blockSize=((this.isHorizontal(el)) ? b.height : b.width); return b; } // offset[Width,Height]
    getPaddingBox(el) { return {width:el.clientWidth, height:el.clientHeight, inlineSize:((this.isHorizontal(el)) ? el.clientWidth : el.clientHeight), blockSize:((this.isHorizontal(el)) ? el.clientHeight : el.clientWidth)} }
    getContentBox(el) { const s=getComputedStyle(el); return {width:s.width, height:s.height, inlineSize:s.inlineSize, blockSize:s.blockSize} }

    isHorizontal(el) { return Css.get('writing-mode').startsWith('horizontal') }
    isVertical(el) { return Css.get('writing-mode').startsWith('vertical') }
    inlineSize(el) { return ((this.isHorizontal(el)) ? el.clientWidth : el.clientHeight)
        return 
    }
    /*
    +--Margin Box---------+
    |+--Border Box-------+|
    ||+--Padding Box----+||
    |||+--Content Box--+|||
    ||||               ||||
    |||+---------------+|||
    ||+-----------------+||
    |+-------------------+|
    +---------------------+
    */
}
class ElementWritingMode {
    Css.get('writing-mode').startsWith('horizontal')
    Css.get('writing-mode').startsWith('vertical')
}
class ElementScrollBar {
    get has() { return ((this.el.isHorizontal) ? this.el.scrollHeight > this.el.this.height : this.el.scrollWidth > this.el.this.width) }
    get size() { return ((this.el.isHorizontal) ? this.el.offsetHeight - this.el.clientHeight : this.el.offsetWidth - this.el.clientWidth) }
}


class Size {
    get width(el) { return ((el) ? el.width : document.body.clientWidth) }
    get height(el) { return (el) ? el.height : document.documentElement.clientHeight) }
    get long(el) { return (this.height <= this.width) ? {dir:'width',size:this.width(el)} : {dir:'height',size:this.height(el)} }
    get short(el) { return (this.height <= this.width) ? {dir:'height',size:this.height(el)} : {dir:'width',size:this.width(el)} }
    get isLandscape(el) { return 'width'===this.long(el).dir }
    get isPortrate(el) { return 'height'===this.long(el).dir }
    get isHorizontal(el) { return Css.get('writing-mode', el).startsWith('horizontal') }
    get isVertical(el) { return Css.get('writing-mode', el).startsWith('vertical') }
    get inlineSize(el) { return ((this.isHorizontal(el)) ? this.width(el) : this.height(el)) }
    get blockSize(el) { return ((this.isHorizontal(el)) ? this.height(el) : this.width(el)) }
}

class Font {
    get MIN() { return 16 }
    get size() { return this.calc(Client.inlineSize) }
    calc(inlineSize=undefined) {
        if (undefined===inlineSize) { inlineSize = Client.inlineSize }
        const minLineChars = inlineSize / this.MIN
        if (minLineChars <= 30) { return 16; }      // Screen<=480px: 16px/1字   1〜30字/行
        else if (minLineChars <= 40) { return 18; } // Screen<=640px: 18px/1字   26.6〜35.5字/行
        else { return (inlineSize / 40); }   // Screen> 640px: 16〜px/1字 40字/行
    }
}
window.Client = Client
window.FontSize = new FontSize()
/*
class FontSize {
    constructor(inlineSize) {
        this.size = this.calc(inlineSize)
    }
    calc(inlineSize) {
//        const minLineChars = inlineSize / 16
        const minLineChars = FontSize.calcLineOfCharMax(inlineSize)
        if (minLineChars <= 30) { return 16; } // Screen<=480px: 16px/1字 1〜30字/行
        else if (minLineChars <= 40) { return 18; } // Screen<=640px: 18px/1字 26.6〜35.5字/行
        else { return (inlineSize / 40); } // Screen<=640px: ?px/1字 40字/行
    }
    setProp() { Css.set('--font-size', `${this.size}px`) }
    setBody() { Css.set('font-size', `${this.size}px`, document.body) }
    static get min() { return 16 }
    static calcLineOfCharMax(inlineSize) { return inlineSize / this.min }
    static calcLineOfChar(inlineSize, fontSize) { return inlineSize / fontSize }
}
*/
})

(function(){
class Client {
    get width() { return document.body.clientWidth }
    get height() { return document.documentElement.clientHeight }
    get long() { return (this.height <= this.width) ? {dir:'width', size:this.width} : {dir:'height', size:this.height} }
    get short() { return (this.height <= this.width) ? {dir:'height', size:this.height} : {dir:'width', size:this.width} }
    get isLandscape() { return 'width'===this.long.dir }
    get isPortrate() { return 'height'===this.long.dir }
    get isHorizontal() { return Css.get('writing-mode').startsWith('horizontal') }
    get isVertical() { return Css.get('writing-mode').startsWith('vertical') }
    get inlineSize() { return ((this.isHorizontal) ? this.width : this.height) }
    get blockSize() { return ((this.isHorizontal) ? this.height : this.width) }
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

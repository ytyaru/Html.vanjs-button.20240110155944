(function(){
class ColorScheme {
    static Dark(main='g', hasBlue=false) { return new ColorScheme('#000','#0d0','#dd0') } // y,g,o,r,w

#dd0,#0d0,#da0,
    static Light() { return new ColorScheme('#222','#000','#0a0') }
    static Hilight() { return new ColorScheme('#fff','#000','#0a0') }
    /*
    static Random() { return new ColorScheme() }
    // https://oklch.com/#48.52,0.47,289.32,100
    // 全hueがある明度Lと彩度Cの組み合わせは？どう計算するか不明。
    // 95.29%,0.0248
    // 74.63
    // 59.79,0.1416

    // chroma(明度0-1,彩度0-1,色相0-360)色相:赤,橙,黄,緑,青,紫
    static #randomColor(isDark, isDull, hueDir=0) { return chroma(this.#lightness(isDark), #saturate(isDull), 60, 'oklch') } 
    static #lightness(isDark) { return this.#scale(isDark) } // D:0-0.25,L:0.75-1
    static #saturate(isDull) { return this.#scale(isDull) * 0.4 }  // 0-0.4
    static #scale(isDark) { ((Math.random() * 0.2.5) * ((isDark) ?  1 : -1)) + ((isDark) ? 0 : 1) } // D:0-0.25,L:0.75-1

    // 

    static #randomDarkColor() { return chroma(0.8, 0.12, 60, 'oklch') } // chroma(明度0-1,彩度0-1,色相0-360)色相:赤,橙,黄,緑,青,紫
    static #randomLightColor() { return chroma(0.8, 0.12, 60, 'oklch') } // chroma(明度0-1,彩度0-1,色相0-360)色相:赤,橙,黄,緑,青,紫
    static #randomHue() { Math.random() * 360 }
    static #randomChroma() { Math.random() }
    static #randomLightness() { Math.random() }
    */
    constructor(_base, _main, _accent) {
        this._color = {
            base:   chroma(((_base  ) ? _base   : '#000')) // 70%
            main:   chroma(((_main  ) ? _main   : '#0d0')) // 25%
            accent: chroma(((_accent) ? _accent : '#dd0')) //  5%
        }
        this._reverse = {
            base: this._color.main,      // main swap
            main:base: this._color.base, // base swap
            accent: this._color.accent,
        }
    }
    get base() { return this._color.base }
    get main() { return this._color.main }
    get accent() { return this._color.accent }
    get reverse() { return this._reverse }
    valid() {
        if (chroma.contrast(this._color.base, this._color.main  ) < 4.5) { return false }
        if (chroma.contrast(this._color.base, this._color.accent) < 4.5) { return false }
//        if (chroma.contrast(this._color.main, this._color.accent) < 4.5) { return false }
    }
    disabled() { return chroma.average(this._color.base, this._color.main) }
    backlight() { return chroma.blend(this._color.base, this._color.main, 'lighten') } // th, line-highlight
    reverse() { return }

    // 明暗darken(),brighten()
    // 彩濁saturate(),desaturate()
    // chroma.scale(['white', 'black']).colors(12);  12階調白黒
}
class Judd { // ジャッドの４原則（配色パターン。秩序・親近性・類似性・明瞭性）
    static DominantTone(main) { return new ColorScheme('#fff','#000','#0a0') } // 同一色相（明度・彩度を変える）
    static ToneInTone(main) { return new ColorScheme('#fff','#000','#0a0') }

}
class JuddRegularity { // 秩序の原理 https://www.megasoft.co.jp/3d/colorscheme/pattern1.php
    static dyad(col) { return } // ダイアード（補色２）
    static triad(col) { return } // トライアド（正三角形３）
    static analogous(col) { return } // アナロガス（色相環で隣り合う３色）
    static splitComplementary(col) { return } // スプリット・コンプリメンタリー（補色の両隣３）
    static tetrad(col) { return } // テトラード（正方形４）
    static rectangler(col) { return } // レクタンギュラー（長方形４）
    static pentad(col) { return } // ペンタード（五角形５またはトライアド＋白黒）
    static hexard(col) { return } // ヘクサード（六角形６またはテトラード＋白黒）
}
class JuddAffinity { // 親近性の原理
    static naturalHarmony() { return } // 隣接色相か類似色相の組み合わせで、明るい色を黄っぽく、暗い色を青っぽくすると調和する。
    static complexHarmony() { return } // 上の逆で黄を暗く、青を明るくする（自然界にない）
}
class JuddSimilarity { // 類似性の原理
    static hue_dominant(col) { return }    // 同一色相（トーンを変える。明度差も小さい）
    static hue_toneInTone(col) { return }  // 同一色相（トーンを変える。明度差が大きい）
    static tone_dominant(col) { return }   // 同一色調（明度・彩度を変える。色相差が大きい）
    static tone_toneInTone(col) { return } // 同一色調（明度・彩度を変える。色相差が大きい）
    static tone_tonalColor(col) { return } // 同一色調（明度・彩度を変える。濁色系（ダル、ソフト、グレイッシュ、ライトグレイッシュ））
    static hueTone_camaille(col) { return } // 色相・トーンの類似（カマイユ配色。色相、明度、彩度がほぼ同じ。遠見だと同色に見える）
    static hueTone_focamaille(col) { return } // 色相・トーンの類似（カマイユ配色より。）
}
class JuddClarity { // 明瞭性の原理
    static tricolor(col) { return } // 高彩度の明快なコントラストがある3色。白黒も含めうる。
    static bicolor(col) { return } // 高彩度の明快なコントラストがある2色。白黒も含めうる。
}
window.colorScheme = new ColorScheme()
})()

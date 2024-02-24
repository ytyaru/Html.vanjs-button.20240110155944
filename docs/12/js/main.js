window.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOMContentLoaded!!');
    // イベント追加
    document.querySelector('#b2').addEventListener('push', async(e)=>{
        alert('ボタン２を押した')
    })
    document.querySelector('#b2').addEventListener('hold', async(e)=>{
        alert('ボタン２を長〜く押した')
    })
    // スタイル設定
    const b3 = document.querySelector('#b3')
    b3.style.color = '#000'
    b3.style.backgroundColor = '#fff'
    b3.style.border = '1px solid #000'
    b3.onced = true
    document.querySelector('#b3').addEventListener('push', async(e)=>{alert('ボタン3を押した')})
    document.querySelector('#b3').addEventListener('hold', async(e)=>{alert('ボタン3を長〜く押した')})

    // 動的生成
    const b99 = document.createElement('van-button')
    b99.id = 'b99'
    b99.innerText = 'ボタン99'
    document.body.appendChild(b99)

    // 動的生成（van.js）
    console.log(van.tags.vanButton()) // <vanbutton></vanbutton>
    console.log(van.tags.VanButton()) // <vanbutton></vanbutton>
//    console.log(van.tags['van-button'].vanButton()) // van.tags.van-button.vanButton is not a function
//    van.add(document.body, b4)

    const b12 = document.querySelector('#b12')
    b12.colors = 'yellow,cyan,magenta'

    van.add(document.body, 
        van.tags.button({
            onclick:()=>{
                const isHorizontal = Css.get('writing-mode').startsWith('horizontal')
                const wm = ((isHorizontal) ? 'vertical-rl' : 'horizontal-tb')
                const to = ((isHorizontal) ? 'upright' : 'mixed')
                console.log(wm)
                Css.set('writing-mode', wm)
                Css.set('text-orientation', to)
            },
        },'書字方向変更'),
    )
    /*
    van.add(document.body, 
        van.tags.button({
            onclick:()=>{
                const isHorizontal = Css.get('writing-mode').startsWith('horizontal')
                const wm = ((isHorizontal) ? 'vertical-rl' : 'horizontal-tb')
                console.log(wm)
                Css.set('writing-mode', wm)
            },
        },'書字方向変更'),
        VanButton.make({text:'ボタン', onPush:(e)=>{console.log(`ボタンを押したよ！ ${Date.now()}`);console.log(e);}, onHold:(e)=>{console.log('長〜く押したよ〜ん！');console.log(e);}, isOnce:true}).element)
    */
});
window.addEventListener('beforeunload', (event) => {
    console.log('beforeunload!!');
});


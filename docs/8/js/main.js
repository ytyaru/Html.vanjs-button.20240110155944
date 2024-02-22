window.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOMContentLoaded!!');
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


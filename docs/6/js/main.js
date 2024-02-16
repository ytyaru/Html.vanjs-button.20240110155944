window.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOMContentLoaded!!');
    //van.add(document.body, VanButton.make('ボタン', ()=>alert('ボタンを押したよ！'), ()=>alert('長〜く押したよ〜ん！')).element)
    //van.add(document.body, VanButton.make('ボタン', (e)=>{alert('ボタンを押したよ！');console.log(e);}, (e)=>{alert('長〜く押したよ〜ん！');console.log(e);}).element)
    //van.add(document.body, VanButton.make({text:'ボタン', onPushed:(e)=>{alert(`ボタンを押したよ！ ${Date.now()}`);console.log(e);}, onLongPushed:(e)=>{alert('長〜く押したよ〜ん！');console.log(e);}, isOnce:true}).element)
    //van.add(document.body, VanButton.make({text:'ボタン', onPushed:(e)=>{alert(`ボタンを押したよ！ ${Date.now()}`);console.log(e);}, onLongPushed:(e)=>{alert('長〜く押したよ〜ん！');console.log(e);}, isOnce:false}).element)
    van.add(document.body, 
        van.tags.button({
            onclick:()=>{
                const isHorizontal = Css.get('writing-mode').startsWith('horizontal')
                const wm = ((isHorizontal) ? 'vertical-rl' : 'horizontal-tb')
                console.log(wm)
                Css.set('writing-mode', wm)
            },
        },'書字方向変更'),
        VanButton.make({text:'ボタン', onPushed:(e)=>{console.log(`ボタンを押したよ！ ${Date.now()}`);console.log(e);}, onLongPushed:(e)=>{console.log('長〜く押したよ〜ん！');console.log(e);}, isOnce:true}).element)
});
window.addEventListener('beforeunload', (event) => {
    console.log('beforeunload!!');
});


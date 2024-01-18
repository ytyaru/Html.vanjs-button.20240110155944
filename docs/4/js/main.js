window.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOMContentLoaded!!');
    //van.add(document.body, VanButton.make('ボタン', ()=>alert('ボタンを押したよ！'), ()=>alert('長〜く押したよ〜ん！')).element)
    van.add(document.body, VanButton.make('ボタン', (e)=>{alert('ボタンを押したよ！');console.log(e);}, (e)=>{alert('長〜く押したよ〜ん！');console.log(e);}).element)
});
window.addEventListener('beforeunload', (event) => {
    console.log('beforeunload!!');
});


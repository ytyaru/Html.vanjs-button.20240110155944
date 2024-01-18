window.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOMContentLoaded!!');
    van.add(document.body, VanButton.make('ボタン', ()=>alert('ボタンを押したよ！'), ()=>alert('長〜く押したよ〜ん！')).element)
});
window.addEventListener('beforeunload', (event) => {
    console.log('beforeunload!!');
});


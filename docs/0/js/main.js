window.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOMContentLoaded!!');
    van.add(document.body, VanButton.make('ボタン').element)
});
window.addEventListener('beforeunload', (event) => {
    console.log('beforeunload!!');
});


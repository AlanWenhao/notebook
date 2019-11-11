let button = document.createElement('button');
button.innerHTML = '点我点我';
button.addEventListener('click',event=>{
    debugger;
    import('./hello.js').then(result=>{
        alert(result.default);
    });
});
document.body.appendChild(button);
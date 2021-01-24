(function init(){
    let loadingScreen = document.createElement("div");

    document.body.style.overflowY = "hidden";
    loadingScreen.style = `display: flex; justify-content: center; align-items: center; 
    position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 9999999999999999; background: #262626`;
    loadingScreen.innerHTML = `<div><img src="./dist/img/logo.png" /></div>`;
    document.body.appendChild(loadingScreen);
})()
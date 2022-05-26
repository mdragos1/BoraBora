async function cookies(){
     res = await fetch('/login');
     // get token from fetch request
     const token = await res.json();
     console.log("cookie din browser "+token);
     // set token in cookie
     document.cookie = `token=${token}`;
}

function init(){
    cookies();
    let lastWasBlack=true;
    let header = document.getElementById('coloredText');
    header.textDecoration = "underline";
    let delay = 1000;
    const colors = {1:"#ab854e", 2:"#ffffff"};
    let x = localStorage.getItem('color');
    if(x){
        header.style.textDecorationColor = x;
        header.style.color = x;
    }
    setInterval(() =>{
    let actualColor = '#191919';
    if(lastWasBlack == true){
        colorId = Math.floor(Math.random() * 2 +1);
        actualColor = colors[colorId];
    }
    header.style.textDecorationColor = actualColor;
    header.style.color = actualColor;
    lastWasBlack = !lastWasBlack;
    localStorage.setItem('color', actualColor);
    }, delay);
}



window.addEventListener("load", init);


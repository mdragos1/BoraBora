
function init(){
    //console.log(background);
    let background = document.getElementById('edis');
    let color = getComputedStyle(background).color;
    let events = document.getElementsByClassName('eventContainer');
    console.log(events[0]);
    for(let i=0; i<3; i++){
        let rect = events[i].getBoundingClientRect();
        events[i].addEventListener('click', function(){createPopup(i, color, rect);});
    }
}

function createPopup(n, color, rect) {
    const div = document.createElement('div');
    document.body.appendChild(div);
    div.classList.add("popup")
    div.setAttribute("id", "popup");
    console.log(rect);
    div.style.width = `${rect.width}px`;
    div.style.left = `${rect.left}px`;
    console.log(div.style.width);
    const text = document.createElement('div');
    div.appendChild(text);
    console.log(n);
    if(n==0){
        text.innerHTML="Apasa pe aceasta fereastra pentru a vedea mai multe detalii despre programul nostru de Craciun";
    }else if(n==1){
        text.innerHTML="Apasa pe aceasta fereastra pentru a vedea mai multe detalii despre programul nostru de 8 Martie";
    }else if(n==2){
        text.innerHTML="Apasa pe aceasta fereastra pentru a vedea mai multe detalii despre programul nostru de Revelion";
    }
    text.style.textAlign="center";
    text.style.marginTop="5vh";
    text.style.fontSize="18px";

    const link=document.createElement('a');
    div.appendChild(link);
    link.href="events";
    link.style.width="100%";
    link.style.height="100%";
    // link.style.position= "absolute";
    link.style.top="0";
    link.style.left="0";
    link.style.color = color;

    div.addEventListener('click',(event)=>{window.open('/events');
     onClickDelete(event);
    });
    
    const button=document.createElement('button');
    button.classList.add("btn");
    div.appendChild(button);
    // button.style.position="absolute"
    button.innerHTML="Close"; 
    button.addEventListener("click", onClickDelete);

}
document.addEventListener('keydown',(event)=>{
    if(event.key == 'Escape'){
        onClickDelete(event);
    }else{return;}
});
function onClickDelete(event){
    let a = document.getElementById("popup");
    a.remove();
    if(event.currentTarget.tagName == 'BUTTON'){
        event.stopPropagation();
    }
}

window.addEventListener("load", init);
async function init(){
    let div = document.getElementById('text');
    let text = "";
    let email = document.getElementById('mail').textContent;
    console.log(email);
    try{
        let rezultat = await fetch('/reservations');
        let rezervari = await rezultat.json();
        rezervari.forEach(element => {
            if(email == element.email){
                console.log();
                text+= `Nume: ${element.name} Data: ${element.date} Nr.Persoane: ${element.number}`;
                text+= `<br>`
            }
        });
        console.log(text);
        if(text==""){
            text +=`Nu ai inca o rezervare facuta! <br> Fa una chiar acum acum acessand butonul de mai jos!`;
            let btn = document.createElement('button');
            div.innerHTML = text;
            btn.setAttribute('class','btn')
            btn.innerHTML = "Rezervari";
            btn.addEventListener('click',(event)=>{
                window.location="/contact";
            })
            document.querySelector('.main').append(btn);
            //div.append(btn);
        }else{
            div.innerHTML = text;
        }
        
    }catch(error){
        console.log(error);
    }
}
window.addEventListener("load", init);
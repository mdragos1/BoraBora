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
        div.innerHTML = text;
    }catch(error){
        console.log(error);
    }
}
window.addEventListener("load", init);
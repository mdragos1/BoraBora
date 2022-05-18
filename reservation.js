async function init(){
    let div = document.getElementById('text');
    let text = "";
    try{
        let rezultat = await fetch('/reservations');
        let rezervari = await rezultat.json();
        rezervari.forEach(element => {
            console.log(element);
            text+= `Nume: ${element.name} Data: ${element.date} Nr.Persoane: ${element.number}`;
            text+= `<br>`
        });
        div.innerHTML = text;
    }catch(error){
        console.log(error);
    }
}
window.addEventListener("load", init);
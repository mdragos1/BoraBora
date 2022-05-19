function handleSubmit(event){
    console.log(event.target);
    const phoneNumberFormat=/^(07)(\d{8})$/;
    const name = document.querySelector('[name="name"]').value;
    const email = document.querySelector('[name="email"]').value;
    const phone = document.querySelector('[name="phone"]').value;
    const date = document.querySelector('[name="date"]').value;
    const numberOfPersons = document.querySelector('[name="number"]').value;

    const tableType = document.querySelector('[name="table"]:checked').value;
    if(phoneNumberFormat.test(phone) == false){
        let mesaj="";
        if(event.target.tagName == 'FORM'){
            mesaj = "Acest " + event.target.id + " nu poate fi completat! Numar invalid!";
        }else
            mesaj = "Numar invalid!";
        window.alert(mesaj);
        document.location.reload();
        event.preventDefault();
        return;
    }
}

function minDate(){
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth()+1;
    let yyyy = today.getFullYear();
    if(dd<10){
        dd='0'+dd
    } 
    if(mm<10){
        mm='0'+mm
    } 
    today = yyyy+'-'+mm+'-'+dd;
    document.getElementById("datefield").setAttribute("min", today);
}

function init(){
    minDate();
    document.addEventListener('submit',handleSubmit);
}

window.addEventListener("load",  init);
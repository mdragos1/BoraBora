function handleSubmit(event){
    const phoneNumberFormat=/^(07)(\d{8})$/;
    const name = document.querySelector('[name="name"]').value;
    const email = document.querySelector('[name="email"]').value;
    const phone = document.querySelector('[name="phone"]').value;
    const date = document.querySelector('[name="date"]').value;
    const numberOfPersons = document.querySelector('[name="number"]').value;

    const tableType = document.querySelector('[name="table"]:checked').value;
    
    if(phoneNumberFormat.test(phone) == false){
        window.alert('Numar invalid');
        document.location.reload();
        return;
    }
    let string = numberOfPersons+" "+date+" "+phone+" "+email+" "+name + "       "+ tableType;
    window.alert(string);
    let confirmation =  document.createElement('div');
    
    confirmation.innerText=string;
    confirmation.style.position = "absolute";
    confirmation.style.zIndex = "3";
    confirmation.style.padding = "3%";
    confirmation.style.backgroundColor = "white";
    confirmation.style.margin = "auto";
    confirmation.style.borderColor= "gold";
    confirmation.style.borderStyle= "solid";
    confirmation.style.borderWidth="6px";
    confirmation.style.width = "25%";
    console.log('cv');
    const main = document.getElementById('niam');
    main.prepend(confirmation);
    
    console.log(tableType);
    event.preventDefault();
}

function init(){
    document.addEventListener('submit', handleSubmit);
}

window.onload = init;
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
    }
    //window.alert(numberOfPersons+" "+date+" "+phone+" "+email+" "+name + "       "+ tableType);
    console.log(tableType);
    event.preventDefault();
}

function init(){
    document.addEventListener('submit', handleSubmit);
}

window.onload = init;
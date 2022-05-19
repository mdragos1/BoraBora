const express = require('express')
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');
const formidable=require('formidable');

let sesion = null;

app.get('/about',function(req,res) {
    res.render('about.ejs' , {user:sesion});
});

app.get('/home',function(req,res) {
    res.render('home.ejs' , {user:sesion});
});

app.get('/events',function(req,res) {
    res.render('events.ejs' , {user:sesion});
});

app.get('/myaccount',function(req,res) {
    res.render('reservation.ejs' , {user:sesion});
});

app.get('/menu',function(req,res) {
    res.render('menu.ejs' , {user:sesion});
});

app.get('/reservations',function(req,res) {
    res.sendFile('reservations.json', {root: path.join(__dirname)});
});

app.get('/signup',function(req,res) {
    res.sendFile('signup.html', {root: path.join(__dirname)});
});

app.get('/login',function(req,res) {
    res.sendFile('login.html', {root: path.join(__dirname)});
});
app.get('/logout',function(req,res) {
    res.sendFile('logout.html', {root: path.join(__dirname)});
    sesion = null;
});

app.use(bodyParser.urlencoded({ extended: false }))

app.get('/contact',function(req,res) {
    res.render('contact.ejs' , {user:sesion});
});

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname));

app.post('/contact', function (req, res) {
    let reservationDetails;
    if (fs.existsSync("reservations.json")){
        console.log('exista');
        let data = fs.readFileSync("reservations.json");
        reservationDetails=JSON.parse(data);
    }else{
        reservationDetails=[];
    }
    const phoneNumberFormat=/^(07)(\d{8})$/;
    let details = { name, email, phone, date, number, table} = req.body;
    if(phoneNumberFormat.test(phone) == true){
        let reservationDone = false;
        reservationDetails.forEach(element => {
            if(email == element['email'] && date == element['date']){
                reservationDone = true;
                return;
            }
        });
        if(reservationDone == true){
            return;
        }else{
            reservationDetails.push(details);
            fs.writeFile('reservations.json',JSON.stringify(reservationDetails),(err) => {
            if (err) {
                throw err;
            }
            });
            const time = new Date(date).getTime() - Date.now();
            const timeDays = Math.floor(time / (1000 * 60 * 60 * 24));
            res.render('template.ejs' ,{user:sesion, name, timeDays}); 
        }
    }
   
});

app.post('/signup',function(req,res){
    let userDetails;
    console.log(fs.existsSync("accounts.json"))
    if (fs.existsSync("accounts.json")){
        console.log('exista');
        let data = fs.readFileSync("accounts.json");
        userDetails=JSON.parse(data);
    }else{
        userDetails=[];
    }
    let emailTaken = false;
    const details = {email, password} = req.body;
    userDetails.forEach(element => {
        if(email == element['email']){
            emailTaken = true;
            return;
        }
    });
    if (emailTaken == true){
        console.log('Exista deja un cont asociat cu aceasta adresa de mail! Incearca din nou!');
        res.sendFile('/signupagain.html', {root: path.join(__dirname)})
    }else{
        userDetails.push(details);
        fs.writeFile('accounts.json',JSON.stringify(userDetails),(err) => {
            if (err) {
                throw err;
            }
        console.log("JSON data is saved.");
        });
        sesion = details;
        res.render('signupwelcome.ejs' ,{user:sesion, email});
    }
});

app.post('/login',function(req,res){
    let userDetails;
    let data = fs.readFileSync("accounts.json");
    userDetails=JSON.parse(data);
    const details = {email, password} = req.body;
    let signin = false;
    userDetails.forEach(element => {
        if(email == element['email'] && password == element['password']){
            sesion = details;
            signin = true;
            return;
        }
    });
    if(signin==true){
        res.render('loginwelcome.ejs' , {user:sesion});
    }else{
        res.sendFile('loginagain.html', {root: path.join(__dirname)})
    }
});

app.use('/css', express.static(path.join(__dirname)));

app.use((req, res, next) => {
    res.status(404).render('404.ejs' , {user:sesion});
});

app.listen(3004);
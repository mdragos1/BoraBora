const express = require('express')
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');
const formidable=require('formidable');

let reservation=[];

app.get('/about',function(req,res) {
    res.sendFile('about.html', {root: path.join(__dirname)});
});

app.get('/home',function(req,res) {
    res.sendFile('home.html', {root: path.join(__dirname)});
});

app.get('/events',function(req,res) {
    res.sendFile('events.html', {root: path.join(__dirname)});
});

app.get('/menu',function(req,res) {
    res.sendFile('menu.html', {root: path.join(__dirname)});
});

app.get('/signup',function(req,res) {
    res.sendFile('signup.html', {root: path.join(__dirname)});
});
app.get('/login',function(req,res) {
    res.sendFile('login.html', {root: path.join(__dirname)});
});

app.use(bodyParser.urlencoded({ extended: false }))

app.get('/contact',function(req,res) {
    res.sendFile('contact.html', {root: path.join(__dirname)});
});

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname));

app.post('/contact', function (req, res) {
    const phoneNumberFormat=/^(07)(\d{8})$/;
    let { name, email, phone, date, number, table} = req.body;
    if(phoneNumberFormat.test(phone) == true){
        const time = new Date(date).getTime() - Date.now();
        const timeDays = Math.floor(time / (1000 * 60 * 60 * 24));
        reservation.push(req.body);
        res.render('template.ejs' ,{name, timeDays});
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
        res.render('signupwelcome.ejs' ,{email});
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
            signin = true;
            return;
        }
    });
    if(signin==true){
        res.render('loginwelcome.ejs' ,{email});
    }
});

app.use('/css', express.static(path.join(__dirname)));

app.use((req, res, next) => {
    res.status(404).sendFile("404.html", {root: path.join(__dirname)});
  });

app.listen(3004);
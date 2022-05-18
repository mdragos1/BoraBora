const express = require('express')
const app = express();
const path = require('path');
const bodyParser = require('body-parser');

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

app.use('/css', express.static(path.join(__dirname)));

app.use((req, res, next) => {
    res.status(404).sendFile("404.html", {root: path.join(__dirname)});
  });

app.listen(3004);
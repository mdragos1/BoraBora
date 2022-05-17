const express = require('express')
const app = express();
const path = require('path');
const bodyParser = require('body-parser');

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

app.use(bodyParser.urlencoded({ extended: false }))

app.get('/contact',function(req,res) {
    res.sendFile('contact.html', {root: path.join(__dirname)});
});

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname));

app.post('/contact', function (req, res) {
    const { name, email, phone, date, number, table} = req.body;
    const time = new Date(date).getTime() - Date.now();
    const timeDays = Math.floor(time / (1000 * 60 * 60 * 24));
    res.render('template.ejs' ,{name, timeDays});
});

app.use('/css', express.static(path.join(__dirname)));



app.use((req, res, next) => {
    res.status(404).sendFile("404.html", {root: path.join(__dirname)});
  });

app.listen(3004);
const express = require('express')
const app = express();
const path = require('path');

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

app.get('/contact',function(req,res) {
    res.sendFile('contact.html', {root: path.join(__dirname)});
});

app.use('/css', express.static(path.join(__dirname)));

app.listen(3004);
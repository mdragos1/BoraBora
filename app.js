const express = require('express')
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');
const cookieParser = require("cookie-parser");
const sessions = require('express-session');
const jwt = require('jsonwebtoken');

const dotenv = require('dotenv');


// get config vars
dotenv.config();

// access config var
process.env.TOKEN_SECRET;

console.log(process.env.TOKEN_SECRET);

function generateAccessToken(user) {
    return jwt.sign(user, process.env.TOKEN_SECRET);
}

let sesion;

app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const oneDay = 1000 * 60 * 60 * 24;

app.use(sessions({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false
}));

app.get('/', (req,res)=>{
    sesion=req.session;
    res.redirect('/home');
})

app.get('/home',function(req,res) {
    sesion=req.session;
    res.render('home.ejs' , {user:sesion});
});

app.get('/about',function(req,res) {
    sesion=req.session;
    res.render('about.ejs' , {user:sesion});
});

app.get('/events',function(req,res) {
    sesion=req.session;
    res.render('events.ejs' , {user:sesion});
});

app.get('/menu',function(req,res) {
    sesion=req.session;
    res.render('menu.ejs' , {user:sesion});
});

app.get('/contact',function(req,res) {
    sesion=req.session;
    res.render('contact.ejs' , {user:sesion});
});

app.get('/myaccount', authenticateToken, function(req,res) {
    sesion=req.session;
    res.render('reservation.ejs' , {user:sesion});
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
        sesion=req.session;
        console.log(sesion)
        sesion.userid=req.body.email;
        objectToken = generateAccessToken(sesion.userid);
        res.cookie('Auth', objectToken);
        res.render('signupwelcome.ejs' ,{user:sesion, email});
    }
});

let objectToken;

app.post('/login',function(req,res){
    let userDetails;
    let data = fs.readFileSync("accounts.json");
    userDetails=JSON.parse(data);
    const details = {email, password} = req.body;
    let signin = false;
    userDetails.forEach(element => {
        if(email == element['email'] && password == element['password']){
            sesion=req.session;
            
            console.log(sesion)
            sesion.userid=req.body.email;
            signin = true;
            return;
        }
    });
    
    if(signin==true){
        objectToken = generateAccessToken(sesion.userid);
        res.cookie('Auth', objectToken);
        res.render('loginwelcome.ejs' , {user:sesion});
      
    }else{
        res.sendFile('loginagain.html', {root: path.join(__dirname)})
    }
});

function authenticateToken(req, res, next) {
   
    //console.log(token);
    const token = req.cookies['Auth'];

    if (token == null) return res.sendStatus(401)
  
    jwt.verify(objectToken, process.env.TOKEN_SECRET, (err , email ) => {
      console.log(err)
  
      if (err) return res.sendStatus(403);
      console.log(email);
      console.log(req);
      req.email = email;
  
      next()
    })
  }

app.get('/logout',(req,res) => {
    req.session.destroy();
    res.redirect("/home");
});    

app.use('/css', express.static(path.join(__dirname)));

app.use((req, res, next) => {
    sesion=req.session;
    res.status(404).render('404.ejs' , {user:sesion});
});

app.listen(3004, function() {
    console.log('Listening to port:  ' + 3004);
});
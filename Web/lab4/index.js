const express = require('express')
const app = express();
const path = require('path')
const PORT = process.env.PORT || 5000
const http = require('http');
const https = require( "https" );
const fs = require( "fs" );
const route = require("./route/routes");
const db = require("./route/controlerdb.js");
const pages = require("./route/pages");
const painting = require("./route/painting");
const participants = require("./route/participants");
const bodyParser = require('body-parser');

let privateKey  = fs.readFileSync('ssl/my_key.key', 'utf8');
let certificate = fs.readFileSync('ssl/my_cert.crt', 'utf8');

let credentials = {key: privateKey, cert: certificate};




app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')
app.use(express.urlencoded({ extended: true }))
app.use(express())
app.use(route)
app.use(pages)
app.use(painting)
app.use(participants)
app.use(bodyParser());
app.use(bodyParser.urlencoded({extended: true}));
app.get('/', (req, res) => res.render('pages/login'))

let httpServer = http.createServer(app);
let httpsServer = https.createServer(credentials, app);


//____________________lab4________________________

let users = db.get_db("participants");
let paintings = db.get_db("paintings");
let settings = db.get_db("settings");

let {Server} = require('socket.io');
const {update_db} = require("./route/controlerdb");
const io = new Server(httpsServer);

io.on("connection", (socket) =>{
    console.log("User connected ");
    socket.on('ehlo', function(data) {
        socket.broadcast.emit('welcome', { message: `${data.name} зашел на сайт`,setting:settings, painting: paintings, users:users});
        socket.emit('welcome', { message: `${data.name} зашел на сайт`,setting:settings, painting: paintings, users:users});
    });
    socket.on('make_bet', function(data) {
        let userBet = data.bet/1;
        bet = userBet;
        let money = users[data.user["index"]]["budget"];

        let currentPaint = paintings[data.artIndex];
        let min =currentPaint.cost/1 +  currentPaint.min/1;
        let max =currentPaint.cost/1 + currentPaint.max/1;

        if(userBet < min || userBet > max){
            socket.emit('error_mail_bet', { message: `Нельзя назначить такую цену: ${data.bet}`});
            return;
        }
        if(userBet > money){
            socket.emit('error_mail_bet', { message: `У вас недостаточно средств чтобы сделать ставку!`});
            return;
        }

        socket.broadcast.emit('mail_bet', { message: `${data.name} сделал ставку ${data.bet}`});
        socket.emit('mail_bet', { message: `${data.name} сделал ставку ${data.bet}`});

        currentPaint.currentCost = userBet +"";

        paintings[currentPaint.index] = currentPaint;

        db.update_db("paintings",paintings);

        socket.broadcast.emit('update', {users:users, painting: paintings, message:""});
        socket.emit('update', {users:users, painting: paintings, message:""});


    });

    socket.on('admin_start', function (data) {



        socket.broadcast.emit('start', { message: 'Аукцион открыт!', setting:settings, painting: paintings});
        socket.emit('start', { message: 'Аукцион открыт!', setting:settings, painting: paintings});
    });

    socket.on('buy', function (data) {
        console.log(paintings[data.paintIndex]["buyer"]);
        if(paintings[data.paintIndex]["buyer"] === "-") {

            data.user["budget"] = (data.user["budget"] - data.price)+'';
            data.user["buy"] +="," + paintings[data.paintIndex]["name"]  ;

            users[data.user["index"]] = data.user;
            db.update_db("participants",users);


            paintings[data.paintIndex]["buyer"] = data.user["name"];
            paintings[data.paintIndex]["sellFor"] = data.price + '';
            paintings[data.paintIndex]["currentCost"] = paintings[data.paintIndex]["cost"];
            db.update_db("paintings",paintings);
            console.log("Я **** ВАШИ РТЫ");
            socket.broadcast.emit('update', {users:users, painting: paintings, message:`${data.user["name"]} приобрел картину ${paintings[data.paintIndex]["name"]}`});
            socket.emit('update', {users:users, painting: paintings, message:`${data.user["name"]} приобрел картину ${paintings[data.paintIndex]["name"]}`});
        }
    });




});



httpServer.listen(3030);
httpsServer.listen(5050);
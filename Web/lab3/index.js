const express = require('express')
const app = express();
const path = require('path')
const PORT = process.env.PORT || 5000
const http = require('http');
const https = require( "https" );
const fs = require( "fs" );
const route = require("./route/routes");
const pages = require("./route/pages");
const painting = require("./route/painting");
const participants = require("./route/participants");
let privateKey  = fs.readFileSync('ssl/my_key.key', 'utf8');
let certificate = fs.readFileSync('ssl/my_cert.crt', 'utf8');

let credentials = {key: privateKey, cert: certificate};




app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(route)
app.use(pages)
app.use(painting)
app.use(participants)
app.get('/', (req, res) => res.render('pages/mainPage'))

let httpServer = http.createServer(app).listen(3000);
let httpsServer = https.createServer(credentials, app).listen(5000);

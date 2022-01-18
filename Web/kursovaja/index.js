const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 5055;
const route = require("./route/controlerdb");
const login = require("./route/login");
const bp = require('body-parser')
const cons = require('consolidate');
const http = require("http");

let index =express();
index.use(express.static(path.join(__dirname, 'public')))
index.use(bp.json())
index.use(bp.urlencoded({ extended: true }))
index.set('views', path.join(__dirname, 'pages'))
index.set('view engine', 'pug')
index.use(route)
index.use(login)
index.get('/', (req, res) => res.render('pages/login'))
let httpServer = http.createServer(index);
httpServer.listen(PORT, () => console.log(`Listening on ${ PORT }`))

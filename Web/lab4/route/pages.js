const express = require("express")
const router = express.Router()
const bodyParser = require('body-parser');
router.use(bodyParser.json());
const users = require('../public/database/participants.json');

router.get("/pictures", (req, res, next) =>{
    res.render(
        'pages/paintings'
    )
})

router.get("/participants", (req, res, next) =>{
    res.render(
        'pages/participants'
    )
})

router.get("/settings", (req, res, next) =>{
    res.render(
        'pages/settings'
    )
})

router.get("/", (req, res, next) =>{
    res.render(
        'pages/login'
    )
})

router.get("/main", (req, res, next) =>{
    res.render(
        'pages/mainPage'
    )
})
let currentUser='';
router.post('/in',function (req,res,next) {
    const name = req.body.name;
    if (name === 'admin'){
        res.redirect('./admin');
        return;
    }

    for(let val of users){
        if(val.name === name){
            currentUser = name;
            res.redirect('./user');
            return;
        }
    }
    res.end('No user with this name !!!')
});

router.get('/admin',function (req,res,next) {
    res.render('jquery_UIpug/admin', {title:'admin'});
});

router.get('/user',function (req,res,next) {
    res.render('jquery_UIpug/user', {title: currentUser});
});

module.exports = router
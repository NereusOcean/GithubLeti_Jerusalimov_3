const express = require("express")
const router = express.Router()

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
        'pages/mainPage'
    )
})

module.exports = router
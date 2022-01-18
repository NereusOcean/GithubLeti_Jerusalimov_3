const express = require("express")
const router = express.Router()

router.get("/", (req, res, next) =>{
    res.render(
        'login'
    )
})

router.get("/startMenu", (req, res, next) =>{
    res.render(
        'startMenu'
    )
})

router.get("/level:id", (req, res, next) =>{
    res.render(
        'index'
    )
})
module.exports = router
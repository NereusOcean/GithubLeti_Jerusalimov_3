const express = require("express")
const db = require("./controlerdb.js");
const router = express.Router()

router.post("/settings/update", (req, res, next) => {
    let settings = JSON.parse(req.body.data)
    db.update_db("settings", settings)
    console.log(settings)
})


module.exports = router
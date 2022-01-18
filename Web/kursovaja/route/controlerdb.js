const express = require("express")
const router = express.Router()
const fs = require('fs')
const path = require("path");

router.post("/json", (req, res, next) => {
    let levelNum = JSON.parse(req.body.data);
    console.log("hello");
    console.log(levelNum);
    let libs = fs.readFileSync(path.join(__dirname, `../public/json/level${levelNum}.json`), "utf-8");
    res.json(libs);
})

module.exports = router
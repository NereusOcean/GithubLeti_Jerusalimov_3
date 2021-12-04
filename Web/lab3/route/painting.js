const express = require("express")
const router = express.Router()
const db = require("./controlerdb.js")
const {render} = require("pug");

router.post("/picture/add", (req, res, next) => {

    let picture = req.body.data
    picture = JSON.parse(picture)
    console.log(picture["name"], picture)
    let picture_db = db.get_db("paintings");
    picture["index"] = picture_db.length
    picture_db.push(picture)
    console.log(picture_db);
    db.update_db("paintings", picture_db);
    res.status(200).send("ok")
})
router.get("/picture/add", (req, res, next) =>{
    let picture_db = db.get_db("paintings");
    res.json(picture_db);
})


router.get("/picture/delete/:id", (req, res, next) =>{
    console.log("here")
    let picture_db = db.get_db("paintings");
    picture_db.splice(req.params.id, 1);
    for (let i = 0; i < picture_db.length; i++){
        picture_db[i]["index"] = i;
    }
    db.update_db("paintings", picture_db);

    res.status(200).send("ok")
})


router.post("/picture/update", (req, res, next) => {
    let picture = req.body.data
    picture = JSON.parse(picture)
    let picture_db = db.get_db("paintings");
    picture_db[picture["index"]] = picture
    db.update_db("paintings", picture_db);
    res.status(200).send("ok");
})
module.exports = router;
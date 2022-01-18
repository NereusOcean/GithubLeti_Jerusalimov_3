const express = require("express")
const db = require("./controlerdb.js");
const router = express.Router()

router.post("/participants/add", (req, res, next) => {
    let participants = req.body.data
    participants = JSON.parse(participants)
    console.log(participants["name"], participants)
    let participants_db = db.get_db("participants");
    participants["index"] = participants_db.length
    participants_db.push(participants)
    console.log(participants_db);
    db.update_db("participants", participants_db);
    res.status(200).send("ok")
})

router.post("/participants/update", (req, res, next) => {
    let participants = req.body.data
    participants = JSON.parse(participants)
    let participants_db = db.get_db("participants");
    participants_db[participants["index"]] = participants
    db.update_db("participants", participants_db);
    res.status(200).send("ok");
})

router.get("/participants/add", (req, res, next) =>{
    let participants_db = db.get_db("participants");
    res.json(participants_db);
})

router.get("/participants/:id", (req, res, next) =>{
    let participants_db = db.get_db("participants");
    let id = req.params.id
    res.render( 'person', {index: id, name: participants_db[id]["name"], cost: participants_db[id]["cost"]})
})

router.get("/participants/delete/:id", (req, res, next) =>{
    console.log("here")
    let participants_db = db.get_db("participants");
    participants_db.splice(req.params.id, 1);
    for (let i = 0; i < participants_db.length; i++){
        participants_db[i]["index"] = i;
    }
    db.update_db("participants", participants_db);

    res.status(200).send("ok")
})


module.exports = router;
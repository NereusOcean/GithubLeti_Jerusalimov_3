const express = require("express")
const fs = require('fs')
const path = require("path");
const router = express.Router()

router.post("/api/addBook", function (req, res, next) {
    let library = getCurrentLib();
    let book = req.body;
    book["token"] = library.length;
    library.push(book);
    setNewLib(library);
    res.status(200).send(library);

})
router.post("/api/refreshJson", function (req, res, next) {
    let book = req.body;
    setNewLib(book);
    res.status(200).send(book);

})

router.get("/api/getLibrary", (req, res, next) => {
    res.status(200).send(getCurrentLib());
})

router.get("/api/sort/:name/ascending", (req, res, next) => {
    let library = getCurrentLib()
    library.sort(function (a,b){
        if(a[req.params.name]>b[req.params.name]){
            return 1;
        }
        return -1;
    })
    res.status(200).send(library);
})

router.get("/api/sort/:name/descending", (req, res, next) => {
    let library = getCurrentLib()
   library.sort(function (a,b){
       if(a[req.params.name]<b[req.params.name]){
           return 1;
       }
       return -1;
   })

    res.status(200).send(library);
})

router.get("/api/filterAvailability/:name", (req, res, next) => {
    let library = getCurrentLib()
    let newLib = [];
    let name;
    console.log("param.name", req.params.name)
    req.params.name === "available" ? name = "В наличии":name = "Нет в наличии";
    for (let i = 0; i < library.length; i++){
        if (library[i]["count"] === name){
            console.log(library[i]["count"])
            newLib.push(library[i])
            console.log(newLib);
        }
    }
    res.status(200).send(newLib);
})

router.get("/api/resetFilters", (req, res, next) => {
    let library = getCurrentLib()
    res.status(200).send(library);
})


function getCurrentLib(){
    let table = fs.readFileSync(path.join(__dirname, "../public/storage.json"), "utf-8");
    return  JSON.parse(table);
}

function setNewLib(library){
    let table = JSON.stringify(library);
    fs.writeFileSync(path.join(__dirname, "../public/storage.json"), table, "utf-8");
}

module.exports = router
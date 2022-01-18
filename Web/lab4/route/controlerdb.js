const fs = require('fs')
const path = require("path");

const db = {
    "paintings": "../public/database/paintings.json",
    "participants": "../public/database/participants.json",
    "settings": "../public/database/settings.json"
}

function get_db(type){
    let libs = fs.readFileSync(path.join(__dirname, db[type]), "utf-8");
    return JSON.parse(libs);
}

function update_db(type, value){
    let data = JSON.stringify(value);
    fs.writeFileSync(path.join(__dirname, db[type]), data, "utf-8");
}

module.exports = {get_db, update_db}
const express = require('express');
const app = express();

const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
let adapter = new FileSync('./config.json');
let config = low(adapter);
config.defaults({config: [], services: []}).write();

app.get('/', function(req, res) {
    res.send("Hello world !");
});

const server = app.listen(8080, function() {
    console.log("Ready !\n=> Server running on port " + server.address().port);
    config.get("config").push({port: 8080, name: "Statuspage", icon: "https://avatars.githubusercontent.com/u/41598226"}).write();
});
const LoggerUtils = require('./utils/LoggerUtils');
LoggerUtils.info("Starting Statuspage...");

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
    initConfig();
    LoggerUtils.info("Server running on port " + server.address().port + " !");
});

function initConfig(){
    if(!checkConfig()){
        LoggerUtils.info("Invalid configuration, initialization...");
        config.set("config", {port: 8080, name: "Statuspage", icon: "https://avatars.githubusercontent.com/u/41598226"}).write();
        LoggerUtils.info("Configuration initialized !");
    }
}

function checkConfig() {
    let configOK = true;
    let configParameters = ["port", "name", "icon"];
    configParameters.forEach((value, index, array) => {
        if (!config.has("config." + value).value()) {
            configOK = false;
        }
    })
    return configOK;
}
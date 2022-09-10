const LoggerUtils = require('./utils/LoggerUtils');
LoggerUtils.info("Starting Statuspage...");

const express = require('express');
const app = express();

const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
let adapter = new FileSync('./config.json');
let config = low(adapter);
config.defaults({config: [], services: []}).write();

let adapterDatas = new FileSync('./datas.json');
let datas = low(adapterDatas);
datas.defaults({datas: []}).write();

const uuid = require('uuid');

app.get('/', function(req, res) {
    res.send("Hello world !");
});

/*app.get('/dev', function(req, res) {
    res.sendFile( __dirname + "/templates/index.html");
});*/

initConfig();
let port = config.get("config.port").value();
const server = app.listen(port, function() {
    LoggerUtils.info("Server running on port " + server.address().port + " !");
});

function initConfig(){
    // System config
    if(!checkSystemConfig()){
        LoggerUtils.info("Invalid Statuspage configuration, initialization...");
        config.set("config", {port: 8080, name: "Statuspage", icon: "https://avatars.githubusercontent.com/u/41598226"}).write();
        LoggerUtils.info("Statuspage configuration initialized !");
    }
    // Customer config
    if(config.get("services").size().value() == 0){
        LoggerUtils.info("No customer configuration found, initialization...");
        config.set("services", [{name: "Google", host: "https://google.com", hostVisible: true, id: uuid.v4()}]).write();
        LoggerUtils.info("Customer configuration initialized !");
    }
    if(!checkCustomerConfig()){
        LoggerUtils.error("Invalid customer configuration, please check your configuration !");
        process.exit(1);
        return;
    }
}

function checkSystemConfig() {
    let configOK = true;
    let configParameters = ["port", "name", "icon"];
    configParameters.forEach((value, index, array) => {
        if (!config.has("config." + value).value()) {
            configOK = false;
        }
    })
    return configOK;
}

function checkCustomerConfig(){
    let configOK = true;
    let configParameters = ["name", "host", "hostVisible", "id"];
    for(let i = 0; i < config.get("services").size().value(); i++){
        configParameters.forEach((value, index, array) => {
            if(!config.has("services[" + i + "]." + value).value()){
                configOK = false;
            }
        })
    }
    return configOK;
}
var heaterState=0;
var pumpState=0;

console.log("Starting "  + Date.now());
var sensor=require('ds18x20');
let fs = require('fs');
var express = require("express");
var app = express();

var hotTubTools=require("./pumpUtils.js");

app.listen(3000, '192.168.1.195', () => {
 console.log("Server running on port 3000");
});

const pin_pump=27;
const pin_heater=17;
const sensor_id_1="28-3c01d6071d8d";
const sensor_temperature="/sys/bus/w1/devices/28-3c01d6071d8d/temperature";

var Gpio = require('onoff').Gpio; //include onoff to interact with the GPIO
var pump = new Gpio(pin_pump, 'out'); //use GPIO pin 4, and specify that it is output
var heater = new Gpio(pin_heater, 'out');

var heaterState=0;
var pumpState=0;
const pollingTime=15000;

function turnOnPump(){
    pumpState=1;
    pump.writeSync(1);
    return "turning on pump";
}

function turnOffPump(){
    pumpState=0;
    pump.writeSync(0);
    return "turning off pump";
}

function turnOnHeater(){
    if(pumpState!=1){
        turnOnPump();
    }
    heaterSttate=1;
    heater.writeSync(1);
    return "turning on Heater";
}

function turnOffHeater(){
    heaterState=0;
    heater.writeSync(0);
    return "turing off Heater";
}

function close(){
    console.log("Closing");
    turnOffHeater();
    turnOffPump();
    console.log("Closed");
    return "closed";
}

app.get('/', (req, res) => {
        console.log(req);
        console.log(res);
        res.send('Hello World!')
});

app.get("/pumpOn", function(req, res){
    res.send(turnOnPump());
});

app.get("/pumpOff", function(req, res){
    res.send(turnOffPump());
});

app.get("/heaterTest", function(req, res){
    heaterSttate=1;
    heater.writeSync(1);
    res.send("turning on Heater");

});

app.get("/heaterOn", function(req, res){
    res.send(turnOnHeater());
});

app.get("/heaterOff", function(req, res){
    res.send(turnOffHeater());
});


app.get('/status', function(req, res) {
  var ts=Math.floor(Date.now() / 1000);
  var currentTime=new Date().toString();

  res.send("State = " + pumpState + " " + heaterState + " " +ts + " " + currentTime);
});

testNum=0;
function testCycle(){
    console.log(testNum);
    if(testNum==0){
        console.log(turnOnPump());
    }
    else
    {
        if(testNum==1){
           console.log(turnOnHeater());
        }
        else
        {
            console.log(turnOffPump());
            console.log(turnOffHeater());
        }
    }
    testNum=testNum+1;
    if(testNum>=4){
        testNum=0;
    }
    setTimeout(function(){testCycle();}, (testNum*2+4)*1000);
};

app.get('/test', function(req, res){
});

app.get('/close', function(req, res){
    doPollTemperature=0;
    res.send(close());
    console.log("Exiting");
    console.log(temperatureLog);
    setTimeout(function(){process.exit(1);}, 1000);
});

temperatureLog=[]

app.get('/temperature', function(req, res){
   let temperature = fs.readFileSync(sensor_temperature, {encoding: 'utf8', flag: 'r'}) / 1000;
   res.json({temperature, rangeStart: -55, rangeEnd: 125});
});


function logHeatHistory(){
    var file = fs.createWriteStream('history');
    file.on('error', function(err) { /* error handling */ });
    datastr=JSON.stringify(temperatureLog);
    file.write(datastr);
    file.end();
    console.log('Saved!');
};

sensor.get(sensor_id_1, function(err, temp){
    console.log(temp);
});


doPollTemperature=0;

temperatureLog=[]
logCount=0
function pollTemperature(){
    sensor.get(sensor_id_1, function(err, temp){
        logCount=logCount+1;
        if(logCount>=20){
            logCount=0;
            logHeatHistory();
        }
        console.log(temp + " " + Date.now());
        temperatureItem={"temp":temp, "dt": Date.now()};
        temperatureLog.push(temperatureItem)
        if(doPollTemperature==1){
            setTimeout(function(){pollTemperature();}, pollingTime);
        }
    });
};

doPollTemperature=1;
setTimeout(function(){pollTemperature();}, pollingTime);



/*
setTimeout(function(){
    testCycle();
}, 10000);
*/



var Gpio = require('onoff').Gpio; //include onoff to interact with the GPIO
//var pump = new Gpio(pin_pump, 'out'); //use GPIO pin 4, and specify that it is output
//var heater = new Gpio(pin_heater, 'out');

const pin_pump = 27;
const pin_heater = 17;

var sensor = require('ds18x20');


hottub.interface.rp = {
    pumpState: 0,
    heaterState: 0,
    sensor_id_1: "28-3c01d6071d8d",
    sensor_temperature: "/sys/bus/w1/devices/28-3c01d6071d8d/temperature",
    pump: new Gpio(pin_pump, 'out'),
    heater: new Gpio(pin_heater, 'out'),
    lastTemperature: null,
    temperaturePollInterval: 1000*15,
    initialize: function(){
		var me = hottub.interface.rp;
		me.temperaturePolling();
    },
    temperaturePolling: function(){
		var me = hottub.interface.rp;
		me.getTemperatureFromSensor();
		setTimeout(function(){me.temperaturePolling()}, me.temperaturePollInterval);
    },
    getTemperatureFromSensor: function(){
        var me = hottub.interface.rp;
        sensor.get(me.sensor_id_1, function(err, temp){
            me.lastTemperature = temp;
        });
    },
    getTemperatureFromFile: function(){
        var me = hottub.interface.rp;
        let temperature = fs.readFileSync(sensor_temperature, {encoding: 'utf8', flag: 'r'}) / 1000;
        return temperature;
    },
    getPumpStatus: function(){
        var me = hottub.interface.rp;
        return me.pumpState;
    },
    turnOnPump: function () {
        var me = hottub.interface.rp;
        me.pumpState = 1;
		me.pump.writeSync(1);
        return "turning on pump";
    },
    turnOffPump: function () {
        var me = hottub.interface.rp;
        me.heaterState = 0;
        me.pumpState = 0;
		me.heater.writeSync(0);
		me.pump.writeSync(0);
        return "turning off pump";
    },
    getHeaterStatus: function(){
        var me = hottub.interface.rp;
        return me.heaterState;
    },
    turnOnHeater: function () {
        var me = hottub.interface.rp;
        if (me.pumpState != 1) {
            me.turnOnPump();
        }
        me.heater.writeSync(1);
        me.heaterState = 1;
        return "turning on Heater";
    },
    turnOffHeater: function () {
        var me = hottub.interface.rp;
        me.heaterState = 0;
		me.heater.writeSync(0);
        return "turing off Heater";
    },
    getTemperature: function(){
        var me = hottub.interface.rp;
        return me.lastTemperature;
    },
    setTemperature: function(newTemperature){
        var me = hottub.interface.mock;
        return 0;
    },
    close: function () {
        var me = hottub.interface.rp;
        console.log("Closing");
        me.turnOffHeater();
        me.turnOffPump();
        console.log("Closed");
        return "closed";
    }
};

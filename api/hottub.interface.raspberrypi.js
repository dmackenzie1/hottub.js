var Gpio = require('onoff').Gpio; //include onoff to interact with the GPIO
//var pump = new Gpio(pin_pump, 'out'); //use GPIO pin 4, and specify that it is output
//var heater = new Gpio(pin_heater, 'out');

const pin_pump = 27;
const pin_heater = 17;

var sensor = require('ds18x20');


hottub.interface.rp = {
    pumpState: 0,
    heaterState: 0,
    cycleState: 0,
    sensor_id_1: "28-3c01d6071d8d",
    sensor_temperature: "/sys/bus/w1/devices/28-3c01d6071d8d/temperature",
    pump: new Gpio(pin_pump, 'out'),
    heater: new Gpio(pin_heater, 'out'),
    lastTemperature: null,
    temperaturePollInterval: 1000 * 15,
    managementPollInterval: 1000 * 10,
    maxTemperature: 35.4,
    heaterOnTime: new Date(),
    pumpOnTime: new Date(),
    maxHeaterOnTimeInSeconds: 20 * 60,
    maxPumpOnTimeInSeconds: 30 * 60,
    pumpOffDelay: 10 * 1000,
    maxCycleTempDiff: 4.0,
    initialize: function () {
        var me = hottub.interface.rp;
        me.temperaturePolling();
        me.managementPolling();
    },
    managementPolling: function () {
        var me = hottub.interface.rp,
            ts = Math.floor(Date.now() / 1000),
            currentTime = new Date();

        if (me.heaterState == 1) {
            if (me.lastTemperature >= me.maxTemperature) {
                hottub.log("temperature reached");
                me.turnOffHeater();
            }
            if (Math.floor((currentTime - me.heaterOnTime) / 1000) > me.maxHeaterOnTimeInSeconds) {
                hottub.log("max heater time on reached");
                me.turnOffHeater();
            }
        }
        if (me.pumpState == 1) {
            if (Math.floor((currentTime - me.pumpOnTime) / 1000) > me.maxPumpOnTimeInSeconds) {
                hottub.log("max pump time on reached");
                me.turnOffPump();
            }
        }
        if (me.cycleState == 1) {
            if ((me.heaterState == 0) && (me.pumpState == 0)) {
                if (me.maxTemperature - me.lastTemperature > me.maxCycleTempDiff) {
                    me.turnOnHeater();
                    hottub.log("turning on heater for cycle");
                }
            }
        }
        setTimeout(function () {
            me.managementPolling();
        }, me.managementPollInterval);
    },
    temperaturePolling: function () {
        var me = hottub.interface.rp;
        me.getTemperatureFromSensor();
        setTimeout(function () {
            me.temperaturePolling()
        }, me.temperaturePollInterval);
    },
    getTemperatureFromSensor: function () {
        var me = hottub.interface.rp;
        sensor.get(me.sensor_id_1, function (err, temp) {
            if (temp && (temp != "false") && (temp != "undefined")) {
                me.lastTemperature = temp;
            }
        });
    },
    getTemperatureFromFile: function () {
        var me = hottub.interface.rp;
        let temperature = fs.readFileSync(sensor_temperature, {encoding: 'utf8', flag: 'r'}) / 1000;
        return temperature;
    },
    getPumpStatus: function () {
        var me = hottub.interface.rp;
        return me.pumpState;
    },
    turnOnPump: function () {
        var me = hottub.interface.rp;
        hottub.log("turning on pump");
        me.pumpState = 1;
        me.pump.writeSync(1);
        me.pumpOnTime = new Date();
        return "turning on pump";
    },
    turnOffPump: function () {
        var me = hottub.interface.rp;
        hottub.log("turning off pump");
        me.turnOffHeater();
        setTimeout(function () {
            me.pumpState = 0;
            me.pump.writeSync(0);
        }, me.pumpOffDelay);
        return "turning off pump";
    },
    getHeaterStatus: function () {
        var me = hottub.interface.rp;
        return me.heaterState;
    },
    turnOnHeater: function () {
        var me = hottub.interface.rp;
        hottub.log("turning on heater");
        if (me.pumpState != 1) {
            me.turnOnPump();
        }
        me.heater.writeSync(1);
        me.heaterState = 1;
        me.heaterOnTime = new Date();
        return "turning on Heater";
    },
    turnOffHeater: function () {
        var me = hottub.interface.rp;
        hottub.log("turning off heater");
        me.heaterState = 0;
        me.heater.writeSync(0);
        return "turing off Heater";
    },
    getTemperature: function () {
        var me = hottub.interface.rp;
        return me.lastTemperature;
    },
    setTemperature: function (newTemperature) {
        var me = hottub.interface.rp;
        me.cycleState = me.cycleState + 1;
        if (me.cycleState > 1) {
            me.cycleState = 0;
        }
        hottub.log("setting cycle to " + me.cycleState);
        return 0;
    },
    turnOnCycle: function () {
        var me = hottub.interface.rp;
        me.cycleState = 1;
        hottub.log("cycling on");
        return "turning on cycling";
    },
    turnOffCycle: function () {
        var me = hottub.interface.rp;
        me.cycleState = 0;
        hpttub.log("cycling off");
        return "turning off cycling";
    },
    getCycleStatus: function () {
        var me = hottub.interface.rp;
        return me.cycleState;
    },
    close: function () {
        var me = hottub.interface.rp;
        me.turnOffHeater();
        me.turnOffPump();
        console.log("Closed");
        return "closed";
    }
};

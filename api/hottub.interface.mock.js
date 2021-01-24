hottub.interface.mock = {
    pumpState: 0,
    heaterState: 0,
    initialize: function () {
    },
    getPumpStatus: function () {
        var me = hottub.interface.mock;
        return me.pumpState;
    },
    turnOnPump: function () {
        var me = hottub.interface.mock;
        me.pumpState = 1;
        return "turning on pump";
    },
    turnOffPump: function () {
        var me = hottub.interface.mock;
        me.heaterState = 0;
        me.pumpState = 0;
        return "turning off pump";
    },
    getHeaterStatus: function () {
        var me = hottub.interface.mock;
        return me.heaterState;
    },
    turnOnHeater: function () {
        var me = hottub.interface.mock;
        if (me.pumpState != 1) {
            me.turnOnPump();
        }
        me.heaterState = 1;
        return "turning on Heater";
    },
    turnOffHeater: function () {
        var me = hottub.interface.mock;
        me.heaterState = 0;
        return "turing off Heater";
    },
    getTemperature: function () {
        var me = hottub.interface.mock,
            temperature = 100.0 * Math.random()
        return temperature.toFixed(1);
    },
    setTemperature: function (newTemperature) {
        var me = hottub.interface.mock;
        return 0;
    },
    turnOnCycle: function () {
        var me = hottub.interface.mock;
        return 1;
    },
    turnOffCycle: function () {
        var me = hottub.interface.mock;
        return 0;
    },
    getCycleStatus: function () {
        var me = hottub.interface.mock;
        return 0;
    },

    close: function () {
        var me = hottub.interface.mock;
        console.log("Closing");
        me.turnOffHeater();
        me.turnOffPump();
        console.log("Closed");
        return "closed";
    }
};



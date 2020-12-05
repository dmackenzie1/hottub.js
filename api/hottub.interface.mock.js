hottub.interface.mock = {
    pumpState: 0,
    heaterState: 0,
    turnOnPump: function () {
        var me = hottub.interface.mock;
        me.pumpState = 1;
        return "turning on pump";
    },
    turnOffPump: function () {
        var me = hottub.interface.mock;
        me.pumpState = 0;
        return "turning off pump";
    },
    turnOnHeater: function () {
        var me = hottub.interface.mock;
        if (me.pumpState != 1) {
            me.turnOnPump();
        }
        me.heaterSttate = 1;
        return "turning on Heater";
    },
    turnOffHeater: function () {
        var me = hottub.interface.mock;
        me.heaterState = 0;
        return "turing off Heater";
    },
    close: function () {
        var me = hottub.interface.mock;
        console.log("Closing");
        me.turnOffHeater();
        me.turnOffPump();
        console.log("Closed");
        return "closed";
    },
    getTemperature: function(){
        var me = hottub.interface.mock;
        return 0;
    }
};



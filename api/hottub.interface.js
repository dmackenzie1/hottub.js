hottub.interface = {
    _interface: null,
    initialize: function () {
        var me = hottub.interface;
        me._interface = hottub.interface.mock;
    },
    turnOnPump: function () {
        var me = hottub.interface;
        return me.turnOnPump();
    },
    turnOffPump: function () {
        var me = hottub.interface;
        return me.turnOffPump();
    },
    turnOnHeater: function () {
        var me = hottub.interface;
        return me.turnOnHeater();
    },
    turnOffHeater: function () {
        var me = hottub.interface;
        return me.turnOffHeater();
    },
    close: function () {
        var me = hottub.interface;
        return me.close();
    },
    getTemperature: function () {
        var me = hottub.interface;
        return me.getTemperature();
    }
};



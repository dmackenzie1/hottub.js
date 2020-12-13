hottub.interface = {
    _implementation: null,
    initialize: function () {
        var me = hottub.interface;
        me._implementation = hottub.interface.rp;
        me._implementation.initialize();
    },
    getPumpStatus: function(){
        var me = hottub.interface;
	return me._implementation.getPumpStatus();
    },
    turnOnPump: function () {
        var me = hottub.interface;
        return me._implementation.turnOnPump();
    },
    turnOffPump: function () {
        var me = hottub.interface;
        return me._implementation.turnOffPump();
    },
    getHeaterStatus: function(){
        var me = hottub.interface;
        return me._implementation.getHeaterStatus();
    },
    turnOnHeater: function () {
        var me = hottub.interface;
        return me._implementation.turnOnHeater();
    },
    turnOffHeater: function () {
        var me = hottub.interface;
        return me._implementation.turnOffHeater();
    },
    getTemperature: function () {
        var me = hottub.interface;
        return me._implementation.getTemperature();
    },
    setTemperature: function(newTemperature){
        var me = hottub.interface;
        return me._implementation.setTemperature(newTemperature);
    },
    close: function () {
        var me = hottub.interface;
        return me._implementation.close();
    }
};



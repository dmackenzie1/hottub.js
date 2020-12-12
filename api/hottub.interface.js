hottub.interface = {
    _interface: null,
    initialize: function () {
        var me = hottub.interface;
        me._interface = hottub.interface.mock;
    },
	getPumpStatus: function(){
		var me = hottub.interface;
		return me.getPumpStatus;
	},
    turnOnPump: function () {
        var me = hottub.interface;
        return me.turnOnPump();
    },
    turnOffPump: function () {
        var me = hottub.interface;
        return me.turnOffPump();
    },
	getHaterStatus: function(){
		var me = hottub.interface;
		return me.getHeaterStatus;
	},
    turnOnHeater: function () {
        var me = hottub.interface;
        return me.turnOnHeater();
    },
    turnOffHeater: function () {
        var me = hottub.interface;
        return me.turnOffHeater();
    },
    getTemperature: function () {
        var me = hottub.interface;
        return me.getTemperature();
    },
	setTemperature: function(newTemperature){
		var me = hottub.intergace;
		return me.setTemperature(newTemperature);
	},
	close: function () {
        var me = hottub.interface;
        return me.close();
    }
};



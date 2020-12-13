hottub.api = {
    _app: null,
    _interface: null,
    initialize: function (expressApp) {
        var me = hottub.api;
        me._interface=hottub.interface;
        me._app = expressApp;
        me._app.get('/status', function (req, res) {
	    var me = hottub.api;
            var ts = Math.floor(Date.now() / 1000);
            var currentTime = new Date().toString();

            res.send("Pump: = " + pumpState + " <br />Heater: " + heaterState + " <br /> " + ts + " " + currentTime);
        });
	me._app.get("/getPumpStatus", function(req, res){
	    var me = hottub.api;
	    res.send(me._interface.getPumpStatus());
	});
	me._app.get("/pumpOn", function (req, res) {
	    var me = hottub.api;
            res.send(me._interface.turnOnPump());
        });
        me._app.get("/pumpOff", function (req, res) {
	    var me = hottub.api;
            res.send(me._interface.turnOffPump());
        });
	me._app.get("/getHeaterStatus", function(req, res){
	    var me = hottub.api;
	    res.send(me._interface.getHeaterStatus());
	});
	me._app.get("/heaterOn", function (req, res) {
	    var me = hottub.api;
            res.send(me._interface.turnOnHeater());
        });
        me._app.get("/heaterOff", function (req, res) {
	    var me = hottub.api;
            res.send(me._interface.turnOffHeater());
        });
	me._app.get('/api/getTemperature', function (req, res) {
	    var me = hottub.api;
            console.log("getting temperature");
            var temperature = me._interface.getTemperature(),
            result = {temperature, rangeStart: -55, rangeEnd: 125};
            res.json(result);
            res.end();
        });
        me._app.get('/setTemperature', function(req, res){
	    var me = hottub.api;
            var temperature = me._interface.setTemperature(39);
            res.json({temperature, rangeStart: -55, rangeEnd: 125});
        });
	me._app.get('/close', function(req, res){
	    var me = hottub.api;
            var closeResults=me._interface.close();
            res.send(closeResults);
            console.log("Exiting");
        });
    }
};





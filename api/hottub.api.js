hottub.api = {
    _app: null,
    _interface: null,
    initialize: function (expressApp) {
        var me = hottub.api;
        me._interface=hottub.interface;
        me._app = expressApp;
        me._app.get('/api/status', function (req, res) {
	    var me = hottub.api,
                ts = Math.floor(Date.now() / 1000),
                currentTime = new Date().toString(),
                currentPumpStatus =  me._interface.getPumpStatus(),
                currentHeaterStatus = me._interface.getHeaterStatus(),
                currentTemp = me._interface.getTemperature(),
                rv = {"currentTime": currentTime, "ts": ts, "pumpStatus": currentPumpStatus, "heaterStatus": currentHeaterStatus, "currentTemp" : currentTemp};
            res.json(rv);
            res.end();
        });
	me._app.get("/api/getPumpStatus", function(req, res){
	    var me = hottub.api;
	    res.send(me._interface.getPumpStatus());
	});
	me._app.get("/api/pumpOn", function (req, res) {
	    var me = hottub.api;
            res.send(me._interface.turnOnPump());
        });
        me._app.get("/api/pumpOff", function (req, res) {
	    var me = hottub.api;
            res.send(me._interface.turnOffPump());
        });
	me._app.get("/api/getHeaterStatus", function(req, res){
	    var me = hottub.api;
	    res.send(me._interface.getHeaterStatus());
	});
	me._app.get("/api/heaterOn", function (req, res) {
	    var me = hottub.api;
            res.send(me._interface.turnOnHeater());
        });
        me._app.get("/api/heaterOff", function (req, res) {
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
        me._app.get('/api/setTemperature', function(req, res){
	    var me = hottub.api;
            var temperature = me._interface.setTemperature(39);
            res.json({temperature, rangeStart: -55, rangeEnd: 125});
        });
        me._app.get('/api/getDataLog', function(req, res){
            var me = hottub.api,
                dataLog = hottub.datalog.getDataLog();
            res.json(dataLog);
            res.end(); 
        });
	me._app.get('/api/close', function(req, res){
	    var me = hottub.api;
            var closeResults=me._interface.close();
            res.send(closeResults);
            console.log("Exiting");
        });
    }
};





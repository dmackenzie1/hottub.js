hottub.api = {
    _app: null,
    _interface: null,
    initialize: function (expressApp) {
        var me = hottub.api;
        me._interface = hottub.interface;
        me._app = expressApp;
        me._app.get('/api/status', function (req, res) {
            var me = hottub.api,
                ts = Math.floor(Date.now() / 1000),
                currentTime = new Date().toString(),
                currentPumpStatus = me._interface.getPumpStatus(),
                currentHeaterStatus = me._interface.getHeaterStatus(),
                currentCycleStatus = me._interface.getCycleStatus(),
                currentTemp = me._interface.getTemperature(),
                rv = {
                    "currentTime": currentTime,
                    "ts": ts,
                    "pumpStatus": currentPumpStatus,
                    "heaterStatus": currentHeaterStatus,
                    "cycleStatus": currentCycleStatus,
                    "currentTemp": currentTemp
                };
            res.json(rv);
            res.end();
        });
        me._app.get("/api/getPumpStatus", function (req, res) {
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
        me._app.get("/api/getHeaterStatus", function (req, res) {
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
            hottub.log("getting temperature");
            var temperature = me._interface.getTemperature(),
                result = {temperature, rangeStart: -55, rangeEnd: 125};
            res.json(result);
            res.end();
        });
        me._app.get('/api/setTemperature', function (req, res) {
            var me = hottub.api,
                newTemp = req.query.temperature;
            var temperature = me._interface.setTemperature(newTemp);
            res.json({temperature, rangeStart: -55, rangeEnd: 125});
        });
        me._app.get('/api/getDataLog', function (req, res) {
            var me = hottub.api,
                dataLog = hottub.datalog.getDataLog();
            res.json(dataLog);
            res.end();
        });
        me._app.get("/api/getCycleStatus", function (req, res) {
            var me = hottub.api;
            res.send(me._interface.getCycleStatus());
        });
        me._app.get("/api/cycleOn", function (req, res) {
            var me = hottub.api;
            res.send(me._interface.turnOnCycle());
        });
        me._app.get("/api/cycleOff", function (req, res) {
            var me = hottub.api;
            res.send(me._interface.turnOffCycle());
        });
        me._app.get('/api/close', function (req, res) {
            var me = hottub.api;
            var closeResults = me._interface.close();
            res.send(closeResults);
            hottub.log("Exiting");
        });
    }
};





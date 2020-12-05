hottub.api = {
    _app: null,
    initialize: function (expressApp) {
        var me = hottub.api,
            interface=hottub.interface;

        me._app = expressApp;

        me._app.get("/pumpOn", function (req, res) {
            res.send(interface.turnOnPump());
        });

        me._app.get("/pumpOff", function (req, res) {
            res.send(interface.turnOffPump());
        });

        me._app.get("/heaterOn", function (req, res) {
            res.send(interface.turnOnHeater());
        });

        me._app.get("/heaterOff", function (req, res) {
            res.send(interface.turnOffHeater());
        });


        me._app.get('/status', function (req, res) {
            var ts = Math.floor(Date.now() / 1000);
            var currentTime = new Date().toString();

            res.send("State = " + pumpState + " " + heaterState + " " + ts + " " + currentTime);
        });


        me._app.get('/close', function(req, res){
            var closeResults=interface.close();
            res.send(closeResults);
            console.log("Exiting");
        });

        me._app.get('/temperature', function(req, res){
            var temperature = interface.getTemperature();
            res.json({temperature, rangeStart: -55, rangeEnd: 125});
        });


    }
};





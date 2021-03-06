//listenAddr="192.168.1.195";
//listenAddr="127.0.0.1";
listenAddr = "0.0.0.0";

hottub = {
    app: express(),
    initialize: function () {
        var me = hottub;

        me.app.use(express.urlencoded({extended: true}));
        me.app.use('/', express.static(__dirname + '/public/'));

        me.app.listen(3000, listenAddr, () => {
            me.log("Server running on port 3000");
        });

        hottub.api.initialize(me.app);
        hottub.interface.initialize();
        hottub.datalog.initialize();

    },
    log: function (text) {
        console.log(new Date().toString() + ": " + text);
    },
    getExpressApp: function () {
        var me = hottub;
        return me.app;
    },
    ctof: function (c) {
        var f = c * 9 / 5 + 32;
        return f;
    }
};

hottubclient = {
    initialize: function () {
        var me = hottubclient;
        console.log("ready");
        me.getTemperature();
        me.getStatus();
    },
    getStatus: function(){
        console.log("getting status");
        $.get("/api/status", function(data){
            console.log(data);
        });
    },
    getTemperature: function () {
        console.log("getting temp.")
        $.get("/api/getTemperature", function (data) {
            console.log(data);
        });
    }
};


$(document).ready(function () {
    hottubclient.initialize();
});


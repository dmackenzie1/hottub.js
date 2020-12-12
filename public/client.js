hottubclient = {
    initialize: function () {
        var me = hottubclient;
        console.log("ready");
        me.getTemperature();
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


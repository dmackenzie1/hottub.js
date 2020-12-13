hottubclient = {
    refreshInterval:1000*10,
    _pumpStatus:0,
    _heaterStatus:0,
    initialize: function () {
        var me = hottubclient;
        console.log("ready");
        $("#pumpToggle").click(me.onPumpToggle);
        $("#heaterToggle").click(me.onHeaterToggle);
        me.refresh();
        me.autoRefresh();
    },
    autoRefresh: function(){
        var me = hottubclient;
        me.refresh();
        setTimeout(function(){me.autoRefresh();}, me.refreshInterval);
    },
    viewTemperature: function(temp){
        var me=hottubclient,
            $newTemp=$("<div class='temperatureHistory'>" + temp + "</div>"),
            $temperatureHistoryContainer=$("#temperatureHistory");
        $temperatureHistoryContainer.append($newTemp);
        console.log(temp);
        $("#currentTemp").text(temp);
   
    },
    viewHeaterStatus: function(heaterStatus){
        var me = hottubclient;
        me._heaterStatus=heaterStatus;
        $("#heaterStatus").text(heaterStatus);
    },
    viewPumpStatus: function(pumpStatus){
        var me = hottubclient;
        me._pumpStatus=pumpStatus;
        $("#pumpStatus").text(pumpStatus);
    },
    onPumpToggle: function(){
        var me = hottubclient;
        if(me._pumpStatus==0){
            $.get("/api/pumpOn", function(){me.refresh();});
        } else
        {
            $.get("/api/pumpOff", function(){me.refresh();});
        }
    },
    onHeaterToggle: function(){
        var me = hottubclient;
         if(me._heaterStatus==0){
            $.get("/api/heaterOn", function(){me.refresh();});
        } else
        {
            $.get("/api/heaterOff", function(){me.refresh();});
        }
    },
    refresh: function(){
        var me = hottubclient;
        me.getStatus();
    },
    getStatus: function(){
        var me = hottubclient;
        $.get("/api/status", function(data){
            me.viewTemperature(data["currentTemp"]);
            me.viewHeaterStatus(data["heaterStatus"]);
            me.viewPumpStatus(data["pumpStatus"]);
        });
    },
    getTemperature: function () {
        $.get("/api/getTemperature", function (data) {
            console.log(data);
        });
    }
};


$(document).ready(function () {
    hottubclient.initialize();
});


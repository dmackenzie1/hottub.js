hottubclient = {
    refreshInterval: 1000 * 10,
    _pumpStatus: 0,
    _heaterStatus: 0,
    _cycleStatus: 0,
    initialize: function () {
        var me = hottubclient;
        console.log("ready");
        $("#pumpToggle").click(me.onPumpToggle);
        $("#heaterToggle").click(me.onHeaterToggle);
        $("#cycleToggle").click(me.onCycleToggle);
        $("#setTemperature").click(me.onSetTemperature);
        me.refresh();
        me.autoRefresh();
    },
    autoRefresh: function () {
        var me = hottubclient;
        me.refresh();
        setTimeout(function () {
            me.autoRefresh();
        }, me.refreshInterval);
    },
    onSetTemperature: function () {
        var me = hottubclient,
            newTemp = $("#temperatureText").val();

        $.get("/api/setTemperature?temperature=" + newTemp, function () {
            me.refresh();
        });

        $("#setTemperature *").prop('disabled', true);
        $("#setTemperature").css("opacity", 0.2);
        setTimeout(function () {
            $("#setTemperature *").prop('disabled', false);
            $("#setTemperature").css("opacity", 1);

        }, 10000);
    },
    viewTemperature: function (temp) {
        var me = hottubclient;
//            $newTemp=$("<div class='temperatureHistory'>" + temp + "</div>"),
//            $temperatureHistoryContainer=$("#temperatureHistory");
//        $temperatureHistoryContainer.append($newTemp);
//        console.log(temp);
        $("#currentTemp").text(temp);
    },
    viewHeaterStatus: function (heaterStatus) {
        var me = hottubclient;
        me._heaterStatus = heaterStatus;
        $("#heaterStatus").text(heaterStatus);
    },
    viewPumpStatus: function (pumpStatus) {
        var me = hottubclient;
        me._pumpStatus = pumpStatus;
        $("#pumpStatus").text(pumpStatus);
    },
    viewCycleStatus: function (cycleStatus) {
        var me = hottubclient;
        me._cycleStatus = cycleStatus;
        $("#cycleStatus").text(cycleStatus);
    },
    onPumpToggle: function () {
        var me = hottubclient;
        if (me._pumpStatus == 0) {
            $.get("/api/pumpOn", function () {
                me.refresh();
            });
        } else {
            $.get("/api/pumpOff", function () {
                me.refresh();
            });
        }
        $("#pumpToggle *").prop('disabled', true);
        $("#pumpToggle").css("opacity", 0.2);
        setTimeout(function () {
            $("#pumpToggle *").prop('disabled', false);
            $("#pumpToggle").css("opacity", 1);

        }, 10000);
    },
    onHeaterToggle: function () {
        var me = hottubclient;
        if (me._heaterStatus == 0) {
            $.get("/api/heaterOn", function () {
                me.refresh();
            });
        } else {
            $.get("/api/heaterOff", function () {
                me.refresh();
            });
        }
        $("#heaterToggle *").prop('disabled', true);
        $("#heaterToggle").css("opacity", 0.2);
        setTimeout(function () {
            $("#heaterToggle *").prop('disabled', false);
            $("#heaterToggle").css("opacity", 1);

        }, 10000);
    },
    onCycleToggle: function () {
        var me = hottubclient;
        if (me._cycleStatus == 0) {
            $.get("/api/cycleOn", function () {
                me.refresh();
            });
        } else {
            $.get("/api/cycleOff", function () {
                me.refresh();
            });
        }
        $("#cycleToggle *").prop('disabled', true);
        $("#cycleToggle").css("opacity", 0.2);
        setTimeout(function () {
            $("#cycleToggle *").prop('disabled', false);
            $("#cycleToggle").css("opacity", 1);
        }, 10000);
    },
    refresh: function () {
        var me = hottubclient;
        me.getStatus();
    },
    getStatus: function () {
        var me = hottubclient;
        $.get("/api/status", function (data) {
            var currentTempC = data["currentTemp"],
                currentTempF = me.ctof(currentTempC);

            me.viewTemperature(currentTempF);
            me.viewHeaterStatus(data["heaterStatus"]);
            me.viewPumpStatus(data["pumpStatus"]);
            me.viewCycleStatus(data["cycleStatus"]);
        });
        $.get("/api/getDataLog", function (data) {
            var $container = $("#temperatureHistory"),
                i, dataItem, $tempHistoryItem,
                $spanTemp,
                $spanTs,
                $spanTimeString;
            $container.empty();
            for (i in data) {
                dataItem = data[i];
                $spanTemp = $("<span class='historyText historyTemp'>Temp:" + dataItem["temperature"] + "</span>");
                $spanTs = $("<span class='historyText historyTs'>TS:" + dataItem["timeStamp"] + "</span>");
                $spanTimeString = $("<span class='historyText historyTimeString'>TimeString:" + dataItem["timeString"] + "</span>");

                $tempHistoryItem = $("<div class='tempHistoryItem'></div>");
                $tempHistoryItem.append($spanTemp);
                $tempHistoryItem.append($spanTs);
                $tempHistoryItem.append($spanTimeString);

                $container.append($tempHistoryItem);
            }
        });
    },
    getTemperature: function () {
        $.get("/api/getTemperature", function (data) {
            console.log(data);
        });
    },
    ctof: function (c) {
        var f = (c * 1.8) + 32;
        return f;
    }
};


$(document).ready(function () {
    hottubclient.initialize();
});


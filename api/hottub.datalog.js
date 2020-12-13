hottub.datalog = {
    _interface: null,
    _logInterval: 60*1000,
    _dataLog: [],
    maxLogSize=3,
    initialize: function () {
        var me = hottub.datalog;
    },
    getDataLog: function(){
        var me = hottub.datalog;
         return me._dataLog;
    },
    startLogging: function(){
        var me = hottub.datalog;
        me.logData();
        setTimeout(function(){me.startLogging();}, me._logInterval);
    }
    logData: function(){
       var me = hottub.datalog,
           currentTemp = me.getTemperature();
       me.logEvent({"temperature":currentTemp});
    },
    logEvent: function(eventData){
        var me = hottub.datalog,
            ts = Math.floor(Date.now() / 1000),
            currentTime = new Date().toString();
        eventData["timeStamp"]=ts;
        eventData["timeString"]=currentTime;
        me._dataLog.unshift(eventData);
        if(len(me._dataLog)>me.maxLogSize){
            me._dataLog.pop();
        }
    }
};

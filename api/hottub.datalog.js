hottub.datalog = {
    _interface: null,
    _logInterval: 10*1000,
    _dataLog: [],
    maxLogSize: 5,
    initialize: function () {
        var me = hottub.datalog;
        me.startAutoLogging();
    },
    getDataLog: function(){
        var me = hottub.datalog;
         return me._dataLog;
    },
    startAutoLogging: function(){
        var me = hottub.datalog;
        me.logData();
        setTimeout(function(){me.startAutoLogging();}, me._logInterval);
    },
    logData: function(){
       var me = hottub.datalog,
           currentTemp = hottub.interface.getTemperature();
       me.logEvent({"temperature":currentTemp});
    },
    logEvent: function(eventData){
        var me = hottub.datalog,
            ts = Math.floor(Date.now() / 1000),
            currentTime = new Date().toString();
        eventData["timeStamp"]=ts;
        eventData["timeString"]=currentTime;
        me._dataLog.unshift(eventData);
        if(me._dataLog.len>me.maxLogSize){
            me._dataLog.pop();
        }
    }
};

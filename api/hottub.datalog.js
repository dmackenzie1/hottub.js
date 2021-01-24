var AWS = require("aws-sdk");

AWS.config.update(AWSCredentials);

hottub.datalog = {
    _interface: null,
    _logInterval: 60 * 1000,
    _dataLog: [],
    maxLogSize: 10000,
    awsClient: null,
    dynamoTable: "hottub.js",
    initialize: function () {
        var me = hottub.datalog;
        me.awsClient = new AWS.DynamoDB.DocumentClient(AWSCredentials);
        me.startAutoLogging();
    },
    getDataLog: function () {
        var me = hottub.datalog;
        return me._dataLog;
    },
    startAutoLogging: function () {
        var me = hottub.datalog;
        me.logData();
        setTimeout(function () {
            me.startAutoLogging();
        }, me._logInterval);
    },
    logData: function () {
        var me = hottub.datalog,
            currentTemp = hottub.interface.getTemperature();
        me.logEvent({"temperature": currentTemp, "eventName": "temperature"});
    },
    logEvent: function (eventData) {
        var me = hottub.datalog,
            ts = Math.floor(Date.now() / 1000),
            currentTime = new Date().toString();
        eventData["timeStamp"] = ts.toString();
        eventData["timeString"] = currentTime;
        me._dataLog.unshift(eventData);
        if (me._dataLog.length > me.maxLogSize) {
            me._dataLog.pop();
        }
        me.logEventToAWS(eventData);
    },
    logEventToAWS: function (eventData) {
        var me = hottub.datalog,
            ts = Math.floor(Date.now() / 1000),
            currentTime = new Date().toString(),
            params = {"TableName": me.dynamoTable, "Item": eventData, "timeStamp": ts.toString()};

        try {
            me.awsClient.put(params, function (err, data) {
                if (err) {
                    console.log(err, data);
                }
            });
        } catch (error) {
            console.log(error);
        }

    }
};

var AWS = require("aws-sdk");
var AWSConfig = AWSCredentials;

AWS.config.update(AWSConfig);

hottub.aws = {
    awsClient: null,
    dynamoTable: "hottub.js",
    initialize: function () {
        var me = hottub.aws;
        me.awsClient=new AWS.DynamoDB.DocumentClient(AWSCredentials);
    },
    logData: function(){
       var me = hottub.datalog,
           currentTemp = hottub.interface.getTemperature();
       me.logEvent({"temperature":currentTemp, "eventName":"temperature"});
    },
    logEventToAWS: function(eventName, eventData){
        var me = hottub.aws,
            ts = Math.floor(Date.now() / 1000),
            currentTime = new Date().toString(),
            params = { "TableName": me.dynamoTable, 
                       "eventName": eventName,
                       "Item": eventData, 
                       "timeStamp":ts.toString()};

        try{
            me.awsClient.put(params, function(err, data){
                if(err){
                    console.log(err, data);
                }
            });
        } catch (error){
            console.log(error);
        }
  
    }
};

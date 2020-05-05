// Load the AWS SDK for Node.js
var AWS = require('aws-sdk')

// Set Region
AWS.config.update({
    region: "ap-northeast-1"
});

// Create publish parameters
var params = {
    Message: "aws message test 안녕ㄴㅇ라ㅓㄴㅇ;런;이ㅏㅓㄹ;ㅏㄴㅇㄹ",
    PhoneNumber: process.env.MY_PHONE,
};

// Create promise and SNS service object
var publishTextPromise = new AWS.SNS({
    apiVersion: '2010-03-31',
}).publish(params).promise();

// Handle promise's fulfilled/rejected states
publishTextPromise.then(
    function (data) {
        console.log("MessageID is " + data.MessageId);
    }).catch(
    function (err) {
        console.log(err, err.stack);
    });
var express = require('express');
var request = require('superagent');
var airgram = require('./airgram.js');
var app = express();

var schedule = require('node-schedule');

const userEmail = 'user@mail.com';
const checkUrl = 'https://google.com';

var service = airgram.getService('ServiceKey', 'ServiceSecret');
console.log(service);

service.subscribe(userEmail, function (err, res) {
    console.log(userEmail + ' subscribed');
});

app.get('/', function (req, res) {
    airgram.sendMessageAsGuest(userEmail, 'Test Message');
    res.send('Hello World');
});


var rule = new schedule.RecurrenceRule();
rule.minute = new schedule.Range(0, 59, 1);

var check = function (url, callback) {
    console.log('Checking');
    request.get(url)
        .end(function (res) {
            if (res.ok) {
                console.log('Ok...');
                if (callback != null)
                    callback(true);
            }
            else {
                console.log('Error');
                if (callback != null)
                    callback(false);
            }
        });
};

var lastResult = true;
var checkWebSite = function () {
    check(checkUrl, function (result) {
        if (lastResult !== result) {
            lastResult = result;
            if (!result)
                airgram.sendMessageAsGuest(userEmail, 'Error', function (res) {
                    console.log(res);
                });
            else
                airgram.sendMessageAsGuest(userEmail, 'Ok', function (res) {
                    console.log(res);
                });
        }
    });
};

/*
var job = schedule.scheduleJob(rule, function()
{
  checkWebSite();
});

console.log('Job scheduled');
*/

checkWebSite();

app.listen(3001);
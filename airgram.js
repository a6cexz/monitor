var request = require('superagent');

var AirgramService = function (serviceKey, serviceSecret) {
    self = this;

    self.airGramUrl = 'http://api.airgramapp.com';

    self.serviceKey = serviceKey;
    self.serviceSecret = serviceSecret;

    var subscribe = function (email, callback) {
        console.log('subscribe called:' + email);
        if (callback)
            callback('', '');
    };
    self.subscribe = subscribe;

    self.getGuestMessageRequestLink = function (email, msg) {
        var airgramlink = self.airGramUrl + '/1/send_as_guest';

        var query = 'email=' + email;
        query = query + '&msg=' + "'" + msg + "'";
        airgramlink = airgramlink + "?" + query;

        return airgramlink;
    };

    self.sendMessageAsGuest = function (email, msg, callback) {
        var requestUrl = self.getGuestMessageRequestLink(email, msg);
        request.get(requestUrl).end(function (res) {
            if (callback)
                callback(res);
        });
    };

    return self;
};

var getService = function (serviceKey, serviceSecret) {
    return new AirgramService(serviceKey, serviceSecret);
};

module.exports.getService = getService;
module.exports.sendMessageAsGuest = sendMessageAsGuest;
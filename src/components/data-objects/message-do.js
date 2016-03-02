define(['knockout', '../data-objects/data-object.js'], function(ko, DataObject) {

    // need to move these to a date object
    function MessageDO() {
        DataObject.call(this);

        var self = this;
        self.restEndPoint = '/rest/messages';

        self.to = ko.observable();
        self.subject = ko.observable();
        self.body = ko.observable();
        self.toList = ko.observableArray(['ALL MEMBERS', 'BOARD MEMBERS', 'OFFICERS', 'RANGE OFFICERS']);

    }
    MessageDO.inheritsFrom(DataObject);

    MessageDO.prototype.init = function (message) {
        var self = this;
        DataObject.prototype.init.call(this, message);

        self.to('');
        self.subject('');
        self.body('');
        if (message) {
            self.to(message.to);
            self.subject(message.subject);
            self.body(message.body);
        }

    };

    MessageDO.prototype.toJSON = function() {
        var self = this;

        var json = DataObject.prototype.toJSON.call(this) || {};
        json.to = self.to();
        json.subject = self.subject();
        json.body = self.body();

        return json;
    }


    MessageDO.prototype.createQuery = function (params) {
        var reqData = {};
        if (params) {
            if (params.sort) {
                // ignore and just load params with sort of date
                reqData.sort = {end: true};
            }
            if (params.limit) {
                reqData.limit = params.limit;
            }
            if (params.skip) {
                reqData.skip = params.skip;
            }
        }

        return reqData;
    };



    // might just make all data objects part of this file and return a hash
    return MessageDO;
});
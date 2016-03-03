define(['knockout', '../data-objects/data-object.js'], function(ko, DataObject) {

    // need to move these to a date object
    function MessageDO() {
        DataObject.call(this);

        var self = this;
        self.restEndPoint = '/rest/messages';

        self.to = ko.observable();
        self.subject = ko.observable();
        self.body = ko.observable();

        /* returns true if to, subject and body are not empty */
        self.isComplete = ko.computed(function() {
            var subject = (self.subject() || '').trim();
            var body = ($(self.body()).text() || '').trim();

            return ((subject.length > 0) && (body.length > 0));
        });

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
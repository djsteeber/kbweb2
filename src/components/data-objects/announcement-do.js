define(['knockout', '../data-objects/data-object.js'], function(ko, DataObject) {

    // need to move these to a date object
    function AnnouncementDO() {
        DataObject.call(this);

        var self = this;
        self.restEndPoint = '/rest/announcements';

        self.title = ko.observable();
        self.text = ko.observable();
        self.start = ko.observable();
        self.end = ko.observable();

    }
    AnnouncementDO.inheritsFrom(DataObject);

    AnnouncementDO.prototype.init = function (announcement) {
        var self = this;
        self.title(announcement.title);
        self.text(announcement.text);
        self.start(announcement.shootType);
        self.end(announcement.description);
    };

    AnnouncementDO.prototype.createQuery = function (params) {
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
            if (params.current) {
                // make this a function
                var now = new Date();

                var nowStr = now.toJSON().split('T')[0];
                // for now send as one struct until I can find the ajax call to send multiple parameters
                //reqData = { schedule: { "$elemMatch": {date: {"$gte": nowStr}}}};

                reqData.q = {end: {"$gte": "now()"}};
            }
        } else {
            //TODO, make this clickable / passed in as a param
            reqData = {sort: {schedule: {date: false}}};
        }

        return reqData;
    };



    // might just make all data objects part of this file and return a hash
    return AnnouncementDO;
});
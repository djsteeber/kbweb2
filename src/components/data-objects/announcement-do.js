define(['knockout'], function(ko) {

    // need to move these to a date object
    function AnnouncementDO(announcement) {
        var self = this;

        self.title = ko.observable();
        self.text = ko.observable();
        self.start = ko.observable();
        self.end = ko.observable();


        self.init = function(announcement) {
            self.title(announcement.title);
            self.text(announcement.text);
            self.start(announcement.shootType);
            self.end(announcement.description);
        }

        if (announcement) {
            self.init(announcement);
        }

        self.load = function(id) {
            if (id) {
                $.ajax({
                    url: "/rest/announcements/" + id,
                    type: "GET",
                    //data: data,
                    success: function (returnData) {
                        self.init(returnData);
                    },
                    error: function (obj) {
                        alert(JSON.stringify(obj));
                    }
                });
            }
        };
    }

    //might also want to return and arr
    //TODO: this could be generic, would need to know which object and endpoint to load
    function loadList(oa, params) {
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

                reqData.q = { end: {"$gte": "now()"}};
            }
        } else {
            //TODO, make this clickable / passed in as a param
            reqData = {sort: {schedule:{date: false}}};
        }
        $.ajax({
            dataType: "json",
            url: "/rest/announcements",
            type: "GET",
            //async: false,
            //data: reqData,
            success: function (returnData) {
                returnData = $.map(returnData, function(item, inx) {
                    return new AnnouncementDO(item);
                });
                oa(returnData);
            },
            fail: function (err) {
                alert(err);
            }

        });
    }


    // might just make all data objects part of this file and return a hash
    return {item: AnnouncementDO, loadList: loadList}});
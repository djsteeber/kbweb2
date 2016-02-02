define(['knockout', '../data-objects/schedule-do.js'], function(ko, ScheduleDO) {
    /*
     var shoot = {
     name: reqString
     ,description: reqString
     ,shootType: reqString
     ,schedule: {isArrayOf: [schedule, 1]} //change to 1 once the ready to move to date times
     ,flyer: {isRequired: false, isFile: true} // change to points to document
     ,results: {isString:true}  // change to points to document
     ,dateText: reqString  // ignored, computed from schedule
     ,timeText: reqString  // ignored, will be computed from schedule
     ,shortDescription: reqString // ignored, compute from first sentense of description
     };

     */

    function ShootDO(evtOrID) {
        var self = this;

        self.id = ko.observable();
        self.name = ko.observable();
        self.description = ko.observable();
        //self.shortDescription = ko.observable();
        self.shootType = ko.observable();
        self.schedule = ko.observable();
        self.flyer = ko.observable();
        self.results = ko.observable({url: ko.observable(), name: ko.observable()});
        self.status = ko.observable();



        self.dateText = ko.computed(function () {
            var rtn = "";
            if (self.schedule()) {
                rtn = self.schedule().dateString();
            }
            return rtn;
        });


        self.timeText = ko.computed(function() {
            var rtn = '';
            if ((self.shootType() != null) && (self.shootType() == 'League')) {
                if (self.schedule()) {
                    rtn = self.schedule().getDayOfWeek();
                }
            }
            return rtn;
        });

        self.shortDescription = ko.computed(function() {
            var shortDesc = '';
           if (self.description()) {
               shortDesc = self.description().split('.')[0];
           }
            return shortDesc;
        });

        self.hasFlyer = ko.computed(function() {
            return (! (typeof self.flyer() === 'undefined' || (typeof self.flyer().url() === 'undefined')));
        });

        self.inProgress = ko.computed(function() {
           return self.schedule() && self.schedule().inProgress();
        });


        self.init = function(evt) {
            self.id(evt._id);
            self.name(evt.name);
            self.shootType(evt.shootType);
            self.description(evt.description);
            //self.shortDescription(evt.shortDescription);
            self.schedule(new ScheduleDO.schedule(evt.schedule));

            // for this we need to make sure every entity in flyer is observable as well
            // should use mapper, but oh well
            if (evt.flyer) {
                var obsFlyer = {};
                for (var key in evt.flyer) {
                    obsFlyer[key] = ko.observable(evt.flyer[key]);
                }
                self.flyer(obsFlyer);
            }
            if (evt.results) {
                var obsResults = {};
                for (var key in evt.flyer) {
                    obsResults[key] = ko.observable(evt.results[key]);
                }
                self.results(obsResults);
            }
        };

        self.load = function(id) {
            if (id) {
                $.ajax({
                    url: "/rest/shoots/" + id,
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

        if (evtOrID) {
            if ((typeof evtOrID == 'object')) {
                self.init(evtOrID);
            } else {
                self.load(evtOrID);
            }
        }
    }



    //might also want to return and arr
    function loadList(oa, params) {
        var reqData = {};
        if (params) {
            if (params.sort) {
                // ignore and just load params with sort of date
                reqData.sort = {schedule:{date: true}};
            }
            if (params.limit) {
                reqData.limit = params.limit;
            }
            if (params.skip) {
                reqData.skip = params.skip;
            }
            if (params.current) {
                var now = new Date();

                var nowStr = now.toJSON().split('T')[0];
                // for now send as one struct until I can find the ajax call to send multiple parameters
                //reqData = { schedule: { "$elemMatch": {date: {"$gte": nowStr}}}};

                reqData.q = { schedule: { "$elemMatch": {date: {"$gte": nowStr}}}};
            }
        } else {
            //TODO, make this clickable / passed in as a param
            reqData = {sort: {schedule:{date: false}}};
        }
        $.ajax({
            dataType: "json",
            url: "/rest/shoots",
            type: "GET",
            //async: false,
            data: {q: JSON.stringify(reqData)},
            success: function (returnData) {
                returnData = $.map(returnData, function(item, inx) {
                    return new ShootDO(item);
                });
                oa(returnData);
            },
            error: function (obj) {
                alert('an error occurred');
                alert(JSON.stringify(obj));
            }
        });
    }


    // might just make all data objects part of this file and return a hash
    return {item: ShootDO, loadList: loadList};
});
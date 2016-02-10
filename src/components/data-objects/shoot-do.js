define(['knockout', '../data-objects/schedule-do.js', 'moment'], function(ko, ScheduleDO, moment) {
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
        self.ranges = ko.observableArray();
        self.schedule = ko.observable();
        self.flyer = ko.observable();
        self.results = ko.observable({url: ko.observable(), name: ko.observable()});
        self.status = ko.observable();
        self.scheduleStartDate = ko.observable();
        self.scheduleEndDate = ko.observable();


        /**
         * fullCalendar integration:  This will return the schedule as elements for full calendar
         * format of item
         *         {
         *         title: 'Lunch',
         *         start: new Date(y, m, d, 12, 0),
         *         end: new Date(y, m, d, 14, 0),
         *         allDay: false},
         *         url, backgroundColor
         */
        self.fullCalendar = ko.computed(function() {

            var sched = self.schedule();
            if (! sched) {
                return [];
            }
            var dates = sched.dates();

            var color = 'red';
            if (self.shootType() === 'League') {
                color = 'green';
            }

            var rtn = dates.map(function(item) {
                var ary = [];
                var obj = {id: self.id()};
                var dtStart = item.start();
                var dtEnd = item.end();
                var dayInc = (item.repeat() === 'WEEKLY' ? 7 : 1);

                for (var i = 0; i < item.repeatCount(); i++ ) {
                    var obj = {title: self.name(), id: self.id(), start: dtStart, end: dtEnd,
                        allDay: false,
                        kgroundColor: color,
                        url: '/#shoot/' + self.id()};
                    ary.push(obj);

                    dtStart = moment(dtStart).add(dayInc, 'days').toDate();
                    dtEnd = moment(dtEnd).add(dayInc, 'days').toDate();
                }

                return ary;
            });

            return rtn;
        });

        self.rangeStringList = ko.computed(function() {
           var ary = self.ranges();

            var rangeList = ary.map(function(item) {
                return item();
            });

            return rangeList.join(",");
        });



        self.dateText = ko.computed(function () {
            var rtn = "";

            var options =  { year: 'numeric', month: 'short', day: 'numeric' };
            if (self.scheduleStartDate()) {
                rtn = self.scheduleStartDate().toLocaleDateString('en-US', options);
                if (self.scheduleEndDate()) {
                    if (self.scheduleEndDate().getTime() > self.scheduleStartDate().getTime()) {
                        rtn = rtn + ' - ' + self.scheduleEndDate().toLocaleDateString('en-US', options)
                    }
                }
            }

            return rtn;
        });


        self.timeText = ko.computed(function() {
            var rtn = '';
            // really need to check if schedule, xschedule has a reoccurring, maybe
            if ((self.shootType() != null) && (self.shootType() == 'League')) {
                if (self.scheduleStartDate()) {
                    rtn = self.scheduleStartDate().toLocaleDateString('en-US', {weekday: 'long'});
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
            var inprogress = false;
            var now = Date.now();
            var start = self.scheduleStartDate();
            var end = self.scheduleEndDate()


            if (start && end) {
                inprogress = ((start.getTime() <= now) && (now <= end.getTime()));
            }
            return inprogress;
        });


        self.init = function(evt) {
            self.id(evt._id);
            self.name(evt.name);
            self.shootType(evt.shootType);
            self.description(evt.description);
            //self.shortDescription(evt.shortDescription);
            self.schedule(new ScheduleDO.schedule(evt.schedule));
            self.scheduleStartDate((evt.scheduleStartDate)? new Date(evt.scheduleStartDate) : undefined);
            self.scheduleEndDate((evt.scheduleEndDate)? new Date(evt.scheduleEndDate) : undefined);

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
                for (var key in evt.results) {
                    obsResults[key] = ko.observable(evt.results[key]);
                }
                self.results(obsResults);
            }
            if (evt.range) {
                var list = evt.range.map(function(item) {
                    return ko.observable(item);
                });
                self.ranges(list);
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
                reqData.sort = {"scheduleStartDate": 1};
            }
            if (params.limit) {
                reqData.limit = (typeof params.limit == 'string') ? parseInt(params.limit) : params.limit;
            }
            if (params.skip) {
                reqData.skip = params.skip;
            }
            if (params.current) {
                reqData.q = { scheduleEndDate: {"$gte": "now()"}};
            }
        } else {
            //TODO, make this clickable / passed in as a param
            //reqData = {sort: {"schedule.date": 1}};
        }
        $.ajax({
            dataType: "json",
            url: "/rest/shoots",
            type: "GET",
            //async: false,
            data: reqData,                            //{q: JSON.stringify(reqData)},
            success: function (returnData) {
                returnData = $.map(returnData, function(item) {
                    return new ShootDO(item);
                });
                oa(returnData);
            }
        });
    }


    // might just make all data objects part of this file and return a hash
    return {item: ShootDO, loadList: loadList};
});
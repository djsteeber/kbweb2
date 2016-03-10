define(['knockout', '../data-objects/data-object.js', '../data-objects/schedule-do.js', 'moment'], function(ko, DataObject, ScheduleDO, moment) {

    function EventDO() {
        DataObject.call(this);

        // self is initialized in DataObject
        var self = this;
        self.restEndPoint = '/rest/events';


        this.name = ko.observable();
        this.description = ko.observable();
        this.eventType = ko.observable();
        this.schedule = ko.observable();
        this.scheduleStartDate = ko.observable();
        this.scheduleEndDate = ko.observable();

        this.inProgress = ko.computed(function() {
            var inprogress = false;
            var now = Date.now();
            var start = self.scheduleStartDate();
            var end = self.scheduleEndDate();


            if (start && end) {
                inprogress = ((start.getTime() <= now) && (now <= end.getTime()));
            }
            return inprogress;
        });

        this.fullCalendar = ko.computed(function() {
            var sched = self.schedule();
            if (! sched) {
                return [];
            }
            var dates = sched.dates();

            var color = self.fullCalendarBackgroundColor();

            var rtn = dates.map(function(item) {
                var ary = [];
                var obj = {id: self.id()};
                var dtStart = item.start();
                var dtEnd = item.end();
                var dayInc = (item.repeat() === 'WEEKLY' ? 7 : 1);

                //TODO need to change the url and point it to and event url
                for (var i = 0; i < item.repeatCount(); i++ ) {
                    var obj = {title: self.name(), id: self.id(), start: dtStart, end: dtEnd,
                        allDay: false,
                        backgroundColor: color,
                        url: '/#shoot/' + self.id()};
                    ary.push(obj);

                    dtStart = moment(dtStart).add(dayInc, 'days').toDate();
                    dtEnd = moment(dtEnd).add(dayInc, 'days').toDate();
                }

                return ary;
            });

            return rtn;
        });

        this.dateText = ko.computed(function () {
            var rtn = "";

            if (self.scheduleStartDate()) {
                rtn = moment(self.scheduleStartDate()).format("MM/DD/YY");
                if (self.scheduleEndDate()) {
                    var edt = moment(self.scheduleEndDate()).format("MM/DD/YY");
                    if (rtn != edt) {
                        rtn = rtn + ' - ' + edt;
                    }
                }
            }

            return rtn;
        });

        self.timeText = ko.computed(function() {
            var rtn = '';
            if (self.scheduleStartDate()) {
                rtn = moment(self.scheduleStartDate()).format("h:mm A");
                if (self.scheduleEndDate()) {
                    var edt = moment(self.scheduleEndDate()).format("h:mm A");
                    if (rtn != edt) {
                        rtn = rtn + ' - ' + edt;
                    }
                }
            }
            return rtn;
        });



        this.shortDescription = ko.computed(function() {
            var shortDesc = '';
            if (self.description()) {
                shortDesc = self.description().split('.')[0];
            }
            return shortDesc;
        });
    }
    EventDO.inheritsFrom(DataObject);

    EventDO.prototype.init = function(evt) {
        DataObject.prototype.init.call(this, evt)
        var self = this;

        self.name(evt.name);
        self.description(evt.description);
        self.schedule(new ScheduleDO(evt.schedule));
        self.eventType(evt.eventType);
        self.scheduleStartDate((evt.scheduleStartDate)? new Date(evt.scheduleStartDate) : undefined);
        self.scheduleEndDate((evt.scheduleEndDate)? new Date(evt.scheduleEndDate) : undefined);

        //TODO THINK about whether or not it makes since to extend the object based on type or just load it into the scren as is
        //      or maybe shoot is just and extension of event.  Refactor Shoot.
    };

    EventDO.prototype.fullCalendarBackgroundColor = function() {
        return 'blue';
    }

    EventDO.prototype.createQuery = function(params) {
        var reqData  ={};
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
            if (params.eventType) {
                if (reqData.q) {
                    reqData.q = {"$and": [reqData.q, {"eventType" : params.eventType}]};
                } else {
                    reqData.q = {"eventType": params.eventType};
                }
                //TODO  need to write this query better so we can pass in the eventType
            }
        } else {
            //TODO, make this clickable / passed in as a param
            //reqData = {sort: {"schedule.date": 1}};
        }

        return reqData;
    };


    // might just make all data objects part of this file and return a hash
    return EventDO;
});
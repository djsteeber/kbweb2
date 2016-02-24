define(['knockout', 'moment', '../data-objects/event-do.js'], function(ko, moment, EventDO) {

    function ShootDO() {
        EventDO.call(this);

        var self = this;
        self.restEndPoint = '/rest/shoots';
        self.shootType = ko.observable();
        self.ranges = ko.observableArray();
        self.flyer = ko.observable();
        self.results = ko.observable({url: ko.observable(), name: ko.observable()});

        this.rangeStringList = ko.computed(function() {
           var ary = self.ranges();

            var rangeList = ary.map(function(item) {
                return item();
            });

            return rangeList.join(",");
        });

        self.timeText = ko.computed(function() {
            var rtn = '';
            if ((self.shootType() != null) && (self.shootType() == 'League')) {
                if (self.scheduleStartDate()) {
                    rtn = moment(self.scheduleStartDate()).format('dddd');
                }
            }
            return rtn;
        });


    }
    ShootDO.inheritsFrom(EventDO);

    ShootDO.prototype.init = function(evt) {
        EventDO.prototype.init.call(this, evt)
        var self = this;

        self.shootType(evt.shootType);

        // for this we need to make sure every entity in flyer is observable as well
        // should use mapper, but oh well
        if (evt.flyer) {
            var obsFlyer = {};
            for (var key in evt.flyer) {
                obsFlyer[key] = ko.observable(evt.flyer[key]);
            }
            this.flyer(obsFlyer);
        }
        if (evt.results) {
            var obsResults = {};
            for (var key in evt.results) {
                obsResults[key] = ko.observable(evt.results[key]);
            }
            this.results(obsResults);
        }
        if (evt.range) {
            var list = evt.range.map(function(item) {
                return ko.observable(item);
            });
            this.ranges(list);
        }

    };

    ShootDO.prototype.fullCalendarBackgroundColor = function() {
        var self = this;
        var color = 'blue';
        if (self.shootType()) {
            if (self.shootType() == 'League') {
                color = 'green';
            }
        } else {
            color = EventDO.prototype.fullCalendarBackgroundColor.call(this);
        }
        return color;
    }


    // might just make all data objects part of this file and return a hash
    return ShootDO;
});
define(['knockout'], function(ko) {

    // need to move these to a date object
    var MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    var DAY_OF_WEEK = ['Sunday', 'Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    var DATE_OPTIONS = { year: 'numeric', month: 'short', day: 'numeric' };

    function DateTimeDo(dt) {
        var self = this;
        self.start = ko.observable((dt.start) ? new Date(dt.start) : undefined);
        self.end = ko.observable((dt.end) ? new Date(dt.end) : undefined);
        self.repeat = ko.observable((dt.repeat) ? dt.repeat : 'DAILY');
        self.repeatCount = ko.observable((dt.repeatCount) ? dt.repeatCount : 1);


        self.displayDate = ko.computed(function() {
            var rtn = '';
            if (self.start()) {
                rtn = self.start().toLocaleDateString('en-US', DATE_OPTIONS)
            }
            return rtn;
        });

        // might not need this
        self.getDayOfWeek = ko.computed(function() {
            var rtn = '';
            if (self.start()) {
                rtn = self.start().toLocaleDateString('en-US', {weekday: 'long'});
            }

            return rtn;
        });
    }

    function ScheduleDO(sched) {
        var self = this;

        self.dates = ko.observableArray();
        if (sched) {
            // assumed sorted.
            var oSched = $.map(sched, function(item) {
                return new DateTimeDo(item);
            });
            self.dates(oSched);
        }

        self.displayDates = ko.computed(function() {
            return 'fix chedule-do:displayDates'
        });

        self.getDayOfWeek = ko.computed(function() {
            var dateAry = self.dates();
            var str = '';
            if (! dateAry) {
                str = '';
            } else if (dateAry.length > 0) {
                str = dateAry[0].getDayOfWeek();
            }

            return str;
        });

        self.today = function() {
            var dt = new Date();
            dt = new Date(dt.getFullYear(), dt.getMonth(), dt.getDate());

            return dt;
        };


    }
    // might just make all data objects part of this file and return a hash
    return {schedule: ScheduleDO, date: DateTimeDo};
});
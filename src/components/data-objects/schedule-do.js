define(['knockout', 'moment'], function(ko, moment) {

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

        //TODO fix or delete this
        self.displayDates = ko.computed(function() {
            return 'fix schedule-do:displayDates'
        });

    }
    // might just make all data objects part of this file and return a hash
    return {schedule: ScheduleDO, date: DateTimeDo};
});
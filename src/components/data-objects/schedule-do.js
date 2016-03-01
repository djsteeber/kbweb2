define(['knockout', '../data-objects/date-time-do.js'], function(ko, DateTimeDO) {

    function ScheduleDO(sched) {
        var self = this;

        self.dates = ko.observableArray();
        if (sched) {
            // assumed sorted.
            var oSched = $.map(sched, function(item) {
                return new DateTimeDO(item);
            });
            self.dates(oSched);
        }

        //TODO fix or delete this
        self.displayDates = ko.computed(function() {
            return 'fix schedule-do:displayDates'
        });

    }
    // might just make all data objects part of this file and return a hash
    return ScheduleDO;
});
define(['knockout'], function(ko) {

    // need to move these to a date object
    var MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    var DAY_OF_WEEK = ['Sunday', 'Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

    function DateTimeDo(dt) {
        var self = this;
        self.date = ko.observable(dt.date);
        self.start = ko.observable(dt.start);
        self.end = ko.observable(dt.end);

        self.displayDate = ko.computed(function() {
            var dtParts = self.date().split('-');

            return MONTH_NAMES[parseInt(dtParts[1])-1] + ' ' + parseInt(dtParts[2]) + ', ' + dtParts[0];
        });

        self.getDayOfWeek = ko.computed(function() {
           var d = new Date(self.date());
            d.setTime( d.getTime() + d.getTimezoneOffset()*60*1000 );

            return DAY_OF_WEEK[d.getDay()];
        });
    }

    function ScheduleDO(sched) {
        var self = this;

        self.dates = ko.observableArray();
        if (sched) {
            var oSched = $.map(sched, function(item) {
                return new DateTimeDo(item);
            });
            self.dates(oSched);
        }

        self.displayDates = ko.computed(function() {
            var dtList = $.map(self.dates(), function(item) {
                return item.displayDate();
            })

            var txt = dtList.join(',');

            return txt;
        });

        // TODO not computing correctly.  Error is cannot read property displayDate
        // TODO need to debug
        self.dateString = ko.computed(function() {
            var dateAry = self.dates();
            var str = '';
            if (! dateAry) {
                str = '';
            } else if (dateAry.length == 1) {
                str = dateAry[0].displayDate();
            } else  if (dateAry.length > 1) {
                str = dateAry[0].displayDate() + ' - ' + dateAry[dateAry.length - 1].displayDate();
            }

            return str;
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
    }
    // might just make all data objects part of this file and return a hash
    return {schedule: ScheduleDO, date: DateTimeDo};
});
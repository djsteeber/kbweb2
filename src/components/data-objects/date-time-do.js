define(['knockout'], function(ko) {


    function DateTimeDo(dt) {
        var self = this;
        self.start = ko.observable((dt.start) ? new Date(dt.start) : undefined);
        self.end = ko.observable((dt.end) ? new Date(dt.end) : undefined);
        self.repeat = ko.observable((dt.repeat) ? dt.repeat : 'DAILY');
        self.repeatCount = ko.observable((dt.repeatCount) ? dt.repeatCount : 1);

    }

    // might just make all data objects part of this file and return a hash
    return DateTimeDo;
});
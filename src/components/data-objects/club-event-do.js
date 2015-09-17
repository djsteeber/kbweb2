define(['knockout'], function(ko) {

    /*
     var schedule = {
     date: {isRequired:true, isDate:true}
     ,start: {isRequired:true, isTime:true}
     ,end: {isRequired:true, isTime:true}
     };

     */
    function DateTimeDo(dt) {
        var self = this;
        self.date = ko.observable(dt.date);
        self.start = ko.observable(dt.start);
        self.end = ko.observable(dt.end);

        self.displayDate = ko.computed(function() {
           return self.date; //TODO might want to format
        });
    }

    function ScheduleDO(sched) {
        var self = this;

        self.dates = ko.observableArray();
        if (sched) {
            var oSched = $.map(sched, function(item) {
                return new DateTimeDo(item);
            });
            self.dates = ko.observableArray(oSched)
        }

        self.displayDates = ko.computed(function() {
            var dtList = $.map(self.dates(), function(item) {
                return item.displayDate()();
            })

            var txt = dtList.join(',');

            return txt;
        }, self);

        self.text = ko.computed(function() {
            return 'Fill in the Schedule text';
        });

        //TODO:  add some logic here to compress dates down for weekly events
        //TODO:  example if all dates are 7 days apart, return every Monday from x to y
        //TODO:  example if all dates are 1 day apart, return from x to y, if more than 3 days


    }

    function ClubEventDO(evt) {
        var self = this;

        self.id = ko.observable();
        self.name = ko.observable();
        self.event_type = ko.observable();
        self.description = ko.observable();
        self.location = ko.observable();
        self.schedule = ko.observable();
        self.flyer = ko.observable();
        self.url = ko.observable();

        self.init = function(evt) {
            self.id(evt._id);
            self.name(evt.name);
            self.event_type(evt.event_type);
            self.description(evt.description);
            self.location(evt.location);
            self.schedule(new ScheduleDO(evt.schedule));
            self.flyer(evt.flyer);
            self.url(evt.uri);
        }

        if (evt) {
            self.init(evt);
        }

        self.toJSON = function() {
            var obj = {};
            var temp = ko.mapping.toJS(self);
            var fields = ['name', 'event_type', 'description', 'location', 'schedule', 'flyer'];


            fields.forEach(function(item) {
               if (temp[item]) {
                   obj[item] = temp[item];
               }
            });
            // force in a scheudule just to see it pass
            obj['schedule'] = [{'date' : '10/01/2015', 'start': '0800', 'end' : '1700'}];
            return obj;
        };



        //TODO HERE Need to figure out why save is not being called
        self.save = function() {
            // ok, here we need to call back to the server to save the new or updated event

            // will need to build the schedule component
            // need to covert schedule to a json object from a string.


            var obj = self.toJSON();
            var data = obj;

            if (ko.unwrap(self.id)) {
                $.ajax({
                    url: "/rest/v1/events/" + self.id,
                    type: "PUT",
                    data: data,
                    success: function (/* returnData */) {
                        // should parse out the data from the server, and redisplay, maybe
                        alert(JSON.stringify(data));
                        // TODO, add a success and failure callback so the screen can route or update
                    },
                    error: function (obj) {
                        alert(JSON.stringify(obj));
                    }
                });

                // this is an update, issue a put
            } else {
                $.ajax({
                    url: "/rest/v1/events",
                    type: "POST",
                    data: data,
                    success: function (/* returnData */) {
                        // should parse out the data from the server, and redisplay, maybe
                        alert(JSON.stringify(data));
                    },
                    error: function (obj) {
                        alert(JSON.stringify(obj));
                    }
                });
            }
            // this is a create, issue a post
            // might need to validate


        };

        self.load = function(id) {
            if (id) {
                $.ajax({
                    url: "/rest/v1/events/" + id,
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

        self.delete = function() {
            $.ajax({
                url: "/rest/v1/events/" + self.id(),
                type: "DELETE",
                //data: data,
                success: function (returnData) {
                    //TODO maybe return a response to the caller
                    self.id(undefined);
                },
                error: function (obj) {
                    alert(JSON.stringify(obj));
                }
            });
        }
    }

    function getList() {
        var list = ko.observableArray();
        $.ajax({
            url: "/rest/v1/events",
            type: "GET",
            async: false,
            //data: data,
            success: function (returnData) {
                returnData = $.map(returnData, function(item, inx) {
                    return new ClubEventDO(item);
                });
                list = ko.observableArray(returnData);
            },
            error: function (obj) {
                alert('an error occurred');
                alert(JSON.stringify(obj));
            }
        });

        return list;
    };


    // might just make all data objects part of this file and return a hash
    return {item: ClubEventDO, getList: getList};
});
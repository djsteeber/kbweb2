define(["knockout", "text!./upcoming-events.html"], function(ko, templateMarkup) {

    /* fake some data in here, before calling to the rest end point */

    function clickThis() {
        alert('yup this was clicked');
    }

    function UpcomingEvents(route) {
        var self = this;

        self.eventsList = ko.observableArray(
            [
                {title: 'Phantom Pig Shoot', date: 'January 23-24, 2016', times: 'Registration @ 8am, Shoot 8:30am - 3pm', info: 'Food, Bar, 3D Targets', link: '#',
                evt: clickThis},
                {title: 'Cricket Shoot', date: 'February 6, 2016', times: 'Registration @ 8am, Shoot 8:30am - 3pm', info: 'Food, Bar', link: '#'},
                {title: 'Open Shoot', date: 'February 29, 2016', times: 'Registration @ 8am, Shoot 8:30am - 3pm', info: 'Food, Bar, 3D Targets', link: '#'},
                {title: 'Off-Hand Shoot', date: 'March 12, 2016', times: 'Registration @ 8am, Shoot 8:30am - 3pm', info: 'Food, Bar, 3D Targets', link: '#'}
            ]
        );

        self.eventsList2 = ko.observableArray();

        self.evt = function(title) {
            alert("This click will eventually call a page for '" + title + "'");
        };
        // may want pagination

        //load the events list
        self.loadEventsList = function() {
            /* Sample Data item from array
             {"name":"Benefit Shoot"
             ,"event_type":"SHOOT"
             ,"schedule":[{"date":"2015-01-01","start":"0800","end":"1500"}]
             ,"description":"Shoot to benefit the Norr family"
             ,"_id":"55528c94e2856f6d0e02d958"
             ,"uri":"http://localhost:3000/rest/events/55528c94e2856f6d0e02d958"}

             SCHEMA
             {"name":{"isRequired":true,"isString":true}
             ,"event_type":{"isRequired":true,"isString":true,"isOneOf":[["SHOOT","MEETING","LEAGUE","WORKPARTY"]]}
             ,"location":{"pointsTo":"locations"}
             ,"schedule":{"isArrayOf":[{"date":{"isRequired":true,"isDate":true},"start":{"isRequired":true,"isTime":true},"end":{"isRequired":true,"isTime":true}},1]}
             ,"flyer":{"isString":true}
             ,"results_doc":{"isString":true}
             ,"description":{"isRequired":true,"isString":true}
             ,"status":{"isRequired":true,"isString":true,"isOneOf":[["PENDING","APPROVED"]]}}
             */
            $.ajax({
                dataType: "json",
                url: '/rest/events',
                data: {},
                success: function(data) {
                    // can tak this out if data filtering is working
                    var filteredData = data.filter(function(d) {
                        return true;
                    });
                    // need to add in a map call to make schedule displayable
                    self.eventsList2(filteredData);
                }
            });
        };


        //dont call it now, since we are not ready to run it
        // more parsing needs to be done to get the format correct, or we can just optimize
        // it on the input to make our lives easier
        //self.loadEventsList();

    }

    return { viewModel: UpcomingEvents, template: templateMarkup };
});
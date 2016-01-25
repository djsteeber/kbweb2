define(["knockout", "text!./upcoming-events.html"], function(ko, templateMarkup) {

    /* fake some data in here, before calling to the rest end point */

    function UpcomingEvents(params) {
        var self = this;

        self.eventsList = ko.observableArray();

        self.evt = function(flyer) {
            if (flyer) {
                window.open(flyer.url);
            }
            //window.location.href = "#shoot-page/" + id;
        };
        // may want pagination
/*
 {
 "name": "Phantom Zombie Pig Shoot",
 "description": "Come join us to end the appocolypse",
 "dateText": "January 23-24, 2016",
 "timeText": "Registration @ 8am, shoot 9am - 3pm",
 "shortDescription": "Food, Bar, 3D Targets",
 "shootType": [
 "3D Targets"
 ],
 "schedule": [
 {
 "date": "2016-01-23",
 "start": "0900",
 "end": "1700"
 },
 {
 "date": "2016-01-23",
 "start": "0900",
 "end": "1700"
 }
 ],
 "_id": "56a17cf87a275e01148879c7",
 "uri": "http://localhost:3000/rest/shoots/56a17cf87a275e01148879c7"
 }
 */
        //load the events list
        self.loadEventsList = function() {
            $.ajax({
                dataType: "json",
                url: '/rest/shoots',
                data: {},
                success: function(data) {
                    var filteredData = data.map(function(d) {
                        return {name: d.name, date: d.dateText, times: d.timeText
                        ,info: d.shortDescription, link: '#', id: d._id, flyer: d.flyer};
                    });
                    // need to add in a map call to make schedule displayable
                    self.eventsList(filteredData);
                }
            });
        };



        //dont call it now, since we are not ready to run it
        // more parsing needs to be done to get the format correct, or we can just optimize
        // it on the input to make our lives easier
        self.loadEventsList();

    }

    return { viewModel: UpcomingEvents, template: templateMarkup };
});
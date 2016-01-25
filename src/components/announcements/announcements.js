define(["knockout", "text!./announcements.html"], function(ko, templateMarkup) {

    function Announcements(/* parameters */) {
        var self = this;

        self.announcementList = ko.observableArray(
            [
//                {title: 'Lesson Classes Available', text: 'There are new lesson classes available. Please send an email to ??? for availabilty and reservation.'}
            ]
        );


        self.loadAnnouncements= function() {
            $.ajax({
                dataType: "json",
                url: '/rest/announcements',
                data: {},
                success: function(data) {
                    // need to filter by date, so get the current date and parse out.
                    // ideally we call the get function with the proper filter so the server does not return them
                    self.announcementList(data);
                }
            });
        };

        self.loadAnnouncements();
    }

        return { viewModel: Announcements, template: templateMarkup };

});
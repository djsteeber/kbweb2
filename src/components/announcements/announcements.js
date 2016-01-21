define(["knockout", "text!./announcements.html"], function(ko, templateMarkup) {

    function Announcements(route) {
        var self = this;

        self.announcementList = ko.observableArray(
            [
                {title: 'Lesson Classes Available', text: 'There are new lesson classes available. Please send an email to ??? for availabilty and reservation.'}
            ]
        );

    }

        return { viewModel: Announcements, template: templateMarkup };

});
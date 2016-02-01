define(["knockout", "text!./announcements.html", '../data-objects/announcement-do.js'], function(ko, templateMarkup, AnnouncemntDO) {

    function Announcements(params) {
        var self = this;

        self.announcementList = ko.observableArray();

        AnnouncemntDO.loadList(self.announcementList, params);
    }

    return { viewModel: Announcements, template: templateMarkup };

});
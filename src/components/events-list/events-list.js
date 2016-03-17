define(["knockout", "text!./events-list.html", '../data-objects/event-do.js'], function(ko, templateMarkup, EventDO) {

    function EventsList(params) {
        var self = this;

        if (! params) {
            params = {};
        }

        //params.current = true;
        //params.eventType = 'WORKPARTY';

        self.title = ko.observable(params.title);
        self.showEmpty = ko.observable(params.showEmpty);

        self.selectedEvent = ko.observable();

        /* need to incorporate this in */
        self.eventsList = ko.observableArray();
        new EventDO().loadList(self.eventsList, params);

        self.selectEvent = function() {
            //get the current event clicked and put it in selected
        }
    }

    return { viewModel: EventsList, template: templateMarkup };
});
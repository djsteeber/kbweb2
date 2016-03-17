define(["knockout", "text!./upcoming-events.html", '../data-objects/shoot-do.js'], function(ko, templateMarkup, ShootDO) {

    /* @deprecated TODO need to replace this with events-list */
    function UpcomingEvents(params) {
        var self = this;

        if (! params) {
            params = {};
        }
        params.current = true;
        /* need to incorporate this in */
        self.shootsList = ko.observableArray();
        new ShootDO().loadList(self.shootsList, params);

        self.evt = function(flyer) {
            if (flyer() && flyer().url) {
                window.open(flyer().url);
            }
            //window.location.href = "#shoot-page/" + id;
        };

    }

    return { viewModel: UpcomingEvents, template: templateMarkup };
});
define(['knockout', 'text!./events-admin-page.html', '../data-objects/club-event-do.js'], function(ko, templateMarkup, ClubEventDO) {

  function EventsAdminPage(params) {
    var self = this;

    self.route = params.route;

    self.message = ko.observable('Hello from the events-admin-page component!');

    self.eventsList = ko.observableArray();

    self.eventsList = ClubEventDO.getList();

    //check login, if not logged in, then redirect

    // check if logged in, use a observable with a subscribeTo


  }


  // This runs when the component is torn down. Put here any logic necessary to clean up,
  // for example cancelling setTimeouts or disposing Knockout subscriptions/computeds.
  EventsAdminPage.prototype.dispose = function() { };
  
  return { viewModel: EventsAdminPage, template: templateMarkup };

});

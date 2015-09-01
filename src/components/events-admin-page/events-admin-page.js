define(['knockout', 'knockout-postbox', 'text!./events-admin-page.html'], function(ko, postbox, templateMarkup) {

  function EventsAdminPage(params) {
    var self = this;
    self.route = params.route;

    self.message = ko.observable('Hello from the events-admin-page component!');

    self.eventsList = ko.observableArray();

    self.myeventId = ko.observable();


  }

  // This runs when the component is torn down. Put here any logic necessary to clean up,
  // for example cancelling setTimeouts or disposing Knockout subscriptions/computeds.
  EventsAdminPage.prototype.dispose = function() { };
  
  return { viewModel: EventsAdminPage, template: templateMarkup };

});

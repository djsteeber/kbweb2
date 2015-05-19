define(['knockout', 'text!./events-page.html'], function(ko, templateMarkup) {

  function EventsPage(params) {
    this.message = ko.observable('Hello from the events-page component!');

  }

  // This runs when the component is torn down. Put here any logic necessary to clean up,
  // for example cancelling setTimeouts or disposing Knockout subscriptions/computeds.
  EventsPage.prototype.dispose = function() { };
  
  return { viewModel: EventsPage, template: templateMarkup };

});

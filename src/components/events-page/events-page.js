define(['knockout', 'text!./events-page.html', '../data-objects/shoot-do.js'], function(ko, templateMarkup, ShootDO) {

  function EventsPage(params) {
    var self = this;

    self.shootsList = ko.observableArray();
    ShootDO.loadList(self.shootsList);

  }

  // This runs when the component is torn down. Put here any logic necessary to clean up,
  // for example cancelling setTimeouts or disposing Knockout subscriptions/computeds.
  EventsPage.prototype.dispose = function() { };
  
  return { viewModel: EventsPage, template: templateMarkup };

});

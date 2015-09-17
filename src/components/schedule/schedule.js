define(['knockout', 'text!./schedule.html'], function(ko, templateMarkup) {

  function Schedule(params) {
    var self = this;
    self.schedule = params.schedule;

    self.message = ko.observable('Hello from the schedule component!');

  }

  // This runs when the component is torn down. Put here any logic necessary to clean up,
  // for example cancelling setTimeouts or disposing Knockout subscriptions/computeds.
  Schedule.prototype.dispose = function() { };
  
  return { viewModel: Schedule, template: templateMarkup };

});

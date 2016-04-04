define(['knockout', 'text!./lessons-page.html'], function(ko, templateMarkup) {

  function LessonsPage(params) {
    var self = this;

    self.message = ko.observable('Hello from the lessons-page component!');

    self.cost = ko.observable("100");



  }

  // This runs when the component is torn down. Put here any logic necessary to clean up,
  // for example cancelling setTimeouts or disposing Knockout subscriptions/computeds.
  LessonsPage.prototype.dispose = function() { };
  
  return { viewModel: LessonsPage, template: templateMarkup };

});

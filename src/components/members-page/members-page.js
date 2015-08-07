define(['knockout', 'text!./members-page.html'], function(ko, templateMarkup) {

  function MembersPage(params) {
    this.message = ko.observable('Hello from the members-page component!');
  }

  // This runs when the component is torn down. Put here any logic necessary to clean up,
  // for example cancelling setTimeouts or disposing Knockout subscriptions/computeds.
  MembersPage.prototype.dispose = function() { };
  
  return { viewModel: MembersPage, template: templateMarkup };

});

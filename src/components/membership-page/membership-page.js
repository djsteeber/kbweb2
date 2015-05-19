define(['knockout', 'text!./membership-page.html'], function(ko, templateMarkup) {

  function MembershipPage(params) {
    this.message = ko.observable('Hello from the membership-page component!');
  }

  // This runs when the component is torn down. Put here any logic necessary to clean up,
  // for example cancelling setTimeouts or disposing Knockout subscriptions/computeds.
  MembershipPage.prototype.dispose = function() { };
  
  return { viewModel: MembershipPage, template: templateMarkup };

});

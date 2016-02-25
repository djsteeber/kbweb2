define(['knockout', 'text!./profile-page.html', '../data-objects/user-do.js'], function(ko, templateMarkup, UserDO) {


  function ProfilePage(/* params */) {
    var self = this;

    var userDO = new UserDO();

    self.user = ko.observable(userDO);

    userDO.loadSelf();

  }

  // This runs when the component is torn down. Put here any logic necessary to clean up,
  // for example cancelling setTimeouts or disposing Knockout subscriptions/computeds.
  ProfilePage.prototype.dispose = function() { };




  return { viewModel: ProfilePage, template: templateMarkup };

});

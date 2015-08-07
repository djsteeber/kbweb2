define(['knockout', 'text!./auth.html'], function(ko, templateMarkup) {

  function Auth(params) {
    var self = this;

    self.isAuthenticated = ko.observable(false).publishOn("login.loggedin");
    self.user = ko.observable({}).publishOn("auth.user");


    $.ajax({
      url: "/auth/login",
      type: "GET",
      success: function (returnData) {
        self.isAuthenticated(returnData.authenticated);
        if (returnData.authenticated) {
          self.user(returnData.user);
        } else {
          self.user({});
        }

      }, fail: function (ibx, returnData) {
        alert(JSON.stringify(returnData));
      }
    });
  }

  return { viewModel: Auth, template: templateMarkup };

});

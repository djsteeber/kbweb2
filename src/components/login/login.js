define(['knockout', 'text!./login.html'], function(ko, templateMarkup) {

  function Login(/*params*/) {
    var self = this;

    self.login = ko.observable();
    self.password = ko.observable(); // might want to figure out how to encrypt
    self.isAuthenticated = ko.observable().syncWith("login.loggedin");
    self.loginFormVisible = ko.observable(false);


    $.ajax({
      url: "/auth/login",
      type: "GET",
      success: function (returnData) {
        self.isAuthenticated(returnData.authenticated);
        self.loginFormVisible(returnData.authenticated)
      }, fail: function( ibx, returnData) {
        alert(JSON.stringify(returnData));
      }

    });

    self.showLoginForm = function () {
      if (!self.isAuthenticated()) {
        self.loginFormVisible(true);
      }
    };

    // add a check to see if the cookie is set.  maybe just a simple call to the rest
    // endpoint to validate if a user is logged in
    self.submitLogin = function () {
      var data = {login: ko.unwrap(self.login), password: ko.unwrap(self.password)};

      $.ajax({
        url: "/auth/login",
        type: "POST",
        data: data,
        success: function (returnData) {
          if (returnData.token) {
            self.isAuthenticated(true);
            self.loginFormVisible(false);
            self.password("");
          } else {
            self.isAuthenticated(false);
          }
        },
        error: function (obj) {
          self.isAuthenticated(false);
          alert(JSON.stringify(obj));
        }
      });
    };


    self.submitLogout = function () {
      $.ajax({
        url: "/auth/logout",
        type: "POST",
        success: function (/* returnData */) {
          self.isAuthenticated(false);
        }
      });
    };

    // add isAuthenticated  function here

  }
    return {viewModel: Login, template: templateMarkup};

});

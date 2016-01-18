define(['knockout', 'text!./user-admin-page.html'], function(ko, templateMarkup) {

  function User(data) {
    this.login = ko.observable(data.login);
    this.name = ko.observable(data.name);
    this.email = ko.observable(data.email);
    //TODO change this to a comma delimited string
    this.roles = ko.observable(typeof data.roles == 'object' ? data.roles.join(',') : data.roles);

  }

  var EMPTY_USER = new User({login: undefined, name: undefined, email:undefined, roles:undefined});

  //TODO, see if there is a way to add a growl into this via bootstrap
  function UserAdminPage(params) {
    var self = this;

    self.message = ko.observable('Hello from the user-admin-page component!');
    // this is either an add new or a selection from the table
    self.currentUser = ko.observable(EMPTY_USER);

    self.userList = ko.observableArray();
    //var data = params;
   // delete data['$raw'];

    $.ajax({
      dataType: "json",
      url: '/rest/users',
      method: 'GET',
     // data: data,
      success: function(allData) {
        var mappedData = $.map(allData, function(item) {
          return new User(item);
        });
        self.userList(mappedData);

      }
    });


    self.submitChange = function () {

      var data = ko.unwrap(self.currentUser);

      //TODO:  Check here to see if this is an add or update

      $.ajax({
        url: "/rest/users",
        type: "POST",
        data: data,
        success: function (returnData) {
          alert(returnData);
        },
        error: function (obj) {
          alert(JSON.stringify(obj));
        }
      });
    };

  }

  // This runs when the component is torn down. Put here any logic necessary to clean up,
  // for example cancelling setTimeouts or disposing Knockout subscriptions/computeds.
  UserAdminPage.prototype.dispose = function() { };
  
  return { viewModel: UserAdminPage, template: templateMarkup };

});

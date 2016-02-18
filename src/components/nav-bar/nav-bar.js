define(['knockout', 'text!./nav-bar.html'], function(ko, template) {

    //TODO need to dynamically lock down the navigation based on user authentication
    function NavBarViewModel(params) {
        var self = this;

        self.login = ko.observable();
        self.password = ko.observable(); // might want to figure out how to encrypt
        self.isAuthenticated = ko.observable(false);
        self.user = ko.observable({});

        self.membersMenuTitle = ko.observable("Member's Login");


        // This viewmodel doesn't do anything except pass through the 'route' parameter to the view.
        // You could remove this viewmodel entirely, and define 'nav-bar' as a template-only component.
        // But in most apps, you'll want some viewmodel logic to determine what navigation options appear.

        self.route = params.route;

        self.authNavList = ko.observableArray();

        self.membersMenuTitle2 = ko.computed(function() {
            var title = "Member's Login";

            try {
                var fname = ko.unwrap(self.user).name.firstName;
                title = "Hello, " + fname;
            } catch (err) {

            }

            return title;
        });

        self.firstName = ko.computed(function() {
            var fname = "";
            try {
                fname = ko.unwrap(self.user).name.firstName;
            } catch (err) {
                fname = "";
            }

            return fname;
        });

        $('a.navbar-item').click(function() {
            var navbar_toggle = $('.navbar-toggle');
            if (navbar_toggle.is(':visible')) {
                navbar_toggle.trigger('click');
            }
        });
        // ignore the slow transition of the nav bar
        $.support.transition = false;


        self.submitLogin = function () {
            var data = {username: ko.unwrap(self.login), password: ko.unwrap(self.password)};

            $.ajax({
                url: "/auth/login",
                type: "POST",
                data: data,
                success: function (returnData) {
                    self.loadUser();
                    window.location.assign('/#members');
                },
                error: function (obj) {
                    self.isAuthenticated(false);
                    self.membersMenuTitle("Member's Login");
                    if (obj.status == 401) {
                        alert("Your email address and/or password is invalid.");
                    } else {
                        alert("The members login is not available at the present time.  Please try again later");
                    }
                }
            });
        };


        self.submitLogout = function () {
            $.ajax({
                url: "/auth/logout",
                type: "POST",
                success: function (/* returnData */) {
                    self.isAuthenticated(false);
                    self.user({});
                    //window.location.href = "/";
                    self.membersMenuTitle("Member's Login");
                    // TODO could check href and parse to see if we are on a members page or not, then redirect
                    // for now just redirect to home on logout, not sure anyone will logout
                    window.location.href = "/#home";
                }
            });
        };

        self.loadUser = function() {
            $.ajax({
                url: "/auth/login",
                type: "GET",
                success: function (returnData) {
                    if (returnData.authenticated) {
                        self.isAuthenticated(true);
                        self.password("");
                        self.user(returnData.user);
                        self.membersMenuTitle("Hello, " + returnData.user.name.firstName);
                        // hide the form
                        // old, used to refresh the page window.location.reload();
                    } else {
                        self.isAuthenticated(false);
                        self.membersMenuTitle("Member's Login");
                    }
                }
            });

        };

        self.loadUser();

    }

  return { viewModel: NavBarViewModel, template: template };
});

define(['knockout', 'text!./nav-bar.html'], function(ko, template) {

    function NavBarViewModel(params) {
        var self = this;

        // This viewmodel doesn't do anything except pass through the 'route' parameter to the view.
        // You could remove this viewmodel entirely, and define 'nav-bar' as a template-only component.
        // But in most apps, you'll want some viewmodel logic to determine what navigation options appear.

        self.route = params.route;

        self.authNavList = ko.observableArray();

        self.isLoggedIn = ko.observable(false).subscribeTo("login.loggedin");
        self.user = ko.observable({}).subscribeTo("auth.user");

        self.firstName = function() {
            var fname = "";
            if ((typeof self.user()  != 'undefined')
            && (typeof self.user().name  != 'undefined')) {
                fname = self.user().name.firstName;
            }
            return fname
        }

        $('a.navbar-item').click(function() {
            var navbar_toggle = $('.navbar-toggle');
            if (navbar_toggle.is(':visible')) {
                navbar_toggle.trigger('click');
            }
        });
        // ignore the slow transition of the nav bar
        $.support.transition = false;


    }

  return { viewModel: NavBarViewModel, template: template };
});

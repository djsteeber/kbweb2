define(["knockout", "text!./forgot-password-page.html"], function(ko, template) {

    function ForgotPassword(route) {
        this.message = ko.observable('Welcome to kbweb!');
    }

    ForgotPassword.prototype.doSomething = function() {
        this.message('You invoked doSomething() on the viewmodel.');
    };

    return { viewModel: ForgotPassword, template: template };

});

define(["knockout", "text!./forgot-password-page.html"], function(ko, template) {

    function ForgotPassword(route) {
        var self = this;

        self.emailAddress = ko.observable();
        self.gateCode = ko.observable();
        self.showMessage = ko.observable(false);
        self.showIncompleteMessage = ko.observable(false);

        self.message = ko.observable();
    }

    ForgotPassword.prototype.sendRequest = function() {
        var self = this;
        var data = {username: ko.unwrap(self.emailAddress.toLowerCase()), code: ko.unwrap(self.gateCode)};

        if ((! data.username) || (data.username == '')) {
            self.showIncompleteMessage(true);
            return;
        }

        if ((! data.code) || (data.code == '')) {
            self.showIncompleteMessage(true);
            return;
        }


        $.ajax({
            url: "/auth/forgotPassword",
            type: "POST",
            data: data,
            success: function (returnData) {
                self.showMessage(true);
            },
            error: function (obj) {
                // might want to check the message
                // send an alert
                alert(obj);
            }
        });
    };

    return { viewModel: ForgotPassword, template: template };

});

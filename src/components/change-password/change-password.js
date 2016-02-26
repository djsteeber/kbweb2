define(['knockout', 'text!./change-password.html'], function(ko, templateMarkup) {


    function ChangePassword(/* params */) {
        var self = this;

        // TODO possibly move this to a do
        self.currentPassword = ko.observable();
        self.newPassword = ko.observable();
        self.confirmNewPassword = ko.observable();
        self.passwordMessage = ko.observable();

    }

    // This runs when the component is torn down. Put here any logic necessary to clean up,
    // for example cancelling setTimeouts or disposing Knockout subscriptions/computeds.
    ChangePassword.prototype.dispose = function() { };

    ChangePassword.prototype.sendPasswordChange = function() {
        var self = this;
        var currentPassword = ko.unwrap(self.currentPassword);
        var newPassword = ko.unwrap(self.newPassword);
        var confirmNewPassword = ko.unwrap(self.confirmNewPassword);
        self.currentPassword('');
        self.newPassword('');
        self.confirmNewPassword('');
        self.passwordMessage('');

        if (newPassword != confirmNewPassword) {
            self.passwordMessage('New Password and Confirmed Password do not match');
            return;
        }

        var data = {currentPassword: currentPassword, newPassword: newPassword};

        $.ajax({
            url: "/auth/changePassword",
            type: "POST",
            data: data,
            success: function (returnData) {
                self.passwordMessage('your password has been changed');
            },
            error: function (obj) {
                self.passwordMessage('unable to change your password at this time');
            }
        });
    };



    return { viewModel: ChangePassword, template: templateMarkup };

});

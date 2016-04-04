define(['knockout', 'text!./lesson-signup-page.html'], function(ko, templateMarkup) {

    function LessonSignupPage(params) {
        var self= this;

        self.message = ko.observable('Hello from the lesson-signup-page component!');

        // make this into a data object
        self.email = ko.observable();
        self.signupExists = ko.observable(false);

        self.step = ko.observable(1);
        self.firstStep = ko.computed(function() {
            return self.step()==1;
        });

        self.secondStep = ko.computed(function() {
            return self.step()==2;
        });

        self.thirdStep = ko.computed(function() {
            return self.step()==3;
        });



        self.checkEmail = function() {
            // try to fetch the object, based on the email.  Don't actually display it.
            // we can resend the data
            
            // right now assume signup does not exist, so we can do the base signup case
            self.step(self.step()+1);
        };
        
        self.resendEmail = function() {
            
        };


        self.submitSignup = function() {

        };
    }

    // This runs when the component is torn down. Put here any logic necessary to clean up,
    // for example cancelling setTimeouts or disposing Knockout subscriptions/computeds.
    LessonSignupPage.prototype.dispose = function() { };

    return { viewModel: LessonSignupPage, template: templateMarkup };

});
define(["knockout", "text!./about-page.html"], function(ko, templateMarkup) {

    /* fake some data in here, before calling to the rest end point */



    function AboutPage(route) {
        var self = this;

        self.message = ko.observable('some message');

    }

    return { viewModel: AboutPage, template: templateMarkup };
});
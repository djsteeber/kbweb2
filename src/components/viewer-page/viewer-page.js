define(["knockout", "text!./viewer-page.html"], function(ko, templateMarkup) {

    /* fake some data in here, before calling to the rest end point */

    function ViewerPage(params) {
        var self = this;

        self.src = ko.observable();
        self.hasSource = ko.observable(false);

        var src = params['src*'];
        if (src) {
            self.src('/' + src);
            self.hasSource(true);
        }

        // set the parameter of the src

    }

    return { viewModel: ViewerPage, template: templateMarkup };
});
define(["knockout", "text!./shoot-page.html", '../data-objects/shoot-do.js'], function(ko, templateMarkup, ShootDO) {

    /* fake some data in here, before calling to the rest end point */

    function ShootPage(params) {
        var self = this;

        self.id = params.id;
        self.shoot = ko.observable(new ShootDO.item(self.id));
    }

    return { viewModel: ShootPage, template: templateMarkup };
});
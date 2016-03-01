define(["knockout", "text!./shoot-page.html", '../data-objects/shoot-do.js'], function(ko, templateMarkup, ShootDO) {

    /* fake some data in here, before calling to the rest end point */

    function ShootPage(params) {
        var self = this;

        self.id = params.id;
        var shootDO = new ShootDO();
        self.shoot = ko.observable(shootDO);
        shootDO.load(self.id);
    }

    return { viewModel: ShootPage, template: templateMarkup };
});
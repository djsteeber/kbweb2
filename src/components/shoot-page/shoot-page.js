define(["knockout", "text!./shoot-page.html"], function(ko, templateMarkup) {

    /* fake some data in here, before calling to the rest end point */

    function ShootPage(params) {
        var self = this;

        self.id = params.id;

        self.shoot = ko.observableArray();

        //load the events list
        // so need to make all of this observable
        self.loadShoot = function() {
            $.ajax({
                dataType: "json",
                url: '/rest/shoots/' + self.id,
                data: {},
                success: function(data) {
                    self.shoot(data);
                }
            });
        };

        self.loadShoot();
        //alert('done');

    }

    return { viewModel: ShootPage, template: templateMarkup };
});
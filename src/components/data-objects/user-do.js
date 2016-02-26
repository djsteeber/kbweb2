define(['knockout', '../data-objects/data-object.js'], function(ko, DataObject) {

    function UserDO() {
        var self = this;

        self.restEndPoint = '/rest/meetings';
        self.login = ko.observable();
        self.name = {firstName: ko.observable(), lastName: ko.observable(), fullName: ko.observable()};
        self.email = ko.observable();
        self.roles = ko.observableArray();
        self.spouse = ko.observable();
        self.address = {address: ko.observable(), city:ko.observable(), state: ko.observable(), zip: ko.observable()}
        self.phone = ko.observable();
        self.workHours = ko.observable(); //hours
        self.exempt = ko.observable();
    }
    UserDO.inheritsFrom(DataObject);

    UserDO.prototype.init = function(userData) {
        DataObject.prototype.init.call(this, userData)
        var self = this;

        self.login = ko.observable(userData.login);
        if (userData.name) {
            self.name.firstName(userData.name.firstName);
            self.name.lastName(userData.name.lastName);
            self.name.fullName(userData.name.fullName);
        }
        self.email(userData.email);
        self.roles(userData.roles);
        self.spouse(userData.spouse);
        if (userData.address) {
            self.address.address(userData.address.address);
            self.address.city(userData.address.city);
            self.address.state(userData.address.state);
            self.address.zip(userData.address.zip);
        }
        self.phone(userData.phone);
        self.workHours(userData.hours);  // may need to convert to int
        self.exempt(userData.exempt); // may need to convert to boolean
    };

    UserDO.prototype.loadSelf = function() {
        var self = this;
        $.ajax({
            url: '/auth/login',
            type: "GET",
            success: function (returnData) {
                if (returnData.authenticated  && returnData.user) {
                    self.init(returnData.user);
                }
            }
        });
    };


    // might just make all data objects part of this file and return a hash
    return UserDO;
});
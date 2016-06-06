define(['knockout', '../data-objects/data-object.js'], function(ko, DataObject) {

    function UserDO() {
        var self = this;

        self.restEndPoint = '/rest/users';
        self.login = ko.observable();
        self.name = {firstName: ko.observable(), lastName: ko.observable(), fullName: ko.observable()};
        self.email = ko.observable();
        self.roles = ko.observableArray();
        self.spouse = {firstName: ko.observable(), lastName: ko.observable(), fullName: ko.observable()};
        self.address = {address: ko.observable(), city:ko.observable(), state: ko.observable(), zip: ko.observable()}
        self.phone = ko.observable();
        self.workHours = ko.observable(); //hours
        self.exempt = ko.observable();
        self.clubPosition = ko.observable();
        self.board = ko.observable();
        self.rangeCaptain = ko.observable();
        self.bartender  = ko.observable();
        self.officer = ko.observable();
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
        if (userData.spouse) {
            self.spouse.firstName(userData.spouse.firstName);
            self.spouse.lastName(userData.spouse.lastName);
            self.spouse.fullName(userData.spouse.fullName);
        }
        if (userData.address) {
            self.address.address(userData.address.address);
            self.address.city(userData.address.city);
            self.address.state(userData.address.state);
            self.address.zip(userData.address.zip);
        }
        self.phone(userData.phone);
        self.workHours(userData.hours);  // may need to convert to int
        self.exempt(userData.exempt); // may need to convert to boolean

        self.clubPosition = ko.observable(userData.clubPosition || userData.clubPostion);
        self.board = ko.observable(userData.board);
        self.rangeCaptain = ko.observable(userData.rangeCaptain);
        self.bartender  = ko.observable(userData.bartender);
        self.officer = ko.observable(userData.officer);


    };



    UserDO.prototype.createQuery = function(params) {
        var reqData  ={};
        if (params) {
            if (params.limit) {
                reqData.limit = (typeof params.limit == 'string') ? parseInt(params.limit) : params.limit;
            }
            if (params.skip) {
                reqData.skip = params.skip;
            }
            if (params.q) {
                reqData.q = params.q;
            }
        }

        return reqData;
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
define(['knockout', '../data-objects/data-object.js'], function(ko, DataObject) {

    // need to move these to a date object
    function LessonSignupDO() {
        DataObject.call(this);

        var self = this;
        self.restEndPoint = '/rest/lesson-signup';
        
        self.email = ko.observable();
        self.lastName = ko.observable();
        self.firstName = ko.observable();

        self.phone = ko.observable();

        self.archers = ko.observableArray(); //name, age
    }
    LessonSignupDO.inheritsFrom(DataObject);

    LessonSignupDO.prototype.init = function (reg) {
        var self = this;
        self.email(reg.email);
        self.lastName(reg.name.lastName);
        self.firstName(reg.name.firstName);
        self.phone(reg.phone);
        // add in the list of archers   map function maybe
        //self.archers(); //name, age
    };

    LessonSignupDO.prototype.createQuery = function (params) {
        var reqData = {};

        // might need to add in the id to query or the email address

        return reqData;
    };

    // might just make all data objects part of this file and return a hash
    return LessonSignupDO;
});
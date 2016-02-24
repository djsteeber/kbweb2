define(['knockout', '../data-object/data-object.js'], function(ko, DataObject) {

    function UserDO(evtOrID) {
        var self = this;

        self.restEndPoint = '/rest/meetings';
        self.user = ko.observable();
    }
    UserDO.inheritsFrom(DataObject);


    // might just make all data objects part of this file and return a hash
    return UserDO;
});
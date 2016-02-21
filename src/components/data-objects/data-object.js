define(['knockout'], function(ko) {
    Function.prototype.inheritsFrom = function( parentClassOrObject ){
        if ( parentClassOrObject.constructor == Function )
        {
            //Normal Inheritance
            this.prototype = new parentClassOrObject;
            this.prototype.constructor = this;
            this.prototype.parent = parentClassOrObject.prototype;
        }
        else
        {
            //Pure Virtual Inheritance
            this.prototype = parentClassOrObject;
            this.prototype.constructor = this;
            this.prototype.parent = parentClassOrObject;
        }
        return this;
    };

    function DataObject() {
        var self = this;
        this.id = ko.observable();
    }

    DataObject.prototype.init = function(obj) {
        if (obj.hasOwnProperty('_id')) {
            this.id(obj._id);
        } else if (obj.hasOwnProperty('id')) {
            this.id(obj.id);
        }
    }


    DataObject.prototype.load = function(id) {
        var self = this;
        if (id) {
            $.ajax({
                url: this.restEndPoint + '/' + id,
                type: "GET",
                //data: data,
                success: function (returnData) {
                    self.init(returnData);
                }
            });
        }
    };

    DataObject.prototype.toString = function() {
        return '[DataObject: ' + this.id + ']';
    };

    DataObject.prototype.createQuery = function(params) {
        var reqData  ={};
        if (params) {
            if (params.limit) {
                reqData.limit = (typeof params.limit == 'string') ? parseInt(params.limit) : params.limit;
            }
            if (params.skip) {
                reqData.skip = params.skip;
            }
        }

        return reqData;
    };

    //might also want to return and arr
    DataObject.prototype.loadList = function (oa, params) {
        var reqData = this.createQuery(params);

        var self = this;
        $.ajax({
            dataType: "json",
            url: this.restEndPoint,
            type: "GET",
            //async: false,
            data: reqData,                            //{q: JSON.stringify(reqData)},
            success: function (returnData) {
                returnData = $.map(returnData, function(item) {
                    var obj = new self.constructor();
                    obj.init(item);
                    return obj;
                });
                oa(returnData);
            },
            failure: function(err) {
                alert(err);
            }
        });
    };

    return DataObject;
});
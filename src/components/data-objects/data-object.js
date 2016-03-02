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
        self.id = ko.observable();
    }

    DataObject.prototype.init = function(obj) {
        var self = this;

        if (obj.hasOwnProperty('_id')) {
            self.id(obj._id);
        } else if (obj.hasOwnProperty('id')) {
            self.id(obj.id);
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

    DataObject.prototype.toJSON = function() {
        var self = this;
        return {id: self.id()};
    };

    DataObject.prototype.save = function(success, error) {
        var self = this;
        var data = self.toJSON();

        $.ajax({
            url : self.restEndPoint,
            type: "POST",
            data: data,
            success    : function(returnData){
                self.init(returnData);
                if (success) {
                    success(returnData);
                }
            },
            error: function(jx, returnData) {
                if (error) {
                    error(jx, returnData);
                }
            }
        });
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
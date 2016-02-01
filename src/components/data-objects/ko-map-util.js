define(['knockout'], function(ko) {


    // needs lots of work yet.

    function makeObservable(value) {
        var rtn;
        if (typeof value == 'array') {
            // loop through, for now fake it out and send back value
            rtn = value.map(function(val) {
                return makeObservable(val);
            });
            rtn = ko.observableArray(rtn);
        } else if (typeof value == 'object') {
            rtn = {};
            for (key in value) {
                rtn[key] = makeObservable(value[key]);
            }
        } else {
            rtn = value;
        }
        return rtn;
    }

    function observableMapper(kovar, value) {
        if (value == null) {
            return;
        }

        kovar(makeObservable(value));
    }

    return observableMapper;
    return observableMapper;
});
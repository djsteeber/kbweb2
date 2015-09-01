// require.js looks for the following global when initializing
var require = {
    baseUrl: ".",
    paths: {
        "bootstrap":            "bower_modules/components-bootstrap/js/bootstrap.min",
        "crossroads":           "bower_modules/crossroads/dist/crossroads.min",
        "hasher":               "bower_modules/hasher/dist/js/hasher.min",
        "jquery":               "bower_modules/jquery/dist/jquery",
        "knockout":             "bower_modules/knockout/dist/knockout.debug",
        "knockout-projections": "bower_modules/knockout-projections/dist/knockout-projections",
        "signals":              "bower_modules/js-signals/dist/signals.min",
        "text":                 "bower_modules/requirejs-text/text",
        "tinyMCE":              "bower_modules/tinymce/tinymce",
        "knockout-postbox":     "bower_modules/knockout-postbox/build/knockout-postbox",
        "mapping":              "bower_modules/knockout-mapping/knockout.mapping"
    },
    deps: ['knockout', 'mapping'],
    callback: function (ko, mapping) {
        ko.mapping = mapping;
    },
    shim: {
        "bootstrap": { deps: ["jquery"] },
        "tinyMCE": {
            exports: "tinyMCE",
            init: function () {
                this.tinyMCE.DOM.events.domLoaded = true;
                return this.tinyMCE;
            }
        },
    }

};

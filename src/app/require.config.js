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
        "tinymce":              "bower_modules/tinymce/tinymce.jquery",
        "knockout-postbox":     "bower_modules/knockout-postbox/build/knockout-postbox", // TODO need to remove ?
        "mapping":              "bower_modules/knockout-mapping/knockout.mapping",
        "moment":               "bower_modules/moment/moment",
        "fullcalendar":         "bower_modules/fullcalendar/dist/fullcalendar"
        
        //"summernote":           "bower_modules/summernote/dist/summernote",
        //"codemirror":           "bower_modules/codemirror/lib/codemirror"
        //TODO move data object definitions here, maybe?
    },
    deps: ['knockout', 'mapping'],
    callback: function (ko, mapping) {
        ko.mapping = mapping;
    },
    shim: {
        "bootstrap": { deps: ["jquery"] },
        "fullcalendar": {deps: ["jquery", "moment"]},
        //"summernote": {deps: ["jquery", "codemirror"]},
        "tinymce": {
            deps: ['jquery'],
            exports: "tinymce",
            init: function () {
                this.tinymce.DOM.events.domLoaded = true;
                return this.tinymce;
            }
        },
    }
};

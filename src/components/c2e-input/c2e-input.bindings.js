define(['knockout'], function(ko) {
    ko.bindingHandlers.componentData = {
        init: function(element, valueAccessor, allBindings, viewModel, bindingContext) {
            alert('in init of componentData handler')
        },
        update: function(element, valueAccessor, allBindings, viewModel, bindingContext) {
        }
    }
});
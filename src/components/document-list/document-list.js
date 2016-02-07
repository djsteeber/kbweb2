define(['knockout', 'text!./document-list.html'], function(ko, templateMarkup) {

  function DocumentList(params) {
    var self = this;

    self.documentType = ko.observable(params.documentType);

    self.title = ko.observable(params.title);

    self.documentList = ko.observableArray();


    //TODO, nee to send down the filter to the rest call
    $.ajax({
      dataType: "json",
      url: '/secure-docs/' + self.documentType(),
      type: 'GET',
      success: function(data) {
        self.documentList(data);
      }
    });
  }

  // This runs when the component is torn down. Put here any logic necessary to clean up,
  // for example cancelling setTimeouts or disposing Knockout subscriptions/computeds.
  DocumentList.prototype.dispose = function() { };

  return { viewModel: DocumentList, template: templateMarkup };

});

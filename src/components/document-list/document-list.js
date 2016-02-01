define(['knockout', 'text!./document-list.html'], function(ko, templateMarkup) {

  function DocumentList(params) {
    var self = this;

//    self.fileType = ko.observable(params.fileType);

    self.documentList = ko.observableArray();

/*
    self.filteredDocumentList = self.documentList.filter(function (d) {
      return ((! params) || (! params.fileType) || (d.fileType == params.fileType));
    });
*/
    // wonder if this should be mapped



    //TODO, nee to send down the filter to the rest call
    $.ajax({
      dataType: "json",
      url: '/rest/documents',
      data: {},
      success: function(data) {
        var filteredData = data.filter(function(d) {
          return ((!params) || (!params.fileType) || (params.fileType == d.fileType));
        });
        self.documentList(filteredData);
      }
    });
  }

  // This runs when the component is torn down. Put here any logic necessary to clean up,
  // for example cancelling setTimeouts or disposing Knockout subscriptions/computeds.
  DocumentList.prototype.dispose = function() { };

  return { viewModel: DocumentList, template: templateMarkup };

});

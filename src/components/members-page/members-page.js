define(['knockout', 'text!./members-page.html'], function(ko, templateMarkup) {

  /*
  var Document = function(item) {
    this.name = ko.observable(item.name);
    this.fileName = ko.observable(item.fileName);
    this.fileType = ko.observable(item.fileType);
    this.mimeType = ko.observable(item.mimeType);
    this.id = ko.observable(item._id);
  };
*/
  function MembersPage(params) {
  //  var self = this;
  }

  // This runs when the component is torn down. Put here any logic necessary to clean up,
  // for example cancelling setTimeouts or disposing Knockout subscriptions/computeds.
  MembersPage.prototype.dispose = function() { };
  
  return { viewModel: MembersPage, template: templateMarkup };

});

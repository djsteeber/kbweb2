define(['knockout', 'text!./event-list.html'], function(ko, templateMarkup) {

  function EventList(params) {
    var self = this;


//    self.fileType = ko.observable(params.fileType);

    self.eventList = ko.observableArray();

    /*
     self.filteredDocumentList = self.documentList.filter(function (d) {
     return ((! params) || (! params.fileType) || (d.fileType == params.fileType));
     });
     */
    // wonder if this should be mapped

/*
    data = {};
    if (params || params.eventType) {
      data = {filter: {eq: {event_type: params.eventType}}};
    }
*/
    //TODO, nee to send down the filter to the rest call
    $.ajax({
      dataType: "json",
      url: '/rest/v1/events',
      data: {},
      success: function(data) {
        // can tak this out if data filtering is working
        var filteredData = data.filter(function(d) {
          return ((!params) || (!params.eventType) || (d.event_type == params.eventType));
        });
        // need to add in a map call to make schedule displayable
        self.eventList(filteredData);
      }
    });
  }

  // This runs when the component is torn down. Put here any logic necessary to clean up,
  // for example cancelling setTimeouts or disposing Knockout subscriptions/computeds.
  EventList.prototype.dispose = function() { };
  
  return { viewModel: EventList, template: templateMarkup };

});

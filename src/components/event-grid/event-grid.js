define(['knockout', 'text!./event-grid.html'], function(ko, templateMarkup) {
  function Shoot(data) {
      this.name = ko.observable(data.name);
      this.description = ko.observable(data.description);
      this.schedule = data.schedule[0].date;
      this.event_type = data.event_type;
  }



  function EventGrid(params) {
      var self = this;
      self.events = ko.observableArray();

      var data = params;
      delete data['$raw'];

      // just fetch what we care about.
      // only does equality and not > < for dates that may be needed
      // can always filter out, or move expired events to a new collection
      // so you can see old ones.
      // or a different end point, that is just futureEvents as opposed to all events
      $.ajax({
         dataType: "json",
          url: '/rest/events',
          data: data,
          success: function(allData) {
              var mappedEvents = $.map(allData, function(item) {
                  return new Shoot(item);
              });
              self.events(mappedEvents);
          }
      });
  }

  return { viewModel: EventGrid, template: templateMarkup };

});

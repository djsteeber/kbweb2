define(['knockout', 'text!./events-page.html', '../data-objects/shoot-do.js', 'fullcalendar'], function(ko, templateMarkup, ShootDO, FullCalendar) {

  function EventsPage(/*params*/) {
    var self = this;

    self.shootsList = ko.observableArray();
    ShootDO.loadList(self.shootsList);


    self.fcShootsList = ko.computed(function() {
      var shootsList = self.shootsList();
      var items = shootsList.map(function(item) {
        return item.fullCalendar();
      });
      var list = [];
      for (var key in items) {
        list = list.concat(items[key]);
      }
      return list;

    });

//    self.calendarViewDate = ko.observable(Date.now());

    self.calendarViewModel = ko.observable({
      events: self.fcShootsList,
      header: {
        left: 'prev,next today',
        center: 'title',
        right: 'month,agendaWeek,agendaDay'
      },
      editable: false,
      viewDate: ko.observable(Date.now())
    });
  }

  // This runs when the component is torn down. Put here any logic necessary to clean up,
  // for example cancelling setTimeouts or disposing Knockout subscriptions/computeds.
  EventsPage.prototype.dispose = function() { };

  // need to add a binding for calendar, will translate from the events list into the calendar.


  return { viewModel: EventsPage, template: templateMarkup };

});

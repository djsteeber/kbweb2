define(['knockout', 'text!./events-page.html', '../data-objects/shoot-do.js', 'fullcalendar'], function(ko, templateMarkup, ShootDO, FullCalendar) {

  function EventsPage(/*params*/) {
    var self = this;

    self.tabView = ko.observable('calendar');

    self.switchView = function(view) {
      self.tabView(view);
    };

    self.shootsList = ko.observableArray();
    new ShootDO().loadList(self.shootsList, {sort: {scheduleStartDate: 1}});


    var flatten = function(ary) {
      var ret = [];
      for (var i = 0; i < ary.length; i++) {
        if (Array.isArray(ary[i])) {
          ret = ret.concat(flatten(ary[i]));
        } else {
          ret.push(ary[i]);
        }
      }
      return ret;
    };

    self.fcShootsList = ko.computed(function() {
      var shootsList = self.shootsList();
      var items = shootsList.map(function(item) {
        return item.fullCalendar();
      });
      var list = flatten(items);

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

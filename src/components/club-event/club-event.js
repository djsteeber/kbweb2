define(['knockout', 'text!./club-event.html', '../c2e-input/c2e-input.bindings.js'], function(ko, templateMarkup) {

  function ClubEventData() {
    var self = this;

    self.id = ko.observable();
    self.name = ko.observable();
    self.event_type = ko.observable();
    self.description = ko.observable();
    self.location = ko.observable();
    self.schedule = ko.observable();
    self.flyer = ko.observable();
  }

  var EMPTY_CLUB_DATA = {_id: undefined, name: undefined, event_type: undefined, location: undefined, schedule: undefined, flyer: undefined};

  function ClubEvent(params) {

    self.data = new ClubEventData();
    ko.mapping.toJS(EMPTY_CLUB_DATA, self.data);

    /*
    self.id = ko.observable(123);
    self.name = ko.observable();
    self.eventType = ko.observable();
    self.location = ko.observable();
    self.schedule = ko.observable();
    self.flyer = ko.observable();
*/

    self.saveClubEvent = function() {
      // might need to validate


    }
  }

  // This runs when the component is torn down. Put here any logic necessary to clean up,
  // for example cancelling setTimeouts or disposing Knockout subscriptions/computeds.
  ClubEvent.prototype.dispose = function() { };

  return { viewModel: ClubEvent, template: templateMarkup };

});

define(['knockout', 'text!./club-event.html', '../data-objects/club-event-do.js'], function(ko, templateMarkup, ClubEventDO) {

  var EMPTY_CLUB_DATA = {_id: undefined, name: undefined, event_type: undefined, location: undefined, schedule: undefined, flyer: undefined};

  function ClubEvent(params) {
    var self = this;

    var id = params['id'];
    var ce = new ClubEventDO.item(id);
    ce.load(id);
    self.data = ko.observable(ce);

  }

  // This runs when the component is torn down. Put here any logic necessary to clean up,
  // for example cancelling setTimeouts or disposing Knockout subscriptions/computeds.
  ClubEvent.prototype.dispose = function() { };

  return { viewModel: ClubEvent, template: templateMarkup };

});

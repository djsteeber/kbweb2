define(['knockout', 'text!./c2e-input.html'], function(ko, templateMarkup) {

  function C2einput(params) {
    var self = this;

    var defaultMessage = (params.defaultMessage ? params.defaultMessage : 'click to enter value');

    self.isEditing = ko.observable(false);
    self.value = ko.observable('');
    self.defaultText = "<div class='c2e-default'>" + defaultMessage + "</div>";

    self.inEditValue = ko.observable();

    self.editThis = function() {
      self.isEditing(true);
      self.inEditValue(self.value());
    }

    self.updateValue = function() {
      //alert('value set to ' + self.value());
      self.value(self.inEditValue());
      self.isEditing(false);
    }

    self.cancelUpdate = function() {
      self.isEditing(false);
    }

    self.valueOrDefault = function() {
      var rtn = self.value();
      if ((!rtn) || (rtn.length == 0)) {
        rtn = self.defaultText;
      }
      return rtn;
    }

  }

  // This runs when the component is torn down. Put here any logic necessary to clean up,
  // for example cancelling setTimeouts or disposing Knockout subscriptions/computeds.
  C2einput.prototype.dispose = function() {
  };
  
  return { viewModel: C2einput, template: templateMarkup };

});

define(['knockout', 'text!./message-center-page.html', 'tinymce','../data-objects/message-do.js'], function(ko, templateMarkup, tinymce, MessageDO) {

  function MessageCenterPage(params) {

    var SelectItem = function(label, value) {
      this.label = label;
      this.value = value;
    };

    var self = this;

    self.message = ko.observable(new MessageDO());
    self.to = ko.observable();

    /* removed these, because we are not ready to accept them, 'BOARD MEMBERS', 'BOARD OFFICERS', 'RANGE CAPTAINS' */

    /* might want to make this a rest call to get the list */
    self.toList = ko.observableArray([
      new SelectItem('All Members', 'MEMBER'),
      new SelectItem('Board Members', 'BOARD'),
      new SelectItem('Officers', 'OFFICER'),
      new SelectItem('Website Administrators', 'ADMIN')
      ]);
    self.status = ko.observable();
    self.step = ko.observable(1);

    self.firstStep = ko.computed(function() {
      return self.step()==1;
    });

    self.secondStep = ko.computed(function() {
      return self.step()==2;
    });

    self.thirdStep = ko.computed(function() {
      return self.step()==3;
    });

    self.verifyMessage = function() {
      if (self.message().isComplete()) {
        self.status('');
        self.step(self.step() + 1);
      } else {
        self.status("Please fill in the Subject and Message");
      }
    };

    self.sendMessage = function() {
      // set the selected item to the message
      self.message().to(self.to().value);
      self.message().save(
          function() {
            self.status("Message successfully sent");
            self.step(self.step()+1);
          },
          function(err) {
            self.status("The site is unable to process your message at this time.");
          });
    };

    self.newMessage = function() {
      self.message().init();
      self.status('');
      self.step(1);
    };
    self.editMessage = function() {
      self.status('');
      self.step(1);
    };
  }


  return { viewModel: MessageCenterPage, template: templateMarkup };

});



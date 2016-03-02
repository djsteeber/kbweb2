define(['knockout', 'text!./message-center-page.html', 'tinymce','../data-objects/message-do.js'], function(ko, templateMarkup, tinymce, MessageDO) {

  function MessageCenterPage(params) {
    var self = this;

    self.message = ko.observable(new MessageDO());
    /*
    self.to = ko.observable();
    self.subject = ko.observable();
    self.body = ko.observable();
    */
    self.toList = ko.observableArray(['ALL MEMBERS', 'BOARD MEMBERS', 'OFFICERS', 'RANGE OFFICERS']);
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
      self.step(self.step()+1);
    };

    self.sendMessage = function() {
      self.message().save(
          function() {
            self.status("Message successfully sent");
            self.step(self.step()+1);
          },
          function() {
            self.status("Error sending message");
          });
    };

    self.newMessage = function() {
      self.message().init();
      self.status('');
      self.step(1);
    };
  }


  return { viewModel: MessageCenterPage, template: templateMarkup };

});



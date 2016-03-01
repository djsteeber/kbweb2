define(['knockout','tinyMCE', 'text!./message-center-page.html'], function(ko, tinyMCE, templateMarkup) {

  function MessageCenterPage(params) {
    var self = this;
    self.to = ko.observable();
    self.subject = ko.observable();
    self.body = ko.observable();
    self.toList = ko.observableArray(['ALL MEMBERS', 'BOARD MEMBERS', 'OFFICERS', 'RANGE OFFICERS']);
    self.response = ko.observable();
    self.messageSent = ko.observable(false);


    this.onSubmit = function() {
      var data = {to : ko.unwrap(self.to), subject: ko.unwrap(self.subject), body: ko.unwrap(self.body)};

      $.ajax({
        url : "/rest/messages",
        type: "POST",
        data: data,
        //contentType: "application/json; charset=utf-8",
        success    : function(returnData){
          self.response("Message successfully sent");
          self.messageSent(true);
        },
        error: function(jx, returnData) {
          self.response("Error sending message");
        }
      });
    };
    this.newMessage = function() {
      self.to('');
      self.subject('');
      self.body('');
      self.response('');
      self.messageSent(false);
    };

  }


  return { viewModel: MessageCenterPage, template: templateMarkup };

});



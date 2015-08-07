define(['knockout','tinyMCE', 'text!./message-center-page.html'], function(ko, tinyMCE, templateMarkup) {

  function MessageCenterPage(params) {
    var self = this;
    self.to = ko.observable();
    self.subject = ko.observable();
    self.body = ko.observable('sometext');
    self.toList = ko.observableArray(['ALL MEMBERS', 'BOARD MEMBERS', 'RANGE OFFICERS']);
    self.response = ko.observable();
    self.messageSent = ko.observable(false);


    this.onSubmit = function() {
      var data = {to : ko.unwrap(self.to), subject: ko.unwrap(self.subject), body: ko.unwrap(self.body)};

      $.ajax({
        url : "/rest/v1/messages",
        type: "POST",
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        //dataType   : "json",
        processData: false,
        success    : function(returnData){
          self.response(JSON.stringify(returnData));
          self.messageSent(true);
        },
        fail: function(jx, returnData) {
          self.response(JSON.stringify(returnData));
        }
      });
    }

    tinyMCE.init({
      selector: ".editibleArea"

    });
  }



  return { viewModel: MessageCenterPage, template: templateMarkup };

});



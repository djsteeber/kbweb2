define(['jquery', 'knockout', './router', 'tinymce', 'bootstrap', 'knockout-projections', 'knockout-postbox', 'fullcalendar', 'summernote'], function($, ko, router, tinymce) {

  // Components can be packaged as AMD modules, such as the following:
  ko.components.register('nav-bar', { require: 'components/nav-bar/nav-bar' });
  ko.components.register('home-page', { require: 'components/home-page/home-page' });

  // ... or for template-only components, you can just point to a .html file directly:
  ko.components.register('about-page', { require: 'components/about-page/about-page'});

  ko.components.register('announcements', { require: 'components/announcements/announcements' });

  ko.components.register('benefit-page', { template: { require: 'text!components/benefit-page/benefit.html' }});

  ko.components.register('lessons-page', { require: 'components/lessons-page/lessons-page' });

  ko.components.register('membership-page', { require: 'components/membership-page/membership-page' });

  ko.components.register('events-page', { require: 'components/events-page/events-page' });

  ko.components.register('directions-page', {template: { require: 'text!components/directions-page/directions-page.html' }});

  ko.components.register('members-page', { require: 'components/members-page/members-page' });

  ko.components.register('message-center', { require: 'components/message-center/message-center' });

  ko.components.register('users-page', { require: 'components/users-page/users-page' });

  ko.components.register('message-center-page', { require: 'components/message-center-page/message-center-page' });

  ko.components.register('user-admin-page', { require: 'components/user-admin-page/user-admin-page' });

  ko.components.register('club-board', { require: 'components/club-board/club-board' });

  ko.components.register('events-admin-page', { require: 'components/events-admin-page/events-admin-page' });

  ko.components.register('c2e-input', { require: 'components/c2e-input/c2e-input' });

  ko.components.register('change-password', { require: 'components/change-password/change-password' });

  ko.components.register('club-event', { require: 'components/club-event/club-event' });

  ko.components.register('shoot-page', { require: 'components/shoot-page/shoot-page' });

  ko.components.register('document-list', { require: 'components/document-list/document-list' });

  ko.components.register('event-list', { require: 'components/event-list/event-list' });

  ko.components.register('schedule', { require: 'components/schedule/schedule' });

  ko.components.register('upcoming-events', { require: 'components/upcoming-events/upcoming-events' });

  ko.components.register('profile-page', { require: 'components/profile-page/profile-page' });

  ko.components.register('forgot-password-page', { require: 'components/forgot-password-page/forgot-password-page' });

  ko.components.register('viewer-page', { require: 'components/viewer-page/viewer-page' });

  // [Scaffolded component registrations will be inserted here. To retain this feature, don't remove this comment.]

  // add in a calendar binding
  ko.bindingHandlers.fullCalendar = {
    update: function(element, viewModelAccessor) {
      var viewModel = viewModelAccessor();
      viewModel = viewModel();

      element.innerHTML = "";
      // so, we need to make sure that the fullCalendar is loaded on and inner div, so it can be replaced
      $(element).append("<div></div>");

      var childElement = element.childNodes[0];


      $(childElement).fullCalendar({
        events: ko.utils.unwrapObservable(viewModel.events),
        header: viewModel.header,
        editable: viewModel.editable,
        aspectRatio: 2,
        height: 'auto',
        fixedWeekCount: false,
        minTime: "07:00:00",
        maxTime: "22:00:00"

      });
      $(element).fullCalendar('gotoDate', ko.utils.unwrapObservable(viewModel.viewDate));
    }
  };
  ko.bindingHandlers.summernotex = {
    init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
      var value = ko.unwrap(valueAccessor());
      var allBindings = ko.unwrap(allBindingsAccessor())
      var optionsBinding = allBindings.wysiwygOptions || {};
      var $element = $(element);
      var options = {};//$.extend({}, optionsBinding);

      var updateObservable = function (e) {
        valueAccessor($element.summernote('code'));
        return true;
      };

      options.callbacks = {};
      options.callbacks.onKeyup = options.callbacks.onFocus = options.callbacks.onBlur = options.callbacks.onChange = updateObservable;

      $element.summernote(options);
    },
    update: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
      console.log('updatecalled')
      var value = ko.unwrap(valueAccessor());
      $(element).summernote('code', value);
    }
  };

  ko.bindingHandlers.summernote = new function () {

    this.init = function (element, valueAccessor, allBindings) {
      var value = valueAccessor();
      var options = {
        height: 200,
        toolbar: [
          ["style", ["bold", "italic", "underline", "clear"]],
          ["fontstyle", ["style"]],
          ["fontsize", ["fontsize"]],
          ["lists", ["ul", "ol", "paragraph"]],
          ["links", ["link", "picture"]],
          ["misc", ["fullscreen", "codeview"]]
        ],
        callbacks: {
          onBlur: function() {
            value($(element).summernote('code'));
            return true;
          }
        }
      };
      $.extend(options, allBindings.get("summerOptions"));
      return $(element).summernote(options);
    };
    this.update = function (element, valueAccessor) {
        var value = ko.utils.unwrapObservable(valueAccessor());
        $(element).summernote('code', value);
    };
  };

  ko.bindingHandlers.wysiwyg = {
    init: function (element, valueAccessor, allBindingsAccessor, viewModel) {
      var value = valueAccessor();
      var valueUnwrapped = ko.unwrap(value);
      var allBindings = allBindingsAccessor();
      var $element = $(element);
      $element.attr('id', 'wysiwyg_' + Date.now());
      if (ko.isObservable(value)) {
        var isSubscriberChange = false;
        var isEditorChange = true;
        $element.html(value());
        isEditorChange = false;

        tinymce.init({
          selector: '#' + $element.attr('id'),
          //inline: true,
          plugins: [
            "advlist autolink lists link image charmap print preview anchor",
            "searchreplace visualblocks code fullscreen",
            "insertdatetime media table contextmenu paste"
          ],
          toolbar: "insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image",
          setup: function (editor) {
            editor.on('change', function () {
              if (!isSubscriberChange) {
                isEditorChange = true;
                value($element.html());
                isEditorChange = false;
              }
            });
          }
        });
        value.subscribe(function (newValue) {
          if (!isEditorChange) {
            isSubscriberChange = true;
            $element.html(newValue);
            isSubscriberChange = false;
          }
        });
      }
    }
  };



  // Start the application
  ko.applyBindings({ route: router.currentRoute });
});




define(['jquery', 'knockout', './router', 'bootstrap', 'knockout-projections', 'knockout-postbox'], function($, ko, router) {

  // Components can be packaged as AMD modules, such as the following:
  ko.components.register('nav-bar', { require: 'components/nav-bar/nav-bar' });
  ko.components.register('home-page', { require: 'components/home-page/home' });

  // ... or for template-only components, you can just point to a .html file directly:
  ko.components.register('about-page', {
    template: { require: 'text!components/about-page/about.html' }
  });

  ko.components.register('event-grid', { require: 'components/event-grid/event-grid' });

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

  ko.components.register('login', { require: 'components/login/login' });

  ko.components.register('auth', { require: 'components/auth/auth' });

  ko.components.register('events-admin-page', { require: 'components/events-admin-page/events-admin-page' });

  ko.components.register('c2e-input', { require: 'components/c2e-input/c2e-input' });

  ko.components.register('club-event', { require: 'components/club-event/club-event' });

  ko.components.register('document-list', { require: 'components/document-list/document-list' });

  ko.components.register('event-list', { require: 'components/event-list/event-list' });

  ko.components.register('schedule', { require: 'components/schedule/schedule' });

  // [Scaffolded component registrations will be inserted here. To retain this feature, don't remove this comment.]
/*
  ko.bindingHandlers.dateString = {
    update: function(element, valueAccessor, allBindingsAccessor, viewModel) {
      var value = valueAccessor(),
          allBindings = allBindingsAccessor();
      var valueUnwrapped = ko.utils.unwrapObservable(value);
      var pattern = allBindings.datePattern || 'MM/dd/yyyy';
      $(element).text(valueUnwrapped.toString(pattern));
    }
  };
  */
  // Start the application
  ko.applyBindings({ route: router.currentRoute });
});

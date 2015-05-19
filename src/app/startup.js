define(['jquery', 'knockout', './router', 'bootstrap', 'knockout-projections'], function($, ko, router) {

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

  // [Scaffolded component registrations will be inserted here. To retain this feature, don't remove this comment.]

  // Start the application
  ko.applyBindings({ route: router.currentRoute });
});

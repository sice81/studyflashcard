/*jshint unused: vars */
require.config({
  baseUrl: 'scripts',
  paths: {
    'angular': '../lib/angular',
    'angular-animate': '../lib/angular-animate',
    'angular-cookies': '../lib/angular-cookies',
    'angular-resource': '../lib/angular-resource',
    'angular-route': '../lib/angular-route',
    'angular-sanitize': '../lib/angular-sanitize',
    'angular-touch': '../lib/angular-touch',
    'angular-ui-router': '../lib/angular-ui-router',
    'angular-chart': '../lib/angular-chart',
    'chart': '../lib/Chart',
    'ionic': '../lib/ionic',
    'ionic-angular': '../lib/ionic-angular',
    'swiper': '../lib/swiper',
    'app': 'app',
    'route': 'route',
    'signin-ctrl': './controllers/signin',
    'dashboard-ctrl': './controllers/dashboard',
    'store-ctrl': './controllers/store',
    'settings-ctrl': './controllers/settings',
    'memorizeplayer-ctrl': './controllers/memorizeplayer',
    'services': './services',
    'myfavorite-service': './services/myfavorite',
    'oauth-facebook': 'oauth-facebook',
    'cardpacks-service': './services/cardpacks'
  },
  shim: {
    'angular': {'exports': 'angular'},
    'app': ['angular'],
    'angular-route': ['angular'],
    'angular-cookies': ['angular'],
    'angular-sanitize': ['angular'],
    'angular-resource': ['angular'],
    'angular-animate': ['angular'],
    'angular-touch': ['angular'],
    'angular-ui-router': ['angular'],
    'ionic': {'exports': 'ionic'},
    'ionic-angular': ['angular', 'ionic'],
    'angular-chart': ['angular', 'chart'],
    'chart.js': {'exports': 'chart'},
    'angular-mocks': {
      deps: ['angular'],
      'exports': 'angular.mock'
    }
  },
  priority: [
    'angular'
  ]
});

//http://code.angularjs.org/1.2.1/docs/guide/bootstrap#overview_deferred-bootstrap
window.name = 'NG_DEFER_BOOTSTRAP!';

require([
  'angular',
  'app',
  'route',
  //'angular-route',
  //'angular-cookies',
  'angular-sanitize',
  //'angular-resource',
  'angular-animate',
  //'angular-touch',
  'angular-ui-router',
  'angular-chart',
  'ionic',
  'ionic-angular'
], function (angular, app) {
  'use strict';
  /* jshint ignore:start */
  var $html = angular.element(document.getElementsByTagName('html')[0]);
  /* jshint ignore:end */
  angular.element().ready(function () {
    angular.resumeBootstrap([app.name]);
  });
});

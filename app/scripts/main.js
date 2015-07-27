/*jshint unused: vars */
require.config({
  baseUrl: CDN_URL + 'scripts',
  urlArgs: 'v=' + CDN_VERSION,
  waitSeconds: 60,
  paths: {
    'angular': '../lib/angular',
    'angular-animate': '../lib/angular-animate',
    'angular-cookies': '../lib/angular-cookies',
    'angular-resource': '../lib/angular-resource',
    'angular-route': '../lib/angular-route',
    'angular-sanitize': '../lib/angular-sanitize',
    'angular-touch': '../lib/angular-touch',
    'angular-ui-router': '../lib/angular-ui-router.min',
    'angular-chart': '../lib/angular-chart',
    'chart': '../lib/Chart',
    'ionic': '../lib/ionic.min',
    'ionic-angular': '../lib/ionic-angular.min',
    'swiper': '../lib/swiper',
    'app': 'app',
    'route': 'route',
    'signin-ctrl': './controllers/signin',
    'dashboard-ctrl': './controllers/dashboard',
    'tinymce': '../lib/tinymce-dist/tinymce',
    'angular-tinymce': '../lib/angular-tinymce',
    'store-ctrl': './controllers/store',
    'settings-ctrl': './controllers/settings',
    'memorizeplayer-ctrl': './controllers/memorizeplayer',
    'cardpack-create-ctrl': './controllers/cardpack-create',
    'services': './services',
    'myfavorite-service': './services/myfavorite',
    'oauth-facebook': 'oauth-facebook',
    'cardpacks-service': './services/cardpacks',
    'studystatus-service': './services/studystatus'
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
    'angular-tinymce': ['angular', 'tinymce'],
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
  'angular-cookies',
  'angular-sanitize',
  //'angular-resource',
  'angular-animate',
  //'angular-touch',
  'angular-ui-router',
  //'angular-chart',
  'ionic',
  'ionic-angular',
  'angular-tinymce',
  'services',
  'signin-ctrl',
  'dashboard-ctrl',
  'store-ctrl',
  'settings-ctrl',
  'memorizeplayer-ctrl',
  'cardpack-create-ctrl',
  'angular-chart',
  'myfavorite-service',
  'swiper',
  'cardpacks-service',
  'studystatus-service',
  'oauth-facebook'
], function (angular, app) {
  'use strict';
  /* jshint ignore:start */
  var $html = angular.element(document.getElementsByTagName('html')[0]);
  /* jshint ignore:end */
  angular.element().ready(function () {
    angular.resumeBootstrap([app.name]);
  });
});

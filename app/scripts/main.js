/*jshint unused: vars */
require.config({
  baseUrl : 'scripts',
  paths: {
	  'angular': '../lib/angular',
	  'angular-animate': '../lib/angular-animate',
	  'angular-cookies': '../lib/angular-cookies',
	  'angular-resource': '../lib/angular-resource',
	  'angular-route': '../lib/angular-route',
	  'angular-sanitize': '../lib/angular-sanitize',
	  'angular-touch': '../lib/angular-touch',
	  'angular-ui-router': '../lib/angular-ui-router',
	  'ionic': '../lib/ionic',
	  'ionic-angular': '../lib/ionic-angular',
	  'app': 'app'
  },
  shim: {
    'angular' : {'exports' : 'angular'},
	'angular-route': ['angular'],
    'angular-cookies': ['angular'],
    'angular-sanitize': ['angular'],
    'angular-resource': ['angular'],
    'angular-animate': ['angular'],
    'angular-touch': ['angular'],
	'angular-ui-router': ['angular'],
	'ionic': {'exports' : 'ionic'},
	'ionic-angular': ['angular', 'ionic'],
    'angular-mocks': {
      deps:['angular'],
      'exports':'angular.mock'
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
  'angular-route',
  'angular-cookies',
  'angular-sanitize',
  'angular-resource',
  'angular-animate',
  'angular-touch',
  'angular-ui-router',
  'ionic',
  'ionic-angular'
], function(angular, app, ngRoutes, ngCookies, ngSanitize, ngResource, ngAnimate, ngTouch, ngUiRouter, ionic, ionicAngular) {
  'use strict';
  /* jshint ignore:start */
  var $html = angular.element(document.getElementsByTagName('html')[0]);
  /* jshint ignore:end */
  angular.element().ready(function() {
    angular.resumeBootstrap([app.name]);
  });
});

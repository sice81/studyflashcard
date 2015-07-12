define(['angular', 'app', 'services', 'signin-ctrl', 'dashboard-ctrl', 'store-ctrl', 'settings-ctrl', 'memorizeplayer-ctrl'], function (angular, app) {
  'use strict';

  app.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('signin', {
        url: '/signin',
        templateUrl: 'templates/signin.html',
        controller: 'SigninCtrl'
      })

      .state('tab', {
        url: '/tab',
        abstract: true,
        templateUrl: 'templates/tabs.html'
      })

      .state('tab.dashboard', {
        url: '/dashboard',
        views: {
          'tab-dashboard': {
            templateUrl: 'templates/dashboard.html',
            controller: 'DashboardMainCtrl'
          }
        }
      })

      .state('tab.store', {
        url: '/store',
        views: {
          'tab-store': {
            templateUrl: 'templates/store.html',
            controller: 'StoreCtrl'
          }
        }
      })

      .state('tab.settings', {
        url: '/settings',
        views: {
          'tab-settings': {
            templateUrl: 'templates/settings.html',
            controller: 'SettingsCtrl'
          }
        }
      })

      .state('memorizeplayer', {
        url: '/memorizeplayer/:cardId',
        templateUrl: 'templates/memorizeplayer.html',
        controller: 'MemorizePlayerCtrl'
      })
    ;

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/signin');
  });
});

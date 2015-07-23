define(['angular', 'app', 'services', 'signin-ctrl', 'dashboard-ctrl', 'store-ctrl', 'settings-ctrl', 'memorizeplayer-ctrl', 'cardpack-create-ctrl'], function (angular, app) {
  'use strict';

  app.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('signin', {
        url: '/signin',
        templateUrl: CDN_URL + 'templates/signin.html' + '?v=' + CDN_VERSION,
        controller: 'SigninCtrl'
      })

      .state('cardpack-create', {
        url: '/cardpacks/new',
        cache: false,
        templateUrl: CDN_URL + 'templates/cardpack-create.html' + '?v=' + CDN_VERSION,
        controller: 'CardpackCreateCtrl'
      })

      .state('tab', {
        url: '/tab',
        abstract: true,
        templateUrl: CDN_URL + 'templates/tabs.html' + '?v=' + CDN_VERSION
      })

      .state('tab.dashboard', {
        url: '/dashboard',
        views: {
          'tab-dashboard': {
            templateUrl: CDN_URL + 'templates/dashboard.html' + '?v=' + CDN_VERSION,
            controller: 'DashboardMainCtrl'
          }
        }
      })

      .state('tab.store', {
        url: '/store',
        views: {
          'tab-store': {
            templateUrl: CDN_URL + 'templates/store.html' + '?v=' + CDN_VERSION,
            controller: 'StoreCtrl'
          }
        }
      })

      .state('tab.settings', {
        url: '/settings',
        views: {
          'tab-settings': {
            templateUrl: CDN_URL + 'templates/settings.html' + '?v=' + CDN_VERSION,
            controller: 'SettingsCtrl'
          }
        }
      })

      .state('memorizeplayer', {
        cache: false,
        url: '/memorizeplayer/:cardPackId',
        templateUrl: CDN_URL + 'templates/memorizeplayer.html' + '?v=' + CDN_VERSION,
        controller: 'MemorizePlayerCtrl'
      })
    ;

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/tab/dashboard');
  });
});

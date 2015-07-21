define(['angular', 'angular-tinymce'], function (angular) {
  'use strict';

  var module = angular.module('studyflashcardApp', ['ionic', 'ui.tinymce', 'chart.js', 'studyflashcardApp.controllers', 'studyflashcardApp.services'])
    .run(function ($ionicPlatform, $rootScope) {
      $rootScope.config = {};
      $rootScope.config.CDN_URL = CDN_URL;
      $rootScope.config.CDN_VERSION = CDN_VERSION;
      $rootScope.config.API_URL = API_URL;

      $ionicPlatform.ready(function () {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
          cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
          // org.apache.cordova.statusbar required
          StatusBar.styleLightContent();
        }
      });
    });

  angular.module('studyflashcardApp.controllers', []);

  module.controller('HeadCtrl', function ($scope) {
    console.log('HeadCtrl');
    $scope.csses = ['styles/main.css', 'styles/ionic.css', 'styles/style.css', 'styles/swiper.css', 'styles/angular-chart.css', 'styles/textAngular.css'];
    //$scope.csses = ['styles/ionic.css'];
  });

  module.factory('SessionService', function () {
    return {
      isAnonymus: false,
      saveToken: function(token) {
        localStorage.setItem('token', token);
      },
      loadToken: function() {
        return localStorage.getItem('token');
      }
    };
  });

  module.factory('sessionInjector', ['SessionService', function (SessionService) {
    var sessionInjector = {
      request: function (config) {
        //console.log('request', config, SessionService);

        if (!SessionService.isAnonymus) {
          config.headers['x-session-token'] = SessionService.loadToken();
        }
        return config;
      }
    };
    return sessionInjector;
  }]);

  module.config(['$httpProvider', function ($httpProvider) {
    console.log('config.$httpProvider');
    $httpProvider.interceptors.push('sessionInjector');
  }]);

  return module;
});

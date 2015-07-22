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
      saveUserId: function(userId) {
        localStorage.setItem('userId', userId);
      },
      loadUserId: function() {
        return localStorage.getItem('userId');
      },
      saveToken: function(token, userId) {
        localStorage.setItem('token', token);
      },
      loadToken: function() {
        return localStorage.getItem('token');
      }
    };
  });

  module.factory('sessionInjector', function (SessionService, $q) {
    var sessionInjector = {
      request: function (config) {
        //console.log('request', config, SessionService);

        if (!SessionService.isAnonymus) {
          config.headers['x-session-token'] = SessionService.loadToken();
        }
        return config;
      },
      response: function(response) {
        //console.log(response);
        return response;
      },
      // optional method
      'responseError': function(rejection) {
        console.log('responseError', rejection);

        if (rejection.status == 401) {
          //$state.go('signin');
          location.href = '#/signin';
        }

        return $q.reject(rejection);
      }
    };
    return sessionInjector;
  });

  module.config(['$httpProvider', function ($httpProvider) {
    console.log('config.$httpProvider');
    $httpProvider.interceptors.push('sessionInjector');
  }]);

  return module;
});

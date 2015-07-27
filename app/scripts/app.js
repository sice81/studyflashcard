define(['angular'], function (angular) {
  'use strict';

  var module = angular.module('studyflashcardApp', ['ionic', 'ui.tinymce', 'chart.js', 'studyflashcardApp.controllers', 'studyflashcardApp.services']);

  angular.module('studyflashcardApp.controllers', []);

  module.controller('HeadCtrl', function ($scope) {
    console.log('HeadCtrl');
    $scope.csses = ['styles/main.css', 'styles/ionic.css', 'styles/style.css', 'styles/swiper.css', 'styles/angular-chart.css'];
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

  module.factory('sessionInjector', function (SessionService, $q, $rootScope) {
    var sessionInjector = {
      request: function (config) {
        if (!SessionService.isAnonymus) {
          config.headers['x-session-token'] = SessionService.loadToken();
        }
        return config;
      },
      response: function(response) {
        return response;
      },
      responseError: function(rejection) {
        console.log('responseError', rejection);

        switch (rejection.status) {
          case 0:
            $rootScope.$broadcast('showMessage', '서버가 응답하지 않습니다.');
            break;

          case 401:
            $rootScope.$broadcast('login:show');
                break;

          default:
            $rootScope.$broadcast('showMessage', 'Error status = ' + rejection.status);
                break;
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

  module.run(function ($ionicPlatform, $rootScope, $ionicModal, Toast) {
    $rootScope.config = {};
    $rootScope.config.CDN_URL = CDN_URL;
    $rootScope.config.CDN_VERSION = CDN_VERSION;
    $rootScope.config.API_URL = API_URL;

    $rootScope.$on('login:show', function() {
      if (!$rootScope.loginModal) {
        $ionicModal.fromTemplateUrl(CDN_URL + 'templates/signin.html?v=' + CDN_VERSION, {
          scope: $rootScope,
          hardwareBackButtonClose: true,
          animation: 'slide-in-up'
        }).then(function (modal) {
          $rootScope.loginModal = modal;
          $rootScope.loginModal.show();
        });
      } else {
        $rootScope.loginModal.show();
      }
    });

    $rootScope.$on('login:hide', function() {
      $rootScope.loginModal.hide();
    });

    $rootScope.$on('showMessage', function(event, msg){
      Toast.show(msg, 3000);
    });

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

  module.factory('Toast', function ($ionicLoading, $timeout) {
    return {
      show: function(msg, timeout) {
        $ionicLoading.show({
          template: msg
        });

        $timeout(function(){
          $ionicLoading.hide();
        }, timeout || 3000);
      }
    };
  });

  return module;
});

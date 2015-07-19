define(['angular'], function (angular) {
  'use strict';

  var module = angular.module('studyflashcardApp', ['ionic', 'chart.js', 'studyflashcardApp.controllers', 'studyflashcardApp.services'])
    .run(function ($ionicPlatform, $rootScope) {
      $rootScope.config = {};
      $rootScope.config.CDN_URL = CDN_URL;
      $rootScope.config.CDN_VERSION = CDN_VERSION;

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
    $scope.csses = ['styles/main.css', 'styles/ionic.css', 'styles/style.css', 'styles/swiper.css', 'styles/angular-chart.css'];
  });

  return module;
});

define(['angular', 'app', 'swiper'], function (angular, app) {
  'use strict';

  app.controller('MemorizePlayerCtrl', function ($scope, $state, $ionicBackdrop) {
    console.log('MemorizePlayerCtrl');

    var swiper = new Swiper('.swiper-container');

    $scope.data = {};
    $scope.data.max = 200;
    $scope.data.current = 50;
    $scope.data.right = 0;
    $scope.data.wrong = 0;

    $scope.right = function() {
      $scope.data.right++;
    };

    $scope.wrong = function() {
      $scope.data.wrong++;
    };
  });
});

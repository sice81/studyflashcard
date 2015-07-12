define(['angular', 'app', 'swiper'], function (angular, app) {
  'use strict';

  app.controller('MemorizePlayerCtrl', function ($scope, $state, $ionicBackdrop) {
    console.log('MemorizePlayerCtrl');

    var swiper = new Swiper('.swiper-container');

    $scope.max = 200;
    $scope.current = 50;
  });
});

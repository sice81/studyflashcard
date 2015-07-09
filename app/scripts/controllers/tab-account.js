define(['angular', 'app'], function (angular, app) {
  'use strict';

  app.controller('AccountCtrl', function ($scope, $state) {
    console.log('AccountCtrl');
    $scope.settings = {
      enableFriends: true
    };
  });
});

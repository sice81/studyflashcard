define(['angular', 'app'], function (angular, app) {
  'use strict';

  app.controller('SettingsCtrl', function ($scope, $state) {
    console.log('SettingsCtrl');
    $scope.settings = {
      enableFriends: true
    };
  });
});

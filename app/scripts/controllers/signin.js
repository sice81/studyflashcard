define(['angular', 'app'], function (angular, app) {
  'use strict';

  app.controller('SigninCtrl', function ($scope, $state) {
    console.log('SigninCtrl');

    $scope.signIn = function (user) {
      $state.go('tab.dash');
    };
  });
});

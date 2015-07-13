define(['angular', 'app'], function (angular, app) {
  'use strict';

  app.controller('SigninCtrl', function ($scope, $state, $http) {
    console.log('SigninCtrl');

    $scope.signIn = function (user) {
      //$state.go('tab.dashboard');

      $http({
        url: 'http://127.0.0.1:8080/api/auth/signin',
        method: "POST",
        data: {userId: user.userId, password: user.password},
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        }
      });

      //$http.post('http://127.0.0.1:8080/api/auth/siginin', {userId: user.userId, password: user.password}).
      //  success(function (data, status, headers, config) {
      //  }).
      //  error(function (data, status, headers, config) {
      //  });
    };
  });
});

define(['angular', 'app'], function (angular, app) {
  'use strict';

  app.controller('SettingsCtrl', function ($scope, $state) {
    console.log('SettingsCtrl');
    $scope.settings = {
      enableFriends: true
    };
  });

  app.controller('UserProfileCtrl', function (SessionService, Profile, $scope, $state, $http, Toast) {
    console.log('UserProfileCtrl');

    Profile.get(SessionService.loadUserId())
      .success(function(response){
        $scope.userName = response.userName;
        $scope.userEmail = response.userEmail;
      });

    $scope.save = function () {
      var userId = SessionService.loadUserId();
      var userName = $scope.userName;
      var userEmail = $scope.userEmail;

      var user = {
        userId: userId,
        userName: userName,
        userEmail: userEmail
      };

      /*
       $http({
       url: API_URL + 'api/app/v1/users/' + userId + '/profile',
       method: "PUT",
       data: userParam,
       headers: {
       'Content-Type': 'application/json; charset=utf-8'
       }
       }).success(function () {
       $scope.clearState();
       $state.transitionTo('tab.setting', {}, {reload: true});
       Toast.show('성공적으로 저장했습니다.');
       });
       */
      Profile.put(user)
        .success(function(response){
          $state.transitionTo('tab.settings', {}, {reload: true});
          Toast.show('성공적으로 저장했습니다.');
        });

    };

    $scope.back = function () {
      $state.go('tab.settings');
    };

  });

});

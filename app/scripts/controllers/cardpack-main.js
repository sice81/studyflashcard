define(['angular', 'app'], function (angular, app) {
  'use strict';

  app.controller('CardpackMainCtrl', function ($scope, $state, $stateParams, Cardpacks, $ionicLoading, SessionService, Toast) {
    console.log('CardpackMainCtrl', $stateParams);

    $scope.data = {};
    $scope.data.isMine = false;
    $scope.data.cardpackName = '';
    $scope.data.ownerUserId = '';
    $scope.data.cardCnt = 0;
    $scope.data.inStudyUserCnt = 0;
    $scope.data.completeStudyUserCnt = 0;
    $scope.data.accessCd = 'PUBLIC';

    $scope.goMemorizePlayer = function () {
      $state.go('memorizeplayer', {cardpackId: $stateParams.cardpackId});
    };

    $scope.goModify = function () {
      $state.go('cardpack-edit', {cardpackId: $stateParams.cardpackId});
    };

    $scope.goHome = function () {
      $state.transitionTo('tab.dashboard', {}, {reload: true});
    };

    $scope.sendStudyEnd = function () {
      Toast.show('준비 중 입니다.^^');
    };

    $scope.underConstruction = function () {
      Toast.show('준비 중 입니다.^^', 500);
    };

    $ionicLoading.show();
    Cardpacks.get($stateParams.cardpackId)
      .success(function (response) {
        console.log(response);

        $scope.data = response;
        $scope.data.isMine = response.ownerUserId == SessionService.loadUserId();
      })
      .finally(function () {
        $ionicLoading.hide();
      });
  });
});

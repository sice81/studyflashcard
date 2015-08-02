define(['angular', 'app'], function (angular, app) {
  'use strict';

  app.controller('CardpackMainCtrl', function ($scope, $state, $stateParams, $ionicNavBarDelegate, Cardpacks, $ionicLoading, SessionService, Toast, $ionicActionSheet) {
    console.log('CardpackMainCtrl', $stateParams, $ionicNavBarDelegate);

    $scope.data = {};
    $scope.data.isMine = false;
    $scope.data.cardpackName = '';
    $scope.data.ownerUserId = '';
    $scope.data.cardCnt = 0;
    $scope.data.inStudyUserCnt = 0;
    $scope.data.completeStudyUserCnt = 0;
    $scope.data.cardpackAccessCd = 'PUBLIC';
    $scope.data.ownerUserPicture = '';

    $scope.goMemorizePlayer = function () {
      //$state.go('memorizeplayer', {cardpackId: $stateParams.cardpackId});

      // Show the action sheet
      $ionicActionSheet.show({
        buttons: [
          { text: '<span>틀린카드만 학습</span>' },
          { text: '<span>미학습카드만 학습</span>' },
          { text: '<span>모두 학습</span>' }
        ],
        //destructiveText: 'Delete',
        titleText: '',
        cancelText: '취소',
        cancel: function() {
          // add cancel code..
        },
        buttonClicked: function(index) {
          console.log(index);

          if (index == 0) {
            $state.go('memorizeplayer', {cardpackId: $stateParams.cardpackId, studyMode: 'wrongOnly'});
          } else if (index == 1) {
            $state.go('memorizeplayer', {cardpackId: $stateParams.cardpackId, studyMode: 'notyetOnly'});
          } else {
            $state.go('memorizeplayer', {cardpackId: $stateParams.cardpackId, studyMode: 'all'});
          }

          return true;
        }
      });
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

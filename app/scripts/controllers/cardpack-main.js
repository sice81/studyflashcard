define(['angular', 'app'], function (angular, app) {
  'use strict';

  app.controller('CardpackMainCtrl', function ($scope, $state, $stateParams, Cardpacks) {
    console.log('CardpackMainCtrl', $stateParams);

    $scope.data = {};
    $scope.data.cardpackName = '카드팩명';
    $scope.data.ownerUserId = 'fb-1818';
    $scope.data.cardCnt = 100;
    $scope.data.inStudyUserCnt = 10;
    $scope.data.completeStudyUserCnt = 5;
    $scope.data.accessCd = 'PUBLIC';

    $scope.goMemorizePlayer = function() {
      $state.go('memorizeplayer', {cardpackId: $stateParams.cardpackId});
    };

    Cardpacks.get($stateParams.cardpackId)
      .success(function(response){
        console.log(response);
        $scope.data = response;
      });
  });
});

define(['angular', 'app'], function (angular, app) {
  'use strict';

  app.controller('StoreCtrl', function ($scope, $http, $ionicLoading) {
    console.log('StoreCtrl');

    $scope.items = [];

    function req() {
      $ionicLoading.show();

      return $http({
        url: API_URL + 'api/app/v1/store',
        method: "GET",
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        }
      })
        .success(function(response) {
          $scope.items = response;
        })
        .finally(function() {
          $ionicLoading.hide();
        });
    }

    req();

    $scope.doRefresh = function() {
      req()
        .finally(function(){
          $scope.$broadcast('scroll.refreshComplete');
          $scope.$apply();
        });
    };
  });
});

define(['angular', 'app'], function (angular, app) {
  'use strict';

  app.controller('StoreCtrl', function ($scope, Chats) {
    console.log('StoreCtrl');

    $scope.chats = Chats.all();

    $scope.doRefresh = function() {
      $scope.$broadcast('scroll.refreshComplete');
      $scope.$apply();
    };

    $scope.remove = function (chat) {
      Chats.remove(chat);
    }
  });
});

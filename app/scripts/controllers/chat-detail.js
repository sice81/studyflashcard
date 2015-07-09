define(['angular', 'app'], function (angular, app) {
  'use strict';

  app.controller('ChatDetailCtrl', function ($scope, $stateParams, Chats) {
    console.log('ChatDetailCtrl');

    $scope.chat = Chats.get($stateParams.chatId);
  });
});

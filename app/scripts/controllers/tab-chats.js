define(['angular', 'app'], function (angular, app) {
  'use strict';

  app.controller('ChatsCtrl', function ($scope, Chats) {
    console.log('ChatsCtrl');

    $scope.chats = Chats.all();
    $scope.remove = function (chat) {
      Chats.remove(chat);
    }
  });
});

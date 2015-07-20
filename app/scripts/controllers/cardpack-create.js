define(['angular', 'app'], function (angular, app) {
  'use strict';





  app.controller('CardpackCreateCtrl', function ($scope, $ionicPopover, $ionicModal) {
    console.log('CardpackCreateCtrl');
    //$scope.shouldShowDelete = true;
    //$scope.shouldShowReorder = true;
    $scope.listCanSwipe = true

    $scope.items = [];
    for (var i=0; i<10; i++) {
      $scope.items.push({
        title: 'title' + i,
        description: 'desc' + i
      });
    }

    $scope.cards = ['card1'];
    $scope.front = 'front';
    $scope.back = 'back';
    $scope.currentIndex = -1;

    // .fromTemplateUrl() method
    $ionicModal.fromTemplateUrl('my-modal.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal;
    });

    $scope.$on('onChange', function(event, args){
      console.log('onChange', event, args);

      $scope.items[args.index].title = args.front;
      $scope.items[args.index].description = args.back;

      //$scope.index = args.index;
      //$scope.front = args.front;
      //$scope.back = args.back;
    });

    $scope.openModal = function(index, item) {
      console.log('openModal', $scope.modal);

      $scope.currentIndex = index;
      $scope.front = item.title;
      $scope.back = item.description;

      $scope.modal.show();
    };
    $scope.closeModal = function() {
      $scope.modal.hide();
    };
    $scope.saveModal = function(front, back) {
      //$scope.items[$scope.currentIndex].title = $scope.front;
      //$scope.items[$scope.currentIndex].description = $scope.back;
      console.log('saveModal', front, back);

      $scope.$emit('onChange', {index:$scope.currentIndex, front:front, back:back});
      $scope.modal.hide();
    };
  });

  //app.controller('CardpackCreateModalCtrl', function ($scope, $ionicPopover, $ionicModal) {
  //});
});

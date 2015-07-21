define(['angular', 'app'], function (angular, app) {
  'use strict';

  app.controller('CardpackCreateCtrl', function ($scope, $rootScope, $location, $state, $ionicPopover, $ionicModal, $http) {
    console.log('CardpackCreateCtrl');
    //$scope.shouldShowDelete = true;
    //$scope.shouldShowReorder = true;
    $scope.listCanSwipe = true;
    $scope.items = [];
    $scope.cardpackName = 'test';

    $scope.tinymceOptions = {
      onChange: function (e) {
        // put logic here for keypress and cut/paste changes
      },
      inline: false,
      plugins: 'advlist autolink link image lists charmap print preview',
      skin: 'lightgray',
      theme: 'modern'
    };

    $scope.isEditMode = false;
    $scope.cards = ['card1'];
    $scope.front = 'front';
    $scope.back = 'back';
    $scope.currentIndex = -1;
    $scope.isReady = true;

    $scope.$on('onChange', function (event, args) {
      console.log('onChange', event, args);
      $scope.items[args.index].title = args.front;
      $scope.items[args.index].description = args.back;
    });

    $scope.goEditor = function (index, item) {
      console.log('goEditor', index, item);
      $state.go('cardpack-card-editor', {
        'index': index,
        'front': item.title,
        'back': item.description
      });
    };

    $scope.openModal = function (index, item) {
      console.log('openModal', $scope.modal);

      var front = item.front;
      var back = item.back;

      if (!front) {
        front = '<h1>타이틀</h1>';
      }

      if (!back) {
        back = '<p>설명</p>';
      }

      $scope.currentIndex = index;
      $scope.modalData = {
        index: index,
        front: front,
        back: back
      };

      if (!$scope.modal) {
        $ionicModal.fromTemplateUrl('my-modal.html', {
          scope: $scope,
          animation: 'slide-in-up'
        }).then(function (modal) {
          $scope.modal = modal;
          modal.show();
        });
      } else {
        $scope.modal.show();
      }
    };

    $scope.closeModal = function () {
      $scope.modal.hide();
      //$scope.modal.remove();
    };

    $scope.toggleDelete = function() {
      $scope.shouldShowDelete = !$scope.shouldShowDelete;
    };

    $scope.onHold = function() {
      $scope.shouldShowDelete = true;
    };

    $scope.validate = function() {
      if ($scope.items.length <= 0) {
        return false;
      }

      if (!$scope.name) {
        return false;
      }

      if ($scope.name.length <= 0) {
        return false;
      }

      return true;
    };

    $scope.sendData = function (cardpackName, items) {
      //var items = $scope.items;
      var cards = [];

      for (var i in items) {
        var item = items[i];
        cards.push({
          front: item.title,
          back: item.description
        });
      }

      var doc = {
        cardpackName: cardpackName,
        cards: cards
      };

      var cardpackParam = {
        cardpackName: cardpackName,
        docData: angular.toJson(doc)
      };

      $http({
        url: API_URL + 'api/app/v1/users/' + 'fb-974273282604443' + '/cardpacks',
        method: "POST",
        data: cardpackParam,
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        }
      }).success(function(){
        alert('send success');
      });
    };

    $scope.$on('modal.shown', function () {
      console.log('modal.shown');
    });

    $scope.$on('modal.hidden', function () {
      console.log('modal.hidden');
    });

    $scope.$on('$destroy', function () {
      console.log('$destroy');
    });

    $scope.setData = function (front, back) {
      console.log('saveModal', front, back);

      if ($scope.currentIndex >= 0) {
        $scope.items[$scope.modalData.index].title = front;
        $scope.items[$scope.modalData.index].description = back;
      } else {
        $scope.items.push({
          title: front,
          description: back
        });
      }

      $scope.modal.hide();
    };
  });

  app.controller('CardpackCreateModalCtrl', function ($scope, $ionicPlatform) {
    console.log('CardpackCreateModalCtrl');

    $scope.tinymceOptions = {
      //selector: "div.editable",
      //inline: true,
      plugins: [
        "advlist autolink lists link image charmap print preview hr anchor pagebreak",
        "searchreplace wordcount visualblocks visualchars code fullscreen",
        "insertdatetime media nonbreaking save table contextmenu directionality",
        "emoticons template paste textcolor colorpicker textpattern"
      ],
      toolbar: "undo redo | bold italic | bullist numlist outdent indent | link image |  forecolor backcolor emoticons"
    };
  });
});

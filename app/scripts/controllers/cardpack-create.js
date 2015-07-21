define(['angular', 'app'], function (angular, app) {
  'use strict';

  app.controller('CardpackCreateCtrl', function ($scope, $rootScope, $location, $state, $ionicPopover, $ionicModal, $timeout) {
    console.log('CardpackCreateCtrl');
    //$scope.shouldShowDelete = true;
    //$scope.shouldShowReorder = true;
    $scope.listCanSwipe = true;

    $scope.items = [];
    for (var i = 0; i < 10; i++) {
      $scope.items.push({
        title: 'title' + i,
        description: 'desc' + i
      });
    }

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

    // .fromTemplateUrl() method
    //$ionicModal.fromTemplateUrl('my-modal.html', {
    //  scope: $scope,
    //  animation: 'slide-in-up'
    //}).then(function(modal) {
    //  $scope.modal = modal;
    //});

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

      $scope.currentIndex = index;
      $scope.modalData = {
        front: item.title,
        back: item.description
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

      $scope.$emit('onChange', {index: $scope.currentIndex, front: front, back: back});
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

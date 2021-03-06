define(['angular', 'app'], function (angular, app) {
  'use strict';

  app.controller('CardpackCreateCtrl', function ($scope, $rootScope, $ionicHistory, $location, $state, $stateParams, $ionicLoading, $ionicPopover, $ionicModal, $http, SessionService, $ionicPopup, Cardpacks, Toast) {
    console.log('CardpackCreateCtrl', $stateParams);
    //$scope.shouldShowDelete = true;
    //$scope.shouldShowReorder = true;

    // 카드팩ID가 넘어온 경우 edit 모드
    if ($stateParams.cardpackId) {
      $ionicLoading.show();

      Cardpacks.get($stateParams.cardpackId)
        .success(function(response){
          $scope.data.isExposureStore = response.isExposureStore;
          $scope.data.isAllowCopy = response.isAllowCopy;
          $scope.cardpackAccessCd = response.cardpackAccessCd;
        });

      Cardpacks.getDoc($stateParams.cardpackId)
        .then(function (response) {
          $ionicLoading.hide();
          $scope.data.name = response.cardpackName;
          $scope.items = response.cards;
        }, function () {
          $ionicLoading.hide();
        });
    }

    $scope.cardpackId = $stateParams.cardpackId;
    $scope.listCanSwipe = true;
    $scope.items = [];
    $scope.cardpackName = '';
    $scope.tinymceOptions = {
      onChange: function (e) {
        // put logic here for keypress and cut/paste changes
      },
      inline: false,
      plugins: 'advlist autolink link image lists charmap print preview',
      skin: 'lightgray',
      theme: 'modern'
    };

    $scope.data = {};
    $scope.data.isExposureStore = true;
    $scope.data.isAllowCopy = true;
    $scope.cardpackAccessCd = 'PUBLIC';

    //$scope.isEditMode = false;
    $scope.cards = ['card1'];
    $scope.currentIndex = -1;
    $scope.isReady = true;

    $scope.$on('onChange', function (event, args) {
      console.log('onChange', event, args);
      $scope.items[args.index].front = args.front;
      $scope.items[args.index].back = args.back;
    });

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

    $scope.setData = function (front, back) {
      console.log('setData', front, back);

      if ($scope.currentIndex >= 0) {
        $scope.items[$scope.modalData.index].front = front;
        $scope.items[$scope.modalData.index].back = back;
      } else {
        $scope.items.push({
          front: front,
          back: back
        });
      }

      $scope.modal.hide();
      $scope.saveState();
    };

    $scope.isSavedData = function () {
      var jsonItems = localStorage.getItem('cardpack-create-data');

      if (jsonItems) {
        return true;
      }

      return false;
    };

    $scope.loadState = function () {
      var json = localStorage.getItem('cardpack-create-data');

      if (json) {
        var obj = JSON.parse(json);
        $scope.items = obj.items;
        $scope.data.name = obj.cardpackName;
      }
    };

    $scope.saveState = function () {
      var json = JSON.stringify({cardpackName: $scope.data.name, items: $scope.items});
      localStorage.setItem('cardpack-create-data', json);
    };

    $scope.clearState = function () {
      localStorage.removeItem('cardpack-create-data');
    };

    $scope.closeModal = function () {
      $scope.modal.hide();
      //$scope.modal.remove();
    };

    $scope.toggleDelete = function () {
      $scope.shouldShowDelete = !$scope.shouldShowDelete;
    };

    $scope.onHold = function () {
      $scope.shouldShowDelete = true;
    };

    $scope.validate = function () {
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

    function S4() {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }

    $scope.sendData = function () {
      var cardpackName = $scope.data.name;
      var items = $scope.items;
      var cards = [];

      for (var i in items) {
        var item = items[i];
        cards.push({
          id: item.id ? item.id : S4() + S4() + S4() + S4(),
          front: item.front,
          back: item.back
        });
      }

      var doc = {
        cardpackName: cardpackName,
        cards: cards
      };

      // 카드팩명, 스토어노출여부, 사본허용, 공개코드, 카드 문서데이터(JSON) 전송
      var cardpackParam = {
        cardpackName: cardpackName,
        isExposureStore: $scope.data.isExposureStore,
        isAllowCopy: $scope.data.isAllowCopy,
        cardpackAccessCd: $scope.cardpackAccessCd,
        docData: angular.toJson(doc)
      };

      // TODO Cardpacks로 대체할 것
      if ($stateParams.cardpackId) {
        $http({
          url: API_URL + 'api/app/v1/users/' + SessionService.loadUserId() + '/cardpacks/' + $stateParams.cardpackId,
          method: "PUT",
          data: cardpackParam,
          headers: {
            'Content-Type': 'application/json; charset=utf-8'
          }
        }).success(function () {
          $scope.clearState();
          $state.transitionTo('tab.dashboard', {}, {reload: true});
          Toast.show('성공적으로 저장했습니다.');
        });
      } else {
        $http({
          url: API_URL + 'api/app/v1/users/' + SessionService.loadUserId() + '/cardpacks',
          method: "POST",
          data: cardpackParam,
          headers: {
            'Content-Type': 'application/json; charset=utf-8'
          }
        }).success(function () {
          $scope.clearState();
          $state.transitionTo('tab.dashboard', {}, {reload: true});
          Toast.show('성공적으로 저장했습니다.');
        });
      }
    };

    $scope.openAccessSelectModal = function () {
      $scope.data.cardpackAccessCd = $scope.cardpackAccessCd;

      $ionicModal.fromTemplateUrl('access-select-modal.html', {
        scope: $scope,
        animation: 'slide-in-up'
      }).then(function (modal) {
        $scope.modalAccessSelect = modal;
        modal.show();
      });
    };

    $scope.closeAccessSelectModal = function () {
      console.log('closeAccessSelectModal', $scope.data.cardpackAccessCd);
      $scope.cardpackAccessCd = $scope.data.cardpackAccessCd;
      $scope.modalAccessSelect.hide();
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

    if ($scope.isSavedData()) {
      // 다이얼로그로 물어본 후 로드
      var confirmPopup = $ionicPopup.confirm({
        title: '확인',
        template: '작업 중인 카드팩이 있습니다. 불러오시겠습니까?'
      });
      confirmPopup.then(function (res) {
        if (res) {
          $scope.loadState();
        }
      });
    }
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

  app.controller('AccessSelectModalCtrl', function ($scope) {
    console.log('AccessSelectModalCtrl');
  });
});

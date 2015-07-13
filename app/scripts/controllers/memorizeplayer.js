define(['angular', 'app', 'swiper', 'cardpacks-service'], function (angular, app) {
  'use strict';

  app.directive('onFinishRender', function ($timeout) {
    return {
      restrict: 'A',
      link: function ($scope, element, attr) {
        if ($scope.$last === true) {
          $scope.$emit('onFinishRender');
        }
      }
    }
  });

  app.controller('MemorizePlayerCtrl', function ($scope, $stateParams, Cardpacks) {
    console.log('MemorizePlayerCtrl');

    var TYPE = {
      FRONT: 'front',
      BACK: 'back'
    };

    $scope.safeApply = function (fn) {
      var phase = this.$root.$$phase;
      if (phase == '$apply' || phase == '$digest') {
        if (fn && (typeof(fn) === 'function')) {
          fn();
        }
      } else {
        this.$apply(fn);
      }
    };

    $scope.$on('onFinishRender', function (event) {
      console.log('onFinishRender');

      var swiper = new Swiper('.swiper-container', {
        onTransitionStart: function (swiper) {
          $scope.safeApply(function () {
            $scope.cards[swiper.previousIndex].type = TYPE.FRONT;
            $scope.isShowResult = false;
          });
        },

        onTransitionEnd: function (swiper) {
          console.log('onTransitionEnd', swiper);
          $scope.safeApply(function () {
            $scope.range.progress = swiper.activeIndex;
          });
        }
      });

      $scope.swiper = swiper;
    });

    var cardpack = Cardpacks.get($stateParams.cardPackId);

    $scope.cards = angular.extend({}, cardpack.cards);
    $scope.range = {};
    $scope.range.progress = 0;
    $scope.range.max = cardpack.cards.length - 1;
    $scope.right = 0;
    $scope.wrong = 0;
    $scope.isShowResult = false;
    $scope.wrongArr = [];
    $scope.rightArr = [];

    for (var i in $scope.cards) {
      var card = $scope.cards[i];
      card.type = TYPE.FRONT;
    }

    $scope.addRight = function () {
      var id = $scope.cards[$scope.range.progress].id;

      // Notfound
      if ($scope.rightArr.indexOf(id) < 0) {
        $scope.rightArr.push(id);
      }

      // 이미 틀림 처리한 경우 제거
      var wrongId = $scope.wrongArr.indexOf(id);
      if (wrongId >= 0) {
        $scope.wrongArr.splice(wrongId, 1);
      }

      $scope.swiper.slideNext();
    };

    $scope.addWrong = function () {
      var id = $scope.cards[$scope.range.progress].id;

      // Notfound
      if ($scope.wrongArr.indexOf(id) < 0) {
        $scope.wrongArr.push(id);
      }

      // 이미 맞음 처리한 경우 제거
      var rightId = $scope.rightArr.indexOf(id);
      if (rightId >= 0) {
        $scope.rightArr.splice(rightId, 1);
      }

      $scope.swiper.slideNext();
    };

    $scope.getRightCount = function () {
      return $scope.rightArr.length;
    };

    $scope.getWrongCount = function () {
      return $scope.wrongArr.length;
    };

    $scope.toggle = function (index) {
      console.log('showBack', index);

      var card = $scope.cards[index];

      if (card.type == TYPE.FRONT) {
        card.type = TYPE.BACK;
        $scope.isShowResult = true;
      } else {
        card.type = TYPE.FRONT;
        $scope.isShowResult = false;
      }
    };

    $scope.$watch('range.progress', function (newValue, oldValue) {
      if ($scope.swiper) {
        $scope.swiper.slideTo(newValue);
      }
    }, true);
  });
});

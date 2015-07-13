define(['angular', 'app', 'swiper', 'cardpacks-service'], function (angular, app) {
  'use strict';

  app.directive('onFinishRender', function ($timeout) {
    return {
      restrict: 'A',
      link: function ($scope, element, attr) {
        if ($scope.$last === true) {
          var swiper = new Swiper('.swiper-container', {
            onTransitionEnd: function(swiper) {
              console.log('onTransitionEnd', swiper);
              $scope.$emit('onChangeProgress', swiper.activeIndex);
            }
          });
        }
      }
    }
  });

  app.controller('MemorizePlayerCtrl', function ($scope, $stateParams, Cardpacks) {
    console.log('MemorizePlayerCtrl');

    $scope.$on('onChangeProgress', function(event, index){
      console.log('onChangeProgress', index);
      $scope.data.current = index;
      $scope.$apply();
    });

    $scope.data = {};
    $scope.data.cardpack = Cardpacks.get($stateParams.cardPackId);
    $scope.data.max = $scope.data.cardpack.cards.length-1;
    $scope.data.current = 0;
    $scope.data.right = 0;
    $scope.data.wrong = 0;

    $scope.right = function () {
      $scope.data.right++;
    };

    $scope.wrong = function () {
      $scope.data.wrong++;
    };

    $scope.showBack = function () {
      console.log('showBack');
    };
  });
});

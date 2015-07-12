define(['angular', 'app', 'swiper', 'cardpacks-service'], function (angular, app) {
  'use strict';

  app.directive('onFinishRender', function ($timeout) {
    return {
      restrict: 'A',
      link: function ($scope, element, attr) {
        if ($scope.$last === true) {
          var swiper = new Swiper('.swiper-container', {
            onTransitionEnd: function(swiper) {
              console.log('onTransitionEnd', swiper.progress, $scope);
              $scope.$emit('onChangeProgress', swiper.progress);
            }
          });
        }
      }
    }
  });

  app.controller('MemorizePlayerCtrl', function ($scope, $stateParams, Cardpacks) {
    console.log('MemorizePlayerCtrl');

    $scope.$on('onChangeProgress', function(event, progree){
      console.log('onChangeProgress', progree);
      $scope.data.current = progree;
    });

    $scope.data = {};
    $scope.data.max = 10;
    $scope.data.current = 0;
    $scope.data.right = 0;
    $scope.data.wrong = 0;
    $scope.data.cardpack = Cardpacks.get($stateParams.cardPackId);

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

define(['angular', 'app'], function (angular, app) {
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

  app.controller('MemorizePlayerCtrl', function ($scope, $rootScope, $stateParams, Cardpacks, $timeout, $ionicLoading, StudyStatus, Toast, $window) {
    console.log('MemorizePlayerCtrl');

    var STUDY_MODE = {
      WRONG_ONLY: 'wrongOnly',
      NOTYET_ONLY: 'notyetOnly',
      ALL: 'all'
    }

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

    $scope.$on('$destroy', function () {
      var wrongs = $scope.wrongArr;
      var rights = $scope.rightArr;
      var current = $scope.cards[$scope.range.progress].id;
      var isStudy = false;

      // 학습여부 판별
      if ($scope.studyActLog.rightCnt > 0 || $scope.studyActLog.wrongCnt > 0 || $scope.studyActLog.cardViewCnt > 0) {
        isStudy = true;
      }

      if (isStudy) {
        StudyStatus.save($stateParams.cardpackId, {
          wrongs: wrongs,
          rights: rights,
          current: current,
          studyActLog: $scope.studyActLog
        }).success(function () {
          Toast.show('학습진도가 저장되었습니다.', 500);
          //$window.location.reload(true);
          $rootScope.$broadcast('savedStudyStatus', $stateParams.cardpackId);
        });
      }
    });

    $scope.$on('onFinishRender', function (event) {
      console.log('onFinishRender');

      $scope.swiper = new Swiper('.swiper-container', {
        spaceBetween: 10,
        threshold: 10,
        onTransitionStart: function (swiper) {
          if (swiper.previousIndex !== swiper.activeIndex) {
            $scope.safeApply(function () {
              $scope.cards[swiper.previousIndex].type = TYPE.FRONT;
              $scope.isShowResult = false;
            });
          }
        },

        onTransitionEnd: function (swiper) {
          console.log('onTransitionEnd', swiper);
          $scope.safeApply(function () {
            $scope.range.progress = swiper.activeIndex;
            $scope.current = swiper.activeIndex + 1;
          });
        }
      });

      $scope.swiper.slideTo($scope.range.progress);
    });

    $ionicLoading.show('카드정보를 로딩 중입니다.');
    Cardpacks.getDoc($stateParams.cardpackId)
      .then(function (response) {
        $ionicLoading.hide();

        var cardpack = response;
        angular.copy(cardpack.cards, $scope.cards);
        $scope.range.max = cardpack.cards.length - 1;

        for (var i in $scope.cards) {
          var card = $scope.cards[i];
          card.isWrong = false;
          card.isRight = false;
          card.type = TYPE.FRONT;
        }

        StudyStatus.get($stateParams.cardpackId)
          .success(function (response) {
            if (!response) {
              return;
            }

            var wrongs = response.wrongs;
            var rights = response.rights;
            var current = response.current;

            if (current) {
              for (var i = 0; i < $scope.cards.length; i++) {
                var card = $scope.cards[i];

                if (card.id == current) {
                  $scope.range.progress = i;
                  break;
                }
              }
            }

            $scope.rightArr = rights;
            $scope.wrongArr = wrongs;

            var mapRight = {};
            var mapWrong = {};

            for (var i in rights) {
              mapRight[rights[i]] = true;
            }
            for (var i in wrongs) {
              mapWrong[wrongs[i]] = true;
            }

            // 카드 학습정보에서 맞음/틀림 판별
            for (var i in $scope.cards) {
              var card = $scope.cards[i];

              if (mapWrong[card.id]) {
                card.isWrong = true;
              } else {
                card.isWrong = false;
              }

              if (mapRight[card.id]) {
                card.isRight = true;
              } else {
                card.isRight = false;
              }
            }

            var newCards = [];
            // 필터링 - 틀린카드
            if ($stateParams.studyMode == STUDY_MODE.WRONG_ONLY) {
              for (var i in $scope.cards) {
                if ($scope.cards[i].isWrong) {
                  newCards.push($scope.cards[i]);
                }
              }
            }

            // 필터링 - 미학습카드
            if ($stateParams.studyMode == STUDY_MODE.NOTYET_ONLY) {
              for (var i in $scope.cards) {
                if (!$scope.cards[i].isWrong && !$scope.cards[i].isRight) {
                  newCards.push($scope.cards[i]);
                }
              }
            }

            // 추린게 있다면...
            if (newCards.length > 0) {
              $scope.cards = newCards;
              $scope.range.max = newCards.length - 1;
              $scope.range.progress = 0;
            }
          });
      }, function () {
        $ionicLoading.hide();
      });

    //$scope.cards = angular.extend({}, cardpack.cards);
    $scope.cards = [];
    $scope.range = {};
    $scope.range.progress = 0;
    $scope.current = 1;
    $scope.range.max = 0;
    $scope.right = 0;
    $scope.wrong = 0;
    $scope.isShowResult = false;
    $scope.wrongArr = [];
    $scope.rightArr = [];
    $scope.studyActLog = {
      wrongCnt: 0,
      rightCnt: 0,
      cardViewCnt: 0
    };

    $scope.addRight = function () {
      var card = $scope.cards[$scope.range.progress];
      var id = card.id;
      card.isRight = true;
      card.isWrong = false;

      // Notfound
      if ($scope.rightArr.indexOf(id) < 0) {
        $scope.rightArr.push(id);
      }

      // 이미 틀림 처리한 경우 제거
      var wrongId = $scope.wrongArr.indexOf(id);
      if (wrongId >= 0) {
        $scope.wrongArr.splice(wrongId, 1);
      }

      $scope.studyActLog.rightCnt++;
      $scope.swiper.slideNext();
    };

    $scope.addWrong = function () {
      var card = $scope.cards[$scope.range.progress];
      var id = card.id;
      card.isWrong = true;
      card.isRight = false;

      // Notfound
      if ($scope.wrongArr.indexOf(id) < 0) {
        $scope.wrongArr.push(id);
      }

      // 이미 맞음 처리한 경우 제거
      var rightId = $scope.rightArr.indexOf(id);
      if (rightId >= 0) {
        $scope.rightArr.splice(rightId, 1);
      }

      $scope.studyActLog.wrongCnt++;
      $scope.swiper.slideNext();
    };

    $scope.getRightCount = function () {
      return $scope.rightArr.length;
    };

    $scope.getWrongCount = function () {
      return $scope.wrongArr.length;
    };

    $scope.isRight = function (index) {
      return $scope.cards[index].isRight ? $scope.cards[index].isRight : false;
    };

    $scope.isWrong = function (index) {
      return $scope.cards[index].isWrong ? $scope.cards[index].isWrong : false;
    };

    $scope.toggle = function (index) {
      console.log('showBack', index);

      var card = $scope.cards[index];

      if (card.type == TYPE.FRONT) {
        card.type = TYPE.BACK;
        $scope.isShowResult = true;
        $scope.studyActLog.cardViewCnt++;
      } else {
        card.type = TYPE.FRONT;
        $scope.isShowResult = false;
      }
    };

    $scope.$watch('range.progress', function (newValue, oldValue) {
      var p;
      if ($scope.swiper) {
        if (p) {
          $timeout.cancel(p);
        }
        p = $timeout(function () {
          $scope.swiper.slideTo(newValue);
        }, 100);
      }
    }, true);
  });
});

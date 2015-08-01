define(['angular', 'app'], function (angular, app) {
  'use strict';

  app.controller('DashboardMainCtrl', function ($scope, Myfavorite, Cardpacks, StudyStatus, StudyActStatistics, SessionService, $ionicLoading) {
    console.log('DashboardMainCtrl');

    // 최근 학습기록 차트 데이터들
    $scope.labels=[];
    $scope.series=[];
    $scope.data = [];

    // 내학습진도 데이터들
    $scope.studystatusList = [];

    function reqStudyStatistics() {
      StudyActStatistics.getDaysByUserId(SessionService.loadUserId())
        .success(onResponseStudyStatistics);
    }

    function onResponseStudyStatistics(response) {
      console.log('statistics', response);

      // 차트 데이터들
      var labels = [];
      var series = ["종합지수", "맞음수", "틀림수"];
      var data = [[], [], []];

      for (var i in response) {
        var obj = response[i];

        var month = obj.date.substr(4, 2);
        var day = obj.date.substr(6, 2);

        labels.push(month + '-' + day);

        var indexPoint = obj.wrongCnt + obj.rightCnt * 2 + obj.backViewCnt;
        data[0].push(indexPoint);
        data[1].push(obj.rightCnt);
        data[2].push(obj.wrongCnt);
      }

      $scope.labels = labels;
      $scope.series = series;
      $scope.data = data;
    }

    function reqMyStudyStatus() {
      StudyStatus.getList(SessionService.loadUserId())
        .success(onResponseMyStudyStatus);
    }

    function reqMyCardpacks() {
      Cardpacks.allByUserId(SessionService.loadUserId()).success(function (response) {
        $scope.cardpacks = response;
      });
    }

    function onResponseMyStudyStatus(response) {
      $scope.studystatusList = response;
      console.log(response);
    }

    // 요청
    reqStudyStatistics();
    reqMyStudyStatus();
    reqMyCardpacks();

    $scope.onClick = function (points, evt) {
      console.log(points, evt);
    };

    $scope.$on('$stateChangeSuccess', function () {
      reqMyStudyStatus();
    });

    $scope.cardpacks = [];

    $scope.$on('$stateChangeSuccess', function () {
      console.log('$stateChangeSuccess');
      reqMyCardpacks();
    });

    $scope.doRefresh = function () {
      reqStudyStatistics();
      reqMyStudyStatus();
      reqMyCardpacks();

      $scope.$broadcast('scroll.refreshComplete');
      $scope.$apply();
    };
  });
});

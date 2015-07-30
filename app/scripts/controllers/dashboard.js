define(['angular', 'app'], function (angular, app) {
  'use strict';

  app.controller('DashboardMainCtrl', function ($scope, Myfavorite) {
    console.log('DashboardMainCtrl');
    $scope.myfavorites = Myfavorite.all();
  });

  app.controller("Dashboard.ChartCtrl", function ($scope, StudyActStatistics, SessionService, $ionicLoading) {
    console.log('Dashboard.ChartCtrl');

    $ionicLoading.show();
    StudyActStatistics.getDaysByUserId(SessionService.loadUserId())
      .success(function(response){
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

          var indexPoint = obj.wrongCnt + obj.rightCnt*2 + obj.backViewCnt;
          data[0].push(indexPoint);
          data[1].push(obj.rightCnt);
          data[2].push(obj.wrongCnt);
        }

        $scope.labels = labels;
        $scope.series = series;
        $scope.data = data;
      })
      .finally(function(){
        $ionicLoading.hide();
      });

    //$scope.labels = ["월", "화", "수", "목", "금", "토", "일"];
    //$scope.series = ['카드학습', '퀴즈풀이'];
    //$scope.data = [
    //  [65, 59, 80, 81, 56, 55, 40],
    //  [28, 48, 40, 19, 86, 27, 90]
    //];
    $scope.onClick = function (points, evt) {
      console.log(points, evt);
    };
  });

  app.controller('Dashboard.ListCtrl', function ($scope, SessionService, StudyStatus) {
    console.log('Dashboard.ListCtrl');

    StudyStatus.getList(SessionService.loadUserId())
      .success(function(response){
        $scope.studystatusList = response;
        console.log(response);
      });

    $scope.shouldShowDelete = false;
    $scope.shouldShowReorder = false;
    $scope.listCanSwipe = true
  });

  app.controller('Dashboard.MyListCtrl', function ($scope, Cardpacks, SessionService) {
    console.log('Dashboard.MyListCtrl');
    $scope.cardpacks = [];

    Cardpacks.allByUserId(SessionService.loadUserId()).success(function(response){
      $scope.cardpacks = response;
    });
  });
});

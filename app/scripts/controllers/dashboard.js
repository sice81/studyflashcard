define(['angular', 'app'], function (angular, app) {
  'use strict';

  app.controller('DashboardMainCtrl', function ($scope, Myfavorite) {
    console.log('DashboardMainCtrl');
    $scope.myfavorites = Myfavorite.all();
  });

  app.controller("Dashboard.ChartCtrl", function ($scope) {
    console.log('Dashboard.ChartCtrl');

    $scope.labels = ["월", "화", "수", "목", "금", "토", "일"];
    $scope.series = ['카드학습', '퀴즈풀이'];
    $scope.data = [
      [65, 59, 80, 81, 56, 55, 40],
      [28, 48, 40, 19, 86, 27, 90]
    ];
    $scope.onClick = function (points, evt) {
      console.log(points, evt);
    };
  });

  app.controller('Dashboard.ListCtrl', function ($scope) {
    console.log('Dashboard.ListCtrl');

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

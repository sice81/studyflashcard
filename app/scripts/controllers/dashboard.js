define(['angular', 'app', 'myfavorite-service'], function (angular, app) {
  'use strict';

  app.controller('DashboardMainCtrl', function ($scope, Myfavorite) {
    console.log('DashboardMainCtrl');
    $scope.myfavorites = Myfavorite.all();
  });

  app.controller("Dashboard.ChartCtrl", function ($scope) {
    console.log('Dashboard.ChartCtrl');

    $scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
    $scope.series = ['Series A', 'Series B'];
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
});

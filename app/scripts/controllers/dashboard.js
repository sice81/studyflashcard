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

  app.controller('ListCtrl', function ($scope) {
    console.log('ListCtrl');

    $scope.shouldShowDelete = false;
    $scope.shouldShowReorder = false;
    $scope.listCanSwipe = true
  });

  app.controller('DashboardChartCtrl', function ($scope) {
    console.log('DashboardChartCtrl');

    $scope.config = {
      title: 'Products',
      tooltips: true,
      labels: false,
      mouseover: function () {
      },
      mouseout: function () {
      },
      click: function () {
      },
      legend: {
        display: true,
        //could be 'left, right'
        position: 'right'
      }
    };

    $scope.data = {
      series: ['Sales', 'Income', 'Expense', 'Laptops', 'Keyboards'],
      data: [{
        x: "Laptops",
        y: [100, 500, 0],
        tooltip: "this is tooltip"
      }, {
        x: "Desktops",
        y: [300, 100, 100]
      }, {
        x: "Mobiles",
        y: [351]
      }, {
        x: "Tablets",
        y: [54, 0, 879]
      }]
    };
  });
});

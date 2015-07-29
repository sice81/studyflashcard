define(['angular', 'app'], function (angular, app) {
  'use strict';

  app.factory('StudyActStatistics', function ($http) {
    console.log('StudyActStatistics');

    return {
      getDaysByUserId: function (userId) {
        return $http({
          url: API_URL + 'api/app/v1/users/' + userId + '/studyAct/statistics',
          method: "GET",
          headers: {
            'Content-Type': 'application/json; charset=utf-8'
          }
        });
      }
    };
  });

});

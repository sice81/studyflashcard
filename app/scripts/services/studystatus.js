define(['angular', 'app'], function (angular, app) {
  'use strict';

  app.factory('StudyStatus', function (SessionService, $http, $q) {
    console.log('StudyStatus');

    return {
      get: function (id) {
        return $http({
          url: API_URL + 'api/app/v1/users/' + SessionService.loadUserId() + '/cardpacks/' + id + '/status',
          method: "GET",
          headers: {
            'Content-Type': 'application/json; charset=utf-8'
          }
        });
      },
      save: function (id, studyStatus) {
        return $http({
          url: API_URL + 'api/app/v1/users/' + SessionService.loadUserId() + '/cardpacks/' + id + '/status',
          method: "PUT",
          data: studyStatus,
          headers: {
            'Content-Type': 'application/json; charset=utf-8'
          }
        });
      }
    };
  });

});

define(['angular', 'app'], function (angular, app) {
  'use strict';

  app.factory('StudyStatus', function (SessionService, $http, $q) {
    console.log('StudyStatus');

    return {
      getList: function (userId) {
        return $http({
          url: API_URL + 'api/app/v1/users/' + userId + '/studystatus',
          method: "GET",
          headers: {
            'Content-Type': 'application/json; charset=utf-8'
          }
        });
      },

      get: function (id) {
        return $http({
          url: API_URL + 'api/app/v1/users/' + SessionService.loadUserId() + '/cardpacks/' + id + '/studystatus',
          method: "GET",
          headers: {
            'Content-Type': 'application/json; charset=utf-8'
          }
        });
      },
      save: function (id, studyStatus) {
        return $http({
          url: API_URL + 'api/app/v1/users/' + SessionService.loadUserId() + '/cardpacks/' + id + '/studystatus',
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

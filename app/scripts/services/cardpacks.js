define(['angular', 'app'], function (angular, app) {
  'use strict';

  app.factory('Cardpacks', function (SessionService, $http, $q) {
    console.log('Cardpacks');

    return {
      allByUserId: function (userId) {
        return $http({
          url: API_URL + 'api/app/v1/users/' + userId + '/cardpacks',
          method: "GET",
          headers: {
            'Content-Type': 'application/json; charset=utf-8'
          }
        });
      },

      get: function (cardpackId) {
        return $http({
          url: API_URL + 'api/app/v1/cardpacks/' + cardpackId,
          method: "GET",
          headers: {
            'Content-Type': 'application/json; charset=utf-8'
          }
        });
      },

      getDoc: function (cardpackId) {
        var deferred = $q.defer();

        $http({
          url: API_URL + 'api/app/v1/cardpacks/' + cardpackId + '/doc',
          method: "GET",
          headers: {
            'Content-Type': 'application/json; charset=utf-8'
          }
        }).success(function (response) {
          $http({
            url: response.s3Url,
            method: "GET",
            headers: {
              'Content-Type': 'application/json; charset=utf-8'
            }
          }).success(function (response) {
            deferred.resolve(response);
          }).error(function (reason) {
            deferred.reject(reason);
          });
        }).error(function (reason) {
          deferred.reject(reason);
        });

        return deferred.promise;
      }
    };
  });

});

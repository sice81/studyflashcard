define(['angular', 'app'], function (angular, app) {
  'use strict';

  app.factory('Cardpacks', function (SessionService, $http, $q) {
    console.log('Cardpacks');

    return {
      all: function () {
        return $http({
          url: API_URL + 'api/app/v1/users/' + SessionService.loadUserId() + '/cardpacks',
          method: "GET",
          headers: {
            'Content-Type': 'application/json; charset=utf-8'
          }
        });
      },
      //remove: function (chat) {
      //  myfavorite.splice(myfavorite.indexOf(chat), 1);
      //},
      get: function (id) {
        var deferred = $q.defer();

        $http({
          url: API_URL + 'api/app/v1/users/' + SessionService.loadUserId() + '/cardpacks/' + id,
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

define(['angular', 'app'], function (angular, app) {
  'use strict';

  app.factory('Profile', function (SessionService, $http, $q) {
    console.log('Profile');

    return {
      get: function (userId) {
        return $http({
          url: API_URL + 'api/app/v1/users/' + userId + '/profile',
          method: "GET",
          headers: {
            'Content-Type': 'application/json; charset=utf-8'
          }
        });
      },

      put: function (user) {
        return $http({
          url: API_URL + 'api/app/v1/users/' + user.userId + '/profile',
          method: "PUT",
          data: user,
          headers: {
            'Content-Type': 'application/json; charset=utf-8'
          }
        });
      }
    };
  });

});

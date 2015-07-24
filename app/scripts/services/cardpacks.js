define(['angular', 'app'], function (angular, app) {
  'use strict';

  app.factory('Cardpacks', function (SessionService, $http) {
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
        return $http({
          url: API_URL + 'api/app/v1/users/' + SessionService.loadUserId() + '/cardpacks/' + id,
          method: "GET",
          headers: {
            'Content-Type': 'application/json; charset=utf-8'
          }
        });
      }
    };
  });

});

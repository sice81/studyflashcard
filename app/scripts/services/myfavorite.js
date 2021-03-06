define(['angular', 'app'], function (angular, app) {
  'use strict';

  console.log('Myfavorite');

  var myfavorite = [{
    id: 0,
    cardId: 101,
    name: '영어단어 우선순위 1000제',
    size: 1000,
    status: {
      wrong: 20,
      right: 10
    }
  }, {
    id: 1,
    cardId: 102,
    name: '자바 제1장 요약 10선',
    size: 10,
    status: {
      wrong: 2,
      right: 3
    }
  }, {
    id: 2,
    cardId: 103,
    name: 'SQLD 제1장 요약 200선',
    size: 200,
    status: {
      wrong: 20,
      right: 10
    }
  }];

  app.factory('Myfavorite', function () {

      return {
        all: function () {
          return myfavorite;
        },
        //remove: function (chat) {
        //  myfavorite.splice(myfavorite.indexOf(chat), 1);
        //},
        get: function (id) {
          for (var i = 0; i < myfavorite.length; i++) {
            if (myfavorite[i].id === parseInt(id)) {
              return myfavorite[i];
            }
          }
          return null;
        }
      };
    });

});

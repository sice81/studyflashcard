define(['angular', 'app'], function (angular, app) {
  'use strict';

  console.log('Cardpacks');

  var cardsBig = [];
  for (var i=0; i<100; i++) {
    cardsBig.push({
      id: 'card'+i,
      front: '<h1>' + i + 'char의 표현 범위는?</h1>',
      back: '<h1>0~2의 16승 - 1</h1>',
      hint: '브로'
    });
  }

  var cardpacks = [
    {
      id: 101,
      name: '영어단어 우선순위 1000제',
      cards: [
        {
          id: 'card01',
          front: '<h1>brother</h1>',
          back: '<h1>형제</h1>',
          hint: '브로'
        },
        {
          id: 'card02',
          front: '<h1>mother</h1>',
          back: '<h1>엄마</h1>',
          hint: '마미'
        },
        {
          id: 'card03',
          front: '<h1>sister</h1>',
          back: '<h1>여동생</h1>',
          hint: '마미'
        },
        {
          id: 'card04',
          front: '<h1>father</h1>',
          back: '<h1>아버지</h1>',
        }
      ]
    },
    {
      id: 102,
      name: '자바 제1장 요약 10선',
      cards: cardsBig
    }
  ];

  app.factory('Cardpacks', function (SessionService, $http) {

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
          //for (var i = 0; i < cardpacks.length; i++) {
          //  if (cardpacks[i].id === parseInt(id)) {
          //    return cardpacks[i];
          //  }
          //}
          //return null;
        }
      };
    });

});

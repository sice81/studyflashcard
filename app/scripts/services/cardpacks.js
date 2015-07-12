define(['angular'], function (angular) {
  'use strict';

  console.log('Myfavorite');

  var cardpacks = [
    {
      id: 101,
      name: '영어단어 우선순위 1000제',
      cards: [
        {
          front: '<h1>brother</h1>',
          back: '<h1>형제</h1>',
          hint: '브로'
        },
        {
          front: '<h1>mother</h1>',
          back: '<h1>엄마</h1>',
          hint: '마미'
        },
        {
          front: '<h1>sister</h1>',
          back: '<h1>여동생</h1>',
          hint: '마미'
        },
        {
          front: '<h1>father</h1>',
          back: '<h1>아버지</h1>',
        }
      ]
    },
    {
      id: 102,
      name: '자바 제1장 요약 10선',
      cards: [
        {
          front: '<h1>char의 표현 범위는?</h1>',
          back: '<h1>0~2의 16승 - 1</h1>',
          hint: '브로'
        }
      ]
    }
  ];

  angular.module('studyflashcardApp.services', [])
    .factory('Cardpacks', function () {

      return {
        all: function () {
          return cardpacks;
        },
        //remove: function (chat) {
        //  myfavorite.splice(myfavorite.indexOf(chat), 1);
        //},
        get: function (id) {
          for (var i = 0; i < cardpacks.length; i++) {
            if (cardpacks[i].id === parseInt(id)) {
              return cardpacks[i];
            }
          }
          return null;
        }
      };
    });

});

define(['angular'], function (angular) {
  'use strict';

  /**
   * @ngdoc function
   * @name studyflashcardApp.controller:AboutCtrl
   * @description
   * # AboutCtrl
   * Controller of the studyflashcardApp
   */
  angular.module('studyflashcardApp.controllers.AboutCtrl', [])
    .controller('AboutCtrl', function () {
      this.awesomeThings = [
        'HTML5 Boilerplate',
        'AngularJS',
        'Karma'
      ];
    });
});

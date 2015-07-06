define(['angular'], function (angular) {
  'use strict';

  /**
   * @ngdoc function
   * @name studyflashcardApp.controller:MainCtrl
   * @description
   * # MainCtrl
   * Controller of the studyflashcardApp
   */
  angular.module('studyflashcardApp.controllers.MainCtrl', [])
    .controller('MainCtrl', function () {
      this.awesomeThings = [
        'HTML5 Boilerplate',
        'AngularJS',
        'Karma'
      ];
    });
});

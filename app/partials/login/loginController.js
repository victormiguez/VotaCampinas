(function () {

  'use strict';

  var app = angular.module('votaCampinas');

  var loginController = function ($scope, $rootScope, $location, $window, $auth, Account) {
    $scope.enviar = function () {
      $auth.login($scope.user)
        .then(function (response) {
          $rootScope.currentUser = response.data.user;
          $window.localStorage.user = JSON.stringify(response.data.user);
          $location.path('/prioridades');
        })
        .catch(function (response) {
          $scope.messages = {
            error: Array.isArray(response.data) ? response.data : [response.data]
          };
        })
        .finally(function() {
            $scope.formLogin.$setPristine()
        });
      
    };

    $scope.authenticate = function (provider) {
      $auth.authenticate(provider)
        .then(function (response) {
          $rootScope.currentUser = response.data.user;
          $window.localStorage.user = JSON.stringify(response.data.user);
          $location.path('/');
        })
        .catch(function (response) {
          if (response.error) {
            $scope.messages = {
              error: [{ msg: response.error }]
            };
          } else if (response.data) {
            $scope.messages = {
              error: [response.data]
            };
          }
        });
    };

  };

  app.controller('loginController', loginController);

}());
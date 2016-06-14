var module = angular.module("angular", ['ngRoute']);

module.config(function($routeProvider){
  $routeProvider
       .when('/', {
         templateUrl : 'templates/Overview/DAU.html',
         controller  : 'MainController'
       })
       .when('/Overview/AU', {
         templateUrl : 'templates/Overview/DAU.html'
       })
       .when('/Overview/DPA', {
         templateUrl : 'templates/Overview/DPA.html'
       })
       .when('/Realtime/HAU', {
         templateUrl : 'templates/Realtime/HAU.html'
       })
       .when('/Revenue/DARPU', {
         templateUrl : 'templates/Revenue/DARPU.html'
       })
       .when('/Revenue/PU', {
         templateUrl : 'templates/Revenue/DPU.html'
       })
       .when('/Revenue/FPU', {
         templateUrl : 'templates/Revenue/FPU.html'
       })
       .when('/Retention/Dormant', {
         templateUrl : 'templates/Retention/Dormant.html'
       })
       .when('/ML/start', {
         templateUrl : 'templates/MachineLearning/MLstart.html'
       })
       .when('/ML/predict', {
         templateUrl : 'templates/MachineLearning/MLPredict.html'
       });
});

module.controller("MainController", function($scope, $location, $http) {
  $scope.msg = 'Main';

  $scope.go = function ( path ) {
    $location.path( path );
  };
});

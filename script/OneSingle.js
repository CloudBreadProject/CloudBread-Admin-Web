var module = angular.module("angular", ['ngRoute']);

module.config(function($routeProvider){
  $routeProvider
       .when('/', {
         templateUrl : 'templates/Overview/DAU.html',
         controller : 'MainController'
       })
       .when('/Overview/AU', {
         templateUrl : 'templates/Overview/DAU.html',
         controller : 'AUController'
       })
       .when('/Overview/DPA', {
         templateUrl : 'templates/Overview/DPA.html',
         controller : 'DPAController'
       })
       .when('/Realtime/HAU', {
         templateUrl : 'templates/Realtime/HAU.html',
         controller : 'HAUController'
       })
       .when('/Revenue/DARPU', {
         templateUrl : 'templates/Revenue/DARPU.html',
         controller : 'DARPUController'
       })
       .when('/Revenue/PU', {
         templateUrl : 'templates/Revenue/DPU.html',
         controller : 'PUController'
       })
       .when('/Revenue/FPU', {
         templateUrl : 'templates/Revenue/FPU.html',
         controller : 'FPUController'
       })
       .when('/Retention/Dormant', {
         templateUrl : 'templates/Retention/Dormant.html',
         controller : 'DormantController'
       })
       .when('/ML/start', {
         templateUrl : 'templates/MachineLearning/MLstart.html',
         controller : 'startController'
       })
       .when('/ML/predict', {
         templateUrl : 'templates/MachineLearning/MLPredict.html',
         controller : 'predictController'
       });
});

module.controller("MainController", function($scope) {
  $scope.msg = 'Main';
  callAU();
});
module.controller("AUController", function($scope) {
  callAU();
});
module.controller("DPAController", function($scope) {
  callDPA();
});
module.controller("HAUController", function($scope) {
  callHAU();
});
module.controller("DARPUController", function($scope) {
  callDARPU();
});
module.controller("PUController", function($scope) {
  callPU();
});
module.controller("FPUController", function($scope) {
  callFPU();
});
module.controller("DormantController", function($scope) {
  callDormant();
});
module.controller("startController", function($scope) {
  getDBData();
});
module.controller("predictController", function($scope) {
  MLPredict();
});

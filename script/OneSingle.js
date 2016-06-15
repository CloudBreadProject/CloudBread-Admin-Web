var module = angular.module("angular", ['ngRoute']);

module.config(function($routeProvider){
  $routeProvider
       .when('/', {
         templateUrl : 'templates/Overview/DAU.html',
         template : ' ',
         controller : 'MainController'
       })
       .when('/Overview/AU', {
         templateUrl : 'templates/Overview/DAU.html',
         template : ' ',
         controller : 'AUController'
       })
       .when('/Overview/DPA', {
         templateUrl : 'templates/Overview/DPA.html',
         template : ' ',
         controller : 'DPAController'
       })
       .when('/Realtime/HAU', {
         templateUrl : 'templates/Realtime/HAU.html',
         template : ' ',
         controller : 'HAUController'
       })
       .when('/Revenue/DARPU', {
         templateUrl : 'templates/Revenue/DARPU.html',
         template : ' ',
         controller : 'DARPUController'
       })
       .when('/Revenue/PU', {
         templateUrl : 'templates/Revenue/DPU.html',
         template : ' ',
         controller : 'PUController'
       })
       .when('/Revenue/FPU', {
         templateUrl : 'templates/Revenue/FPU.html',
         template : ' ',
         controller : 'FPUController'
       })
       .when('/Retention/Dormant', {
         templateUrl : 'templates/Retention/Dormant.html',
         template : ' ',
         controller : 'DormantController'
       })
       .when('/ML/start', {
         templateUrl : 'templates/MachineLearning/MLstart.html',
         template : ' ',
         controller : 'startController'
       })
       .when('/ML/predict', {
         templateUrl : 'templates/MachineLearning/MLPredict.html',
         template : ' ',
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

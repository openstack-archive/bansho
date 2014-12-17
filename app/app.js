'use strict';

// Declare app level module which depends on views, and components
angular.module('adagios', [
  'ngRoute',
  'adagios.sidebar',
  'adagios.navbar',
  'adagios.tactical'
]).

config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/'});
}]);

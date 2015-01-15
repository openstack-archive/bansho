'use strict';

angular.module('adagios', [
    'ngRoute',
    'adagios.sidebar',
    'adagios.navbar',
    'adagios.tactical'
])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.otherwise({redirectTo: '/'});
    }]);

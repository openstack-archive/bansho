'use strict';

angular.module('adagios', [
    'ngRoute',
    'adagios.sidebar',
    'adagios.topbar',
    'adagios.tactical'
])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.otherwise({redirectTo: '/'});
    }]);

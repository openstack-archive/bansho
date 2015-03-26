'use strict';

angular.element(document).ready(function () {

    $.get('components/config/config.json', function (data) {

        angular.module('adagios.config').config(['readConfigProvider', function (readConfigProvider) {
            readConfigProvider.loadJSON(data);
        }]);

        angular.bootstrap(document, ['adagios']);
    }, "json");

});

angular.module('adagios', [
    'ngRoute',
    'adagios.config',
    'adagios.topbar',
    'adagios.sidebar',
    'adagios.host',
    'adagios.view',
    'adagios.view.dashboard',
    'adagios.view.singleTable',
    'adagios.view.host'
])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.otherwise({redirectTo: '/'});
    }])

    // Reinitialise objects on url change
    .run(['$rootScope', 'reinitTables', function ($rootScope, reinitTables) {
        $rootScope.$on('$locationChangeStart', function () {
            reinitTables();
        });
    }]);

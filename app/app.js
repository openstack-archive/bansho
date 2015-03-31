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
    'adagios.utils.promiseManager',
    'adagios.topbar',
    'adagios.sidebar',
    'adagios.host',
    'adagios.service',
    'adagios.view',
    'adagios.view.dashboard',
    'adagios.view.singleTable',
    'adagios.view.host',
    'adagios.view.service'
])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.otherwise({redirectTo: '/'});
    }])

    // Reinitialise objects on url change
    .run(['$rootScope', 'clearAjaxPromises', 'reinitTables', function ($rootScope, clearAjaxPromises, reinitTables) {
        $rootScope.$on('$locationChangeStart', function () {
            reinitTables();
            clearAjaxPromises();
        });
    }]);

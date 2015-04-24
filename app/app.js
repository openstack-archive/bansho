'use strict';

angular.element(document).ready(function () {

    $.get('components/config/config.json', function (data) {

        angular.module('bansho.config').config(['readConfigProvider', function (readConfigProvider) {
            readConfigProvider.loadJSON(data);
        }]);

        angular.bootstrap(document, ['bansho']);
    }, "json");

});

angular.module('bansho', [
    'ngRoute',
    'bansho.config',
    'bansho.utils.promiseManager',
    'bansho.topbar',
    'bansho.sidebar',
    'bansho.host',
    'bansho.service',
    'bansho.view',
    'bansho.view.dashboard',
    'bansho.view.singleTable',
    'bansho.view.host',
    'bansho.view.service'
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

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
    'adagios.sidebar',
    'adagios.topbar',
    'adagios.config',
    'adagios.view.dashboard',
    'adagios.view.singleTable'
])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.otherwise({redirectTo: '/'});
    }]);

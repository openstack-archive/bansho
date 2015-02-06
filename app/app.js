'use strict';

angular.element(document).ready(function () {

    $.get('components/config/config.json', function (data) {

        angular.module('adagios.config').config(['readConfigProvider', function (readConfigProvider) {
            readConfigProvider.setDashboardConfig(data.dashboardConfig);
            readConfigProvider.setHostsConfig(data.hostsConfig);
            readConfigProvider.setServicesConfig(data.servicesConfig);
        }]);

        angular.bootstrap(document, ['adagios']);
    }, "json");

});

angular.module('adagios', [
    'ngRoute',
    'adagios.sidebar',
    'adagios.topbar',
    'adagios.tactical',
    'adagios.table',
    'adagios.filters',
    'adagios.config',
    'adagios.view.hosts',
    'adagios.view.services'
])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.otherwise({redirectTo: '/'});
    }]);

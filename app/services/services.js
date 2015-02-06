'use strict';

angular.module('adagios.view.services', ['ngRoute',
                                         'adagios.table'
                                        ])

    .value('servicesConfig', {})

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/services', {
            templateUrl: 'services/services.html',
            controller: 'ServicesCtrl'
        });
    }])

    .controller('ServicesCtrl', ['$scope', 'servicesConfig', function ($scope, servicesConfig) {
        $scope.servicesCells = servicesConfig.cells.join();
        $scope.servicesApiName = servicesConfig.apiName;
        $scope.servicesFilters = servicesConfig.filters;
    }])

    .run(['readConfig', 'servicesConfig', function (readConfig, servicesConfig) {
        servicesConfig.cells = readConfig.servicesConfig.cells;
        servicesConfig.apiName = readConfig.servicesConfig.apiName;
        servicesConfig.filters = readConfig.servicesConfig.filters;
    }]);

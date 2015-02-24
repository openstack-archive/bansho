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
        $scope.servicesTitle = servicesConfig.title;
        $scope.servicesCellsText = servicesConfig.cellsText.join();
        $scope.servicesCellsName = servicesConfig.cellsName.join();
        $scope.servicesApiName = servicesConfig.apiName;
        $scope.servicesFilters = servicesConfig.filters;
        $scope.servicesIsWrappable = servicesConfig.isWrappable;
        $scope.servicesNoRepeatCell = servicesConfig.noRepeatCell;
        $scope.servicesRefreshInterval = servicesConfig.refreshInterval;
    }])

    .run(['readConfig', 'servicesConfig', function (readConfig, servicesConfig) {
        servicesConfig.title = readConfig.data.servicesConfig.title;
        servicesConfig.cellsText = readConfig.data.servicesConfig.cells.text;
        servicesConfig.cellsName = readConfig.data.servicesConfig.cells.name;
        servicesConfig.apiName = readConfig.data.servicesConfig.apiName;
        servicesConfig.filters = readConfig.data.servicesConfig.filters;
        servicesConfig.isWrappable = readConfig.data.servicesConfig.isWrappable;
        servicesConfig.noRepeatCell = readConfig.data.servicesConfig.noRepeatCell;
        servicesConfig.refreshInterval = readConfig.data.servicesConfig.refreshInterval;
    }]);

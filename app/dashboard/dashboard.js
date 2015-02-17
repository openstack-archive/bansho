'use strict';

angular.module('adagios.view.dashboard', ['ngRoute',
                                          'adagios.tactical',
                                          'adagios.table'
                                         ])

    .value('dashboardConfig', {})

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/dashboard', {
            templateUrl: 'dashboard/dashboard.html',
            controller: 'DashboardCtrl'
        });
    }])

    .controller('DashboardCtrl', ['$scope', 'dashboardConfig', function ($scope, dashboardConfig) {
        $scope.dashboardCells = dashboardConfig.cells.join();
        $scope.dashboardApiName = dashboardConfig.apiName;
        $scope.dashboardFilters = dashboardConfig.filters;        
    }])

    .run(['readConfig', 'dashboardConfig', function (readConfig, dashboardConfig) {
        dashboardConfig.cells = readConfig.data.dashboardConfig.cells;
        dashboardConfig.apiName = readConfig.data.dashboardConfig.apiName;
        dashboardConfig.filters = readConfig.data.dashboardConfig.filters;
    }]);

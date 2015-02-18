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
        $scope.dashboardTitle = dashboardConfig.title;
        $scope.dashboardCellsText = dashboardConfig.cellsText.join();
        $scope.dashboardCellsName = dashboardConfig.cellsName.join();
        $scope.dashboardApiName = dashboardConfig.apiName;
        $scope.dashboardFilters = dashboardConfig.filters;
    }])

    .run(['readConfig', 'dashboardConfig', function (readConfig, dashboardConfig) {
        dashboardConfig.title = readConfig.data.dashboardConfig.title;
        dashboardConfig.cellsText = readConfig.data.dashboardConfig.cells.text;
        dashboardConfig.cellsName = readConfig.data.dashboardConfig.cells.name;
        dashboardConfig.apiName = readConfig.data.dashboardConfig.apiName;
        dashboardConfig.filters = readConfig.data.dashboardConfig.filters;
    }]);

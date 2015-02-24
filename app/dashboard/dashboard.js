'use strict';

angular.module('adagios.view.dashboard', ['ngRoute',
                                          'adagios.tactical',
                                          'adagios.table',
                                          'adagios.live'
                                         ])

    .value('dashboardConfig', {})

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/dashboard', {
            templateUrl: 'dashboard/dashboard.html',
            controller: 'DashboardCtrl'
        });
    }])

    .controller('DashboardCtrl', ['$scope', 'dashboardConfig', 'getServices', function ($scope, dashboardConfig, getServices) {

        var fields = ['state'],
            filters = {'isnot' : { 'state' : ['0'] }},
            apiName = 'hosts';

        $scope.dashboardTitle = dashboardConfig.title;
        $scope.dashboardCellsText = dashboardConfig.cellsText.join();
        $scope.dashboardCellsName = dashboardConfig.cellsName.join();
        $scope.dashboardApiName = dashboardConfig.apiName;
        $scope.dashboardFilters = dashboardConfig.filters;
        $scope.dashboardIsWrappable = dashboardConfig.isWrappable;
        $scope.dashboardNoRepeatCell = dashboardConfig.noRepeatCell;

        getServices(fields, filters, apiName)
            .success(function (data) {
                $scope.nbHostProblems = data.length;
            });

    }])

    .run(['readConfig', 'dashboardConfig', function (readConfig, dashboardConfig) {
        dashboardConfig.title = readConfig.data.dashboardConfig.title;
        dashboardConfig.cellsText = readConfig.data.dashboardConfig.cells.text;
        dashboardConfig.cellsName = readConfig.data.dashboardConfig.cells.name;
        dashboardConfig.apiName = readConfig.data.dashboardConfig.apiName;
        dashboardConfig.filters = readConfig.data.dashboardConfig.filters;
        dashboardConfig.isWrappable = readConfig.data.dashboardConfig.isWrappable;
        dashboardConfig.noRepeatCell = readConfig.data.dashboardConfig.noRepeatCell;
    }]);

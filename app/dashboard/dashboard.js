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

    .controller('DashboardCtrl', ['$scope', 'dashboardConfig', 'getServices', 'tableConfig', 'TableConfigObj', 'TacticalConfigObj',
        function ($scope, dashboardConfig, getServices, tableConfig, TableConfigObj, TacticalConfigObj) {

            var fields = ['state'],
                filters = {'isnot' : { 'state' : ['0'] }},
                apiName = 'hosts',
                components = [],
                component,
                config,
                i = 0;

            tableConfig.index = 0;
            $scope.dashboardTitle = dashboardConfig.data.title;
            $scope.dashboardTemplate = dashboardConfig.data.template;
            $scope.dashboardRefreshInterval = dashboardConfig.data.refreshInterval;

            $scope.dashboardTactical = [];
            $scope.dashboardTables = [];

            components = dashboardConfig.data.components;

            for (i = 0; i < components.length; i += 1) {
                component = components[i];
                config = component.config;

                if (component.type === 'table') {
                    $scope.dashboardTables.push(new TableConfigObj(config));
                } else if (component.type === 'tactical') {
                    $scope.dashboardTactical.push(new TacticalConfigObj(config));
                }
            }

            getServices(fields, filters, apiName)
                .success(function (data) {
                    $scope.nbHostProblems = data.length;
                });
        }])

    .run(['readConfig', 'dashboardConfig', function (readConfig, dashboardConfig) {
        dashboardConfig.data = readConfig.data.dashboardConfig;
    }]);

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

    .controller('DashboardCtrl', ['$scope', '$routeParams', 'dashboardConfig', 'getServices', 'tableConfig', 'TableConfigObj', 'TacticalConfigObj',
        function ($scope, $routeParams, dashboardConfig, getServices, tableConfig, TableConfigObj, TacticalConfigObj) {

            var fields = ['state'],
                filters = {'isnot' : { 'state' : ['0'] }},
                apiName = 'hosts',
                components = [],
                component,
                config,
                viewName,
                i = 0;

            tableConfig.index = 0;

            if (!!$routeParams.view) {
                viewName = $routeParams.view;
            } else {
                throw new Error("ERROR : 'view' GET parameter must be the custom view name");
            }

            $scope.dashboardTitle = dashboardConfig[viewName].title;
            $scope.dashboardTemplate = dashboardConfig[viewName].template;
            $scope.dashboardRefreshInterval = dashboardConfig[viewName].refreshInterval;

            $scope.dashboardTactical = [];
            $scope.dashboardTables = [];

            components = dashboardConfig[viewName].components;

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
        var viewsConfig = readConfig.data;

        angular.forEach(viewsConfig, function (config, view) {
            if (config.template === 'dashboard') {
                dashboardConfig[view] = config;
            }
        });
    }]);

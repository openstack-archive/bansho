'use strict';

angular.module('adagios.view.dashboard', ['ngRoute',
                                          'adagios.tactical',
                                          'adagios.table',
                                          'adagios.live'
                                         ])

    .value('dashboardConfig', {})

    .controller('DashboardCtrl', ['$scope', '$routeParams', 'dashboardConfig', 'getObjects',
        'TableConfigObj', 'TacticalConfigObj', 'getHostOpenProblems', 'getServiceOpenProblems', 'getHostProblems',
        'getServiceProblems',
        function ($scope, $routeParams, dashboardConfig, getObjects, TableConfigObj,
            TacticalConfigObj, getHostOpenProblems, getServiceOpenProblems, getHostProblems, getServiceProblems) {
            var components = [],
                component,
                config,
                viewName = $scope.viewName,
                i = 0;

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

            getHostOpenProblems.success(function (data) {
                $scope.nbHostOpenProblems = data.length;
            });

            getServiceOpenProblems.success(function (data) {
                $scope.nbServiceOpenProblems = data.length;
            });

            getHostProblems.success(function (data) {
                $scope.nbHostProblems = data.length;
            });

            getServiceProblems.success(function (data) {
                $scope.nbServiceProblems = data.length;
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

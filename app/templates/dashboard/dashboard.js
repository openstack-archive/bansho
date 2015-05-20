/*global jQuery */

'use strict';

angular.module('bansho.view.dashboard', ['ngRoute',
                                         'bansho.utils.promiseManager',
                                         'bansho.tactical',
                                         'bansho.table',
                                         'bansho.surveil'
                                        ])

    .value('dashboardConfig', {})

    .controller('DashboardCtrl', ['$scope', '$routeParams', '$interval', 'configManager', 'dashboardConfig', 'TableConfigObj', 'TacticalConfigObj', 'surveilLive', 'promisesManager',
        function ($scope, $routeParams, $interval, configManager, dashboardConfig, TableConfigObj, TacticalConfigObj, surveilLive, promisesManager) {
            var components = [],
                component,
                config,
                viewName = $scope.viewName,
                i = 0,
                getData;

            if (jQuery.isEmptyObject(dashboardConfig)) {
                configManager.loadByTemplate('dashboard', dashboardConfig);
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

            getData = function () {
                surveilLive.getHostOpenProblems().success(function (data) {
                    $scope.nbHostOpenProblems = data.length;
                    surveilLive.getServiceOpenProblems().then(function (openProblems) {
                        $scope.nbServiceOpenProblems = openProblems.length;
                        $scope.totalOpenProblems = $scope.nbServiceOpenProblems + $scope.nbHostOpenProblems;
                    });
                });

                surveilLive.getHostProblems().success(function (data) {
                    $scope.nbHostProblems = data.length;
                    surveilLive.getServiceProblems().success(function (data) {
                        $scope.nbServiceProblems = data.length;
                        $scope.totalProblems = $scope.nbHostProblems + $scope.nbServiceProblems;
                    });
                });
            };

            if ($scope.dashboardRefreshInterval !== 0) {
                promisesManager.addAjaxPromise(
                    $interval(getData, $scope.dashboardRefreshInterval * 1000)
                );
            }

            getData();
        }]);

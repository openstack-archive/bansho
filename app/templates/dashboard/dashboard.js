/*global jQuery */

'use strict';

angular.module('bansho.view.dashboard', ['ngRoute',
                                         'bansho.utils.promiseManager',
                                         'bansho.tactical',
                                         'bansho.table',
                                         'bansho.surveil'
                                        ])

    .controller('DashboardCtrl', ['$scope', '$routeParams', '$interval', 'configManager', 'surveilStatus', 'promisesManager',
        function ($scope, $routeParams, $interval, configManager, surveilStatus, promisesManager) {
            var components = [],
                component,
                config,
                viewName = $scope.viewName,
                pageConfig = configManager.getConfigData(viewName),
                i = 0,
                getData;

            $scope.dashboardTitle = pageConfig.title;
            $scope.dashboardTemplate = pageConfig.template;

            $scope.dashboardTactical = [];
            $scope.dashboardTables = [];

            $scope.components = pageConfig.components;
            $scope.refresh = pageConfig.refreshInterval;
            components = pageConfig.extra_components;

            components = {}
            //for (i = 0; i < components.length; i += 1) {
            //    component = components[i];
            //    config = component.config;
            //
            //    if (component.type === 'table') {
            //        $scope.dashboardTables.push(new TableConfigObj(config));
            //    } else if (component.type === 'tactical') {
            //        $scope.dashboardTactical.push(new TacticalConfigObj(config));
            //    }
            //}

            //getData = function () {
            //    surveilStatus.getHostOpenProblems().success(function (data) {
            //        $scope.nbHostOpenProblems = data.length;
            //        surveilStatus.getServiceOpenProblems().then(function (openProblems) {
            //            $scope.nbServiceOpenProblems = openProblems.length;
            //            $scope.totalOpenProblems = $scope.nbServiceOpenProblems + $scope.nbHostOpenProblems;
            //        });
            //    });
            //
            //    surveilStatus.getHostProblems().success(function (data) {
            //        $scope.nbHostProblems = data.length;
            //        surveilStatus.getServiceProblems().success(function (data) {
            //            $scope.nbServiceProblems = data.length;
            //            $scope.totalProblems = $scope.nbHostProblems + $scope.nbServiceProblems;
            //        });
            //    });
            //};

            //if ($scope.dashboardRefreshInterval !== 0) {
            //    promisesManager.addAjaxPromise(
            //        $interval(getData, $scope.dashboardRefreshInterval * 1000)
            //    );
            //}
            //
            //getData();
        }]);

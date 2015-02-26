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
            apiName = 'hosts',
            components = [],
            component,
            config,
            i = 0;

        $scope.dashboardTitle = dashboardConfig.data.title;
        $scope.dashboardTemplate = dashboardConfig.data.template;
        $scope.dashboardRefreshInterval = dashboardConfig.data.refreshInterval;

        $scope.dashboardTactical = [];
        $scope.dashboardTables = [];

        components = dashboardConfig.data.components;

        function TableConfig(config) {
            this.title = config.title;
            this.CellsText = config.cells.text.join();
            this.CellsName = config.cells.name.join();
            this.ApiName = config.apiName;
            this.Filters = config.filters;
            this.IsWrappable = config.isWrappable;
            this.NoRepeatCell = config.noRepeatCell;
        }

        function TacticalConfig(config) {
            this.title = config.title;
            this.statusOverview = config.components.statusOverview;
            this.currentHealth = config.components.currentHealth;
            this.topAlertProducers = config.components.topAlertProducers;
        }

        for (i = 0; i < components.length; i += 1) {
            component = components[i];
            config = component.config;

            if (component.type === 'table') {
                $scope.dashboardTables.push(new TableConfig(config));
            } else if (component.type === 'tactical') {
                $scope.dashboardTactical.push(new TacticalConfig(config));
                console.log($scope.dashboardTactical[0].statusOverview);
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

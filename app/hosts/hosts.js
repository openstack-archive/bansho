'use strict';

angular.module('adagios.view.hosts', ['ngRoute',
                                      'adagios.table'
                                     ])

    .value('hostsConfig', {})

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/hosts', {
            templateUrl: 'hosts/hosts.html',
            controller: 'HostsCtrl'
        });
    }])

    .controller('HostsCtrl', ['$scope', 'hostsConfig', function ($scope, hostsConfig) {
        $scope.hostsTitle = hostsConfig.title;
        $scope.hostsCellsText = hostsConfig.cellsText.join();
        $scope.hostsCellsName = hostsConfig.cellsName.join();
        $scope.hostsApiName = hostsConfig.apiName;
        $scope.hostsFilters = hostsConfig.filters;
        $scope.hostsIsWrappable = hostsConfig.isWrappable;
        $scope.hostsRefreshInterval = hostsConfig.refreshInterval;
    }])

    .run(['readConfig', 'hostsConfig', function (readConfig, hostsConfig) {
        hostsConfig.title = readConfig.data.hostsConfig.title;
        hostsConfig.cellsText = readConfig.data.hostsConfig.cells.text;
        hostsConfig.cellsName = readConfig.data.hostsConfig.cells.name;
        hostsConfig.apiName = readConfig.data.hostsConfig.apiName;
        hostsConfig.filters = readConfig.data.hostsConfig.filters;
        hostsConfig.isWrappable = readConfig.data.hostsConfig.isWrappable;
        hostsConfig.noRepeatCell = readConfig.data.hostsConfig.noRepeatCell;
        hostsConfig.refreshInterval = readConfig.data.hostsConfig.refreshInterval;
    }]);

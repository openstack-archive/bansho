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
        $scope.hostsCells = hostsConfig.cells.join();
        $scope.hostsApiName = hostsConfig.apiName;
    }])

    .run(['readConfig', 'hostsConfig', function (readConfig, hostsConfig) {
        hostsConfig.cells = readConfig.hostsConfig.cells;
        hostsConfig.apiName = readConfig.hostsConfig.apiName;
    }]);

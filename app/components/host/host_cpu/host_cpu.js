'use strict';

angular.module('bansho.host.cpu', ['bansho.live'])

    .controller('HostCpuCtrl', ['$scope', 'backendClient', function ($scope, backendClient) {
        var hostName = $scope.hostName,
            service = 'cpu',
            fields = ['state', 'description', 'plugin_output'],
            filters = {},
            apiName = 'services',
            additionnalFields = {'host_name': hostName, 'description': service};

        backendClient.getObjects(fields, filters, apiName, additionnalFields)
            .success(function (data) {
                $scope.cpuData = data[0];
            });
    }])

    .directive('banshoHostCpu', function () {
        return {
            restrict: 'E',
            templateUrl: 'components/host/host_cpu/host_cpu.html'
        };
    });

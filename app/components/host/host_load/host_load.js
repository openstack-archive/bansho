'use strict';

angular.module('bansho.host.load', [])

    .controller('HostLoadCtrl', ['$scope', 'backendClient', function ($scope, backendClient) {
        var hostName = $scope.hostName,
            service = 'load',
            fields = ['state', 'description', 'plugin_output'],
            filters = {},
            apiName = 'services',
            additionnalFields = {'host_name': hostName, 'description': service};

        backendClient.getObjects(fields, filters, apiName, additionnalFields)
            .success(function (data) {
                $scope.loadData = data[0];
            });
    }])

    .directive('banshoHostLoad', function () {
        return {
            restrict: 'E',
            templateUrl: 'components/host/host_load/host_load.html'
        };
    });

'use strict';

angular.module('adagios.host.load', [])

    .controller('HostLoadCtrl', ['$scope', 'getObjects', function ($scope, getObjects) {
        var hostName = $scope.hostName,
            service = 'load',
            fields = ['state', 'description', 'plugin_output'],
            filters = {},
            apiName = 'services',
            additionnalFields = {'host_name': hostName, 'description': service};

        getObjects(fields, filters, apiName, additionnalFields)
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

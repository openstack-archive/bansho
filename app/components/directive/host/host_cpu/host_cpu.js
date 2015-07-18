'use strict';

angular.module('bansho.host.cpu', ['bansho.datasource'])
    .directive('banshoHostCpu', function () {
        return {
            restrict: 'E',
            templateUrl: 'components/directive/host/host_cpu/host_cpu.html',
            scope: {
                options: '='
            },
            controller: ['$scope', 'hostSource', function ($scope, hostSource) {
                $scope.host = 'test'
            }]
        }
    });

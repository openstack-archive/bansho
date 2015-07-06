'use strict';

angular.module('bansho.host.cpu', ['bansho.surveil'])
    .directive('banshoHostCpu', function () {
        return {
            restrict: 'A',
            compile: function (scope, element, attrs) {
                scope.host = attrs.host;
            },
            templateUrl: 'components/host/host_cpu/host_cpu.html'
        };
    });

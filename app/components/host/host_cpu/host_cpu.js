'use strict';

angular.module('bansho.host.cpu', ['bansho.live'])
    .directive('banshoHostCpu', function () {
        return {
            restrict: 'E',
            compile: function (scope, element, attrs) {
                scope.host = attrs.host;
            },
            templateUrl: 'components/host/host_cpu/host_cpu.html'
        };
    });

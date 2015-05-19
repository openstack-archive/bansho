'use strict';

angular.module('bansho.host.cpu', ['bansho.live'])
    .directive('banshoHostCpu', function () {
        return {
            restrict: 'E',
            templateUrl: 'components/host/host_cpu/host_cpu.html'
        };
    });

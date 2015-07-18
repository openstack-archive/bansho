'use strict';

angular.module('bansho.host')
    .directive('banshoHostCpu', function () {
        return {
            restrict: 'E',
            templateUrl: 'components/directive/host/host_cpu/host_cpu.html',
            link: function (scope) {
                scope.param = scope.$parent.param;
            }
        };
    });

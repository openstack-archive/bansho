'use strict';

angular.module('bansho.container')
    .directive('banshoHostCpu', function () {
        return {
            restrict: 'E',
            templateUrl: 'components/custom_directive/container/host_cpu/host_cpu.html',
            link: function (scope) {
                scope.param = scope.$parent.param;
                scope.$parent.addDirectiveParamRequirements('host');
            }
        };
    });

'use strict';

angular.module('bansho.container')
    .directive('banshoHostCpu', function () {
        return {
            restrict: 'E',
            templateUrl: 'components/custom_directive/container/host_cpu/host_cpu.html',
            link: ['scope', 'sharedData', 'templateManager', function (scope, sharedData, templateManager) {
                scope.param = scope.$parent.param;

                scope.data = sharedData.getDataFromInputSource('statusHost', false, null, function (host) {
                    scope.data = host;
                });

                scope.$parent.addDirectiveParamRequirements('statusHosts');
            }]
        };
    });

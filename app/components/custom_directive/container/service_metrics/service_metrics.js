'use strict';

angular.module('bansho.container')
    .directive('banshoServiceMetrics', function () {
        return {
            restrict: 'E',
            templateUrl: 'components/custom_directive/container/service_metrics/service_metrics.html',
            link: function (scope) {
                scope.param = scope.$parent.param;
                scope.$parent.addDirectiveParamRequirements('service');
            }
        };
    });

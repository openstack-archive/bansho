'use strict';

angular.module('bansho.service.metrics', [])
    .directive('banshoServiceMetrics', function () {
        return {
            restrict: 'E',
            templateUrl: 'components/service/service_metrics/service_metrics.html',
            link: function (scope) {
                scope.param = scope.$parent.param;
            }
        };
    });

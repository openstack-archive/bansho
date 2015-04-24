'use strict';

angular.module('bansho.service.metrics', [])

    .controller('ServiceMetricsCtrl', ['$scope', function ($scope) {
        angular.noop();
    }])

    .directive('banshoServiceMetrics', function () {
        return {
            restrict: 'E',
            templateUrl: 'components/service/service_metrics/service_metrics.html'
        };
    });

'use strict';

angular.module('adagios.service.metrics', [])

    .controller('ServiceMetricsCtrl', ['$scope', function ($scope) {
        angular.noop();
    }])

    .directive('adgServiceMetrics', function () {
        return {
            restrict: 'E',
            templateUrl: 'components/service/service_metrics/service_metrics.html'
        };
    });

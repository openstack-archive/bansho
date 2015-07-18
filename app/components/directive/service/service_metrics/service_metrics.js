'use strict';

angular.module('bansho.service.metrics', [])

    .controller('ServiceMetricsCtrl', ['$scope', function ($scope) {
        angular.noop();
    }])

    .directive('banshoServiceMetrics', function () {
        return {
            restrict: 'E',
            scope: {
              service: '=service'
            },
            templateUrl: '..//service_metrics/service_metrics.html'
        };
    });

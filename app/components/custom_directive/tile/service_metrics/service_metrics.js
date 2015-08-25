'use strict';

angular.module('bansho.tile')
    .directive('banshoTileServiceMetrics', function () {
        return {
            restrict: 'E',
            templateUrl: 'components/custom_directive/container/service_metrics/service_metrics.html',
            controller: ['$scope', 'sharedData', 'templateManager',
                function ($scope, sharedData, templateManager, iframeUrl) {
                    sharedData.getDataFromInputSource('statusServices', false,
                    var hostname = templateManager.getPageParam('host_name');

                    surveilStatus.getHostMetricNames(hostname).then(function (metrics) {
                        $scope.param.host.metrics = metrics;
                        angular.forEach(metrics, function (metric) {
                            surveilStatus.getHostMetric(hostname, metric).then(function (data) {
                                // TODO: waiting for ORBER BY DESC support in InfluxDB
                            });
                        });
                    });
            }
        };
    });

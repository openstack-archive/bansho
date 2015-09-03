'use strict';

angular.module('bansho.customDirective.tile')
    .directive('banshoTileServiceMetrics', function () {
        return {
            restrict: 'E',
            templateUrl: 'components/customDirective/tile/service_metrics/service_metrics.html',
            controller: ['$scope', 'templateManager', 'surveilStatus', 'iframeUrl',
                function ($scope, templateManager, surveilStatus, iframeUrl) {
                    var hostname = templateManager.getPageParam('host_name'),
                        serviceDescription = templateManager.getPageParam('service_description');

                    $scope.metrics = [];
                    surveilStatus.getServiceMetricNames(hostname, serviceDescription).then(function (metricNames) {
                        angular.forEach(metricNames, function (metricName) {
                            $scope.metrics.push({
                                title: metricName,
                                iframeUrl: iframeUrl.getIFrameUrl("metric_" + metricName, hostname, serviceDescription)
                            });

                            surveilStatus.getServiceMetric(hostname, serviceDescription, metricName).then(function (data) {
                                // TODO: waiting for ORBER BY DESC support in InfluxDB
                            });
                        });
                    });
                }
            ]
        };
    });

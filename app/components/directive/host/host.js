'use strict';

angular.module('bansho.host', ['bansho.datasource'])

    .directive('banshoHost', function () {
        return {
            restrict: 'E',
            scope: {
                options: '='
            },
            templateUrl: 'components/directive/host/host.html',
            controller: ['$scope', 'templateManager', 'surveilStatus', 'iframeUrl',
                function ($scope, templateManager, surveilStatus, iframeUrl) {
                    var hostname = templateManager.getPageParam('hostname');

                    $scope.param = {
                        host: {}
                    };
                    surveilStatus.getHost(hostname).then(function (data) {
                        surveilStatus.getService(hostname).then(function(services) {
                            $scope.param.host = data[0];
                            $scope.param.host.services = [];
                            angular.forEach(services, function (service) {
                                if (service.service_description === 'cpu') {
                                    $scope.param.host.cpu = service;
                                } else if (service.service_description === 'load') {
                                    $scope.param.host.load = service;
                                    $scope.param.host.load.iframeUrl = iframeUrl.getIFrameUrl("metric_load1", hostname, "load");
                                } else {
                                    $scope.param.host.services.push(service);
                                }
                            });
                        });

                    });

                    surveilStatus.getHostMetricNames(hostname).then(function(metrics) {
                        $scope.param.host.metrics = metrics;
                        angular.forEach(metrics, function (metric) {
                            surveilStatus.getHostMetric(hostname, metric).then(function(data) {
                                // TODO: waiting for ORBER BY DESC support in InfluxDB
                            });
                        });
                    });



                    $scope.components = $scope.options.components;
            }]
        };
    });

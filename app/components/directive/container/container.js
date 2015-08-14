'use strict';

angular.module('bansho.container', [])
    .directive('banshoContainer', function () {
        return {
            restrict: 'E',
            scope: {
                options: '='
            },
            templateUrl: 'components/directive/container/container.html',
            controller: ['$scope', 'templateManager', 'surveilStatus', 'surveilConfig', 'iframeUrl',
                function ($scope, templateManager, surveilStatus, surveilConfig, iframeUrl) {
                    $scope.param = {
                        //host: {}
                    };

                    $scope.addDirectiveParamRequirements = function (param) {
                        if ($scope.param[param] === undefined) {
                            fillParams[param]();
                        }
                    };

                    var fillParams = {
                        "configHost": function () {
                            surveilConfig.getHost(templateManager.getPageParam('host_name'))
                                .then(function (data) {
                                    $scope.param.configHost = data[0];
                                });
                        },
                        "command": function () {
                            surveilConfig.getCommand(templateManager.getPageParam('command_name'))
                                .then(function (data) {
                                    $scope.param.command = data[0];
                                });
                        },
                        "host": function () {
                            var hostname = templateManager.getPageParam('host_name');

                            surveilStatus.getHost(templateManager.getPageParam('host_name')).then(function (data) {
                                surveilStatus.getService(templateManager.getPageParam('host_name')).then(function (services) {
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
                        },
                        "hostMetrics": function () {
                            var hostname = templateManager.getPageParam('host_name');

                            surveilStatus.getHostMetricNames(hostname).then(function (metrics) {
                                $scope.param.host.metrics = metrics;
                                angular.forEach(metrics, function (metric) {
                                    surveilStatus.getHostMetric(hostname, metric).then(function (data) {
                                        // TODO: waiting for ORBER BY DESC support in InfluxDB
                                    });
                                });
                            });
                        },
                        "service": function () {
                            var hostname = templateManager.getPageParam('host_name'),
                                serviceDescription = templateManager.getPageParam('service_description');

                            surveilStatus.getService(hostname, serviceDescription).then(function (data) {
                                $scope.param.service = data[0];
                                surveilStatus.getServiceMetricNames(hostname, serviceDescription).then(function(metric_names) {
                                    $scope.param.service.iframeUrls = {};
                                    angular.forEach(metric_names, function (metricName) {
                                        $scope.param.service.iframeUrls[metricName] = iframeUrl.getIFrameUrl("metric_" + metricName, hostname, serviceDescription);
                                        surveilStatus.getServiceMetric(hostname, serviceDescription).then(function(data) {
                                            // TODO: waiting for ORBER BY DESC support in InfluxDB
                                        });
                                    });
                                });
                            });
                        }
                    };

                    $scope.components = $scope.options.components;
                }]
        };
    });

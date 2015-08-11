'use strict';

angular.module('bansho.service', ['bansho.datasource'])

    .directive('banshoService', function () {
        return {
            restrict: 'E',
            scope: {
                options: '='
            },
            templateUrl: 'components/directive/service/service.html',
            controller: ['$scope', 'templateManager', 'surveilStatus', 'iframeUrl',
                function ($scope, templateManager, surveilStatus, iframeUrl) {
                    var hostname = templateManager.getPageParam('host_name'),
                        serviceDescription = templateManager.getPageParam('service_description');

                    $scope.param = {};
                    surveilStatus.getService(hostname, serviceDescription).then(function (data) {
                        $scope.param.service = data[0];
                        surveilStatus.getServiceMetricNames(hostname, serviceDescription).then(function(metric_names) {
                            $scope.param.service.iframeUrls = {};
                            angular.forEach(metric_names, function (metricName) {
                                $scope.param.service.iframeUrls[metricName] = iframeUrl.getIFrameUrl("metric_" + metricName, hostname, serviceDescription);
                                surveilStatus.getServiceMetric(hostname, serviceDescription, metricName).then(function(data) {
                                 // TODO: waiting for ORBER BY DESC support in InfluxDB
                                });
                            });
                        });
                    });
                    $scope.components = $scope.options.components;
                }]
            };
        });

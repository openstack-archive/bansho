'use strict';

angular.module('bansho.service', ['bansho.datasource'])

    .directive('banshoService', function () {
        return {
            restrict: 'E',
            scope: {
                options: '='
            },
            templateUrl: 'components/directive/service/service.html',
            controller: ['$scope', 'pageParams', 'surveilStatus', 'iframeUrl',
                function ($scope, pageParams, surveilStatus, iframeUrl) {
                    var hostname = pageParams.host_name,
                        serviceDescription = pageParams.service_description;

                    $scope.param = {};
                    surveilStatus.getService(hostname, serviceDescription).then(function (data) {
                        $scope.param.service = data[0];
                        surveilStatus.getServiceMetricNames(hostname, serviceDescription).then(function(metric_names) {
                            $scope.param.service.iframeUrls = {};
                            angular.forEach(metric_names, function (metric) {
                                var metricName = metric.metric_name.substr(7);
                                $scope.param.service.iframeUrls[metricName] = iframeUrl.getIFrameUrl(metric.metric_name, hostname, serviceDescription);
                            });
                        });
                    });

                    $scope.components = $scope.options.components;
                }]
            };
        });

'use strict';

angular.module('bansho.tile')
    .directive('banshoTileServiceGraphs', function () {
        return {
            restrict: 'E',
            templateUrl: 'components/custom_directive/tile/service_graphs/service_graphs.html',
            controller: ['$scope', 'sharedData', 'surveilStatus', 'templateManager', 'iframeUrl',
                function ($scope, sharedData, surveilStatus, templateManager, iframeUrl) {
                    $scope.iframeUrls = {};

                    //sharedData.getDataFromInputSource('statusServices', false,
                    //    templateManager.getAllPageParams(), function (service) {
                    //        if (service[0] !== undefined) {
                    //            surveilStatus.getServiceMetricNames(hostname, serviceDescription).then(function(metric_names) {
                    //                angular.forEach(metric_names, function (metricName) {
                    //                    $scope.iframeUrls[metricName] = iframeUrl.getIFrameUrl("metric_" + metricName, hostname, serviceDescription);
                    //                    surveilStatus.getServiceMetric(hostname, serviceDescription).then(function (data) {
                    //                        TODO: waiting for ORBER BY DESC support in InfluxDB
                                        //});
                                    //});
                                //});
                            //}
                        //}
                    //);
                }
            ]
        };
    });

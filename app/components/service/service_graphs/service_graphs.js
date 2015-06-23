'use strict';

angular.module('bansho.service.graphs', [])

    .controller('ServiceGraphsCtrl', ['$scope', 'surveilStatus', 'iframeUrl', function ($scope, surveilStatus, iframeUrl) {
        $scope.$watch('service', function(service) {
            if (service) {
                surveilStatus.getServiceMetricNames(service.host_name, service.service_description).then(function(metric_names){
                    $scope.iframeUrls = {};
                    angular.forEach(metric_names, function (metric) {
                        var metricName = metric.metric_name.substr(7);
                        $scope.iframeUrls[metricName] = iframeUrl.getIFrameUrl(metric.metric_name, service.host_name, service.service_description);
                    });
                });
            }
        });
    }])

    .directive('banshoServiceGraphs', ['iframeUrl', function (iframeUrl) {
        return {
            restrict: 'E',
            scope: {
              service: '=service'
            },
            controller: 'ServiceGraphsCtrl',
            templateUrl: 'components/service/service_graphs/service_graphs.html'
        };
    }]);

'use strict';

angular.module('bansho.host.load', [])
    .directive('banshoHostLoad', ['iframeUrl', function (iframeUrl) {
        return {
            restrict: 'E',
            controller: ['$scope', function ($scope, element, attrs) {
                $scope.iframeUrl = iframeUrl.getIFrameUrl("metric_load1", $scope.host.config.host_name, "load");
            }],
            templateUrl: 'components/host/host_load/host_load.html'
        };
    }]);

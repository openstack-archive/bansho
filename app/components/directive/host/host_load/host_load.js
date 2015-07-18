'use strict';

angular.module('bansho.host')
    .directive('banshoHostLoad', function (iframeUrl) {
        return {
            restrict: 'E',
            scope: {
                options: '='
            },
            templateUrl: 'components/directive/host/host_load/host_load.html',
            controller: ['$scope', 'hostSource', 'iframeUrl', function ($scope, hostSource, iframeUrl) {
                var handleSource = function (host) {
                    console.log(host)
                    $scope.loadService = host.host_services.load;
                    $scope.iframeUrl = iframeUrl.getIFrameUrl("metric_load1", host.host_host_name, "load");
                };

                hostSource.registerDataChanged($scope.options.attributes.hostname, handleSource);

            }]
        };
    });

'use strict';

angular.module('bansho.tile')
    .directive('banshoTileHostLoad', function () {
        return {
            restrict: 'E',
            templateUrl: 'components/custom_directive/tile/host_load/host_load.html',
            controller: ['$scope', 'sharedData', 'templateManager', 'iframeUrl', function ($scope, sharedData, templateManager, iframeUrl) {
                sharedData.getDataFromInputSource('statusServices', false,
                    templateManager.getAllPageParams(), function (services) {
                        angular.forEach(services, function (service) {
                            if (service.service_service_description === 'load') {
                                $scope.load = service;
                                $scope.iframeUrl = iframeUrl.getIFrameUrl("metric_load1", service.host_host_name, "load");
                            }
                        });
                    });
            }]
        };
    });

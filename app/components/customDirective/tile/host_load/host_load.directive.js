'use strict';

angular.module('bansho.customDirective.tile')
    .directive('banshoTileHostLoad', function () {
        return {
            restrict: 'E',
            templateUrl: 'components/customDirective/tile/host_load/host_load.html',
            controller: ['$scope', 'sharedData', 'templateManager', 'iframeUrl', function ($scope, sharedData, templateManager, iframeUrl) {
                sharedData.getDataFromInputSource('statusServices', false,
                    templateManager.getAllPageParams(), false, function (services) {
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
